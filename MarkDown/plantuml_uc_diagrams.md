# Kumpulan Kode PlantUML - 100% Siloed Architecture (Justifiqa & Qualifa Standalone Apps)

Dokumen ini berisi kumpulan kode PlantUML untuk diagram Use Case pada dua aplikasi yang **100% berdiri sendiri dan terisolasi total (*Siloed Architecture*)**: **Justifiqa** (Platform Konsultasi & Bantuan Hukum Digital) dan **Qualifa** (Platform Kesehatan Mental & Konseling Psikologi). Tidak ada *shared core engine* atau *single sign-on*; masing-masing memiliki sistem autentikasi, transaksi, dan panel administratif independen.

---

## Cara Import ke Draw.io
1. Buka Draw.io (`app.diagrams.net`).
2. Pada toolbar bagian atas, klik tombol **`+` (Insert)** atau pilih menu **Arrange -> Insert**.
3. Pilih **Advanced -> PlantUML...**.
4. Salin dan tempel salah satu kode di bawah ini, lalu klik **Insert**.

---

### 1. Use Case Diagram - Aplikasi Mandiri Justifiqa (Domain Hukum)
*Representasi sistem mandiri Justifiqa yang mencakup seluruh alur pengguna (Klien, Advokat, Admin Justifiqa, dan Payment Gateway) dari registrasi, konsultasi hukum, e-Meterai, pro bono, hingga manajemen administratif independen.*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Klien (Pencari Keadilan)" as Klien
actor "Advokat / Notaris (Mitra Profesional)" as Mitra
actor "Admin Justifiqa (System & Legal Admin)" as Admin
actor "Payment Gateway" as PG
actor "API Mekari Sign (Peruri)" as Mekari

