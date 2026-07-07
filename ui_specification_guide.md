# UI/UX FUNCTIONAL SPECIFICATION & SCREEN CATALOG (`ui_specification_guide.md`)
**Proyek:** SuperApp-Gagal (Siloed Standalone Ecosystems: Qualifa Psychology & Justifiqa Legal)  
**Versi:** 1.0.0 (Master Release — Zero Hallucination & Anti-Leap Standard)  
**Tanggal Approval:** 4 Juli 2026  

---

## BAB 1: FILOSOFI & ATURAN ARSITEKTUR ANTARMUKA

### 1. Prinsip 100% Siloed App (Zero Percampuran Lintas Domain)
Sistem ini beroperasi dengan arsitektur **Siloed Standalone App** yang memisahkan secara fisik dan logis dua domain utama:
* **Qualifa (Psikologi / Kesehatan Mental):** Menggunakan palet warna ungu/emerald, terminologi klinis HIMPSI, rekam medis DAP Note (Data, Assessment, Plan), dan terapi CCBT.
* **Justifiqa (Hukum & Litigasi):** Menggunakan palet warna biru/amber, terminologi legal Peradi, berkas perkara litigasi, dan kontrak dwi-bahasa ber-meterai elektronik.
* **Aturan Mutlak:** DILARANG KERAS mencampuradukkan ikon, teks, warna, atau link navigasi antara domain Qualifa dan Justifiqa. Setiap portal berdiri sendiri (*standalone*).

### 2. Traceability & Engineering Integrity
Setiap antarmuka (*screen*) yang didokumentasikan dalam katalog ini memiliki tautan ketertelusuran (*traceability link*) langsung menuju **Use Case Scenarios** dan struktur **ERD & Database Schema**. Tidak boleh ada tombol, form, atau aksi antarmuka yang dibuat tanpa rujukan spesifikasi di dalam dokumen ini.

---

## BAB 2: STANDAR 6 PILAR SPESIFIKASI LAYAR (*THE 6-PILLAR SPEC*)
Setiap halaman antarmuka wajib mematuhi 6 parameter pengujian berikut:
1. **Screen Metadata & ID:** Identifikasi unik layar dan rujukan use case.
2. **Role & Access Control:** Pembatasan persona pengguna (Klien vs Profesional vs Admin).
3. **Component Inventory:** Daftar wajib elemen visual, form, modal, dan indikator status.
4. **Interactive State Machine (Event ➔ Action ➔ Redirection):** Logika transisi state dan alur navigasi.
5. **Edge Cases & Error Handling:** Validasi kesalahan input dan batasan keamanan.
6. **Domain Compliance & Constraint:** Kepatuhan regulasi hukum (UU PDP, Permenkes, Peradi, HIMPSI).

---

## BAB 3: MASTER INVENTORY TABLE (20 HALAMAN SISTEM)

### A. Ekosistem Kesehatan Mental — QUALIFA (HIMPSI Siloed)
| Screen ID | Nama Layar | Nama File HTML | Target Role | Use Case Ref |
| :--- | :--- | :--- | :--- | :--- |
| **SCR-QLF-01** | Hub Portal Utama Qualifa | `mockup_dasbor_psikologi.html` | Publik / All Roles | Portal Navigation |
| **SCR-QLF-02** | Portal Autentikasi Qualifa | `mockup_auth_qualifa.html` | Klien, Psikolog SIPP | UC-01, UC-02, UC-07, UC-08 |
| **SCR-QLF-03** | Dasbor Pasien / Klien | `mockup_dashboard_psikologi_klien.html` | Pasien / Klien | UC-03, UC-09, UC-13 |
| **SCR-QLF-04** | Dasbor Mitra Psikolog SIPP | `mockup_dashboard_mitra_psikologi.html` | Psikolog SIPP | UC-08, UC-10, UC-14 |
| **SCR-QLF-05** | Katalog & Cari Psikolog | `mockup_katalog_qualifa.html` | Pasien / Klien | UC-03, UC-05 |
| **SCR-QLF-06A**| Workstation Klien (CCBT & Mood) | `mockup_modul_psikologi_klien.html` | Pasien / Klien | UC-09, UC-13 |
| **SCR-QLF-06B**| Workstation Klinis & DAP Note | `mockup_modul_psikologi_mitra.html` | Psikolog SIPP | UC-10, UC-14 |
| **SCR-QLF-07** | Ruang Konseling Tele-Psikologi | `mockup_chat_qualifa.html` | Klien & Psikolog | UC-05, UC-11 |
| **SCR-QLF-08** | Dasbor Admin HIMPSI | `mockup_admin_qualifa.html` | Admin HIMPSI | UC-06, UC-12 |

### B. Ekosistem Hukum & Litigasi — JUSTIFIQA (Peradi Siloed)
| Screen ID | Nama Layar | Nama File HTML | Target Role | Use Case Ref |
| :--- | :--- | :--- | :--- | :--- |
| **SCR-JST-01** | Portal Autentikasi Justifiqa | `mockup_auth_justifiqa.html` | Klien, Advokat Peradi | UC-01, UC-02, UC-07, UC-08 |
| **SCR-JST-02** | Dasbor Klien Hukum | `mockup_dashboard_hukum_klien.html` | Klien Hukum | UC-03, UC-09 |
| **SCR-JST-03** | Dasbor Advokat Mitra Peradi | `mockup_dashboard_mitra_hukum.html` | Advokat Peradi | SD-J-04, SD-J-10, J-UC09, J-UC18, J-UC19, UC-08, UC-10 |
| **SCR-JST-04** | Katalog & Cari Advokat | `mockup_katalog_justifiqa.html` | Klien Hukum | UC-03, UC-05 |
| **SCR-JST-05** | Workstation Kontrak & Litigasi | `mockup_modul_hukum.html` | Advokat & Klien | SD-J-06, J-UC11, J-UC12, J-UC14 |
| **SCR-JST-06** | Ruang Konsultasi Hukum E2EE & NDA | `mockup_chat_justifiqa.html` | Klien & Advokat | SD-J-03, SD-J-05, J-UC05, J-UC06, J-UC10, J-UC13 |
| **SCR-JST-07** | Dasbor Admin Peradi | `mockup_admin_justifiqa.html` | Admin Peradi | SD-J-09, SD-J-10, J-UC16, J-UC17, J-UC18 |

