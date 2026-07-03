# Kumpulan Kode PlantUML Terpadu - Unified Tele-Consultation Platform

Dokumen ini berisi kumpulan kode PlantUML untuk diagram-diagram utama pada sistem **Unified Tele-Consultation Platform** (Hukum, Psikologi, dan Kesehatan Fisik). Kode-kode ini telah diabstraksikan menggunakan aktor terpadu (*Klien*, *Mitra Profesional*, *Admin Sistem*, dan *Payment Gateway*).

---

## Cara Import ke Draw.io
1. Buka Draw.io (`app.diagrams.net`).
2. Pada toolbar bagian atas, klik tombol **`+` (Insert)** atau pilih menu **Arrange -> Insert**.
3. Pilih **Advanced -> PlantUML...**.
4. Salin dan tempel salah satu kode di bawah ini, lalu klik **Insert**.

---

### 0. Use Case Diagram Terpadu (Unified Use Case Diagram)
*Diagram ini merepresentasikan seluruh 17 Use Case terpadu dengan 4 Aktor Sistem (Admin Sistem mencakup sub-peran Admin Finansial untuk UC-17).*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Klien (Client)" as Klien
actor "Mitra Profesional\n(Professional Partner)" as Mitra
actor "Admin Sistem\n(System Admin)" as Admin
actor "Payment Gateway" as PG

rectangle "Unified Tele-Consultation Platform" {
  usecase "UC-01: Melakukan Registrasi Klien" as UC01
  usecase "UC-02: Melakukan Login Klien\n(dengan Verifikasi OTP)" as UC02
  usecase "UC-03: Memilih Mitra Profesional" as UC03
  usecase "UC-04: Melakukan Konsultasi" as UC04
  usecase "UC-05: Melakukan Pembayaran" as UC05
  usecase "UC-06: Memberikan Ulasan & Rating" as UC06
  
  usecase "UC-07: Melakukan Registrasi Mitra" as UC07
  usecase "UC-08: Melakukan Login Mitra\n(dengan Verifikasi OTP)" as UC08
  usecase "UC-09: Mengonfirmasi Status Ketersediaan" as UC09
  usecase "UC-10: Melayani Konsultasi" as UC10
  usecase "UC-11: Membuat Catatan Sesi" as UC11
  usecase "UC-12: Mengeluarkan Output Dokumen\n(Resep/Telaah Kontrak/Tugas)" as UC12
  
  usecase "UC-13: Memverifikasi Berkas Kredensial" as UC13
  usecase "UC-14: Mengelola Data Akun Klien\n(Suspend Flow)" as UC14
  usecase "UC-15: Mengelola Data Akun Mitra\n(Suspend Flow)" as UC15
  usecase "UC-16: Memantau Laporan Transaksi" as UC16
  usecase "UC-17: Mengelola Saldo dan Penarikan Dana" as UC17
  
  UC04 .> UC05 : <<include>>
  UC12 .> UC11 : <<extend>>
}

Klien -- UC01
Klien -- UC02
Klien -- UC03
Klien -- UC04
Klien -- UC05
Klien -- UC06

' Asosiasi Aktor Pendukung (Supporting Actors)
Mitra -- UC04
Klien -- UC10

Mitra -- UC07
Mitra -- UC08
Mitra -- UC09
Mitra -- UC10
Mitra -- UC11
Mitra -- UC12
Mitra -- UC17

Admin -- UC13
Admin -- UC14
Admin -- UC15
Admin -- UC16
Admin -- UC17

UC05 -- PG
@enduml
```

---

### 0-A. Use Case Diagram - Domain Kesehatan (Sehatifiqa)
*Menampilkan Core UC + UC Spesifik Kesehatan (Tebus Resep, Janji Temu RS, Rekam Medis).*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Pasien (Klien)" as Klien
actor "Dokter (Mitra)" as Mitra
actor "Apotek / Kurir" as Apotek
actor "Faskes (RS/Klinik)" as Faskes
actor "Payment Gateway" as PG

rectangle "Domain Kesehatan (Sehatifiqa)" {
  ' Core UC
  usecase "UC-01: Melakukan Registrasi" as UC01
  usecase "UC-02: Melakukan Login" as UC02
  usecase "UC-03: Memilih Dokter" as UC03
  usecase "UC-04: Melakukan Konsultasi Medis" as UC04
  usecase "UC-05: Melakukan Pembayaran" as UC05
  usecase "UC-06: Memberikan Ulasan & Rating" as UC06
  usecase "UC-09: Mengonfirmasi Status Ketersediaan" as UC09
  usecase "UC-10: Melayani Konsultasi" as UC10
  usecase "UC-11: Membuat Catatan Sesi" as UC11
  usecase "UC-12: Mengeluarkan Output Dokumen\n(Resep Elektronik & Anjuran)" as UC12
  
  ' Spesifik Kesehatan
  usecase "Kes-UC01: Menebus Resep & Membeli Obat" as KUC01
  usecase "Kes-UC02: Membuat Janji Temu RS Offline" as KUC02
  usecase "Kes-UC03: Melihat Rekam Medis & Family Care" as KUC03
  
  UC04 .> UC05 : <<include>>
  UC12 .> UC11 : <<extend>>
  KUC01 .> UC12 : <<include>>
}

Klien -- UC01
Klien -- UC02
Klien -- UC03
Klien -- UC04
Klien -- UC05
Klien -- UC06
Klien -- KUC01
Klien -- KUC02
Klien -- KUC03

Mitra -- UC04
Klien -- UC10

Mitra -- UC09
Mitra -- UC10
Mitra -- UC11
Mitra -- UC12
Mitra -- KUC01

Apotek -- KUC01
Faskes -- KUC02
UC05 -- PG
@enduml
```

