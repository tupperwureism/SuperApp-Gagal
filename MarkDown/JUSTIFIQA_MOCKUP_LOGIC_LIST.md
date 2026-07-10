# Daftar Mockup & Logika Sistem Justifiqa (`JUSTIFIQA_MOCKUP_LOGIC_LIST.md`)

Dokumen ini mendefinisikan daftar lengkap **17 Mockup / Halaman Antarmuka Justifiqa** (Klien, Advokat, dan Admin Hukum) berfokus murni pada **logika sistem (*system logic*)**, interaksi komponen fungsional, dan pemenuhan spesifikasi **21 Use Case (`J-UC01` s/d `J-UC21`)** serta fitur penyempurnaan **Fase 2 Backlog** (*Tiering, Inline DLP Security, Fair-Clock Timer, Offline QR Handshake, Async Deliverable Quota, Dual-Source Moderation*).

---

## 1. PORTAL KLIEN HUKUM (8 MOCKUP)

| ID Mockup | Nama Halaman | Use Case | Story Ref | Keterangan Fungsi & Komponen Logis Utama |
| :--- | :--- | :---: | :---: | :--- |
| **`MOCK-J-CL-01`** | **Portal Registrasi & Login Klien** | `J-UC01`,<br>`J-UC02` | `ST-J-01`,<br>`ST-J-02` | **Fungsi**: Autentikasi klien hukum, pencatatan persetujuan UU PDP ber-hash SHA-256, dan pengecekan status akun.<br>**Komponen Logis**: Form NIK Dukcapil, Input OTP/MFA, Checkbox Persetujuan Hukum SHA-256, Banner Status Akun (*Active* / *Restricted due to Dispute*). |
| **`MOCK-J-CL-02`** | **Katalog Advokat & Direktori Layanan** | `J-UC03` | `ST-J-05` | **Fungsi**: Pencarian dan pemfilteran advokat berdasarkan spesialisasi, status lisensi SIPP aktif, lokasi geografis, dan model konsultasi.<br>**Komponen Logis**: Filter Spesialisasi (Pidana, Perdata, Bisnis, Ketenagakerjaan), Filter Mode (*Online Chat E2EE* vs *Offline Tatap Muka*), Kartu Advokat (*Badge SIPP Aktif*, Tarif per Tier 1/2/3), Tombol *Pilih Layanan*. |
| **`MOCK-J-CL-03`** | **Checkout Pembayaran Escrow & Pro Bono** | `J-UC05`,<br>`J-UC15` | `ST-J-07`,<br>`ST-J-13` | **Fungsi**: Pembayaran ke rekening Escrow platform Justifiqa dengan timer 15 menit atau pengajuan konsultasi gratis Pro Bono SKTM.<br>**Komponen Logis**: Tab Bayar Escrow (Rincian Tarif, Pemilihan VA/E-Wallet, Timer Hitung Mundur 15m); Tab Pro Bono SKTM (Upload Foto SKTM, Input Nomor DTKS Kemensos, Indikator Kuota Advokat 3/Bulan, Tombol Klaim Rp0). |
| **`MOCK-J-CL-04`** | **Ruang Obrolan Hukum Online E2EE** | `J-UC04`,<br>`J-UC10`,<br>`J-UC13` | `ST-J-08`,<br>`ST-J-09`,<br>`ST-J-10` | **Fungsi**: Sesi konsultasi hukum daring terenkripsi *Zero-Knowledge* dengan proteksi *Inline DLP Security* & *Fair-Clock Timer*.<br>**Komponen Logis**: Watermark Permanen `"PRIVILEGED AND CONFIDENTIAL"`, Badge Tier Sesi, *Fair-Clock Countdown Timer* (penanda `PAUSED` jika advokat diam >5m & info auto-refund jika AFK >15m), Uploader Bukti Perkara `"PRIVILEGED LEGAL EVIDENCE"`, Banner *Inline DLP Security Alert* (blokir kontak pribadi/ajakan offline ilegal). |
| **`MOCK-J-CL-05`** | **Check-in & Check-out Konsultasi Offline Resmi** | `J-UC03`,<br>`J-UC04` | `ST-J-08B` | **Fungsi**: Handshake kehadiran tatap muka resmi di kantor advokat menggunakan *Dynamic QR Code Token*.<br>**Komponen Logis**: Pemindai Kamera QR Code (Check-in awal & Check-out akhir), Timer Sesi Tatap Muka 60 Menit, Peringatan Visual H-15m, Banner Info *Grace Period 120 Menit Systemic Auto Check-out*, Tombol *Laporkan Kendala / Sesi Batal*. |
| **`MOCK-J-CL-06`** | **Ruang Kerja Asinkron Deliverable & Download Gate** | `J-UC12`,<br>`J-UC14` | `ST-J-12` | **Fungsi**: Penyerahan, revisi berkota, dan pengunduhan dokumen hukum formal (*Legal Opinion* / Kontrak ber-e-Meterai SHA-256).<br>**Komponen Logis**: PDF Previewer Dokumen Hukum, Tombol *Direct Approve*, Form Pengajuan Revisi (*Sisa Kuota Putaran: 2/2*), Timer SLA Auto-Approve (2x24h/3x24h), Banner Status *Thread Locked (`async_thread_locked = TRUE`)*, dan *Download Gate*. |
| **`MOCK-J-CL-07`** | **Blocking Modal Rating & Ulasan Advokat** | `J-UC06` | `ST-J-14` | **Fungsi**: Evaluasi mutu layanan advokat secara mutlak pasca-sesi ditutup dengan perlindungan anonimitas identitas klien.<br>**Komponen Logis**: Modal Pop-up *Blocking* (menutup layar sebelum diklik kirim/lewati), Input Rating 1-5 Bintang, Textarea Ulasan, Label Jaminan Privasi `"Nama Anda disamarkan sebagai: Klien Huk-XXXX"`. |
| **`MOCK-J-CL-08`** | **Form Whistleblowing & Pelaporan Etik Advokat** | `J-UC21` | `ST-J-19` | **Fungsi**: Pelaporan pelanggaran Kode Etik Advokat / Wanprestasi langsung dari riwayat konsultasi.<br>**Komponen Logis**: Dropdown Kategori Pelanggaran (Meminta Biaya Luar Escrow, Melanggar Kerahasiaan, AFK/Tidak Kompeten, Pelecehan), Checkbox Lampiran Bukti Transkrip E2EE SHA-256, Textarea Kronologi, Tombol *Kirim ke Dewan Etik*. |