### C. Shared Infrastructure Gateway (Terisolasi Secara Logika per Portal)
| Screen ID | Nama Layar | Nama File HTML | Target Role | Use Case Ref |
| :--- | :--- | :--- | :--- | :--- |
| **SCR-SYS-01** | Siloed Domain Gateway | `mockup_auth.html` | Publik | Portal Gateway |
| **SCR-SYS-02** | Payment Gateway & Klaim | `mockup_payment_gateway.html` | Klien & Mitra | UC-04, UC-15 |
| **SCR-SYS-03** | Dasbor Admin Keuangan | `mockup_admin_keuangan.html` | Admin Keuangan | UC-16, UC-17 |
| **SCR-SYS-04** | Dasbor Admin Verifikasi | `mockup_admin_verifikasi.html` | Admin Verifikator | UC-06, UC-12 |
| **SCR-SYS-05** | Dasbor Admin Pelanggaran | `mockup_admin_pelanggaran.html` | Admin Etik & Hukum | UC-18, UC-19 |

---

## BAB 4: BLUEPRINT SPESIFIKASI LOGIKA PER HALAMAN

### 1. DOMAIN QUALIFA (PSIKOLOGI & KESEHATAN MENTAL)

#### `SCR-QLF-01` : Hub Portal Utama Qualifa (Landing Gate)
* **File HTML:** `mockup_dasbor_psikologi.html` | **Traceability:** Portal Navigation / Entry Hub
* **Access Control:** Publik / Semua Role.
* **Component Inventory Wajib:**
  - *Hero Section:* Judul Ekosistem Qualifa Psychology, Statistik Terapi (99.8% Kepuasan, 100% SIPP Validated).
  - *Portal Navigation Cards:* Kartu Akses Klien, Kartu Akses Mitra Psikolog, Kartu Akses Admin HIMPSI.
  - *Quick Links Footer:* Tautan cepat ke Katalog Psikolog, Ruang Konseling E2EE, Modul Asesmen, dan Portal Autentikasi Qualifa.
* **Interactive State Machine:**
  1. Klik Kartu Klien ➔ Redirect ke `mockup_auth_qualifa.html?role=klien` (Gerbang Autentikasi Klien).
  2. Klik Kartu Mitra ➔ Redirect ke `mockup_auth_qualifa.html?role=mitra` (Gerbang Autentikasi Psikolog).
  3. Klik Kartu Admin ➔ Redirect ke `mockup_admin_qualifa.html`.
  4. Klik Tautan Portal Autentikasi ➔ Redirect ke `mockup_auth_qualifa.html`.

#### `SCR-QLF-02` : Portal Autentikasi Qualifa
* **File HTML:** `mockup_auth_qualifa.html` | **Traceability:** UC-01, UC-02, UC-07, UC-08
* **Access Control:** Pasien/Klien dan Psikolog Klinis ber-SIPP.
* **Component Inventory Wajib:**
  - *Branding Section:* Logo Qualifa (`ph-brain`), Badge "100% Siloed Psychology", Banner Hotline Darurat Krisis Mental 119, Keterangan Enkripsi Rekam Medis WORM AES-256.
  - *Tab Selector:* Tab Klien / Pencari Konseling & Tab Psikolog Klinis SIPP (terpilih otomatis mengikuti parameter URL dari Hub `?role=klien` atau `?role=mitra`).
  - *Dynamic Register Fields (Aktif saat Register):* Input Nama Lengkap & Gelar, Input NIK / No. SIPP HIMPSI, Input No. WhatsApp Aktif.
  - *Auth Fields:* Input Email / Username, Input Password.
  - *Mitra Upload Dropzone (Aktif saat Register + Tab Mitra):* Upload Surat Izin Praktik Psikologi (SIPP/STR) & Upload Ijazah Magister Profesi.
  - *Modal:* **OTP Verification Modal (`#otpModal`)** dengan 4 digit kotak verifikasi.
* **Interactive State Machine:**
  1. *Toggle Mode:* Klik `"Daftar Sekarang"` ➔ Ubah teks tombol utama menjadi `"Daftar Akun Sekarang"` ➔ Tampilkan `#regFields` dan `#mitraUpload` (jika tab Mitra aktif).
  2. *Submit Register:* Klik Daftar ➔ Validasi kelengkapan form ➔ Tampilkan System Alert: *"Akun dengan NIK/Email tersebut sudah terdaftar di database Qualifa!"* ➔ Switch kembali ke Mode Login.
  3. *Submit Login:* Klik Masuk ➔ **Wajib memicu `#otpModal`** (Dilarang direct redirect).
  4. *Verify OTP:* Klik `"Verifikasi & Masuk Sekarang"` pada modal ➔ Cek role aktif: jika Mitra redirect ke `mockup_dashboard_mitra_psikologi.html`, jika Klien ke `mockup_dashboard_psikologi_klien.html`.
* **Domain Compliance:** UU PDP Pasal 15/16 (Perlindungan Data Medis Sensitif), Kode Etik HIMPSI (Verifikasi SIPP).

