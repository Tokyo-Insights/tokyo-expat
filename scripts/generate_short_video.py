# -*- coding: utf-8 -*-
"""
generate_short_video.py -- Genere un SHORT vertical 9:16 (TikTok/IG/YouTube Shorts)
au format viral valide avec Alessandro (11/08/2026).

Pipeline (100% gratuit hors palier ElevenLabs) :
  1. Voix off ElevenLabs (voix Lily, modele multilingual_v2, FR emotionnel) + timestamps au mot.
     -> cache par hash du script dans video_assets/cache/ (0 quota si script inchange).
  2. Sous-titres style "Hormozi" : 1 mot a la fois, police Impact, POP (scale-in),
     mots-cles + domaine en JAUNE, centres. (BUG A EVITER: la ligne ASS [Events] Format
     doit declarer les 10 colonnes, sinon ",0,0,0,," s'affiche comme texte.)
  3. B-roll vertical (blur-fill) + coupes rapides (hook = 3 plans courts), depuis video_assets/broll/.
     -> CURATION OBLIGATOIRE: verifier chaque clip a l'oeil (extraire une vignette) avant usage,
        les tags stock ramenent souvent du non-Tokyo (immeubles russes, lifestyle hors-sujet).
  4. Musique de fond libre (Mixkit) baissee sous la voix + fade out.

Prerequis: ELEVENLABS_API_KEY dans scripts/.env (gitignore). ffmpeg dans le PATH.
Config: editer le bloc CONFIG ci-dessous (script, clips, sortie).
Run: python scripts/generate_short_video.py
"""
import os, re, sys, io, json, base64, hashlib, subprocess
from pathlib import Path
import requests, urllib3
urllib3.disable_warnings()
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "video_assets"
CACHE = ASSETS / "cache"; CACHE.mkdir(parents=True, exist_ok=True)

# ============================== CONFIG (a editer) ==============================
# Texte parle. Pour un domaine, ecrire "point com" (la voix le prononce, le sous-titre
# affichera BRAND_DISPLAY a la place). ~55-65 mots = ~25s (viser 15-30s).
SCRIPT = ("Un appartement standard à Tokyo demande cinq mois de loyer d'avance, et un garant. Mais ce n'est pas "
"ta seule option. Une share house: un mois, sans garant. Un meublé au mois: un mois et demi, sans garant. "
"Un logement U R: pas d'argent-clé, pas de garant du tout. Choisis la voie qui te correspond. "
"Vois-les toutes sur tokyo-expat point com.")
# Ordre des plans. "__CHART__" = insere le chart data. Sinon nom de fichier dans video_assets/broll/.
CLIPS = ["tk00.mp4", "tk05.mp4", "ap00.mp4", "__CHART__", "ap01.mp4",
         "tk02.mp4", "tk03.mp4", "tk04.mp4", "tk01.mp4"]
CHART = ROOT / "outreach" / "tokyo-housing-barrier-fr.png"   # visuel du beat "__CHART__"
# NOM UNIQUE ET DESCRIPTIF PAR SHORT: sert de nom d'asset GitHub Release + d'URL publique.
# Ne JAMAIS reutiliser un nom deja publie (--clobber ecraserait l'ancienne video en ligne).
OUTPUT = ASSETS / "voies-logement-fr.mp4"
MUSIC = ASSETS / "music.mp3"
WHOOSH = ASSETS / "whoosh.mp3"   # SFX transition sur chaque coupe
IMPACT = ASSETS / "impact.mp3"   # SFX impact sur le beat "__CHART__"
VOICE_ID = "pFZP5JQG7iQjIQuC4Bku"   # Lily (premade, gratuit). Autres gratuits: Sarah/Matilda/Alice.
MODEL = "eleven_multilingual_v2"
VOICE_SETTINGS = {"stability": 0.35, "similarity_boost": 0.8, "style": 0.35, "use_speaker_boost": True}
# Mots mis en JAUNE (emphase). Les nombres et le domaine sont jaunes automatiquement.
EMPH = {"CINQ", "GARANT", "SANS", "MOIS"}
BRAND_SPOKEN = ("tokyoexpat", "point", "com")   # sequence parlee a fusionner (FR = point, EN = dot)
BRAND_DISPLAY = "Tokyo-Expat.com"
W, H, FPS = 1080, 1920, 30
HOOK_N, HOOK_DUR = 3, 1.6   # 3 premiers plans courts (hook rapide)
# Hebergement de la video finale = asset d'un GitHub Release (repo PUBLIC) -> URL
# publique stable SANS committer la video dans le repo (zero bloat git). gh CLI requis.
RELEASE_TAG = "media"
GH_REPO = "Tokyo-Insights/tokyo-expat"
# ==============================================================================


def eleven_key():
    for line in (ROOT / "scripts" / ".env").read_text(encoding="utf-8").splitlines():
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("ELEVENLABS_API_KEY absent de scripts/.env")