---

## 2. PORTAL ADVOKAT HUKUM (5 MOCKUP)

| ID Mockup | Nama Halaman | Use Case | Story Ref | Keterangan Fungsi & Komponen Logis Utama |
| :--- | :--- | :---: | :---: | :--- |
| **`MOCK-J-AD-01`** | **Portal Onboarding & Login Advokat** | `J-UC07`,<br>`J-UC08` | `ST-J-03`,<br>`ST-J-04` | **Fungsi**: Autentikasi dan pendaftaran advokat baru dengan verifikasi dokumen profesi dan pengamanan MFA TOTP.<br>**Komponen Logis**: Tab Login (Email + Kode 6-Digit TOTP Authenticator, Peringatan Lock 30m pasca-3x Gagal); Tab Registrasi (Upload KTP, Berita Acara Sumpah/BAS MA, Kartu Peradi AES-256 WORM). |
| **`MOCK-J-AD-02`** | **Dasbor Manajemen Praktik & Pengaturan Jadwal** | `J-UC09` | `ST-J-06` | **Fungsi**: Pengaturan ketersediaan real-time, jam praktik konsultasi online, dan slot konsultasi offline tatap muka.<br>**Komponen Logis**: Toggle Real-time Status Online/Offline, Kalender Jam Praktik Online, Pengaturan Kuota & Alamat Kantor Konsultasi Offline, Widget SLA Performance Tracker (Rata-rata waktu masuk sesi). |
| **`MOCK-J-AD-03`** | **Ruang Obrolan Advokat & QR Host Display** | `J-UC04`,<br>`J-UC10` | `ST-J-08`,<br>`ST-J-08B` | **Fungsi**: Pelayanan konsultasi daring E2EE atau penampil token QR untuk konsultasi tatap muka offline.<br>**Komponen Logis**: Tab Online Chat (Panel Klien Aktif, Ruang Obrolan E2EE dengan *Activity Pulse* agar tidak terkena *Auto-Pause/AFK Refund*, Tombol Buat Catatan IRAC Cepat); Tab Offline QR Host (*Dynamic QR Code Token* yang refresh tiap 60 detik untuk dipindai Klien). |
| **`MOCK-J-AD-04`** | **Editor Catatan IRAC & Legal Drafting Engine** | `J-UC11`,<br>`J-UC12`,<br>`J-UC14` | `ST-J-11`,<br>`ST-J-12` | **Fungsi**: Penyusunan catatan klinis/hukum IRAC terstruktur dan perakitan draf dokumen hukum resmi ber-e-Meterai.<br>**Komponen Logis**: Panel Kiri (Formulir 4-Tab IRAC: *Issue, Rule, Application, Conclusion* AES-256 WORM retensi 10 tahun); Panel Kanan (*Legal Template Drafting Editor* dengan Klausul Standar, Tombol Request e-Meterai Peruri Rp10.000, Tombol Kirim ke *Async Deliverable Thread* Klien). |
| **`MOCK-J-AD-05`** | **Dasbor Keuangan Escrow, PPh 21 & Pencairan Dana** | `J-UC19` | `ST-J-17` | **Fungsi**: Transparansi finansial advokat, perhitungan bagi hasil, pajak PPh 21 otomatis, dan pencairan dana.<br>**Komponen Logis**: Kartu Saldo Tertahan (*Escrow Hold*) vs Saldo Siap Cair (*Settled* pasca thread locked/approved), Rincian Bagi Hasil 75% Advokat / 25% Platform, Bukti Potong PPh 21 Digital Dirjen Pajak, Status AML Check Rekening Bank vs SIPP, Tombol *Request Withdrawal*. |