#### `SCR-QLF-03` : Dasbor Pasien / Klien Qualifa
* **File HTML:** `mockup_dashboard_psikologi_klien.html` | **Traceability:** UC-03, UC-09, UC-13
* **Access Control:** Khusus Pasien / Klien Terdaftar.
* **Component Inventory Wajib:**
  - *Header & Profile:* Nama Pasien, Status Paket Konseling, Tombol Notifikasi & Logout.
  - *Mood Tracker Widget:* Pemilih mood harian (Sangat Baik, Normal, Cemas, Depresi) dengan grafik tren mingguan.
  - *Active Session Card:* Jadwal konseling berikutnya, Nama Psikolog SIPP, Tombol `"Masuk Ruang Terapi WebRTC"`.
  - *CCBT Task Widget:* Daftar tugas terapi perilaku kognitif (worksheets) yang belum diselesaikan.
* **Interactive State Machine:**
  1. Klik Tombol `"Masuk Ruang Terapi WebRTC"` ➔ Redirect ke `mockup_chat_qualifa.html`.
  2. Klik Modul CCBT / Mood Tracker ➔ Redirect ke `mockup_modul_psikologi_klien.html`.
  3. Klik Cari Psikolog Baru ➔ Redirect ke `mockup_katalog_qualifa.html`.

#### `SCR-QLF-04` : Dasbor Mitra Psikolog SIPP
* **File HTML:** `mockup_dashboard_mitra_psikologi.html` | **Traceability:** UC-08, UC-10, UC-14
* **Access Control:** Khusus Psikolog Klinis Terverifikasi SIPP HIMPSI.
* **Component Inventory Wajib:**
  - *Header & Credential:* Nama Psikolog & Gelar, Badge "SIPP Active Validated", Tombol Status On-Call / Offline.
  - *Queue & Patient List:* Antrean pasien hari ini, indikator status kecemasan/depresi pasien (DASS-21 Score).
  - *Quick DAP Note Access:* Tombol akses cepat menuju workstation catatan klinis.
  - *Earnings & Escrow Summary:* Ringkasan honorarium konseling dan status pencairan dari rekening bersama.
* **Interactive State Machine:**
  1. Klik `"Mulai Sesi Terapi"` pada kartu pasien antrean ➔ Redirect ke `mockup_chat_qualifa.html`.
  2. Klik `"Workstation DAP Note"` ➔ Redirect ke `mockup_modul_psikologi_mitra.html`.

#### `SCR-QLF-05` : Katalog & Cari Psikolog HIMPSI
* **File HTML:** `mockup_katalog_qualifa.html` | **Traceability:** UC-03, UC-05
* **Access Control:** Pasien / Klien.
* **Component Inventory Wajib:**
  - *Search & Filter Bar:* Filter berdasarkan spesialisasi (Depresi, Kecemasan, Trauma, Pernikahan), filter rentang harga, dan filter metode (Video, Chat, Offline).
  - *Psychologist Profile Cards:* Foto psikolog, Gelar akademis, Nomor SIPP HIMPSI, Rating & Ulasan, Tarif per sesi, Tombol `"Jadwalkan Sesi"`.
  - *Subsidi & Voucher Badge:* Penanda terimanya voucher subsidi kesehatan mental.
* **Interactive State Machine:**
  1. Pilih filter spesialisasi ➔ Daftar kartu psikolog diperbarui secara dinamis.
  2. Klik `"Jadwalkan Sesi"` ➔ Redirect ke `mockup_payment_gateway.html` dengan parameter ID Psikolog dan Tarif.

#### `SCR-QLF-06A` : Workstation Klien (CCBT & Mood Tracker)
* **File HTML:** `mockup_modul_psikologi_klien.html` | **Traceability:** UC-09, UC-13
* **Access Control:** Pasien / Klien.
* **Component Inventory Wajib:**
  - *DASS-21 Assessment Tool:* Kuisioner evaluasi tingkat Depresi, Anxietas, dan Stres dengan perhitungan skor otomatis.
  - *Interactive CBT Worksheet:* Jurnal restrukturisasi kognitif (mencatat pikiran negatif dan respons adaptif).
  - *Audio Grounding & Meditation Player:* Pemutar audio relaksasi untuk penanganan serangan panik (*panic attack*).
* **Interactive State Machine:**
  1. Submit Kuisioner DASS-21 ➔ Sistem menghitung skor ➔ Menampilkan kategori (Normal / Sedang / Berat) ➔ Menyimpan data ke riwayat pasien untuk dilihat oleh Psikolog.

#### `SCR-QLF-06B` : Workstation Klinis & DAP Note Psikolog
* **File HTML:** `mockup_modul_psikologi_mitra.html` | **Traceability:** UC-10, UC-14
* **Access Control:** Khusus Psikolog SIPP (Klien DILARANG Akses).
* **Component Inventory Wajib:**
  - *Patient Selector:* Dropdown pemilih pasien klinis yang sedang ditangani.
  - *DAP Note Form Controls:* 3 panel textarea: **Data (D)** (Observasi visual/auditif), **Assessment (A)** (Diagnosis klinis DSM-5/ICD-10), dan **Plan (P)** (Rencana terapi & penugasan CCBT).
  - *WORM Security Badge:* Penanda bahwa rekam medis dilindungi enkripsi *Write-Once-Read-Many* (tidak dapat diubah setelah ditandatangani).
  - *Action Buttons:* Tombol `"Simpan & Kunci WORM"`, Tombol `"Kirim Tugas CBT ke Pasien"`.
* **Interactive State Machine:**
  1. Klik `"Simpan & Kunci WORM"` ➔ Validasi kolom terisi ➔ Form berubah menjadi Read-Only ➔ Muncul notifikasi penguncian digital ber-SIPP.

