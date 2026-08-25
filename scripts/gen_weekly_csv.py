# -*- coding: utf-8 -*-
"""Genere 2 CSV Bulk Upload HEBDO (FR + EN) = toute la semaine en 1 upload par compte.
Respecte la cadence optimale 3x/sem (recherche 2026, cf shorts_meta.FR_SLOTS/EN_SLOTS).
Editer WEEK_START (le LUNDI) + KEYS (les 3 munitions de la semaine), puis run.
UTF-8 SANS BOM. Uploader week_fr.csv dans Social Champ #1, week_en.csv dans #2.
"""
import csv, datetime as dt
from pathlib import Path
import shorts_meta as SM

# ============================== A EDITER CHAQUE SEMAINE ==============================
WEEK_START = "2026-08-31"          # le LUNDI de la semaine visee
KEYS = ["M5", "M6", "M7"]          # 1 a 3 munitions (ordre = ordre de publication)
# ====================================================================================

AS = Path(r"C:\Users\alegu\Desktop\tokyo-expat\video_assets")
HEADER = ["Labels","Text","Year","Month (1 to 12)","Date","Hour (From 0 to 23)","Minutes",
          "Queue Schedule","Post Type","Video Title","Video URL","Thumbnail URL","Subtitles URL",
          "Subtitles Language","Subtitles Auto-Sync","Privacy Status","Category","Playlist",
          "Tags","License","Embeddable","Notify Subscribers","Made For Kids"]
WD = {"Mon":0,"Tue":1,"Wed":2,"Thu":3,"Fri":4,"Sat":5,"Sun":6}
MON = dt.date.fromisoformat(WEEK_START)
assert MON.weekday() == 0, "WEEK_START doit etre un LUNDI"

def row(key, lang, day, hh, mm):
    M = SM.MUNITIONS[key]
    d = MON + dt.timedelta(days=WD[day])
    url = SM.BASE_URL + M["out_" + lang] + ".mp4"
    thumb = SM.BASE_URL + M["out_" + lang] + "-cover.jpg" if M.get("cover_" + lang) else ""
    return ["", M["cap_" + lang], d.year, d.month, d.day, hh, mm, "", "SHORTS",
            M["title_" + lang], url, thumb, "", "", "", "PUBLIC", "", "",
            M["tags_" + lang], "YOUTUBE", "Yes", "Yes", "No"]

def build(lang, slots, outfile):
    rows = [row(k, lang, day, hh, mm) for k, (day, hh, mm) in zip(KEYS, slots)]
    with open(outfile, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(HEADER); [w.writerow(r) for r in rows]
    when = " | ".join(f"{k}={s[0]} {s[1]:02d}:{s[2]:02d}" for k, s in zip(KEYS, slots))
    print(f"OK: {outfile.name} ({len(rows)} posts) -> {when}")

build("fr", SM.FR_SLOTS, AS / "week_fr.csv")
build("en", SM.EN_SLOTS, AS / "week_en.csv")
