# DOKUMEN SERAH TERIMA & KONTEKS REVISI ARSITEKTUR (HANDOVER DOCUMENT)
**Proyek:** LifeQ SuperApp (Ekosistem Layanan 3-in-1: Medis, Hukum, & Psikologi)  
**Tujuan Dokumen:** Konteks, spesifikasi mutlak, dan panduan tugas untuk sesi agen (*conversation session*) selanjutnya agar dapat langsung mengeksekusi revisi antarmuka tanpa halusinasi atau penyimpangan spesifikasi.  
**Posisi Kerja:** `d:\justificadll`

---

## I. RINGKASAN STATUS PROYEK & IDENTITAS EKOSISTEM

Saat ini, proyek berada pada fase penyelesaian akhir Mockup High-Fidelity (*Cyber-Navy Glassmorphism*) sebelum melangkah ke eksekusi skema database (ERD 29 Tabel & DDL SQL).

### 1. Struktur Identitas Merek (Brand Architecture)
*   **SuperApp Master Brand:** **LifeQ** (Portal terintegrasi superapp).
*   **Modul Kesehatan / Medis:** **Sehatifiqa** (Tele-medisin, e-Resep DDI Checker, SOAP Note, ICD-10 Kemenkes).
*   **Modul Hukum / Litigasi:** **Justifiqa** (Konsultasi advokat Peradi, IRAC Drafting Engine, e-Meterai Perum Peruri, Pro Bono Rp 0).
*   **Modul Psikologi / Mental Health:** **Qualifa** (Konseling psikolog klinis SIPP, Asesmen DASS-21, DAP Note, Crisis 119).

