import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

spec = importlib.util.spec_from_file_location('sync_projects', Path(__file__).parents[1]/'scripts/sync-projects.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def repo(name='example', private=False):
    return {'name':name,'owner':{'login':'owner'},'private':private,'default_branch':'main','description':'Source description','fork':False,'archived':False}


class ProjectsTests(unittest.TestCase):
    def test_manifest_accepts_existing_doc_layout_and_rejects_unsafe_paths(self):
        manifest = {'version':1,'title':'Example','summary':'A useful project','status':'paused','docs':{'architecture':'docs/decisions/0001-architecture.md'}}
        self.assertEqual(m.validate_manifest(manifest), manifest)
        for path in ['../secret.md','/etc/passwd','docs/../secret.md','https://outside.test/a.md','docs/x\\secret.md']:
            with self.subTest(path=path), self.assertRaises(ValueError):
                m.validate_manifest({**manifest,'docs':{'overview':path}})
        with self.assertRaises(ValueError):
            m.validate_manifest({**manifest,'status':'assumed-active'})

    def test_full_pagination_excludes_private_and_foreign_repos(self):
        batches = [[repo(str(i)) for i in range(100)], [repo('last'),repo('private',True),{**repo('foreign'),'owner':{'login':'other'}}]]
        with patch.object(m,'api',side_effect=batches):
            self.assertEqual(len(m.repositories('owner','public')),101)

    def test_no_manifest_does_not_invent_summary_or_status(self):
        with patch.object(m,'api',side_effect=HTTPError('https://api.github.com',404,'missing',{},None)):
            value=m.project(repo())
        self.assertEqual(value['status'],'unreported')
        self.assertEqual(value['summary'],'Source description')
        self.assertFalse(value['hasManifest'])

    def test_failed_writes_leave_previous_and_public_rejects_private(self):
        with tempfile.TemporaryDirectory() as directory:
            output=Path(directory)/'projects.json'
            output.write_text('previous')
            with self.assertRaises(ValueError):
                m.write_snapshot(output,[{'visibility':'private'}],'public')
            self.assertEqual(output.read_text(),'previous')
        with self.assertRaises(ValueError):
            m.write_snapshot(m.ROOT/'data/unsafe.json',[],'private')

    def test_unchanged_inventory_is_idempotent_and_deletions_disappear(self):
        with tempfile.TemporaryDirectory() as directory:
            output=Path(directory)/'projects.json'
            project={'repo':'example','visibility':'public'}
            first=m.write_snapshot(output,[project],'public')
            self.assertEqual(first,m.write_snapshot(output,[project],'public'))
            self.assertEqual(m.write_snapshot(output,[],'public')['projects'],[])

    def test_wiki_sync_commits_do_not_change_project_activity(self):
        value = {**repo('portfolio-for-real'), 'owner': {'login':'justin-napolitano'}, 'pushed_at':'2026-01-01T00:00:00Z'}
        with patch.object(m,'api',side_effect=HTTPError('https://api.github.com',404,'missing',{},None)):
            first=m.project(value)
            second=m.project({**value,'pushed_at':'2026-01-02T00:00:00Z'})
        self.assertEqual(first,second)
        self.assertIsNone(first['pushedAt'])

    def test_private_inventory_requires_owner_identity(self):
        with patch.dict(m.os.environ,{'GITHUB_TOKEN':'synthetic-test-value'}),patch.object(m,'api',return_value={'login':'other'}),self.assertRaises(ValueError):
            m.repositories('owner','private')
