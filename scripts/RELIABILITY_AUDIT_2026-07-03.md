# Audit de fiabilite du systeme d'automatisation — 2026-07-03

Audit demande par Alessandro apres verification factuelle du systeme (`run_daily_watch.bat`).
6 faiblesses identifiees, toutes corrigees ou documentees ci-dessous. Chaque point liste :
cause -> correctif -> verification -> risque residuel.

---

## Point 1 — Nouveaux steps non prouves en production
**Cause :** `reddit_munition_reminder.py` (step 11) et `ga4_daily_report.py` (step 12) ajoutes a
`run_daily_watch.bat` APRES le dernier demarrage PC -> jamais executes dans le pipeline reel
(absents du log du 2026-07-03, qui s'arrete au step 10).

**Correctif :** execution reelle des deux commandes exactes du .bat.
**Verification :** OK. reminder = no-op correct (dernier post <7j) ; ga4 = rapport Telegram
envoye + marqueur journalier pose. Les deux tourneront au prochain demarrage.
**Risque residuel :** aucun (prouves en reel).

---

## Point 2 — Detection du post Reddit fragile (INBOX seulement)
**Cause :** `detect_oc_since()` faisait `m.select("INBOX")`. Or les emails AutoMod OC sont
ARCHIVES lors du triage Gmail (retires de l'INBOX) -> la detection les ratait -> renudge en
boucle ou fausse hypothese "poste".

**Correctif :** nouvelle fonction `select_all_mail()` qui selectionne le dossier All Mail via
le flag IMAP `\All` (robuste a la langue Gmail), fallback `[Gmail]/All Mail` puis INBOX.
La detection cherche desormais dans All Mail = trouve aussi les emails archives.
**Verification :** dossier `[Gmail]/All Mail` (flag \All) confirme present sur le compte ;
script re-teste sans erreur.
**Risque residuel :** faible (si Gmail change le flag \All, fallback INBOX -> degrade mais pas casse).

---

## Point 3 — Auto-detection seulement pour r/dataisbeautiful
**Cause :** seul r/dataisbeautiful envoie un email AutoMod "Original Content" (signal fiable de
NOUVEAU post). Les autres subs (r/japanresidents...) n'ont aucun signal fiable.

**Correctif :** (1) la detection auto ne s'applique QUE si `sub == "dataisbeautiful"` ;
(2) pour les autres subs, le message Telegram indique explicitement "auto-detection indisponible,
reponds 'poste' ou j'assume dans 2j" ; (3) nouveau flag `--posted` pour confirmer manuellement.
IMPORTANT : on NE se base PAS sur les emails "a repondu a ta publication" (faux positifs :
les vieux posts recoivent des commentaires en continu -> marquerait a tort une munition postee).
**Verification :** `--posted` teste (no-op propre sans awaiting) ; logique conditionnelle par sub.
**Risque residuel :** pour les subs non-OC, confirmation manuelle requise (limite REELLE de Reddit,
pas contournable proprement) ; garde-fou = hypothese apres 2j pour ne jamais bloquer.

---

## Point 4 — Mesure des inscriptions email cassee dans GA4
**Cause :** `NewsletterForm.tsx` faisait un simple `fetch('/api/subscribe')` SANS declencher
d'evenement GA -> la ligne "inscriptions" de `ga4_daily_report` restait a 0 meme avec des inscrits.

**Correctif :** sur soumission reussie, `window.gtag('event', 'generate_lead', {method:'newsletter', locale})`.
`ga4_daily_report` compte deja `generate_lead` -> la mesure devient reelle.
**Verification :** `window.gtag` confirme global (GoogleAnalytics.tsx) ; deploiement + test live.
**Risque residuel :** GA4 sous-compte (bloqueurs de pub/consentement). Source de verite complementaire
= Brevo (liste 3). Pour un chiffre exact, croiser avec Brevo.

---

## Point 5 — Dependance au PC allume (point unique de defaillance)
**Cause :** `run_daily_watch.bat` se lance au demarrage du PC (raccourci Startup), pas via un cron
cloud. PC eteint plusieurs jours -> drip / reminders / canari / GA4 ne tournent pas.

**Analyse (verifiee) :** l'architecture est RATTRAPAGE-BASED, donc PC eteint = RETARD, pas PERTE :
- `brevo_welcome_drip.py` calcule `days = today - date_inscription` et envoie toute etape due non
  encore envoyee (etat anti-doublon) -> rien perdu, juste decale au prochain allumage.
- `reddit_munition_reminder` et `ga4_daily_report` sont idempotents (garde-fou 1x/jour) -> rattrapent.
- Le mail le PLUS critique (J+0 bienvenue) part via `/api/subscribe` = SERVERLESS, independant du PC.
**Correctif :** documentation de la contrainte (ce fichier) ; aucun changement de code (le design
tolere deja le retard). Statut = mitige + documente, PAS elimine.
**Risque residuel :** retard des envois time-sensitive tant que le PC reste eteint. Acceptable pour
ce business (rien de temps-reel). Upgrade futur possible (non fait, optionnel) : cron cloud gratuit
(ex. GitHub Actions) pour les taches critiques — implique de mettre les secrets en variables cloud.

---

## Point 6 — Scrapers desactives -> contenu "auto-frais" fige en silence
**Cause :** les scrapers loyers sont desactives (raccourcis `.lnk.disabled`). Sans eux, l'Indice
loyers ne se rafraichit pas -> les articles "auto-entretenus" (quartiers, prix) ne se mettent plus
a jour, SANS aucun signal. L'"auto-entretenu" est CONDITIONNEL a un refresh de donnees.

**Correctif :** `site_health_canary.py` verifie desormais la fraicheur de `tokyoRentIndex.json` et
`tokyoPriceTrends.json` (champ `generated`). Au-dela de `STALE_DAYS = 100` (trimestriel + marge),
il ALERTE via Telegram avec la commande de refresh a lancer. La panne silencieuse devient un signal.
**Verification :** OK. Canari verbose : "Data Indice loyers fraiche (1j)", "Data Prix historiques
fraiche (0j)", 14 checks verts.
**Risque residuel :** le refresh reste MANUEL (relancer scrapers + `refresh_rent_index.py`). Le canari
ne fait que PREVENIR quand c'est perime ; il ne re-scrape pas tout seul (par design, les scrapers
sont lourds/Selenium et volontairement off).

## Procedure de refresh manuel des donnees (rappel)
1. Reactiver + lancer les scrapers loyers (LIFULL + AtHome rents).
2. `python refresh_rent_index.py` (tokyo_insights) -> regenere l'Indice + articles auto-frais + snapshot historique.
3. Pour les prix : ajouter les nouveaux CSV MLIT puis `python refresh_price_trends.py`.
4. Deployer tokyo-expat (`vercel --prod`) pour publier.

---

## Verdict
Sur 6 points : **4 corriges dans le code** (1,2,3,4,6), **1 verifie + documente comme design
tolerant** (5). Le seul risque non eliminable proprement = la confirmation manuelle pour les subs
sans email OC (limite de Reddit) et le refresh manuel des donnees (choix : scrapers off). Les deux
sont desormais VISIBLES (message explicite / alerte canari) au lieu d'etre des trous silencieux.
