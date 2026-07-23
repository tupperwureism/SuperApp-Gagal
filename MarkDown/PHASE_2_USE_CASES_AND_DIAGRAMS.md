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

```mermaid
sequenceDiagram
    actor Klien
    participant CorporateIntakeWizard
    participant SupabaseDB as Supabase DB
    participant NotaryWorkspace as Notary Workspace
    participant WORMTrigger as WORM Trigger

    Klien->>CorporateIntakeWizard: Isi data pendirian PT/CV
    CorporateIntakeWizard->>CorporateIntakeWizard: Validasi kelengkapan PPATK
    CorporateIntakeWizard->>SupabaseDB: Simpan corporate intake
    SupabaseDB->>NotaryWorkspace: Publikasikan case untuk notaris
    NotaryWorkspace->>SupabaseDB: Update status review dan stamping
    SupabaseDB->>WORMTrigger: Catat audit immutable
    WORMTrigger-->>SupabaseDB: Audit log terkunci
    SupabaseDB-->>CorporateIntakeWizard: Status case diperbarui
    CorporateIntakeWizard-->>Klien: Tampilkan hasil notary stamping
```

### Alur e-KYC AI dan Multi-Party Signing

```mermaid
sequenceDiagram
    actor Klien
    participant EkycVerificationWizard
    participant AIProvider as AI Provider Liveness Log
    participant AdvocateDashboard as Advocate Dashboard
    participant SigningEnvelope as Signing Envelope

    Klien->>EkycVerificationWizard: Mulai verifikasi identitas
    EkycVerificationWizard->>AIProvider: Kirim selfie, ID, dan liveness challenge
    AIProvider-->>EkycVerificationWizard: Return skor biometrik dan liveness
    EkycVerificationWizard->>SigningEnvelope: Unlock signer jika verifikasi valid
    SigningEnvelope->>AdvocateDashboard: Notifikasi pihak siap tanda tangan
    AdvocateDashboard->>SigningEnvelope: Review dokumen dan kirim undangan signing
    Klien->>SigningEnvelope: Tanda tangan dokumen
    SigningEnvelope-->>AdvocateDashboard: Status multi-party signing diperbarui
```
