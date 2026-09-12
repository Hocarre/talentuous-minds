#!/usr/bin/env python3
"""
Serveur de développement local — Talentuous Minds Fellowship
=============================================================

Reproduit le comportement de Cloudflare Pages : les pages sont servies
**sans extension** (`/about` renvoie `about.html`, `/` renvoie `index.html`).

Pourquoi ce script ? `python3 -m http.server` ne sait pas faire cela : il
renverrait une erreur 404 sur `/about`. Ce serveur permet donc de tester le
site exactement comme il se comportera en production.

Usage :
    python3 serve.py            # port 8000 par défaut
    python3 serve.py 9000       # port personnalisé
"""

from __future__ import annotations

import http.server
import os
import socketserver
import sys
from pathlib import Path

DEFAULT_PORT = 8000
ROOT = Path(__file__).resolve().parent


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    """Gestionnaire qui résout les URLs propres vers les fichiers .html."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self) -> None:  # noqa: N802 (nom imposé par la stdlib)
        """Résout /about -> about.html avant de déléguer au gestionnaire standard."""
        # On ignore la query string et le fragment
        path = self.path.split("?")[0].split("#")[0]

        # Ne rien faire pour la racine (index.html est servi automatiquement)
        if path not in ("", "/"):
            local = Path(self.translate_path(path))

            # Si la ressource n'existe pas, tenter avec l'extension .html
            if not local.exists():
                candidate = Path(str(local) + ".html")
                if candidate.exists():
                    self.path = path + ".html"

        super().do_GET()

    def end_headers(self) -> None:
        """Désactive le cache pour voir les modifications immédiatement."""
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt: str, *args) -> None:
        """Journalisation compacte, sans les requêtes de favicon."""
        if "favicon" not in (args[0] if args else ""):
            sys.stderr.write("  %s\n" % (fmt % args))


def main() -> int:
    """Démarre le serveur sur le port demandé."""
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Port invalide : {sys.argv[1]}", file=sys.stderr)
            return 1

    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
            print()
            print("  Talentuous Minds Fellowship — serveur de développement")
            print(f"  Racine : {ROOT}")
            print(f"  URL    : http://localhost:{port}")
            print()
            print("  URLs propres actives : /about  /programs  /events  /services  /team  /contact")
            print("  Arrêt : Ctrl+C")
            print()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Serveur arrêté.")
    except OSError as exc:
        print(f"Impossible de démarrer le serveur : {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
