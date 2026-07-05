import os
import html

MOCKUP_DIR = r"d:\justificadll\Mockups\Qualifa"
OUTPUT_FILE = os.path.join(MOCKUP_DIR, "mockup_qualifa_standalone.html")

sections = [
    ("mockup_dasbor_psikologi.html", "1", "Qualifa Psychology Hub (Landing & Portal Ekosistem)"),
    ("mockup_auth_qualifa.html", "2", "Autentikasi Standalone (Verifikasi SIPP & OTP)"),
    ("mockup_dashboard_psikologi_klien.html", "3", "Dasbor Psikologi Pasien & Klien"),
    ("mockup_dashboard_mitra_psikologi.html", "4", "Dasbor Utama Mitra Psikolog Klinis"),
    ("mockup_katalog_qualifa.html", "5", "Katalog Psikolog & Konselor Mental Health"),
    ("mockup_modul_psikologi_klien.html", "6", "Workstation Klien (CCBT & Mood Tracker)"),
    ("mockup_modul_psikologi_mitra.html", "7", "Workstation Klinis Mitra (DAP Note & EMR)"),
    ("mockup_chat_qualifa.html", "8", "Ruang Konseling WebRTC E2EE"),
    ("mockup_payment_gateway.html", "9", "Payment Gateway Standalone (Midtrans)"),
    ("mockup_admin_qualifa.html", "10", "Admin Kepatuhan HIMPSI Registry & Audit WORM")
]

toc_html = []
sections_html = []

for filename, num, title in sections:
    filepath = os.path.join(MOCKUP_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Warning: {filepath} not found!")
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    section_id = filename.replace(".html", "")
    toc_html.append(f'        <a href="#{section_id}">{num}. {title}</a>')
    
    escaped_content = html.escape(content, quote=True)
    
    sec_block = f"""
    <div class="mockup-section" id="{section_id}">
        <div class="section-label">
            <span class="num">{num}</span> {title}
            <span class="file">{filename}</span>
        </div>
        <iframe class="mockup-frame" srcdoc="{escaped_content}"></iframe>
    </div>"""
    sections_html.append(sec_block)

bundle_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Standalone Psychology Application UI/UX Master Bundle</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Outfit', sans-serif; background: #080c14; color: #f1f5f9; padding: 2rem 3rem; }}
        .master-header {{ text-align: center; margin-bottom: 3rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }}
        .master-header h1 {{ font-size: 2.2rem; font-weight: 700; color: #fff; }}
        .master-header h1 span {{ color: #c084fc; }}
        .master-header p {{ color: #94a3b8; margin-top: 0.5rem; font-size: 0.95rem; }}
        .toc {{ max-width: 950px; margin: 0 auto 3.5rem; display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; }}
        .toc a {{ padding: 0.6rem 1.4rem; background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.25); border-radius: 10px; color: #c084fc; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.2s; }}
        .toc a:hover {{ background: rgba(168,85,247,0.2); border-color: #c084fc; transform: translateY(-2px); }}
        .mockup-section {{ margin-bottom: 4.5rem; scroll-margin-top: 2rem; }}
        .section-label {{ font-size: 1.1rem; font-weight: 600; color: #c084fc; margin-bottom: 1rem; display: flex; align-items: center; gap: 12px; padding: 0.8rem 1.2rem; background: rgba(168,85,247,0.06); border: 1px solid rgba(168,85,247,0.2); border-radius: 12px; }}
        .section-label .num {{ background: #a855f7; color: #fff; font-weight: 700; font-size: 0.85rem; width: 35px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }}
        .section-label .file {{ font-size: 0.8rem; color: #64748b; margin-left: auto; font-family: monospace; }}
        .mockup-frame {{ width: 100%; height: 920px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }}
    </style>
</head>
<body>
    <div class="master-header">
        <h1>🧠 Qualifa <span>Standalone App</span> · Psychology UI/UX Master Bundle</h1>
        <p>Ekosistem Kesehatan Mental & Konseling Psikologi Klinis — 100% Siloed Mandiri (Zero Percampuran Domain)</p>
    </div>
    <div class="toc">
{chr(10).join(toc_html)}
    </div>
{"".join(sections_html)}
</body>
</html>
"""

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(bundle_html)

print("Successfully regenerated mockup_qualifa_standalone.html with 10 sections!")
