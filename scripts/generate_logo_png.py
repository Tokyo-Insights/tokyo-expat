"""
generate_logo_png.py - Genere logo-square.png 500x500 pour reseaux sociaux
Output: public/logo-square.png
Utilisation: python scripts/generate_logo_png.py
"""
import sys
import math
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Installation Pillow...")
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "Pillow",
                    "--trusted-host", "pypi.org", "--trusted-host", "files.pythonhosted.org"], check=True)
    from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent.parent / "public" / "logo-square.png"
SIZE = 500
BLUE = (15, 39, 68)    # #0f2744
RED = (232, 65, 65)    # #e84141
WHITE = (255, 255, 255)

# Tailles en proportion du canvas 500x500
CIRCLE_R = 240        # rayon du cercle bleu
HOUSE_CX = SIZE // 2
HOUSE_CY = 175        # centre vertical de la maison
HOUSE_W = 190         # largeur toit
HOUSE_H = 145         # hauteur totale maison
TEXT_Y1 = 365         # ligne "Tokyo"
TEXT_Y2 = 440         # ligne "Expat"
FONT_SIZE = 80


def draw_circle_bg(draw, size, r, color):
    cx = cy = size // 2
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)


def draw_house(draw, cx, cy, w, h, color, bg):
    # Toit triangulaire
    roof_pts = [(cx, cy - h // 2), (cx - w // 2, cy - 5), (cx + w // 2, cy - 5)]
    draw.polygon(roof_pts, fill=color)
    # Corps rectangulaire
    bw = int(w * 0.55)
    body_top = cy - 5
    body_bot = cy + h // 2
    draw.rectangle([cx - bw // 2, body_top, cx + bw // 2, body_bot], fill=color)
    # Fenetre (trou couleur fond)
    fw = 38
    fh = 38
    draw.rectangle([cx - fw // 2, body_top + 18, cx + fw // 2, body_top + 18 + fh], fill=bg)


def try_font(size):
    for name in ["arialbd.ttf", "Arial_Bold.ttf", "DejaVuSans-Bold.ttf", "arial.ttf"]:
        try:
            for base in ["C:/Windows/Fonts", "/usr/share/fonts/truetype/dejavu", "/System/Library/Fonts"]:
                p = Path(base) / name
                if p.exists():
                    return ImageFont.truetype(str(p), size)
        except Exception:
            pass
    return ImageFont.load_default()


def generate(out_path, size=500):
    img = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw_circle_bg(draw, size, CIRCLE_R, BLUE)
    draw_house(draw, HOUSE_CX, HOUSE_CY, HOUSE_W, HOUSE_H, WHITE, BLUE)
    font = try_font(FONT_SIZE)
    draw.text((size // 2, TEXT_Y1), "Tokyo", font=font, fill=WHITE, anchor="mm")
    draw.text((size // 2, TEXT_Y2), "Expat", font=font, fill=RED, anchor="mm")
    rgb = Image.new("RGB", (size, size), WHITE)
    rgb.paste(img, mask=img.split()[3])
    rgb.save(out_path, "PNG", optimize=True)
    return out_path


# Logo 500x500 pour reseaux sociaux
out = generate(OUT)
print(f"Logo social: {out} ({out.stat().st_size // 1024} KB)")

# Favicon 32x32 statique pour public/favicon.ico
favicon_path = Path(__file__).parent.parent / "public" / "favicon.png"
generate(favicon_path, size=64)

# Convertit en .ico via Pillow
ico_path = Path(__file__).parent.parent / "public" / "favicon.ico"
favicon_img = Image.open(favicon_path).convert("RGBA")
# Cree ico avec plusieurs tailles
favicon_img.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print(f"Favicon ICO: {ico_path}")
print("\nActions requises:")
print("  1. public/logo-square.png -> upload sur Expat.com + Facebook Page")
print("  2. public/favicon.ico -> favicon statique (deja dans public/, sera servi automatiquement)")
