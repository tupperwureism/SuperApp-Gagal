# Traceability Matrix — Arsitektur 100% Siloed (Justifiqa & Qualifa)

**Versi**: 2.0 (Refactored untuk Opsi B - Standalone Apps Tanpa Medis)  
**Tanggal**: 03 Juli 2026  
**Cakupan**: 21 Use Case Justifiqa (Hukum) + 21 Use Case Qualifa (Psikologi) = **42 Use Case Mandiri**

Dokumen ini memetakan pelacakan penuh (*end-to-end traceability*) dari level **Use Case UML**, **Activity Diagram (AD)**, **Sequence Diagram (SD)**, hingga ke **Product Backlog Story ID (ST)** dan **Regulasi Kepatuhan** untuk kedua aplikasi yang terisolasi total.

---

## BAGIAN I: TRACEABILITY MATRIX — APLIKASI MANDIRI JUSTIFIQA (21 USE CASE HUKUM)

| UC-ID | Nama Use Case Hukum | Aktor Utama | Activity Diagram | Sequence Diagram | Backlog Story ID | Regulasi & Kepatuhan Kunci | Compliance Flags & Security |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **J-UC01** | Registrasi Akun Klien Justifiqa | Klien Hukum | AD-J-01 | SD-J-01 | **ST-J-01** | UU PDP Pasal 15, 16, 17 | Validasi NIK Dukcapil, Consent SHA-256, FieldEnc |
| **J-UC02** | Login Akun Klien Justifiqa | Klien Hukum | AD-J-02 | SD-J-02 | **ST-J-02** | UU PDP Pasal 46, Security | MFA OTP, TLS 1.3, Due Process Lock Check |
| **J-UC03** | Memilih & Memfilter Katalog Advokat | Klien Hukum | AD-J-03 | SD-J-03 | **ST-J-05** | UU 18/2003 Advokat | Filter SIPP Peradi Aktif, Geo-location Radius |
# Traceability Matrix — Arsitektur 100% Siloed (Justifiqa & Qualifa)

**Versi**: 2.0 (Refactored untuk Opsi B - Standalone Apps Tanpa Medis)  
**Tanggal**: 03 Juli 2026  
**Cakupan**: 21 Use Case Justifiqa (Hukum) + 21 Use Case Qualifa (Psikologi) = **42 Use Case Mandiri**

Dokumen ini memetakan pelacakan penuh (*end-to-end traceability*) dari level **Use Case UML**, **Activity Diagram (AD)**, **Sequence Diagram (SD)**, hingga ke **Product Backlog Story ID (ST)** dan **Regulasi Kepatuhan** untuk kedua aplikasi yang terisolasi total.

---

## BAGIAN I: TRACEABILITY MATRIX — APLIKASI MANDIRI JUSTIFIQA (21 USE CASE HUKUM)

