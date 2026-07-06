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
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 2: SD-J-02 (06 Juli 2026):**
  - **Batch 2 (`SD-J-02`: Login Akun Klien & Advokat MFA 2FA):** Membedah alur login pada `mockup_auth_justifiqa.html` dan menemukan dua ketidaksesuaian kritis dengan `SD-J-02`: (1) Modal OTP sebelumnya hanya 4 digit dan bersifat *readonly*, padahal Langkah 87 & 93 SD-J-02 mewajibkan **MFA 6-Digit**; (2) Tombol login langsung memicu OTP tanpa validasi kredensial awal atau pengecekan akun *suspended*.
  - Melakukan *Loop-Back Fix* secara tuntas pada `mockup_auth_justifiqa.html` dan `ui_specification_guide.md`:
    1. **Cabang Error 401 (Kredensial Salah):** Dipicu saat email/password mengandung kata `salah` atau kosong; memunculkan peringatan salah kredensial & sisa percobaan login.
    2. **Cabang Error 403 (Akun Suspended):** Dipicu saat email mengandung kata `block` atau `suspend`; memunculkan peringatan akun ditangguhkan karena investigasi pelanggaran Kode Etik Justifiqa.
    3. **Cabang Sukses Kirim OTP 6-Digit (200 OK):** Dipicu saat email normal; sistem membuka modal MFA dengan **6 kotak input interaktif (dapat diedit)** yang masa berlakunya disimulasikan 5 menit.
    4. **Cabang Error 400 (OTP Invalid/Expired):** Pada modal OTP, jika pengguna mengubah angka menjadi `000000`, sistem menolak masuk dan meminta pengiriman ulang kode. Jika OTP valid, sistem menerbitkan JWT Token dan mengarahkan ke dasbor sesuai peran (Mitra atau Klien).
  - Ditambahkan kotak panduan pengujian (*helper guide*) untuk alur login di atas kolom email, serta meregenerasi master bundel `mockup_justifiqa_standalone.html`.
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 3: SD-J-03 (06 Juli 2026):**
  - **Batch 3 (`SD-J-03`: Konsultasi Hukum & Pembayaran Escrow Justifiqa):** Melakukan audit alur terhadap `mockup_payment_gateway.html` (Justifiqa) dan `mockup_chat_justifiqa.html` berdasarkan Langkah 124-147 `SD-J-03` dan `J-UC04, J-UC05, J-UC06, J-UC10`. Ditemukan anomali: (1) Rincian tagihan belum mencerminkan tarif Escrow Rp250.000 + Rp10.000 Fee Platform (Langkah 128); (2) Belum ada mekanisme pengujian transaksi kedaluwarsa/ditolak (UC-05 Alternatif 5a/5b); (3) Saat mengakhiri sesi chat, tidak ada pemicu Modal Ulasan & Rating (`J-UC06`) atau notifikasi pencairan dana Escrow (Langkah 146 & 147).
  - Melakukan *Loop-Back Fix* menyeluruh:
    1. **Sinkronisasi Katalog & Harga Escrow:** Memperbarui `mockup_katalog_justifiqa.html` dan rincian pesanan di `mockup_payment_gateway.html` menjadi Advokat Rizky Ramadhan dengan tagihan Rp260.000 (Rp250.000 Retainer + Rp10.000 Fee Platform & Escrow).
    2. **Fungsionalisasi Simulasi Timeout / Ditolak:** Menambahkan tombol *"Simulasi Waktu Habis / Ditolak (UC-05 5a/5b)"* di halaman pembayaran yang memunculkan layer error 400 Bad Request / Expired.
    3. **Penahanan Dana Escrow (Langkah 133):** Memperbarui respons sukses webhook Midtrans agar secara eksplisit menyatakan bahwa dana Rp250.000 ditahan di Rekening Escrow Sementara Justifiqa hingga sesi selesai.
    4. **Modal Ulasan J-UC06 & Pelepasan Escrow (Langkah 146 & 147):** Di `mockup_chat_justifiqa.html`, mengganti lompatan statis dengan interaktif modal. Untuk Klien: memunculkan Modal Rating 5 Bintang interaktif (opsi kirim ulasan atau skip) dan mencairkan escrow sebelum kembali ke dasbor. Untuk Mitra Advokat: menampilkan alert pencairan saldo escrow (potong fee 25% & PPh 21) lalu menuju Workstation IRAC Note.
  - Ditambahkan panel panduan interaktif (*helper guide*) di kedua mockup, memperbarui spesifikasi `SCR-JST-04b` & `SCR-JST-06` di `ui_specification_guide.md`, dan meregenerasi master bundel statis.
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 4: SD-J-04 (06 Juli 2026):**
  - **Batch 4 (`SD-J-04`: Mengatur Status Ketersediaan Praktik Advokat / J-UC09):** Melakukan audit alur pada `mockup_dashboard_mitra_hukum.html` berdasarkan Langkah 164-178 `SD-J-04`. Ditemukan anomali: (1) Fungsi toggle status sebelumnya hanya membalikkan boolean tanpa melakukan pengecekan bentrok jadwal atau sesi konsultasi yang sedang aktif (Error 409 Conflict); (2) Teks badge saat offline masih menggunakan terminologi medis dari Qualifa ("OPERASI") padahal seharusnya terminologi advokat ("SIDANG / OFFLINE"); (3) Dokumen `use_case_scenarios.md` untuk `UC-09` belum mencantumkan alur alternatif gagal akibat konflik jadwal.
  - Melakukan *Loop-Back Fix* menyeluruh:
    1. **Fungsionalisasi Cabang 409 Conflict (Jadwal Bentrok / Sesi Aktif):** Menambahkan kotak centang interaktif *"Simulasi Konflik Jadwal / Sesi Aktif (SD-J-04: 409 Conflict)"* di sidebar dasbor advokat. Jika dicentang, klik pada toggle status praktik akan ditolak oleh sistem dengan peringatan Error 409 Conflict dan meminta penyelesaian sesi aktif terlebih dahulu.
    2. **Fungsionalisasi Cabang 200 OK (Slot Jadwal Aman):** Jika tidak ada konflik, klik pada toggle status akan memperbarui status secara instan antara `🟢 ONLINE (Menerima Konsultasi)` dan `🔴 SIDANG / OFFLINE (Jadwal Tidak Tersedia)` disertai notifikasi sukses 200 OK.
    3. **Sinkronisasi Dokumen Rujukan:** Menambahkan alur alternatif `2b. Kegagalan Perubahan Status karena Konflik Jadwal / Sesi Aktif (Error 409 Conflict)` pada `UC-09` di `use_case_scenarios.md`, serta memperbarui inventaris komponen dan mesin status `SCR-JST-03` di `ui_specification_guide.md`.
  - Ditambahkan kotak panduan pengujian (*helper guide*) di dasbor advokat serta meregenerasi master bundel statis `mockup_justifiqa_standalone.html`.
