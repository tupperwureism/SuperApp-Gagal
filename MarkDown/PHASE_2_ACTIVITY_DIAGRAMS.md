# Phase 2 Activity Diagrams — Business Logic Tracking (PlantUML Swimlanes)

Dokumen ini berisi Activity Diagram PlantUML dengan **swimlanes** untuk dua fitur utama Phase 2 Justifiqa. Setiap diagram di-derive 1-to-1 dari Sequence Diagram di `PHASE_2_USE_CASES_AND_DIAGRAMS.md` dan diperkaya dengan percabangan bisnis dari Legal Matrix terkait.

> **Konvensi:** Penomoran menggunakan `AD-P2-xx` (Activity Diagram — Phase 2). Swimlane memisahkan tanggung jawab aktor/komponen secara visual.

---

## Cara Import ke Draw.io
1. Buka Draw.io (`app.diagrams.net`).
2. Pada toolbar bagian atas, klik tombol **+ (Insert)** atau pilih menu **Arrange -> Insert**.
3. Pilih **Advanced -> PlantUML...**.
4. Salin dan tempel kode di bawah ini, lalu klik **Insert**.

---

## AD-P2-01: Alur Bisnis Corporate Intake & Notary Stamping

*Diagram alur bisnis pengisian data pendirian badan usaha (PT/CV), validasi form, penyimpanan database, review notaris, input NIB & SK Kemenkumham, hingga penguncian WORM. Derived dari SD: "Alur Corporate Intake dan Notary Stamping" di `PHASE_2_USE_CASES_AND_DIAGRAMS.md`.*

**Referensi domain:**
- `CORPORATE_CONCIERGE_LEGAL_AND_PARTNER_MATRIX.md` — Responsibility Matrix (Bab 3)
- `NOTARY_AND_KEMENKUMHAM_LEGAL_MATRIX.md` — State & Kontrak Pengajuan (Bab 5)
- Tabel: `corporate_service_cases`, `corporate_parties`, `beneficial_owners`, `government_submission_jobs`, `document_integrity_anchors`

```plantuml
@startuml
title AD-P2-01: Alur Bisnis Corporate Intake & Notary Stamping

|Klien|
start
:Buka halaman Corporate Intake;
:Pilih jenis badan usaha\n(PT_ORDINARY / PT_INDIVIDUAL_UMK / CV);
:Isi formulir data pendirian:\n— Nama usulan, domisili, KBLI\n— Modal, pendiri/pemegang saham\n— Direksi/komisaris (PT) atau\n  sekutu aktif/pasif (CV)\n— Deklarasi Beneficial Owner\n  (orang perseorangan);
:Klik Submit Intake;

|Sistem UI|
:Terima payload form Klien;
if (Apakah data form valid?\n— Format, kelengkapan,\n  natural-person BO) then (Tidak Valid)
  :Tampilkan error validasi\nke Klien;
  |Klien|
  :Perbaiki data input;
  :Klik Submit Intake ulang;
  |Sistem UI|
  :Terima payload form\nyang diperbaiki;
  note right
    Loop validasi hingga
    data memenuhi syarat
  end note
endif

|Database|
:(Ya — Valid)\nSimpan corporate_service_cases\n(status: DRAFT);
:Simpan corporate_parties\n& beneficial_owners;
:Catat consent & legal_scope_version;
:Return: Intake tersimpan;

|Sistem UI|
:Tampilkan konfirmasi:\n"Intake diterima, menunggu\nreview Notaris";

|Database|
:Kirim notifikasi ke\nNotaris yang ditugaskan\n(via user_notifications);

|Notaris|
:Terima notifikasi penugasan;
:Buka workspace kasus\n(NotaryCaseWorkspacePanel);
:Tarik data corporate intake\ndari Database;

|Database|
:Return: Data intake lengkap\n(RLS: assigned_notary_id\n= auth.uid());

|Notaris|
:Review kelengkapan data:\n— Identitas penghadap\n— Struktur BO\n— KBLI & domisili\n— Kesesuaian bentuk usaha;

if (Apakah data intake\nlengkap & valid?) then (Tidak Valid)
  :Tandai status:\nCUSTOMER_ACTION_REQUIRED;
  |Database|
  :Update corporate_service_cases\nstatus -> CUSTOMER_ACTION_REQUIRED;
  :Kirim notifikasi ke Klien:\n"Dokumen tambahan diperlukan";
  |Klien|
  :Terima notifikasi;
  :Lengkapi / perbaiki data;
  :Submit ulang;
  |Database|
  :Update data yang diperbaiki;
  |Notaris|
  :Review ulang data yang diperbaiki;
  note right
    Loop review hingga
    data memenuhi syarat
  end note
endif

|Notaris|
:(Ya — Valid)\nInput data resmi:\n— NIB (dari OSS RBA)\n— SK Kemenkumham (dari AHU);
:Unggah dokumen final\nke bucket privat;

|Database|
:Server-side: scan malware,\nhitung SHA-256 dari byte final;
:Simpan document_integrity_anchors\n(append-only WORM)\n— sha256_hash, case_id,\n  document_type, serial;
:Simpan government_submission_jobs\n(idempotency_key, status: SUBMITTED);

if (Apakah submission\nberhasil?) then (Ditolak — REJECTED)
  |Database|
  :Update job status -> REJECTED;
  :Catat alasan penolakan;
  |Notaris|
  :Revisi data & buat\njob baru (idempotency baru);
  note right
    State: REJECTED -> DRAFT
    (revisi eksplisit)
  end note
  |Database|
  :Simpan job revisi;
else (Disetujui — APPROVED)
endif

|Database|
:Update government_submission_jobs\nstatus -> APPROVED;
:Catat nomor registrasi eksternal\n(AHU/NIB);
:Trigger WORM: kunci status\ncorporate_service_cases;

|Sistem UI|
:Kirim notifikasi status\nstamping ke Klien;

|Klien|
:Terima notifikasi:\n"Notary stamping selesai,\ndokumen terkunci WORM";
:Lihat status & dokumen final\ndi dashboard;
stop
@enduml
```

