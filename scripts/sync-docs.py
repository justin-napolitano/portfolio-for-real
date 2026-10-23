"""Publish bounded, immutable public-repository documentation snapshots.

Only README and docs Markdown are read. Archives are streamed, never extracted;
source programs, HTML and MDX components are never executed. A failed source
refresh leaves the complete previous snapshot intact. Removed/private sources
are omitted, and deleted files disappear on the next successful refresh.
"""
from __future__ import annotations

import argparse
import datetime as dt
import fnmatch
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import tarfile
import tempfile
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MAX_ARCHIVE = 64 * 1024 * 1024
MAX_DOCUMENT = 512 * 1024
MAX_TOTAL_TEXT = 16 * 1024 * 1024
MAX_FILES = 2000
NAME = re.compile(r"^[A-Za-z0-9_.-]+$")
SHA = re.compile(r"^[a-f0-9]{40}$")
DEFAULT_EXCLUDES = [
    "docs/branding/**", "docs/governance/**", "docs/product-engineer-qa/**",
    "docs/*-plan.md", "docs/*-review.md", "docs/*-evidence.md",
    "docs/queued-execplans.md", "docs/runtime/*plan*",
]


def selected_path(value: str, excludes: list[str]) -> bool:
    """Match publication paths without permitting archive path traversal."""
    path = PurePosixPath(value)
    if value.startswith("/") or "\\" in value or any(p in {"..", ".git", ".agent", "node_modules"} for p in path.parts):
        return False
    allowed = (len(path.parts) == 1 and re.fullmatch(r"readme\.(md|mdx)", value, re.I)) or (value.startswith("docs/") and path.suffix.lower() in {".md", ".mdx"})
    return bool(allowed) and not any(fnmatch.fnmatchcase(value, pattern) for pattern in [*DEFAULT_EXCLUDES, *excludes])


def parse_document(body: str, file_path: str) -> tuple[str, str] | None:
    """Strip metadata and honor source-owned publication opt-outs."""
    title = ""
    if body.startswith("---\n") or body.startswith("---\r\n"):
        match = re.match(r"^---\r?\n(.*?)\r?\n---(?:\r?\n|$)", body, re.S)
        if not match:
            raise ValueError(f"Unterminated frontmatter: {file_path}")
        frontmatter = match[1]
        if re.search(r"^(?:draft|private)\s*:\s*(?:true|yes)\s*$|^publish\s*:\s*(?:false|no)\s*$|^visibility\s*:\s*[\"']?(?:private|internal)[\"']?\s*$", frontmatter, re.I | re.M):
            return None
        found = re.search(r"^title:\s*(.+)$", frontmatter, re.M)
        if found:
            title = found[1].strip().strip("\"'")
        body = body[match.end():]
    heading = re.search(r"^#\s+(.+?)\s*#*\s*$", body, re.M)
    title = title or (heading[1] if heading else PurePosixPath(file_path).stem.replace("-", " "))
    return title[:200], body


def archive_documents(stream, excludes: list[str]) -> dict[str, tuple[str, str]]:
    """Read regular Markdown members only; never extract links or programs."""
    documents = {}
    expanded = total = members = 0
    with tarfile.open(fileobj=stream, mode="r|gz") as archive:
        for member in archive:
            members += 1
            expanded += max(member.size, 0)
            if members > 100000 or expanded > 512 * 1024 * 1024:
                raise ValueError("Repository archive exceeds expanded-size limit")
            _, separator, source_path = member.name.partition("/")
            if not separator or not selected_path(source_path, excludes):
                continue
            if not member.isfile():
                continue
            if member.size > MAX_DOCUMENT:
                raise ValueError(f"Document exceeds size limit: {source_path}")
            handle = archive.extractfile(member)
            if handle is None:
                raise ValueError("Unreadable archive document")
            data = handle.read(MAX_DOCUMENT + 1)
            total += len(data)
            if total > MAX_TOTAL_TEXT or len(documents) >= MAX_FILES:
                raise ValueError("Documentation snapshot exceeds limits")
            parsed = parse_document(data.decode("utf-8-sig"), source_path)
            if parsed is not None:
                if source_path in documents:
                    raise ValueError(f"Duplicate archive document: {source_path}")
                documents[source_path] = parsed
    return documents


