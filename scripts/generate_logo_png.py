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

HOUSE_CX = SIZE // 2
HOUSE_CY = 178
HOUSE_W = 120
HOUSE_H = 90
TEXT_Y1 = 313
TEXT_Y2 = 383
FONT_SIZE = 58


def draw_house(draw, cx, cy, w, h, color, bg):
    roof_pts = [(cx, cy - h // 2), (cx - w // 2, cy - 5), (cx + w // 2, cy - 5)]
    draw.polygon(roof_pts, fill=color)
    bw = int(w * 0.56)
    body_top = cy - 5
    body_bot = cy + h // 2
    draw.rectangle([cx - bw // 2, body_top, cx + bw // 2, body_bot], fill=color)
    fw, fh = 40, 40
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


def generate_social(out_path, size=500):
    """Logo carre fond bleu PLEIN - pas de blanc autour.
    Quand Expat.com/Facebook crop en cercle, le fond bleu remplit parfaitement."""
    img = Image.new("RGB", (size, size), BLUE)
    draw = ImageDraw.Draw(img)
    draw_house(draw, HOUSE_CX, HOUSE_CY, HOUSE_W, HOUSE_H, WHITE, BLUE)
    font = try_font(FONT_SIZE)
    draw.text((size // 2, TEXT_Y1), "Tokyo", font=font, fill=WHITE, anchor="mm")
    draw.text((size // 2, TEXT_Y2), "Expat", font=font, fill=RED, anchor="mm")
    img.save(out_path, "PNG", optimize=True)
    return Path(out_path)


# Logo 500x500 fond bleu plein pour reseaux sociaux
out = generate_social(OUT)
print(f"Logo social: {out} ({out.stat().st_size // 1024} KB)")
print("Fond bleu plein = pas de barres noires sur Expat.com / Facebook")
print("\nUpload ce fichier comme avatar sur toutes les plateformes:")
