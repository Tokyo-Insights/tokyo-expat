@echo off
:: ============================================================
:: Tokyo Expat -- Weekly Intelligence Report
:: Lance: uniquement les MERCREDIS (filtre DOW via PowerShell)
:: Duree: ~25-35min total
:: Fix date: PowerShell pour format locale-independant (YYYY/MM/DD sur JP Windows)
::
:: === MAJ 09/09/2026 : LUNDI -> MERCREDI, ET SILENCE TELEGRAM ===
:: Pourquoi le mercredi : le jour d'analyse d'Alessandro a ete deplace au mercredi
:: le 25/08 (credits Claude frais). La chaine tournait encore le lundi, donc le
:: rapport du mercredi lisait des donnees vieilles de 2 jours, et une vingtaine
:: d'alertes tombaient un jour ou rien n'etait prevu pour les lire.
::
:: Pourquoi TE_TELEGRAM_SILENT=1 : le rapport consolide ABSORBE ces alertes
:: (decision du 17/08, jamais appliquee). Le mode silencieux de config.py
:: JOURNALISE tout sans envoyer -> `notify.py --digest` et le rapport voient
:: toujours 100% des messages. Rien n'est perdu, seul le telephone se tait.
:: Le silence est LEVE pour le rapport final, qui est le seul envoi voulu.
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

:: Date et jour fiables independants du format locale Windows
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set LOG_DATE=%%i
for /f %%d in ('powershell -NoProfile -Command "(Get-Date).DayOfWeek"') do set DOW=%%d

set LOG_FILE=%SCRIPT_DIR%data\log_weekly_%LOG_DATE%.txt

:: Creer le dossier data si inexistant
if not exist "%SCRIPT_DIR%data\" mkdir "%SCRIPT_DIR%data\"

:: Filtre mercredi uniquement (jour d'analyse d'Alessandro depuis le 25/08)
if not "%DOW%"=="Wednesday" (
    echo [%LOG_DATE% %TIME%] Jour %DOW% - Weekly intelligence reserve aux mercredis. Skip. >> "%LOG_FILE%"
    exit /b 0
)

echo [%LOG_DATE% %TIME%] Starting weekly intelligence (mercredi)... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: Telegram muet pour toute la phase de collecte (tout reste journalise).
set TE_TELEGRAM_SILENT=1

:: 1. Keyword tracking (~15min)
echo [%TIME%] [1/19] Keyword tracking... >> "%LOG_FILE%"
python scripts\keyword_tracker.py --with-report >> "%LOG_FILE%" 2>&1

:: 1b. BOUCLE recherche->article : opportunites SEO (requetes haute intention ou on ranke mal)
echo [%TIME%] [1b] GSC opportunity miner... >> "%LOG_FILE%"
python scripts\gsc_opportunity_miner.py >> "%LOG_FILE%" 2>&1

:: 2. Content gap detector (~30s)
echo [%TIME%] [2/19] Content gap analysis... >> "%LOG_FILE%"
python scripts\content_gap.py >> "%LOG_FILE%" 2>&1

:: 3. Pricing monitor (~1min)
echo [%TIME%] [3/19] Pricing monitor... >> "%LOG_FILE%"
python scripts\pricing_monitor.py >> "%LOG_FILE%" 2>&1

:: 4. Backlink spy -- COUPE 09/09/2026. CASSE: son message hebdomadaire dit lui-meme
::    "API OpenLinkProfiler indisponible, verification manuelle requise" et se contente
::    de lister 6 domaines a aller checker a la main sur Ahrefs. Une alerte qui delegue
::    entierement son travail au lecteur n'est pas un radar.
:: echo [%TIME%] [4/19] Backlink spy... >> "%LOG_FILE%"
:: python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 5. Broken link finder -- COUPE 09/09/2026. Les 91 liens "reported" sont des pages
::    PRODUIT profondes de concurrents (immeubles Sakura House, versions CN), sans backlink
::    externe: ROI nul, deja acte en memoire le 30/06. Cout: ~5 min et 416 Ko de cache.
:: echo [%TIME%] [5/19] Broken link finder... >> "%LOG_FILE%"
:: python scripts\broken_link_finder.py >> "%LOG_FILE%" 2>&1

:: 6. Outreach tracker digest (~30s)
echo [%TIME%] [6/19] Outreach tracker digest... >> "%LOG_FILE%"
python scripts\outreach_tracker.py >> "%LOG_FILE%" 2>&1

:: 7. Vulnerability detector (~30s)
echo [%TIME%] [7/19] Vulnerability detector... >> "%LOG_FILE%"
python scripts\vulnerability_detector.py >> "%LOG_FILE%" 2>&1

