# Kumpulan Kode PlantUML: Sequence Diagrams - 100% Siloed Architecture (Justifiqa & Qualifa)

Dokumen ini berisi kumpulan kode PlantUML untuk seluruh Sequence Diagram pada dua aplikasi mandiri yang **100% terisolasi dan berdiri sendiri (*Siloed Architecture*)**: **Justifiqa** (Domain Hukum) dan **Qualifa** (Domain Psikologi). Penomoran diagram telah distandarisasi untuk mencerminkan arsitektur terisolasi dan bersesuaian 1-to-1 dengan Activity Diagram: **`SD-J-xx`** untuk Justifiqa dan **`SD-Q-xx`** untuk Qualifa.

---

## Cara Import ke Draw.io
1. Buka Draw.io (`app.diagrams.net`).
2. Pada toolbar bagian atas, klik tombol **+ (Insert)** atau pilih menu **Arrange -> Insert**.
3. Pilih **Advanced -> PlantUML...**.
4. Salin dan tempel kode di bawah ini, lalu klik **Insert**.

---

## BAGIAN I: SEQUENCE DIAGRAMS - APLIKASI MANDIRI JUSTIFIQA (DOMAIN HUKUM)

### SD-J-01: Registrasi Akun Klien & Advokat (J-UC01, J-UC07)
*Sequence diagram alur pendaftaran akun mandiri Klien (verifikasi NIK Dukcapil) dan Advokat/Notaris (verifikasi SIPP Peradi) di platform Justifiqa.*

```plantuml
@startuml
autonumber
actor "Pengguna (Klien/Advokat)" as User
participant "Frontend Justifiqa App" as FE
participant "Backend Independen Justifiqa" as BE
database "Database Justifiqa" as DB
participant "API Dukcapil / Peradi" as Ext

User -> FE : Buka Halaman Registrasi & Pilih Jenis Akun
FE -> User : Tampilkan Formulir Registrasi Spesifik Justifiqa
User -> FE : Isi Data Diri & Unggah Dokumen Kredensial (KTP/SIPP)
FE -> BE : POST /api/v1/auth/register (Payload & Files)

BE -> DB : Check Existing Email/No HP/NIK
DB --> BE : Status Uniqueness Result

alt Email / No HP / NIK Sudah Terdaftar
    BE --> FE : 400 Bad Request (Akun Sudah Ada)
    FE --> User : Tampilkan Error "Kredensial Sudah Terdaftar"
else Kredensial Baru & Valid
    alt Jenis Akun = Klien (Pencari Keadilan)
        BE -> Ext : Verify NIK & KK to API Dukcapil
        Ext --> BE : Validasi NIK Cocok
        BE -> DB : Insert Klien (Status: AKTIF)
        DB --> BE : Success DB Insert
        BE --> FE : 201 Created (Registrasi Sukses)
        FE --> User : Arahkan ke Halaman Login Justifiqa
    else Jenis Akun = Advokat / Notaris
        BE -> DB : Insert Advokat (Status: PENDING_VERIFICATION)
        DB --> BE : Success DB Insert
        BE -> BE : Add to Admin Audit Queue (Verifikasi SIPP/Peradi)
        BE --> FE : 201 Created (Menunggu Verifikasi Admin)
        FE --> User : Tampilkan Pesan "Menunggu Audit Admin 1x24 Jam"
    end
end
@enduml
```

---

### SD-J-02: Login Akun Klien & Advokat (J-UC02, J-UC08)
*Sequence diagram alur masuk (login) independen beserta verifikasi Multi-Factor Authentication (MFA / 2FA).*