| UC-ID | Nama Use Case Hukum | Aktor Utama | Activity Diagram | Sequence Diagram | Backlog Story ID | Regulasi & Kepatuhan Kunci | Compliance Flags & Security |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **J-UC01** | Registrasi Akun Klien Justifiqa | Klien Hukum | AD-J-01 | SD-J-01 | **ST-J-01** | UU PDP Pasal 15, 16, 17 | Validasi NIK Dukcapil, Consent SHA-256, FieldEnc |
| **J-UC02** | Login Akun Klien Justifiqa | Klien Hukum | AD-J-02 | SD-J-02 | **ST-J-02** | UU PDP Pasal 46, Security | MFA OTP, TLS 1.3, Due Process Lock Check |
| **J-UC03** | Memilih & Memfilter Katalog Advokat | Klien Hukum | AD-J-03 | SD-J-03 | **ST-J-05** | UU 18/2003 Advokat | Filter SIPP Peradi Aktif, Geo-location Radius |
| **J-UC04** | Melakukan Konsultasi Hukum E2EE | Klien & Advokat | AD-J-03 | SD-J-03 | **ST-J-08** | UU 18/2003 (Privilege) | E2EE Zero-Knowledge, Watermark Privileged, Timer Lock |
| **J-UC05** | Membayar Biaya Konsultasi Escrow | Klien Hukum | AD-J-03 | SD-J-03 | **ST-J-07** | PSAK 71, Keuangan | Payment Gateway Idempotent, Escrow Platform Hold |
| **J-UC06** | Memberikan Ulasan & Rating Advokat | Klien Hukum | AD-J-13 | SD-J-13 | **ST-J-14** | UU PDP, Kode Etik Peradi | Blocking Modal, **Anonimisasi Total Nama Klien** |
| **J-UC07** | Registrasi Akun Advokat / Notaris | Advokat/Notaris | AD-J-01 | SD-J-01 | **ST-J-03** | UU 18/2003, Peradi | Upload Kredensial AES-256, WORM Storage, Anti-Duplikasi |
| **J-UC08** | Login Akun Advokat Justifiqa | Advokat/Notaris | AD-J-02 | SD-J-02 | **ST-J-04** | ISO 27001 Security | MFA TOTP Mandatory, Lock 30 Mnt pasca-3x Gagal |
| **J-UC09** | Mengatur Status Online & Jam Praktik | Advokat Justifiqa| AD-J-04 | SD-J-04 | **ST-J-06** | Kode Etik Advokat | Sync Jadwal Sidang/Praktik, Real-time Toggle |
| **J-UC10** | Melayani Sesi Chat Konsultasi | Advokat Justifiqa| AD-J-03 | SD-J-03 | **ST-J-09** | SLA LBH/Peradi | SLA 5 Menit Respons, Auto-Refund if Missed |
| **J-UC11** | Membuat Catatan Sesi IRAC Note | Advokat Justifiqa| AD-J-08 | SD-J-08 | **ST-J-11** | Privilege Advokat | Struktur IRAC, AES-256, WORM Retensi 10 Tahun |
| **J-UC12** | Membuat Draf Opini Hukum / Kontrak | Advokat Justifiqa| AD-J-06 | SD-J-06 | **ST-J-12** | UU 10/2020 Bea Meterai | Generator Klausul Pintar, Versioning v1/Final |
| **J-UC13** | Mengunggah Bukti Perkara Zero-Knowledge| Klien Hukum | AD-J-05 | SD-J-05 | **ST-J-10** | UU 18/2003 (Privilege) | Zero-Knowledge E2EE, Scan Malware, Stempel Evidence |
| **J-UC14** | Merender Draf Kontrak & e-Meterai Peruri| Advokat & Klien | AD-J-14 | SD-J-14 | **ST-J-12** | UU ITE, UU Bea Meterai | Integrasi Mekari Sign API e-Meterai Rp10.000, Download Gate |
| **J-UC15** | Mengajukan Konsultasi Pro Bono SKTM | Klien Hukum | AD-J-07 | SD-J-07 | **ST-J-13** | UU 16/2011 Bantuan Hukum| Verifikasi API Dukcapil/DTKS, Tiket Rp0, Quota 3/bln |
| **J-UC16** | Memverifikasi Kredensial Advokat | Admin Justifiqa | AD-J-09 | SD-J-09 | **ST-J-15** | MA & Peradi Database | Cross-Check API MA/Peradi, WORM Decision Log |
| **J-UC17** | Moderasi Etik & Suspend Due Process | Admin Justifiqa | AD-J-10 | SD-J-10 | **ST-J-16** | Due Process of Law | Warning 1-3, Surat Suspend SHA-256, Banding 14 Hari |
| **J-UC18** | Memantau Laporan Keuangan Escrow | Admin Justifiqa | AD-J-12 | SD-J-12 | **ST-J-17** | PSAK 71, UU HPP | Revenue Share (25% Platform / 75% Advokat), Hashed Export |
| **J-UC19** | Mencairkan Dana Escrow & PPh 21 | Advokat Justifiqa| AD-J-11 | SD-J-11 | **ST-J-17** | PER-16/PJ/2016, UU TPPU | Auto Potong PPh 21, Cross-Check Rekening Bank vs SIPP |
| **J-UC20** | Autentikasi Portal Backoffice Admin | Admin Justifiqa | AD-J-20 | SD-J-20 | **ST-J-18** | ISO 27001 Security | IP Whitelisting Subdomain, MFA TOTP Mandatory |
| **J-UC21** | Melaporkan Pelanggaran Etik Advokat | Klien Hukum | AD-J-21 | SD-J-21 | **ST-J-19** | Kode Etik Peradi, UU ITE | Whistleblowing Form, Lampiran Log E2EE SHA-256 |

---

## BAGIAN II: TRACEABILITY MATRIX — APLIKASI MANDIRI QUALIFA (21 USE CASE PSIKOLOGI)

