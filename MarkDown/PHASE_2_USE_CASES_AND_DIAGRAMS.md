# Phase 2 Use Cases and UML Sequence Diagrams

## Bagian A: Pembaruan Use Case dan Aktor

### Aktor Baru

| Aktor | Peran |
| --- | --- |
| Notaris Terdaftar | Memverifikasi berkas pendirian badan usaha, memberi cap notaris, dan mengunci status dokumen legal. |
| Sistem e-KYC AI (Provider) | Menjalankan liveness check, biometrik wajah, dan mencatat hasil verifikasi identitas. |

### Use Case Baru

| Use Case | Aktor Utama | Hasil Sistem |
| --- | --- | --- |
| Mendirikan PT/CV berstandar PPATK | Klien, Notaris Terdaftar | Data corporate intake tersimpan, diverifikasi notaris, dan diaudit oleh WORM Trigger. |
| Menandatangani Dokumen via Verifikasi Biometrik AI Liveness | Klien, Sistem e-KYC AI (Provider), Advokat | Identitas pihak tervalidasi sebelum signing envelope dibuka untuk tanda tangan multi-party. |

## Bagian B: Sequence Diagram

### Alur Corporate Intake dan Notary Stamping

```plantuml
@startuml
actor Klien
participant "Corporate UI" as UI
database "Supabase DB" as DB
actor Notaris

Klien -> UI: Isi data pendirian PT/CV
activate UI
UI -> DB: Simpan corporate intake
activate DB
DB --> UI: Intake tersimpan
deactivate DB
UI --> Klien: Konfirmasi intake diterima
deactivate UI

Notaris -> DB: Tarik data corporate intake
activate DB
DB --> Notaris: Data intake tersedia
deactivate DB

Notaris -> DB: Stamping dan update status WORM
activate DB
DB --> Notaris: Status WORM terkunci
deactivate DB

DB -> UI: Notifikasi status stamping
activate UI
UI --> Klien: Notifikasi hasil notary stamping
deactivate UI
@enduml
```

### Alur e-KYC AI dan Multi-Party Signing

```plantuml
@startuml
actor Klien
participant "eKYC Wizard" as UI
participant "AI Provider" as AI
database "Supabase DB" as DB
actor Advokat

Klien -> UI: Scan wajah
activate UI
UI -> AI: Verifikasi biometrik
activate AI
AI --> UI: Hasil biometrik valid
deactivate AI
UI -> DB: Simpan status KYC Hijau
activate DB
DB --> UI: Status KYC tersimpan
deactivate DB
UI --> Klien: Verifikasi KYC selesai
deactivate UI

Advokat -> DB: Pantau status multi-party signing
activate DB
DB --> Advokat: Semua pihak KYC Hijau
deactivate DB

Advokat -> DB: Trigger pencairan escrow dan unlock dokumen
activate DB
DB --> Advokat: Escrow cair dan dokumen terbuka
deactivate DB
@enduml
```
