"""Validate the public inventory and repository-owned project metadata offline."""
import importlib.util
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('sync_projects', root/'scripts/sync-projects.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.validate_manifest(json.loads((root/'project.json').read_text()))
value = json.loads((root/'data/federated/projects.json').read_text())
assert value['version'] == 1 and value['audience'] == 'public'
assert len({p['repo'] for p in value['projects']}) == len(value['projects'])
for p in value['projects']:
    assert p['visibility'] == 'public'
    assert module.NAME.fullmatch(p['repo']) and module.NAME.fullmatch(p['owner'])
    assert p['status'] in module.STATUSES | {'unreported'}
    assert p['url'] == f"https://github.com/{p['owner']}/{p['repo']}"
print(json.dumps({'ok':True,'projects':len(value['projects'])}))
