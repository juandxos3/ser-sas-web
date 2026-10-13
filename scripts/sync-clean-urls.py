#!/usr/bin/env python3
"""Regenerate clean URL pages after editing servicios.html, nosotros.html or contacto.html."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
for name in ("servicios", "nosotros", "contacto"):
    source = ROOT / (name + ".html")
    destination = ROOT / name / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    header = "<!-- Generated from " + source.name + ". Run python scripts/sync-clean-urls.py after editing the source. -->\n"
    destination.write_bytes(header.encode("utf-8") + source.read_bytes())