- **Standarisasi Kualitas UI/UX - Excessive Revision Gate (06 Juli 2026):**
  - Mengadopsi pedoman baru `excessive_revision.md` sebagai gerbang kendali mutu paska-eksekusi (*Post-Batch Polish Gate*) untuk memisahkan *functional tracing* dengan kualitas presentasi UI/UX akhir.
  - **Koreksi Strategi Eksekusi (Two Standalones Pattern):** Ditetapkan bahwa pengaplikasian aturan pada `excessive_revision.md` **diberlakukan setelah seluruh batch dalam domain (Batch 1 - 10) selesai dieksekusi dalam kondisi mentah (*raw SD-driven*)**.
  - Seluruh perubahan pembersihan teks pada file UI/Mockups (Batch 1 - 4) telah **direvert kembali ke kondisi mentah (*raw*)** agar ketercejakan spesifikasi (`UC-05`, `SD-J-04`, `J-UC06`, dsb.) tetap dipertahankan selama masa eksekusi alur SD.
  - Nantinya akan dihasilkan dua artefak master terpisah: **Mockup Standalone Mentah** (kaya akan referensi teknis & SD-tracing) dan **Mockup Standalone Matang** (telah dipoles bersih dengan panduan `excessive_revision.md`).
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 5: SD-J-05 (06 Juli 2026):**
  - **Batch 5 (`SD-J-05`: Mengunggah Berkas Perkara E2EE Zero-Knowledge / J-UC13):** Melakukan audit alur pada `mockup_chat_justifiqa.html` berdasarkan Langkah 197-209 `SD-J-05`. Ditemukan anomali: (1) Tombol unggah bukti sebelumnya menggunakan tag salah `J-UC09` dan hanya memunculkan alert statis tanpa validasi batas ukuran file (maks 15 MB), pemindaian virus, atau simulasi enkripsi Zero-Knowledge ke WORM Storage; (2) Dokumen `use_case_scenarios.md` belum memperbarui `UC-13` dari sisa sistem medis Qualifa menjadi `J-UC13: Mengunggah Berkas Perkara E2EE Zero-Knowledge`.
  - Melakukan *Loop-Back Fix* menyeluruh:
    1. **Fungsionalisasi Modal Unggah Bukti E2EE:** Menambahkan modal interaktif `#uploadEvidenceModal` di `mockup_chat_justifiqa.html` yang memungkinkan pemilihan skenario pengujian:
       - **200 OK (Normal / Bersih):** Simulasi pemindaian virus client-side bersih (`LocK`), enkripsi AES-256 Session Key secara Zero-Knowledge, penyimpanan ke WORM Hash Storage dengan hash SHA-256, dan penyematan stempel *"PRIVILEGED LEGAL EVIDENCE"*. Berhasil menambahkan gelembung dokumen baru ke ruang chat secara dinamis.
       - **400 Bad Request (3a - Malware Detected):** Simulasi pemindai client-side mendeteksi virus/code berbahaya, menolak file dan membatalkan enkripsi sebelum meninggalkan perangkat klien.
       - **413 Payload Too Large / 415 Unsupported Media Type (3b):** Simulasi penolakan upload akibat ukuran file melampaui batas maksimal 15 MB atau format di luar PDF/JPG.
    2. **Fungsionalisasi Simulasi Unduh & Dekripsi Bukti:** Gelembung dokumen di obrolan kini interaktif; klik pada dokumen mensimulasikan Langkah 204-208 (pengambilan blob dari WORM dan dekripsi lokal menggunakan Session Key di workstation advokat).
    3. **Sinkronisasi Dokumen Rujukan:** Mengganti spesifikasi lama medis `UC-13` dengan `J-UC13: Mengunggah Berkas Perkara E2EE Zero-Knowledge` di `use_case_scenarios.md`, serta memperbarui `SCR-JST-06` di `ui_specification_guide.md`.
  - Ditambahkan panduan uji coba di dalam obrolan serta meregenerasi master bundel statis `mockup_justifiqa_standalone.html`.