```plantuml
@startuml
autonumber
actor "Pengguna Justifiqa" as User
participant "Frontend Justifiqa App" as FE
participant "Backend Independen Justifiqa" as BE
database "Database Justifiqa" as DB
participant "SMS / Email Gateway" as SMS

User -> FE : Masukkan Email/No HP & Password
FE -> BE : POST /api/v1/auth/login (Credentials)

BE -> DB : Query User by Email/No HP
DB --> BE : Return User Record & Password Hash

alt Kredensial Tidak Cocok
    BE --> FE : 401 Unauthorized (Kredensial Salah)
    FE --> User : Tampilkan Error & Sisa Percobaan Login
else Kredensial Cocok
    alt Status Akun = SUSPENDED (Due Process Legal)
        BE --> FE : 403 Forbidden (Akun Diblokir Sementara)
        FE --> User : Tampilkan Error Akun Dalam Pemeriksaan
    else Status Akun = AKTIF
        BE -> BE : Generate OTP 6-Digit (Expire 5 Menit)
        BE -> SMS : Kirim Kode OTP via SMS / WhatsApp / Email
        SMS --> User : Terima Pesan Kode OTP
        BE --> FE : 200 OK (OTP Sent, Waiting Verification)
        FE --> User : Tampilkan Layar Input OTP
        
        User -> FE : Masukkan Kode OTP 6-Digit
        FE -> BE : POST /api/v1/auth/verify-otp (User ID, OTP)
        
        alt OTP Valid & Belum Expire
            BE -> DB : Update Last Login Timestamp
            BE -> BE : Generate JWT Session Token Justifiqa
            BE --> FE : 200 OK (JWT Token, User Profile)
            FE --> User : Masuk ke Dasbor Utama Justifiqa
        else OTP Salah / Kadaluarsa
            BE --> FE : 400 Bad Request (OTP Invalid)
            FE --> User : Tampilkan Error & Opsi Kirim Ulang OTP
        end
    end
end
@enduml
```

---

### SD-J-03: Konsultasi Hukum & Pembayaran Escrow (J-UC03, J-UC04, J-UC05, J-UC10)
*Sequence diagram reservasi, pembayaran escrow yang ditahan sistem Justifiqa, pelaksanaan sesi chat E2EE, hingga pelepasan dana setelah sesi selesai.*

```plantuml
@startuml
autonumber
actor "Klien Justifiqa" as Klien
participant "Frontend Justifiqa App" as FE
participant "Backend Independen Justifiqa" as BE
participant "Payment Gateway" as PG
actor "Advokat Justifiqa" as Mitra

Klien -> FE : Pilih Advokat, Jadwal Sesi, & Klik Reservasi
FE -> BE : POST /api/v1/consultations/book (Advokat ID, Slot)
BE -> PG : Create Payment Invoice & Virtual Account
PG --> BE : Return Invoice URL & VA Number
BE --> FE : Return Billing Detail (Rp250.000 + Fee)
FE --> Klien : Tampilkan Halaman Pembayaran

Klien -> PG : Lakukan Pembayaran via Bank Transfer / E-Wallet
PG -> BE : Webhook Notification (POST /webhook/payment PAID)
BE -> BE : Tahan Dana di Rekening Escrow Sementara Justifiqa
BE -> BE : Update Booking Status = TERKONFIRMASI
BE -> Mitra : Kirim Push Notification Jadwal Sesi Baru

note over Klien, Mitra : Sesi Konsultasi Dimulai Sesuai Waktu Reservasi
Klien -> FE : Masuk Ruang Chat E2EE Justifiqa
Mitra -> FE : Masuk Ruang Chat E2EE Justifiqa
Klien -> Mitra : Pertukaran Pesan Teks / Audio / Video (E2EE Encrypted)
Mitra -> Klien : Berikan Analisis & Nasihat Hukum

Mitra -> FE : Klik Akhiri Sesi Konsultasi
FE -> BE : POST /api/v1/consultations/end (Sesi ID)
BE -> BE : Tutup Ruang Chat & Simpan Metadata Transaksi
BE -> FE : Trigger Rating & Ulasan Modal (J-UC06)
BE -> BE : Cairkan Dana Escrow ke Saldo Advokat (Potong Fee 25% & PPh 21)
@enduml
```

---

### SD-J-04: Mengatur Status Ketersediaan Praktik Advokat (J-UC09)
*Sequence diagram pengaturan jadwal praktik dan toggle ketersediaan real-time advokat.*

```plantuml
@startuml
autonumber
actor "Advokat Justifiqa" as Mitra
participant "Frontend Dasbor Advokat" as FE
participant "Backend Independen Justifiqa" as BE
database "Database Justifiqa" as DB

Mitra -> FE : Buka Pengaturan Jadwal & Klik Toggle ONLINE
FE -> BE : PUT /api/v1/advocate/availability (Status: ONLINE)

BE -> DB : Check Active Booking & Konflik Jadwal
DB --> BE : Return Booking Schedule

alt Ada Jadwal yang Bentrok / Sesi Sedang Berjalan
    BE --> FE : 409 Conflict (Jadwal Bentrok)
    FE --> Mitra : Tampilkan Peringatan & Minta Penyesuaian Slot
else Slot Jadwal Aman
    BE -> DB : Update Status Praktik = AVAILABLE / ONLINE
    DB --> BE : Success Update
    BE --> FE : 200 OK (Status Berhasil Diubah)
    FE --> Mitra : Tampilkan Status Aktif Siap Menerima Klien
end
@enduml
```