def voice_and_alignment():
    """Retourne (mp3_path, alignment). Cache par hash du script (0 quota si inchange)."""
    h = hashlib.md5((SCRIPT + VOICE_ID + MODEL).encode()).hexdigest()[:12]
    mp3 = CACHE / f"voice_{h}.mp3"; alj = CACHE / f"align_{h}.json"
    if mp3.exists() and alj.exists():
        print("voix + alignement en cache (0 quota)")
        return mp3, json.loads(alj.read_text(encoding="utf-8"))
    r = requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps",
        headers={"xi-api-key": eleven_key(), "Content-Type": "application/json"},
        params={"output_format": "mp3_44100_128"},
        json={"text": SCRIPT, "model_id": MODEL, "voice_settings": VOICE_SETTINGS},
        timeout=120, verify=False)
    if r.status_code != 200:
        raise SystemExit(f"ElevenLabs {r.status_code}: {r.text[:200]}")
    d = r.json(); mp3.write_bytes(base64.b64decode(d["audio_base64"]))
    al = d.get("alignment") or d.get("normalized_alignment")
    alj.write_text(json.dumps(al), encoding="utf-8")
    print("voix generee + alignement mis en cache")
    return mp3, al


def words_from_alignment(al):
    chars, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    words = []; cur = ""; ws = None; we = 0
    for c, a, b in zip(chars, st, en):
        if c == " ":
            if cur:
                words.append((cur, ws, we)); cur = ""; ws = None
        else:
            if ws is None:
                ws = a
            cur += c; we = b
    if cur:
        words.append((cur, ws, we))
    # fusion domaine parle -> affichage
    n = lambda w: re.sub(r"[^\w]", "", w).lower()
    for i in range(len(words) - 2):
        if (n(words[i][0]), n(words[i+1][0]), n(words[i+2][0])) == BRAND_SPOKEN:
            words[i:i+3] = [(BRAND_DISPLAY, words[i][1], words[i+2][2])]
            break
    return words


def build_ass(words, dur, path):
    def col(w):
        c = re.sub(r"[^\wÀ-ÿ']", "", w).upper()
        yellow = any(ch.isdigit() for ch in c) or c in EMPH or "TOKYOEXPAT" in c
        return "&H0000FFFF&" if yellow else "&H00FFFFFF&"
    def t(s):
        return f"{int(s//3600)}:{int((s%3600)//60):02d}:{s%60:05.2f}"
    head = (f"[Script Info]\nScriptType: v4.00+\nPlayResX: {W}\nPlayResY: {H}\nScaledBorderAndShadow: yes\n"
            "[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, "
            "Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV\n"
            f"Style: Pop,Impact,150,&H00FFFFFF,&H00000000,&H00000000,0,9,4,5,40,40,40\n"
            "[Events]\n"  # NB: Format DOIT lister les 10 colonnes sinon ",0,0,0,," s'affiche
            "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
    lines = []
    for i, (txt, s, e) in enumerate(words):
        start = 0.0 if i == 0 else words[i][1]
        end = words[i+1][1] if i+1 < len(words) else dur
        if end <= start:
            end = start + 0.2
        tag = f"{{\\an5\\pos({W//2},1180)\\c{col(txt)}\\fscx55\\fscy55\\t(0,90,\\fscx100\\fscy100)}}"
        lines.append(f"Dialogue: 0,{t(start)},{t(end)},Pop,,0,0,0,,{tag}{txt.upper()}")
    path.write_text(head + "\n".join(lines) + "\n", encoding="utf-8")


def ffprobe_dur(p):
    out = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                          "-of", "json", str(p)], capture_output=True, text=True).stdout
    return float(json.loads(out)["format"]["duration"])