---

### 0-B. Use Case Diagram - Domain Psikologi (Qualifa)
*Menampilkan Core UC + UC Spesifik Psikologi (Jurnal Mood, Meditasi, Asesmen).*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Klien (User)" as Klien
actor "Psikolog (Mitra)" as Mitra
actor "Payment Gateway" as PG

rectangle "Domain Psikologi (Qualifa)" {
  ' Core UC
  usecase "UC-01: Melakukan Registrasi" as UC01
  usecase "UC-02: Melakukan Login" as UC02
  usecase "UC-03: Memilih Psikolog" as UC03
  usecase "UC-04: Melakukan Konseling" as UC04
  usecase "UC-05: Melakukan Pembayaran" as UC05
  usecase "UC-06: Memberikan Ulasan & Rating" as UC06
  usecase "UC-09: Mengonfirmasi Status Ketersediaan" as UC09
  usecase "UC-10: Melayani Konseling" as UC10
  usecase "UC-11: Membuat Catatan Sesi Terapi" as UC11
  usecase "UC-12: Mengeluarkan Output Dokumen\n(Lembar Tugas & Worksheet CCBT)" as UC12
  
  ' Spesifik Psikologi
  usecase "Psi-UC01: Mengisi Jurnal Mood Harian" as PUC01
  usecase "Psi-UC02: Mengakses Audio Meditasi" as PUC02
  usecase "Psi-UC03: Mengisi Tes Asesmen Psikologi" as PUC03
  
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
Klien -- PUC01
Klien -- PUC02
Klien -- PUC03

Mitra -- UC04
Klien -- UC10

Mitra -- UC09
Mitra -- UC10
Mitra -- UC11
Mitra -- UC12
Mitra -- PUC01
Mitra -- PUC03

UC05 -- PG
@enduml
```

---

### 0-C. Use Case Diagram - Domain Hukum (Justifiqa)
*Menampilkan Core UC + UC Spesifik Hukum (Unggah Berkas, Draf Hukum, Pro Bono).*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Klien (Pencari Keadilan)" as Klien
actor "Advokat (Mitra)" as Mitra
actor "Payment Gateway" as PG

rectangle "Domain Hukum (Justifiqa)" {
  ' Core UC
  usecase "UC-01: Melakukan Registrasi" as UC01
  usecase "UC-02: Melakukan Login" as UC02
  usecase "UC-03: Memilih Advokat" as UC03
  usecase "UC-04: Melakukan Konsultasi Hukum" as UC04
  usecase "UC-05: Melakukan Pembayaran" as UC05
  usecase "UC-06: Memberikan Ulasan & Rating" as UC06
  usecase "UC-09: Mengonfirmasi Status Ketersediaan" as UC09
  usecase "UC-10: Melayani Konsultasi" as UC10
  usecase "UC-11: Membuat Catatan Sesi" as UC11
  
  ' Spesifik Hukum
  usecase "Huk-UC01: Mengunggah Berkas Perkara" as HUC01
  usecase "Huk-UC02: Membuat Draf Dokumen Hukum" as HUC02
  usecase "Huk-UC03: Melakukan Konsultasi Pro Bono" as HUC03
  
  UC04 .> UC05 : <<include>>
  HUC03 .> UC04 : <<extend>>
}

Klien -- UC01
Klien -- UC02
Klien -- UC03
Klien -- UC04
Klien -- UC05
Klien -- UC06
Klien -- HUC01
Klien -- HUC03
Klien -- HUC02

Mitra -- UC04
Klien -- UC10

Mitra -- UC09
Mitra -- UC10
Mitra -- UC11
Mitra -- HUC01
Mitra -- HUC02
Mitra -- HUC03

UC05 -- PG
@enduml
```

---