---

### SD-J-05: Mengunggah Berkas Perkara E2EE Zero-Knowledge (J-UC13)
*Sequence diagram pengunggahan bukti perkara yang dienkripsi sebelum meninggalkan perangkat klien agar tidak dapat dibaca oleh server maupun pihak ketiga.*

```plantuml
@startuml
autonumber
actor "Klien Justifiqa" as Klien
participant "Sistem Klien (Local E2EE Engine)" as LocK
participant "Backend Independen Justifiqa" as BE
database "WORM Hash Storage" as WORM
participant "Sistem Advokat (Local E2EE Engine)" as LocM
actor "Advokat Justifiqa" as Mitra

Klien -> LocK : Pilih Berkas Bukti Perkara (PDF/JPG)
LocK -> LocK : Enkripsi File Lokal dengan Session Key (Zero-Knowledge)
LocK -> BE : POST /api/v1/chat/upload-secure (Encrypted Blob, SHA-256 Hash)
BE -> WORM : Simpan Blob Terenkripsi & Hash Intergritas
WORM --> BE : Storage Confirmation
BE --> LocM : Kirim Webhook Notification File Baru Diunggah

Mitra -> LocM : Klik Unduh Bukti Perkara
LocM -> BE : GET /api/v1/chat/download-secure (File ID)
BE --> LocM : Return Encrypted Blob
LocM -> LocM : Dekripsi Lokal dengan Session Key
LocM --> Mitra : Tampilkan Dokumen Utuh untuk Ditelusuri
@enduml
```

---

### SD-J-06: Membuat Draf Dokumen Hukum & e-Meterai Peruri (J-UC12, J-UC14)
*Sequence diagram pembuatan opini hukum/kontrak oleh advokat serta pembubuhan e-Meterai resmi Peruri.*

```plantuml
@startuml
autonumber
actor "Advokat Justifiqa" as Mitra
participant "Frontend Generator Hukum" as FE
participant "Backend Independen Justifiqa" as BE
participant "API Peruri Stamping" as Peruri
database "Database Justifiqa" as DB
actor "Klien Justifiqa" as Klien

Mitra -> FE : Buat Draf Legal Opinion / Kontrak & Pilih e-Meterai
FE -> BE : POST /api/v1/legal-docs/generate (Payload, Stamping Req)

alt Pembubuhan e-Meterai Peruri = TRUE
    BE -> Peruri : POST /api/v3/stamp (SHA-256 Hash Dokumen)
    Peruri -> Peruri : Verifikasi Kuota & Bubuhkan Serial Number e-Meterai
    Peruri --> BE : Return Stamped Document & Certificate Hash
    BE -> DB : Simpan Dokumen Bersertifikat Resmi
else Tanpa e-Meterai
    BE -> DB : Simpan Dokumen Hukum Standar
end

DB --> BE : Save Confirmed
BE --> FE : 201 Created (Dokumen Siap)
FE --> Mitra : Tampilkan Konfirmasi Sukses Penerbitan
BE -> Klien : Kirim Email & Push Notif Dokumen Hukum Baru
Klien -> BE : Unduh Dokumen Hukum Resmi
@enduml
```

---

### SD-J-07: Konsultasi Pro Bono SKTM (J-UC15)
*Sequence diagram pengajuan bantuan hukum cuma-cuma (Pro Bono) melalui verifikasi Surat Keterangan Tidak Mampu (SKTM) Dukcapil.*

```plantuml
@startuml
autonumber
actor "Klien Justifiqa" as Klien
participant "Frontend Justifiqa App" as FE
participant "Backend Independen Justifiqa" as BE
participant "API Dukcapil / Dinsos" as Ext
actor "Advokat Pro Bono Mitra" as Mitra

Klien -> FE : Ajukan Bantuan Pro Bono & Unggah Foto SKTM
FE -> BE : POST /api/v1/pro-bono/apply (SKTM Blob, KTP)
BE -> Ext : Verify Keabsahan Nomor SKTM & NIK
Ext --> BE : Return SKTM Verification Status

alt SKTM Tidak Valid / Palsu
    BE --> FE : 400 Bad Request (SKTM Tidak Terverifikasi)
    FE --> Klien : Tampilkan Error & Tawarkan Sesi Berbayar Reguler
else SKTM Sah & Terverifikasi
    BE -> BE : Approve Pengajuan & Buat Invoice Rp0 (Gratis)
    BE -> Mitra : Assign Kasus ke Advokat Kuota Pro Bono Aktif
    Mitra --> BE : Terima Penugasan Pro Bono
    BE --> FE : 200 OK (Sesi Pro Bono Siap Dimulai)
    FE --> Klien : Masuk ke Ruang Konsultasi Hukum Gratis
end
@enduml
```

