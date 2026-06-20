@echo off
:: ============================================================
:: Tokyo Expat — Weekly Intelligence Report
:: Lance: chaque lundi matin
:: Durée: ~15-20min (30 keywords x 5s delay)
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set LOG_FILE=%SCRIPT_DIR%data\log_weekly_%DATE:~-4%-%DATE:~3,2%-%DATE:~0,2%.txt

echo [%DATE% %TIME%] Starting weekly intelligence... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: 1. Keyword tracking (le plus long ~15min)
echo [%TIME%] [1/3] Keyword tracking... >> "%LOG_FILE%"
python scripts\keyword_tracker.py >> "%LOG_FILE%" 2>&1

:: 2. Backlink spy
echo [%TIME%] [2/3] Backlink spy... >> "%LOG_FILE%"
python scripts\backlink_spy.py >> "%LOG_FILE%" 2>&1

:: 3. Rapport consolidé Telegram
echo [%TIME%] [3/3] Weekly report... >> "%LOG_FILE%"
python scripts\weekly_report.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Weekly intelligence complete. >> "%LOG_FILE%"
