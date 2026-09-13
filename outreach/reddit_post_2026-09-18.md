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
Data: about 160,000 standard rental listings and 2,400 furnished ones across 18 of Tokyo's 23 wards, September 2026, deduplicated. Furnished stock is small by nature, so I dropped the 5 wards with fewer than 50 furnished listings rather than publish a median a single listing could move. Medians, not averages, so a few luxury units don't skew it.

Full breakdown by ward, train line and station: tokyo-expat.com/en/data
```

## 3) Premier commentaire (Source + Tool, ZERO lien)

Le texte exact est dans `outreach/reddit_queue.json`, champ `oc_comment` de la munition
`furnished-by-location`. Le rappel Telegram le livre aussi le jour J.

---

## Verification des chiffres (faite le 14/09/2026, recalculee depuis le CSV)

| Affirmation du texte | Valeur reelle | Verdict |
|---|---|---|
| ~160 000 annonces standard | 159 980 | OK |
| ~2 400 annonces meublees | 2 435 | OK |
| 18 wards, 5 exclus (<50 meubles) | Edogawa 24, Arakawa 16, Kita 38, Nakano 39, Adachi 48 | OK |
| Standard varie d'un facteur 1,7 (83 500 a 144 000) | 1,725 | OK |
| Meuble varie d'environ 1,5 (124 800 a 182 400) | 1,462 | corrige le 14/09 en "about 1.5 (a factor of 1.46)" |
| +5 600 JPY de meuble pour +10 000 de standard | pente 0,5571 -> 5 571 | OK, et identique au sous-titre du PNG |
| Correlation -0,74 | -0,739 | OK |
| +16 % Chiyoda, +104 % Katsushika | 16,25 % et 104,07 % | OK |
| Taito, le meuble le plus cher a 182k | 182 400 | OK |

PNG relu a l'ecran le 14/09: les 18 points sont bien la, le sous-titre decrit ce qui est
reellement trace, et la note de bas de page nomme les 5 wards exclus.

## Apres le post

1. Marquer `status: posted` et `posted_utc` dans `outreach/reddit_queue.json` (le rappel
   le detecte seul via l'email AutoMod, mais verifier).
2. Samedi/dimanche: repondre aux commentaires (passe engagement #2).
3. Prochaine munition `ready` dans la file: `center-premium-over-time`.