---

### SD-J-08: Membuat Catatan Sesi IRAC Note Advokat (J-UC11)
*Sequence diagram pembuatan catatan terstruktur metode IRAC (Issue, Rule, Application, Conclusion) oleh advokat.*

```plantuml
@startuml
autonumber
actor "Advokat Justifiqa" as Mitra
participant "Frontend Dasbor Advokat" as FE
participant "Backend Independen Justifiqa" as BE
database "Database Justifiqa (Encrypted)" as DB

Mitra -> FE : Buka Form Catatan IRAC & Isi Kolom (Issue, Rule, App, Concl)
FE -> BE : POST /api/v1/advocate/notes/irac (Session ID, IRAC Payload)
BE -> BE : Enkripsi Field Catatan dengan AES-256 Field-Level Encryption
BE -> DB : Simpan Catatan IRAC ke Rekam Perkara Klien
DB --> BE : Success Insert Note
BE --> FE : 201 Created (Catatan Tersimpan Aman)
FE --> Mitra : Tampilkan Notifikasi Catatan Berhasil Diarsip
@enduml
```

---

### SD-J-09: Verifikasi Kredensial & Moderasi Akun Admin Justifiqa (J-UC16, J-UC17)
*Sequence diagram audit verifikasi advokat oleh Admin Legal serta proses penahanan akun (Due Process Suspend).*

```plantuml
@startuml
autonumber
actor "Admin Legal Justifiqa" as Admin
participant "Panel Admin Justifiqa" as FE
participant "Backend Independen Justifiqa" as BE
database "Database Justifiqa" as DB
participant "Pangkalan Data MA / Peradi" as Peradi
actor "Advokat Terlapor / Pendaftar" as Mitra

Admin -> FE : Buka Antrean Audit Advokat Baru
FE -> BE : GET /api/v1/admin/audits/advocates (Pending List)
BE --> FE : Return Dokumen SIPP, KTP, & Peradi
Admin -> Peradi : Verifikasi Keabsahan Nomor SIPP & Berita Acara Sumpah

alt Kredensial Palsu / Kadaluarsa
    Admin -> FE : Klik Tolak Kredensial & Isi Alasan
    FE -> BE : POST /api/v1/admin/audits/reject (Advocate ID)
    BE -> DB : Update Status = REJECTED
    BE -> Mitra : Kirim Email Alasan Penolakan Akun
else Kredensial Sah & Aktif
    Admin -> FE : Klik Setujui Kredensial
    FE -> BE : POST /api/v1/admin/audits/approve (Advocate ID)
    BE -> DB : Update Status = AKTIF / VERIFIED
    BE -> Mitra : Kirim Email Akun Aktif Siap Praktik
end

note over Admin, Mitra : Alur Moderasi Laporan Pelanggaran Etik / Hukum
Admin -> FE : Proses Laporan Pelanggaran Berat & Klik Suspend
FE -> BE : POST /api/v1/admin/moderation/suspend (Advocate ID, Reason)
BE -> DB : Update Status Akun = SUSPENDED (Due Process)
BE -> Mitra : Kirim Surat Panggilan Klarifikasi Internal
@enduml
```

---

### SD-J-10: Audit Log WORM Hash & Pencairan Dana Escrow PPh 21 (J-UC18, J-UC19)
*Sequence diagram pencatatan log transaksi mutlak WORM (Write-Once-Read-Many) serta perhitungan otomatis PPh 21 saat penarikan dana advokat.*

