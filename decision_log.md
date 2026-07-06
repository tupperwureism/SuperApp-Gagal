# DECISION LOG & CORRECTION HISTORY
**Proyek:** LifeQ SuperApp (Ekosistem Layanan 3-in-1: Medis, Hukum, & Psikologi)
**Lokasi Proyek:** `d:\justificadll`

---

## FASE: HIGH-FIDELITY MOCKUP REVISION (CYBER-NAVY GLASSMORPHISM)

### 1. Koreksi & Keputusan Desain: Dasbor Klien (`mockup_dashboard_klien.html`)
- **Koreksi Pengguna / Referensi Wireframe:** Dasbor Klien sebelumnya mengalami penyimpangan struktur berupa penambahan navigasi menu bar samping (sidebar kiri).
- **Keputusan Arsitektur:** 
  - **Penghapusan Total Sidebar Kiri (No Left Sidebar):** Dasbor Klien didefinisikan secara mutlak sebagai **Portal Landing/Control Full-Width tanpa Sidebar Kiri** yang mengalir dari kiri ke kanan.
  - **Struktur Hero Section & Universal Search Bar:** Menampilkan salam sambutan untuk Ahmad Subarjo (SKTM Pro Bono Verified) dengan pencarian terpadu atas gejala penyakit, masalah hukum perdata, maupun tes DASS-21.
  - **Grid 3 Pilar Layanan:** Akses langsung ke kartu layanan Sehatifiqa (Medis), Justifiqa (Hukum/Litigasi), dan Qualifa (Psikologi/Mental Health).
  - **Bottom Section Layout (2 Kolom):** Kolom kiri memuat Spanduk Persetujuan Bantuan Hukum Pro Bono Rp 0 (Desil 1 DTKS) & Kartu Konsultasi Aktif (dr. Andi Saputra, Sp.A - Ruang E2EE, countdown timer); Kolom kanan memuat Riwayat Aksi Cepat (e-Resep Digital, Akta Hukum e-Meterai asli, Jurnal Mood Tracker).

### 2. Koreksi & Keputusan Desain: Dasbor Mitra (`mockup_dashboard_mitra.html`)
- **Koreksi Pengguna / Referensi UML & Wireframe:** Dasbor Mitra sebelumnya mengalami kesalahan kaprah (*salah kaprah*) berupa pencampuran 3 domain sekaligus (Medis, Hukum, Psikologi) di dalam antarmuka satu profesional, serta kerumitan berlebih (*clutter* / *over-engineering*).
- **Keputusan Arsitektur Mutlak (Pure Domain-Alignment):**
  - **Spesifikasi per Domain (SD-11 & SD-14):** Seorang Mitra terdaftar hanya pada **SATU domain spesifik**. Untuk profil representatif `dr. Andi Saputra, Sp.A`, domainnya adalah murni **Medis (Sehatifiqa)**. Seluruh kartu dekoratif pemilih domain (Hukum/Psikologi) di Main Area **DIHAPUS TOTAL** karena menyalahi logika profesi (dokter tidak membuka sesi somasi hukum atau konseling psikologi).
  - **Penyederhanaan Layout Sidebar (`wf_dashboard_mitra.html`):** Memuat Profil Profesional, **Toggle Switch Status Ketersediaan** (*ONLINE / Menerima Konsultasi* ↔ *SIDANG/OPERASI / Jadwal Tidak Tersedia*), dan menu navigasi bersih: Dasbor Utama, Antrean Konsultasi, Riwayat Sesi & Notes, Dompet Saldo & Payout (SD-18), serta tautan cepat khusus domain `🩺 Buka Workstation Sehatifiqa`.
  - **Antrean & Riwayat Khusus Domain:** Seluruh sesi masuk pada antrean dan sesi selesai pada riwayat disaring **murni untuk kasus medis/pediatri** (wajib isi SOAP Note & e-Resep DDI Checker). Kasus hukum (IRAC) dan psikologi (DASS-21/DAP) dilarang muncul di dasbor dokter anak.
  - **Koreksi Logika Dompet Saldo (SD-18):** Mitra adalah Penerima Pembayaran (*Payee/Beneficiary*). Fitur keuangan menampilkan Saldo Aktif Siap Tarik, pencairan klaim subsidi Pro Bono medis Kemensos, dan Payout Real-Time ke rekening BCA dengan pemotongan PPh 21.