#### `SCR-QLF-07` : Ruang Konseling Tele-Psikologi E2EE
* **File HTML:** `mockup_chat_qualifa.html` | **Traceability:** UC-05, UC-11
* **Access Control:** Klien & Psikolog yang terhubung dalam sesi aktif.
* **Component Inventory Wajib:**
  - *Video/Audio Conference Panel:* Window Webrtc dengan tombol Mute, Camera Toggle, dan End Call.
  - *E2EE Chat Stream:* Area pesan teks terenkripsi *End-to-End Encryption*, indikator typing, dan timestamp.
  - *Clinical Sidebar (Khusus pandangan Mitra):* Panel catatan ringkas DAP Note yang bisa diisi sembari video call berlangsung.
  - *Panic/Crisis Button:* Tombol darurat untuk memicu protokol krisis mental (menghubungi kontak darurat atau hotline 119).
* **Interactive State Machine & Role-Aware Viewpoint Matrix:**
  - *Multi-Role Viewpoint Inversion Protocol:* Pada layar obrolan kolaboratif ini, arsitektur DOM wajib menerapkan pembalikan sudut pandang (*Role-Aware Perspective Inversion*) berdasarkan parameter URL `?role=`:
    | Elemen UI / DOM | Ketika URL: `?role=klien` (Default) | Ketika URL: `?role=mitra` (Workstation Psikolog) |
    | :--- | :--- | :--- |
    | **Topbar Identity** | Menampilkan Nama Psikolog Klinis & Spesialisasi | Menampilkan Nama Pasien / Klien & ID Sesi |
    | **Foto Profil Topbar** | Avatar Psikolog Profesional | Avatar Pasien / Klien |
    | **Gelembung Kanan (`.user`)** | Pesan Keluar Klien (Background Biru/Teal) | Pesan Keluar Psikolog (Background Ungu) |
    | **Gelembung Kiri (`.partner`)**| Pesan Masuk Psikolog | Pesan Masuk Klien |
    | **Input Placeholder** | `"Ketik pesan untuk Psikolog..."` | `"Ketik intervensi klinis / respons untuk Klien..."` |
  1. Klik Tombol `"End Call"` ➔ Sesi ditutup ➔ Klien diarahkan ke halaman pemberian rating/ulasan ➔ Psikolog diarahkan ke workstation `mockup_modul_psikologi_mitra.html` untuk finalisasi DAP Note.

#### `SCR-QLF-08` : Dasbor Admin HIMPSI
* **File HTML:** `mockup_admin_qualifa.html` | **Traceability:** UC-06, UC-12
* **Access Control:** Khusus Admin Verifikator & Dewan Etik HIMPSI.
* **Component Inventory Wajib (4-Tab Interactive Workstation):**
  - *Tab 1 (Dasbor Kepatuhan):* Statistik eksekutif psikolog klinis aktif, pasien kesehatan mental, audit trigger hotline 119, dan status latensi integrasi API Eksternal (HIMPSI Registry, Dukcapil, CDN, E2EE Vault).
  - *Tab 2 (Verifikasi SIPP Psikolog):* Tabel antrean pemeriksaan keabsahan Surat Izin Praktik Psikologi (SIPP) dengan tombol *Setujui* dan *Tolak*.
  - *Tab 3 (Log WORM Crisis 119):* Log audit immutable berenkripsi SHA-256 untuk panggilan darurat 119 dan akses rekam medis DAP Note.
  - *Tab 4 (Sidang Etik & Buffer Rule 30m):* Pengawasan durasi jeda istirahat wajib 30 menit antar sesi konseling (Burnout Rule) dan panel sidang etik.
* **Interactive State Machine:**
  1. Klik Menu Navigasi (`"Dasbor"`, `"Verifikasi SIPP"`, `"Log WORM"`, `"Sidang Etik"`) ➔ Switching antar tab view secara instan tanpa reload halaman.
  2. Klik `"Setujui"` pada antrean SIPP ➔ Status psikolog berubah menjadi terverifikasi & aktif di katalog Qualifa.
  3. Klik `"Audit Sesi"` pada tab Sidang Etik ➔ Menampilkan rekam jejak kepatuhan jeda istirahat klinis psikolog.

---

### 2. DOMAIN JUSTIFIQA (HUKUM & LITIGASI)

#### `SCR-JST-01` : Portal Autentikasi Justifiqa
* **File HTML:** `mockup_auth_justifiqa.html` | **Traceability:** UC-01, UC-02, UC-07, UC-08
* **Access Control:** Klien Hukum & Advokat Mitra Peradi.
* **Component Inventory Wajib:**
  - *Branding Section:* Logo Timbangan Hukum (`ph-scales`), Badge "100% Siloed Legal", Banner Bantuan Hukum Pro Bono Rp 0 (DTKS), Keterangan Enkripsi NDA Advokat-Klien.
  - *Tab Selector:* Tab Klien / Pencari Keadilan & Tab Advokat Mitra Peradi.
  - *Dynamic Register Fields (Aktif saat Register):* Input Nama Lengkap & Gelar (Sesuai BAS), Input NIK / No. NIA Peradi, Input No. WhatsApp.
  - *Auth Fields:* Input Email / Username, Input Password.
  - *Mitra Upload Dropzone (Aktif saat Register + Tab Mitra):* Upload Kartu Tanda Advokat (KTA Peradi) & Upload Berita Acara Sumpah (BAS) Pengadilan Tinggi.
  - *Modal:* **OTP Verification Modal (`#otpModal`)** dengan 6 digit kotak verifikasi interaktif (SD-J-02 MFA).