```plantuml
@startuml
autonumber
actor "Advokat Justifiqa" as Mitra
participant "Frontend Dasbor Advokat" as FE
participant "Backend Independen Justifiqa" as BE
participant "Payment Gateway Disbursement" as PG
database "WORM Hash Storage" as WORM

Mitra -> FE : Ajukan Pencairan Dana (Withdrawal) ke Rekening Bank
FE -> BE : POST /api/v1/advocate/payouts/withdraw (Amount, Bank Acc)

BE -> BE : Validasi Saldo & Hitung Potongan Pajak PPh 21
BE -> PG : POST /api/disbursement/transfer (Net Amount, Bank Detail)
PG --> BE : Webhook Transfer SUCCESS (Bank Ref Number)

BE -> BE : Kurangi Saldo Available Advokat & Terbitkan Bukti Potong PPh 21
BE -> WORM : Simpan SHA-256 Hash Log Transaksi & Audit PPh 21
WORM --> BE : Hash Written Permanently
BE --> FE : 200 OK (Pencairan Berhasil Diproses)
FE --> Mitra : Tampilkan Resi Transfer & Bukti Potong Pajak
@enduml
```

---

## BAGIAN II: SEQUENCE DIAGRAMS - APLIKASI MANDIRI QUALIFA (DOMAIN PSIKOLOGI)

### SD-Q-01: Registrasi Akun Klien & Psikolog Klinis (Q-UC01, Q-UC07)
*Sequence diagram alur pendaftaran akun mandiri Klien dan Psikolog Klinis (verifikasi STR & SIPP HIMPSI) di platform Qualifa.*

```plantuml
@startuml
autonumber
actor "Pengguna (Klien/Psikolog)" as User
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB

User -> FE : Buka Halaman Registrasi Qualifa & Pilih Jenis Akun
FE -> User : Tampilkan Formulir Registrasi Spesifik Qualifa
User -> FE : Isi Data Diri & Unggah Dokumen Kredensial (STR/HIMPSI)
FE -> BE : POST /api/v1/auth/register (Payload & Files)

BE -> DB : Check Existing Email/No HP
DB --> BE : Status Uniqueness Result

alt Email / No HP Sudah Terdaftar
    BE --> FE : 400 Bad Request (Akun Sudah Ada)
    FE --> User : Tampilkan Error "Email/No HP Sudah Terdaftar"
else Kredensial Baru & Valid
    alt Jenis Akun = Klien (Pasien/User)
        BE -> DB : Insert Klien (Status: AKTIF)
        DB --> BE : Success DB Insert
        BE --> FE : 201 Created (Registrasi Sukses)
        FE --> User : Arahkan ke Halaman Login Qualifa
    else Jenis Akun = Psikolog Klinis
        BE -> DB : Insert Psikolog (Status: PENDING_VERIFICATION)
        DB --> BE : Success DB Insert
        BE -> BE : Add to Admin Audit Queue (Verifikasi STR HIMPSI)
        BE --> FE : 201 Created (Menunggu Verifikasi Etik)
        FE --> User : Tampilkan Pesan "Menunggu Verifikasi Etik 1x24 Jam"
    end
end
@enduml
```

---

### SD-Q-02: Login Akun Klien & Psikolog Klinis (Q-UC02, Q-UC08)
*Sequence diagram alur masuk (login) independen beserta verifikasi Multi-Factor Authentication (MFA / 2FA).*

```plantuml
@startuml
autonumber
actor "Pengguna Qualifa" as User
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB
participant "SMS / Email Gateway" as SMS

User -> FE : Masukkan Email/No HP & Password
FE -> BE : POST /api/v1/auth/login (Credentials)

BE -> DB : Query User by Email/No HP
DB --> BE : Return User Record & Password Hash

alt Kredensial Tidak Cocok
    BE --> FE : 401 Unauthorized (Kredensial Salah)
    FE --> User : Tampilkan Error & Sisa Percobaan Login
else Kredensial Cocok
    alt Status Akun = SUSPENDED (Komite Etik)
        BE --> FE : 403 Forbidden (Akun Suspended oleh Komite Etik)
        FE --> User : Tampilkan Error Akun Dalam Investigasi Etik
    else Status Akun = AKTIF
        BE -> BE : Generate OTP 6-Digit (Expire 5 Menit)
        BE -> SMS : Kirim Kode OTP via SMS / WhatsApp / Email
        SMS --> User : Terima Pesan Kode OTP
        BE --> FE : 200 OK (OTP Sent, Waiting Verification)
        FE --> User : Tampilkan Layar Input OTP
        
        User -> FE : Masukkan Kode OTP 6-Digit
        FE -> BE : POST /api/v1/auth/verify-otp (User ID, OTP)
        
        alt OTP Valid & Belum Expire
            BE -> DB : Update Last Login Timestamp
            BE -> BE : Generate JWT Session Token Qualifa
            BE --> FE : 200 OK (JWT Token, User Profile)
            FE --> User : Masuk ke Dasbor Utama Qualifa
        else OTP Salah / Kadaluarsa
            BE --> FE : 400 Bad Request (OTP Invalid)
            FE --> User : Tampilkan Error & Opsi Kirim Ulang OTP
        end
    end
end
@enduml
```

