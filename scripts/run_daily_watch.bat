@echo off
:: ============================================================
:: Tokyo Expat -- Daily Intelligence Watch
:: Lance: a chaque demarrage PC (via Startup folder)
:: Duree: ~3-5min total
:: Fix date: PowerShell pour format locale-independant (YYYY/MM/DD sur JP Windows)
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..

:: Date fiable independante du format locale Windows
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set LOG_DATE=%%i
set LOG_FILE=%SCRIPT_DIR%data\log_daily_%LOG_DATE%.txt

:: Creer le dossier data si inexistant
if not exist "%SCRIPT_DIR%data\" mkdir "%SCRIPT_DIR%data\"

echo [%LOG_DATE% %TIME%] Starting daily watch... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: 1. Nouveaux contenus concurrents (sitemaps)
echo [%TIME%] [1/4] Competitor watch... >> "%LOG_FILE%"
python scripts\competitor_watch.py >> "%LOG_FILE%" 2>&1

:: 2. HARO monitor (quotidien -- requetes Qwoted/Featured expirent en 24-72h)
echo [%TIME%] [2/4] HARO monitor... >> "%LOG_FILE%"
python scripts\haro_monitor.py >> "%LOG_FILE%" 2>&1

:: 3. Calendrier saisonnier (alerte si fenetre de publication ouverte)
echo [%TIME%] [3/4] Seasonal calendar... >> "%LOG_FILE%"
python scripts\seasonal_calendar.py >> "%LOG_FILE%" 2>&1

:: 4. Analyse proactive (seulement si donnees disponibles)
echo [%TIME%] [4/5] Proactive analysis... >> "%LOG_FILE%"
python scripts\proactive_analysis.py >> "%LOG_FILE%" 2>&1

:: 5. Reddit intercept (posts Tokyo housing des dernieres 24h -- alerte Telegram si match)
echo [%TIME%] [5/7] Reddit intercept... >> "%LOG_FILE%"
python scripts\reddit_quora_intercept.py >> "%LOG_FILE%" 2>&1

:: 6. Welcome drip (J+2 / J+5 ; J+0 gere par /api/subscribe)
echo [%TIME%] [6/8] Brevo welcome drip... >> "%LOG_FILE%"
python scripts\brevo_welcome_drip.py >> "%LOG_FILE%" 2>&1

:: 7. Relances backlinks (J+6 sans reponse -> draft Gmail + alerte Telegram)
::    + boucle fermee: detecte les brouillons envoyes -> arme la relance
echo [%TIME%] [7/9] Backlink follow-up watcher... >> "%LOG_FILE%"
python scripts\backlink_followup_watcher.py >> "%LOG_FILE%" 2>&1

:: 8. Stockeur de brouillons backlinks ("Je stocke, tu cliques")
::    Remplit Gmail Drafts avec les cibles email_verified. N'ENVOIE JAMAIS.
echo [%TIME%] [8/9] Backlink draft stocker... >> "%LOG_FILE%"
python scripts\backlink_draft_stocker.py >> "%LOG_FILE%" 2>&1

:: 9. Social poster Buffer (AUTO-REPARANT) : poste 1 FB + 1 LI si >=6j depuis le dernier,
::    sinon skip (garde-fou too_recent interne). Ne depend plus du PC allume un lundi precis.
echo [%TIME%] [9/10] Social Buffer poster (if due)... >> "%LOG_FILE%"
python scripts\facebook_buffer_poster.py >> "%LOG_FILE%" 2>&1

:: 10. Site health canary : detecte les pannes silencieuses (pages 200, tag GA, CSP). Alerte si casse.
echo [%TIME%] [10/11] Site health canary... >> "%LOG_FILE%"
python scripts\site_health_canary.py >> "%LOG_FILE%" 2>&1

:: 11. Thursday briefing leger (jeudi uniquement : Buffer status + actions en attente)
for /f %%d in ('powershell -NoProfile -Command "(Get-Date).DayOfWeek"') do set DOW_DAILY=%%d
if "%DOW_DAILY%"=="Thursday" (
    echo [%TIME%] [7/7] Thursday briefing... >> "%LOG_FILE%"
    python scripts\monday_briefing.py --thursday >> "%LOG_FILE%" 2>&1
)

echo [%TIME%] Daily watch complete. >> "%LOG_FILE%"
