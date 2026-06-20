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
echo [%TIME%] [4/9] Backlink spy... >> "%LOG_FILE%"
python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 5. Vulnerability detector (~30s)
echo [%TIME%] [5/9] Vulnerability detector... >> "%LOG_FILE%"
python scripts\vulnerability_detector.py >> "%LOG_FILE%" 2>&1

:: 6. Google Trends early warning (~5min)
echo [%TIME%] [6/9] Google Trends... >> "%LOG_FILE%"
python scripts\google_trends.py >> "%LOG_FILE%" 2>&1

:: 7. Review scraper (~3min)
echo [%TIME%] [7/9] Review scraper... >> "%LOG_FILE%"
python scripts\review_scraper.py >> "%LOG_FILE%" 2>&1

:: 8. Calendrier saisonnier (~5s)
echo [%TIME%] [8/9] Seasonal calendar... >> "%LOG_FILE%"
python scripts\seasonal_calendar.py >> "%LOG_FILE%" 2>&1

:: 9. Analyse proactive + rapport consolide
echo [%TIME%] [9/10] Proactive analysis... >> "%LOG_FILE%"
python scripts\proactive_analysis.py >> "%LOG_FILE%" 2>&1

:: 10. Expat.com auto-post
echo [%TIME%] [10/11] Expat.com autoposter... >> "%LOG_FILE%"
python scripts\expatcom_autoposter.py >> "%LOG_FILE%" 2>&1

:: 11. Digest social sharing (1 message Telegram avec liens 1-clic Reddit+Facebook)
echo [%TIME%] [11/11] Social sharing digest... >> "%LOG_FILE%"
python scripts\social_sharing.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