* **Interactive State Machine:**
  1. *Toggle Mode:* Klik `"Daftar Sekarang"` ➔ Ubah teks tombol utama menjadi `"Daftar Akun Sekarang"` ➔ Tampilkan `#regFields` dan `#mitraUpload` (jika tab Mitra aktif).
  2. *Submit Register (SD-J-01 3-Branch Execution):* Klik Daftar ➔ Validasi kelengkapan form ➔ (a) Jika NIK/Email default/exist ➔ Tampilkan System Alert 400: *"Akun sudah terdaftar!"*; (b) Jika tab Klien baru ➔ Verifikasi NIK Dukcapil 201 ➔ Alert *"Akun Klien Aktif"*; (c) Jika tab Advokat baru ➔ Verifikasi SIPP Peradi 201 ➔ Alert *"Pending Verification Audit Admin 1x24 Jam"*.
  3. *Submit Login (SD-J-02 4-Branch Execution):* Klik Masuk ➔ (a) Jika Email/Password mengandung 'salah' ➔ Alert 401 Unauthorized; (b) Jika Email mengandung 'block'/'suspend' ➔ Alert 403 Forbidden (Akun Ditangguhkan); (c) Jika kredensial cocok ➔ Generate OTP 6-Digit & pemicu `#otpModal` (Status 200 OK).
  4. *Verify OTP (SD-J-02 MFA):* Klik `"Verifikasi & Masuk Sekarang"` pada modal ➔ Jika input `000000` atau tidak valid ➔ Alert 400 Bad Request (OTP Salah/Kadaluarsa). Jika OTP valid ➔ Pembuatan JWT Token ➔ Cek role aktif: jika Mitra redirect ke `mockup_dashboard_mitra_hukum.html`, jika Klien ke `mockup_dashboard_hukum_klien.html`.
* **Domain Compliance:** UU Advokat No. 18 Tahun 2003, Keabsahan BAS Pengadilan Tinggi, e-Meterai PERURI.

#### `SCR-JST-02` : Dasbor Klien Hukum
* **File HTML:** `mockup_dashboard_hukum_klien.html` | **Traceability:** SD-J-07, J-UC15, UC-03, UC-09
* **Access Control:** Klien Hukum / Pencari Keadilan.
* **Component Inventory Wajib:**
  - *Case Tracker Widget:* Status perkembangan perkara hukum (Penyelidikan, Mediasi, Gugatan, atau Sidang).
  - *Contract & Document Safe:* Vault penyimpanan kontrak dwi-bahasa yang telah dibubuhi e-Meterai dan tanda tangan digital.
  - *Pro Bono Quota Card:* Indikator kelayakan subsidi bantuan hukum gratis berdasarkan verifikasi DTKS.
* **Interactive State Machine:**
  1. Klik `"Konsultasi dengan Advokat"` ➔ Redirect ke `mockup_chat_justifiqa.html`.
  2. Klik `"Buat / Review Kontrak Baru"` ➔ Redirect ke `mockup_modul_hukum.html`.
  3. Klik `"Cari Advokat Litigasi"` ➔ Redirect ke `mockup_katalog_justifiqa.html`.

#### `SCR-JST-03` : Dasbor Advokat Mitra Peradi
* **File HTML:** `mockup_dashboard_mitra_hukum.html` | **Traceability:** SD-J-04, SD-J-10, J-UC09, J-UC18, J-UC19, UC-08, UC-10
* **Access Control:** Advokat Mitra Terverifikasi Peradi.
* **Component Inventory Wajib:**
  - *Advocate Profile Header:* Nama, Gelar SH/MH, Nomor NIA Peradi, Status BAS Verified, dan Spesialisasi (Pidana/Perdata/Korporasi).
  - *Practice Availability Toggle & Conflict Simulator (SD-J-04 / J-UC09):* Toggle status praktik (Online/Offline) dilengkapi kotak centang simulasi konflik jadwal (Error 409 Conflict) untuk menguji penolakan perubahan status saat ada sesi konsultasi/sidang aktif.
  - *Active Litigation Workstation:* Daftar klien aktif, jadwal sidang pengadilan, dan tenggat waktu penyerahan memori banding/pledoi.
  - *Financial & PPh 21 Withdrawal Form (SD-J-10 / J-UC19):* Formulir pencairan dana escrow dengan kalkulasi otomatis pemotongan PPh Pasal 21 (5% tenaga ahli advokat) dan validasi Error 400 saldo tidak cukup.
  - *WORM Audit Log Table (SD-J-10 / J-UC18):* Tabel riwayat pencairan mutlak (*Write-Once-Read-Many*) yang menampilkan kode hash SHA-256 permanen 10 tahun dan unduhan Bukti Potong PPh 21.
* **Interactive State Machine:**
  1. Klik `"Buka Workstation Kontrak"` ➔ Redirect ke `mockup_modul_hukum.html`.
  2. Klik `"Masuk Ruang Chat Privileged (E2EE)"` ➔ Redirect ke `mockup_chat_justifiqa.html?role=mitra`.
  3. Klik Toggle `"Status Praktik"` ➔ Jika centang simulasi konflik aktif (SD-J-04 Langkah 171): sistem menolak perubahan dan menampilkan Error 409 Conflict. Jika aman: status diperbarui menjadi ONLINE / OFFLINE dengan respons sukses 200 OK.
  4. Klik `"💸 Tarik Dana Sekarang (200 OK)"` pada Workstation Keuangan ➔ Validasi saldo dan nominal ➔ Jika valid: memotong saldo aktif advokat secara real-time, menghitung PPh 21 (5%), menambahkan baris transaksi baru ke tabel WORM Log dengan hash SHA-256 dinamis, dan menampilkan resi transfer. Jika nominal melebihi saldo atau <= 0: memunculkan peringatan Error 400 Bad Request / 422 Unprocessable Entity.

