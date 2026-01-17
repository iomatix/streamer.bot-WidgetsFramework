import http.server
import socketserver
import os
import sys

DEFAULT_PORT = 8181

# Port with argument or default
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print("Nieprawidłowy port, używam domyślnego:", DEFAULT_PORT)
        PORT = DEFAULT_PORT
else:
    PORT = DEFAULT_PORT

# Set project root
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(PROJECT_ROOT)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

# Server works from the project root
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serwer działa na http://localhost:{PORT}")
    print(f"Serwuję katalog: {PROJECT_ROOT}")
    httpd.serve_forever()
