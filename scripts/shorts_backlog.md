# Backlog munitions shorts — tokyo-expat (1 insight data = 1 short)

Chaque munition = script FR + EN (~55-65 mots) + chart REEL existant + config prête à coller
dans le bloc CONFIG de `generate_short_video.py`. Tous les chiffres sont tirés des données
(`lib/*.json`) et des generateurs de charts (`scripts/generate_*_chart.py`) — verifies, pas inventes.

Rappels pipeline: OUTPUT = nom UNIQUE/descriptif par short (sert d'asset GitHub Release + URL).
La voix dit "point com" (FR) / "dot com" (EN); le sous-titre affiche `Tokyo-Expat.com`.
CHART a une version EN et FR -> mettre `...-en.png` pour la version EN, `...-fr.png` pour la FR.
CLIPS b-roll dispo: tk00..tk06 (Tokyo), ap00/ap01 (appartement). Rendre 1-2 par cadence.

Statut: ✅ M1 furnished premium (FR+EN livres). ✅ M2 cout d'emmenagement (FR+EN rendus+heberges+VALIDES 13/08, CSV prets: FR sam 15/08 03h30, EN mar 18/08 09h00). ⬜ M3..M6 a rendre.

---

## M2 — Coût d'emménagement (≈5 mois de loyer d'avance)
Chiffres: loyer 100k -> total 490 000 JPY = ~4,9 mois (1er mois + dépôt + argent-clé + agence
100k chacun, garant 50k, assurance 20k, serrure 20k). Source: `generate_movein_cost_chart.py`.
- CHART: `outreach/tokyo-movein-cost-en.png` / `-fr.png`
- OUTPUT EN: `movein-cost-en.mp4` · FR: `cout-emmenagement-fr.mp4`
- EMPH: {"FIVE","MONTHS","UPFRONT","DEPOSIT","KEY","AGENCY","GUARANTOR","TOTAL"}

**EN:** Here is the real cost of moving into a Tokyo apartment. For a one hundred thousand yen flat, you do not pay one month. You pay first month, deposit, key money, agency fee, a guarantor, insurance, and a lock change. Total: about five months of rent, upfront. Nearly five hundred thousand yen before you get the keys. Budget for it. Full breakdown at tokyo-expat dot com.

**FR:** Voici le vrai coût pour emménager dans un appartement à Tokyo. Pour un loyer de cent mille yens, tu ne paies pas un mois. Tu paies le premier mois, le dépôt, l'argent-clé, l'agence, un garant, l'assurance, la serrure. Total: près de cinq mois de loyer, d'avance. Presque cinq cent mille yens avant d'avoir les clés. Prévois-le. Tout est sur tokyo-expat point com.

---

## M3 — 4 voies de logement (garant requis ou pas)
Chiffres: location standard 5 mois + GARANT ; share house 1 mois sans garant ; meublé au mois
1,5 mois sans garant ; UR pas d'argent-clé, pas de garant. Source: `generate_housing_barrier_chart.py`.
- CHART: `outreach/tokyo-housing-barrier-en.png` / `-fr.png`
- OUTPUT EN: `housing-routes-en.mp4` · FR: `voies-logement-fr.mp4`
- EMPH: {"FIVE","GUARANTOR","SHARE","ONE","MONTHLY","UR","NO"}

**EN:** A standard apartment in Tokyo asks for five months of rent upfront, and a guarantor. But that is not your only option. A share house needs one month and no guarantor. A furnished monthly place: one and a half months, no guarantor. A U R rental: no key money, no guarantor at all. Pick the route that fits you. See them all at tokyo-expat dot com.

**FR:** Un appartement standard à Tokyo demande cinq mois de loyer d'avance, et un garant. Mais ce n'est pas ta seule option. Une share house: un mois, sans garant. Un meublé au mois: un mois et demi, sans garant. Un logement U R: pas d'argent-clé, pas de garant du tout. Choisis la voie qui te correspond. Vois-les toutes sur tokyo-expat point com.

---

## M4 — Tes chances d'être accepté (étranger)
Chiffres: seul sans agent bilingue 30-45% ; avec agent bilingue 70-80% ; share house/meublé
90-98%. Source: `generate_market_timing_charts.py` (approval).
- CHART: `outreach/tokyo-approval-rate-en.png` / `-fr.png`
- OUTPUT EN: `approval-odds-en.mp4` · FR: `chances-acceptation-fr.mp4`
- EMPH: {"ODDS","ALONE","BILINGUAL","PERCENT","ACCEPT","DOORS","CHANCES"}

**EN:** As a foreigner, your odds of getting a Tokyo apartment depend on how you apply. Alone, without a bilingual agent: thirty to forty five percent accept you. With a bilingual agent: seventy to eighty percent. Through a share house or a furnished place: ninety to ninety eight percent. Same person, very different doors. Improve your odds at tokyo-expat dot com.

**FR:** En tant qu'étranger, tes chances d'obtenir un appartement à Tokyo dépendent de comment tu postules. Seul, sans agent bilingue: trente à quarante-cinq pour cent t'acceptent. Avec un agent bilingue: soixante-dix à quatre-vingts pour cent. Via une share house ou un meublé: quatre-vingt-dix à quatre-vingt-dix-huit pour cent. Même personne, portes très différentes. Améliore tes chances sur tokyo-expat point com.

---

## M5 — Même studio, loyer x2 selon le ward
Chiffres (1K médian): Edogawa 74 000 JPY vs Minato 140 000 JPY = x1,89. Source: `lib/tokyoRentIndex.json`.
- CHART: `outreach/tokyo-rent-map.png` (carte loyers par ward ; sans variante langue). Option: générer un chart dédié "gap 1K".
- OUTPUT EN: `ward-rent-gap-en.mp4` · FR: `ecart-loyer-ward-fr.mp4`
- EMPH: {"DOUBLE","WARDS","EDOGAWA","MINATO","TWICE","LOCATION","WARD"}

**EN:** The same Tokyo studio can cost you double, just by changing wards. A one K apartment runs about seventy four thousand yen in Edogawa. The very same layout in Minato: one hundred forty thousand. Nearly twice the rent, for the same four walls. Location is the biggest lever on your budget. Compare every ward at tokyo-expat dot com.

**FR:** Le même studio à Tokyo peut te coûter le double, juste en changeant de ward. Un appartement one K coûte environ soixante-quatorze mille yens à Edogawa. Exactement le même à Minato: cent quarante mille. Presque le double, pour les mêmes quatre murs. L'emplacement est le plus gros levier sur ton budget. Compare chaque ward sur tokyo-expat point com.

---

## M6 — Pourquoi les proprios refusent les étrangers (insider opérateur)
Angle E-E-A-T: "je gère des locations meublées à Tokyo". Raisons réelles: peur de la langue,
pas de garant local, inquiétude règles tri/bruit. Solutions: agent bilingue + société de garantie.
- CHART: `outreach/tokyo-approval-rate-en.png` / `-fr.png` (ou `tokyo-housing-barrier`).
- OUTPUT EN: `why-landlords-reject-en.mp4` · FR: `pourquoi-refus-proprios-fr.mp4`
- EMPH: {"TRUTH","REJECT","FEAR","GUARANTOR","THREE","DOORS","VERITE","REFUSENT"}

**EN:** I run furnished rentals in Tokyo, so here is the truth about why Japanese landlords reject foreigners. It is rarely about you. It is fear of a language barrier, no local guarantor, and worry about trash and noise rules. Fix those three, and most doors open. A bilingual agent and a guarantor company handle it. Learn how at tokyo-expat dot com.

**FR:** Je gère des locations meublées à Tokyo, alors voici la vérité sur pourquoi les propriétaires japonais refusent les étrangers. C'est rarement à cause de toi. C'est la peur de la langue, l'absence de garant local, et l'inquiétude sur les règles de tri et de bruit. Règle ces trois points, et la plupart des portes s'ouvrent. Un agent bilingue et une société de garantie suffisent. Apprends comment sur tokyo-expat point com.

---

## Idées suivantes (à instruire quand voulu)
- Saisonnalité: quand chercher un logement (sep-oct arrivées vs jan-mar pic). `tokyo-seasonality`.
- Combien de temps pour trouver un logement. `tokyo-housing-time`.
- Loyer / revenu (part du salaire). `tokyo-rent-to-income`.
- Loyer par ligne de train / par station. `tokyo-rent-by-line` / `tokyo-rent-by-station`.