### 3. Rekonsiliasi & Master Bundle
- Skrip generator `d:\justificadll\Tools\gen_dashboards.py` telah dieksekusi untuk meregenerasi file:
  - `d:\justificadll\Mockups\mockup_dashboard_admin.html`
  - `d:\justificadll\Mockups\mockup_dashboard_mitra.html`
  - `d:\justificadll\Mockups\mockup_dashboard_klien.html`
- **Penghapusan File Gabungan (`gabungan_semua_mockup.html`):** Sesuai instruksi mutlak pengguna dan prinsip *100% Siloed App*, file master gabungan dan skrip penggabung (`rebuild_gabungan_mockup.py`) telah **DIHAPUS PERMANEN** karena bertentangan dengan isolasi arsitektur per domain.

---
*Catatan audit ini disimpan sebagai memori persisten agar penyimpangan spesifikasi navigasi maupun struktur antarmuka tidak terulang pada fase eksekusi berikutnya.*

## FASE: REVISI PSIKOLOGI (QUALIFA 100% SILOED APP - ZERO PERCAMPURAN / NO LIFEQ)

### 1. Koreksi Pengguna / Aturan Mutlak Domain Isolasi:
- **Koreksi Pengguna:** Pengguna menegaskan bahwa Qualifa (Psikologi) harus terisolasi 100% sebagai aplikasi mandiri (*Siloed App*), tidak boleh dicampuradukkan dengan domain hukum atau medis, dan DILARANG KERAS memuat sisa branding "LifeQ" atau "SuperApp" generik.
- **Keputusan Arsitektur & UI/UX Mutlak:**
  - **Sanitasi Branding Total:** Seluruh string "LifeQ", "BY LIFEQ", dan "SuperApp" telah dihapus secara menyeluruh dari semua file HTML (termasuk mockup standalone dan wireframes).
  - **Hub Utama Psikologi (`mockup_dasbor_psikologi.html`):** Dibuat sebagai portal utama ekosistem Qualifa yang memberikan pilihan role secara jelas: Pasien/Klien, Mitra Psikolog Klinis, dan Admin HIMPSI.
  - **Portal Auth (`mockup_auth.html`):** Logika tombol "Daftar Sekarang" memunculkan notifikasi sistem (sudah terdaftar), tombol "Masuk Sekarang" dan OTP Modal me-redirect dengan tepat ke `mockup_dashboard_mitra_psikologi.html` jika kolom Mitra aktif, atau ke `mockup_dashboard_psikologi_klien.html` jika kolom Klien aktif.
  - **Workstation & Modul Terpisah (Zero Hallucination Role separation):**
    - `mockup_modul_psikologi_klien.html`: Khusus pasien untuk mengisi Jurnal Mood Tracker harian, Skala DASS-21, Audio Grounding CDN, dan CCBT Worksheet. Dilarang melihat atau mengubah DAP Note klinis.
    - `mockup_modul_psikologi_mitra.html`: Khusus psikolog SIPP untuk menganalisis skor DASS-21 pasien, mengelola antrean, dan menulis Rekam Medis DAP Note dengan enkripsi AES-256 dan kunci WORM (*Write-Once-Read-Many*). Dilarang menampilkan input mood tracker pasien.
    - `mockup_modul_psikologi.html`: Bekerja sebagai Hub/Selektor yang mengarahkan ke versi Klien atau versi Mitra.
  - **Katalog Psikolog (`mockup_katalog_qualifa.html`):** Diperbarui dengan filter interaktif berbasis JavaScript (pencarian nama, filter tarif subsidi/pro bono, dan filter spesialisasi klinis).
  - **Penegasan Anti-SuperApp / Anti-Bundle:** Tidak ada lagi pembuatan file gabungan lintas domain. Setiap domain berdiri di atas berkas dan navigasi yang terpisah dan terisolasi.

## FASE: STANDARISASI LOGIKA UI/UX & SCREEN CATALOG (THE 6-PILLAR SPEC)

