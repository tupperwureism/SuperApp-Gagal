# Traceability Matrix — Justifica 3-in-1

**Format**: Markdown (bisa di-import ke Excel/Notion/Jira)  
**Versi**: 1.0 — Aligned dengan GAP_REMEDIATION_PLAN.md  
**Cakupan**: 17 UC Core + 9 UC Domain-Specific = 26 Use Case

---

## Legend

| Kolom | Arti |
|-------|------|
| **UC-ID** | Use Case Identifier (sesuai Use Case Diagram) |
| **Use Case Name** | Nama Use Case |
| **Actor Utama** | Primary Actor |
| **Scenario Doc** | Link ke `unified_use_case_scenarios.md` section |
| **Activity Diagram** | AD-ID di `unified_plantuml_codes.md` |
| **Sequence Diagram** | SD-ID di `unified_plantuml_codes.md` |
| **Mockup Page** | Section di `gabungan_semua_mockup.html` |
| **Backlog Story** | Story ID di `product_backlog.md` |
| **Regulasi Utama** | Referensi `DOMAIN_COMPLIANCE_MATRIX.md` |
| **Compliance Flags** | Khusus: E2EE, ZK, LegalHold, WORM, FieldEnc, CrisisFlag, PrivilegeMark, SIA_Export, EMeterai, Dukcapil, RevenueShare |

---

## A. Core Use Cases (17 UC)

