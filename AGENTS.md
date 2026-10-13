# Static website editing

The root HTML files are the source pages. The clean URL copies in servicios/index.html, nosotros/index.html and contacto/index.html are generated.

After editing any source page, run `python scripts/sync-clean-urls.py` and include changed generated pages in the same commit. Do not edit generated pages independently.

Keep navigation root-relative (/, /servicios/, /nosotros/, /contacto/), asset URLs root-relative, canonical URLs consistent with sitemap.xml, and legacy .html pages accessible.