#### `SCR-JST-04` : Katalog & Cari Advokat Peradi
* **File HTML:** `mockup_katalog_justifiqa.html` | **Traceability:** SD-J-07, J-UC15, UC-03, UC-05
* **Access Control:** Klien Hukum.
* **Component Inventory Wajib:**
  - *Search & Filter Bar:* Filter spesialisasi (Hukum Pidana, Perdata, Ketenagakerjaan, HAKI, Perceraian), filter lokasi domisili pengadilan, dan filter tarif konsultasi.
  - *Advocate Profile Cards:* Foto advokat, Nomor NIA Peradi, Pengalaman beracara (tahun), Rating klien, Tarif konsultasi per jam, dan Badge Pro Bono Available.
* **Interactive State Machine:**
  1. Klik `"Pilih & Lanjutkan Pembayaran"` ➔ Redirect ke `mockup_payment_gateway.html` dengan parameter ID Advokat dan Tarif Hukum.

#### `SCR-JST-04b` : Payment Gateway Escrow Justifiqa
* **File HTML:** `mockup_payment_gateway.html` | **Traceability:** SD-J-03, SD-J-07, J-UC15, UC-04, UC-05
* **Access Control:** Klien Hukum.
* **Component Inventory Wajib:**
  - *Escrow Holding Notice:* Penanda bahwa dana Rp250.000 ditahan secara aman di Rekening Escrow Sementara Justifiqa hingga sesi selesai.
  - *Payment Method Selector:* Kartu Kredit, E-Wallet, Virtual Account Bank Transfer, dan Voucher Subsidi Pro Bono SKTM (100% Gratis).
  - *Timeout & Failure Simulator Button:* Tombol simulasi transaksi expired/ditolak (UC-05 alternatif 5a/5b).
* **Interactive State Machine:**
  1. Klik `"Bayar Sekarang (Escrow)"` ➔ Simulasi webhook Midtrans PAID ➔ Status dana ditahan di Escrow (SD-J-03 Langkah 133) ➔ Redirect ke Dasbor Klien.
  2. Klik `"Simulasi Waktu Habis / Ditolak"` ➔ Menampilkan layer error transaksi expired/gagal ➔ Opsi coba metode pembayaran lain.

#### `SCR-JST-05` : Workstation Kontrak & Litigasi
* **File HTML:** `mockup_modul_hukum.html` | **Traceability:** SD-J-06, SD-J-08, J-UC11, J-UC12, J-UC14
* **Access Control:** Advokat & Klien (Hak edit dipisah sesuai role).
* **Component Inventory Wajib:**
  - *IRAC Note & Legal Analysis Tab (SD-J-08 / J-UC11):* Formulir analisis hukum terstruktur (Issue, Rule, Application, Conclusion) dengan pemilih Referensi Kasus/Sesi Klien (`Session ID`), opsi Visibilitas Catatan (Internal vs Bagikan ke Klien), dan opsi enkripsi WORM.
  - *Bilingual Contract & Legal Opinion Generator (SD-J-06 / J-UC12):* Editor interaktif untuk rancangan dokumen hukum (Legal Opinion, Somasi, Perjanjian Sewa) yang terhubung dengan template baku.
  - *e-Meterai PERURI Integration Modal (SD-J-06 / J-UC14):* Modul pembubuhan meterai elektronik sah Peruri Rp10.000 dengan pengecekan kuota (200 OK vs 402/502 Error) dan verifikasi SHA-256.
  - *Download Gate Controller (J-UC12 / J-UC14):* Proteksi akses unduhan dokumen akhir; klien hanya diizinkan mengunduh setelah pembubuhan e-Meterai diverifikasi sah (Error 403 Forbidden jika belum bermeterai).
* **Interactive State Machine:**
  1. Klik `"Simpan & Enkripsi IRAC ke WORM (J-UC11 200 OK)"` ➔ Sistem memvalidasi kelengkapan field IRAC (Error 400 jika kosong via tombol `"⚠️ Simulasi Error 400"`) ➔ Mengenkripsi AES-256, mencatat Session ID serta status Visibilitas, & menyimpan ke WORM Storage.
  2. Klik `"Terbitkan Dokumen & Bubuhkan e-Meterai (SD-J-06)"` ➔ Muncul Modal e-Meterai Peruri ➔ Pilih simulasi sukses (201 Created / 200 OK - Kuota Tersedia) atau gagal (402 Payment Required / 502 Bad Gateway - Kuota Habis/Gangguan API) ➔ Jika sukses, dokumen diberi stempel e-Meterai sah bersertifikat SHA-256 dan membuka *Download Gate* untuk klien.
  3. Klik `"Unduh Dokumen Hukum Resmi (Download Gate)"` ➔ Jika dokumen sudah bermeterai sah, sistem memulai unduhan PDF bersertifikat (200 OK). Jika masih berstatus Draf Tanpa Meterai, sistem memunculkan peringatan penolakan unduhan (*Download Gate Error 403 Forbidden*).

#### `SCR-JST-06` : Ruang Konsultasi Hukum E2EE & NDA
* **File HTML:** `mockup_chat_justifiqa.html` | **Traceability:** SD-J-03, SD-J-05, UC-05, UC-06, UC-11, J-UC13
* **Access Control:** Klien & Advokat yang bertaut dalam perkara.
* **Component Inventory Wajib:**
  - *NDA Shield Banner:* Penanda visual bahwa seluruh komunikasi dilindungi oleh hak imunitas advokat dan perjanjian kerahasiaan (*Non-Disclosure Agreement*).
  - *Secure Document Vault Table:* Area berbagi bukti berkas perkara (foto bukti, somasi, surat gugatan) dengan watermark digital.
  - *Encrypted Messaging & Audio Call:* Panel komunikasi real-time anti-serapan.
  - *Zero-Knowledge E2EE Upload Modal (SD-J-05 / J-UC13):* Modal interaktif untuk simulasi upload bukti perkara yang memvalidasi ukuran file (maks 15 MB), format (PDF/JPG), pemindaian virus/malware *client-side*, enkripsi lokal dengan *Session Key*, dan penyimpanan WORM ber-hash SHA-256.
  - *Escrow Release & Rating Modal (SD-J-03 / J-UC06):* Modal penilaian 5 bintang interaktif dan ulasan yang otomatis muncul saat mengakhiri sesi, memicu pelepasan dana escrow ke rekening advokat setelah dipotong fee 25% & PPh 21.
