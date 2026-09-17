# Munition OC du vendredi 18/09/2026 — prete a poster

**Sub:** r/dataisbeautiful · **Creneau:** ~09h00 JST (l'echeance tombe le 18/09 a 07h44 JST)
**Image:** `outreach/tokyo-furnished-by-location.png` · **CSV citable:** `outreach/tokyo-furnished-by-location.csv`

Convention AutoMod: **deux textes**. La DESCRIPTION porte le lien, le PREMIER COMMENTAIRE n'en porte aucun.

---

## 1) Titre du post

```
[OC] A furnished studio in Tokyo costs much the same wherever you live. A standard one does not.
```

## 2) Description (sous l'image — c'est ICI que va le lien)

```
Data: about 160,000 standard 1K studio listings and 2,400 furnished ones across 18 of Tokyo's 23 wards, September 2026, deduplicated. Rent includes monthly management fees. Furnished stock is small by nature, so I dropped the 5 wards with fewer than 50 furnished listings rather than publish a median a single listing could move. Medians, not averages, so a few luxury units don't skew it.

Full breakdown by ward, train line and station: tokyo-expat.com/en/data
```

## 3) Premier commentaire (Source + Tool, ZERO lien)

Le texte exact est dans `outreach/reddit_queue.json`, champ `oc_comment` de la munition
`furnished-by-location`. Le rappel Telegram le livre aussi le jour J.

---

## ✅ RE-VERIFICATION COMPLETE DU 17/09/2026 (veille du post)

Les 8 affirmations recalculees une a une depuis le CSV, PNG regarde a l'ecran. **Tout tient.**
Trois precisions ajoutees ce jour-la:

1. 🔍 **La correlation -0,74 porte sur `standard x prime en %`, pas sur `standard x meuble`.**
   Le commentaire OC le dit correctement ("between how cheap a ward is and how big its
   furnished premium is"), mais la ligne du tableau ci-dessous etait trop courte pour le
   montrer. Verifie: corr(standard, prime) = **-0,739** · corr(standard, meuble) = **+0,658**.
   Un relecteur qui testerait la mauvaise paire croirait a une erreur.
2. ➕ **La description ne disait pas `1K studio`** alors que le titre parle d'un "studio" et
   que le chart trace bien des 1K. Ajoute, avec la mention des charges.
3. ⚠️ **Le PNG dit "about ¥5,571", le commentaire "about ¥5,600".** Pas une contradiction,
   un arrondi. **PNG volontairement NON regenere**: le generateur relit les parquet du
   pipeline, rafraichis chaque matin, donc le regenerer la veille du post changerait tous
   les chiffres et obligerait a tout re-verifier. L'arrondi a la centaine est pose dans
   `scripts/generate_furnished_location_chart.py` pour la PROCHAINE munition.

Verifie aussi: **18 points sur le chart**, les 5 wards exclus nommes en bas de chart,
aucun portail ni partenaire nomme, **zero lien dans le commentaire OC**, le lien uniquement
dans la description.

## Verification des chiffres (faite le 14/09/2026, recalculee depuis le CSV le 17/09)

| Affirmation du texte | Valeur reelle | Verdict |
|---|---|---|
| ~160 000 annonces standard | 159 980 | OK |
| ~2 400 annonces meublees | 2 435 | OK |
| 18 wards, 5 exclus (<50 meubles) | Edogawa 24, Arakawa 16, Kita 38, Nakano 39, Adachi 48 | OK |
| Standard varie d'un facteur 1,7 (83 500 a 144 000) | 1,725 | OK |
| Meuble varie d'environ 1,5 (124 800 a 182 400) | 1,462 | corrige le 14/09 en "about 1.5 (a factor of 1.46)" |
| +5 600 JPY de meuble pour +10 000 de standard | pente 0,5571 -> 5 571 | OK, et identique au sous-titre du PNG |
| Correlation -0,74 **entre le loyer standard et la PRIME en %** | -0,739 | OK (⚠️ corr(standard, meuble) vaut +0,658, ce n'est PAS la paire annoncee) |
| +16 % Chiyoda, +104 % Katsushika | 16,25 % et 104,07 % | OK |
| Taito, le meuble le plus cher a 182k | 182 400 | OK |

PNG relu a l'ecran le 14/09: les 18 points sont bien la, le sous-titre decrit ce qui est
reellement trace, et la note de bas de page nomme les 5 wards exclus.

## Apres le post

1. Marquer `status: posted` et `posted_utc` dans `outreach/reddit_queue.json` (le rappel
   le detecte seul via l'email AutoMod, mais verifier).
2. Samedi/dimanche: repondre aux commentaires (passe engagement #2).
3. Prochaine munition `ready` dans la file: `center-premium-over-time`.
