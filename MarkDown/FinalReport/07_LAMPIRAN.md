# LAMPIRAN

## LAMPIRAN A — RINGKASAN USE CASE KANONIK JUSTIFIQA

Tabel A.1 merangkum daftar *Use Case* kanonik platform Justifiqa yang memetakan aktivitas aktor dan komponen backend terkait.

**Tabel A.1**: Ringkasan Use Case Kanonik Justifiqa
| UC ID | Nama Use Case Hukum | Aktor | Komponen Backend Utama |
|---|---|---|---|
| J-UC01 | Registrasi Akun Klien | Klien | `ClientAuthController` → `GoTrue IAM` |
| J-UC02 | Login Akun Klien | Klien | `ClientAuthController` → `GoTrue IAM` |
| J-UC03 | Katalog & Discovery Advokat | Klien | `AdvocateCatalogController` → `PostgREST` |
| J-UC04 | Konsultasi Hukum E2EE | Klien & Advokat | `ConsultationController` → `Realtime/Storage` |
| J-UC05 | Pembayaran Konsultasi Escrow | Klien | `EscrowPaymentController` → `escrow_transactions` |
| J-UC07 | Registrasi Advokat / Notaris | Praktisi | `AdvocateAuthController` → `users_advocate` |
| J-UC11 | Sesi IRAC Note | Advokat | `IRACNoteController` → `case_irac_notes` |
| J-UC12 | Opini Hukum & Draft Kontrak | Advokat | `LegalDraftingController` → `legal_opinions` |
| J-UC23 | Corporate Intake & Notary Stamping | Klien & Notaris | `fn_create_corporate_intake_from_evidence_atomic` |
| J-UC24 | Transaksi Property & Escrow | Para Pihak | `fn_process_corporate_payment_webhook_atomic` |

---

## LAMPIRAN B — TABEL MIGRASI DAN RPC UTAMA POSTGRESQL

Tabel B.1 mencantumkan berkas migrasi dan fungsi terprosedur (*Remote Procedure Call*) utama basis data PostgreSQL (menargetkan versi mayor 17 per `supabase/config.toml`).

**Tabel B.1**: Daftar Migrasi dan RPC Utama PostgreSQL
| Berkas Migrasi / Tanggal | Fungsi / Tabel Utama | Atribut Keamanan & Peran |
|---|---|---|
| `20260722000016` | `public.service_orders` | `FORCE ROW LEVEL SECURITY` |
| `20260722000017` | `public.corporate_service_cases` | State Machine Guard `fn_guard_corporate_case_stage_mutation` |
| `20260722000019` | `public.provider_webhook_events` | `REVOKE ALL FROM authenticated, anon` |
| `20260722000022` | `public.compliance_workflow_events_worm` | WORM Trigger `fn_prevent_worm_mutation` (`ENABLE ALWAYS`) |
| `20260729021138` | `public.fn_activate_corporate_pricing_catalog` | `SECURITY DEFINER SET search_path = ''` |
| `20260729115454` | `public.fn_create_corporate_intake_from_evidence_atomic` | Atomic RPC Intake + Mutex Lock |
| `20260813032019` | `public.fn_process_corporate_payment_webhook_atomic` | Signed Webhook Atomic Settlement |
| `20260813064656` | `public.fn_process_corporate_payment_webhook_atomic` | Durable Replay Protection & Mutex Lock |

---

## LAMPIRAN C — RINGKASAN BUKTI KOMIT GIT (COMMIT EVIDENCE SUMMARY)

Tabel C.1 menyajikan ringkasan bukti komit Git yang mengunci implementasi dan dokumentasi Justifiqa per fixed point `53ea5ca5e0aacdf849877c9696f698ec469d9eb6`.

**Tabel C.1**: Ringkasan Bukti Komit Git
| Short Hash | Full Git Commit Hash | Author & Date | Pesan Komit Utama |
|---|---|---|---|
| `018fb05` | `018fb05e077937326c5ed4e27289f2e3b9d2e505` | shalom kurniawan (28 Jul 2026) | `fix(db): harden phase 2 backend security` |
| `6743953` | `67439533e079cceded8bbddba1f56a4db6388767` | shalom kurniawan (13 Aug 2026) | `fix(intake): make evidence ref isolation behavioral` |
| `2c7f28a` | `2c7f28a86109d58acf4d1319a84ed04ca2e679bf` | shalom kurniawan (13 Aug 2026) | `fix(docs): close corporate intake documentation audit chain` |
| `4cddf68` | `4cddf6866c50cf410697d330bc528d0daafd99fe` | shalom kurniawan (13 Aug 2026) | `feat(escrow): wire corporate payment settlement and status` |
| `59ff89d` | `59ff89dff3f49a8f169f7822c522f14163d5c707` | shalom kurniawan (13 Aug 2026) | `fix(escrow): preserve webhook replay after workflow progression` |
| `82e45bb` | `82e45bb8d17ac0f66dfa51c9e98b333e27317376` | shalom kurniawan (13 Aug 2026) | `docs(workflow): establish documentation control plane` |
| `53ea5ca` | `53ea5ca5e0aacdf849877c9696f698ec469d9eb6` | shalom kurniawan (13 Aug 2026) | `feat(presentation): add honest readiness demo and scope guide` |

---

## LAMPIRAN D — RINGKASAN HASIL PENGUJIAN (TEST RESULT SUMMARY)

Berikut adalah ringkasan hasil pengujian otomatis frontend dan pengujian *runtime SQL*:

```
===============================================================================
JUSTIFIQA AUTOMATED TEST SUITE SUMMARY (npm run test:phase2)
===============================================================================
Test Files Executed : 12 files
Total Test Cases    : 107 tests
Passed Assertions   : 107 passed
Failed Assertions   : 0 failed
Test Suite Status   : PASS (100% Success Rate)

Detailed Breakdown by Specification:
✔ corporateIntakeModel.test.ts             : 14/14 passed
✔ phase2IntegrationService.test.ts         : 18/18 passed
✔ phase2MutationState.test.ts              : 8/8 passed
✔ usePhase2Hooks.test.ts                   : 7/7 passed
✔ corporateIntakeIntegration.test.ts       : 21/21 passed
✔ corporateEscrowIntegration.test.ts       : 12/12 passed
✔ evidenceStateMachine.test.ts            : 6/6 passed
✔ intakeErrorParsing.test.ts               : 5/5 passed
✔ useCorporateEvidenceUploads.test.ts     : 10/10 passed
✔ intakeIdempotencyConflict.test.ts        : 3/3 passed
✔ evidenceUploadFeedback.test.ts          : 2/2 passed
✔ beneficialOwnerEvidenceIntegration.ts   : 1/1 passed
===============================================================================
POSTGRESQL RUNTIME SQL SUITE SUMMARY (corporate_escrow_settlement_runtime.sql)
===============================================================================
SQL Assertions      : 15 transactional checks
Advisory Mutex      : Verified (pg_advisory_xact_lock active)
Replay Protection   : Verified (replayed=true, 0 partial write)
RLS & ACL Isolation : Verified (Authenticated DML rejected on webhook events)
Transaction Status  : ROLLBACK CLEAN (Zero database contamination)
===============================================================================
```

---

## LAMPIRAN E — DEMO SCRIPT PRESENTASI JUJUR (DEMO SCRIPT)

Berikut adalah skrip panduan presentasi lokal 3-5 menit menggunakan halaman `/demo/readiness`:

1. **Tahap Persiapan**:
   - Jalankan perintah `npm run dev` di direktori `justifiqa-frontend`.
   - Buka alamat `http://localhost:5173/demo/readiness`.
   - Pembukaan: *"Demo ini menampilkan status keterujian sistem lokal (local implementation scope), bukan sistem yang siap rilis produksi."*

2. **Tahap 1 — Ringkasan Scope (Tab Ringkasan)**:
   - Tunjukkan 6 kartu status: Corporate Intake (`ACCEPTED_LOCAL`), Escrow Settlement (`ACCEPTED_LOCAL`), Payment Provider Initiation (`BLOCKED`), Notary Workspace (`FUTURE_WORK`), e-KYC/Signing (`FUTURE_WORK`), dan Production Readiness (`NOT_STARTED`).
   - Penjelasan: *"Corporate Intake dan Escrow Settlement telah diverifikasi secara lokal. Integrasi provider dan Notaris dibatasi secara jujur."*

3. **Tahap 2 — Alur Diterima Lokal (Tab Alur Diterima Lokal)**:
   - Jelaskan 4 langkah teruji: (1) Form intake & bukti BO terproteksi, (2) Edge Function JWT/idempotency, (3) Katalog harga & RPC atomik, dan (4) Signed webhook settlement.

4. **Tahap 3 — Roadmap & Penutup (Tab Roadmap)**:
   - Tunjukkan roadmap Batch 3.C, 3.D, Phase 4, dan Phase 5.
   - Penutup: *"Proyek ini membuktikan pengerasan backend dan penyelesaian escrow idempoten secara lokal. Integrasi produksi dicatat sebagai rencana masa depan."*

---

## LAMPIRAN F — MATRIKS KETERBATASAN DAN SOURCE TRACEABILITY SUMMARY

Tabel F.1 merangkum matriks pelacakan klaim laporan terhadap berkas sumber repositori.

**Tabel F.1**: Source Traceability Summary
| Claim ID | Deskripsi Klaim Laporan | Source Path Repositori | Status Verifikasi Faktual |
|---|---|---|---|
| TR-01 | Backend PostgreSQL Phase 2 Hardened | `PHASE_2_BACKEND_FORENSIC_CERTIFICATION.md` | VERIFIED (Komit `018fb05`) |
| TR-02 | Corporate Intake Accepted Local | `CorporateIntakeWizard.tsx` | VERIFIED (Komit `67439533`) |
| TR-04 | Corporate Escrow Accepted Local | `20260813032019_process_corporate_payment_webhook_atomic.sql` | VERIFIED (Komit `4cddf686`) |
| TR-05 | Webhook Replay Protection | `20260813064656_preserve_corporate_payment_webhook_replay.sql` | VERIFIED (Komit `59ff89df`) |
| TR-10 | HMAC SHA-256 Exact Bytes Verification | `supabase/functions/payment-webhook/handler.ts` | VERIFIED (Edge Function Source) |
| TR-14 | Presentation Scope Freeze `/demo/readiness` | `presentationReadinessModel.ts` | VERIFIED (Komit `53ea5ca5`) |
| TR-15 | Payment Initiation Blocked | `DEMO_GUIDE.md` | VERIFIED (Status `BLOCKED`) |
| TR-16 | Notary & e-KYC Future Work | `TRACEABILITY_MATRIX.md` | VERIFIED (Status `FUTURE_WORK`) |
| TR-17 | Phase 5 Production Not Started | `CURRENT_STATE.md` | VERIFIED (Status `NOT_STARTED`) |