- **Eksekusi Paradigma SD-Driven UI/UX - Batch 6: SD-J-06 (06 Juli 2026):**
  - **Batch 6 (`SD-J-06`: Pembubuhan e-Meterai Peruri & Retensi WORM / J-UC11, J-UC12, J-UC14):** Melakukan audit menyeluruh pada `mockup_modul_hukum.html` berdasarkan alur Langkah 210-224 `SD-J-06`. Ditemukan anomali: (1) Tombol simpan IRAC belum interaktif dan tidak mensimulasikan enkripsi WORM (J-UC11); (2) Tombol e-Meterai Peruri langsung memunculkan alert statis tanpa memilih skenario sukses/gagal (J-UC14); (3) **Download Gate (J-UC12)** hanya berupa teks statis dan belum mengunci pengunduhan sebelum e-Meterai dibubuhkan; (4) Dokumen rujukan `use_case_scenarios.md` belum menyinkronkan `UC-10`, `UC-11`, dan `UC-12` dengan spesifikasi hukum Justifiqa.
  - Melakukan *Loop-Back Fix* menyeluruh:
    1. **Fungsionalisasi IRAC Legal Drafting (`J-UC11`):** Menambahkan tombol aksi ganda "Simpan & Enkripsi IRAC ke WORM (200 OK)" yang menambahkan versi baru ke dalam Version Control System secara dinamis, serta tombol "Simulasi Error 400" (validasi form kosong).
    2. **Fungsionalisasi Modal Stamping e-Meterai Peruri (`SD-J-06 / J-UC14`):** Menambahkan gerbang modal `#stampingModal` interaktif yang memungkinkan pengujian skenario sukses (200 OK / 201 Created: verifikasi kuota saldo dari 18 menjadi 17, penerbitan serial number SHA-256, dan penguncian versi vFinal) serta skenario gagal (402 Payment Required / 502 Bad Gateway akibat kuota habis atau timeout API Peruri).
    3. **Implementasi Interaktif Download Gate (`J-UC12 / J-UC14`):** Menghubungkan logika pembubuhan e-Meterai dengan status pengunduhan dokumen. Sebelum stamping, tombol unduh akta akan ditolak dengan Error 403 Forbidden (dokumen belum bermeterai sah). Setelah stamping berhasil (200 OK), Download Gate terbuka secara dinamis dan mengizinkan Klien mengunduh akta bersertifikat PDF/A-2b yang berketetapan hukum tetap.
    4. **Sinkronisasi Dokumen Rujukan:** Memperbarui `use_case_scenarios.md` (mengganti spesifikasi medis Qualifa menjadi `J-UC10`, `J-UC11`, `J-UC12/J-UC14`) dan `ui_specification_guide.md` (`SCR-JST-05`).
  - Ditambahkan kotak panduan pengujian interaktif (Helper Guide Box Batch 6) pada bagian atas `mockup_modul_hukum.html` serta meregenerasi master bundel statis `mockup_justifiqa_standalone.html`.
  - **Koreksi & Audit Root Cause Batch 6 (06 Juli 2026):** Ditemukan duplikasi blok deklarasi HTML (`<!DOCTYPE html>`, `<head>`, `<style>`, sidebar, dan topbar) di dalam `mockup_modul_hukum.html` akibat ketidaksengajaan saat code replacement sebelumnya. Perbaikan telah dieksekusi dengan menghapus baris duplikasi tersebut dan meregenerasi master bundel `mockup_justifiqa_standalone.html`.
