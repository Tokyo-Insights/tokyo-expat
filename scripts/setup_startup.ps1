# setup_startup.ps1 -- Installe le raccourci Weekly Intelligence dans le dossier Startup Windows
# Execute une seule fois. Fire a chaque ouverture de session (garanti meme avec Fast Startup).
# Le .bat filtre lui-meme le lundi (DOW == Monday), donc safe tous les jours.
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\setup_startup.ps1

$startupDir = [System.Environment]::GetFolderPath("Startup")
$projectDir = Split-Path -Parent $PSScriptRoot
$batPath = Join-Path $projectDir "scripts\run_weekly_intelligence.bat"
$lnkPath = Join-Path $startupDir "tokyo-expat-weekly.lnk"

if (-not (Test-Path $batPath)) {
    Write-Host "[ERROR] Bat introuvable : $batPath" -ForegroundColor Red
    exit 1
}

$ws = New-Object -ComObject WScript.Shell
$lnk = $ws.CreateShortcut($lnkPath)
$lnk.TargetPath = "cmd.exe"
$lnk.Arguments = "/c `"$batPath`""
$lnk.WorkingDirectory = $projectDir
$lnk.WindowStyle = 7  # minimise
$lnk.Description = "Tokyo Expat Weekly Intelligence (lundi)"
$lnk.Save()

Write-Host "[OK] Raccourci installe : $lnkPath" -ForegroundColor Green
Write-Host "     -> Fire a chaque session Windows (filtre lundi dans le .bat)"
Write-Host ""
Write-Host "Pour desinstaller : Remove-Item '$lnkPath'"
