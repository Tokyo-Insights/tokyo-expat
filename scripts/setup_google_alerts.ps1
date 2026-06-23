# setup_google_alerts.ps1 -- Ouvre les pages Google Alerts par lot
# Chaque lot = 6 onglets. Appuie sur Entree pour passer au lot suivant.
# Pour chaque onglet : verifier la frequence "Au fil de l'eau", cliquer "Creer une alerte".
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\setup_google_alerts.ps1

$alerts = @(
    # --- NOTRE MARQUE ---
    @{ cat="Marque";       q='"Tokyo Expat"' },
    @{ cat="Marque";       q='"tokyo-expat.com"' },

    # --- CONCURRENTS LOGEMENT TOKYO ---
    @{ cat="Logement";     q='"Sakura House"' },
    @{ cat="Logement";     q='"Oak House" Tokyo' },
    @{ cat="Logement";     q='"GaijinPot Housing"' },
    @{ cat="Logement";     q='"Leopalace21" expat' },
    @{ cat="Logement";     q='"Plaza Homes Tokyo"' },
    @{ cat="Logement";     q='"Ken Corporation Tokyo"' },
    @{ cat="Logement";     q='"Relomate"' },
    @{ cat="Logement";     q='"Weekly Mansion Tokyo"' },
    @{ cat="Logement";     q='"Fontaine Tokyo"' },

    # --- SITES CONTENU EXPAT JAPAN ---
    @{ cat="Contenu";      q='"Savvy Tokyo"' },
    @{ cat="Contenu";      q='"Tokyo Cheapo"' },
    @{ cat="Contenu";      q='"Tofugu"' },
    @{ cat="Contenu";      q='"GaijinPot"' },
    @{ cat="Contenu";      q='"Time Out Tokyo"' },
    @{ cat="Contenu";      q='"Japan Guide" expat' },
    @{ cat="Contenu";      q='"Japan Insider"' },
    @{ cat="Contenu";      q='"Expatica Japan"' },

    # --- SOCIETES RELOCATION JAPAN ---
    @{ cat="Relocation";   q='"Crown Relo Japan"' },
    @{ cat="Relocation";   q='"Asian Tigers Japan"' },
    @{ cat="Relocation";   q='"Santa Fe Relocations Japan"' },
    @{ cat="Relocation";   q='"Graebel Japan"' },
    @{ cat="Relocation";   q='"Cartus Japan"' },
    @{ cat="Relocation";   q='"Mobility Services Japan"' },

    # --- PLATEFORMES CHASSEURS (ENNEMIS DIRECTS) ---
    @{ cat="Chasseurs";    q='"Remoters"' },
    @{ cat="Chasseurs";    q='"Remoters.io"' },
    @{ cat="Chasseurs";    q='"HousingAnywhere Japan"' },
    @{ cat="Chasseurs";    q='"HousingAnywhere Tokyo"' },
    @{ cat="Chasseurs";    q='"Flatio Japan"' },
    @{ cat="Chasseurs";    q='"Relocateme Japan"' },
    @{ cat="Chasseurs";    q='"Movingto Japan"' },
    @{ cat="Chasseurs";    q='"Spotahome Tokyo"' },
    @{ cat="Chasseurs";    q='"Nestpick Tokyo"' },
    @{ cat="Chasseurs";    q='"InterNations Tokyo"' },
    @{ cat="Chasseurs";    q='"Japan Housing Center"' },
    @{ cat="Chasseurs";    q='"ABLE Japan" expat' },
    @{ cat="Chasseurs";    q='"Century21 Japan" foreigner' },
    @{ cat="Chasseurs";    q='"RE/MAX Japan" expat' },

    # --- COMMUNAUTES FR ---
    @{ cat="CommunauteFR"; q='"FrancexpatJapon"' },
    @{ cat="CommunauteFR"; q='"Francais Tokyo" logement' },
    @{ cat="CommunauteFR"; q='"Japon Expat" logement' },

    # --- MOTS-CLES STRATEGIQUES ---
    @{ cat="Keywords";     q='"tokyo expat housing"' },
    @{ cat="Keywords";     q='"find apartment tokyo foreigner"' },
    @{ cat="Keywords";     q='"relocating to tokyo" guide' },
    @{ cat="Keywords";     q='"expatrie tokyo logement"' },
    @{ cat="Keywords";     q='"share house tokyo" guide' },
    @{ cat="Keywords";     q='"furnished apartment tokyo"' },
    @{ cat="Keywords";     q='"japan expat housing"' }
)

$total = $alerts.Count

Write-Host ""
Write-Host "=== Google Alerts Setup -- $total alertes ===" -ForegroundColor Cyan
Write-Host "Ouverture de tous les onglets (600ms entre chaque)..." -ForegroundColor Yellow
Write-Host "Pour chaque onglet : verifier frequence -> cliquer 'Creer une alerte'" -ForegroundColor Yellow
Write-Host ""

$i = 1
$currentCat = ""
foreach ($a in $alerts) {
    if ($a.cat -ne $currentCat) {
        Write-Host "  [$($a.cat)]" -ForegroundColor Green
        $currentCat = $a.cat
    }
    Write-Host "    [$i/$total] $($a.q)"
    $encoded = [System.Uri]::EscapeDataString($a.q)
    Start-Process "https://www.google.com/alerts?q=$encoded"
    Start-Sleep -Milliseconds 600
    $i++
}

Write-Host ""
Write-Host "[DONE] $total onglets ouverts." -ForegroundColor Green
Write-Host "Verification finale : https://www.google.com/alerts#manage" -ForegroundColor Cyan
