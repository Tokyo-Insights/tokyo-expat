# -*- coding: utf-8 -*-
# CSV Bulk Upload M2 (cout d'emmenagement) EN + FR. UTF-8 SANS BOM.
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

# ---- EN : Social Champ #2, mar 18/08 09h00 JST ----
cap_en = ("The real cost of moving into a Tokyo apartment \U0001F1EF\U0001F1F5 "
          "It is not one month of rent. First month + deposit + key money + agency fee + guarantor "
          "+ insurance + lock change = about 5 months upfront (~500,000 yen) before you get the keys. "
          "Budget for it. Full breakdown at tokyo-expat.com \U0001F449 "
          "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment #japanrealestate #expatjapan")
write(AS / "m2_movein_en.csv",
      ["", cap_en, 2026, 8, 18, 9, 0, "", "SHORTS",
       "The real cost of moving into a Tokyo apartment (~5 months upfront) \U0001F1EF\U0001F1F5",
       BASE + "movein-cost-en.mp4", "", "", "", "", "PUBLIC", "", "",
       "tokyo,japan,moving to japan,living in japan,expat,tokyo apartment,move in cost,key money",
       "YOUTUBE", "Yes", "Yes", "No"])

# ---- FR : Social Champ #1, sam 15/08 03h30 JST ----
cap_fr = ("Le vrai coût pour emménager à Tokyo \U0001F1EF\U0001F1F5 "
          "Ce n'est pas un mois de loyer. Premier mois + dépôt + argent-clé + agence + garant "
          "+ assurance + serrure = environ 5 mois d'avance (~500 000 yens) avant d'avoir les clés. "
          "Prévois-le. Tout est sur tokyo-expat.com \U0001F449 "
          "#tokyo #japon #expatjapon #vivreautokyo #immobilierjapon #sinstalleraujapon #logementtokyo")
write(AS / "m2_movein_fr.csv",
      ["", cap_fr, 2026, 8, 15, 3, 30, "", "SHORTS",
       "Le vrai coût pour emménager à Tokyo (~5 mois d'avance) \U0001F1EF\U0001F1F5",
       BASE + "cout-emmenagement-fr.mp4", "", "", "", "", "PUBLIC", "", "",
       "tokyo,japon,emmenager tokyo,cout logement,argent cle,depot,vivre au japon,immobilier japon",
       "YOUTUBE", "Yes", "Yes", "No"])