---

### SD-Q-03: Sesi Konseling Klinis & Pembayaran (Q-UC03, Q-UC04, Q-UC05, Q-UC10)
*Sequence diagram reservasi psikolog, pembayaran konseling, pelaksanaan sesi terapi (chat/audio/video), dan penyelesaian sesi.*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as Klien
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
participant "Payment Gateway" as PG
actor "Psikolog Klinis Qualifa" as Mitra

Klien -> FE : Pilih Psikolog, Jadwal Sesi Terapi, & Klik Reservasi
FE -> BE : POST /api/v1/counseling/book (Psikolog ID, Slot)
BE -> PG : Create Payment Invoice & Virtual Account
PG --> BE : Return Invoice URL & VA Number
BE --> FE : Return Billing Detail (Rp300.000 + Fee)
FE --> Klien : Tampilkan Halaman Pembayaran

Klien -> PG : Lakukan Pembayaran via Bank Transfer / E-Wallet
PG -> BE : Webhook Notification (POST /webhook/payment PAID)
BE -> BE : Tahan Dana di Rekening Sementara Qualifa
BE -> BE : Update Booking Status = TERKONFIRMASI
BE -> Mitra : Kirim Push Notification Pengingat Jadwal Terapi

note over Klien, Mitra : Sesi Konseling Klinis Dimulai Sesuai Waktu Reservasi
Klien -> FE : Masuk Ruang Konseling E2EE Qualifa
Mitra -> FE : Masuk Ruang Konseling E2EE Qualifa
Klien -> Mitra : Sesi Konseling Teks / Audio / Video Call (E2EE)
Mitra -> Klien : Berikan Intervensi Klinis & Dukungan Psikologis

Mitra -> FE : Klik Akhiri Sesi Konseling
FE -> BE : POST /api/v1/counseling/end (Sesi ID)
BE -> BE : Tutup Ruang Terapi & Simpan Metadata Sesi
BE -> FE : Trigger Rating & Ulasan Modal (Q-UC06)
BE -> BE : Cairkan Honor Sesi ke Saldo Psikolog (Potong Fee 20% & PPh 21)
@enduml
```

---

### SD-Q-04: Mengatur Status Ketersediaan & Buffer 30 Mnt (Q-UC09)
*Sequence diagram pengaturan jadwal praktik psikolog dengan aturan wajib jeda istirahat emosional (buffer rule) 30 menit antar sesi.*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as Mitra
participant "Frontend Dasbor Psikolog" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB

Mitra -> FE : Buka Pengaturan Jadwal & Klik Toggle ONLINE
FE -> BE : PUT /api/v1/psychologist/availability (Status: ONLINE)

BE -> DB : Check Riwayat Sesi Terakhir & Jadwal Berikutnya
DB --> BE : Return Last Session End Time

alt Jeda Istirahat Antar Sesi < 30 Menit (Pelanggaran Kode Etik)
    BE --> FE : 422 Unprocessable Entity (Buffer Rule Violation)
    FE --> Mitra : Tampilkan Peringatan "Wajib Jeda Istirahat 30 Menit Antar Sesi"
else Jeda Waktu Memenuhi Syarat (> 30 Menit)
    BE -> DB : Update Status Praktik = AVAILABLE / ONLINE
    DB --> BE : Success Update
    BE --> FE : 200 OK (Status Berhasil Diubah)
    FE --> Mitra : Tampilkan Status Aktif Siap Konseling
end
@enduml
```

---

### SD-Q-05: Mengisi Jurnal Mood Tracker Harian Proactive Alert (Q-UC13)
*Sequence diagram pengisian jurnal emosi harian yang dilengkapi sistem pendeteksi risiko penurunan kesehatan mental otomatis.*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as Klien
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB
participant "Wellness Alert Engine" as Alert

