@echo off
:: ============================================================
:: Tokyo Expat -- Weekly Intelligence Report
:: Lance: uniquement les lundis (filtre DOW via PowerShell)
:: Duree: ~25-35min total
:: Fix date: PowerShell pour format locale-independant (YYYY/MM/DD sur JP Windows)
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

:: Date et jour fiables independants du format locale Windows
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set LOG_DATE=%%i
for /f %%d in ('powershell -NoProfile -Command "(Get-Date).DayOfWeek"') do set DOW=%%d

set LOG_FILE=%SCRIPT_DIR%data\log_weekly_%LOG_DATE%.txt

:: Creer le dossier data si inexistant
if not exist "%SCRIPT_DIR%data\" mkdir "%SCRIPT_DIR%data\"

:: Filtre lundi uniquement
if not "%DOW%"=="Monday" (
    echo [%LOG_DATE% %TIME%] Jour %DOW% - Weekly intelligence reserve aux lundis. Skip. >> "%LOG_FILE%"
    exit /b 0
)

echo [%LOG_DATE% %TIME%] Starting weekly intelligence (lundi)... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: 1. Keyword tracking (~15min)
echo [%TIME%] [1/19] Keyword tracking... >> "%LOG_FILE%"
python scripts\keyword_tracker.py --with-report >> "%LOG_FILE%" 2>&1

:: 2. Content gap detector (~30s)
echo [%TIME%] [2/19] Content gap analysis... >> "%LOG_FILE%"
python scripts\content_gap.py >> "%LOG_FILE%" 2>&1

:: 3. Pricing monitor (~1min)
echo [%TIME%] [3/19] Pricing monitor... >> "%LOG_FILE%"
python scripts\pricing_monitor.py >> "%LOG_FILE%" 2>&1

:: 4. Backlink spy (~2min)
echo [%TIME%] [4/19] Backlink spy... >> "%LOG_FILE%"
python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 5. Broken link finder (~5min)
echo [%TIME%] [5/19] Broken link finder... >> "%LOG_FILE%"
python scripts\broken_link_finder.py >> "%LOG_FILE%" 2>&1

:: 6. Outreach tracker digest (~30s)
echo [%TIME%] [6/19] Outreach tracker digest... >> "%LOG_FILE%"
python scripts\outreach_tracker.py >> "%LOG_FILE%" 2>&1

:: 7. Vulnerability detector (~30s)
echo [%TIME%] [7/19] Vulnerability detector... >> "%LOG_FILE%"
python scripts\vulnerability_detector.py >> "%LOG_FILE%" 2>&1

:: 8. Google Trends early warning (~5min)
echo [%TIME%] [8/19] Google Trends... >> "%LOG_FILE%"
python scripts\google_trends.py >> "%LOG_FILE%" 2>&1

:: 9. Review scraper (~3min)
echo [%TIME%] [9/19] Review scraper... >> "%LOG_FILE%"
python scripts\review_scraper.py >> "%LOG_FILE%" 2>&1

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

:: 17. Influencer Finder -- YouTube/Instagram/Blog Tokyo expat
echo [%TIME%] [17/19] Influencer finder... >> "%LOG_FILE%"
python scripts\influencer_finder.py >> "%LOG_FILE%" 2>&1

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

:: 23. Competitor jobs monitor (signaux recrutement concurrents)
echo [%TIME%] [23/30] Competitor jobs monitor... >> "%LOG_FILE%"
python scripts\competitor_jobs_monitor.py >> "%LOG_FILE%" 2>&1

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
echo [%TIME%] [30/30] Backup .env chiffre OneDrive... >> "%LOG_FILE%"
python scripts\backup_env.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
