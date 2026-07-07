import os
import re
import shutil
import glob
import html

JUSTIFIQA_DIR = r"d:\justificadll\Mockups\Justifiqa"
QUALIFA_DIR = r"d:\justificadll\Mockups\Qualifa"

def build_standalone_justifiqa(target_dir, output_file):
    sections = [
        ("mockup_dasbor_hukum.html", "1", "Justifiqa Legal Hub (Landing & Portal Ekosistem)"),
        ("mockup_dashboard_hukum_klien.html", "2", "Dasbor Hukum Pasien & Klien"),
        ("mockup_auth_justifiqa.html", "3", "Autentikasi Standalone (Verifikasi SIPP & OTP MFA)"),
        ("mockup_katalog_justifiqa.html", "4", "Katalog Advokat & Notaris Litigasi"),
        ("mockup_chat_justifiqa.html", "5", "Ruang Konsultasi Privileged (E2EE)"),
        ("mockup_payment_gateway.html", "6", "Payment Gateway Standalone (Escrow Bank)"),
        ("mockup_dashboard_mitra_hukum.html", "7", "Dasbor Utama Advokat Mitra & Workstation Keuangan"),
        ("mockup_modul_hukum.html", "8", "Workstation Hukum Mitra (IRAC Drafting & e-Meterai)"),
        ("mockup_admin_justifiqa.html", "9", "Workstation Admin Legal (Verifikasi & Moderasi Etik)")
    ]
    toc_html = []
    sections_html = []
    for filename, num, title in sections:
        filepath = os.path.join(target_dir, filename)
        if not os.path.exists(filepath): continue
        with open(filepath, "r", encoding="utf-8") as f: content = f.read()
        section_id = filename.replace(".html", "")
        toc_html.append(f'        <a href="#{section_id}">{num}. {title}</a>')
        escaped_content = html.escape(content, quote=True)
        sec_block = f"""
    <div class="mockup-section" id="{section_id}">
        <div class="section-label">
            <span class="num">{num}</span> {title}
            <span class="file">{filename}</span>
        </div>
        <div class="iframe-container">
            <iframe srcdoc="{escaped_content}" title="{title}" sandbox="allow-scripts allow-modals allow-same-origin"></iframe>
        </div>
    </div>
"""
        sections_html.append(sec_block)
        
    master_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Justifiqa — Master Standalone Bundled Mockups</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        :root {{ --bg-base: #020617; --primary: #ea580c; --border: rgba(234, 88, 12, 0.25); }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }}
        body {{ background-color: var(--bg-base); color: #f8fafc; padding: 2rem; }}
        .header {{ max-width: 1400px; margin: 0 auto 2rem; padding: 2rem; background: rgba(17, 24, 39, 0.8); border: 1px solid var(--border); border-radius: 20px; }}
        .header h1 {{ font-size: 2.2rem; color: #fff; margin-bottom: 0.5rem; }}
        .header p {{ color: #94a3b8; font-size: 1rem; line-height: 1.6; }}
        .toc {{ display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }}
        .toc a {{ background: rgba(234, 88, 12, 0.15); color: #fb923c; padding: 0.6rem 1.2rem; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(234, 88, 12, 0.3); transition: all 0.2s; }}
        .toc a:hover {{ background: var(--primary); color: #fff; }}
        .content {{ max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }}
        .mockup-section {{ background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden; }}
        .section-label {{ background: rgba(15, 23, 42, 0.9); padding: 1.2rem 2rem; font-size: 1.25rem; font-weight: 700; color: #fff; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; gap: 1rem; }}
        .section-label .num {{ background: var(--primary); color: #fff; width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; }}
        .section-label .file {{ margin-left: auto; font-family: 'Roboto Mono', monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px; }}
        .iframe-container {{ width: 100%; height: 850px; position: relative; }}
        iframe {{ width: 100%; height: 100%; border: none; background: #020617; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>⚖️ Justifiqa — Master Standalone Bundled Mockups</h1>
        <p>Ekosistem Konsultasi & Bantuan Hukum Siloam — Seluruh antarmuka dikompilasi menjadi satu berkas statis mandiri.</p>
        <div class="toc">
{"\n".join(toc_html)}
        </div>
    </div>
    <div class="content">
{"\n".join(sections_html)}
    </div>
</body>
</html>"""
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(master_html)
    print(f"Built Justifiqa standalone bundle at: {output_file}")

def build_standalone_qualifa(target_dir, output_file):
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
        filepath = os.path.join(target_dir, filename)
        if not os.path.exists(filepath): continue
        with open(filepath, "r", encoding="utf-8") as f: content = f.read()
        section_id = filename.replace(".html", "")
        toc_html.append(f'        <a href="#{section_id}">{num}. {title}</a>')
        escaped_content = html.escape(content, quote=True)
        sec_block = f"""
    <div class="mockup-section" id="{section_id}">
        <div class="section-label">
            <span class="num">{num}</span> {title}
            <span class="file">{filename}</span>
        </div>
        <div class="iframe-container">
            <iframe srcdoc="{escaped_content}" title="{title}" sandbox="allow-scripts allow-modals allow-same-origin"></iframe>
        </div>
    </div>
"""
        sections_html.append(sec_block)
    master_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qualifa — Master Standalone Bundled Mockups</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        :root {{ --bg-base: #020617; --primary: #a855f7; --border: rgba(168, 85, 247, 0.25); }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }}
        body {{ background-color: var(--bg-base); color: #f8fafc; padding: 2rem; }}
        .header {{ max-width: 1400px; margin: 0 auto 2rem; padding: 2rem; background: rgba(17, 24, 39, 0.8); border: 1px solid var(--border); border-radius: 20px; }}
        .header h1 {{ font-size: 2.2rem; color: #fff; margin-bottom: 0.5rem; }}
        .header p {{ color: #94a3b8; font-size: 1rem; line-height: 1.6; }}
        .toc {{ display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }}
        .toc a {{ background: rgba(168, 85, 247, 0.15); color: #c084fc; padding: 0.6rem 1.2rem; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(168, 85, 247, 0.3); transition: all 0.2s; }}
        .toc a:hover {{ background: var(--primary); color: #fff; }}
        .content {{ max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }}
        .mockup-section {{ background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden; }}
        .section-label {{ background: rgba(15, 23, 42, 0.9); padding: 1.2rem 2rem; font-size: 1.25rem; font-weight: 700; color: #fff; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; gap: 1rem; }}
        .section-label .num {{ background: var(--primary); color: #fff; width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; }}
        .section-label .file {{ margin-left: auto; font-family: 'Roboto Mono', monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px; }}
        .iframe-container {{ width: 100%; height: 850px; position: relative; }}
        iframe {{ width: 100%; height: 100%; border: none; background: #020617; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🌱 Qualifa — Master Standalone Bundled Mockups</h1>
        <p>Ekosistem Konseling & Kesehatan Jiwa Siloam — Seluruh antarmuka dikompilasi menjadi satu berkas statis mandiri.</p>
        <div class="toc">
{"\n".join(toc_html)}
        </div>
    </div>
    <div class="content">
{"\n".join(sections_html)}
    </div>
</body>
</html>"""
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(master_html)
    print(f"Built Qualifa standalone bundle at: {output_file}")

def replace_alert_by_keyword(content, keyword, new_alert):
    def replacer(match):
        full_alert = match.group(0)
        if keyword.lower() in full_alert.lower():
            return new_alert
        return full_alert
    return re.sub(r'alert\((?:(?!alert\().)*?\);', replacer, content, flags=re.DOTALL | re.IGNORECASE)

def clean_excessive_revision(content):
    # Rule 2: Simplify Status & Badge Naming
    content = content.replace("🟢 ONLINE / AVAILABLE", "🟢 Online")
    content = content.replace("ONLINE / AVAILABLE", "Online")
    content = content.replace("🔴 SIDANG / OFFLINE", "🔴 Offline")
    content = content.replace("OFFLINE / SIDANG", "Offline")
    content = content.replace("PENDING / MENUNGGU VERIFIKASI", "Menunggu Verifikasi")
    
    # Rule 3: Polish Alert feedback messages using safe isolated replacer
    alert_rules = [
        ("J-UC16 Approval Sukses",
         'alert(`✅ Kredensial Advokat Disetujui:\\n\\nKredensial advokat atas nama [${name}] telah diverifikasi sah sesuai Pangkalan Data MA & Peradi.\\n\\nStatus akun diaktifkan di Katalog Justifiqa.`);'),
        ("J-UC16 Rejection",
         'alert(`❌ Pendaftaran Ditolak:\\n\\nPendaftaran advokat [${name}] ditolak.\\n\\nAlasan: "${reason}"\\nStatus: REJECTED\\nEmail penjelasan hukum telah dikirimkan.`);'),
        ("J-UC17 Due Process Suspend",
         'alert(`🛑 Akun Ditangguhkan:\\n\\nAkun advokat [${name}] resmi ditahan sementara (SUSPENDED) dari seluruh katalog praktik Justifiqa.\\n\\nAlasan: "${reason}"\\nSurat Panggilan Klarifikasi Internal telah diterbitkan.`);'),
        ("Alasan penolakan wajib diisi",
         'alert("⚠️ Alasan Penolakan Wajib Diisi: Harap masukkan alasan penolakan demi kepatuhan dan transparansi audit log!");'),
        ("Alasan penahanan akun darurat",
         'alert("⚠️ Alasan Suspend Wajib Diisi: Harap masukkan alasan penahanan akun darurat (suspend) untuk rekam jejak sidang etik!");'),
        ("PEMBERITAHUAN SISTEM JUSTIFIQA (400 Bad Request)",
         'alert("⚠️ Pendaftaran Gagal:\\n\\nAkun dengan Nomor Identitas / Email tersebut (" + identitas + ") sudah terdaftar di dalam database Justifiqa.\\n\\nSilakan masuk dengan kredensial yang ada.");'),
        ("VERIFIKASI NIK DUKCAPIL BERHASIL",
         'alert("✅ Verifikasi Berhasil:\\n\\nSelamat! Data NIK (" + identitas + ") cocok dengan database Dukcapil. Akun Klien Anda telah aktif.\\n\\nSilakan masuk ke dasbor Anda.");'),
        ("PENDAFTARAN ADVOKAT DITERIMA",
         'alert("📋 Pendaftaran Diterima:\\n\\nDokumen Kartu Tanda Advokat (KTA Peradi) dan Berita Acara Sumpah (BAS) Anda sedang diverifikasi oleh Tim Kepatuhan Legal Justifiqa.\\n\\nAnda akan menerima notifikasi email setelah verifikasi selesai.");'),
        ("ERROR SYSTEM JUSTIFIQA (401 Unauthorized)",
         'alert("⚠️ Login Gagal:\\n\\nEmail atau kata sandi yang Anda masukkan tidak cocok.\\n\\nHarap periksa kembali kredensial Anda.");'),
        ("ERROR SYSTEM JUSTIFIQA (403 Forbidden - Akun Ditangguhkan)",
         'alert("🛑 Akun Ditangguhkan:\\n\\nAkun Anda sedang dalam status SUSPENDED karena investigasi dugaan pelanggaran Kode Etik Advokat.\\n\\nSilakan hubungi Customer Service Justifiqa.");'),
        ("VERIFIKASI GAGAL (400 Bad Request)",
         'alert("⚠️ Kode OTP Tidak Valid:\\n\\nKode verifikasi OTP 6-digit (" + digits + ") tidak valid atau sudah kadaluarsa.\\n\\nSilakan periksa kembali kode Anda atau kirim ulang OTP.");'),
        ("VERIFIKASI MFA BERHASIL (200 OK)",
         'alert("✅ Autentikasi Berhasil:\\n\\nKode OTP 6-digit valid. Anda akan diarahkan ke Dasbor Utama Justifiqa...");'),
        ("MALWARE DETECTED",
         'alert("⚠️ Berkas Ditolak:\\n\\nSistem pemindaian keamanan mendeteksi potensi ancaman malware pada berkas yang dipilih. Unggahan dibatalkan untuk menjaga integritas sistem Justifiqa.");'),
        ("PAYLOAD TOO LARGE",
         'alert("⚠️ Berkas Gagal Diunggah:\\n\\nUkuran file melebihi batas maksimal 15 MB atau format tidak didukung.\\n\\nHanya file PDF dan JPG maksimal 15 MB yang diizinkan.");'),
        ("CLIENT-SIDE ZERO-KNOWLEDGE E2EE",
         'alert("✅ Berkas Berhasil Diunggah:\\n\\n1. Pemindaian Keamanan: BERSIH.\\n2. Enkripsi Lokal: Berkas dienkripsi secara aman.\\n3. Penyimpanan: Berhasil disimpan ke WORM Storage.\\n4. Status: Privileged Legal Evidence.");'),
        ("UNDUH & DEKRIPSI LOKAL",
         'alert("📥 Unduh & Dekripsi Berhasil:\\n\\nDokumen utuh \\"" + filename + "\\" (" + size + ") berhasil dibuka dan diverifikasi dengan stempel hukum \\"PRIVILEGED LEGAL EVIDENCE\\".");'),
        ("SISTEM ESCROW JUSTIFIQA (SD-J-03 Langkah 147)",
         'alert("💰 Pencairan Dana Escrow:\\n\\nSesi konsultasi resmi berakhir. Dana dari rekening escrow sebesar Rp250.000 telah dicairkan ke saldo advokat.\\n\\nMengarahkan ke Workstation Hukum...");'),
        ("Anda melewatkan ulasan",
         'alert("Anda melewatkan pemberian ulasan. Dana escrow sebesar Rp250.000 telah resmi dilepaskan kepada advokat.");'),
        ("Ulasan berhasil dikirim",
         'alert("⭐ Ulasan berhasil dikirim! Dana escrow sebesar Rp250.000 telah resmi dilepaskan kepada advokat.");'),
        ("[Error 400] Nomor NIK dan SKTM wajib diisi!",
         'alert("⚠️ Lengkapi Data: Nomor NIK dan nomor SKTM wajib diisi.");'),
        ("[SD-J-07 Langkah 270-274: 200 OK]",
         'alert("✅ Verifikasi SKTM Berhasil:\\n\\n• NIK Terdaftar di DTKS Dinas Sosial.\\n• Invoice Rp 0 (Subsidi Pro Bono) diterbitkan.\\n• Advokat Budi Santoso, S.H., M.H. telah ditugaskan menangani perkara Anda.");'),
        ("[SD-J-07 Langkah 266-268: Error 400 Bad Request]",
         'alert("❌ Verifikasi SKTM Gagal:\\n\\n• Nomor SKTM atau NIK tidak ditemukan dalam Data Terpadu Kesejahteraan Sosial (DTKS) Dinsos.\\n• Pengajuan Bantuan Hukum Pro Bono tidak dapat diproses.");'),
        ("ERROR 400 BAD REQUEST / 422 UNPROCESSABLE ENTITY (SD-J-10)",
         'alert("⚠️ Pencairan Gagal:\\n\\nNominal pencairan (" + formatRp(amount) + ") melebihi saldo aktif siap tarik (" + formatRp(availableBalance) + ") atau bernilai tidak valid.\\n\\nHarap periksa kembali saldo Anda.");'),
        ("SUCCESS 200 OK (SD-J-10 / J-UC19 & J-UC18)",
         'alert(`✅ Pencairan Berhasil:\\n\\nPencairan dana berhasil diproses secara real-time ke rekening bank Anda.\\n\\nNomor Referensi Bank: ${refNum}\\nJumlah Bruto: ${formatRp(amount)}\\nPotongan PPh 21 (5%): -${formatRp(tax)}\\nTransfer Netto: ${formatRp(net)}\\n\\nStatus WORM Hash: ${randomHash}`);'),
        ("BUKTI PEMOTONGAN PAJAK PPH PASAL 21 (J-UC18 / SD-J-10)",
         'alert(`📑 Bukti Pemotongan Pajak PPh Pasal 21:\\n\\nNo. Bukti Potong: PPH21-${refNum}\\nNama Wajib Pajak: Budi Santoso, S.H., M.H.\\nNPWP: 88.921.402.1-012.000\\nPenghasilan Bruto: ${formatRp(gross)}\\nTarif Pemotongan: 5% (Tenaga Ahli)\\nPPh 21 Dipotong: ${formatRp(tax)}\\n\\nSiap digunakan untuk lampiran SPT Tahunan.`);'),
        ("ERROR 409 CONFLICT (SD-J-04 / J-UC09 Alternatif 2b)",
         'alert("⚠️ Gagal Mengubah Status:\\n\\nTerdapat sesi konsultasi yang sedang berlangsung atau jadwal sidang yang aktif.\\n\\nHarap selesaikan sesi aktif terlebih dahulu sebelum mengubah status ketersediaan.");'),
        ("ONLINE / AVAILABLE. Profil advokat Anda kini aktif",
         'alert("✅ Status Diperbarui:\\n\\nAnda sekarang Online dan siap menerima konsultasi dari klien di Katalog Justifiqa.");'),
        ("OFFLINE / SIDANG. Profil advokat Anda disembunyikan",
         'alert("✅ Status Diperbarui:\\n\\nAnda sekarang Offline. Profil advokat Anda untuk sementara disembunyikan dari katalog pencarian klien.");'),
        ("Error 400 Bad Request (J-UC11 Validation):.*?Seluruh field",
         'alert("⚠️ Data Tidak Lengkap:\\n\\nSeluruh kolom analisis IRAC (Issue, Rule, Application, Conclusion) wajib diisi lengkap.");'),
        ("Error 400 Bad Request (J-UC11 Validation):.*?Terdapat kolom",
         'alert("⚠️ Data Tidak Lengkap:\\n\\nTerdapat kolom analisis IRAC yang masih kosong. Harap lengkapi rumusan Issue, Rule, Application, dan Conclusion.");'),
        ("201 Created / 200 OK (J-UC11 IRAC Saved)",
         'alert(`✅ Catatan IRAC Disimpan:\\n\\nCatatan sesi hukum untuk [${caseId}] berhasil disimpan dan dienkripsi dalam WORM Storage.\\n\\nVisibilitas: ${visValue === \'shared\' ? \'Bagikan ke Klien\' : \'Internal Advokat\'}\\nHash Storage: ${hashSim}\\nRetensi Audit: 10 Tahun`);'),
        ("Stamping Gagal (Error 402 Payment Required",
         'alert("⚠️ Pembubuhan e-Meterai Gagal:\\n\\nKuota e-Meterai Peruri tidak mencukupi atau layanan sistem sedang sibuk.\\n\\nSilakan isi ulang token kuota e-Meterai Anda atau simpan sebagai draf terlebih dahulu.");'),
        ("201 Created / 200 OK (SD-J-06 e-Meterai Stamped)",
         'alert("✅ e-Meterai Berhasil Dibubuhkan:\\n\\ne-Meterai resmi Perum Peruri Rp10.000 telah disematkan pada dokumen akta hukum.\\n\\nDokumen kini sah, diverifikasi, dan siap diunduh oleh klien.");'),
        ("Access Denied (Error 403 Forbidden - J-UC12 Download Gate)",
         'alert("⚠️ Unduhan Ditolak:\\n\\nDokumen hukum ini belum dibubuhi e-Meterai resmi Peruri atau masih berstatus draf internal.\\n\\nKlien hanya diizinkan mengunduh akta akhir setelah pembubuhan e-Meterai berhasil diverifikasi.");'),
        ("200 OK (Download Gate Passed / J-UC12)",
         'alert("📥 Mengunduh Dokumen:\\n\\nMemulai unduhan akta hukum resmi bersertifikat e-Meterai Peruri (Format: PDF/A-2b verified).\\n\\nDokumen ini memiliki kekuatan hukum pembuktian yang sah.");')
    ]
    
    for kw, new_alert in alert_rules:
        content = replace_alert_by_keyword(content, kw, new_alert)
        
    # Rule 1: Clean technical codes in titles/headings/buttons/badges (avoiding helper boxes)
    tech_patterns = [
        r" \(SD-J-\d+(?: / J-UC\d+)?(?: & J-UC\d+)?\)",
        r" \(J-UC\d+(?: / SD-J-\d+)?\)",
        r" \(SD-J-\d+\)",
        r" \(J-UC\d+\)",
        r" \(SD-J-03 Langkah 147\)",
        r" \(SD-J-04 Langkah 176\)",
        r" \(SD-J-04 / J-UC09 Alternatif 2b\)",
        r" \(SD-J-05 / J-UC13\)",
        r" \(SD-J-07 / J-UC15\)",
        r" \(SD-J-10 / J-UC19 & J-UC18\)",
        r" \(J-UC18 / SD-J-10\)",
        r" \(SD-J-10\)",
        r" \(UC-\d+(?: [^)]+)?\)",
        r" \(100% Siloed App\)",
        r" \(E2EE\)",
        r" \(WORM SHA-256 Hash\)",
        r" \(WORM\)"
    ]
    
    def clean_tag_content(match):
        tag_open, inner_text, tag_close = match.group(1), match.group(2), match.group(3)
        for p in tech_patterns:
            inner_text = re.sub(p, "", inner_text)
        return f"{tag_open}{inner_text}{tag_close}"
        
    content = re.sub(r'(<(?:title|h[1-6]|button|a|span)[^>]*>)(.*?)(</(?:title|h[1-6]|button|a|span)>)', clean_tag_content, content, flags=re.DOTALL | re.IGNORECASE)
    
    # [TAMBAHAN POLA 2: Pembersihan Kotak Panduan Uji Coba & Skenario QA untuk Versi Ready / Produksi]
    try:
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(content, 'html.parser')
        for div in list(soup.find_all('div')):
            text = div.get_text()
            if "Panduan Uji Coba" in text:
                child_has = any("Panduan Uji Coba" in c.get_text() for c in div.find_all('div') if c != div)
                if not child_has:
                    div.decompose()
        content = str(soup)
    except Exception as e:
        print(f"Warning: BeautifulSoup DOM cleanup failed: {e}")
        
    # Bersihkan tombol simulasi QA pada modal SKTM dasbor hukum klien di versi ready
    content = re.sub(r'<div style="font-size: 0\.8rem; color: #94a3b8; margin-bottom: 10px; font-weight: 600;">⚡ PILIH SKENARIO PENGUJIAN.*?</div>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<button[^>]*onclick="simulateProBonoFailed\(\)"[^>]*>.*?</button>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'✓ Simulasi 200 OK: SKTM Sah & Terverifikasi DTKS', '✓ Ajukan & Verifikasi SKTM ke Dinas Sosial (DTKS)', content, flags=re.IGNORECASE)
    
    return content

def process_domains():
    print("=== STARTING TWO-VERSION MOCKUP GENERATION & EXCESSIVE REVISION ===")
    
    # 1. PROCESS JUSTIFIQA
    raw_justifiqa = os.path.join(JUSTIFIQA_DIR, "justifiqa-raw")
    ready_justifiqa = os.path.join(JUSTIFIQA_DIR, "justifiqa-ready")
    os.makedirs(raw_justifiqa, exist_ok=True)
    os.makedirs(ready_justifiqa, exist_ok=True)
    
    html_files_raw = glob.glob(os.path.join(raw_justifiqa, "*.html"))
    
    print(f"Cleaning {len(html_files_raw)} files from justifiqa-raw into justifiqa-ready and main folder...")
    for raw_file in html_files_raw:
        if "standalone" in raw_file: continue
        with open(raw_file, "r", encoding="utf-8") as fp:
            raw_content = fp.read()
        clean_content = clean_excessive_revision(raw_content)
        filename = os.path.basename(raw_file)
        
        ready_path = os.path.join(ready_justifiqa, filename)
        with open(ready_path, "w", encoding="utf-8") as fp:
            fp.write(clean_content)
            
        main_path = os.path.join(JUSTIFIQA_DIR, filename)
        with open(main_path, "w", encoding="utf-8") as fp:
            fp.write(clean_content)
            
    build_standalone_justifiqa(raw_justifiqa, os.path.join(raw_justifiqa, "mockup_justifiqa_standalone.html"))
    build_standalone_justifiqa(raw_justifiqa, os.path.join(JUSTIFIQA_DIR, "mockup_justifiqa_standalone_raw.html"))
    
    build_standalone_justifiqa(ready_justifiqa, os.path.join(ready_justifiqa, "mockup_justifiqa_standalone.html"))
    build_standalone_justifiqa(ready_justifiqa, os.path.join(JUSTIFIQA_DIR, "mockup_justifiqa_standalone_ready.html"))
    build_standalone_justifiqa(ready_justifiqa, os.path.join(JUSTIFIQA_DIR, "mockup_justifiqa_standalone.html"))
    
    # 2. PROCESS QUALIFA
    raw_qualifa = os.path.join(QUALIFA_DIR, "qualifa-raw")
    ready_qualifa = os.path.join(QUALIFA_DIR, "qualifa-ready")
    os.makedirs(raw_qualifa, exist_ok=True)
    os.makedirs(ready_qualifa, exist_ok=True)
    
    q_html_files_raw = glob.glob(os.path.join(raw_qualifa, "*.html"))
    print(f"Cleaning {len(q_html_files_raw)} files from qualifa-raw into qualifa-ready and main folder...")
    for raw_file in q_html_files_raw:
        if "standalone" in raw_file: continue
        with open(raw_file, "r", encoding="utf-8") as fp:
            raw_content = fp.read()
        clean_content = clean_excessive_revision(raw_content)
        filename = os.path.basename(raw_file)
        
        ready_path = os.path.join(ready_qualifa, filename)
        with open(ready_path, "w", encoding="utf-8") as fp:
            fp.write(clean_content)
            
        main_path = os.path.join(QUALIFA_DIR, filename)
        with open(main_path, "w", encoding="utf-8") as fp:
            fp.write(clean_content)
            
    build_standalone_qualifa(raw_qualifa, os.path.join(raw_qualifa, "mockup_qualifa_standalone.html"))
    build_standalone_qualifa(raw_qualifa, os.path.join(QUALIFA_DIR, "mockup_qualifa_standalone_raw.html"))
    
    build_standalone_qualifa(ready_qualifa, os.path.join(ready_qualifa, "mockup_qualifa_standalone.html"))
    build_standalone_qualifa(ready_qualifa, os.path.join(QUALIFA_DIR, "mockup_qualifa_standalone_ready.html"))
    build_standalone_qualifa(ready_qualifa, os.path.join(QUALIFA_DIR, "mockup_qualifa_standalone.html"))
    
    print("=== SUCCESS: TWO-VERSION MOCKUPS & EXCESSIVE REVISION COMPLETED ===")

if __name__ == "__main__":
    process_domains()
