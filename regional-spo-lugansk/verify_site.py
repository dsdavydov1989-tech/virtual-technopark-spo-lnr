"""Check that navigation anchors, local assets and SVG illustrations are valid."""

from html.parser import HTMLParser
from pathlib import Path
import re
import xml.etree.ElementTree as ET


ROOT = Path(__file__).parent


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            self.ids.add(values["id"])
        for attr in ("href", "src"):
            if values.get(attr):
                self.references.append(values[attr])


page = Links()
page.feed((ROOT / "index.html").read_text(encoding="utf-8"))
for reference in page.references:
    if reference.startswith(("https://", "http://")):
        continue
    if reference.startswith("#"):
        assert reference[1:] in page.ids, f"Broken page anchor: {reference}"
    else:
        assert (ROOT / reference).is_file(), f"Missing asset: {reference}"

for illustration in ("center-concept.svg", "floor-plans.svg", "lnr-coat-of-arms.svg"):
    ET.parse(ROOT / "assets" / illustration)
for illustration in sorted((ROOT / "assets").glob("cnc-part-*.svg")):
    ET.parse(illustration)
assert len(list((ROOT / "assets").glob("cnc-part-*.svg"))) == 5, "Expected five CNC part diagrams"

for style in ("styles.css", "redesign.css"):
    css = (ROOT / style).read_text(encoding="utf-8")
    for relative in re.findall(r"url\(['\"]?(assets/[^)'\"]+)", css):
        assert (ROOT / relative).is_file(), f"Missing stylesheet asset: {relative}"

for photograph in ("welder.jpg", "cnc-lathe.jpg", "cnc-milling.jpg", "catalog-evomig.jpg", "catalog-evotig.jpg", "catalog-lightweld.jpg", "catalog-cassi.jpg"):
    assert (ROOT / "assets" / photograph).read_bytes().startswith(b"\xff\xd8\xff"), f"Invalid JPEG: {photograph}"
assert (ROOT / "assets" / "professionalitet-logo.png").read_bytes().startswith(b"\x89PNG\r\n\x1a\n"), "Invalid project logo PNG"

print(f"OK: {len(page.references)} references resolve; 8 SVGs parse; 8 raster signatures valid")