rectangle "Aplikasi Mandiri Justifiqa (Domain Hukum)" {
  ' Client & Partner Core Flows
  usecase "J-UC01: Registrasi Akun Klien (Verifikasi NIK Dukcapil)" as UC01
  usecase "J-UC02: Login Akun Klien (MFA / 2FA)" as UC02
  usecase "J-UC03: Memilih Advokat / Notaris" as UC03
  usecase "J-UC04: Melakukan Konsultasi Hukum (E2EE Chat)" as UC04
  usecase "J-UC05: Melakukan Pembayaran (Escrow System)" as UC05
  usecase "J-UC06: Memberikan Ulasan & Rating Advokat" as UC06
  
  usecase "J-UC07: Registrasi Advokat (Verifikasi Kredensial Peradi/SIPP)" as UC07
  usecase "J-UC08: Login Advokat (MFA / TOTP)" as UC08
  usecase "J-UC09: Mengatur Status Ketersediaan Praktik" as UC09
  usecase "J-UC10: Melayani Sesi Konsultasi Hukum" as UC10
  usecase "J-UC11: Membuat Catatan Hukum (IRAC Note)" as UC11
  usecase "J-UC12: Membuat & Memfinalisasi Draf Kontrak Bermeterai" as UC12
  
  ' Domain Specific Legal Flows
  usecase "J-UC13: Mengunggah Berkas Perkara E2EE (Zero-Knowledge)" as UC13
  usecase "J-UC15: Pengajuan Konsultasi Pro Bono (Verifikasi SKTM)" as UC15
  usecase "J-UC22: Mengisi Saldo Dompet Advokat (Top-Up)" as UC22
  
  ' Independent Admin Flows
  usecase "J-UC20: Autentikasi Portal Backoffice Admin (TOTP 2FA)" as UC20
  usecase "J-UC21: Melaporkan Dugaan Pelanggaran Etik Advokat" as UC21
  usecase "J-UC16: Memverifikasi Kredensial & Lisensi Advokat (NIA & BAS)" as UC16
  usecase "J-UC17: Moderasi Akun & Due Process Suspend Flow" as UC17
  usecase "J-UC18: Audit Log Transaksi & WORM Hash Storage" as UC18
  usecase "J-UC19: Manajemen Pencairan Dana Escrow Advokat (PPh 21)" as UC19
  
  UC04 .> UC05 : <<include>>
  UC12 .> UC11 : <<extend>>
  UC12 .> UC22 : <<include>>
  UC15 .> UC04 : <<extend>>

  ' User Access Relationships
  Klien -- UC01
  Klien -- UC02
  Klien -- UC03
  Klien -- UC04
  Klien -- UC05
  Klien -- UC06
  Klien -- UC10
  Klien -- UC13
  Klien -- UC15
  Klien -- UC21
  
  Mitra -- UC04
  Mitra -- UC07
  Mitra -- UC08
  Mitra -- UC09
  Mitra -- UC10
  Mitra -- UC11
  Mitra -- UC12
  Mitra -- UC13
  Mitra -- UC15
  Mitra -- UC19
  Mitra -- UC22
  
  Admin -- UC20
  Admin -- UC16
  Admin -- UC17
  Admin -- UC18
  
  UC05 -- PG
  UC19 -- PG
  UC22 -- PG
  UC12 -- Mekari
}
@enduml
```

---

### 2. Use Case Diagram - Aplikasi Mandiri Qualifa (Domain Psikologi)
*Representasi sistem mandiri Qualifa yang mencakup seluruh alur pengguna (Klien, Psikolog Klinis, Admin Qualifa, dan Payment Gateway) dari registrasi, konseling klinis, mood tracker, meditasi, protokol krisis 119, hingga manajemen administratif independen.*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Klien (User / Pasien)" as Klien
actor "Psikolog Klinis (Mitra Profesional)" as Mitra
actor "Admin Qualifa (System & Ethics Admin)" as Admin
actor "Payment Gateway" as PG

rectangle "Aplikasi Mandiri Qualifa (Domain Psikologi)" {
  ' Client & Partner Core Flows
  usecase "Q-UC01: Registrasi Akun Klien" as UC01
  usecase "Q-UC02: Login Akun Klien (MFA / 2FA)" as UC02
  usecase "Q-UC03: Memilih Psikolog Klinis" as UC03
  usecase "Q-UC04: Melakukan Sesi Konseling Klinis (E2EE Chat/Audio/Video)" as UC04
  usecase "Q-UC05: Melakukan Pembayaran Sesi Konseling" as UC05
  usecase "Q-UC06: Memberikan Ulasan & Rating Psikolog" as UC06
  
  usecase "Q-UC07: Registrasi Psikolog (Verifikasi Kredensial HIMPSI/STR)" as UC07
  usecase "Q-UC08: Login Psikolog (MFA / TOTP)" as UC08
  usecase "Q-UC09: Mengatur Status Ketersediaan & Buffer 30 Mnt" as UC09
  usecase "Q-UC10: Melayani Sesi Konseling Klinis" as UC10
  usecase "Q-UC11: Membuat Catatan Sesi Terapi (DAP Note)" as UC11
  usecase "Q-UC12: Menerbitkan Lembar Tugas (Worksheet CCBT)" as UC12
  
  ' Domain Specific Psychology Flows
  usecase "Q-UC13: Mengisi Jurnal Mood Harian (Proactive Alert)" as UC13
  usecase "Q-UC14: Mengakses Streaming Audio Meditasi & Relaksasi" as UC14
  usecase "Q-UC15: Mengisi Asesmen DASS-21 & Protokol Crisis Button 119" as UC15
  
  ' Independent Admin Flows
  usecase "Q-UC20: Autentikasi Portal Backoffice Admin (TOTP 2FA)" as UC20
  usecase "Q-UC21: Melaporkan Dugaan Malpraktik & Pelanggaran Etik Psikolog" as UC21
  usecase "Q-UC16: Memverifikasi STR/SIPP Psikolog Klinis (HIMPSI Sync)" as UC16
  usecase "Q-UC17: Moderasi Akun & Audit Komite Etik Psikologi" as UC17
  usecase "Q-UC18: Audit Log Transaksi & WORM Hash Storage" as UC18
  usecase "Q-UC19: Manajemen Pencairan Dana Honor Psikolog" as UC19
  
  UC04 .> UC05 : <<include>>
  UC12 .> UC11 : <<extend>>
}

Klien -- UC01
Klien -- UC02
Klien -- UC03
Klien -- UC04
Klien -- UC05
Klien -- UC06
Klien -- UC12
Klien -- UC13
Klien -- UC14
Klien -- UC15
Klien -- UC21

Mitra -- UC04
Klien -- UC10

Mitra -- UC07
Mitra -- UC08
Mitra -- UC09
Mitra -- UC10
Mitra -- UC11
Mitra -- UC12
Mitra -- UC13
Mitra -- UC15
Mitra -- UC19

Admin -- UC20
Admin -- UC16
Admin -- UC17
Admin -- UC18

UC05 -- PG
UC19 -- PG
@enduml
```