Klien -> FE : Pilih Emotikon Emosi, Pemicu, & Tulis Jurnal Harian
FE -> BE : POST /api/v1/wellness/mood-tracker (Mood Score, Notes)
BE -> DB : Simpan Catatan Jurnal & Update Riwayat Emosi
DB --> BE : Return Last 7 Days Mood Trend

BE -> BE : Analisis Tren Emosi 7 Hari Terakhir
alt Terdeteksi Tren Sedih / Cemas Ekstrem 5 Hari Beruntun
    BE -> Alert : Trigger Proactive Wellness Alert
    Alert -> Alert : Generate Rekomendasi Psikoedukasi & Bantuan Klinis
    Alert --> FE : Push Alert pop-up & Bantuan Konseling Prioritas
    FE --> Klien : Munculkan Peringatan Lembut & Saran Konseling
else Tren Emosi Stabil / Normal
    BE --> FE : 200 OK (Jurnal Berhasil Disimpan)
    FE --> Klien : Perbarui Grafik Mood di Dasbor Klien
end
@enduml
```

---

### SD-Q-06: Mengakses Streaming Audio Meditasi & Relaksasi (Q-UC14)
*Sequence diagram pemutaran trek audio terapi relaksasi dengan penyesuaian kualitas bitrate adaptif.*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as Klien
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
participant "Media CDN Server" as CDN
database "Database Qualifa" as DB

Klien -> FE : Buka Menu Relaksasi & Pilih Trek Audio Meditasi
FE -> BE : GET /api/v1/wellness/meditation/stream (Track ID, Bandwidth)
BE -> BE : Evaluate Client Bandwidth & Network Speed

alt Koneksi Cepat / Wi-Fi
    BE -> CDN : Request High Quality Audio URL (320 kbps)
    CDN --> BE : Return CDN Secure Stream URL (HQ)
else Koneksi Seluler / Lambat
    BE -> CDN : Request Adaptive Smooth Audio URL (128 kbps)
    CDN --> BE : Return CDN Secure Stream URL (Smooth)
end

BE -> DB : Log Exercise Activity Start
BE --> FE : 200 OK (Stream URL)
FE -> CDN : Start Audio Streaming
FE --> Klien : Putar Audio Meditasi & Tampilkan Timer Relaksasi
@enduml
```

---

### SD-Q-07: Mengisi Asesmen DASS-21 & Protokol Crisis Button 119 (Q-UC15)
*Sequence diagram pengisian tes stres klinis DASS-21 yang memicu protokol kedaruratan bunuh diri/krisis 119 jika skor berada pada tingkat bahaya ekstrem.*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as Klien
participant "Frontend Qualifa App" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB
participant "Emergency Crisis System" as Crisis

Klien -> FE : Isi 21 Pertanyaan Asesmen DASS-21 & Submit
FE -> BE : POST /api/v1/assessment/dass21 (Responses Array)
BE -> BE : Hitung Skor Sub-Skala Depresi, Anxiety, & Stress
BE -> DB : Simpan Hasil Skor Asesmen di Profil Klinis Klien

alt Skor Depresi / Anxiety = EXTREME (Risk of Self-Harm)
    BE -> Crisis : Trigger Emergency 119 Crisis Protocol (User ID)
    Crisis -> Crisis : Notify Registered Emergency Family Contact
    Crisis --> BE : Protocol Triggered Successfully
    BE --> FE : 200 OK (Result: EXTREME, Trigger Red Alert)
    FE --> Klien : Tampilkan Layar Darurat Merah & Tombol Hotline Krisis 119
else Skor Normal / Sedang / Ringan
    BE --> FE : 200 OK (Result: Normal/Moderate, Education Suggestions)
    FE --> Klien : Tampilkan Hasil Asesmen & Saran Artikel Kesehatan Mental
