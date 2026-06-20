# setup_automation.ps1 — Tokyo Expat Intelligence Automation
# Run once as admin to configure:
#   - Daily competitor watch (every morning at startup)
#   - Weekly intelligence report (every Monday at startup)
#
# Usage: powershell -ExecutionPolicy Bypass -File scripts\setup_automation.ps1

$ProjectDir = Split-Path -Parent $PSScriptRoot
$ScriptDir = "$ProjectDir\scripts"
$StartupFolder = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"

Write-Host "`n=== Tokyo Expat — Intelligence Automation Setup ===" -ForegroundColor Cyan

# --- Daily Competitor Watch ---
$dailyBat = "$ScriptDir\run_daily_watch.bat"
$dailyLnk = "$StartupFolder\TE_Daily_Watch.lnk"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($dailyLnk)
$shortcut.TargetPath = $dailyBat
$shortcut.WorkingDirectory = $ProjectDir
$shortcut.WindowStyle = 7  # Minimized
$shortcut.Description = "Tokyo Expat — Daily Competitor Watch"
$shortcut.Save()

Write-Host "✅ Daily watch shortcut created: $dailyLnk" -ForegroundColor Green

# --- Weekly Intelligence (lundi seulement via DOW filter dans le .bat) ---
$weeklyBat = "$ScriptDir\run_weekly_intelligence.bat"
$weeklyLnk = "$StartupFolder\TE_Weekly_Intelligence.lnk"

$shortcut2 = $shell.CreateShortcut($weeklyLnk)
$shortcut2.TargetPath = $weeklyBat
$shortcut2.WorkingDirectory = $ProjectDir
$shortcut2.WindowStyle = 7  # Minimized
$shortcut2.Description = "Tokyo Expat — Weekly Intelligence Report"
$shortcut2.Save()

Write-Host "✅ Weekly intelligence shortcut created: $weeklyLnk" -ForegroundColor Green

# --- Installer duckduckgo-search si pas là ---
Write-Host "`nInstalling Python deps..." -ForegroundColor Yellow
python -m pip install duckduckgo-search requests --quiet

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "   Daily watch: fires at every PC startup" -ForegroundColor Gray
Write-Host "   Weekly report: fires Monday mornings at startup" -ForegroundColor Gray
Write-Host "`nTest: python scripts\competitor_watch.py" -ForegroundColor Cyan