| UC-ID | Nama Use Case Psikologi | Aktor Utama | Activity Diagram | Sequence Diagram | Backlog Story ID | Regulasi & Kepatuhan Kunci | Compliance Flags & Security |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Q-UC01** | Registrasi Akun Klien Qualifa | Klien Psikologi | AD-Q-01 | SD-Q-01 | **ST-Q-01** | UU PDP, UU 18/2014 | Kontak Darurat Wali Wajib, Informed Consent SHA-256 |
| **Q-UC02** | Login Akun Klien Qualifa | Klien Psikologi | AD-Q-02 | SD-Q-02 | **ST-Q-02** | UU PDP Pasal 46 | MFA OTP, TLS 1.3, Cek Status Suspend Etik |
| **Q-UC03** | Memilih & Memfilter Katalog Psikolog | Klien Psikologi | AD-Q-03 | SD-Q-03 | **ST-Q-05** | Kode Etik HIMPSI | Filter STR Klinis / SIPP HIMPSI Aktif, Tarif Real-time |
| **Q-UC04** | Melakukan Konseling Klinis E2EE | Klien & Psikolog | AD-Q-03 | SD-Q-03 | **ST-Q-08** | UU 18/2014, HIMPSI | Ruang Terapi E2EE, Timer Auto-Close, Watermark Rahasia |
| **Q-UC05** | Membayar Biaya Konseling Klinis | Klien Psikologi | AD-Q-04 | SD-Q-03 | **ST-Q-07** | PSAK 71, Keuangan | Payment Gateway Idempotent, Rekening Penampungan |
| **Q-UC06** | Memberikan Ulasan & Rating Psikolog | Klien Psikologi | AD-Q-05 | SD-Q-10 | **ST-Q-14** | Kode Etik HIMPSI | Blocking Modal, **Clinical Evaluation Alert if <= 2 Bintang** |
| **Q-UC07** | Registrasi Akun Psikolog Klinis | Psikolog Klinis | AD-Q-01 | SD-Q-01 | **ST-Q-03** | HIMPSI, Kemenkes | Upload STR Klinis & Kartu HIMPSI AES-256, WORM |
| **Q-UC08** | Login Akun Psikolog Qualifa | Psikolog Klinis | AD-Q-02 | SD-Q-02 | **ST-Q-04** | ISO 27001 Security | MFA TOTP Mandatory, Lock 30 Mnt pasca-3x Gagal |
| **Q-UC09** | Mengatur Jam Praktik & Buffer Rule | Psikolog Klinis | AD-Q-06 | SD-Q-04 | **ST-Q-06** | Pedoman HIMPSI | **Mandatory Buffer Rule 30 Menit Antar Sesi Konseling** |
| **Q-UC10** | Melayani Sesi Konseling Klinis | Psikolog Klinis | AD-Q-03 | SD-Q-03 | **ST-Q-09** | SLA Klinis HIMPSI | SLA 5 Menit Kehadiran, Auto-Refund if Missed |
| **Q-UC11** | Membuat Catatan Terapi DAP Note | Psikolog Klinis | AD-Q-07 | SD-Q-08 | **ST-Q-13** | Kode Etik HIMPSI | Struktur DAP Note, AES-256, WORM Retensi 20 Tahun |
| **Q-UC12** | Menugaskan Worksheet CCBT | Psikolog Klinis | AD-Q-07 | SD-Q-08 | **ST-Q-13** | Terapi Kognitif Perilaku | Interaktif Worksheet terintegrasi grafik Mood Tracker |
| **Q-UC13** | Mengisi Jurnal Mood Tracker Harian | Klien Psikologi | AD-Q-08 | SD-Q-05 | **ST-Q-10** | UU PDP Data Sensitif | Zero-Knowledge E2EE, **Proactive Wellness Alert (5 Hari)** |
| **Q-UC14** | Mendengarkan Audio Meditasi CDN | Klien Psikologi | AD-Q-09 | SD-Q-06 | **ST-Q-11** | Psikoedukasi HIMPSI | Kurasi Dewan Ahli, Adaptive Bitrate Streaming CDN |
| **Q-UC15** | Mengisi Asesmen Klinis DASS-21 | Klien Psikologi | AD-Q-10 | SD-Q-07 | **ST-Q-12** | WHO mhGAP, HIMPSI | **Mandatory Crisis Protocol 119 (Lock 10s if Severe/Extreme)** |
| **Q-UC16** | Memverifikasi STR & SIPP HIMPSI | Admin Qualifa | AD-Q-05 | SD-Q-09 | **ST-Q-15** | Pangkalan Data HIMPSI | Cross-Check API HIMPSI / Kemenkes, WORM Log |
| **Q-UC17** | Moderasi Komite Etik Psikologi | Admin Qualifa | AD-Q-05 | SD-Q-09 | **ST-Q-16** | Kode Etik HIMPSI Bab V | Hearing Etik Virtual, Suspend Akun, Laporan HIMPSI Pusat |
| **Q-UC18** | Memantau Laporan Keuangan Qualifa | Admin Qualifa | AD-Q-11 | SD-Q-11 | **ST-Q-17** | PSAK 71, UU HPP | Revenue Share (20% Platform / 80% Psikolog), Hashed Export |
| **Q-UC19** | Manajemen Honor & Potong PPh 21 | Psikolog Klinis | AD-Q-10 | SD-Q-10 | **ST-Q-17** | PER-16/PJ/2016, UU TPPU | Auto Potong PPh 21, Cross-Check Rekening Bank vs STR |
| **Q-UC20** | Autentikasi Portal Backoffice Admin | Admin Qualifa | AD-Q-20 | SD-Q-20 | **ST-Q-18** | ISO 27001 Security | IP Whitelisting Subdomain, MFA TOTP Mandatory |
| **Q-UC21** | Melaporkan Malpraktik & Etik Psikolog| Klien Psikologi | AD-Q-05 | SD-Q-09 | **ST-Q-19** | Kode Etik HIMPSI Bab V| Whistleblowing Form, Transkrip Sesi Darurat WORM |
