@echo off
:: ============================================================
:: Tokyo Expat — Daily Competitor Watch
:: Lance: chaque matin automatiquement (ou manuellement)
:: Setup: ajouter au Startup folder ou Task Scheduler
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set LOG_FILE=%SCRIPT_DIR%data\log_daily_%DATE:~-4%-%DATE:~3,2%-%DATE:~0,2%.txt

echo [%DATE% %TIME%] Starting daily watch... >> "%LOG_FILE%"

:: Aller dans le dossier projet
cd /d "%PROJECT_DIR%"

:: Competitor Watch
echo [%TIME%] competitor_watch.py >> "%LOG_FILE%"
python scripts\competitor_watch.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Done. >> "%LOG_FILE%"