- **Protokol Investigasi Bug & Struktur Folder Pasca-Domain (Disepakati 06 Juli 2026):**
  - Sesuai prinsip **Anti-Halusinasi & Git Tracking (Rule #1 & #2)**, setelah seluruh batch domain mentah (Batch 1–10) selesai dikerjakan, pengecekan modul per modul akan dilakukan oleh pengguna. Jika ditemukan error atau bug, Agen diwajibkan melacak asal-usul perubahan tersebut menggunakan riwayat komit Git (`git diff` / `git log` per batch) agar analisa akar masalah bersifat pasti faktual dan tidak menebak-nebak (no self-assumption).
  - **Struktur Dua Versi Mockup (Two-Version Standalone Protocol):**
    1. **`justifiqa-raw` (Domain Mentah):** Direktori/berkas mockup yang mempertahankan seluruh referensi teknis SD-Driven, pelacakan kode Use Case (J-UCXX, SD-J-XX), HTTP status codes, dan penjelasan teknis mendetail sebagai rekam jejak rekayasa perangkat lunak.
    2. **`justifiqa-ready` (Domain Matang / Bersih):** Direktori/berkas mockup yang sudah bersih dari bug serta telah melewati proses verifikasi dan pembersihan berlebihan (`excessive_revision.md`), di mana seluruh label rujukan teknis internal dan kalimat pop-up berlebihan dihapus sehingga siap disajikan kepada pengguna akhir (*end-user production ready*).