### 2. Status Aset UI & Master Bundle
*   Seluruh 12 file mockup disimpan di direktori: `d:\justificadll\Mockups\`.
*   File master gabungan (bundle 12 modul HTML): **`d:\justificadll\Mockups\gabungan_semua_mockup.html`**.
*   Skrip generator otomatis Python disimpan di: `d:\justificadll\Tools\` (khususnya `gen_dashboards.py` untuk menghasilkan dasbor utama dan `rebuild_gabungan_mockup.py` untuk menyatukan semua file).

---

## II. KONTEKS REVISI MUTLAK: DASBOR KLIEN (`mockup_dashboard_klien.html`)

Pada eksekusi sebelumnya, terjadi penyimpangan struktur dari rancangan wireframe asli (**`wireframe_dashboard_klien.html`**). Di sesi baru, agen **WAJIB** melakukan rekonstruksi dengan spesifikasi berikut:

### 1. Penghapusan Total Navigasi Bar Samping (No Left Sidebar!)
*   **Masalah Sebelumnya:** Dasbor Klien diberi navigasi menu bar samping (sidebar kiri) bergaya admin/mitra.
*   **Spesifikasi Mutlak:** Mengacu pada `wireframe_dashboard_klien.html`, Dasbor Klien adalah **Portal Landing/Control Full-Width tanpa Sidebar Kiri**. 
*   **Tindakan:** Hapus elemen `<div class="sidebar">...</div>` dari struktur HTML Dasbor Klien. Antarmuka harus mengalir penuh dari kiri ke kanan (*Full-Width Layout*).

### 2. Komponen Wajib Dasbor Klien (Sesuai Wireframe)
*   **Topbar:** Logo `LIFEQ SUPERAPP`, Ikon Notifikasi (Bel), dan Profil Klien (misal: *Ahmad Subarjo - SKTM Pro Bono Verified*).
*   **Hero Section (Universal Search Bar):**
    *   Judul sambutan: *"Selamat Datang di LifeQ SuperApp, Ahmad Subarjo"*.
    *   Sub-judul: *"Portal Terintegrasi untuk Layanan Kesehatan (Sehatifiqa), Bantuan Hukum Pro Bono (Justifiqa), & Kesehatan Mental (Qualifa)"*.
    *   Kolom pencarian utama berdesain menonjol dengan placeholder: *"🔍 Cari gejala penyakit, masalah hukum perdata, atau tes DASS-21..."*.
*   **3 Pilar Layanan SuperApp (Grid 3 Kolom):**
    *   Kartu 1: **Sehatifiqa (Modul Medis)** — Tombol aksi: `🩺 Konsultasi Dokter`.
    *   Kartu 2: **Justifiqa (Modul Hukum)** — Tombol aksi: `⚖️ Konsultasi Hukum`.
    *   Kartu 3: **Qualifa (Modul Psikologi)** — Tombol aksi: `🧠 Asesmen Mental`.
*   **Bottom Section (Grid 2 Kolom):**
    *   **Kolom Kiri (Sesi Aktif & Status Bantuan):** Spanduk persetujuan Bantuan Hukum Pro Bono Rp 0 (Desil 1 DTKS) dan Kartu Konsultasi Aktif (*dr. Andi Saputra, Sp.A* - Ruang E2EE, countdown timer 18:45).
    *   **Kolom Kanan (Riwayat & Aksi Cepat):** Daftar unduhan e-Resep Digital, Akta Hukum ber-e-Meterai asli, serta akses Jurnal Mood Tracker.

---

## III. KONTEKS REVISI MUTLAK: DASBOR MITRA (`mockup_dashboard_mitra.html`)

Dasbor Mitra profesional mengalami kerumitan berlebih (*overcomplicated clutter*) dan kesalahan logika bisnis pada navigasi keuangan. Di sesi baru, agen **WAJIB** melakukan perbaikan bedah berikut:

### 1. Koreksi Logika Bisnis Navigasi Keuangan ("Dompet Saldo")
*   **Masalah Sebelumnya:** Menu "Dompet Saldo" pada sidebar Mitra diarahkan ke `mockup_payment_gateway.html` (portal pembayaran/escrow tempat klien membayar).
*   **Logika Bisnis yang Benar:** Mitra Profesional (Dokter, Advokat, Psikolog) adalah **Penerima Pembayaran (*Payee/Beneficiary*)**, bukan pembayar (*Payer*).
*   **Spesifikasi Mutlak:** Sesuai spesifikasi sistem pada **SD-18 dan Activity Diagram "Mengelola Saldo dan Penarikan Dana"**, halaman keuangan mitra adalah modul khusus pengelolaan penghasilan konsultasi, pengecekan riwayat klaim subsisi Pro Bono, dan penarikan dana (*Payout/Withdrawal*) ke rekening bank pribadi/BCA.
*   **Tindakan:** Pastikan tautan navigasi dan representasi fitur pada Dasbor Mitra mencerminkan **Stasiun Kerja Penerima Penghasilan & Payout**, jangan campuradukkan dengan gerbang pembayaran klien!

### 2. Penyederhanaan Layout Sesuai `wf_dashboard_mitra.html`
*   Hapus elemen-elemen dekoratif atau metrik berlebihan yang membuat tampilan rumit dan tidak sejalan dengan wireframe asli.
*   **Elemen Wajib Sidebar Mitra:**
    *   **Profil Profesional:** Avatar besar (`DR`), nama (`dr. Andi Saputra, Sp.A`), spesialisasi (`Sehatifiqa — Spesialis Anak`), dan lencana `✔ STR KKI Terverifikasi`.
    *   **Toggle Switch Status Ketersediaan:** Slider interaktif di bawah profil (*🟢 ONLINE / Menerima Konsultasi* ↔ *🔴 SIDANG/OPERASI / Jadwal Tidak Tersedia*).
    *   **Menu Navigasi Bersih:** `📊 Dasbor Utama`, `⚡ Antrean Konsultasi`, `📑 Riwayat Sesi & Notes`, dan `💰 Dompet Saldo & Penarikan (SD-18)`. Serta pilihan cepat ke 3 Workstation Domain (`Sehatifiqa`, `Justifiqa`, `Qualifa`).
*   **Elemen Wajib Main Area:**
    *   Header Sambutan Profesional: *"Selamat Bekerja, dr. Andi Saputra, Sp.A"*.
    *   **Antrean Konsultasi Masuk (`queue-section`):** Menampilkan daftar klien yang menunggu di ruang obrolan dengan tombol tegas **`[💬 TERIMA & BUKA ROOM]`** atau **`[⚖️ TERIMA & BUKA IRAC]`**.
    *   **Sesi Selesai / Rekam Medis (`history-section`):** Menampilkan daftar sesi yang membutuhkan pengisian SOAP Note, IRAC Drafting, atau DAP Note dengan tombol aksi **`[📝 BUAT CATATAN]`**.

---

## IV. PANDUAN EKSEKUSI UNTUK AGEN DI SESI BARU

Saat Anda (agen di sesi baru) menerima dokumen ini, lakukan langkah-langkah kerja berikut secara taktis tanpa membuang waktu dengan justifikasi internal:

1.  **Buka & Pelajari File Terkait:**
    *   Buka `d:\justificadll\Tools\gen_dashboards.py` (skrip utama penghasil Dasbor Klien & Mitra).
    *   Periksa referensi wireframe di `d:\justificadll\Mockups\wireframe_dashboard_klien.html` dan `d:\justificadll\Mockups\wf_dashboard_mitra.html`.
2.  **Modifikasi `gen_dashboards.py`:**
    *   Revisi variabel `HTML_KLIEN`: Hapus sidebar kiri, jadikan full-width dengan Hero Search Bar, 3 Pilar Layanan, dan grid konsultasi/riwayat.
    *   Revisi variabel `HTML_MITRA`: Sederhanakan tampilan, pastikan Toggle Switch ada di sidebar, dan perbaiki konsep menu Dompet Saldo sesuai SD-18 (penarikan dana penghasilan mitra).
3.  **Jalankan Skrip Generator & Rebuild Master Bundle:**
    *   Jalankan perintah: `python d:\justificadll\Tools\gen_dashboards.py`
    *   Jalankan perintah: `python d:\justificadll\Tools\rebuild_gabungan_mockup.py`
4.  **Laporkan Hasil kepada Pengguna:**
    *   Tampilkan ringkasan perbaikan dan minta konfirmasi sign-off dari pengguna sebelum melangkah ke tahap pembuatan skema database relasional (ERD 29 Tabel).

---

## V. CATATAN ARSITEKTUR KESELURUHAN (FOR FUTURE REFERENCE)
*   **WORM SHA-256 Audit Trail:** Semua akta hukum yang diterbitkan melalui IRAC Drafting Engine, resep medis, dan transaksi keuangan diamankan dengan checksum SHA-256 yang bersifat *Write-Once-Read-Many* (anti-tamper) untuk pembuktian forensik pengadilan.
*   **IRAC Engine:** Pemisahan lapisan input analitis Advokat (Issue, Rule, Application, Conclusion) dengan mesin perakitan akta otomatis (*Smart Legal Rendering Engine*).
*   **Database-First Mandatory:** Setelah revisi mockup ini disetujui (sign-off), tugas selanjutnya adalah menghasilkan spesifikasi ERD (`DATABASE_SCHEMA_ERD.md`) dan skrip DDL SQL (`schema_justifica_v1.sql`) untuk 29 tabel sistem. DILARANG melompat ke penulisan kode frontend/backend sebelum skema database tuntas dan disetujui.
