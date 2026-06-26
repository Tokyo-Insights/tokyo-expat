import subprocess, os, time
from pypdf import PdfReader

GUIDES_DIR = os.path.dirname(os.path.abspath(__file__))
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

files = [
    "relocation-checklist-japan-en.html",
    "first-month-tokyo-en.html",
    "apartment-tokyo-foreigners-en.html",
    "checklist-relocation-japon-fr.html",
    "premier-mois-tokyo-fr.html",
    "appartement-tokyo-etrangers-fr.html",
]

for f in files:
    path = os.path.join(GUIDES_DIR, f)
    with open(path, "r", encoding="utf-8") as fh:
        c = fh.read()
    # 1. remove forced page break (creates blank pages)
    c = c.replace("; page-break-after: always; }", "; }")
    c = c.replace("    .page:last-child { page-break-after: avoid; }\n", "")
    c = c.replace("  .page:last-child { page-break-after: avoid; }\n", "")
    # 2. kill accumulating print margin (base rule overrides @media print)
    c = c.replace("margin: 12px auto", "margin: 0 auto")
    # 3. ensure 296mm safety (idempotent)
    c = c.replace("min-height: 297mm", "min-height: 296mm")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(c)

print("--- Regenerating + verifying ---")
all_ok = True
for f in files:
    html_path = os.path.join(GUIDES_DIR, f)
    pdf_path = html_path.replace(".html", ".pdf")
    url = "file:///" + html_path.replace("\\", "/")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--disable-dev-shm-usage", "--run-all-compositor-stages-before-draw",
        "--disable-extensions", "--print-to-pdf=" + pdf_path,
        "--print-to-pdf-no-header", url], capture_output=True, text=True, timeout=40)
    time.sleep(1)
    r = PdfReader(pdf_path)
    blanks = sum(1 for pg in r.pages if not (pg.extract_text() or "").strip()
                 and "/XObject" not in (pg.get("/Resources", {}) or {}))
    flag = "OK" if blanks == 0 else "STILL BLANK"
    if blanks != 0:
        all_ok = False
    print(f"  {flag}: {os.path.basename(pdf_path)} -> {len(r.pages)} pages, {blanks} blank")

print("\nALL CLEAN" if all_ok else "\nSOME STILL HAVE BLANKS")
