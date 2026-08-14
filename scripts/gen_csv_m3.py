# -*- coding: utf-8 -*-
# CSV Bulk Upload M3 (4 voies de logement) EN + FR. UTF-8 SANS BOM.
import csv
from pathlib import Path

AS = Path(r"C:\Users\alegu\Desktop\tokyo-expat\video_assets")
HEADER = ["Labels","Text","Year","Month (1 to 12)","Date","Hour (From 0 to 23)","Minutes",
          "Queue Schedule","Post Type","Video Title","Video URL","Thumbnail URL","Subtitles URL",
          "Subtitles Language","Subtitles Auto-Sync","Privacy Status","Category","Playlist",
          "Tags","License","Embeddable","Notify Subscribers","Made For Kids"]
BASE = "https://github.com/Tokyo-Insights/tokyo-expat/releases/download/media/"

def write(path, row):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(HEADER); w.writerow(row)
    print("OK:", path.name)

# ---- EN : Social Champ #2, jeu 20/08 09h00 JST ----
cap_en = ("Moving to Tokyo? A standard apartment wants 5 months of rent upfront and a guarantor \U0001F1EF\U0001F1F5 "
          "But you have options: share house = 1 month, no guarantor. Furnished monthly = 1.5 months, no guarantor. "
          "UR rental = no key money, no guarantor at all. Pick the route that fits you. Compare them at tokyo-expat.com \U0001F449 "
          "#tokyo #japan #movingtojapan #livinginjapan #expatlife #sharehouse #tokyoapartment #japanrealestate")
write(AS / "m3_routes_en.csv",
      ["", cap_en, 2026, 8, 20, 9, 0, "", "SHORTS",
       "4 ways to rent in Tokyo (and which need a guarantor) \U0001F1EF\U0001F1F5",
       BASE + "housing-routes-en.mp4", "", "", "", "", "PUBLIC", "", "",
       "tokyo,japan,moving to japan,living in japan,share house,ur rental,guarantor,tokyo apartment",
       "YOUTUBE", "Yes", "Yes", "No"])

# ---- FR : Social Champ #1, mar 18/08 03h30 JST ----
cap_fr = ("Tu emménages à Tokyo ? Un appartement standard demande 5 mois de loyer d'avance et un garant \U0001F1EF\U0001F1F5 "
          "Mais tu as des options : share house = 1 mois, sans garant. Meublé au mois = 1,5 mois, sans garant. "
          "Logement UR = pas d'argent-clé, pas de garant du tout. Choisis la voie qui te correspond. Compare sur tokyo-expat.com \U0001F449 "
          "#tokyo #japon #expatjapon #vivreautokyo #sharehouse #logementtokyo #sinstalleraujapon")
write(AS / "m3_routes_fr.csv",
      ["", cap_fr, 2026, 8, 18, 3, 30, "", "SHORTS",
       "4 façons de se loger à Tokyo (et lesquelles exigent un garant) \U0001F1EF\U0001F1F5",
       BASE + "voies-logement-fr.mp4", "", "", "", "", "PUBLIC", "", "",
       "tokyo,japon,logement tokyo,share house,garant,logement ur,vivre au japon,s'installer au japon",
       "YOUTUBE", "Yes", "Yes", "No"])
