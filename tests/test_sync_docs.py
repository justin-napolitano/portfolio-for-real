import importlib.util
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

spec = importlib.util.spec_from_file_location("sync_docs", Path(__file__).parents[1] / "scripts/sync-docs.py")
sync_docs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync_docs)


def archive(files):
    result = io.BytesIO()
    with tarfile.open(fileobj=result, mode="w:gz") as output:
        for name, body in files.items():
            item = tarfile.TarInfo("repo-sha/" + name)
            payload = body.encode()
            item.size = len(payload)
            output.addfile(item, io.BytesIO(payload))
        link = tarfile.TarInfo("repo-sha/docs/link.md")
        link.type = tarfile.SYMTYPE
        link.linkname = "/etc/passwd"
        output.addfile(link)
    result.seek(0)
    return result


def source(files, commit="a" * 40):
    return {"owner": "example", "repo": "project", "branch": "main", "commit": commit, "commitDate": "2026-01-01T00:00:00Z", "topics": ["Tools"], "documents": files}


class SyncDocsTests(unittest.TestCase):
    def test_archive_selects_docs_and_does_not_extract_or_execute(self):
        docs = sync_docs.archive_documents(archive({"README.md": "# Project\nStart", "docs/guide.md": "# Guide", "docs/../outside.md": "bad", ".agent/plan.md": "bad", "src/run.py": "raise Exception()", "docs/branding/review.md": "excluded"}), [])
        self.assertEqual(set(docs), {"README.md", "docs/guide.md"})

    def test_source_owned_private_and_draft_flags_are_excluded(self):
        for metadata in ["draft: true", "private: yes", "publish: false", "visibility: internal", "visibility: 'private'"]:
            self.assertIsNone(sync_docs.parse_document(f"---\n{metadata}\n---\n# Hidden", "docs/test.md"))
        self.assertEqual(sync_docs.parse_document("---\ntitle: 'Named guide'\n---\nBody", "docs/test.md"), ("Named guide", "Body"))

    def test_oversized_document_fails_instead_of_silently_truncating(self):
        with patch.object(sync_docs, "MAX_DOCUMENT", 10), self.assertRaises(ValueError):
            sync_docs.archive_documents(archive({"docs/large.md": "a" * 11}), [])

    def test_deleted_files_disappear_and_snapshots_are_idempotent(self):
        first = sync_docs.create_snapshot([source({"README.md": ("Project", "Hello"), "docs/old.md": ("Old", "Gone")})])
        unchanged = sync_docs.create_snapshot([source({"README.md": ("Project", "Hello"), "docs/old.md": ("Old", "Gone")}, "b" * 40)], first)
        self.assertEqual(first, unchanged)
        changed = sync_docs.create_snapshot([source({"README.md": ("Project", "New")}, "c" * 40)], first)
        self.assertEqual([d["path"] for d in changed["documents"]], ["README.md"])
        self.assertEqual(changed["sources"][0]["commit"], "c" * 40)

    def test_private_and_transferred_sources_cannot_be_imported(self):
        with patch.object(sync_docs, "github_json", return_value={"private": True}):
            self.assertIsNone(sync_docs.fetch_source({"owner": "example", "repo": "project"}))
        with patch.object(sync_docs, "github_json", return_value={"private": False, "full_name": "other/project"}), self.assertRaises(ValueError):
            sync_docs.fetch_source({"owner": "example", "repo": "project"})

    def test_failure_retains_previous_complete_output_and_withdrawal_prunes_it(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config = root / "sources.json"
            config.write_text(json.dumps({"version": 1, "sources": [{"owner": "example", "repo": "project"}]}))
            output = root / "catalog.json"
            before = json.dumps(sync_docs.create_snapshot([source({"README.md": ("Project", "Old")})]))
            output.write_text(before)
            with patch.object(sync_docs, "fetch_source", side_effect=TimeoutError()), self.assertRaises(TimeoutError):
                sync_docs.sync(config, output)
            self.assertEqual(output.read_text(), before)
            with patch.object(sync_docs, "fetch_source", return_value=None):
                sync_docs.sync(config, output)
            self.assertEqual(json.loads(output.read_text())["documents"], [])

    def test_private_output_cannot_be_written_into_public_repository(self):
        with self.assertRaises(ValueError):
            sync_docs.sync(Path('unused.json'), sync_docs.ROOT/'data/unsafe.json', private=True)

    def test_private_archive_redirect_strips_authentication_and_blocks_other_hosts(self):
        from urllib.request import Request
        request = Request('https://api.github.com/repos/example/project/tarball/'+'a'*40, headers={'Authorization':'Bearer synthetic-test-value'})
        handler = sync_docs.ArchiveRedirect()
        redirected = handler.redirect_request(request, None, 302, 'Found', {}, 'https://codeload.github.com/example/project/tar.gz/a')
        self.assertIsNone(redirected.get_header('Authorization'))
        with self.assertRaises(ValueError):
            handler.redirect_request(request, None, 302, 'Found', {}, 'https://outside.test/archive')

    def test_unicode_and_encoded_source_paths_keep_unique_routes(self):
        self.assertEqual(sync_docs.route_for("repo", "README.md"), "/docs/repo")
        self.assertEqual(sync_docs.route_for("repo", "docs/A guide.md"), "/docs/repo/docs/A%20guide.md")
        self.assertNotEqual(sync_docs.route_for("repo", "docs/a.md"), sync_docs.route_for("repo", "docs/a.mdx"))


if __name__ == "__main__":
    unittest.main()