| UC-ID | Use Case Name | Actor Utama | Scenario Doc | Activity Diagram | Sequence Diagram | Mockup Page | Backlog Story | Regulasi Utama | Compliance Flags |
|-------|---------------|-------------|--------------|------------------|------------------|-------------|---------------|----------------|------------------|
| **UC-01** | Melakukan Registrasi Klien | Klien | [A.UC-01](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-01 | **SD-01, SD-08** | Auth (#mockup_auth) | ST-001 | UU PDP Art 15,16 | FieldEnc(NIK), Consent v1 |
| **UC-02** | Melakukan Login Klien | Klien | [A.UC-02](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-02 | **SD-01** | Auth (#mockup_auth) | ST-002 | UU PDP Art 15,16 | MFA(OTP), AuditLog |
| **UC-03** | Memilih Mitra Profesional | Klien | [A.UC-03](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-03 | **SD-09** | Dashboard Klien (#mockup_dashboard_klien) | ST-005 | Domain-specific | Filter(STR/SIPP/Peradi), GeoLocation |
| **UC-04** | Melakukan Konsultasi | Klien + Mitra | [A.UC-04](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-03 | **SD-03** | Chat Room (#mockup_chat_room) | ST-008 | Domain-specific | E2EE, TimerForceClose, WORM |
| **UC-05** | Melakukan Pembayaran | Klien | [A.UC-05](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-04 | **SD-02** | Payment Gateway (#mockup_payment_gateway) | ST-007 | UU PDP, PSAK 71 | IdempotencyKey, CallbackVerify |
| **UC-06** | Memberikan Ulasan & Rating | Klien | [A.UC-06](unified_use_case_scenarios.md#a-aktor-klien-client) | AD-05 (extend) | **SD-10** | Dashboard Klien | ST-021 | Domain-specific | Anon(Huk), AdverseEvent(Kes) |
| **UC-07** | Melakukan Registrasi Mitra | Mitra | [B.UC-07](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | AD-05 | **SD-11** | Auth (#mockup_auth) | ST-003 | Konsil/Peradi/HIMPSI | FieldEnc(License), Consent |
| **UC-08** | Melakukan Login Mitra | Mitra | [B.UC-08](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | AD-02 | **SD-12** | Auth (#mockup_auth) | ST-004 | UU PDP | MFA(TOTP/SMS), AuditLog |
| **UC-09** | Mengonfirmasi Status Ketersediaan | Mitra | [B.UC-09](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | AD-08 | **SD-13** | Dashboard Mitra (#mockup_dashboard_mitra) | ST-006 | Domain-specific | Sync(JadwalRS/Sidang) |
| **UC-10** | Melayani Konsultasi | Mitra | [B.UC-10](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | AD-03 | **SD-03** | Chat Room (#mockup_chat_room) | ST-009 | Domain-specific | E2EE, NoteTemplate, WORM |
| **UC-11** | Membuat Catatan Sesi Konsultasi | Mitra | [B.UC-11](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | **AD-Kes-05, AD-Psi-05, AD-Huk-06** | **SD-14** | Modul Medis/Psi/Hukum | ST-011 | Domain-specific | Template(SOAP/DAP/IRAC), FieldEnc |
| **UC-12** | Mengeluarkan Output Dokumen Konsultasi | Mitra | [B.UC-12](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | **AD-Kes-05, AD-Psi-05, AD-Huk-06** | **SD-14** | Modul Medis/Psi/Hukum | ST-012 | Domain-specific | PDF(Permenkes73/IRAC), Worksheet(CCBT/MoodTracker), EMeterai(Huk), SIAExport(Kes) |
| **UC-13** | Memverifikasi Berkas Kredensial Mitra & SKTM | Admin | [C.UC-13](unified_use_case_scenarios.md#c-aktor-admin-sistem-system-admin) | AD-05 | **SD-15** | Dashboard Admin (#mockup_dashboard_admin) | ST-022 | Konsil/Peradi/HIMPSI/Dukcapil | API_Verify, FieldEnc, AuditLog |
| **UC-14** | Mengelola Data Akun Klien (Suspend) | Admin | [C.UC-14](unified_use_case_scenarios.md#c-aktor-admin-sistem-system-admin) | **AD-Admin-01** | **SD-04** | **Admin-Suspend-Klien** (NEW) | ST-023 | UU PDP, Due Process | Warning(3x), SuratResmi, Appeal14d |
| **UC-15** | Mengelola Data Akun Mitra (Suspend) | Admin | [C.UC-15](unified_use_case_scenarios.md#c-aktor-admin-sistem-system-admin) | **AD-Admin-02** | **SD-04** | **Admin-Suspend-Mitra** (NEW) | ST-024 | Konsil/Peradi/HIMPSI Ethics | EthicsCommittee, ReportToBody |
| **UC-16** | Memantau Laporan Transaksi | Admin | [C.UC-16](unified_use_case_scenarios.md#c-aktor-admin-sistem-system-admin) | AD-07 | **SD-16** | **Admin-Laporan-Transaksi** (NEW) | ST-025 | PSAK 71, UU PDP | RevenueShare(Kes15/Psi20/Huk25), ExportAudit |
| **UC-17** | Mengelola Saldo & Penarikan Dana Mitra | Mitra + Admin Fin | [B.UC-17](unified_use_case_scenarios.md#b-aktor-mitra-profesional-professional-partner) | **AD-17** | **SD-18** | Dashboard Mitra (#mockup_dashboard_mitra) | ST-026 | UU PDP, PSAK 71, PPh 21 | PPh21/NPWP, AML(STR/SIPP/Peradi), Escrow(Huk), Threshold |

---

## B. Domain-Specific Use Cases (9 UC)

### B.1 Kesehatan (3 UC)

| UC-ID | Use Case Name | Actor Utama | Scenario Doc | Activity Diagram | Sequence Diagram | Mockup Page | Backlog Story | Regulasi Utama | Compliance Flags |
|-------|---------------|-------------|--------------|------------------|------------------|-------------|---------------|----------------|------------------|
| **Kes-UC01** | Menebus Resep & Membeli Obat | Klien | [Kes-UC01](unified_use_case_scenarios.md#kes-uc01-menebus-resep-membeli-obat-domain-kesehatan) | **AD-Kes-04** | **SD-Kes** | Modul Medis (#mockup_modul_medis) | ST-013 | Permenkes 73/2016, UU 36/2009 Narkotika | SIAExport, DrugInteraction(Major), ControlledDrugWorkflow, FieldEnc |
| **Kes-UC02** | Membuat Janji Temu RS Offline | Klien | [Kes-UC02](unified_use_case_scenarios.md#kes-uc02-membuat-janji-temu-rs-offline-domain-kesehatan) | AD-Kes-02 (existing) | **SD-Kes-02** | Modul Medis | ST-014 | Permenkes 20/2019 Telemedicine | BookingSync, Consent |
| **Kes-UC03** | Melihat Rekam Medis & Family Care | Klien | [Kes-UC03](unified_use_case_scenarios.md#kes-uc03-melihat-rekam-medes-family-care-domain-kesehatan) | AD-Kes-03 (existing) | **SD-Kes-03** | Modul Medis | ST-015 | UU 17/2023, UU RKM 10th | FieldEnc, FamilyCare, ConsentShare |

### B.2 Psikologi (3 UC)

| UC-ID | Use Case Name | Actor Utama | Scenario Doc | Activity Diagram | Sequence Diagram | Mockup Page | Backlog Story | Regulasi Utama | Compliance Flags |
|-------|---------------|-------------|--------------|------------------|------------------|-------------|---------------|----------------|------------------|
| **Psi-UC01** | Mengisi Jurnal Mood Harian | Klien | [Psi-UC01](unified_use_case_scenarios.md#psi-uc01-mengisi-jurnal-mood-harian-domain-psikologi) | AD-Psi-01 (existing) | **SD-Psi** | Modul Psikologi (#mockup_modul_psikologi) | ST-016 | UU 18/2014, HIMPSI Etik | **ZeroKnowledge**, FieldEnc, Consent |
| **Psi-UC02** | Mengakses Audio Meditasi | Klien | [Psi-UC02](unified_use_case_scenarios.md#psi-uc02-mengakses-audio-meditasi-domain-psikologi) | AD-Psi-02 (existing) | **SD-Psi-02** | Modul Psikologi | ST-017 | UU 18/2014 | Streaming, NoPII |
| **Psi-UC03** | Mengisi Tes Asesmen Psikologi (DASS-21) | Klien | [Psi-UC03](unified_use_case_scenarios.md#psi-uc03-mengisi-tes-asesmen-psikologi-domain-psikologi) | **AD-Psi-04** | **SD-Psi** | Modul Psikologi | ST-018 | Permenkumham 1/2024, HIMPSI | **CrisisFlag**, AutoAssign(PsikologKlinis), ReConsent, ZK |

### B.3 Hukum (3 UC)

| UC-ID | Use Case Name | Actor Utama | Scenario Doc | Activity Diagram | Sequence Diagram | Mockup Page | Backlog Story | Regulasi Utama | Compliance Flags |
|-------|---------------|-------------|--------------|------------------|------------------|-------------|---------------|----------------|------------------|
| **Huk-UC01** | Mengunggah Berkas Perkara | Klien | [Huk-UC01](unified_use_case_scenarios.md#huk-uc01-mengunggah-berkas-perkara-domain-hukum) | AD-Huk-01 (existing) | **SD-Huk** | Modul Hukum (#mockup_modul_hukum) | ST-010 | UU 18/2003 Advokat Pasal 18 | **E2EE Mandatory**, PrivilegeMark, LegalHold |
| **Huk-UC02** | Membuat Draf Dokumen Hukum | Advokat | [Huk-UC02](unified_use_case_scenarios.md#huk-uc02-membuat-draf-dokumen-hukum-domain-hukum) | **AD-Huk-04** | **SD-Huk** | Modul Hukum | ST-019 | UU 18/2003, Peradi Etik, Peruri | TemplateEngine, VersionControl, **EMeterai(Phase3)**, IRAC, PrivilegeMark |
| **Huk-UC03** | Melakukan Konsultasi Pro Bono | Klien + Admin + Advokat | [Huk-UC03](unified_use_case_scenarios.md#huk-uc03-melakukan-konsultasi-pro-bono-domain-hukum) | **AD-Huk-05** | **SD-Huk-03** | Modul Hukum | ST-020 | UU 16/2011 Bantuan Hukum, Peradi | **DukcapilVerify**, Quota(3/bln), LBHReport, Escrow |

---

## C. Coverage Summary

| Artefak | Total Items | Covered | Coverage |
|---------|-------------|---------|----------|
| **Use Case (UC)** | 26 | 26 | 100% |
| **Scenario Doc** | 26 | 26 | 100% |
| **Activity Diagram** | 23 | 23 | 100% |
| **Sequence Diagram** | 21 | 21 | 100% |
| **Mockup Pages** | 9 + 3 new + 3 update | 15 | 100% (planned) |
| **Backlog Stories** | 27 (ST-001..ST-027) | 27 | 100% |
| **Regulasi Mapping** | 26 | 26 | 100% |

---

## D. Compliance Flags Index

| Flag | Arti | UC yang Mempunyai |
|------|------|-------------------|
| **E2EE** | End-to-End Encryption mandatory (client-side encrypt) | UC-04, UC-10, UC-11, UC-12, Huk-UC01, Huk-UC02 |
| **ZK** | Zero-Knowledge (server tidak bisa baca) | Psi-UC01, Psi-UC03 |
| **LegalHold** | Tidak bisa dihapus (privilege) | Huk-UC01, Huk-UC02(final), UC-11(Huk), UC-12(Huk) |
| **WORM** | Write-Once-Read-Many audit log | UC-04, UC-05, UC-10, UC-11, UC-12, UC-13, UC-14, UC-15, UC-16, UC-17 |
| **FieldEnc** | Field-Level Encryption (kolom sensitif) | UC-01(NIK), UC-07(License), UC-11(diagnosis), UC-12(resep), Kes-UC01, Psi-UC01, Psi-UC03, Huk-UC01, Huk-UC02 |
| **CrisisFlag** | Auto-detect & escalate risiko bunuh diri | Psi-UC03 |
| **PrivilegeMark** | Otomatis tag "PRIVILEGED/CONFIDENTIAL" | Huk-UC01, Huk-UC02, UC-11(Huk), UC-12(Huk) |
| **SIAExport** | Kirim ke Sistem Informasi Apotek (format Kemenkes) | Kes-UC01, UC-12(Kes) |
| **EMeterai** | Integrasi Peruri e-Meterai (Rp10k/lembar) | Huk-UC02, UC-12(Huk) — **Phase 3** |
| **Dukcapil** | Cross-check NIK/KK ke Kementerian Dalam Negeri | Huk-UC03, UC-13(SKTM) |
| **RevenueShare** | Perhitungan bagi hasil per domain | UC-16, UC-17 (Kes15%, Psi20%, Huk25%) |
| **Consent** | Granular, versioned, revocable consent | All UC (khusus: UC-01, UC-04, UC-11, UC-12, Kes-UC01, Psi-UC01, Psi-UC03, Huk-UC01, Huk-UC03) |
| **MFA** | Multi-Factor Authentication | UC-02(OTP), UC-08(TOTP/SMS) |
| **IdempotencyKey** | Prevent double-charge | UC-05 |
| **CallbackVerify** | Verifikasi callback payment gateway | UC-05 |
| **Template(SOAP/DAP/IRAC)** | Structured note template per domain | UC-11, UC-12 |
| **VersionControl** | Draft v1, v2, final dengan diff | Huk-UC02, UC-12(Huk) |
| **AutoAssign** | Otomatis assign ke spesialis (psikolog klinis) | Psi-UC03 |
| **ReConsent** | Ulang konsentimen setelah crisis flag | Psi-UC03 |
| **Warning(3x)** | 3x peringatan sebelum suspend | UC-14, UC-15 |
| **SuratResmi** | Generate surat resmi suspend | UC-14, UC-15 |
| **Appeal14d** | Window banding 14 hari | UC-14, UC-15 |
| **EthicsCommittee** | Panel etik multidisiplin | UC-15 |
| **ReportToBody** | Laporkan ke Konsil/Peradi/HIMPSI | UC-15 |
| **ExportAudit** | Export XLSX/PDF + hash untuk audit | UC-16 |
| **NPWP/BPJS** | Validasi NPWP & rekening BPJS (Kes) | UC-17(Kes) |
| **Escrow** | Dana pro bono di-tahan hingga selesai | UC-17(Huk), Huk-UC03 |
| **Threshold** | Auto-disburse <5jt, Manual ≥5jt | UC-17 |
| **Quota(3/bln)** | Max 3 kasus pro bono per advokat/bulan | Huk-UC03 |
| **LBHReport** | Format laporan untuk LBH | Huk-UC03 |
| **DrugInteraction(Major)** | Cek interaksi obat major (contraindicated) | Kes-UC01 |
| **ControlledDrugWorkflow** | Alur beda untuk Narkotika/Psikotropika (3 rangkap) | Kes-UC01 |
| **BookingSync** | Sinkron jadwal ke RS/Faskes | Kes-UC02 |
| **FamilyCare** | Akses RM anggota keluarga (consent-based) | Kes-UC03 |
| **Streaming** | Audio streaming tanpa PII | Psi-UC02 |
| **Sync(JadwalRS/Sidang)** | Sinkron ketersediaan ke sistem eksternal | UC-09 |
| **Anon(Huk)** | Review anonimasikan nama klien | UC-06(Huk) |
| **AdverseEvent(Kes)** | Wajib isi adverse event jika rating ≤2 | UC-06(Kes) |
| **API_Verify** | Integrasi API Konsil/Peradi/HIMPSI/Dukcapil | UC-13 |

---

## E. Sprint Mapping (Traceability ke Sprint)

| Sprint | UC Covered | New Artefacts |
|--------|------------|---------------|
| **Sprint A** (Core Compliance & Auth) | UC-01, UC-02, UC-07, UC-08, UC-13, UC-11(Kes/Psi/Huk), UC-12(Kes/Psi/Huk) | SD-08, SD-11, SD-12, SD-15, SD-14, AD-Kes-05, AD-Psi-05, AD-Huk-06, Compliance Matrix, FieldEnc, ZK, E2EE, WORM, Consent v1, MFA |
| **Sprint B** (Domain-Specific Flow) | UC-03, UC-04, UC-06, UC-09, UC-10, UC-11, UC-12, Kes-UC01, Kes-UC02, Kes-UC03, Psi-UC01, Psi-UC02, Psi-UC03, Huk-UC01, Huk-UC02, Huk-UC03 | SD-09, SD-10, SD-13, SD-Kes, SD-Kes-02, SD-Kes-03, SD-Psi, SD-Psi-02, SD-Huk, SD-Huk-03, AD-Kes-04, AD-Psi-04, AD-Huk-04, AD-Huk-05, SIAExport, DrugInteraction, CrisisFlag, TemplateEngine, Dukcapil, EMeterai(Phase3), RevenueShare |
| **Sprint C** (Admin & Financial) | UC-14, UC-15, UC-16, UC-17 | SD-16, SD-18, AD-Admin-01, AD-Admin-02, Admin-Suspend-Klien, Admin-Suspend-Mitra, Admin-Laporan-Transaksi, Escrow, Threshold, NPWP/BPJS, Warning/Surat/Appeal, EthicsCommittee |
| **Sprint D** (Integration & Polish) | All (Regression) | Real API Contract, DPIA, PenTest, Audit Package, IR Drill |

---

## F. Change Log

| Versi | Tanggal | Perubahan | Author |
|-------|---------|-----------|--------|
| 1.0 | 2026-07-02 | Initial creation from GAP_REMEDIATION_PLAN | System |

---

**Catatan**: Matrix ini *living document*. Update setiap Sprint Review. Import ke Excel/Notion/Jira untuk filtering & reporting.