end
@enduml
```

---

### SD-Q-08: Membuat Catatan Terapi DAP Note & Worksheet CCBT (Q-UC11, Q-UC12)
*Sequence diagram pembuatan catatan klinis metode DAP (Data, Assessment, Plan) dan penugasan lembar kerja terapi perilaku kognitif (CCBT).*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as Mitra
participant "Frontend Dasbor Psikolog" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa (Encrypted)" as DB
actor "Klien Qualifa" as Klien

Mitra -> FE : Buat Catatan DAP Note & Pilih Tugas Worksheet CCBT
FE -> BE : POST /api/v1/psychologist/clinical-notes (Sesi ID, DAP Payload)
BE -> BE : Enkripsi Catatan Klinis dengan Field-Level Encryption
BE -> DB : Simpan Catatan DAP Note di Arsip Rahasia Klien
DB --> BE : Save Confirmed

alt Psikolog Memberikan Tugas CCBT Worksheet
    Mitra -> FE : Assign Worksheet (Thought Record / Behavioral Activation)
    FE -> BE : POST /api/v1/counseling/ccbt/assign (Sesi ID, Template ID)
    BE -> DB : Simpan Tugas di Dasbor Klien
    BE -> Klien : Kirim Push Notification Tugas CCBT Baru
    BE --> FE : 201 Created (Tugas Terkirim ke Klien)
else Tanpa Tugas CCBT
    BE --> FE : 201 Created (Catatan DAP Note Tersimpan)
end

FE --> Mitra : Tampilkan Konfirmasi Sukses Pengarsipan Klinis
@enduml
```

---

### SD-Q-09: Verifikasi STR/HIMPSI & Moderasi Komite Etik Admin Qualifa (Q-UC16, Q-UC17)
*Sequence diagram audit keabsahan surat tanda registrasi psikolog klinis serta penanganan laporan kode etik.*

```plantuml
@startuml
autonumber
actor "Admin Etik Qualifa" as Admin
participant "Panel Admin Qualifa" as FE
participant "Backend Independen Qualifa" as BE
database "Database Qualifa" as DB
participant "Pangkalan Data HIMPSI / STR" as HIMPSI
actor "Psikolog Terlapor / Pendaftar" as Mitra

Admin -> FE : Buka Antrean Verifikasi Psikolog Baru
FE -> BE : GET /api/v1/admin/audits/psychologists (Pending List)
BE --> FE : Return Dokumen STR, SIPP, & Kartu HIMPSI
Admin -> HIMPSI : Cek Keabsahan STR & Status Keanggotaan HIMPSI

alt STR Tidak Sah / Kadaluarsa
    Admin -> FE : Tolak Verifikasi & Isi Alasan
    FE -> BE : POST /api/v1/admin/audits/reject (Psychologist ID)
    BE -> DB : Update Status = REJECTED
    BE -> Mitra : Kirim Email Alasan Penolakan Kredensial
else STR Sah & Aktif
    Admin -> FE : Setujui Verifikasi
    FE -> BE : POST /api/v1/admin/audits/approve (Psychologist ID)
    BE -> DB : Update Status = AKTIF / VERIFIED
    BE -> Mitra : Kirim Email Selamat Datang & Panduan Etik
end

note over Admin, Mitra : Alur Pemeriksaan Pelanggaran Kode Etik / Malpraktik
Admin -> FE : Proses Laporan Pelanggaran Etik & Klik Suspend
FE -> BE : POST /api/v1/admin/ethics/suspend (Psychologist ID, Reason)
BE -> DB : Update Status Akun = SUSPENDED (Investigasi Etik)
BE -> Mitra : Kirim Surat Panggilan Klarifikasi Komite Etik Qualifa
@enduml
```

---

### SD-Q-10: Audit Log WORM Hash & Manajemen Honor Psikolog (Q-UC18, Q-UC19)
*Sequence diagram pencatatan log transaksi mutlak WORM (Write-Once-Read-Many) serta pencairan honor sesi psikolog klinis.*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as Mitra
participant "Frontend Dasbor Psikolog" as FE
participant "Backend Independen Qualifa" as BE
participant "Payment Gateway Disbursement" as PG
database "WORM Hash Storage" as WORM

Mitra -> FE : Ajukan Pencairan Honor Sesi ke Rekening Bank
FE -> BE : POST /api/v1/psychologist/payouts/withdraw (Amount, Bank Acc)

BE -> BE : Validasi Saldo Honor & Hitung Potongan Pajak PPh 21
BE -> PG : POST /api/disbursement/transfer (Net Amount, Bank Detail)
PG --> BE : Webhook Transfer SUCCESS (Bank Ref Number)

BE -> BE : Kurangi Saldo Available Psikolog & Terbitkan Bukti Potong PPh 21
BE -> WORM : Simpan SHA-256 Hash Log Transaksi & Audit PPh 21
WORM --> BE : Hash Written Permanently
BE --> FE : 200 OK (Pencairan Honor Berhasil Diproses)
FE --> Mitra : Tampilkan Resi Transfer & Detail Potongan Pajak
@enduml
```
