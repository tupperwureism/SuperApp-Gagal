import html
import os

MOCKUP_DIR = r'd:\justificadll\Mockups'
OUTPUT = os.path.join(MOCKUP_DIR, 'gabungan_semua_mockup.html')

# Ordered list of mockup files to include (mockup_* only, no wireframes/gabungan)
MOCKUP_FILES = [
    'mockup_auth.html',
    'mockup_dashboard_klien.html',
    'mockup_dashboard_mitra.html',
    'mockup_dashboard_admin.html',
    'mockup_admin_verifikasi.html',
    'mockup_admin_pelanggaran.html',
    'mockup_admin_keuangan.html',
    'mockup_modul_medis.html',
    'mockup_modul_psikologi.html',
    'mockup_modul_hukum.html',
    'mockup_payment_gateway.html',
    'mockup_chat_room.html',
]

sections = []
for fname in MOCKUP_FILES:
    fpath = os.path.join(MOCKUP_DIR, fname)
    if not os.path.isfile(fpath):
        print(f'SKIP (not found): {fname}')
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        raw = f.read()
    escaped = html.escape(raw)
    label = fname.replace('mockup_', '').replace('.html', '').replace('_', ' ').title()
    sections.append((fname, label, escaped))

page = '''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Gabungan Mockup - Justifica</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Outfit', sans-serif;
            background: #0a0a0f;
            color: #f1f5f9;
            padding: 2rem 3rem;
        }
        .master-header {
            text-align: center; margin-bottom: 3rem; padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .master-header h1 { font-size: 2rem; font-weight: 700; }
        .master-header h1 span { color: #0ea5e9; }
        .master-header p { color: #64748b; margin-top: 0.5rem; font-size: 0.9rem; }

        .toc { max-width: 700px; margin: 0 auto 3rem; display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
        .toc a {
            padding: 0.5rem 1.2rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px; color: #94a3b8; text-decoration: none; font-size: 0.85rem; transition: all 0.2s;
        }
        .toc a:hover { background: rgba(14,165,233,0.1); border-color: rgba(14,165,233,0.3); color: #0ea5e9; }

        .mockup-section { margin-bottom: 4rem; }
        .section-label {
            font-size: 1.1rem; font-weight: 600; color: #0ea5e9; margin-bottom: 1rem;
            display: flex; align-items: center; gap: 10px;
            padding: 0.8rem 1.2rem; background: rgba(14,165,233,0.06);
            border: 1px solid rgba(14,165,233,0.15); border-radius: 12px;
        }
        .section-label .num {
            background: #0ea5e9; color: #000; font-weight: 700; font-size: 0.8rem;
            width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
        }
        .section-label .file { font-size: 0.78rem; color: #475569; margin-left: auto; }

        .mockup-frame {
            width: 100%; height: 900px; border: 1px solid rgba(255,255,255,0.06);
            border-radius: 12px; background: #fff;
        }
    </style>
</head>
<body>
    <div class="master-header">
        <h1>Justifica <span>3-in-1</span> · Master Visual UI/UX</h1>
        <p>Gabungan seluruh mockup high-fidelity — Diperbarui 01 Juli 2026</p>
    </div>

    <div class="toc">
'''

for i, (fname, label, _) in enumerate(sections, 1):
    anchor = fname.replace('.html', '')
    page += f'        <a href="#{anchor}">{i}. {label}</a>\n'

page += '    </div>\n\n'

for i, (fname, label, escaped) in enumerate(sections, 1):
    anchor = fname.replace('.html', '')
    page += f'''    <div class="mockup-section" id="{anchor}">
        <div class="section-label">
            <span class="num">{i}</span> {label}
            <span class="file">{fname}</span>
        </div>
        <iframe class="mockup-frame" srcdoc="{escaped}"></iframe>
    </div>

'''

page += '''</body>
</html>
'''

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(page)

print(f'OK — {len(sections)} mockup digabungkan ke {OUTPUT}')
