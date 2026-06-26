#!/usr/bin/env python3
"""
apply_affiliate_links.py
Injecte tous les liens affilies (SafetyWing, italki, GetYourGuide) dans les articles
blog.ts qui n'en ont pas encore.
Strategie : insere la phrase affiliee AVANT le dernier separateur "---" de chaque article
(dans le corps, pas dans le footer).
Usage: python scripts/apply_affiliate_links.py
"""

import re
import os
import sys

BLOG_TS = os.path.join(os.path.dirname(__file__), '..', 'lib', 'blog.ts')

SW  = 'https://safetywing.com/nomad-insurance/?referenceID=26551332&utm_source=26551332&utm_medium=Ambassador'
ITK = 'https://www.italki.com/affshare?ref=af32660342'
GYG = 'https://www.getyourguide.com/tokyo-l193/?partner_id=4LP5PLT&utm_medium=online_publisher'
SKM = 'https://www.sakuramobile.jp/tokyoexpat-top'
ART = 'https://tours.arigatojapan.co.jp/?rfsn=91948'

# ─── Textes à injecter par article ─────────────────────────────────────────
# Chaque valeur : (texte_à_insérer, avant_separateur=True)
INSERTS: dict[str, str] = {

    # ── Sakura Mobile — SIM card articles ────────────────────────────────
    'carte-sim-japon-etranger-2026': (
        f"Pour votre carte SIM au Japon, [Sakura Mobile]({SKM}) propose des forfaits "
        f"prepaye et postpaye sans justificatif de domicile, disponibles des l'arrivee "
        f"a l'aeroport et utilisables par les etrangers sans numero My Number. *(lien affilie)*"
    ),
    'japan-sim-card-foreigners-2026': (
        f"For your SIM card in Japan, [Sakura Mobile]({SKM}) offers prepaid and postpaid "
        f"plans with no address proof required, available from arrival at the airport "
        f"and usable by foreigners without a My Number. *(affiliate link)*"
    ),

    # ── Sakura Mobile — checklists installation ───────────────────────────
    'demenager-japon-checklist-complete': (
        f"Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour votre carte SIM des l'arrivee, "
        f"[Sakura Mobile]({SKM}) propose des forfaits sans justificatif de domicile. "
        f"Pour apprendre le japonais, [iTalki]({ITK}) propose des cours avec des professeurs "
        f"natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'moving-to-tokyo-checklist-2026': (
        f"For health coverage during your transition, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. For your SIM card from day one, "
        f"[Sakura Mobile]({SKM}) offers plans with no address proof required. "
        f"To build your Japanese, [iTalki]({ITK}) offers lessons with native teachers "
        f"from $10/hour. *(affiliate links)*"
    ),

    # ── Sakura Mobile — internet/utilitaires ─────────────────────────────
    'internet-utilitaires-tokyo-appartement': (
        f"Pour votre connexion mobile en attendant l'installation internet, "
        f"[Sakura Mobile]({SKM}) propose des forfaits data sans justificatif de domicile, "
        f"utilisables des l'arrivee au Japon. *(lien affilie)*"
    ),
    'setting-up-utilities-tokyo-apartment': (
        f"For mobile connectivity while waiting for home internet setup, "
        f"[Sakura Mobile]({SKM}) offers data plans with no address proof required, "
        f"usable from day one in Japan. *(affiliate link)*"
    ),

    # ── SafetyWing — articles assurance ───────────────────────────────────
    'assurance-habitation-japon-locataire': (
        f"Pour les expatries sans couverture interim, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance sante mensuelle sans engagement, activable des l'arrivee "
        f"au Japon et avant la signature d'un contrat d'assurance habitation local. *(lien affilie)*"
    ),
    'renters-insurance-japan-guide': (
        f"For expats without interim health coverage, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable from day one in Japan "
        f"and before signing a local renters insurance contract. *(affiliate link)*"
    ),

    # ── SafetyWing — articles visa ─────────────────────────────────────────
    'visa-travail-japon-francophone-2026': (
        f"Pour votre couverture sante et celle de votre famille pendant la transition, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement, "
        f"activable avant votre inscription a l'assurance nationale japonaise. "
        f"Pour apprendre le japonais avant votre arrivee, [iTalki]({ITK}) propose des cours "
        f"particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'japan-work-visa-foreigners-guide': (
        f"For health coverage during your transition, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before your Japanese "
        f"national insurance enrolment. To build your Japanese before arriving, "
        f"[iTalki]({ITK}) offers private lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'visa-nomade-digital-japon-2026': (
        f"Pour votre couverture sante en nomade digital, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance voyage et sante mensuelle sans engagement, "
        f"conçue pour les travailleurs a distance et expatries. *(lien affilie)*"
    ),
    'japan-digital-nomad-visa-2026': (
        f"For health coverage as a digital nomad, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly travel and health insurance with no commitment, designed specifically "
        f"for remote workers and expats. *(affiliate link)*"
    ),
    'pvt-japon-visa-vacances-travail-2026': (
        f"Pour votre couverture sante pendant votre PVT, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, populaire aupres des titulaires "
        f"de PVT pour la periode avant l'assurance nationale japonaise. *(lien affilie)*"
    ),
    'japan-working-holiday-visa-guide-2026': (
        f"For health coverage during your working holiday, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, widely used by WHV holders for the "
        f"period before enrolling in Japanese national insurance. *(affiliate link)*"
    ),

    # ── SafetyWing + iTalki + Sakura Mobile — checklist (voir bloc SKM ci-dessus) ──

    # ── SafetyWing + GetYourGuide — cout de la vie ─────────────────────────
    'cout-vie-tokyo-expatrie-2026': (
        f"Pour les activites et visites a Tokyo, [GetYourGuide]({GYG}) propose des experiences "
        f"reservables en ligne a tous les budgets. Pour votre couverture sante, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"*(liens affilies)*"
    ),
    'tokyo-expat-cost-of-living-2026': (
        f"For activities and sightseeing in Tokyo, [GetYourGuide]({GYG}) offers experiences "
        f"bookable online at all budgets. For health coverage, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate links)*"
    ),

    # ── iTalki seul — travail / integration ───────────────────────────────
    'travailler-tokyo-expatrie-guide-2026': (
        f"Pour developper votre japonais professionnel, [iTalki]({ITK}) propose des cours "
        f"particuliers en ligne avec des professeurs natifs japonais, specialises dans le "
        f"japonais des affaires, a partir de 10$/heure. *(lien affilie)*"
    ),
    'working-in-tokyo-expat-guide-2026': (
        f"To develop your professional Japanese, [iTalki]({ITK}) offers online private lessons "
        f"with native Japanese teachers specialised in business Japanese, from $10/hour. *(affiliate link)*"
    ),

    # ── GetYourGuide — quartiers generaux ─────────────────────────────────
    'quartiers-tokyo-expatries-guide': (
        f"Pour explorer Tokyo et ses quartiers avant de vous installer, [GetYourGuide]({GYG}) "
        f"propose des visites guidees, experiences culinaires et activites culturelles "
        f"reservables en ligne. *(lien affilie)*"
    ),
    'tokyo-neighbourhoods-expats-guide': (
        f"To explore Tokyo and its neighbourhoods before settling in, [GetYourGuide]({GYG}) "
        f"offers guided tours, food experiences and cultural activities bookable online. *(affiliate link)*"
    ),

    # ── GetYourGuide — Ebisu Daikanyama Nakameguro ─────────────────────────
    'ebisu-daikanyama-nakameguro-guide-expatries': (
        f"Pour decouvrir les adresses de ce couloir avant votre installation, [GetYourGuide]({GYG}) "
        f"propose des visites guidees de Tokyo et des experiences gastronomiques dans ces "
        f"quartiers. *(lien affilie)*"
    ),
    'ebisu-daikanyama-nakameguro-expat-guide': (
        f"To discover the best spots in this corridor before settling in, [GetYourGuide]({GYG}) "
        f"offers guided tours of Tokyo and food experiences in these neighbourhoods. *(affiliate link)*"
    ),

    # ── GetYourGuide — familles ────────────────────────────────────────────
    'famille-expatriee-tokyo-ecoles-internationales': (
        f"Pour faire decouvrir Tokyo a vos enfants de facon ludique, [GetYourGuide]({GYG}) "
        f"propose des visites guidees et activites familiales adaptees aux expatries. *(lien affilie)*"
    ),
    'family-expat-tokyo-international-schools': (
        f"To introduce Tokyo to your children in an engaging way, [GetYourGuide]({GYG}) "
        f"offers family-friendly guided tours and activities suited for expat families. *(affiliate link)*"
    ),
    'quartiers-tokyo-familles-expatriees-guide': (
        f"Pour explorer les quartiers familiaux de Tokyo avant votre installation, [GetYourGuide]({GYG}) "
        f"propose des visites guidees et activites en famille reservables en ligne. *(lien affilie)*"
    ),
    'best-neighbourhoods-families-tokyo-guide': (
        f"To explore Tokyo's family-friendly neighbourhoods before your move, [GetYourGuide]({GYG}) "
        f"offers guided tours and family activities bookable online. *(affiliate link)*"
    ),

    # ── Arigato Travel — quartiers haut de gamme ──────────────────────────
    'hiroo-minami-azabu-guide-expatries-tokyo': (
        f"Pour decouvrir la gastronomie de ces quartiers residentiels, [Arigato Travel]({ART}) "
        f"propose des food tours au coeur de Tokyo guides par des locaux, ideaux pour explorer "
        f"la culture culinaire japonaise des votre arrivee. *(lien affilie)*"
    ),
    'hiroo-minami-azabu-expat-neighborhood-guide': (
        f"To discover the food scene of these upscale residential neighbourhoods, [Arigato Travel]({ART}) "
        f"offers food tours in the heart of Tokyo led by local guides, ideal for exploring "
        f"Japanese culinary culture from day one. *(affiliate link)*"
    ),

    # ── Arigato Travel — Tokyo vs Osaka ───────────────────────────────────
    'tokyo-osaka-ou-vivre-expatrie-comparatif': (
        f"Pour vivre l'experience gastronomique de Tokyo avant de choisir votre ville, "
        f"[Arigato Travel]({ART}) propose des food tours dans les quartiers de Tokyo "
        f"guides par des locaux. *(lien affilie)*"
    ),
    'tokyo-vs-osaka-expat-living-comparison': (
        f"To experience Tokyo's food culture before making your city choice, "
        f"[Arigato Travel]({ART}) offers food tours across Tokyo's neighbourhoods "
        f"led by local guides. *(affiliate link)*"
    ),

    # ── GetYourGuide — Tokyo vs autre ville ───────────────────────────────
    'tokyo-osaka-kyoto-ou-s-installer': (
        f"Pour comparer les atmospheres de Tokyo, Osaka et Kyoto par vous-meme, [GetYourGuide]({GYG}) "
        f"propose des visites guidees dans chacune de ces villes, reservables en ligne. *(lien affilie)*"
    ),
    'tokyo-osaka-kyoto-which-city-to-live': (
        f"To compare the atmosphere of Tokyo, Osaka and Kyoto for yourself, [GetYourGuide]({GYG}) "
        f"offers guided tours in each city, bookable online. *(affiliate link)*"
    ),

    # ── SafetyWing + iTalki — logement general ────────────────────────────
    'trouver-appartement-tokyo-etranger': (
        f"Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable avant l'assurance nationale japonaise. "
        f"Pour communiquer avec les agences en japonais, [iTalki]({ITK}) propose des cours avec des "
        f"professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'find-apartment-tokyo-foreigner': (
        f"For health coverage during your apartment search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before Japanese national insurance. "
        f"To communicate with agencies in Japanese, [iTalki]({ITK}) offers lessons with native "
        f"teachers from $10/hour. *(affiliate links)*"
    ),
    'share-house-tokyo-guide-complet': (
        f"Pour votre couverture sante pendant votre sejour en share house, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour progresser en japonais avec vos colocataires, "
        f"[iTalki]({ITK}) propose des cours particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'share-house-tokyo-guide-2026': (
        f"For health coverage during your share house stay, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To improve your Japanese with housemates, "
        f"[iTalki]({ITK}) offers private lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'appartement-meuble-tokyo-sans-garant': (
        f"Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, adaptee aux expatries avant l'assurance "
        f"nationale japonaise. *(lien affilie)*"
    ),
    'furnished-apartment-tokyo-no-guarantor': (
        f"For health coverage during your transition, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, suited for expats before Japanese "
        f"national insurance enrolment. *(affiliate link)*"
    ),
    'pieges-location-tokyo-etranger': (
        f"Pour votre couverture sante pendant la recherche d'appartement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour negocier en japonais avec les agences, "
        f"[iTalki]({ITK}) propose des cours avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'tokyo-rental-traps-foreigners': (
        f"For health coverage during your apartment search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To negotiate in Japanese with agencies, "
        f"[iTalki]({ITK}) offers lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'tokyo-apartment-hunting-from-abroad': (
        f"For health coverage from day one in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before you arrive. "
        f"To prepare your Japanese before landing, [iTalki]({ITK}) offers online lessons "
        f"with native teachers from $10/hour. *(affiliate links)*"
    ),
    'gaijin-house-vs-share-house-tokyo': (
        f"Pour votre couverture sante quelle que soit votre option de logement, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"Pour progresser en japonais pendant votre sejour, [iTalki]({ITK}) propose des cours "
        f"particuliers avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'gaijin-house-vs-share-house-difference': (
        f"For health coverage whatever your housing option, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To improve your Japanese during your stay, "
        f"[iTalki]({ITK}) offers private lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'chercher-appartement-tokyo-depuis-etranger': (
        f"Pour preparer votre couverture sante avant l'arrivee, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle activable depuis l'etranger. Pour commencer le japonais "
        f"avant votre installation, [iTalki]({ITK}) propose des cours en ligne avec des professeurs "
        f"natifs a partir de 10$/heure. *(liens affilies)*"
    ),

    # ── SafetyWing — logement etudiant ────────────────────────────────────
    'logement-etudiant-tokyo-guide': (
        f"Pour votre couverture sante pendant vos etudes au Japon, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, populaire aupres des etudiants en attente "
        f"de l'assurance nationale. Pour progresser en japonais, [iTalki]({ITK}) propose des cours "
        f"avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'student-housing-tokyo-guide': (
        f"For health coverage during your studies in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, popular among students before enrolling "
        f"in national insurance. To improve your Japanese, [iTalki]({ITK}) offers lessons "
        f"with native teachers from $10/hour. *(affiliate links)*"
    ),
    'logement-etudiant-tokyo-2026': (
        f"Pour votre couverture sante pendant vos etudes au Japon, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour preparer votre japonais, "
        f"[iTalki]({ITK}) propose des cours particuliers avec des professeurs natifs. *(liens affilies)*"
    ),
    'student-housing-tokyo-guide-2026': (
        f"For health coverage during your studies in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To prepare your Japanese, "
        f"[iTalki]({ITK}) offers private lessons with native teachers. *(affiliate links)*"
    ),
    'logement-etudiant-tokyo-octobre': (
        f"Pour votre couverture sante en arrivant en octobre, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable des votre arrivee au Japon. *(lien affilie)*"
    ),
    'student-housing-tokyo-october': (
        f"For health coverage upon arrival in October, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable from day one in Japan. *(affiliate link)*"
    ),

    # ── SafetyWing — jiko bukken ───────────────────────────────────────────
    'jiko-bukken-appartements-pas-chers-tokyo': (
        f"Pour votre couverture sante pendant la recherche et les demarches, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"Pour communiquer avec les agences en japonais, [iTalki]({ITK}) propose des cours "
        f"avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'jiko-bukken-cheap-apartments-tokyo': (
        f"For health coverage during your search and admin process, "
        f"[SafetyWing Nomad Insurance]({SW}) offers monthly insurance with no commitment. "
        f"To navigate the process in Japanese, [iTalki]({ITK}) offers lessons with native "
        f"teachers from $10/hour. *(affiliate links)*"
    ),

    # ── SafetyWing — appartement septembre ───────────────────────────────
    'appartement-tokyo-septembre-guide': (
        f"Pour votre couverture sante en arrivant en septembre, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable avant votre inscription "
        f"a l'assurance nationale japonaise. *(lien affilie)*"
    ),
    'find-apartment-tokyo-september': (
        f"For health coverage upon your September arrival, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before Japanese national "
        f"insurance enrolment. *(affiliate link)*"
    ),

    # ── SafetyWing — appartements meubles ────────────────────────────────
    'appartement-meuble-tokyo-expats': (
        f"Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, ideale pour la periode entre l'arrivee "
        f"et l'inscription a l'assurance nationale. *(lien affilie)*"
    ),
    'furnished-apartment-tokyo-expats': (
        f"For health coverage during your transition, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, ideal for the period between arrival "
        f"and national insurance enrolment. *(affiliate link)*"
    ),
    'appartement-meuble-tokyo-expats-top-5': (
        f"Pour votre couverture sante pendant votre installation, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour vos activites culturelles a Tokyo, "
        f"[GetYourGuide]({GYG}) propose des visites guidees reservables en ligne. *(liens affilies)*"
    ),
    'furnished-apartment-tokyo-top-5-expats': (
        f"For health coverage during your relocation, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. For cultural activities in Tokyo, "
        f"[GetYourGuide]({GYG}) offers guided tours bookable online. *(affiliate links)*"
    ),

    # ── SafetyWing — loyers par quartier ──────────────────────────────────
    'loyers-tokyo-par-quartier-2026': (
        f"Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour explorer les quartiers avant de "
        f"choisir, [GetYourGuide]({GYG}) propose des visites guidees a Tokyo. *(liens affilies)*"
    ),
    'tokyo-rent-by-neighborhood-2026': (
        f"For health coverage during your apartment search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To explore neighbourhoods before choosing, "
        f"[GetYourGuide]({GYG}) offers guided tours across Tokyo. *(affiliate links)*"
    ),

    # ── SafetyWing — entrepreneur / corporate ────────────────────────────
    'appartement-tokyo-entrepreneur-freelance': (
        f"Pour votre couverture sante en tant qu'independant au Japon, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, adaptee aux freelances avant l'assurance "
        f"nationale japonaise. *(lien affilie)*"
    ),
    'renting-tokyo-entrepreneur-startup-guide': (
        f"For health coverage as a freelancer or entrepreneur in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, suited for self-employed expats before "
        f"national insurance enrolment. *(affiliate link)*"
    ),
    'relocation-entreprise-tokyo-guide-rh': (
        f"Pour la couverture sante des employes en transit, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable avant l'assurance nationale japonaise. *(lien affilie)*"
    ),
    'corporate-relocation-tokyo-hr-housing-guide': (
        f"For employee health coverage during relocation, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before Japanese national "
        f"insurance enrolment. *(affiliate link)*"
    ),

    # ── SafetyWing + iTalki — dossier refuse / chasseur immo ─────────────
    'dossier-location-refuse-tokyo-etranger': (
        f"Pour votre couverture sante pendant les demarches, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. Pour ameliorer votre japonais et "
        f"mieux communiquer avec les agences, [iTalki]({ITK}) propose des cours avec des "
        f"professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'rental-application-rejected-japan-foreigner': (
        f"For health coverage while you continue your search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To improve your Japanese and communicate "
        f"better with agencies, [iTalki]({ITK}) offers lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'chasseur-immobilier-tokyo-tarifs-vaut-il-le-coup': (
        f"Pour votre couverture sante pendant la recherche, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. *(lien affilie)*"
    ),
    'real-estate-hunter-tokyo-cost-worth-it': (
        f"For health coverage during your property search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate link)*"
    ),
    'chasseur-immobilier-vs-agence-tokyo-comparatif': (
        f"Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. *(lien affilie)*"
    ),
    'real-estate-hunter-vs-agency-tokyo': (
        f"For health coverage during your housing search, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate link)*"
    ),
    'service-chasseur-immobilier-tokyo-comment-ca-marche': (
        f"Pour votre couverture sante pendant les demarches d'installation, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. *(lien affilie)*"
    ),
    'how-real-estate-hunter-works-tokyo': (
        f"For health coverage during your relocation process, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate link)*"
    ),
    'remoters-alternative': (
        f"For health coverage during your property search in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate link)*"
    ),
    'alternative-remoters-chasseur-tokyo': (
        f"Pour votre couverture sante pendant la recherche de logement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. *(lien affilie)*"
    ),

    # ── SafetyWing — demarches administratives ────────────────────────────
    'ouvrir-compte-bancaire-japon-etranger': (
        f"Pour votre couverture sante pendant les demarches administratives, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement, "
        f"activable avant votre inscription a l'assurance nationale japonaise. *(lien affilie)*"
    ),
    'open-bank-account-japan-foreigner': (
        f"For health coverage while you complete your admin setup, "
        f"[SafetyWing Nomad Insurance]({SW}) offers monthly insurance with no commitment, "
        f"activatable before Japanese national insurance enrolment. *(affiliate link)*"
    ),
    'carte-residence-japon-zairyu-card': (
        f"Pour votre couverture sante pendant les demarches d'installation, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement, "
        f"activable des votre arrivee au Japon. *(lien affilie)*"
    ),
    'residence-card-japan-zairyu-card-guide': (
        f"For health coverage while completing your registration process, "
        f"[SafetyWing Nomad Insurance]({SW}) offers monthly insurance with no commitment, "
        f"activatable from your first day in Japan. *(affiliate link)*"
    ),
    'negocier-loyer-tokyo-conseils': (
        f"Pour mieux negocier en japonais avec votre agence, [iTalki]({ITK}) propose des cours "
        f"particuliers avec des professeurs natifs japonais a partir de 10$/heure. "
        f"Pour votre couverture sante pendant la transition, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement. *(liens affilies)*"
    ),
    'negotiating-rent-tokyo-tips': (
        f"To negotiate in Japanese with your agency, [iTalki]({ITK}) offers private lessons "
        f"with native Japanese teachers from $10/hour. For health coverage during your transition, "
        f"[SafetyWing Nomad Insurance]({SW}) offers monthly insurance with no commitment. *(affiliate links)*"
    ),
    'garantie-loyer-etranger-japon': (
        f"Pour votre couverture sante pendant les demarches de garant, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"Pour communiquer avec votre garant en japonais, [iTalki]({ITK}) propose des cours "
        f"avec des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'guarantor-japan-rental-foreigner': (
        f"For health coverage while navigating the guarantor process, "
        f"[SafetyWing Nomad Insurance]({SW}) offers monthly insurance with no commitment. "
        f"To communicate with your guarantor in Japanese, [iTalki]({ITK}) offers lessons "
        f"with native teachers from $10/hour. *(affiliate links)*"
    ),
    'checklist-bail-tokyo': (
        f"Pour votre couverture sante pendant la signature du bail, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"Pour comprendre votre contrat en japonais, [iTalki]({ITK}) propose des cours avec "
        f"des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'tokyo-rental-contract-checklist': (
        f"For health coverage when signing your lease, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To understand your contract in Japanese, "
        f"[iTalki]({ITK}) offers lessons with native teachers from $10/hour. *(affiliate links)*"
    ),

    # ── GYG + iTalki — transport ──────────────────────────────────────────
    'transport-tokyo-expatrie-guide': (
        f"Pour decouvrir Tokyo lors de vos premiers trajets, [GetYourGuide]({GYG}) propose "
        f"des visites guidees et experiences culturelles reservables en ligne. Pour lire les "
        f"panneaux et annonces en japonais, [iTalki]({ITK}) propose des cours avec des "
        f"professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'tokyo-public-transport-expat-guide': (
        f"To discover Tokyo on your first commutes, [GetYourGuide]({GYG}) offers guided tours "
        f"and cultural experiences bookable online. To read signs and announcements in Japanese, "
        f"[iTalki]({ITK}) offers lessons with native teachers from $10/hour. *(affiliate links)*"
    ),

    # ── SafetyWing — finances ─────────────────────────────────────────────
    'impots-revenus-japon-expatrie-2026': (
        f"Pour votre couverture sante en tant qu'expatrie au Japon, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable avant l'assurance nationale "
        f"japonaise. *(lien affilie)*"
    ),
    'japan-income-tax-foreigners-guide': (
        f"For health coverage as an expat in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before Japanese national "
        f"insurance enrolment. *(affiliate link)*"
    ),
    'virement-international-japon-wise-revolut': (
        f"Pour votre couverture sante en expatrie, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement adaptee aux residents etrangers au Japon. *(lien affilie)*"
    ),
    'send-money-to-japan-from-abroad': (
        f"For health coverage as an expat in Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, designed for foreign residents in Japan. *(affiliate link)*"
    ),

    # ── SafetyWing + iTalki — logistique installation ────────────────────
    'permis-conduire-etranger-japon-conversion': (
        f"Pour votre couverture sante pendant les demarches administratives, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. "
        f"Pour faciliter les demarches en japonais, [iTalki]({ITK}) propose des cours avec "
        f"des professeurs natifs a partir de 10$/heure. *(liens affilies)*"
    ),
    'convert-foreign-driving-licence-japan': (
        f"For health coverage during your admin process, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. To navigate the process in Japanese, "
        f"[iTalki]({ITK}) offers lessons with native teachers from $10/hour. *(affiliate links)*"
    ),
    'demenageur-international-japon-guide': (
        f"Pour votre couverture sante pendant le demenagement, [SafetyWing Nomad Insurance]({SW}) "
        f"propose une assurance mensuelle sans engagement, activable avant votre arrivee au Japon. *(lien affilie)*"
    ),
    'international-moving-company-japan-guide': (
        f"For health coverage during your move, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment, activatable before your arrival in Japan. *(affiliate link)*"
    ),
    'importer-animal-compagnie-japon-guide': (
        f"Pour votre couverture sante pendant la periode d'installation au Japon, "
        f"[SafetyWing Nomad Insurance]({SW}) propose une assurance mensuelle sans engagement. *(lien affilie)*"
    ),
    'bringing-pets-to-japan-guide': (
        f"For health coverage during your relocation to Japan, [SafetyWing Nomad Insurance]({SW}) "
        f"offers monthly insurance with no commitment. *(affiliate link)*"
    ),
}

