import os
import re
import subprocess

MOCKUP_DIR = r"d:\justificadll\Mockups"

def log(msg):
    # Ensure ASCII safe printing for Windows cp1252
    try:
        print(f"[REVISI PSIKOLOGI] {msg}")
    except Exception:
        print(f"[REVISI PSIKOLOGI] {msg.encode('ascii', 'ignore').decode('ascii')}")

# 1. BUAT MOCKUP DASBOR PSIKOLOGI (HUB)
log("1. Membuat mockup_dasbor_psikologi.html (Hub Utama Qualifa)...")
hub_html = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Portal Utama & Pilihan Role Dasbor Psikologi (100% Siloed App)</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <style>
        :root {
            --bg-base: #020617;
            --glass-bg: rgba(17, 24, 39, 0.7);
            --glass-border: rgba(168, 85, 247, 0.25);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --primary: #a855f7;
            --primary-glow: rgba(168, 85, 247, 0.4);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
        body {
            background-color: var(--bg-base);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 3rem 1.5rem;
            background: radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.15), transparent 60%), #020617;
        }
        .header { text-align: center; margin-bottom: 3rem; max-width: 800px; }
        .badge-silo { background: rgba(168,85,247,0.15); color: #c084fc; font-size: 0.8rem; padding: 6px 14px; border-radius: 20px; font-weight: 700; border: 1px solid rgba(168,85,247,0.4); display: inline-block; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px; }
        .header h1 { font-size: 2.8rem; font-weight: 800; color: #fff; margin-bottom: 0.8rem; background: linear-gradient(135deg, #fff, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .header p { color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; }
        
        .role-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1100px; width: 100%; margin-bottom: 3rem; }
        @media (max-width: 900px) { .role-grid { grid-template-columns: 1fr; } }
        
        .role-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(16px);
            position: relative;
            overflow: hidden;
            text-decoration: none;
            color: #fff;
        }
        .role-card:hover {
            transform: translateY(-8px);
            border-color: #c084fc;
            box-shadow: 0 20px 40px rgba(168, 85, 247, 0.25);
            background: rgba(30, 41, 59, 0.85);
        }
        .icon-box { width: 80px; height: 80px; border-radius: 20px; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 1.5rem; color: #c084fc; transition: all 0.3s; }
        .role-card:hover .icon-box { transform: scale(1.1); background: #a855f7; color: #fff; }
        
        .role-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.8rem; }
        .role-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 2rem; flex: 1; }
        
        .btn-enter { width: 100%; padding: 0.9rem; border-radius: 12px; background: linear-gradient(135deg, #a855f7, #7e22ce); color: #fff; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3); }
        .role-card:hover .btn-enter { background: linear-gradient(135deg, #c084fc, #9333ea); box-shadow: 0 6px 20px rgba(168, 85, 247, 0.5); }
        
        .quick-nav { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; width: 100%; max-width: 800px; }
        .quick-link { color: #cbd5e1; text-decoration: none; font-size: 0.95rem; font-weight: 600; padding: 10px 20px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .quick-link:hover { background: rgba(168,85,247,0.15); border-color: #c084fc; color: #c084fc; }
    </style>
</head>
<body>
    <div class="header">
        <span class="badge-silo">🛡️ Domain Standalone & Siloed Psychology 100%</span>
        <h1>Qualifa Psychology Hub</h1>
        <p>Pusat kendali ekosistem kesehatan mental mandiri. Terisolasi penuh di level arsitektur dan database tanpa percampuran dengan domain hukum atau aplikasi lain.</p>
    </div>

    <div class="role-grid">
        <!-- 1. Klien / Pasien -->
        <a href="mockup_dashboard_psikologi_klien.html" class="role-card">
            <div class="icon-box">🌱</div>
            <div class="role-title">Dasbor Klien & Pasien</div>
            <div class="role-desc">Pantau jurnal emosi harian, jalani asesmen DASS-21, dengarkan audio relaksasi CDN, dan jadwalkan sesi konseling E2EE.</div>
            <button class="btn-enter">Masuk sebagai Klien ➔</button>
        </a>

        <!-- 2. Mitra / Psikolog -->
        <a href="mockup_dashboard_mitra_psikologi.html" class="role-card">
            <div class="icon-box">🧠</div>
            <div class="role-title">Workstation Mitra Psikolog</div>
            <div class="role-desc">Stasiun kerja profesional SIPP terverifikasi. Kelola antrean konseling WebRTC, analisis risiko DASS-21, dan tulis DAP Note terenkripsi.</div>
            <button class="btn-enter">Masuk sebagai Mitra ➔</button>
        </a>

        <!-- 3. Admin HIMPSI -->
        <a href="mockup_admin_qualifa.html" class="role-card">
            <div class="icon-box">🛡️</div>
            <div class="role-title">Portal Admin HIMPSI</div>
            <div class="role-desc">Pengawasan kepatuhan etika HIMPSI, audit waktu tanggap hotline krisis 119 (< 10 detik), dan manajemen verifikasi SIPP IPK.</div>
            <button class="btn-enter">Masuk sebagai Admin ➔</button>
        </a>
    </div>

    <div class="quick-nav">
        <a href="mockup_katalog_qualifa.html" class="quick-link">🔍 Katalog Psikolog HIMPSI</a>
        <a href="mockup_chat_qualifa.html" class="quick-link">💬 Ruang Konseling E2EE</a>
        <a href="mockup_modul_psikologi_klien.html" class="quick-link">📝 Modul Asesmen Klien</a>
        <a href="mockup_modul_psikologi_mitra.html" class="quick-link">🩺 Workstation Klinis Mitra</a>
        <a href="mockup_auth.html" class="quick-link">🔑 Portal Autentikasi</a>
    </div>
</body>
</html>"""

with open(os.path.join(MOCKUP_DIR, "mockup_dasbor_psikologi.html"), "w", encoding="utf-8") as f:
    f.write(hub_html)


# 2. BENERIN MOCKUP_AUTH (Hapus LifeQ, Fix Tombol Daftar/Masuk)
log("2. Memperbaiki mockup_auth.html...")
auth_path = os.path.join(MOCKUP_DIR, "mockup_auth.html")
if os.path.exists(auth_path):
    with open(auth_path, "r", encoding="utf-8") as f:
        auth_content = f.read()
    
    # Ganti Judul dan Branding LifeQ
    auth_content = re.sub(r"<title>.*?<\/title>", "<title>Qualifa & Justifiqa — Portal Autentikasi Standalone</title>", auth_content)
    auth_content = re.sub(r"LifeQ\s*-\s*Portal\s*Autentikasi", "Qualifa / Justifiqa — Siloed Auth Portal", auth_content, flags=re.IGNORECASE)
    auth_content = re.sub(r"LifeQ\s*Tele-Consultation", "Qualifa & Justifiqa Siloed Ecosystem", auth_content, flags=re.IGNORECASE)
    auth_content = re.sub(r">\s*LifeQ\s*<", ">Qualifa / Justifiqa<", auth_content)
    auth_content = re.sub(r"LifeQ\s*SuperApp", "Qualifa & Justifiqa", auth_content, flags=re.IGNORECASE)
    auth_content = re.sub(r"LifeQ", "Qualifa / Justifiqa", auth_content)
    
    # Sembunyikan OTP modal by default
    auth_content = re.sub(
        r'(<div id="otpModal" class="modal-overlay" style="display:\s*)flex(;.*?>)',
        r'\1none\2',
        auth_content
    )
    
    # Fix Script di dalam mockup_auth.html untuk notif terdaftar & redirect yang benar
    old_script_pattern = r"<script>[\s\S]*?<\/script>"
    new_script = """<script>
        let isMitra = false;
        let isRegister = false;

        function switchTab(type) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(t => t.classList.remove('active'));
            
            const btn = document.getElementById('btnSubmit');
            const title = document.getElementById('formTitle');
            
            if(type === 'client') {
                tabs[0].classList.add('active');
                isMitra = false;
                btn.style.background = 'var(--primary)';
                btn.style.boxShadow = '0 10px 20px rgba(14, 165, 233, 0.2)';
            } else {
                tabs[1].classList.add('active');
                isMitra = true;
                btn.style.background = 'var(--mitra-color)';
                btn.style.boxShadow = '0 10px 20px rgba(217, 119, 6, 0.2)';
            }
            updateUI();
        }

        document.getElementById('toggleMode').addEventListener('click', (e) => {
            e.preventDefault();
            isRegister = !isRegister;
            updateUI();
        });

        function updateUI() {
            const title = document.getElementById('formTitle');
            const btn = document.getElementById('btnSubmit');
            const toggle = document.getElementById('toggleMode');
            const upload = document.getElementById('mitraUpload');
            const uploadIjazah = document.getElementById('mitraUploadIjazah');

            if(isRegister) {
                title.innerText = isMitra ? 'Registrasi Mitra Profesional' : 'Buat Akun Klien';
                btn.innerText = 'Daftar Sekarang';
                toggle.innerText = 'Masuk ke akun yang ada';
                if(upload) upload.style.display = isMitra ? 'block' : 'none';
                if(uploadIjazah) uploadIjazah.style.display = isMitra ? 'block' : 'none';
            } else {
                title.innerText = 'Selamat Datang Kembali';
                btn.innerText = 'Masuk ke Dasbor';
                toggle.innerText = 'Daftar sekarang';
                if(upload) upload.style.display = 'none';
                if(uploadIjazah) uploadIjazah.style.display = 'none';
            }
        }

        // [LOGIKA SUBMIT TOMBOL SESUAI ATURAN REVISI]
        document.getElementById('btnSubmit').addEventListener('click', function() {
            if (isRegister) {
                alert("⚠️ PEMBERITAHUAN SISTEM:\\nAkun dengan email / nomor identitas ini sudah terdaftar di sistem! Silakan pilih opsi 'Masuk ke akun yang ada' untuk login.");
            } else {
                // Login Mode: kalau di kolom mitra masuk ke dasbor mitra, kalau klien ke dasbor klien
                if (isMitra) {
                    window.location.href = 'mockup_dashboard_mitra_psikologi.html';
                } else {
                    window.location.href = 'mockup_dashboard_psikologi_klien.html';
                }
            }
        });
    </script>"""
    
    auth_content = re.sub(old_script_pattern, new_script, auth_content, count=1)
    
    # Fix tombol di dalam OTP Modal agar redirect ke dasbor yang benar
    auth_content = re.sub(
        r'onclick="document\.getElementById\(\'otpModal\'\)\.style\.display=\'none\'"',
        r'onclick="window.location.href = isMitra ? \'mockup_dashboard_mitra_psikologi.html\' : \'mockup_dashboard_psikologi_klien.html\';"',
        auth_content
    )

    with open(auth_path, "w", encoding="utf-8") as f:
        f.write(auth_content)


# 3. BENERIN MOCKUP_DASHBOARD_PSIKOLOGI_KLIEN
log("3. Memperbaiki mockup_dashboard_psikologi_klien.html...")
psikolog_klien_path = os.path.join(MOCKUP_DIR, "mockup_dashboard_psikologi_klien.html")
if os.path.exists(psikolog_klien_path):
    with open(psikolog_klien_path, "r", encoding="utf-8") as f:
        pk_content = f.read()
    
    # Hapus link ke mockup_dashboard_klien.html
    pk_content = pk_content.replace('href="mockup_dashboard_klien.html"', 'href="mockup_dasbor_psikologi.html"')
    pk_content = pk_content.replace('href="mockup_modul_psikologi.html"', 'href="mockup_modul_psikologi_klien.html"')
    pk_content = re.sub(r"LifeQ|SuperApp", "Qualifa", pk_content, flags=re.IGNORECASE)
    
    # Pastikan di menu sidebar ada link ke Hub Utama dan Versi Klien
    old_nav = r'<ul class="nav-menu">[\s\S]*?<\/ul>'
    new_nav = """<ul class="nav-menu">
            <li class="nav-item"><a href="mockup_dasbor_psikologi.html">🏠 Portal Utama Qualifa (Hub)</a></li>
            <li class="nav-item"><a href="mockup_dashboard_psikologi_klien.html" class="active">🌱 Dasbor Psikologi Pasien</a></li>
            <li class="nav-item"><a href="mockup_modul_psikologi_klien.html">📝 Modul Asesmen & Mood Tracker</a></li>
            <li class="nav-item"><a href="mockup_katalog_qualifa.html">🔍 Cari Psikolog & Konselor</a></li>
            <li class="nav-item"><a href="mockup_chat_qualifa.html">💬 Ruang Konseling E2EE</a></li>
        </ul>"""
    pk_content = re.sub(old_nav, new_nav, pk_content, count=1)
    
    with open(psikolog_klien_path, "w", encoding="utf-8") as f:
        f.write(pk_content)


# 4. BENERIN MOCKUP_DASHBOARD_MITRA_PSIKOLOGI
log("4. Memperbaiki mockup_dashboard_mitra_psikologi.html...")
mitra_psi_path = os.path.join(MOCKUP_DIR, "mockup_dashboard_mitra_psikologi.html")
if os.path.exists(mitra_psi_path):
    with open(mitra_psi_path, "r", encoding="utf-8") as f:
        mp_content = f.read()
    
    # Ganti Judul dan hapus LifeQ/SuperApp
    mp_content = re.sub(r"<title>.*?<\/title>", "<title>Qualifa — Workstation Mitra Psikolog Klinis HIMPSI</title>", mp_content)
    mp_content = re.sub(r"LIFEQ\s*<span.*?MITRA<\/span>", 'QUALIFA <span style="color: #c084fc; font-size: 0.75rem; background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid #c084fc;">MITRA</span>', mp_content)
    mp_content = re.sub(r"Portal\s*Mitra\s*SuperApp\s*LifeQ", "Portal Mitra Standalone Qualifa", mp_content, flags=re.IGNORECASE)
    mp_content = re.sub(r"LifeQ", "Qualifa", mp_content, flags=re.IGNORECASE)
    
    # Pastikan link mengarah ke versi mitra
    mp_content = mp_content.replace('href="mockup_modul_psikologi.html"', 'href="mockup_modul_psikologi_mitra.html"')
    mp_content = mp_content.replace('href="mockup_dashboard_mitra.html"', 'href="mockup_dasbor_psikologi.html"')
    
    # Update sidebar menu
    old_nav_mp = r'<ul class="nav-menu">[\s\S]*?<\/ul>'
    new_nav_mp = """<ul class="nav-menu">
            <li class="nav-item"><a href="mockup_dasbor_psikologi.html">🏠 Portal Utama Qualifa (Hub)</a></li>
            <li class="nav-item"><a href="mockup_dashboard_mitra_psikologi.html" class="active">📊 Dasbor Utama Mitra</a></li>
            <li class="nav-item"><a href="mockup_modul_psikologi_mitra.html" style="color: #c084fc; font-weight: 600;">🩺 Buka Workstation Klinis DAP Note</a></li>
            <li class="nav-item"><a href="mockup_chat_qualifa.html">💬 Ruang Terapi WebRTC</a></li>
            <li class="nav-item"><a href="mockup_admin_qualifa.html">🛡️ Portal Kepatuhan HIMPSI</a></li>
        </ul>"""
    mp_content = re.sub(old_nav_mp, new_nav_mp, mp_content, count=1)
    
    with open(mitra_psi_path, "w", encoding="utf-8") as f:
        f.write(mp_content)


# 5. BENERIN MOCKUP_KATALOG_QUALIFA (Tambah Filter Interaktif & Fix Link)
log("5. Memperbaiki mockup_katalog_qualifa.html...")
katalog_path = os.path.join(MOCKUP_DIR, "mockup_katalog_qualifa.html")
if os.path.exists(katalog_path):
    with open(katalog_path, "r", encoding="utf-8") as f:
        kat_content = f.read()
    
    kat_content = kat_content.replace('href="mockup_dashboard_psikologi_klien.html"', 'href="mockup_dasbor_psikologi.html"')
    
    # Inject JS interaktif untuk pencarian & filter jika belum ada
    if "function filterCards()" not in kat_content:
        js_filter = """
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('.search-input');
            const selectFilters = document.querySelectorAll('.select-filter');
            const pills = document.querySelectorAll('.pill');
            const cards = document.querySelectorAll('.doc-card');

            function filterCards() {
                const query = searchInput.value.toLowerCase();
                const priceFilter = selectFilters[0].value;
                const activePill = document.querySelector('.pill.active').innerText.toLowerCase();

                cards.forEach(card => {
                    const text = card.innerText.toLowerCase();
                    let matchQuery = text.includes(query);
                    
                    let matchPrice = true;
                    if (priceFilter === 'subsidi') matchPrice = text.includes('subsidi') || text.includes('pro bono') || text.includes('rp 0');
                    else if (priceFilter === 'low') matchPrice = text.includes('180.000') || text.includes('150.000');
                    else if (priceFilter === 'mid') matchPrice = text.includes('200.000') || text.includes('250.000');

                    let matchPill = true;
                    if (!activePill.includes('semua')) {
                        if (activePill.includes('kecemasan')) matchPill = text.includes('kecemasan') || text.includes('stres') || text.includes('trauma');
                        else if (activePill.includes('depresi')) matchPill = text.includes('depresi') || text.includes('mood');
                        else if (activePill.includes('anak')) matchPill = text.includes('anak') || text.includes('remaja') || text.includes('keluarga');
                        else if (activePill.includes('trauma')) matchPill = text.includes('trauma') || text.includes('ptsd');
                        else if (activePill.includes('pernikahan')) matchPill = text.includes('pernikahan') || text.includes('keluarga');
                    }

                    if (matchQuery && matchPrice && matchPill) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            if(searchInput) searchInput.addEventListener('input', filterCards);
            selectFilters.forEach(sel => sel.addEventListener('change', filterCards));
            
            pills.forEach(pill => {
                pill.addEventListener('click', function() {
                    pills.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    filterCards();
                });
            });
        });
    </script>
</body>"""
        kat_content = kat_content.replace("</body>", js_filter)
    
    with open(katalog_path, "w", encoding="utf-8") as f:
        f.write(kat_content)


# 6. BENERIN MOCKUP_MODUL_PSIKOLOGI (2 VERSI: VERSI KLIEN DAN VERSI MITRA)
log("6. Membuat mockup_modul_psikologi_klien.html dan mockup_modul_psikologi_mitra.html...")

# 6A. VERSI KLIEN (PASIEN) - Mood Tracker, DASS-21 Mandatory Crisis Protocol, Audio Grounding CDN, CCBT Worksheet. ZERO DAP NOTE!
html_modul_klien = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Modul Asesmen DASS-21 & Jurnal Emosi (VERSI KLIEN)</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
        body { background: #080c14; color: #f8fafc; min-height: 100vh; display: flex; }
        
        .sidebar { width: 270px; background: #0d1322; border-right: 1px solid rgba(255,255,255,0.08); padding: 1.8rem 1.2rem; display: flex; flex-direction: column; gap: 1.5rem; flex-shrink: 0; }
        .brand { font-size: 1.4rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .brand span { color: #c084fc; font-size: 0.7rem; background: rgba(168,85,247,0.15); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(168,85,247,0.4); font-weight: 700; }
        .nav-menu { display: flex; flex-direction: column; gap: 0.4rem; list-style: none; }
        .nav-item a { display: flex; align-items: center; gap: 12px; padding: 0.85rem 1rem; color: #94a3b8; text-decoration: none; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .nav-item a:hover, .nav-item a.active { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }
        
        .main { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; max-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .topbar h1 { font-size: 1.8rem; font-weight: 700; color: #fff; }
        .topbar p { color: #64748b; font-size: 0.95rem; margin-top: 4px; }
        
        .card { background: rgba(17,24,39,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.8rem; backdrop-filter: blur(12px); margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .card-title { font-size: 1.25rem; font-weight: 600; color: #fff; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: space-between; }
        
        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
        .badge-purple { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }
        .badge-success { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .badge-danger { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
        
        .btn { padding: 0.7rem 1.4rem; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .btn-purple { background: linear-gradient(135deg, #a855f7, #7e22ce); color: #fff; box-shadow: 0 4px 12px rgba(168,85,247,0.3); }
        .btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; }
        .btn-success { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        
        .mood-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .mood-btn { padding: 15px; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer; font-weight: 600; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all 0.2s; }
        .mood-btn:hover, .mood-btn.active { background: rgba(168,85,247,0.25); border-color: #a855f7; color: #c084fc; transform: scale(1.05); }
        .mood-btn span { font-size: 2rem; }

        .dass-q { background: rgba(0,0,0,0.3); border-left: 4px solid #a855f7; padding: 1.2rem; border-radius: 0 12px 12px 0; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .dass-opts { display: flex; gap: 8px; }
        .dass-opt { padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
        .dass-opt.active { background: #a855f7; color: #fff; border-color: #c084fc; }

        .modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
    </style>
</head>
<body>
    <div class="sidebar">
        <a href="mockup_dasbor_psikologi.html" class="brand">Qualifa <span>KLIEN</span></a>
        <ul class="nav-menu">
            <li class="nav-item"><a href="mockup_dasbor_psikologi.html">🏠 Portal Utama Qualifa (Hub)</a></li>
            <li class="nav-item"><a href="mockup_dashboard_psikologi_klien.html">🌱 Dasbor Psikologi Pasien</a></li>
            <li class="nav-item"><a href="mockup_modul_psikologi_klien.html" class="active">📝 Modul Asesmen & Mood Tracker</a></li>
            <li class="nav-item"><a href="mockup_katalog_qualifa.html">🔍 Cari Psikolog & Konselor</a></li>
            <li class="nav-item"><a href="mockup_chat_qualifa.html">💬 Ruang Konseling E2EE</a></li>
        </ul>
        <div style="margin-top: auto; padding: 1rem; background: rgba(239,68,68,0.15); border-radius: 12px; border: 1px solid rgba(239,68,68,0.3); text-align: center;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #f87171;">🚨 Crisis Button 119</div>
            <div style="font-size: 0.75rem; color: #cbd5e1; margin-top: 4px; margin-bottom: 10px;">Bantuan darurat pencegahan bunuh diri & krisis mental 24/7.</div>
            <button class="btn btn-danger" style="width: 100%; justify-content: center; font-size: 0.8rem; padding: 6px;" onclick="triggerCrisisModal()">PANGGIL BANTUAN</button>
        </div>
    </div>

    <div class="main">
        <div class="topbar">
            <div>
                <h1>Modul Asesmen Mandiri & Jurnal Emosi (Versi Klien)</h1>
                <p>Khusus pasien / klien untuk mencatat perkembangan suasana hati harian dan evaluasi stres berkala.</p>
            </div>
            <span class="badge badge-purple" style="font-size: 0.9rem; padding: 8px 16px;">🛡️ Client Privacy Protected (No DAP Note Access)</span>
        </div>

        <!-- 1. JURNAL MOOD TRACKER HARIAN -->
        <div class="card" style="border-color: #a855f7;">
            <div class="card-title">
                <span>🌱 Catat Suasana Hati Harian Anda (Mood Tracker)</span>
                <span class="badge badge-success">Sinkronisasi Realtime</span>
            </div>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem;">Pilih ikon emosi yang paling mewakili perasaan Anda hari ini. Data ini akan membantu psikolog menganalisis pola mood Anda sebelum sesi konseling dimulai.</p>
            
            <div class="mood-grid">
                <button class="mood-btn" onclick="selectMood(this, 'Sangat Senang 🌟')"><span>😄</span>Sangat Senang</button>
                <button class="mood-btn active" onclick="selectMood(this, 'Tenang & Stabil 🍃')"><span>🙂</span>Tenang</button>
                <button class="mood-btn" onclick="selectMood(this, 'Sedang Sedih 😢')"><span>🥲</span>Sedang Sedih</button>
                <button class="mood-btn" onclick="selectMood(this, 'Cemas / Gelisah ⚡')"><span>😰</span>Cemas Gelisah</button>
                <button class="mood-btn" style="border-color: rgba(239,68,68,0.4);" onclick="selectMood(this, 'Stres Berat / Krisis 🚨')"><span>😭</span>Stres Berat</button>
            </div>

            <div style="margin-top: 1.5rem;">
                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 8px;">Catatan Tambahan (Opsional — Jurnal Pribadi):</label>
                <textarea style="width: 100%; background: #080c14; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #fff; padding: 12px; font-size: 0.9rem; height: 80px;" placeholder="Ceritakan sedikit apa yang membuat Anda merasa demikian hari ini..."></textarea>
            </div>
            <button class="btn btn-purple" style="margin-top: 1rem;" onclick="alert('✔ Jurnal mood harian Anda berhasil disimpan dan dienkripsi!')">💾 Simpan Jurnal Emosi Hari Ini</button>
        </div>

        <!-- 2. ASESMEN DASS-21 MANDATORY CRISIS PROTOCOL -->
        <div class="card">
            <div class="card-title">
                <span>📋 Asesmen Skala DASS-21 (Depressi, Anxiety, Stress Scale)</span>
                <span class="badge badge-purple">Mandatory 2 Weeks Review</span>
            </div>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem;">Jawab pertanyaan berikut sesuai kondisi yang Anda alami selama 7 hari terakhir. Nilai 0 = Tidak pernah, 3 = Sangat sering.</p>

            <div class="dass-q">
                <div><strong>1. Saya merasa sulit untuk menenangkan diri / santai.</strong></div>
                <div class="dass-opts"><div class="dass-opt">0</div><div class="dass-opt">1</div><div class="dass-opt active">2</div><div class="dass-opt">3</div></div>
            </div>
            <div class="dass-q">
                <div><strong>2. Saya menyadari mulut saya terasa kering dan detak jantung meningkat tanpa sebab fisik.</strong></div>
                <div class="dass-opts"><div class="dass-opt">0</div><div class="dass-opt">1</div><div class="dass-opt">2</div><div class="dass-opt active">3</div></div>
            </div>
            <div class="dass-q">
                <div><strong>3. Saya merasa tidak ada hal positif yang dapat saya harapkan di masa depan.</strong></div>
                <div class="dass-opts"><div class="dass-opt">0</div><div class="dass-opt">1</div><div class="dass-opt active">2</div><div class="dass-opt">3</div></div>
            </div>
            <div class="dass-q">
                <div><strong>4. Saya merasa sangat cemas, gelisah, dan mudah putus asa terhadap tekanan hidup.</strong></div>
                <div class="dass-opts"><div class="dass-opt">0</div><div class="dass-opt">1</div><div class="dass-opt">2</div><div class="dass-opt active">3</div></div>
            </div>

            <div style="display: flex; gap: 15px; margin-top: 1.5rem;">
                <button class="btn btn-purple" style="flex: 1; justify-content: center; padding: 1rem; font-size: 1rem;" onclick="alert('✔ Skor DASS-21 Anda: Depresi (14 - Moderate), Kecemasan (22 - Severe), Stres (18 - Moderate). Hasil telah dikirim ke Psikolog Nadia Safitri.')">
                📊 Hitung & Simpan Skor Asesmen DASS-21
                </button>
                <button class="btn btn-danger" style="justify-content: center; padding: 1rem;" onclick="triggerCrisisModal()">
                🚨 Simulasi Skor Krisis Severe (Trigger 119)
                </button>
            </div>
        </div>

        <!-- 3. AUDIO RELAKSASI CDN & WORKSHEET CCBT -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div class="card" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(15,23,42,0.9)); border-color: rgba(16,185,129,0.3); margin-bottom: 0;">
                <div class="card-title" style="color: #34d399;">
                    <span>🎧 Audio Relaksasi & Grounding</span>
                    <span class="badge badge-success">CDN 320kbps</span>
                </div>
                <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.2rem;">Trek mindfulness adaptif untuk menurunkan detak jantung dan kecemasan secara seketika tanpa log PII.</p>
                <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button style="width: 40px; height: 40px; border-radius: 50%; background: #10b981; color: #fff; border: none; font-size: 1.2rem; cursor: pointer;">▶</button>
                        <div>
                            <div style="font-weight: 600; font-size: 0.95rem; color: #fff;">Grounding 5-4-3-2-1 (CBT Breath)</div>
                            <div style="font-size: 0.75rem; color: #34d399;">Durasi: 05:00 • Stream HLS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" style="margin-bottom: 0;">
                <div class="card-title">
                    <span>📑 Worksheet CCBT Mandiri</span>
                    <span class="badge badge-purple">PDF Interaktif</span>
                </div>
                <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.2rem;">Latihan restrukturisasi kognitif yang diberikan oleh Psikolog Nadia Safitri pada sesi sebelumnya.</p>
                <a href="mockup_chat_qualifa.html" class="btn btn-purple" style="width: 100%; justify-content: center;">✍️ Buka & Isi Lembar Kerja CBT</a>
            </div>
        </div>

    </div>

    <!-- MODAL DARURAT KRISIS 119 -->
    <div id="crisisModal" class="modal">
        <div style="background: #0f172a; border: 3px solid #f87171; border-radius: 20px; width: 600px; text-align: center; padding: 2.5rem; box-shadow: 0 0 50px rgba(239,68,68,0.5);">
            <div style="font-size: 3.5rem; margin-bottom: 10px;">🚨</div>
            <h2 style="color: #ef4444; font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem;">PROTOKOL DARURAT KRISIS MENTAL (119 EXT 8)</h2>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">Sistem mendeteksi indikasi krisis psikologis berat / kecemasan akut. Protokol keselamatan pasien aktif dan menghubungkan Anda langsung ke tim darurat psikiatri 24/7.</p>
            <div style="background: rgba(239,68,68,0.2); padding: 15px; border-radius: 12px; color: #fca5a5; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Roboto Mono', monospace;">
                ⏱️ KUNCING DARURAT AKTIF: <span id="timerText">10</span> DETIK
            </div>
            <button class="btn btn-danger" style="width: 100%; justify-content: center; padding: 1rem; font-size: 1rem;" onclick="alert('🚨 Menghubungkan ke Hotline Kesehatan Jiwa Kemenkes 119 Ext 8 & Satgas HIMPSI Terdekat via GPS...')">PANGGIL BANTUAN DARURAT SEKARANG</button>
            <button style="background: transparent; border: none; color: #94a3b8; margin-top: 15px; cursor: pointer; font-size: 0.85rem;" onclick="closeCrisisModal()">[Tutup Simulasi Krisis]</button>
        </div>
    </div>

    <script>
        function selectMood(btn, moodName) {
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            alert('Suasana hati dipilih: ' + moodName);
        }
        function triggerCrisisModal() {
            document.getElementById('crisisModal').style.display = 'flex';
            let sec = 10;
            let interval = setInterval(() => {
                sec--;
                const el = document.getElementById('timerText');
                if(el) el.innerText = sec;
                if(sec <= 0) clearInterval(interval);
            }, 1000);
        }
        function closeCrisisModal() {
            document.getElementById('crisisModal').style.display = 'none';
        }
    </script>
</body>
</html>"""

with open(os.path.join(MOCKUP_DIR, "mockup_modul_psikologi_klien.html"), "w", encoding="utf-8") as f:
    f.write(html_modul_klien)


# 6B. VERSI MITRA (PSIKOLOG/KONSELOR) - DAP Note WORM Locked, Client Risk Assessment, Session Notes. ZERO CLIENT MOOD TRACKER INPUT!
html_modul_mitra = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Workstation Klinis & Rekam Medis DAP Note (VERSI MITRA)</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
        body { background: #080c14; color: #f8fafc; min-height: 100vh; display: flex; }
        
        .sidebar { width: 270px; background: #0d1322; border-right: 1px solid rgba(255,255,255,0.08); padding: 1.8rem 1.2rem; display: flex; flex-direction: column; gap: 1.5rem; flex-shrink: 0; }
        .brand { font-size: 1.4rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .brand span { color: #c084fc; font-size: 0.7rem; background: rgba(168,85,247,0.15); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(168,85,247,0.4); font-weight: 700; }
        .nav-menu { display: flex; flex-direction: column; gap: 0.4rem; list-style: none; }
        .nav-item a { display: flex; align-items: center; gap: 12px; padding: 0.85rem 1rem; color: #94a3b8; text-decoration: none; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .nav-item a:hover, .nav-item a.active { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }
        
        .main { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; max-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .topbar h1 { font-size: 1.8rem; font-weight: 700; color: #fff; }
        .topbar p { color: #64748b; font-size: 0.95rem; margin-top: 4px; }
        
        .card { background: rgba(17,24,39,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.8rem; backdrop-filter: blur(12px); margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .card-title { font-size: 1.25rem; font-weight: 600; color: #fff; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: space-between; }
        
        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
        .badge-purple { background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }
        .badge-success { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .badge-danger { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
        
        .btn { padding: 0.7rem 1.4rem; border-radius: 10px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .btn-purple { background: linear-gradient(135deg, #a855f7, #7e22ce); color: #fff; box-shadow: 0 4px 12px rgba(168,85,247,0.3); }
        .btn-success { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        .btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; }
        
        .input-group { margin-bottom: 1.2rem; }
        .input-group label { display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px; font-weight: 600; }
        .input-control { width: 100%; background: #080c14; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; padding: 12px; font-size: 0.9rem; transition: border 0.2s; }
        .input-control:focus { border-color: #a855f7; outline: none; }
    </style>
</head>
<body>
    <div class="sidebar">
        <a href="mockup_dasbor_psikologi.html" class="brand">Qualifa <span>MITRA</span></a>
        <ul class="nav-menu">
            <li class="nav-item"><a href="mockup_dasbor_psikologi.html">🏠 Portal Utama Qualifa (Hub)</a></li>
            <li class="nav-item"><a href="mockup_dashboard_mitra_psikologi.html">📊 Dasbor Utama Mitra</a></li>
            <li class="nav-item"><a href="mockup_modul_psikologi_mitra.html" class="active">🩺 Workstation Klinis & DAP Note</a></li>
            <li class="nav-item"><a href="mockup_chat_qualifa.html">💬 Ruang Terapi WebRTC</a></li>
            <li class="nav-item"><a href="mockup_admin_qualifa.html">🛡️ Portal Kepatuhan HIMPSI</a></li>
        </ul>
        <div style="margin-top: auto; padding: 1rem; background: rgba(168,85,247,0.15); border-radius: 12px; border: 1px solid rgba(168,85,247,0.3); text-align: center;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">🔐 SIPP IPK Terverifikasi</div>
            <div style="font-size: 0.75rem; color: #c084fc; margin-top: 4px;">Rina Wulandari, M.Psi., Psikolog<br>No: SIPP-0992-HIMPSI</div>
        </div>
    </div>

    <div class="main">
        <div class="topbar">
            <div>
                <h1>Workstation Klinis & Rekam Medis DAP Note (Versi Mitra)</h1>
                <p>Khusus psikolog klinis / konselor ber-SIPP HIMPSI untuk analisis skor pasien dan penulisan catatan sesi.</p>
            </div>
            <span class="badge badge-success" style="font-size: 0.9rem; padding: 8px 16px;">🔐 WORM Locked & Field-Level Encryption</span>
        </div>

        <!-- 1. ANALISIS SKOR DASS-21 & MOOD PASIEN TERBARU (READ-ONLY FOR MITRA) -->
        <div class="card" style="border-color: #c084fc;">
            <div class="card-title">
                <span>📋 Data Asesmen Pasien Aktif — Klien: Dewi Lestari (ID: SES-77301)</span>
                <span class="badge badge-danger">⚠️ DASS-21 Severe Risk Alert</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 1.5rem;">
                <div style="background: rgba(239,68,68,0.15); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(239,68,68,0.4);">
                    <div style="font-size: 0.8rem; color: #fca5a5; font-weight: 700;">DEPRESI (DASS-21)</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #f87171; margin-top: 4px;">14 (Moderate)</div>
                </div>
                <div style="background: rgba(168,85,247,0.2); padding: 1.2rem; border-radius: 12px; border: 1px solid #a855f7;">
                    <div style="font-size: 0.8rem; color: #e9d5ff; font-weight: 700;">KECEMASAN (ANXIETY)</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #c084fc; margin-top: 4px;">22 (Severe) ⚠️</div>
                </div>
                <div style="background: rgba(245,158,11,0.15); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(245,158,11,0.4);">
                    <div style="font-size: 0.8rem; color: #fef08a; font-weight: 700;">STRES KERJA</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-top: 4px;">18 (Moderate)</div>
                </div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.9rem; color: #cbd5e1;"><strong>Mood Tracker Harian Terakhir Pasien:</strong> "Cemas Gelisah ⚡" (Tercatat hari ini pukul 08:30 WIB)</span>
                <a href="mockup_chat_qualifa.html" class="btn btn-purple" style="padding: 6px 14px; font-size: 0.8rem;">💬 Buka Sesi Konseling</a>
            </div>
        </div>

        <!-- 2. REKAM MEDIS DAP NOTE (DATA, ASSESSMENT, PLAN) - ONLY FOR MITRA -->
        <div class="card" style="border-color: #10b981;">
            <div class="card-title">
                <span>📝 Rekam Medis Psikologi — DAP Note (Standar Rekam Medis Elektronik HIMPSI)</span>
                <span class="badge badge-success">AES-256 GCM Field Encryption</span>
            </div>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem;">Catatan ini bersifat rahasia medis klinis (Privileged Clinical Record). Klien tidak dapat melihat bagian Assessment klinis secara langsung sesuai UU Kesehatan.</p>

            <div class="input-group">
                <label>1. DATA (Observasi perilaku objektif, ucapan verbal klien, dan tanda vital psikologis):</label>
                <textarea class="input-control" style="height: 80px;">Klien tampak menangis secara episodik di awal sesi WebRTC, kontak mata minim, menyatakan merasa terbebani oleh tekanan pekerjaan berat dan mengalami insomnia selama 4 hari beruntun.</textarea>
            </div>

            <div class="input-group">
                <label>2. ASSESSMENT (Analisis klinis, diagnosis sementara, dan tingkat risiko psikologis):</label>
                <select class="input-control" style="border-color: #ef4444; color: #f87171; font-weight: 700; margin-bottom: 8px;">
                    <option>⚠️ RISIKO TINGGI (HIGH RISK) — Indikasi kecemasan akut & burnout berat</option>
                    <option>RISIKO SEDANG (MODERATE RISK) — Stres situasional akibat beban kerja</option>
                    <option>RISIKO RENDAH (LOW RISK) — Kondisi emosional terkendali</option>
                </select>
                <textarea class="input-control" style="height: 70px;">Klien mengalami Generalized Anxiety Symptoms yang diperparah oleh stres kerja kronis. Tidak ditemukan ideasi bunuh diri aktif saat ini.</textarea>
            </div>

            <div class="input-group">
                <label>3. PLAN (Intervensi terapi, psikoedukasi, dan rencana tindak lanjut sesi berikutnya):</label>
                <textarea class="input-control" style="height: 80px;">1. Melakukan teknik pernapasan grounding 5-4-3-2-1 selama sesi.
2. Penjadwalan konseling lanjutan H+3 untuk evaluasi efektivitas terapi.
3. Pemberian tugas mandiri mendengarkan Audio Relaksasi CDN sebelum tidur.</textarea>
            </div>

            <div style="display: flex; gap: 15px; margin-top: 1.5rem;">
                <button class="btn btn-success" style="flex: 2; justify-content: center; padding: 1rem; font-size: 1rem;" onclick="alert('✔ Catatan DAP Note berhasil dienkripsi AES-256 dan dikunci WORM (Write-Once-Read-Many)! Tidak dapat diubah tanpa audit HIMPSI.')">
                💾 Simpan & Kunci DAP Note (WORM Locked)
                </button>
                <button class="btn btn-danger" style="flex: 1; justify-content: center; padding: 1rem;" onclick="alert('🚨 Mengirim notifikasi eskalasi krisis ke Satgas Etik HIMPSI & Hotline 119...')">
                🚨 Eskalasi Krisis 119
                </button>
            </div>
        </div>

        <!-- 3. HISTORI SESI & CATATAN TERDAHULU -->
        <div class="card" style="margin-bottom: 0;">
            <div class="card-title">
                <span>📚 Histori Catatan DAP Klien (Dewi Lestari)</span>
                <span class="badge badge-purple">3 Catatan Tersimpan</span>
            </div>
            <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1rem 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 700; color: #fff;">Sesi #1: Asesmen Awal & Keluhan Insomnia</div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">26 Juni 2026 • Psikolog Rina Wulandari, M.Psi. • Status: WORM Locked ✔</div>
                </div>
                <button class="btn btn-purple" style="padding: 6px 12px; font-size: 0.8rem;" onclick="alert('Membuka arsip DAP Note Sesi #1 (Decrypted in Memory)...')">👁️ Lihat Arsip</button>
            </div>
            <div style="padding: 1rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 700; color: #fff;">Sesi #2: Terapi Kognitif Perilaku (CBT) Sesi 1</div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">29 Juni 2026 • Psikolog Rina Wulandari, M.Psi. • Status: WORM Locked ✔</div>
                </div>
                <button class="btn btn-purple" style="padding: 6px 12px; font-size: 0.8rem;" onclick="alert('Membuka arsip DAP Note Sesi #2 (Decrypted in Memory)...')">👁️ Lihat Arsip</button>
            </div>
        </div>

    </div>
</body>
</html>"""

with open(os.path.join(MOCKUP_DIR, "mockup_modul_psikologi_mitra.html"), "w", encoding="utf-8") as f:
    f.write(html_modul_mitra)


# 6C. UPDATE MOCKUP_MODUL_PSIKOLOGI.HTML SEBAGAI HUB/SELEKTOR VERSI KLIEN & MITRA
log("6C. Update mockup_modul_psikologi.html sebagai Hub pemilih Versi Klien & Versi Mitra...")
html_modul_hub = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Modul Psikologi Standalone (Pilih Versi Workstation)</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
        body { background: #080c14; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.2), transparent 70%), #080c14; }
        .box { background: rgba(17,24,39,0.8); border: 1px solid rgba(168,85,247,0.3); border-radius: 20px; padding: 3rem; max-width: 800px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); backdrop-filter: blur(16px); }
        h1 { font-size: 2.2rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        p { color: #94a3b8; font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.6; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        @media(max-width: 700px) { .grid { grid-template-columns: 1fr; } }
        .card-sel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem 1.5rem; text-decoration: none; color: #fff; transition: all 0.3s; display: flex; flex-direction: column; justify-content: space-between; }
        .card-sel:hover { transform: translateY(-6px); border-color: #a855f7; background: rgba(168,85,247,0.15); box-shadow: 0 15px 30px rgba(168,85,247,0.2); }
        .icon { font-size: 3.5rem; margin-bottom: 1rem; }
        .title { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.8rem; color: #fff; }
        .desc { font-size: 0.9rem; color: #cbd5e1; margin-bottom: 1.5rem; line-height: 1.5; }
        .btn-go { padding: 0.8rem; border-radius: 10px; background: linear-gradient(135deg, #a855f7, #7e22ce); color: #fff; font-weight: 700; width: 100%; border: none; }
    </style>
</head>
<body>
    <div class="box">
        <span style="background: rgba(168,85,247,0.2); color: #c084fc; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 1rem;">🛡️ Domain Siloed Qualifa Psychology</span>
        <h1>Pilih Versi Workstation Modul Psikologi</h1>
        <p>Sistem antarmuka Qualifa memisahkan hak akses secara tegas. Silakan pilih workstation yang sesuai dengan peran (role) Anda saat ini:</p>
        
        <div class="grid">
            <!-- 1. Klien -->
            <a href="mockup_modul_psikologi_klien.html" class="card-sel">
                <div>
                    <div class="icon">🌱</div>
                    <div class="title">Versi Klien (Pasien)</div>
                    <div class="desc">Akses untuk mengisi jurnal emosi (Mood Tracker) harian, menjalani asesmen DASS-21, dan mendengarkan audio grounding relaksasi.</div>
                </div>
                <button class="btn-go">Buka Modul Klien ➔</button>
            </a>

            <!-- 2. Mitra -->
            <a href="mockup_modul_psikologi_mitra.html" class="card-sel">
                <div>
                    <div class="icon">🩺</div>
                    <div class="title">Versi Mitra (Psikolog)</div>
                    <div class="desc">Akses profesional SIPP untuk melihat analisis skor pasien, mengelola antrean terapi, dan menulis Rekam Medis DAP Note terenkripsi.</div>
                </div>
                <button class="btn-go">Buka Modul Mitra ➔</button>
            </a>
        </div>
        
        <div style="margin-top: 2.5rem;">
            <a href="mockup_dasbor_psikologi.html" style="color: #94a3b8; text-decoration: none; font-size: 0.9rem; font-weight: 600;">⬅ Kembali ke Portal Utama Qualifa Hub</a>
        </div>
    </div>
</body>
</html>"""

with open(os.path.join(MOCKUP_DIR, "mockup_modul_psikologi.html"), "w", encoding="utf-8") as f:
    f.write(html_modul_hub)


# 7. HAPUS FILE SUPERAPP LAMA & CLEANUP SISA KATA LIFEQ DI SELURUH MOCKUPS
log("7. Menghapus file SuperApp generik lama dan membersihkan sisa teks LifeQ di SELURUH FILE...")
for old_f in ["mockup_dashboard_klien.html", "mockup_dashboard_mitra.html"]:
    p = os.path.join(MOCKUP_DIR, old_f)
    if os.path.exists(p):
        os.remove(p)
        log(f"   [DELETED] {old_f}")

for fn in os.listdir(MOCKUP_DIR):
    if fn.endswith(".html"):
        fp = os.path.join(MOCKUP_DIR, fn)
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        
        orig = content
        if "mockup_admin" in fn or "payment" in fn or "auth" in fn or "wf_" in fn or "wireframe_" in fn:
            content = re.sub(r"LifeQ\s*SuperApp", "Qualifa & Justifiqa Standalone", content, flags=re.IGNORECASE)
            content = re.sub(r"LIFEQ\s*<span.*?SUPERAPP<\/span>", 'QUALIFA / JUSTIFIQA <span class="badge-admin">SILOED</span>', content)
            content = re.sub(r"LifeQ\s*-\s*Portal\s*Autentikasi", "Qualifa / Justifiqa — Siloed Auth Portal", content, flags=re.IGNORECASE)
            content = re.sub(r"LifeQ", "Qualifa / Justifiqa", content)
            content = re.sub(r"SuperApp\s*", "", content, flags=re.IGNORECASE)
        elif "hukum" in fn or "justifiqa" in fn:
            content = re.sub(r"BY\s*LIFEQ", "STANDALONE", content, flags=re.IGNORECASE)
            content = re.sub(r"LifeQ", "Justifiqa", content, flags=re.IGNORECASE)
            content = re.sub(r"SuperApp\s*", "", content, flags=re.IGNORECASE)
            content = content.replace('mockup_dashboard_klien.html', 'mockup_dashboard_hukum_klien.html')
            content = content.replace('mockup_dashboard_mitra.html', 'mockup_dashboard_mitra_hukum.html')
        elif "qualifa" in fn or "psikologi" in fn:
            content = re.sub(r"BY\s*LIFEQ", "STANDALONE", content, flags=re.IGNORECASE)
            content = re.sub(r"LifeQ", "Qualifa", content, flags=re.IGNORECASE)
            content = re.sub(r"SuperApp\s*", "", content, flags=re.IGNORECASE)
            content = content.replace('mockup_dashboard_klien.html', 'mockup_dasbor_psikologi.html')
            content = content.replace('mockup_dashboard_mitra.html', 'mockup_dasbor_psikologi.html')
        else:
            content = re.sub(r"BY\s*LIFEQ", "STANDALONE", content, flags=re.IGNORECASE)
            content = re.sub(r"LifeQ\s*SuperApp", "Qualifa & Justifiqa Standalone", content, flags=re.IGNORECASE)
            content = re.sub(r"LifeQ", "Qualifa / Justifiqa", content)
            content = re.sub(r"SuperApp\s*", "", content, flags=re.IGNORECASE)
            
        if content != orig:
            with open(fp, "w", encoding="utf-8") as f:
                f.write(content)
            log(f"   [CLEANED] {fn}")

log("=== SELURUH 6 REVISI PSIKOLOGI DAN CLEANUP TELAH DITUNTASKAN SECARA SEMPURNA! ===")

