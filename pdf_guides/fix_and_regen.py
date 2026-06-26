import subprocess, os, time, glob

GUIDES_DIR = os.path.dirname(os.path.abspath(__file__))
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

html_files = [
    "relocation-checklist-japan-en.html",
    "first-month-tokyo-en.html",
    "apartment-tokyo-foreigners-en.html",
    "checklist-relocation-japon-fr.html",
    "premier-mois-tokyo-fr.html",
    "appartement-tokyo-etrangers-fr.html",
]

# 1. Fix CSS: reduce full-page heights by 1mm to stop overflow blank pages
for f in html_files:
    path = os.path.join(GUIDES_DIR, f)
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()
    before = content.count("297mm")
    content = content.replace("min-height: 297mm", "min-height: 296mm")
    # also handle the .page wrapper one-liners using "min-height: 297mm;" already covered
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)
    print(f"{f}: replaced {before} occurrences of 297mm")

# 2. Regenerate PDFs
def count_pages(pdf_path):
    # minimal PDF page count via /Type /Page occurrences
    try:
        with open(pdf_path, "rb") as fh:
            data = fh.read()
        return data.count(b"/Type /Page") + data.count(b"/Type/Page")
    except Exception:
        return -1

print("\n--- Regenerating ---")
for f in html_files:
    html_path = os.path.join(GUIDES_DIR, f)
    pdf_path = html_path.replace(".html", ".pdf")
    file_url = "file:///" + html_path.replace("\\", "/")
    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--disable-dev-shm-usage", "--run-all-compositor-stages-before-draw",
        "--disable-extensions", f"--print-to-pdf={pdf_path}",
        "--print-to-pdf-no-header", file_url
    ], capture_output=True, text=True, timeout=40)
    time.sleep(1)
    pages = count_pages(pdf_path)
    size_kb = os.path.getsize(pdf_path) // 1024 if os.path.exists(pdf_path) else 0
    print(f"{os.path.basename(pdf_path)}: {pages} pages, {size_kb} KB")

print("\nDone.")
