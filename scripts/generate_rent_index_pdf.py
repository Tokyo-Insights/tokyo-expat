# -*- coding: utf-8 -*-
"""
generate_rent_index_pdf.py -- Lead magnet /data : PDF telechargeable de l'INDICE
COMPLET des loyers de Tokyo (23 wards + 27 lignes + 50 stations, 1K/1LDK/2LDK).

Offert contre email sur /data (le visiteur data veut la donnee, tout de suite).
Source: lib/tokyoRentIndex.json. Ecrit public/tokyo-rent-index-2026-en.pdf + -fr.pdf.

  python scripts/generate_rent_index_pdf.py
"""
import json
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Table, TableStyle, Paragraph,
                                Spacer, KeepTogether)

ROOT = Path("C:/Users/alegu/Desktop/tokyo-expat")
DATA = ROOT / "lib" / "tokyoRentIndex.json"

NAVY = colors.HexColor("#0f2744")
RED = colors.HexColor("#e84141")
LIGHT = colors.HexColor("#f3f4f6")
GREY = colors.HexColor("#6b7280")

d = json.loads(DATA.read_text(encoding="utf-8"))
YEAR = str(d.get("generated", "2026"))[:4]
TOTAL = f"{int(d['total_listings']):,}"


def yen(n):
    return f"¥{int(n):,}" if n else "n/a"


def rows(items, name_key):
    out = []
    for it in items:
        r = it.get("rents", {})
        if "1K" not in r:
            continue
        out.append((it[name_key],
                    r.get("1K", {}).get("median"),
                    r.get("1LDK", {}).get("median"),
                    r.get("2LDK", {}).get("median")))
    out.sort(key=lambda x: x[1] or 0)
    return out


LABELS = {
    "en": {
        "title": f"Tokyo Rent Index {YEAR}",
        "sub": (f"Median monthly rent (JPY) for a 1K studio, a 1LDK and a 2LDK, by ward, "
                f"train line and station. Computed from {TOTAL} active listings across "
                f"Tokyo's 23 wards ({YEAR}, Q2)."),
        "s_ward": "By ward", "s_line": "By train line", "s_station": "By station",
        "c_ward": "Ward", "c_line": "Train line", "c_station": "Station",
        "foot": (f"Source: Tokyo Expat, tokyo-expat.com/en/data ({YEAR}). Median, not average. "
                 f"(c) {YEAR} Tokyo Expat. Reference figures with a link to the page."),
        "more": "Full interactive tables, price trends and an affordability tool: tokyo-expat.com/en/data",
    },
    "fr": {
        "title": f"Indice des loyers de Tokyo {YEAR}",
        "sub": (f"Loyer mensuel median (JPY) pour un studio 1K, un 1LDK et un 2LDK, par "
                f"arrondissement, ligne et station. Calcule sur {TOTAL} annonces actives dans "
                f"les 23 arrondissements de Tokyo ({YEAR}, T2)."),
        "s_ward": "Par arrondissement", "s_line": "Par ligne", "s_station": "Par station",
        "c_ward": "Arrondissement", "c_line": "Ligne", "c_station": "Station",
        "foot": (f"Source : Tokyo Expat, tokyo-expat.com/fr/data ({YEAR}). Mediane, pas moyenne. "
                 f"(c) {YEAR} Tokyo Expat. Citez un chiffre avec un lien vers la page."),
        "more": "Tables interactives completes, evolution des prix et simulateur : tokyo-expat.com/fr/data",
    },
}

ward_rows = rows(d["wards"], "ward_en")
line_rows = rows(d["lines"], "line_en")
station_rows = rows(d["stations"], "station_en")


def build(locale):
    L = LABELS[locale]
    out = ROOT / "public" / f"tokyo-rent-index-{locale}.pdf"
    styles = getSampleStyleSheet()
    h1 = ParagraphStyle("h1", parent=styles["Title"], textColor=NAVY, fontSize=22,
                        spaceAfter=6, alignment=0)
    sub = ParagraphStyle("sub", parent=styles["Normal"], textColor=GREY, fontSize=9.5,
                         leading=13, spaceAfter=14)
    h2 = ParagraphStyle("h2", parent=styles["Heading2"], textColor=NAVY, fontSize=13,
                        spaceBefore=10, spaceAfter=6)
    foot = ParagraphStyle("foot", parent=styles["Normal"], textColor=GREY, fontSize=7.5,
                          leading=10, spaceBefore=14)
    more = ParagraphStyle("more", parent=styles["Normal"], textColor=RED, fontSize=9,
                          leading=12, spaceBefore=10)

    doc = SimpleDocTemplate(str(out), pagesize=A4,
                            leftMargin=16*mm, rightMargin=16*mm,
                            topMargin=16*mm, bottomMargin=14*mm,
                            title=L["title"], author="Tokyo Expat")

    def table(header_label, data_rows):
        head = [header_label, "1K", "1LDK", "2LDK"]
        body = [head] + [[n, yen(a), yen(b), yen(c)] for (n, a, b, c) in data_rows]
        t = Table(body, colWidths=[70*mm, 34*mm, 34*mm, 34*mm], repeatRows=1)
        style = [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8.5),
            ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
            ("ALIGN", (0, 0), (0, -1), "LEFT"),
            ("FONTNAME", (1, 1), (-1, -1), "Helvetica"),
            ("TEXTCOLOR", (0, 1), (0, -1), NAVY),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LINEBELOW", (0, 0), (-1, 0), 0.5, NAVY),
            ("LINEBELOW", (0, 1), (-1, -1), 0.25, colors.HexColor("#e5e7eb")),
        ]
        for i in range(1, len(body)):
            if i % 2 == 0:
                style.append(("BACKGROUND", (0, i), (-1, i), LIGHT))
        t.setStyle(TableStyle(style))
        return t

    story = [
        Paragraph(L["title"], h1),
        Paragraph(L["sub"], sub),
        Paragraph(L["s_ward"], h2), table(L["c_ward"], ward_rows),
        Paragraph(L["s_line"], h2), table(L["c_line"], line_rows),
        Paragraph(L["s_station"], h2), table(L["c_station"], station_rows),
        Paragraph(L["more"], more),
        Paragraph(L["foot"], foot),
    ]
    doc.build(story)
    print(f"Ecrit: {out}  ({len(ward_rows)} wards, {len(line_rows)} lignes, {len(station_rows)} stations)")


for loc in ("en", "fr"):
    build(loc)