### 1. Koreksi & Keputusan Arsitektur:
- **Pemisahan Total Portal Autentikasi (`mockup_auth_qualifa.html` vs `mockup_auth_justifiqa.html`):** Untuk menghilangkan kecacatan pencampuran domain pada portal login, autentikasi telah dipisah 100% menjadi dua file mandiri. File lama (`mockup_auth.html`) diubah menjadi Siloed Domain Gateway selector.
- **Penerapan Dokumen Rujukan Logika (`ui_specification_guide.md`):** Sebagai langkah mitigasi terhadap halusinasi logika antarmuka dan putusnya alur interaksi (seperti kasus OTP modal atau hilangnya field identitas pada mode registrasi), telah dibuat dokumen **UI/UX Functional Specification & Screen Catalog**.
- **Anatomi 6 Pilar (The 6-Pillar Spec):** Setiap 20 halaman di dalam sistem wajib memenuhi standar pengecekan: (1) Screen Metadata & ID, (2) Role & Access Control, (3) Component Inventory, (4) Interactive State Machine (Event -> Action -> Redirection), (5) Edge Cases & Error Handling, dan (6) Domain Compliance (UU PDP, WORM DAP Note, e-Meterai Peradi).
- **Traceability Guarantee:** Dokumen ini bertindak sebagai *authoritative guide* sebelum perancangan database ERD dan eksekusi kode frontend dilakukan.
- **Isolasi Direktori Global (`Mockups/Qualifa` vs `Mockups/Justifiqa`):** Sesuai arahan mutlak pengguna, direktori `Mockups` telah dipisahkan secara fisik menjadi subdirektori `Qualifa/` (menampung 13 file psikologi) dan `Justifiqa/` (menampung 10 file hukum), sementara portal gateway selector (`mockup_auth.html`) dan file admin/wireframing bersama tetap berada di root `Mockups/` dengan tautan yang mengarah tepat ke subdirektori masing-masing.
- **Koreksi Tatanan Alur & Hierarki Layar (Hub Sebelum Auth):** Atas koreksi kritis pengguna mengenai tatanan alur psikologi, posisi `mockup_dasbor_psikologi.html` (Qualifa Psychology Hub) resmi ditetapkan sebagai **Gerbang Masuk Utama / Section 1 (SCR-QLF-01)** sebelum gerbang autentikasi `mockup_auth_qualifa.html` **(SCR-QLF-02)**. Tautan kartu role Klien dan Mitra diubah agar mengalir melalui proses verifikasi kredensial & OTP modal (`?role=klien` atau `?role=mitra`) sebelum diizinkan mengakses dasbor interior. Master bundle `mockup_qualifa_standalone.html` juga telah diregenerasi dengan urutan 9 babak yang sejalan.
- **Koreksi Cascading 4 Temuan Anomali UI/UX (Zero-Tolerance for Flaws):** Atas laporan hasil pengecekan visual pengguna, telah dieksekusi perbaikan menyeluruh secara serentak di semua file terkait dan master bundle:
  1. *Perbaikan Typo:* Mengubah "KUNCING DARURAT AKTIF" menjadi "KUNCI DARURAT AKTIF" pada modal krisis `mockup_modul_psikologi_klien.html`.
  2. *Disambiguasi Copywriting Keuangan:* Memperjelas perbedaan antara "Saldo Dompet Aktif (Siap Tarik)" (saldo yang tersedia untuk ditarik saat ini setelah potongan PPh 21 & bagi hasil) dengan "Total Riwayat Penghasilan (Lifetime)" (akumulasi kumulatif seluruh pendapatan sejak hari pertama) pada `mockup_dashboard_mitra_psikologi.html`.
  3. *Koreksi Pelanggaran RBAC (Anti-Leap to Admin):* Menghapus tautan menu "Portal Kepatuhan HIMPSI" yang melompat ke dasbor Admin pada sidebar Mitra (`mockup_dashboard_mitra_psikologi.html` & `mockup_modul_psikologi_mitra.html`). Diganti dengan modal internal "Status Kepatuhan SIPP & Etik HIMPSI" yang menampilkan keabsahan STR/SIPP psikolog secara mandiri tanpa menembus domain admin.
  4. *Fungsionalisasi Penuh Dasbor Admin:* Mengubah `mockup_admin_qualifa.html` dari yang sebelumnya memiliki 3 menu bertipe placeholder *alert*, menjadi sistem workstation interaktif 4-tab ("Dasbor Kepatuhan", "Verifikasi SIPP Psikolog", "Log WORM Crisis 119", dan "Sidang Etik Psikologi & Buffer Rule 30m").