:: 8. Google Trends -- COUPE 09/09/2026. CASSE: pytrends ne se connecte plus
::    (SSLCertVerificationError sur trends.google.com). `trends_history.json` est vide
::    ({} , 2 octets) depuis toujours, et le script envoyait quand meme une alerte
::    "GOOGLE TRENDS" chaque semaine, donc il annoncait du vide. Rallumer si un jour
::    pytrends refonctionne, et seulement apres avoir verifie que le fichier se remplit.
:: echo [%TIME%] [8/19] Google Trends... >> "%LOG_FILE%"
:: python scripts\google_trends.py >> "%LOG_FILE%" 2>&1

:: 9. Review scraper -- COUPE 09/09/2026. Renvoie 0 avis pour les 5 concurrents suivis,
::    systematiquement (`reviews_cache.json` = 0 partout). C'est `review_monitor` (etape 24)
::    qui fait reellement le travail et qui, lui, produit de la vraie donnee.
:: echo [%TIME%] [9/19] Review scraper... >> "%LOG_FILE%"
:: python scripts\review_scraper.py >> "%LOG_FILE%" 2>&1

:: 10. Calendrier saisonnier (~5s)
echo [%TIME%] [10/19] Seasonal calendar... >> "%LOG_FILE%"
python scripts\seasonal_calendar.py >> "%LOG_FILE%" 2>&1

:: 11. Analyse proactive + rapport consolide
echo [%TIME%] [11/19] Proactive analysis... >> "%LOG_FILE%"
python scripts\proactive_analysis.py >> "%LOG_FILE%" 2>&1

:: 12. Expat.com auto-post (nouveaux articles)
echo [%TIME%] [12/19] Expat.com autoposter... >> "%LOG_FILE%"
python scripts\expatcom_autoposter.py >> "%LOG_FILE%" 2>&1

:: 13. Expat.com reponses (DRAFT UNIQUEMENT -- soumettre manuellement apres relecture)
echo [%TIME%] [13/19] Expat.com replier (draft)... >> "%LOG_FILE%"
python scripts\expatcom_replier.py --dry-run >> "%LOG_FILE%" 2>&1

:: 14. Expat.com link checker
echo [%TIME%] [14/19] Expat.com link checker... >> "%LOG_FILE%"
python scripts\expatcom_link_checker.py >> "%LOG_FILE%" 2>&1

:: 15. Social sharing digest (1 message Telegram avec liens 1-clic)
echo [%TIME%] [15/19] Social sharing digest... >> "%LOG_FILE%"
python scripts\social_sharing.py >> "%LOG_FILE%" 2>&1

:: 16. Competitor Radar -- detecte les nouveaux concurrents
echo [%TIME%] [16/19] Competitor radar... >> "%LOG_FILE%"
python scripts\competitor_radar.py >> "%LOG_FILE%" 2>&1

:: 17. Influencer Finder -- COUPE 09/09/2026. 198 cibles accumulees, **0 pitchee**, et
::     105 Ko de cache. Le canal influenceurs contredit frontalement l'aversion d'Alessandro
::     aux reseaux (user_social_media_aversion): une liste que personne n'utilisera jamais.
:: echo [%TIME%] [17/19] Influencer finder... >> "%LOG_FILE%"
:: python scripts\influencer_finder.py >> "%LOG_FILE%" 2>&1

:: 18. Facebook via Buffer API (setup : voir facebook_buffer_poster.py --help)
echo [%TIME%] [18/22] Facebook Buffer poster... >> "%LOG_FILE%"
python scripts\facebook_buffer_poster.py >> "%LOG_FILE%" 2>&1

:: 19. Email reply monitor (scanne Gmail IMAP, detecte bounces/reponses, MAJ contacts)
echo [%TIME%] [19/22] Email reply monitor... >> "%LOG_FILE%"
python scripts\email_reply_monitor.py >> "%LOG_FILE%" 2>&1

:: 20. Email sender (envoie les 2 prochains contacts en queue)
echo [%TIME%] [20/22] Email sender outreach... >> "%LOG_FILE%"
python scripts\email_sender.py >> "%LOG_FILE%" 2>&1

:: 21. LinkedIn via Buffer API
echo [%TIME%] [21/22] LinkedIn Buffer poster... >> "%LOG_FILE%"
python scripts\facebook_buffer_poster.py --li-only >> "%LOG_FILE%" 2>&1

:: 22. Content velocity tracker (lit competitor_cache, detecte accelerations)
echo [%TIME%] [22/30] Content velocity tracker... >> "%LOG_FILE%"
python scripts\content_velocity_tracker.py >> "%LOG_FILE%" 2>&1

