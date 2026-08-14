# -*- coding: utf-8 -*-
"""Base des munitions shorts tokyo-expat (1 insight data = 1 short).
Pilote generate_short_video.py (`python generate_short_video.py M4 en`) ET gen_weekly_csv.py.
Chiffres verifies (lib/*.json + generate_*_chart.py). FR = accents obligatoires (TTS).
BRAND: la voix dit "dot" (en) / "point" (fr); le sous-titre affiche Tokyo-Expat.com.
"""

BASE_URL = "https://github.com/Tokyo-Insights/tokyo-expat/releases/download/media/"

# COVER / THUMBNAIL (a partir de M7): ajouter cle "cover_en"/"cover_fr" = titre-accroche 2 lignes
# separees par "|" (ex "5 MOIS | D'AVANCE"; les mots avec chiffre/%/+ passent en JAUNE). Puis
# `python gen_cover.py M7 fr --publish` -> genere+heberge <out>-cover.jpg sur le release. gen_weekly_csv
# remplit alors automatiquement la colonne Thumbnail URL. Sans cover_<lang>, pas de thumbnail (M2-M6).
# NB thumbnail: fiable pour YouTube; TikTok/IG choisissent souvent une frame -> a verifier au 1er batch.
#
# B-ROLL PAR MUNITION (variete visuelle, a partir de M7): ajouter une cle "clips" = liste de 9 plans
# (avec "__CHART__" au bon endroit) assortis au SUJET -> chaque short devient visuellement distinct.
# Fichiers dans video_assets/broll/. CURATION OBLIGATOIRE (extraire vignette + REGARDER avant de garder,
# jamais de hors-sujet). Sans cle "clips", le short reutilise le pool par defaut (M2-M6 = ce pool commun,
# volontairement inchanges). Mapping sujets: cout->billets/pieces/calculatrice ; voies->cles/share house ;
# acceptation->poignee de main/documents ; wards->carte/train/quartiers ; refus->porte/proprietaire.

