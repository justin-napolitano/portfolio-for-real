"""Build a repository-owned project log. Public and private outputs never mix."""
from __future__ import annotations
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor
import datetime as dt
import json
import os
from pathlib import Path, PurePosixPath
import re
import tempfile
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
STATUSES = {'idea', 'in-progress', 'maintained', 'paused', 'complete', 'archived'}
SECTIONS = {'overview', 'architecture', 'setup', 'operations', 'decisions', 'changelog'}
NAME = re.compile(r'^[A-Za-z0-9_.-]+$')


def api(endpoint):
    headers = {'User-Agent': 'jnap-project-log', 'Accept': 'application/vnd.github+json'}
    if os.environ.get('GITHUB_TOKEN'):
        headers['Authorization'] = 'Bearer ' + os.environ['GITHUB_TOKEN']
    with urlopen(Request('https://api.github.com/' + endpoint, headers=headers), timeout=40) as r:
        return json.load(r)


def validate_manifest(value):
    """Validate optional source metadata without inferring lifecycle from activity."""
    if not isinstance(value, dict) or value.get('version') != 1:
        raise ValueError('Unsupported project manifest')
    if set(value) - {'$schema', 'version', 'title', 'summary', 'status', 'topics', 'docs'}:
        raise ValueError('Unknown project manifest field')
    for key, limit in [('title', 120), ('summary', 600)]:
        if not isinstance(value.get(key), str) or not 1 <= len(value[key].strip()) <= limit:
            raise ValueError('Invalid project ' + key)
    if value.get('status') not in STATUSES:
        raise ValueError('Invalid project status')
    topics = value.get('topics', [])
    if not isinstance(topics, list) or len(topics) > 12 or any(not isinstance(t, str) or not 1 <= len(t) <= 60 for t in topics):
        raise ValueError('Invalid project topics')
    docs = value.get('docs', {})
    if not isinstance(docs, dict) or set(docs) - SECTIONS:
        raise ValueError('Invalid documentation sections')
    for path in docs.values():
        if not isinstance(path, str) or not path or path.startswith('/') or '\\' in path or any(p in {'.', '..', '.git'} for p in path.split('/')) or not (path.lower() == 'readme.md' or path.startswith('docs/')) or PurePosixPath(path).suffix.lower() not in {'.md', '.mdx'}:
            raise ValueError('Invalid source document path')
    return value


def repositories(owner, audience):
    """Enumerate all pages; private enumeration requires an authenticated owner."""
    if not NAME.fullmatch(owner):
        raise ValueError('Invalid owner')
    if audience == 'private':
        if not os.environ.get('GITHUB_TOKEN') or api('user').get('login', '').lower() != owner.lower():
            raise ValueError('Private log requires the owner account')
    result = []
    for page in range(1, 101):
        endpoint = f'user/repos?affiliation=owner&per_page=100&page={page}' if audience == 'private' else f'users/{owner}/repos?type=owner&per_page=100&page={page}'
        batch = api(endpoint)
        if not isinstance(batch, list):
            raise ValueError('Invalid repository response')
        result.extend(r for r in batch if r.get('owner', {}).get('login', '').lower() == owner.lower() and (audience == 'private' or r.get('private') is False))
        if len(batch) < 100:
            return result
    raise ValueError('Repository pagination exceeds limit')


def project(repo):
    name = repo['name']
    owner = repo['owner']['login']
    if not NAME.fullmatch(name) or not NAME.fullmatch(owner):
        raise ValueError('Invalid repository identity')
    branch = repo['default_branch']
    from urllib.parse import quote
    manifest = None
    try:
        raw = api(f'repos/{owner}/{name}/contents/project.json?ref={quote(branch, safe="")}')
        if raw.get('encoding') != 'base64' or raw.get('size', 100000) > 16384:
            raise ValueError('Invalid manifest file')
        manifest = validate_manifest(json.loads(base64.b64decode(raw['content'])))
    except HTTPError as e:
        if e.code != 404:
            raise
    title = manifest['title'] if manifest else name
    return {
        'repo': name, 'owner': owner, 'title': title,
        'summary': manifest['summary'] if manifest else repo.get('description') or '',
        'status': 'archived' if repo.get('archived') else manifest['status'] if manifest else 'unreported',
        'topics': manifest.get('topics', []) if manifest else repo.get('topics', []),
        'docs': manifest.get('docs', {}) if manifest else {},
        'visibility': 'private' if repo.get('private') else 'public',
        'fork': bool(repo.get('fork')), 'archived': bool(repo.get('archived')),
        # The wiki's own generated sync commits must not refresh its inventory forever.
        'language': repo.get('language'), 'pushedAt': None if owner.lower() == 'justin-napolitano' and name == 'portfolio-for-real' else repo.get('pushed_at'),
        'createdAt': repo.get('created_at'), 'branch': branch,
        'url': f'https://github.com/{owner}/{name}', 'hasManifest': manifest is not None,
    }


def write_snapshot(output, projects, audience):
    """Write atomically; reject private content in every public snapshot."""
    if audience == 'public' and any(p['visibility'] != 'public' for p in projects):
        raise ValueError('Private project in public output')
    if audience == 'private' and (output.resolve() == ROOT or ROOT in output.resolve().parents):
        raise ValueError('Private inventory must stay outside the public repository')
    projects = sorted(projects, key=lambda p: p['repo'].lower())
    old = json.loads(output.read_text()) if output.exists() else {}
    value = {'version': 1, 'audience': audience, 'generatedAt': dt.datetime.now(dt.timezone.utc).isoformat(), 'projects': projects}
    if old.get('projects') == projects and old.get('audience') == audience:
        return old
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile('w', dir=output.parent, encoding='utf-8', delete=False) as f:
        json.dump(value, f, ensure_ascii=False, indent=2)
        f.write('\n')
        temporary = f.name
    os.replace(temporary, output)
    return value


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--owner', default='justin-napolitano')
    parser.add_argument('--audience', choices=['public', 'private'], default='public')
    parser.add_argument('--output', type=Path, default=ROOT/'data/federated/projects.json')
    args = parser.parse_args()
    try:
        repos = repositories(args.owner, args.audience)
        with ThreadPoolExecutor(max_workers=6) as pool:
            projects = list(pool.map(project, repos))
        value = write_snapshot(args.output, projects, args.audience)
        print(json.dumps({'ok': True, 'projects': len(value['projects']), 'audience': args.audience}))
    except Exception as e:
        print(json.dumps({'ok': False, 'error': type(e).__name__, 'message': 'Project refresh failed; previous snapshot retained.'}))
        raise SystemExit(1)

if __name__ == '__main__':
    main()
