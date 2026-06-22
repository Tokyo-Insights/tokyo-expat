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
echo [%TIME%] [1/9] Keyword tracking... >> "%LOG_FILE%"
python scripts\keyword_tracker.py --with-report >> "%LOG_FILE%" 2>&1

:: 2. Content gap detector (~30s)
echo [%TIME%] [2/9] Content gap analysis... >> "%LOG_FILE%"
python scripts\content_gap.py >> "%LOG_FILE%" 2>&1

:: 3. Pricing monitor (~1min)
echo [%TIME%] [3/9] Pricing monitor... >> "%LOG_FILE%"
python scripts\pricing_monitor.py >> "%LOG_FILE%" 2>&1

:: 4. Backlink spy (~2min)
echo [%TIME%] [4/16] Backlink spy... >> "%LOG_FILE%"
python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 5. Broken link finder (~5min) - technique 404 pour voler les backlinks concurrents
echo [%TIME%] [5/16] Broken link finder... >> "%LOG_FILE%"
python scripts\broken_link_finder.py >> "%LOG_FILE%" 2>&1

:: 6. Outreach tracker digest (~30s) - CRM backlinks + partenariats + B2B
echo [%TIME%] [6/16] Outreach tracker digest... >> "%LOG_FILE%"
python scripts\outreach_tracker.py >> "%LOG_FILE%" 2>&1

:: 7. Vulnerability detector (~30s)
echo [%TIME%] [7/16] Vulnerability detector... >> "%LOG_FILE%"
python scripts\vulnerability_detector.py >> "%LOG_FILE%" 2>&1

:: 8. Google Trends early warning (~5min)
echo [%TIME%] [8/16] Google Trends... >> "%LOG_FILE%"
python scripts\google_trends.py >> "%LOG_FILE%" 2>&1

:: 9. Review scraper (~3min)
echo [%TIME%] [9/16] Review scraper... >> "%LOG_FILE%"
python scripts\review_scraper.py >> "%LOG_FILE%" 2>&1

:: 10. Calendrier saisonnier (~5s)
echo [%TIME%] [10/16] Seasonal calendar... >> "%LOG_FILE%"
python scripts\seasonal_calendar.py >> "%LOG_FILE%" 2>&1

:: 11. Analyse proactive + rapport consolide
echo [%TIME%] [11/16] Proactive analysis... >> "%LOG_FILE%"
python scripts\proactive_analysis.py >> "%LOG_FILE%" 2>&1

:: 12. Expat.com auto-post (nouveaux articles)
echo [%TIME%] [12/16] Expat.com autoposter... >> "%LOG_FILE%"
python scripts\expatcom_autoposter.py >> "%LOG_FILE%" 2>&1

:: 13. Expat.com reponses automatiques aux sujets existants (max 2/semaine)
echo [%TIME%] [13/16] Expat.com replier... >> "%LOG_FILE%"
python scripts\expatcom_replier.py >> "%LOG_FILE%" 2>&1

:: 14. Verifie si les liens Expat.com sont approuves par les moderateurs
echo [%TIME%] [14/16] Expat.com link checker... >> "%LOG_FILE%"
python scripts\expatcom_link_checker.py >> "%LOG_FILE%" 2>&1

:: 15. LinkedIn autoposter (1 post/semaine, browser visible)
echo [%TIME%] [15/22] LinkedIn autoposter... >> "%LOG_FILE%"
python scripts\linkedin_autoposter.py >> "%LOG_FILE%" 2>&1

:: 16. Digest social sharing (1 message Telegram avec liens 1-clic Reddit+Facebook)
echo [%TIME%] [16/22] Social sharing digest... >> "%LOG_FILE%"
python scripts\social_sharing.py >> "%LOG_FILE%" 2>&1

:: 17. Competitor Radar -- Art de la Guerre, detecte les nouveaux concurrents
echo [%TIME%] [17/22] Competitor radar... >> "%LOG_FILE%"
python scripts\competitor_radar.py >> "%LOG_FILE%" 2>&1

:: 18. Influencer Finder -- YouTube/Instagram/Blog Tokyo expat
echo [%TIME%] [18/22] Influencer finder... >> "%LOG_FILE%"
python scripts\influencer_finder.py >> "%LOG_FILE%" 2>&1

:: 19. Quora Finder -- Questions Tokyo housing + drafts reponses
echo [%TIME%] [19/22] Quora finder... >> "%LOG_FILE%"
python scripts\quora_finder.py >> "%LOG_FILE%" 2>&1

:: 20. Facebook via Buffer API (sans credentials Facebook -- voir facebook_buffer_poster.py pour le setup)
echo [%TIME%] [20/22] Facebook Buffer poster... >> "%LOG_FILE%"
python scripts\facebook_buffer_poster.py >> "%LOG_FILE%" 2>&1

:: 21. Emails outreach automatiques (si GMAIL_APP_PASSWORD configure dans .env)
echo [%TIME%] [21/22] Email outreach sender... >> "%LOG_FILE%"
python scripts\email_sender.py >> "%LOG_FILE%" 2>&1

:: 22. Monday briefing consolide (toujours en dernier, apres tous les scripts)
echo [%TIME%] [22/22] Monday briefing consolide... >> "%LOG_FILE%"
python scripts\monday_briefing.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