---

## AD-P2-02: Alur Bisnis e-KYC AI & Multi-Party Signing

*Diagram alur bisnis verifikasi identitas biometrik AI (liveness check), pencatatan status KYC, pemantauan dasbor advokat, hingga rilis dana escrow dan dokumen. Derived dari SD: "Alur e-KYC AI dan Multi-Party Signing" di `PHASE_2_USE_CASES_AND_DIAGRAMS.md`.*

**Referensi domain:**
- `EKYC_AND_MULTIPARTY_SIGNING_LEGAL_MATRIX.md` — Alur Minimum & Kontrol Kegagalan (Bab 4)
- Zero Raw Biometric Storage (Bab 3): Justica **DILARANG** menyimpan foto/selfie/video/template biometrik
- Tabel: `ekyc_verification_logs`, `signing_envelopes`, `signing_envelope_parties`, `escrow_transactions`

```plantuml
@startuml
title AD-P2-02: Alur Bisnis e-KYC AI & Multi-Party Signing

|Klien (Signer)|
start
:Buka amplop dokumen\n(signing envelope)\nuntuk ditandatangani;

|eKYC Engine|
:Tampilkan notice:\n— Tujuan verifikasi\n— Provider e-KYC\n— Versi notice & consent;
:Minta tindakan afirmatif\n(consent) dari Klien;

|Klien (Signer)|
:Baca notice & berikan\nconsent verifikasi;

|eKYC Engine|
:Buat sesi provider satu kali\n(session token);
:Paksa liveness check\nsebelum lanjut;
:Arahkan ke SDK/halaman\nprovider (browser redirect);
note right
  Media TIDAK melewati
  API atau storage Justica.
  Zero Raw Biometric Storage.
end note

|Klien (Signer)|
:Foto wajah / liveness capture\ndi SDK provider;

|AI Provider|
:Terima capture dari SDK;
:Proses biometrik:\n— Anti-spoofing\n— Face match\n— Liveness detection;
:Hitung skor kepercayaan;

if (Apakah skor biometrik\nmemenuhi threshold?) then (Skor Rendah — REJECTED)
  :Kirim callback: REJECTED;
  |eKYC Engine|
  :Verifikasi signature &\ntimestamp callback;
  :Catat status REJECTED\ndi ekyc_verification_logs\n(reference_id, digest SHA-256,\ntimestamp — TANPA media);
  |Klien (Signer)|
  :Tampilkan pesan:\n"Verifikasi gagal,\nsilakan coba lagi";
  if (Apakah retry tersisa?) then (Ya)
    :Foto wajah ulang;
    |AI Provider|
    :Proses ulang biometrik;
    note right
      Loop retry terbatas.
      Jika habis ->
      REQUIRES_MANUAL_REVIEW
    end note
  else (Tidak — Retry habis)
    |eKYC Engine|
    :Set status:\nREQUIRES_MANUAL_REVIEW;
    |Database|
    :Simpan ekyc_verification_logs\n(status: REQUIRES_MANUAL_REVIEW);
    :Kirim notifikasi ke Advokat\nuntuk review manual;
    |Klien (Signer)|
    :Tampilkan pesan:\n"Menunggu review manual";
    stop
  endif
endif

|AI Provider|
:(Skor Tinggi — PASSED)\nKirim callback HTTPS:\nstatus PASSED + audit bundle;

|eKYC Engine|
:Verifikasi signature,\ntimestamp, nonce /\nidempotency key callback;
:Cegah replay attack;

|Database|
:Simpan ekyc_verification_logs:\n— verification_id, user_id\n— provider_reference_id\n— status: PASSED\n— digest SHA-256 audit bundle\n— timestamp\n(TANPA foto/selfie/template);
:Update signing_envelope_parties:\nKlien ini -> kyc_status = GREEN;
:Return: Status KYC tersimpan;

|eKYC Engine|
:Tampilkan ke Klien:\n"Verifikasi KYC selesai ✓";

|Klien (Signer)|
:Lihat status KYC Hijau;

|Advokat|
:Buka dasbor Multi-Party\nSigning Monitor;
:Pantau status KYC\nseluruh pihak penandatangan;

|Database|
:Query signing_envelope_parties\nWHERE envelope_id = target;
:Return: daftar pihak\n& status KYC masing-masing;

|Advokat|
if (Apakah SEMUA pihak\nberstatus KYC Hijau?) then (Belum Semua Hijau)
  :Tampilkan status:\n"Menunggu pihak lain\nmenyelesaikan KYC";
  :Tunggu notifikasi update;
  note right
    Advokat menunggu hingga
    semua signing_envelope_parties
    berstatus kyc_status = GREEN
  end note
  stop
else (Ya — Semua Hijau)
endif

|Advokat|
:Konfirmasi: Semua pihak\nterverifikasi KYC Hijau;
:Bekukan digest dokumen\n(freeze document hash);

|Database|
:Simpan document_integrity_anchors\n(SHA-256 dokumen final,\nappend-only WORM);

|Advokat|
:Trigger rilis dana Escrow;
:Trigger unlock dokumen\nuntuk semua pihak;

|Database|
:Update escrow_transactions:\nstatus -> RELEASED;
:Update signing_envelopes:\nstatus -> COMPLETED (terminal);
:Catat audit_logs_worm\n(append-only);
:Return: Escrow cair &\ndokumen terbuka;

|Advokat|
:Konfirmasi ke semua pihak:\n"Dokumen ditandatangani &\ndana escrow dicairkan";

|Klien (Signer)|
:Terima notifikasi:\n"Penandatanganan selesai,\ndokumen & dana tersedia";
:Akses dokumen final\ndi vault;
stop
@enduml
```

