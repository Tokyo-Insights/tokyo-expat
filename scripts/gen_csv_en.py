# -*- coding: utf-8 -*-
# Genere le CSV Bulk Upload EN (Social Champ #2). UTF-8 SANS BOM.
import csv
from pathlib import Path

OUT = Path(r"C:\Users\alegu\Desktop\tokyo-expat\video_assets\social_batch_en_01.csv")

HEADER = ["Labels","Text","Year","Month (1 to 12)","Date","Hour (From 0 to 23)","Minutes",
          "Queue Schedule","Post Type","Video Title","Video URL","Thumbnail URL","Subtitles URL",
          "Subtitles Language","Subtitles Auto-Sync","Privacy Status","Category","Playlist",
          "Tags","License","Embeddable","Notify Subscribers","Made For Kids"]

caption = ("The #1 trap for foreigners moving to Tokyo \U0001F1EF\U0001F1F5 "
           "A furnished apartment costs +20% to +98% more per month than an unfurnished one, "
           "and the gap explodes in the CHEAPEST wards, not the priciest. "
           "Before you sign, always compare. Full ward-by-ward guide at tokyo-expat.com \U0001F449 "
           "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment "
           "#japanrealestate #expatjapan")

row = ["",
       caption,
       2026, 8, 14, 9, 0,          # 14/08 09h00 JST = horaire EN fixe
       "", "SHORTS",
       "The furnished apartment trap in Tokyo (up to +98%) \U0001F1EF\U0001F1F5",
       "https://www.tokyo-expat.com/media/short-furnished-premium-en.mp4",
       "", "", "", "", "PUBLIC", "", "",
       "tokyo,japan,moving to japan,living in japan,expat,tokyo apartment,japan real estate,furnished apartment",
       "YOUTUBE", "Yes", "Yes", "No"]

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(HEADER)
    w.writerow(row)

print("OK:", OUT)
print("caption len:", len(caption))
