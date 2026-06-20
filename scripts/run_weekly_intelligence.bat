@echo off
:: ============================================================
:: Tokyo Expat — Weekly Intelligence Report
:: Lance: chaque lundi matin (via Startup folder)
:: Duree: ~20-25min total
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set LOG_FILE=%SCRIPT_DIR%data\log_weekly_%DATE:~-4%-%DATE:~3,2%-%DATE:~0,2%.txt

echo [%DATE% %TIME%] Starting weekly intelligence... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: 1. Keyword tracking (~15min)
echo [%TIME%] [1/5] Keyword tracking... >> "%LOG_FILE%"
python scripts\keyword_tracker.py --with-report >> "%LOG_FILE%" 2>&1

:: 2. Content gap detector (~30s)
echo [%TIME%] [2/5] Content gap analysis... >> "%LOG_FILE%"
python scripts\content_gap.py >> "%LOG_FILE%" 2>&1

:: 3. Pricing monitor (~1min)
echo [%TIME%] [3/5] Pricing monitor... >> "%LOG_FILE%"
python scripts\pricing_monitor.py >> "%LOG_FILE%" 2>&1

:: 4. Backlink spy (~2min)
echo [%TIME%] [4/5] Backlink spy... >> "%LOG_FILE%"
python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 5. Rapport consolide Telegram
echo [%TIME%] [5/5] Weekly report... >> "%LOG_FILE%"
python scripts\weekly_report.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