---

## 3. PORTAL BACKOFFICE ADMIN HUKUM (4 MOCKUP)

| ID Mockup | Nama Halaman | Use Case | Story Ref | Keterangan Fungsi & Komponen Logis Utama |
| :--- | :--- | :---: | :---: | :--- |
| **`MOCK-J-AM-01`** | **Autentikasi Terisolasi Admin Portal** | `J-UC20` | `ST-J-18` | **Fungsi**: Gerbang masuk keamanan tinggi bagi admin kepatuhan hukum pada subdomain terisolasi.<br>**Komponen Logis**: Pengecekan IP Whitelisting otomatis, Input Username/Password + 6-Digit TOTP Authenticator, Log Audit Percobaan Login. |
| **`MOCK-J-AM-02`** | **Dasbor Verifikasi Kredensial Advokat & SKTM Pro Bono** | `J-UC16`,<br>`J-UC15` | `ST-J-15`,<br>`ST-J-13` | **Fungsi**: Verifikasi berkas pendaftaran advokat baru terhadap database Mahkamah Agung & verifikasi SKTM klien.<br>**Komponen Logis**: Panel Kiri (*WORM Document Previewer* KTP/BAS/Kartu Peradi/SKTM anti-unduh); Panel Kanan (Tombol Panggil API SIPP MA & Peradi, Panggil API DTKS Kemensos, Tombol Aksi *Approve* Hijau & *Reject* Merah dengan Catatan). |
| **`MOCK-J-AM-03`** | **Dual-Source Moderation Queue & Due Process Panel** | `J-UC17`,<br>`J-UC21` | `ST-J-16` | **Fungsi**: Penanganan kasus pelanggaran etik, wanprestasi, atau upaya penghindaran transaksi dengan prinsip *Due Process of Law*.<br>**Komponen Logis**: Daftar Antrean Kasus dengan Label Sumber (*Client Whistleblow* vs *Automated DLP Evasion Alert*), Bukti Transkrip E2EE SHA-256, Panel Surat Peringatan (Warning 1, 2, 3), Tombol *Suspend Akun* dengan Surat Resmi SHA-256, *Appeal Window Timer* 14 Hari Kerja. |
| **`MOCK-J-AM-04`** | **Pemantauan Keuangan Escrow & Rekonsiliasi Pajak** | `J-UC18` | `ST-J-17` | **Fungsi**: Audit arus kas Escrow platform Justifiqa, kepatuhan pajak, dan otorisasi pencairan dana besar.<br>**Komponen Logis**: Tabel Rekonsiliasi Transaksi Escrow Justifiqa, Log Pemotongan PPh 21, Tombol Ekspor Laporan Keuangan SHA-256, Panel *Two-Person Approval* untuk pencairan dana >= Rp 10.000.000. |

---

## 4. RELASI NAVIGASI & PETA SISTEMIK (`navigation-map.json`)
Seluruh 17 Mockup di atas terhubung melalui peta navigasi bersyarat (*state machine navigation map*) dalam file `navigation-map.json` yang menjamin tidak ada *dead-end* atau inkonsistensi alur.
