# -*- coding: utf-8 -*-
"""Genere une COUVERTURE (thumbnail) branded 1080x1920 pour un short.
`python gen_cover.py M2 fr`  ->  video_assets/<out>-cover.jpg
Design: frame Tokyo + scrim + gros titre-accroche (Impact, chiffres en jaune) + logo.
Le texte est centre verticalement (survit au crop de la grille de profil TikTok/IG/YT).
Headline = champ cover_<lang> de shorts_meta (2 lignes, separees par |). Uploade sur le release.
"""
import sys, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import shorts_meta as SM

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "video_assets"
BROLL = ASSETS / "broll"
LOGO = ROOT / "public" / "logo-square.png"
FONT = "C:/Windows/Fonts/impact.ttf"
W, H = 1080, 1920
YELLOW, WHITE = (255, 212, 0), (255, 255, 255)
RELEASE_TAG, GH_REPO = "media", "Tokyo-Insights/tokyo-expat"


def bg_frame(clip):
    """Extrait une frame nette d'un clip b-roll -> image PIL cover-crop 1080x1920."""
    tmp = ASSETS / "cache" / "_coverbg.jpg"
    subprocess.run(["ffmpeg", "-y", "-ss", "1.5", "-i", str(BROLL / clip), "-frames:v", "1",
                    "-q:v", "2", str(tmp)], capture_output=True, text=True)
    return ImageOps.fit(Image.open(tmp).convert("RGB"), (W, H), Image.LANCZOS)


def is_hot(word):
    return any(c.isdigit() for c in word) or "%" in word or "+" in word


def draw_line(draw, words, font, cy):
    widths = [draw.textlength(w + " ", font=font) for w in words]
    total = sum(widths)
    x = (W - total) / 2
    asc, desc = font.getmetrics()
    for w, wd in zip(words, widths):
        draw.text((x, cy), w, font=font, fill=(YELLOW if is_hot(w) else WHITE),
                  stroke_width=10, stroke_fill=(0, 0, 0))
        x += wd
    return asc + desc


def fit_font(draw, line, size):
    while size > 60:
        f = ImageFont.truetype(FONT, size)
        if draw.textlength(line.replace("|", " "), font=f) <= W * 0.88:
            return f
        size -= 8
    return ImageFont.truetype(FONT, size)


def build(key, lang):
    m = SM.MUNITIONS[key]
    headline = m.get("cover_" + lang)
    if not headline:
        raise SystemExit(f"pas de cover_{lang} pour {key}")
    clip = (m.get("clips") or ["tk05.mp4"])[0]
    if clip == "__CHART__":
        clip = "tk05.mp4"
    img = bg_frame(clip)
    img = Image.blend(img, Image.new("RGB", (W, H), (0, 0, 0)), 0.48)   # scrim lisibilite
    draw = ImageDraw.Draw(img)
    lines = [ln.strip() for ln in headline.split("|")]
    font = fit_font(draw, max(lines, key=len), 175)
    lh = font.getmetrics()[0] + font.getmetrics()[1]
    total_h = lh * len(lines)
    y = H * 0.50 - total_h / 2
    for ln in lines:
        draw_line(draw, ln.split(), font, y)
        y += lh
    # logo + domaine en bas
    if LOGO.exists():
        lg = Image.open(LOGO).convert("RGBA"); lg.thumbnail((150, 150))
        img.paste(lg, ((W - lg.width) // 2, int(H * 0.86)), lg)
    dfont = ImageFont.truetype(FONT, 46)
    dt = "TOKYO-EXPAT.COM"
    draw.text(((W - draw.textlength(dt, font=dfont)) / 2, int(H * 0.92)), dt,
              font=dfont, fill=WHITE, stroke_width=4, stroke_fill=(0, 0, 0))
    out = ASSETS / (m["out_" + lang] + "-cover.jpg")
    img.save(out, quality=90)
    print("OK cover:", out)
    return out


def publish(path):
    r = subprocess.run(["gh", "release", "upload", RELEASE_TAG, str(path), "--clobber",
                        "--repo", GH_REPO], capture_output=True, text=True)
    if r.returncode != 0:
        print("WARN upload cover KO:", r.stderr[-300:]); return None
    return f"https://github.com/{GH_REPO}/releases/download/{RELEASE_TAG}/{path.name}"


if __name__ == "__main__":
    p = build(sys.argv[1].upper(), sys.argv[2].lower())
    if "--publish" in sys.argv:
        u = publish(p); print("HEBERGEE:", u) if u else None
