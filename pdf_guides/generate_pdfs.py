import subprocess
import os
import time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
GUIDES_DIR = os.path.dirname(os.path.abspath(__file__))

files = [
    "relocation-checklist-japan-en.html",
    "first-month-tokyo-en.html",
    "apartment-tokyo-foreigners-en.html",
    "checklist-relocation-japon-fr.html",
    "premier-mois-tokyo-fr.html",
    "appartement-tokyo-etrangers-fr.html",
]

for f in files:
    html_path = os.path.join(GUIDES_DIR, f)
    pdf_name = f.replace(".html", ".pdf")
    pdf_path = os.path.join(GUIDES_DIR, pdf_name)

    # Convert Windows path to file:/// URL
    file_url = "file:///" + html_path.replace("\\", "/")

    print(f"Generating: {pdf_name} ...", end=" ", flush=True)

    result = subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--run-all-compositor-stages-before-draw",
        "--disable-extensions",
        f"--print-to-pdf={pdf_path}",
        "--print-to-pdf-no-header",
        file_url
    ], capture_output=True, text=True, timeout=30)

    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) // 1024
        print(f"OK ({size_kb} KB)")
    else:
        print(f"FAILED — {result.stderr[:120]}")

    time.sleep(1)

print("\nDone. PDFs saved in:", GUIDES_DIR)