* **Interactive State Machine & Role-Aware Viewpoint Matrix:**
  - *Multi-Role Viewpoint Inversion Protocol:* Pada layar obrolan kolaboratif ini, arsitektur DOM wajib menerapkan pembalikan sudut pandang (*Role-Aware Perspective Inversion*) berdasarkan parameter URL `?role=`:
    | Elemen UI / DOM | Ketika URL: `?role=klien` (Default) | Ketika URL: `?role=mitra` (Workstation Advokat) |
    | :--- | :--- | :--- |
    | **Topbar Identity** | Menampilkan Nama Advokat & Spesialisasi | Menampilkan Nama Klien & ID Perkara |
    | **Foto Profil Topbar** | Avatar Advokat Profesional | Avatar Klien |
    | **Gelembung Kanan (`.user`)** | Pesan Keluar Klien (Background Biru/Teal) | Pesan Keluar Advokat (Background Kuning/Emas) |
    | **Gelembung Kiri (`.partner`)**| Pesan Masuk Advokat | Pesan Masuk Klien |
    | **Input Placeholder** | `"Ketik pesan konsultasi untuk Advokat..."` | `"Ketik nasihat hukum / respons untuk Klien..."` |
  1. Klik `"Unggah Bukti (J-UC13)"` ➔ Muncul Modal E2EE Upload ➔ Pilih file & jalankan simulasi pemindaian virus serta enkripsi Zero-Knowledge ➔ Jika aman dan sesuai aturan, file terenkripsi diunggah ke WORM Storage dan muncul di ruang obrolan dengan stempel *"PRIVILEGED LEGAL EVIDENCE"*. Jika ada virus (3a) atau ukuran > 15 MB (3b), sistem memunculkan error penolakan 400/413.
  2. Klik dokumen pada obrolan / tombol `"Unduh Bukti (SD-J-05)"` ➔ Sistem mengambil *encrypted blob* dari WORM dan melakukan dekripsi lokal dengan *Session Key* ➔ Menampilkan detail hash SHA-256 dan isi berkas utuh di workstation advokat.
  3. Klik `"Akhiri Sesi Litigasi"` ➔ Konfirmasi ➔ Untuk Klien: memunculkan Modal Rating J-UC06 (bisa isi ulasan atau skip) dan melepas dana escrow ➔ Redirect ke Dasbor Klien. Untuk Mitra Advokat: mencairkan dana escrow ke saldo ➔ Redirect ke Workstation IRAC Note.

#### `SCR-JST-07` : Dasbor Admin Peradi
* **File HTML:** `mockup_admin_justifiqa.html` | **Traceability:** SD-J-09, SD-J-10, J-UC16, J-UC17, J-UC18
* **Access Control:** Admin Verifikator & Dewan Kehormatan Peradi.
* **Component Inventory Wajib:**
  - *KTA & BAS Verification Table (SD-J-09 / J-UC16):* Antrean pemeriksaan keaslian Nomor Induk Advokat (NIA / SIPP) dan Berita Acara Sumpah (BAS) dari Pengadilan Tinggi untuk advokat baru dengan pengecekan langsung ke Pangkalan Data MA.
  - *Code of Ethics & Moderation Tribunal Panel (SD-J-09 / J-UC17):* Panel penanganan laporan masyarakat terkait dugaan pelanggaran kode etik advokat dengan fitur penahanan akun darurat (*Due Process Suspend*).
  - *Pro Bono & WORM Auditor:* Pengawasan penyaluran dana bantuan hukum prasejahtera berbasis verifikasi DTKS serta pemantauan log hash WORM 10 tahun.
* **Interactive State Machine:**
  1. Klik `"✅ Setujui (Approve — 200 OK)"` pada antrean verifikasi ➔ Status advokat diubah menjadi `AKTIF / VERIFIED` di katalog Justifiqa ➔ Mengirimkan email notifikasi aktivasi siap praktik.
  2. Klik `"❌ Tolak (Reject — 400 Bad Request)"` pada antrean verifikasi ➔ Muncul prompt input Alasan Penolakan (wajib diisi) ➔ Status advokat diubah menjadi `REJECTED` ➔ Mengirimkan email penjelasan penolakan hukum.
  3. Klik `"🛑 Suspend Akun (Due Process — 200 OK)"` pada panel moderasi ➔ Muncul prompt input Alasan Penahanan Akun (wajib diisi) ➔ Status advokat diubah menjadi `SUSPENDED (Due Process)` ➔ Mengeluarkan surat panggilan klarifikasi internal untuk jadwal Sidang Etik Dewan Kehormatan Peradi.

---

### 3. SHARED INFRASTRUCTURE GATEWAY

#### `SCR-SYS-01` : Siloed Domain Gateway Selector
* **File HTML:** `mockup_auth.html` | **Traceability:** Portal Gateway
* **Access Control:** Publik / Semua Pengguna.
* **Component Inventory Wajib:**
  - *Gateway Header:* Judul Gateway Isolasi Domain, Keterangan prinsip Zero Percampuran Lintas Domain.
  - *Domain Selection Cards:*
    - **Kartu Qualifa Psychology:** Tema Ungu, Ikon Otak, deskripsi portal kesehatan mental HIMPSI.
    - **Kartu Justifiqa Legal:** Tema Biru, Ikon Timbangan, deskripsi portal konsultasi hukum Peradi.