---

## Catatan Teknis

1. **Traceabilitas:** Kedua diagram di atas di-derive 1-to-1 dari Sequence Diagram di [`PHASE_2_USE_CASES_AND_DIAGRAMS.md`](PHASE_2_USE_CASES_AND_DIAGRAMS.md), diperkaya dengan percabangan bisnis dari Legal Matrix masing-masing domain.

2. **Kepatuhan Domain:**
   - **AD-P2-01:** Mengikuti state machine `DRAFT -> SUBMITTED -> APPROVED` dan `REJECTED -> DRAFT (revisi eksplisit)` dari `NOTARY_AND_KEMENKUMHAM_LEGAL_MATRIX.md`. Klien hanya menerima status netral (`CUSTOMER_ACTION_REQUIRED`), tidak pernah menerima detail PMPJ/compliance (anti-tipping-off).
   - **AD-P2-02:** Mematuhi Zero Raw Biometric Storage — hanya menyimpan `reference_id`, status, digest SHA-256, dan timestamp. Status `REJECTED` tidak sepenuhnya otomatis (ada retry + jalur `REQUIRES_MANUAL_REVIEW`). Status `COMPLETED` bersifat terminal/append-only.

3. **Tabel Database Terkait:**
   | Diagram | Tabel Utama |
   |---|---|
   | AD-P2-01 | `corporate_service_cases`, `corporate_parties`, `beneficial_owners`, `government_submission_jobs`, `document_integrity_anchors`, `user_notifications` |
   | AD-P2-02 | `ekyc_verification_logs`, `signing_envelopes`, `signing_envelope_parties`, `escrow_transactions`, `document_integrity_anchors`, `audit_logs_worm` |
