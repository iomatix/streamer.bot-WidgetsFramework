import http.server
import socketserver
import os
import sys

# Domyślny port
DEFAULT_PORT = 8181

# Jeśli podano argument, użyj go
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print("Nieprawidłowy port, używam domyślnego:", DEFAULT_PORT)
        PORT = DEFAULT_PORT
else:
    PORT = DEFAULT_PORT

# Ustaw katalog roboczy na folder skryptu
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serwer działa na http://localhost:{PORT}")
    httpd.serve_forever()