* **Interactive State Machine:**
  1. Klik Kartu Qualifa ➔ Redirect tepat ke `mockup_auth_qualifa.html`.
  2. Klik Kartu Justifiqa ➔ Redirect tepat ke `mockup_auth_justifiqa.html`.

#### `SCR-SYS-02` : Payment Gateway & Klaim
* **File HTML:** `mockup_payment_gateway.html` | **Traceability:** UC-04, UC-15
* **Access Control:** Klien & Mitra Profesional.
* **Component Inventory Wajib:**
  - *Order Breakdown:* Rincian biaya layanan (Konseling Psikologi / Konsultasi Hukum), biaya admin, dan total bayar.
  - *Payment Method Selector:* Virtual Account Bank (BCA, Mandiri, BRI), QRIS, E-Wallet (Gopay, OVO, Dana), dan **Klaim Asuransi / Voucher Subsidi Pro Bono**.
  - *Escrow Account Protection Badge:* Penanda bahwa dana ditahan di rekening bersama (*escrow*) dan baru diteruskan ke mitra setelah sesi layanan selesai dan diverifikasi.
* **Interactive State Machine (4 State Wajib — Sinkronisasi SD UC-04/UC-05):**
  1. *Processing State:* Klik `"Bayar Sekarang"` ➔ Memunculkan Layer Modal *"⏳ Pembayaran Sedang Diproses..."* (simulasi latensi verifikasi Webhook Midtrans selama 1.8 detik).
  2. *Success & Webhook State:* Status berubah menjadi *SETTLEMENT_CONFIRMED (200 OK)* ➔ Menampilkan konfirmasi hijau *"✅ Pembayaran Terkonfirmasi!"* ➔ Auto-redirect ke Dasbor Klien (`mockup_dashboard_psikologi_klien.html` atau `mockup_dashboard_hukum_klien.html`).
  3. *Dashboard Auto-Refresh State:* Saat Dasbor Klien terbuka ➔ Menangkap parameter transaksi baru (`?demo_confirm=1`) ➔ Menampilkan Banner Top Toast *"⏳ Pembayaran Terkonfirmasi, refresh sistem dalam 2 detik..."* ➔ Setelah jeda 2 detik, sistem memperbarui daftar mitra pesanan secara dinamis dan otomatis membuka Modal Daftar Langganan Aktif.
  4. *Exception State:* Layer modal `#paymentFailedState` siap menangani kondisi transaksi expired atau saldo tidak mencukupi tanpa menutupi layar pada awal pemuatan (`display: none`).

#### `SCR-SYS-03` : Dasbor Admin Keuangan & Escrow
* **File HTML:** `mockup_admin_keuangan.html` | **Traceability:** UC-16, UC-17
* **Access Control:** Admin Keuangan Pusat.
* **Component Inventory Wajib:**
  - *Escrow Liquidity Monitor:* Total dana tertahan di rekening bersama, total penarikan mitra, dan total subsidi pro bono yang tersalurkan.
  - *Disbursement Approval Queue:* Daftar permintaan penarikan saldo (*withdrawal*) dari mitra advokat dan psikolog.
  - *Financial Audit Log:* Pencatatan seluruh transaksi masuk dan keluar secara mutlak (*immutable ledger*).
* **Interactive State Machine:**
  1. Klik `"Setujui Pencairan Dana"` ➔ Saldo diteruskan ke rekening bank mitra ➔ Status transaksi berubah menjadi *Completed*.

#### `SCR-SYS-04` : Dasbor Admin Verifikasi Pusat
* **File HTML:** `mockup_admin_verifikasi.html` | **Traceability:** UC-06, UC-12
* **Access Control:** Admin Verifikator Pusat.
* **Component Inventory Wajib:**
  - *Cross-Domain Credential Feed:* Panel antrean terpadu dengan pemisahan tab jelas: **Tab Verifikasi SIPP Psikolog** vs **Tab Verifikasi BAS Advokat**.
  - *Document Viewer:* Preview dokumen PDF/JPG beresolusi tinggi untuk mengecek cap basah pengadilan atau organisasi profesi.
* **Interactive State Machine:**
  1. Klik tombol `"Tolak Verifikasi (Dokumen Buram/Palsu)"` ➔ Muncul modal input alasan penolakan ➔ Email pemberitahuan dikirimkan ke pendaftar.

#### `SCR-SYS-05` : Dasbor Admin Penanganan Pelanggaran
* **File HTML:** `mockup_admin_pelanggaran.html` | **Traceability:** UC-18, UC-19
* **Access Control:** Admin Etik & Kepatuhan Hukum.
* **Component Inventory Wajib:**
  - *Dispute & Complaint Table:* Laporan sengketa layanan, keluhan ketidakpuasan klien, atau dugaan pelanggaran kode etik.
  - *Evidence Review Panel:* Akses log audit komunikasi (dengan izin dewan etik) untuk verifikasi klaim sengketa.
  - *Sanction Controls:* Tombol pembekuan akun mitra sementara (*Temporary Suspend*) atau pencabutan kemitraan permanen (*Permanent Ban*).
* **Interactive State Machine:**
  1. Klik `"Bekukan Akun Mitra"` ➔ Akses mitra ke workstation klinis/hukum langsung dicabut saat itu juga (*revoked*).

---

## BAB 5: VERIFIKASI KEPATUHAN & PENUTUP
Dokumen spesifikasi ini berlaku sebagai **kesepakatan final arsitektur antarmuka**. Seluruh implementasi kode pada tahap frontend maupun penulisan skema database ERD pada tahap selanjutnya wajib berpatokan pada inventaris komponen, aturan hak akses, dan logika *state machine* yang tertuang di dalam katalog ini.

**=== END OF SPECIFICATION GUIDE ===**