- **Koreksi Lanjutan 4 Alur & Redundansi UI/UX (Zero-Tolerance for Flaws - 04 Juli 2026):**
  1. *Penghapusan File Redundan (`mockup_modul_psikologi.html`):* Mengonfirmasi bahwa file `mockup_modul_psikologi.html` adalah file hub generik lama yang tidak lagi terpakai sejak dipisahkan menjadi workstation spesifik (`mockup_modul_psikologi_klien.html` untuk pasien dan `mockup_modul_psikologi_mitra.html` untuk psikolog). File redundan tersebut telah dihapus permanen, dan referensinya di dokumen panduan (`ui_specification_guide.md`) telah dibersihkan.
  2. *Verifikasi Bersih "Pro Bono":* Memeriksa seluruh file pada katalog Qualifa (`mockup_katalog_qualifa.html`) dan mengonfirmasi bahwa istilah "pro bono" telah 100% tersanitasi sejak revisi sebelumnya menjadi "Subsidi Tarif / Sesi Sosial / Rp 0".
  3. *Koreksi Alur Pembayaran Konsultasi:* Memperbaiki lompatan alur keliru pada kartu katalog psikolog di `mockup_katalog_qualifa.html` yang sebelumnya langsung membuka ruang WebRTC (`mockup_chat_qualifa.html`). Kini, tombol "Berkonsultasi & Booking Sesi", "Konsultasi Cepat (Darurat)", dan "Pilih Paket Konseling" mengarah tepat ke `mockup_payment_gateway.html` (Midtrans) untuk menyelesaikan transaksi sebelum akses terapi dibuka.
  4. *Panel Interaktif Daftar Langganan (Subscribed Doctors & Patients Caseload):*
     - Master bundle `mockup_qualifa_standalone.html` telah diregenerasi penuh untuk mengintegrasikan seluruh perubahan logika dan antarmuka ini.
- **Koreksi Alur Interaktif & Kedalaman Visual (Interactive State Machine - 05 Juli 2026):**
  - Menanggapi diagnosis objektif mengenai akar masalah kedalaman mockup dan *batching prompt*, telah diterapkan **Interactive State Machine (4 State Wajib)** pada alur transaksi pembayaran dan konfirmasi jadwal untuk mengatasi ketimpangan detail antara SD (UC-04/UC-05) dengan visualisasi mockup statis:
  - **Payment Gateway Interaktif (`mockup_payment_gateway.html` di Qualifa, Justifiqa, dan Root):**
    - Tombol *"Bayar Sekarang"* dilengkapi penangan event yang memicu Layer Modal *"⏳ Pembayaran Sedang Diproses..."* (simulasi latensi verifikasi Webhook Midtrans selama 1.8 detik).
    - Setelah verifikasi sukses, status berubah otomatis menjadi *SETTLEMENT_CONFIRMED (200 OK)* dengan pesan *"✅ Pembayaran Terkonfirmasi!"*, lalu sistem melakukan auto-redirect ke Dasbor Klien dengan membawa parameter state (`?demo_confirm=1` dan *localStorage flag*).
    - Modal kegagalan pembayaran (`#paymentFailedState`) distandarisasi ke posisi tersembunyi (`display: none`) untuk mencegah pemblokiran layar saat awal dimuat.
  - **Dasbor Klien Auto-Refresh (`mockup_dashboard_psikologi_klien.html` & `mockup_dashboard_hukum_klien.html`):**
    - Saat dasbor menerima parameter atau flag konfirmasi pembayaran baru, sistem menampilkan Top Floating Toast *"⏳ Pembayaran Terkonfirmasi! Melakukan sinkronisasi & refresh jadwal dalam 2 detik..."*.
    - Setelah jeda 2 detik, sistem menyimulasikan pembaruan data secara dinamis dengan pesan *"🎉 Refresh Berhasil!"* dan secara otomatis membuka Modal Daftar Langganan Aktif (pada Qualifa) atau menyorot kartu penanganan kasus litigasi (pada Justifiqa).
  - **Katalog Advokat Justifiqa (`mockup_katalog_justifiqa.html`):** Meluruskan alur pemesanan konsultasi hukum dan bantuan hukum pro bono agar mengarah tepat ke `mockup_payment_gateway.html` sebelum membuka ruang komunikasi E2EE.
  - **Regenerasi Master Standalone Bundles:** Telah diciptakan skrip baru `rebuild_justifiqa_bundle.py` untuk mendampingi `rebuild_qualifa_bundle.py`. Kedua berkas bundel utama (`mockup_qualifa_standalone.html` berisi 10 babak dan `mockup_justifiqa_standalone.html` berisi 8 babak) telah diregenerasi secara sukses sehingga 100% konsisten dan siap untuk uji coba interaktif secara *offline* maupun presentasi sign-off.