# ─── 2 liens internes restants (Hiroo → Ebisu) ─────────────────────────────
INTERNAL_LINKS: dict[str, str] = {
    'hiroo-minami-azabu-guide-expatries-tokyo': (
        '*À lire aussi : [Ebisu, Daikanyama et Nakameguro : guide pour expatriés]'
        '(/blog/ebisu-daikanyama-nakameguro-guide-expatries).*'
    ),
    'hiroo-minami-azabu-expat-neighborhood-guide': (
        '*See also: [Ebisu, Daikanyama and Nakameguro: Expat Living Guide]'
        '(/blog/ebisu-daikanyama-nakameguro-expat-guide).*'
    ),
}


# ─── Helpers ────────────────────────────────────────────────────────────────

def inject_before_separator(content: str, text: str) -> str:
    """
    Insere 'text' juste AVANT le dernier '\\n---\\n' du contenu.
    Si pas de séparateur, ajoute avant la dernière ligne *italic* ou en fin.
    """
    last_sep = content.rfind('\n---\n')
    if last_sep != -1:
        return content[:last_sep] + '\n\n' + text + content[last_sep:]

    # Pas de ---, insere avant la dernière *italic* si présente
    last_italic = content.rfind('\n*')
    if last_italic != -1 and last_italic > len(content) - 400:
        return content[:last_italic] + '\n\n' + text + content[last_italic:]

    # Dernière option : append
    return content.rstrip() + '\n\n' + text


