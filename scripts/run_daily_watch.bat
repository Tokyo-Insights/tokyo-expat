@echo off
:: ============================================================
:: Tokyo Expat -- Daily Intelligence Watch
:: Lance: a chaque demarrage PC (via Startup folder)
:: Duree: ~3-5min total
:: ============================================================

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set LOG_FILE=%SCRIPT_DIR%data\log_daily_%DATE:~-4%-%DATE:~3,2%-%DATE:~0,2%.txt

echo [%DATE% %TIME%] Starting daily watch... >> "%LOG_FILE%"
cd /d "%PROJECT_DIR%"

:: 1. Nouveaux contenus concurrents (sitemaps)
echo [%TIME%] [1/3] Competitor watch... >> "%LOG_FILE%"
python scripts\competitor_watch.py >> "%LOG_FILE%" 2>&1

:: 2. Calendrier saisonnier (alerte si fenetre de publication ouverte)
echo [%TIME%] [2/3] Seasonal calendar... >> "%LOG_FILE%"
python scripts\seasonal_calendar.py >> "%LOG_FILE%" 2>&1

:: 3. Analyse proactive (seulement si donnees disponibles)
echo [%TIME%] [3/3] Proactive analysis... >> "%LOG_FILE%"
python scripts\proactive_analysis.py >> "%LOG_FILE%" 2>&1

echo [%TIME%] Daily watch complete. >> "%LOG_FILE%"