- **Implementasi Role-Aware Routing Engine & Resolusi Bug Lompatan Dasbor (05 Juli 2026):**
  - Mengatasi laporan bug keliru alur di mana Mitra (Psikolog/Advokat) yang menekan tombol *"Akhiri Sesi"* atau *"Kembali ke Dasbor"* pada ruang chat terlempar ke dasbor Klien.
  - Menerapkan **Role-Aware Routing Engine** secara serentak (Cascade Correction) pada kedua antarmuka komunikasi E2EE yang bersifat *stateless/shared*:
    1. **Qualifa Ruang Terapi WebRTC (`mockup_chat_qualifa.html`):** Skrip dinamis mendeteksi parameter URL `?role=mitra` (atau *localStorage* `user_role_qualifa`) dan secara otomatis mengalihkan tombol kembali ke `mockup_dashboard_mitra_psikologi.html` serta tombol akhiri sesi ke `mockup_modul_psikologi_mitra.html` (Workstation DAP Note).
    2. **Justifiqa Ruang Litigasi (`mockup_chat_justifiqa.html`):** Skrip dinamis mendeteksi parameter `?role=mitra` (atau *localStorage* `user_role_justifiqa`) dan secara otomatis mengarahkan advokat kembali ke `mockup_dashboard_mitra_hukum.html` serta tombol akhiri sesi ke `mockup_modul_hukum.html` (Workstation IRAC).
  - Memperbarui seluruh tautan masuk ruang chat di seluruh dasbor, workstation, dan modal (Klien vs Mitra) agar menyertakan parameter `?role=klien` atau `?role=mitra` secara eksplisit, serta meregenerasi kedua master standalone bundles.
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 1: SD-J-01 (06 Juli 2026):**
  - Menerapkan paradigma baru di mana eksekusi dan verifikasi mockup dilakukan per Batch berbasis Sequence Diagram (SD) sebagai panglima alur.
  - **Batch 1 (`SD-J-01`: Registrasi Akun Klien & Advokat):** Membedah `mockup_auth_justifiqa.html` dan menemukan bahwa fungsi submit registrasi sebelumnya hanya mengarah pada skenario negatif (*Akun sudah terdaftar* / 400 Bad Request).
  - Melakukan *Loop-Back Fix* dengan memperkaya `mockup_auth_justifiqa.html` dan `ui_specification_guide.md` untuk memfasilitasi 3 cabang alur interaktif penuh sesuai SD-J-01:
    1. **Cabang Error 400 (Sudah Terdaftar):** Dipicu saat NIK/NIA bernilai default `NIA-998201` atau mengandung kata `exist`.
    2. **Cabang Sukses Klien (201 AKTIF):** Dipicu saat pendaftaran baru di tab Klien; melakukan simulasi verifikasi NIK ke API Dukcapil dan mengarahkan pengguna ke halaman login.
    3. **Cabang Sukses Advokat (201 PENDING_VERIFICATION):** Dipicu saat pendaftaran baru di tab Advokat Mitra; menyimpan dokumen KTA Peradi & BAS Pengadilan Tinggi ke antrean audit admin sesuai UU Advokat No. 18/2003 & Kode Etik Peradi.
  - Ditambahkan panel panduan interaktif (*helper guide*) langsung di atas formulir registrasi untuk memudahkan pengujian, serta meregenerasi master bundel `mockup_justifiqa_standalone.html`.