def make_segment(src, d, out):
    if src == "__CHART__":
        vf = f"scale={W-140}:-1,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color=0x0f2744,format=yuv420p,setsar=1"
        cmd = ["ffmpeg", "-y", "-loop", "1", "-t", f"{d:.2f}", "-i", str(CHART), "-vf", vf,
               "-r", str(FPS), "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(out)]
    else:
        vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},boxblur=22:4,setsar=1[bg];"
              f"[0:v]scale={W}:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p")
        cmd = ["ffmpeg", "-y", "-i", str(ASSETS / "broll" / src), "-t", f"{d:.2f}",
               "-filter_complex", vf, "-r", str(FPS), "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(out)]
    if subprocess.run(cmd, capture_output=True, text=True).returncode != 0:
        raise SystemExit(f"segment KO: {src}")


def main():
    mp3, al = voice_and_alignment()
    dur = ffprobe_dur(mp3)
    words = words_from_alignment(al)
    ass = CACHE / "subs.ass"; build_ass(words, dur, ass)
    print(f"{len(words)} mots | audio {dur:.1f}s")
    clips = [c for c in CLIPS if c == "__CHART__" or (ASSETS / "broll" / c).exists()]
    n = len(clips)
    rest = (dur - HOOK_N * HOOK_DUR) / (n - HOOK_N)
    durs = [HOOK_DUR if k < HOOK_N else rest for k in range(n)]
    segs = []
    for k, c in enumerate(clips):
        seg = CACHE / f"seg{k:02d}.mp4"; make_segment(c, durs[k], seg); segs.append(seg)
    (CACHE / "concat.txt").write_text("".join(f"file '{s.as_posix()}'\n" for s in segs), encoding="utf-8")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(CACHE / "concat.txt"),
                    "-c", "copy", str(CACHE / "video.mp4")], capture_output=True, text=True)
    # ---- AUDIO (template valide 12/08): ducking sidechain + SFX + master -14 LUFS ----
    # NB: on execute depuis CACHE (chemins relatifs) -> le filtre ass= n'aime pas le ':'
    # des chemins Windows absolus. Les -i absolus (voix/musique/sfx) passent bien.
    # NIVEAUX PRO: musique -15/-20 dB sous la voix (ici ducking auto), master -14 LUFS / -1 dBTP
    # = le seul niveau qui survit a TikTok + IG + YouTube (2026).
    bounds = [sum(durs[:k]) for k in range(1, n)]                     # coupes internes -> whoosh
    chart_i = clips.index("__CHART__") if "__CHART__" in clips else None
    # PASSE 1 (audio): musique duckee sous la voix, rendue dans un FICHIER.
    # -> pas d'asplit ni d'amix ici = casse le deadlock asplit->sidechain->amix.
    ducked = CACHE / "music_ducked.m4a"
    p1 = ["ffmpeg", "-y", "-i", str(mp3), "-i", str(MUSIC), "-filter_complex",
          "[1:a]volume=0.32[mus];[0:a]volume=1.0[vk];"
          "[mus][vk]sidechaincompress=threshold=0.04:ratio=8:attack=20:release=350[md];"
          f"[md]afade=t=out:st={max(dur-1.4,0):.1f}:d=1.4[m]",
          "-map", "[m]", "-t", f"{dur:.2f}", "-c:a", "aac", "-b:a", "192k", str(ducked)]
    r1 = subprocess.run(p1, capture_output=True, text=True, cwd=str(CACHE))
    if r1.returncode != 0:
        raise SystemExit("passe 1 (ducking) KO:\n" + r1.stderr[-800:])
    # PASSE 2 (final): amix de FICHIERS simples (voix + musique duckee + SFX) + master.
    inp = ["-i", "video.mp4", "-i", str(mp3), "-i", str(ducked)]
    for _ in bounds:
        inp += ["-i", str(WHOOSH)]
    if chart_i is not None:
        inp += ["-i", str(IMPACT)]
    parts = ["[0:v]ass=subs.ass[v]"]
    labels = ["[1:a]", "[2:a]"]                                       # voix + musique deja duckee/volee
    for i, b in enumerate(bounds):
        ms = max(int((b - 0.10) * 1000), 0)
        parts.append(f"[{3+i}:a]atrim=0:0.5,asetpts=PTS-STARTPTS,adelay={ms}|{ms},volume=0.38[w{i}]")
        labels.append(f"[w{i}]")
    if chart_i is not None:
        cms = max(int(sum(durs[:chart_i]) * 1000), 0)
        parts.append(f"[{3+len(bounds)}:a]atrim=0:1.4,asetpts=PTS-STARTPTS,adelay={cms}|{cms},volume=0.6[imp]")
        labels.append("[imp]")
    parts.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0:duration=first[mix]")
    parts.append("[mix]loudnorm=I=-14:TP=-1.5:LRA=11[a]")            # master plateformes
    cmd = ["ffmpeg", "-y"] + inp + ["-filter_complex", ";".join(parts), "-map", "[v]", "-map", "[a]",
           "-r", str(FPS), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
           "-shortest", str(OUTPUT)]
    res = subprocess.run(cmd, capture_output=True, text=True, cwd=str(CACHE))
    if res.returncode != 0:
        raise SystemExit("assemblage final KO:\n" + res.stderr[-800:])
    print(f"\nOK: {OUTPUT}  ({OUTPUT.stat().st_size//1024} KB | {dur:.0f}s | {W}x{H} | {n} coupes)")
    url = publish_to_release(OUTPUT)
    if url:
        print(f"HEBERGEE (URL publique pour le CSV Video URL):\n  {url}")


def publish_to_release(path):
    """Uploade la video en asset du GitHub Release (repo public) -> URL publique stable,
    sans committer la video dans le repo (zero bloat). Retourne l'URL, ou None si echec."""
    up = subprocess.run(["gh", "release", "upload", RELEASE_TAG, str(path),
                         "--clobber", "--repo", GH_REPO], capture_output=True, text=True)
    if up.returncode != 0:
        print("WARN: hebergement GitHub Release KO (video OK mais non hebergee):\n" + up.stderr[-400:])
        return None
    return f"https://github.com/{GH_REPO}/releases/download/{RELEASE_TAG}/{path.name}"


if __name__ == "__main__":
    main()