:: 23. Competitor jobs monitor -- COUPE 09/09/2026. Renvoie 0 offre pour les 5 concurrents,
::     systematiquement (`jobs_cache.json` = 0 partout). Et meme s'il marchait: aucune action
::     concrete ne decoule de "un concurrent recrute". Radar sans consequence.
:: echo [%TIME%] [23/30] Competitor jobs monitor... >> "%LOG_FILE%"
:: python scripts\competitor_jobs_monitor.py >> "%LOG_FILE%" 2>&1

:: 24. Review monitor (mauvaises reviews concurrents = opportunites)
echo [%TIME%] [24/30] Review monitor... >> "%LOG_FILE%"
python scripts\review_monitor.py >> "%LOG_FILE%" 2>&1

:: 25. AI Visibility Monitor (Perplexity) -- DESACTIVE 2026-07-02: API payante, Alessandro ne paie pas.
::      Mesure GEO = check MANUEL gratuit a la place (voir memoire). Ne pas reactiver sans option gratuite.
:: echo [%TIME%] [25/29] AI Visibility monitor... >> "%LOG_FILE%"
:: python scripts\ai_visibility_monitor.py >> "%LOG_FILE%" 2>&1

:: 25a. IndexNow -- soumet le sitemap a Bing pour indexation instantanee (visibilite IA + SEO)
echo [%TIME%] [25a] IndexNow submit... >> "%LOG_FILE%"
python scripts\indexnow_submit.py >> "%LOG_FILE%" 2>&1

:: 25b. GSC Analytics (Search Console -- requetes/pages emergentes, alimente gsc_latest.json)
echo [%TIME%] [25b] GSC Analytics reporter... >> "%LOG_FILE%"
python scripts\gsc_analytics.py >> "%LOG_FILE%" 2>&1

:: 26. GA4 Analytics (doit tourner AVANT monday_briefing pour alimenter ga4_latest.json)
echo [%TIME%] [26/29] GA4 Analytics reporter... >> "%LOG_FILE%"
python scripts\ga4_analytics.py >> "%LOG_FILE%" 2>&1

:: 27. Monday briefing consolide (toujours en dernier)
echo [%TIME%] [27/29] Monday briefing consolide... >> "%LOG_FILE%"
python scripts\monday_briefing.py >> "%LOG_FILE%" 2>&1

:: 28. Google Alerts digest (mentions marque + concurrents + keywords)
echo [%TIME%] [28/29] Google Alerts monitor... >> "%LOG_FILE%"
python scripts\google_alerts_monitor.py >> "%LOG_FILE%" 2>&1

:: 29. Featured snippets attack (positions 0 des concurrents sur nos keywords cibles)
echo [%TIME%] [29/30] Featured snippets attack... >> "%LOG_FILE%"
python scripts\featured_snippets_attack.py >> "%LOG_FILE%" 2>&1

:: 30. Backup .env chiffre vers OneDrive (1x/semaine suffit)
echo [%TIME%] [30/33] Backup .env chiffre OneDrive... >> "%LOG_FILE%"
python scripts\backup_env.py >> "%LOG_FILE%" 2>&1

:: 31. BING (ajoute 09/09/2026). N'etait dans AUCUN planificateur alors que Bing
::     donne ~2x plus de clics que Google (CTR 2,3% vs 0,5%). Le rapport affichait
::     donc des chiffres figes au dernier lancement manuel.
echo [%TIME%] [31/33] Bing analytics... >> "%LOG_FILE%"
python scripts\bing_analytics.py >> "%LOG_FILE%" 2>&1

:: 32. Domaines referents (metrique-phare du master plan, jamais automatisee).
echo [%TIME%] [32/33] Bing backlinks... >> "%LOG_FILE%"
python scripts\bing_backlinks.py >> "%LOG_FILE%" 2>&1

:: 33. ECOUTE DE LA DEMANDE (ajoute 11/09/2026). Les 26 radars existants regardent
::     les concurrents, le site ou les cibles de backlink: AUCUN ne regardait le
::     client. Ces deux-la si. Ils DOIVENT passer avant le rapport, qui lit leurs JSON.
::     Lent (backoff Reddit ~10 min): c'est voulu, sans backoff on obtient 6% des
::     appels et un echantillon qu'on prendrait pour une mesure.
echo [%TIME%] [33/35] Ecoute de la demande (Reddit)... >> "%LOG_FILE%"
python scripts\demand_listener.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] [34/35] Ecoute de l'autocompletion Google... >> "%LOG_FILE%"
python scripts\autocomplete_listener.py >> "%LOG_FILE%" 2>&1

:: 35. RAPPORT CONSOLIDE -- le SEUL envoi Telegram voulu de la chaine.
::     Doit passer en DERNIER: il lit les JSON produits par toutes les etapes.
echo [%TIME%] [35/35] Rapport hebdo consolide... >> "%LOG_FILE%"
set TE_TELEGRAM_SILENT=
python scripts\weekly_report.py --telegram >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