MUNITIONS = {
    "M2": {
        "chart_en": "tokyo-movein-cost-en.png", "chart_fr": "tokyo-movein-cost-fr.png",
        "out_en": "movein-cost-en", "out_fr": "cout-emmenagement-fr",
        "emph_en": ["FIVE", "MONTHS", "UPFRONT", "DEPOSIT", "KEY", "AGENCY", "GUARANTOR", "TOTAL", "BUDGET"],
        "emph_fr": ["CINQ", "MOIS", "TOTAL", "GARANT", "AVANT", "LOYER"],
        "script_en": ("Here is the real cost of moving into a Tokyo apartment. For a one hundred thousand yen flat, "
            "you do not pay one month. You pay first month, deposit, key money, agency fee, a guarantor, insurance, "
            "and a lock change. Total: about five months of rent, upfront. Nearly five hundred thousand yen before "
            "you get the keys. Budget for it. Full breakdown at tokyo-expat dot com."),
        "script_fr": ("Voici le vrai coût pour emménager dans un appartement à Tokyo. Pour un loyer de cent mille yens, "
            "tu ne paies pas un mois. Tu paies le premier mois, le dépôt, l'argent-clé, l'agence, un garant, l'assurance, "
            "la serrure. Total: près de cinq mois de loyer, d'avance. Presque cinq cent mille yens avant d'avoir les clés. "
            "Prévois-le. Tout est sur tokyo-expat point com."),
        "title_en": "The real cost of moving into a Tokyo apartment (~5 months upfront) \U0001F1EF\U0001F1F5",
        "title_fr": "Le vrai coût pour emménager à Tokyo (~5 mois d'avance) \U0001F1EF\U0001F1F5",
        "cap_en": ("The real cost of moving into a Tokyo apartment \U0001F1EF\U0001F1F5 It is not one month of rent. "
            "First month + deposit + key money + agency fee + guarantor + insurance + lock change = about 5 months upfront "
            "(~500,000 yen) before you get the keys. Budget for it. Full breakdown at tokyo-expat.com \U0001F449 "
            "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment #japanrealestate #expatjapan"),
        "cap_fr": ("Le vrai coût pour emménager à Tokyo \U0001F1EF\U0001F1F5 Ce n'est pas un mois de loyer. "
            "Premier mois + dépôt + argent-clé + agence + garant + assurance + serrure = environ 5 mois d'avance "
            "(~500 000 yens) avant d'avoir les clés. Prévois-le. Tout est sur tokyo-expat.com \U0001F449 "
            "#tokyo #japon #expatjapon #vivreautokyo #immobilierjapon #sinstalleraujapon #logementtokyo"),
        "tags_en": "tokyo,japan,moving to japan,living in japan,expat,tokyo apartment,move in cost,key money",
        "tags_fr": "tokyo,japon,emmenager tokyo,cout logement,argent cle,depot,vivre au japon,immobilier japon",
    },
    "M3": {
        "chart_en": "tokyo-housing-barrier-en.png", "chart_fr": "tokyo-housing-barrier-fr.png",
        "out_en": "housing-routes-en", "out_fr": "voies-logement-fr",
        "emph_en": ["FIVE", "GUARANTOR", "SHARE", "MONTHLY", "UR", "NO", "ONE"],
        "emph_fr": ["CINQ", "GARANT", "SANS", "MOIS"],
        "script_en": ("A standard apartment in Tokyo asks for five months of rent upfront, and a guarantor. But that is not "
            "your only option. A share house needs one month and no guarantor. A furnished monthly place: one and a half "
            "months, no guarantor. A U R rental: no key money, and no guarantor at all. Pick the route that fits you. "
            "See them all at tokyo-expat dot com."),
        "script_fr": ("Un appartement standard à Tokyo demande cinq mois de loyer d'avance, et un garant. Mais ce n'est pas "
            "ta seule option. Une share house: un mois, sans garant. Un meublé au mois: un mois et demi, sans garant. "
            "Un logement U R: pas d'argent-clé, pas de garant du tout. Choisis la voie qui te correspond. "
            "Vois-les toutes sur tokyo-expat point com."),
        "title_en": "4 ways to rent in Tokyo (and which need a guarantor) \U0001F1EF\U0001F1F5",
        "title_fr": "4 façons de se loger à Tokyo (et lesquelles exigent un garant) \U0001F1EF\U0001F1F5",
        "cap_en": ("Moving to Tokyo? A standard apartment wants 5 months of rent upfront and a guarantor \U0001F1EF\U0001F1F5 "
            "But you have options: share house = 1 month, no guarantor. Furnished monthly = 1.5 months, no guarantor. "
            "UR rental = no key money, no guarantor at all. Pick the route that fits you. Compare them at tokyo-expat.com \U0001F449 "
            "#tokyo #japan #movingtojapan #livinginjapan #expatlife #sharehouse #tokyoapartment #japanrealestate"),
        "cap_fr": ("Tu emménages à Tokyo ? Un appartement standard demande 5 mois de loyer d'avance et un garant \U0001F1EF\U0001F1F5 "
            "Mais tu as des options : share house = 1 mois, sans garant. Meublé au mois = 1,5 mois, sans garant. "
            "Logement UR = pas d'argent-clé, pas de garant du tout. Choisis la voie qui te correspond. Compare sur tokyo-expat.com \U0001F449 "
            "#tokyo #japon #expatjapon #vivreautokyo #sharehouse #logementtokyo #sinstalleraujapon"),
        "tags_en": "tokyo,japan,moving to japan,living in japan,share house,ur rental,guarantor,tokyo apartment",
        "tags_fr": "tokyo,japon,logement tokyo,share house,garant,logement ur,vivre au japon,s'installer au japon",
    },
    "M4": {
        "chart_en": "tokyo-approval-rate-en.png", "chart_fr": "tokyo-approval-rate-fr.png",
        "out_en": "approval-odds-en", "out_fr": "chances-acceptation-fr",
        "emph_en": ["ODDS", "ALONE", "BILINGUAL", "PERCENT", "ACCEPT", "DOORS"],
        "emph_fr": ["SEUL", "BILINGUE", "POUR", "CENT", "PORTES"],
        "script_en": ("As a foreigner, your odds of getting a Tokyo apartment depend on how you apply. Alone, without a "
            "bilingual agent: thirty to forty five percent accept you. With a bilingual agent: seventy to eighty percent. "
            "Through a share house or a furnished place: ninety to ninety eight percent. Same person, very different doors. "
            "Improve your odds at tokyo-expat dot com."),
        "script_fr": ("En tant qu'étranger, tes chances d'obtenir un appartement à Tokyo dépendent de comment tu postules. "
            "Seul, sans agent bilingue: trente à quarante-cinq pour cent t'acceptent. Avec un agent bilingue: soixante-dix à "
            "quatre-vingts pour cent. Via une share house ou un meublé: quatre-vingt-dix à quatre-vingt-dix-huit pour cent. "
            "Même personne, portes très différentes. Améliore tes chances sur tokyo-expat point com."),
        "title_en": "Will you get approved for a Tokyo apartment as a foreigner? \U0001F1EF\U0001F1F5",
        "title_fr": "Seras-tu accepté pour un appartement à Tokyo en tant qu'étranger ? \U0001F1EF\U0001F1F5",
        "cap_en": ("As a foreigner, will you even get approved for a Tokyo apartment? \U0001F1EF\U0001F1F5 It depends how you apply: "
            "alone, no bilingual agent = 30-45% accept you. With a bilingual agent = 70-80%. Share house / furnished = 90-98%. "
            "Same person, very different doors. Improve your odds at tokyo-expat.com \U0001F449 "
            "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment #japanrealestate #expatjapan"),
        "cap_fr": ("En tant qu'étranger, seras-tu seulement accepté pour un appartement à Tokyo ? \U0001F1EF\U0001F1F5 Ça dépend comment tu postules : "
            "seul, sans agent bilingue = 30-45% t'acceptent. Avec un agent bilingue = 70-80%. Share house / meublé = 90-98%. "
            "Même personne, portes très différentes. Améliore tes chances sur tokyo-expat.com \U0001F449 "
            "#tokyo #japon #expatjapon #vivreautokyo #logementtokyo #sinstalleraujapon"),
        "tags_en": "tokyo,japan,moving to japan,foreigner apartment,bilingual agent,share house,tenant screening",
        "tags_fr": "tokyo,japon,appartement etranger,agent bilingue,share house,logement tokyo,vivre au japon",
    },
    "M5": {
        "chart_en": "tokyo-rent-map.png", "chart_fr": "tokyo-rent-map.png",
        "out_en": "ward-rent-gap-en", "out_fr": "ecart-loyer-ward-fr",
        "emph_en": ["DOUBLE", "WARDS", "EDOGAWA", "MINATO", "TWICE", "LOCATION"],
        "emph_fr": ["DOUBLE", "EDOGAWA", "MINATO", "MURS"],
        "script_en": ("The same Tokyo studio can cost you double, just by changing wards. A one K apartment runs about "
            "seventy four thousand yen in Edogawa. The very same layout in Minato: one hundred forty thousand. Nearly twice "
            "the rent, for the same four walls. Location is the biggest lever on your budget. Compare every ward at tokyo-expat dot com."),
        "script_fr": ("Le même studio à Tokyo peut te coûter le double, juste en changeant de ward. Un appartement one K coûte "
            "environ soixante-quatorze mille yens à Edogawa. Exactement le même à Minato: cent quarante mille. Presque le double, "
            "pour les mêmes quatre murs. L'emplacement est le plus gros levier sur ton budget. Compare chaque ward sur tokyo-expat point com."),
        "title_en": "Same Tokyo studio, double the rent (it's the ward) \U0001F1EF\U0001F1F5",
        "title_fr": "Même studio à Tokyo, loyer x2 (c'est le ward) \U0001F1EF\U0001F1F5",
        "cap_en": ("The same Tokyo studio, double the rent, just by changing ward \U0001F1EF\U0001F1F5 A 1K runs ~74,000 yen in Edogawa, "
            "but ~140,000 in Minato. Nearly 2x for the same four walls. Location is the biggest lever on your budget. "
            "Compare every ward at tokyo-expat.com \U0001F449 "
            "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment #japanrealestate #rentintokyo"),
        "cap_fr": ("Le même studio à Tokyo, le loyer du simple au double, juste en changeant de ward \U0001F1EF\U0001F1F5 Un 1K coûte "
            "~74 000 yens à Edogawa, mais ~140 000 à Minato. Presque x2 pour les mêmes quatre murs. L'emplacement est le plus gros "
            "levier sur ton budget. Compare chaque ward sur tokyo-expat.com \U0001F449 "
            "#tokyo #japon #expatjapon #vivreautokyo #logementtokyo #immobilierjapon"),
        "tags_en": "tokyo,japan,tokyo rent,edogawa,minato,cheapest ward,rent in tokyo,tokyo apartment",
        "tags_fr": "tokyo,japon,loyer tokyo,edogawa,minato,ward pas cher,logement tokyo,vivre au japon",
    },
    "M6": {
        "chart_en": "tokyo-approval-rate-en.png", "chart_fr": "tokyo-approval-rate-fr.png",
        "out_en": "why-landlords-reject-en", "out_fr": "pourquoi-refus-proprios-fr",
        "emph_en": ["TRUTH", "REJECT", "FEAR", "GUARANTOR", "THREE", "DOORS"],
        "emph_fr": ["GARANT", "LANGUE", "BRUIT", "TROIS", "PORTES"],
        "script_en": ("I run furnished rentals in Tokyo, so here is the truth about why Japanese landlords reject foreigners. "
            "It is rarely about you. It is fear of a language barrier, no local guarantor, and worry about trash and noise rules. "
            "Fix those three, and most doors open. A bilingual agent and a guarantor company handle it. Learn how at tokyo-expat dot com."),
        "script_fr": ("Je gère des locations meublées à Tokyo, alors voici la vérité sur pourquoi les propriétaires japonais "
            "refusent les étrangers. C'est rarement à cause de toi. C'est la peur de la langue, l'absence de garant local, et "
            "l'inquiétude sur les règles de tri et de bruit. Règle ces trois points, et la plupart des portes s'ouvrent. "
            "Un agent bilingue et une société de garantie suffisent. Apprends comment sur tokyo-expat point com."),
        "title_en": "Why Japanese landlords reject foreigners (from an insider) \U0001F1EF\U0001F1F5",
        "title_fr": "Pourquoi les propriétaires japonais refusent les étrangers (vu de l'intérieur) \U0001F1EF\U0001F1F5",
        "cap_en": ("I run furnished rentals in Tokyo. Here's the real reason Japanese landlords reject foreigners \U0001F1EF\U0001F1F5 "
            "It's rarely about you: fear of a language barrier, no local guarantor, worry about trash & noise rules. Fix those three "
            "and most doors open. A bilingual agent + a guarantor company handle it. How at tokyo-expat.com \U0001F449 "
            "#tokyo #japan #movingtojapan #livinginjapan #expatlife #tokyoapartment #japanrealestate #expatjapan"),
        "cap_fr": ("Je gère des locations meublées à Tokyo. Voici la vraie raison pour laquelle les propriétaires japonais refusent "
            "les étrangers \U0001F1EF\U0001F1F5 C'est rarement à cause de toi : peur de la langue, pas de garant local, crainte des règles "
            "de tri et de bruit. Règle ces trois points et la plupart des portes s'ouvrent. Un agent bilingue + une société de garantie "
            "suffisent. Comment sur tokyo-expat.com \U0001F449 #tokyo #japon #expatjapon #vivreautokyo #logementtokyo #sinstalleraujapon"),
        "tags_en": "tokyo,japan,japanese landlords,foreigner housing,guarantor,bilingual agent,rent in tokyo",
        "tags_fr": "tokyo,japon,proprietaires japonais,logement etranger,garant,agent bilingue,vivre au japon",
    },
}

# Cadence optimale (recherche 2026): 3x/sem par langue. Social Champ en JST.
FR_SLOTS = [("Tue", 3, 30), ("Thu", 3, 30), ("Sat", 3, 30)]   # France-first, soir France
EN_SLOTS = [("Tue", 9, 0), ("Wed", 9, 0), ("Thu", 9, 0)]      # US-first, soir US
