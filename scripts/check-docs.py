"""Validate snapshot provenance, publication paths, counts and route uniqueness offline."""
import importlib.util
import json
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("sync_docs", root / "scripts/sync-docs.py")
sync_docs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync_docs)
config = json.loads((root / "docs-sources.json").read_text())
catalog = json.loads((root / "data/federated/catalog.json").read_text())
configured = {s["repo"]: s for s in config["sources"]}
assert catalog["version"] == 1
routes = set()
for source in catalog["sources"]:
    assert source["repo"] in configured and source["owner"] == configured[source["repo"]]["owner"]
    assert re.fullmatch("[a-f0-9]{40}", source["commit"])
    documents = [d for d in catalog["documents"] if d["repo"] == source["repo"]]
    assert len(documents) == source["documentCount"]
    for document in documents:
        assert sync_docs.selected_path(document["path"], configured[source["repo"]].get("exclude", []))
        assert document["href"] == sync_docs.route_for(source["repo"], document["path"])
        assert document["href"] not in routes
        assert len(document["body"].encode()) <= sync_docs.MAX_DOCUMENT
        routes.add(document["href"])
    digest = sync_docs.hashlib.sha256(json.dumps({d["path"]: (d["title"], d["body"]) for d in documents}, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    assert digest == source["contentHash"]
assert len(routes) == len(catalog["documents"])
print(json.dumps({"ok": True, "sources": len(catalog["sources"]), "documents": len(routes)}))