def github_json(endpoint: str) -> dict:
    headers = {"User-Agent": "jnap-federated-docs", "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    # Caller constructs this endpoint exclusively from validated names/refs.
    request = Request("https://api.github.com/" + endpoint, headers=headers)
    with urlopen(request, timeout=45) as response:
        return json.load(response)


def fetch_source(spec: dict) -> dict | None:
    owner, repo = spec["owner"], spec["repo"]
    if not NAME.fullmatch(owner) or not NAME.fullmatch(repo):
        raise ValueError("Invalid source repository name")
    try:
        metadata = github_json(f"repos/{owner}/{repo}")
    except HTTPError as error:
        if error.code == 404:
            print(f"Omitting unavailable source: {owner}/{repo}")
            return None
        raise
    if metadata.get("private") is not False or metadata.get("visibility", "public") != "public":
        print(f"Omitting non-public source: {owner}/{repo}")
        return None
    # Do not follow a repository transfer into a different publishing identity.
    if metadata.get("full_name", "").lower() != f"{owner}/{repo}".lower():
        raise ValueError("Source repository identity changed; review docs-sources.json")
    branch = metadata["default_branch"]
    revision = github_json(f"repos/{owner}/{repo}/commits/{quote(branch, safe='')}")
    commit = revision["sha"]
    if not SHA.fullmatch(commit):
        raise ValueError("Invalid source commit")
    # Public codeload never receives the GitHub API token.
    request = Request(f"https://codeload.github.com/{owner}/{repo}/tar.gz/{commit}", headers={"User-Agent": "jnap-federated-docs"})
    with urlopen(request, timeout=90) as response:
        compressed = response.read(MAX_ARCHIVE + 1)
    if len(compressed) > MAX_ARCHIVE:
        raise ValueError(f"Source archive too large: {repo}")
    docs = archive_documents(io.BytesIO(compressed), spec.get("exclude", []))
    return {
        "owner": owner, "repo": repo, "branch": branch, "commit": commit,
        "commitDate": revision["commit"]["committer"]["date"],
        "topics": spec.get("topics", []), "documents": docs,
    }


def route_for(repo: str, path: str) -> str:
    if "/" not in path and re.fullmatch(r"readme\.(md|mdx)", path, re.I):
        return f"/docs/{quote(repo, safe='')}"
    return f"/docs/{quote(repo, safe='')}/" + "/".join(quote(p, safe="") for p in path.split("/"))


def create_snapshot(sources: list[dict], previous: dict | None = None) -> dict:
    """Keep unchanged source revisions stable; a refresh is idempotent."""
    previous = previous or {}
    old_sources = {s["repo"]: s for s in previous.get("sources", [])}
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    result = {"version": 1, "generatedAt": now, "sources": [], "documents": []}
    routes = set()
    for source in sorted(sources, key=lambda s: s["repo"]):
        docs = source["documents"]
        digest = hashlib.sha256(json.dumps(docs, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
        old = old_sources.get(source["repo"], {})
        # A docs-site snapshot commit must not cause an endless self-sync loop.
        unchanged = old.get("contentHash") == digest and old.get("branch") == source["branch"] and old.get("owner") == source["owner"]
        meta = {k: source[k] for k in ["owner", "repo", "branch", "commit", "commitDate", "topics"]}
        if unchanged:
            meta.update({k: old[k] for k in ["commit", "commitDate"]})
        meta.update(contentHash=digest, syncedAt=old.get("syncedAt", now) if unchanged else now, documentCount=len(docs))
        result["sources"].append(meta)
        for file_path, (title, body) in sorted(docs.items()):
            href = route_for(source["repo"], file_path)
            if href in routes:
                raise ValueError(f"Duplicate documentation route: {href}")
            routes.add(href)
            result["documents"].append({"repo": source["repo"], "path": file_path, "title": title, "href": href, "body": body, "section": "Overview" if "/" not in file_path else str(PurePosixPath(file_path).parent)})
    if result["sources"] == previous.get("sources") and result["documents"] == previous.get("documents"):
        return previous
    return result


def sync(config_path: Path, output: Path) -> dict:
    config = json.loads(config_path.read_text())
    if config.get("version") != 1 or not isinstance(config.get("sources"), list):
        raise ValueError("Invalid docs source manifest")
    identities = [source["repo"] for source in config["sources"]]
    if len(set(identities)) != len(identities):
        raise ValueError("Repository route identities must be unique")
    sources = []
    for spec in config["sources"]:
        source = fetch_source(spec)
        if source is not None:
            sources.append(source)
    previous = json.loads(output.read_text()) if output.exists() else None
    snapshot = create_snapshot(sources, previous)
    serialized = json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n"
    output.parent.mkdir(parents=True, exist_ok=True)
    if not output.exists() or output.read_text() != serialized:
        with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=output.parent, delete=False) as handle:
            handle.write(serialized)
            temporary = Path(handle.name)
        os.replace(temporary, output)
    return snapshot


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=ROOT / "docs-sources.json")
    parser.add_argument("--output", type=Path, default=ROOT / "data/federated/catalog.json")
    args = parser.parse_args()
    try:
        snapshot = sync(args.config, args.output)
        print(json.dumps({"ok": True, "sources": len(snapshot["sources"]), "documents": len(snapshot["documents"]), "generatedAt": snapshot["generatedAt"]}))
    except Exception as error:
        # Do not dump upstream response bodies or authorization headers.
        print(json.dumps({"ok": False, "error": type(error).__name__, "message": "Documentation sync failed; existing snapshot retained."}))
        raise SystemExit(1)
