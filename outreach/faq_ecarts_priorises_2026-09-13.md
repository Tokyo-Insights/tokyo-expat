# FAQ : les 62 ecarts de montants croises aux pages reellement affichees (13/09/2026)

Croisement de `scripts/data/faq_schema_audit_2026-09-12.txt` (62 reponses dont le schema
affirme un montant introuvable dans l'article) avec
`scripts/data/content_census_2026-09-12.json` (90 j de GSC).
Script: `scratchpad/faq_x_census.py` + `faq_rank.py`.

## 🚨 L'HYPOTHESE DE LA VEILLE EST FAUSSE

La passation du 12/09 disait: *"corriger un chiffre sur une page que personne n'affiche ne
rapporte rien; la liste devrait tomber a une dizaine."*

**Mesure: 60 des 62 ecarts sont sur des pages qui ont des impressions.**
Seulement **2** sont sur des pages mortes (`chasseur-immobilier-vs-agence-tokyo-comparatif`,
`relocation-entreprise-tokyo-guide-rh`). **Le filtre vivant/mort ne trie rien.**

## ✅ MAIS LE BON CRITERE EXISTE : LA CONCENTRATION DES IMPRESSIONS

Les 62 ecarts se repartissent sur **51 pages totalisant 11 650 impressions**, et ces
impressions sont tres concentrees:

| Pages a corriger | Part des impressions couvertes | Ecarts a traiter |
|---|---|---|
| Les **3** premieres | **47 %** | 6 sur 62 |
| Les **5** premieres | **63 %** | 8 sur 62 |
| Les **10** premieres | **82 %** | **14 sur 62** |

🔑 **14 corrections couvrent 82 % de l'exposition.** L'intuition d'hier etait bonne, la raison
etait fausse: ce n'est pas que les ecarts soient sur des pages mortes, c'est que
**l'exposition est concentree sur une poignee de pages**.

## 📋 LE PLAN DE TRAVAIL (dans cet ordre)

| # | impr | clics | ec | slug |
|---|---|---|---|---|
| 1 | 2108 | 2 | 2 | `student-housing-tokyo-guide` |
| 2 | 1972 | 4 | 2 | `logement-etudiant-tokyo-guide` |
| 3 | 1343 | 1 | 2 | `gaijin-house-vs-share-house-tokyo` |
| 4 | 1029 | 5 | 1 | `japan-sim-card-foreigners-2026` |
| 5 | 876 | 0 | 1 | `furnished-apartment-tokyo-no-guarantor` |
| 6 | 689 | 9 | 1 | `best-neighbourhoods-families-tokyo-guide` |
| 7 | 535 | 1 | 1 | `japanese-language-schools-tokyo-guide` |
| 8 | 350 | 0 | 1 | `tokyo-vs-osaka-expat-living-comparison` |
| 9 | 302 | 0 | 1 | `furnished-apartment-tokyo-expats` |
| 10 | 295 | 3 | 2 | `renters-insurance-japan-guide` |

**Trois raisons de commencer par les 3 premieres**, au-dela du volume:
- Les deux pages **logement etudiant** (EN + FR, 4 080 impressions a elles seules) tombent
  dans la **fenetre avril 2027 ouverte jusqu'a fin octobre** (cf `reference_student_housing_calendar_japan`).
- **`gaijin-house-vs-share-house-tokyo`** est sur le cluster ou un **apercu IA repond
  au-dessus de nous** (cf `project_test_titre_gaijin_house_2026_09_09`). Le JSON-LD est
  precisement ce que cet apercu parse: un chiffre faux la-dedans nous dessert deux fois.

## 🔍 VERIFICATION D'ECHANTILLON (page n1)

Je n'ai pas suppose que l'audit avait raison, j'ai ouvert le cas le plus expose.

`student-housing-tokyo-guide`, Q *"What are the housing options for international students
in Tokyo?"*. Le schema FAQ affirme: dortoirs **20 000-50 000**, share houses etudiantes
**50 000-75 000**, gaijin houses **35 000-55 000**, meubles **80 000+**.
L'article, lui, parle de **5 500 / 22 000 / 30 000 / 33 000 / 40 000 / 48 000 / 60 000**.
👉 **Ecart reel**, pas un artefact de formatage. L'audit ne sur-signale pas sur ce cas.

## ⛔ CE QUE JE N'AI PAS FAIT, ET POURQUOI

**Je n'ai corrige aucun chiffre.** Corriger demande de trancher **quel nombre est le bon**,
celui de la FAQ ou celui de l'article, et ce n'est pas une question technique: c'est une
affirmation sur le marche reel, publiee sous le nom d'Alessandro et parsee par Google.
Deux voies possibles par ecart:
- **aligner la FAQ sur l'article** (rapide, cohérent, mais fige le chiffre de l'article meme
  s'il est perime), ou
- **verifier le vrai chiffre dans l'indice des loyers** puis corriger **les deux** (plus lent,
  mais c'est le seul qui produise un enonce chiffre citable, levier n1 du master plan).

⚠️ Et dans les deux cas: **relire le HTML LIVRE apres deploiement**, pas seulement le fichier
source. C'est ainsi qu'un 6e prix contradictoire etait apparu le 12/09.
