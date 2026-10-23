"""Serve an exported private wiki on loopback only; this is not hosted authentication."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class LocalOnly(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.headers.get('Host') not in {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}:
            self.send_error(403)
            return
        super().do_GET()

    def do_HEAD(self):
        if self.headers.get('Host') not in {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}:
            self.send_error(403)
            return
        super().do_HEAD()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'")
        super().end_headers()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def log_message(self, format, *args):
        pass  # Avoid logging private source paths.

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('directory', type=Path)
parser.add_argument('--port', type=int, default=4804)
args = parser.parse_args()
root = args.directory.resolve()
public_root = Path(__file__).resolve().parents[1]
if public_root == root or public_root in root.parents or not (root/'index.html').exists():
    raise SystemExit('Expected an exported private wiki outside the public repository')
print(f'Owner-local wiki: http://127.0.0.1:{args.port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', args.port), partial(LocalOnly, directory=str(root))).serve_forever()
