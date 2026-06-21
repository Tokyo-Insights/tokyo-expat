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


def draw_circle_bg(draw, size, color):
    margin = 4
    draw.ellipse([margin, margin, size - margin, size - margin], fill=color)


def draw_house(draw, cx, cy, w, h, color):
    """Dessine une maison simple : toit triangulaire + corps rectangulaire + fenetre"""
    # Toit
    roof_pts = [(cx, cy - h // 2), (cx - w // 2, cy), (cx + w // 2, cy)]
    draw.polygon(roof_pts, fill=color)
    # Corps
    body_top = cy
    body_bot = cy + h // 2
    body_left = cx - w // 3
    body_right = cx + w // 3
    draw.rectangle([body_left, body_top, body_right, body_bot], fill=color)
    # Porte/fenetre (trou bleu dans le corps blanc)
    door_w, door_h = 36, 36
    draw.rectangle(
        [cx - door_w // 2, body_top + 14, cx + door_w // 2, body_top + 14 + door_h],
        fill=BLUE
    )


def try_font(size):
    for name in ["arialbd.ttf", "Arial_Bold.ttf", "DejaVuSans-Bold.ttf", "arial.ttf"]:
        try:
            import os
            for base in ["C:/Windows/Fonts", "/usr/share/fonts/truetype/dejavu", "/System/Library/Fonts"]:
                p = Path(base) / name
                if p.exists():
                    return ImageFont.truetype(str(p), size)
        except Exception:
            pass
    return ImageFont.load_default()


img = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Cercle de fond bleu
draw_circle_bg(draw, SIZE, BLUE)

# Maison blanche centree
draw_house(draw, cx=SIZE // 2, cy=170, w=220, h=160, color=WHITE)

# Texte Tokyo
font_big = try_font(76)
draw.text((SIZE // 2, 360), "Tokyo", font=font_big, fill=WHITE, anchor="mm")
draw.text((SIZE // 2, 445), "Expat", font=font_big, fill=RED, anchor="mm")

# Convertit en RGB et sauvegarde
rgb = Image.new("RGB", (SIZE, SIZE), WHITE)
rgb.paste(img, mask=img.split()[3])
rgb.save(OUT, "PNG", optimize=True)
print(f"Logo genere: {OUT}")
print(f"Taille: {OUT.stat().st_size // 1024} KB")
print("Utilise ce fichier pour:")
print("  - Avatar Expat.com")
print("  - Photo de profil Facebook Page")
print("  - Partout ou on te demande un logo carre")