def inject_internal_link_after_separator(content: str, text: str) -> str:
    """Pour les liens internes, ajoute APRES le dernier --- (zone footer)."""
    last_sep = content.rfind('\n---\n')
    if last_sep != -1:
        insert_after = last_sep + len('\n---\n')
        return content[:insert_after] + '\n' + text + '\n' + content[insert_after:]
    return content.rstrip() + '\n\n' + text


def already_contains(content: str, url: str) -> bool:
    return url in content


# ─── Main ────────────────────────────────────────────────────────────────────

def process(raw: str) -> tuple[str, int]:
    slug_re   = re.compile(r"slug:\s*'([^']+)'")
    positions = [(m.start(), m.group(1)) for m in slug_re.finditer(raw)]

    edits: list[tuple[int, int, str, str]] = []  # (start_abs, end_abs, new_content, label)

    all_targets = dict(INSERTS)
    # Add internal link inserts (treated separately)

    for i, (pos, slug) in enumerate(positions):
        end   = positions[i + 1][0] if i + 1 < len(positions) else len(raw)
        chunk = raw[pos:end]

        content_m = re.search(r'content:\s*`([\s\S]*?)`\.trim\(\)', chunk)
        if not content_m:
            content_m = re.search(r'content:\s*`([\s\S]*?)`\s*,?\s*\n\s*readingTime', chunk)

        if not content_m:
            continue

        old_content = content_m.group(1)
        new_content = old_content

        # ── Affiliate inserts ──────────────────────────────────────────────
        if slug in INSERTS:
            affiliate_text = INSERTS[slug]
            # Determine which URL(s) are in this text to avoid duplicates
            urls_in_text = []
            for u in [SW, ITK, GYG, SKM, ART]:
                if u in affiliate_text:
                    urls_in_text.append(u)

            # Only add if none of these URLs already appear in the content
            already_there = any(already_contains(new_content, u) for u in urls_in_text)
            if already_there:
                print(f'  SKIP (already has affiliate): {slug}')
            else:
                new_content = inject_before_separator(new_content, affiliate_text)

        # ── Internal link inserts (Hiroo → Ebisu) ─────────────────────────
        if slug in INTERNAL_LINKS:
            link_text = INTERNAL_LINKS[slug]
            # Only add if not already present
            target_slug = re.search(r'\(/blog/([^)]+)\)', link_text)
            if target_slug and target_slug.group(1) in new_content:
                print(f'  SKIP (already links to target): {slug}')
            elif link_text.replace('\\u00c0', 'À').replace('\\u00e9', 'é') in new_content:
                print(f'  SKIP (see-also already present): {slug}')
            else:
                new_content = inject_internal_link_after_separator(new_content, link_text)

        if new_content != old_content:
            start_abs = pos + content_m.start(1)
            end_abs   = pos + content_m.end(1)
            edits.append((start_abs, end_abs, new_content, slug))

    # Apply in REVERSE order to preserve positions
    edits.sort(key=lambda x: x[0], reverse=True)
    for start_abs, end_abs, new_content, slug in edits:
        raw = raw[:start_abs] + new_content + raw[end_abs:]
        print(f'  OK: {slug}')

    return raw, len(edits)


def main():
    print(f'Reading {BLOG_TS} ...')
    with open(BLOG_TS, encoding='utf-8') as f:
        raw = f.read()

    raw_modified, applied = process(raw)

    closing_count = len(re.findall(r'^\]$', raw_modified, re.MULTILINE))
    if closing_count != 1:
        print(f'ERROR: ] appears {closing_count} times. Aborting.', file=sys.stderr)
        sys.exit(1)

    with open(BLOG_TS, 'w', encoding='utf-8') as f:
        f.write(raw_modified)

    print(f'\nDone. {applied} articles updated.')
    print(f'] bracket count: {closing_count} (OK)')


if __name__ == '__main__':
    main()
