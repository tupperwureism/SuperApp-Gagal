# BAB IV — IMPLEMENTASI DAN PENGUJIAN

## 4.1 Lingkungan Pengoperasian dan Teknologi Utama

Implementasi dan pengujian platform Justifiqa dibangun di atas spesifikasi lingkungan perangkat lunak sebagai berikut:
- **Bahasa Pemrograman & Runtime**: TypeScript ~6.0.2, Node.js v24.16.0, Deno / Edge Runtime.
- **Kerangka Kerja Antarmuka**: React v19.2.7, Vite v8.1.1, Tailwind CSS v4.3.2.
- **Infrastruktur Backend**: Supabase BaaS (dengan `supabase/config.toml` menargetkan PostgreSQL versi mayor 17).
- **Alat Pengujian & Pengatur Kualitas**: Node.js Native Test Runner (`node --test`), Oxlint v1.71.0, Supabase CLI.
- **Sistem Kontrol Versi**: Git (Branch: `draft_final_report_justifiqa`, Fixed Point HEAD: `53ea5ca5e0aacdf849877c9696f698ec469d9eb6`, dikembangkan dari fixed point branch `batch-3b-corporate-escrow`).

Catatan kejujuran lingkungan: Konfigurasi lokal Supabase menargetkan PostgreSQL versi mayor 17 (`major_version = 17`). Laporan ini tidak mengklaim versi patch runtime basis data persis tanpa eksekusi kueri terverifikasi langsung pada instance database aktif.

## 4.2 Struktur Repository dan Pengorganisasian Kode

Struktur direktori utama repositori Justifiqa terbagi secara teratur untuk memisahkan logika antarmuka, fungsi *serverless*, migrasi basis data, dan dokumentasi kontrol audit:

```
justificadll/
├── justifiqa-frontend/                  # Kode Sumber Aplikasi Client & Admin React
│   ├── src/
│   │   ├── components/corporate/        # Komponen UI Corporate Intake & Escrow
│   │   ├── components/presentation/     # Komponen Halaman Presentation Readiness
│   │   ├── hooks/                       # Custom Hooks (usePhase2Mutation, dll)
│   │   ├── models/                      # Model Tipe Data & Validasi Domain
│   │   ├── pages/                       # Halaman Rute (DevShowcasePage, dll)
│   │   ├── router/                      # Konfigurasi Rute (AppRouter.tsx)
│   │   └── services/                    # Integration Services & Edge Gateways
│   └── test/                            # Suite Pengujian Otomatis Frontend
├── supabase/
│   ├── functions/                       # Edge Functions (corporate-intake, payment-webhook)
│   └── migrations/                      # Skema Migrasi Database PostgreSQL Phase 2
├── Tools/                               # Helper Scripts & SQL Transaction Runtime Suites
└── MarkDown/                            # Dokumentasi Kontrol Plane, DBB/DBS, & Final Report
```

## 4.3 Implementasi Backend Hardened Contract (Phase 2)

Pengerasan keamanan basis data PostgreSQL Phase 2 diimplementasikan melalui rangkaian migrasi `20260722000016` sampai `20260722000024` serta disempurnakan oleh migrasi penyelarasan `20260728000025` (Komit `018fb05e077937326c5ed4e27289f2e3b9d2e505`).

Hasil pengerasan backend pada himpunan objek teraudit mencakup:
1. **Penetapan Kebijakan FORCE RLS**: Pada 17 tabel kritis yang diuji dalam skema Phase 2, kebijakan `FORCE ROW LEVEL SECURITY` dikonfigurasi untuk mengisolasi akses data antar-penyewa (*multi-tenant isolation*).
2. **Pembersihan Privilese SECURITY DEFINER**: Semua fungsi terprosedur teraudit yang berjalan dengan privilese `SECURITY DEFINER` dikonfigurasi dengan opsi `SET search_path = ''` untuk mencegah serangan pencemaran skema sementara (*temporary schema shadowing attack*).
3. **Imutabilitas Ledger WORM**: Pemicu transaksi `fn_prevent_worm_mutation` dipasang dengan opsi `ENABLE ALWAYS` pada tabel teraudit `compliance_workflow_events_worm` dan `audit_logs_worm` untuk menolak operasi `UPDATE` dan `DELETE`.

Tabel 4.1 mencatat daftar komit Git bukti faktual dari seluruh tahapan implementasi utama.

**Tabel 4.1**: Daftar Komit Git Bukti Faktual Implementasi Utama
| Hash Komit Git | Pesan Komit / Cakupan Perubahan | Modul / Kelompok Tugas | Status Faktual |
|---|---|---|---|
| `018fb05e0779...` | `fix(db): harden phase 2 backend security` | Phase 2 Backend Hardened Contract | Certified Audit Integrasi |
| `67439533e079...` | `fix(intake): make evidence ref isolation behavioral` | Corporate Intake 3.A.1.7 | **ACCEPTED_LOCAL** |
| `2c7f28a86109...` | `fix(docs): close corporate intake documentation audit chain` | Corporate Intake Reconciliation | **ACCEPTED_LOCAL** (Docs) |
| `4cddf6866c50...` | `feat(escrow): wire corporate payment settlement and status` | Corporate Escrow 3.B | **ACCEPTED_LOCAL** |
| `59ff89dff3f4...` | `fix(escrow): preserve webhook replay after workflow progression` | Escrow Replay Hardening 3.B.1 | **ACCEPTED_LOCAL** |
| `82e45bb8d17a...` | `docs(workflow): establish documentation control plane` | Documentation Control Plane | **ACCEPTED_LOCAL** |
| `53ea5ca5e0aa...` | `feat(presentation): add honest readiness demo and scope guide` | Presentation Readiness Scope Freeze | **ACCEPTED_LOCAL** |

## 4.4 Implementasi Versioned Corporate Pricing Catalog

Struktur harga dan *payment milestones* perikatan korporasi diatur secara terpusat melalui migrasi `20260729021138_add_versioned_corporate_pricing_catalog.sql`. 

Implementasi berbasis tiga tabel utama:
- `corporate_pricing_catalogs`: Menyimpan versi katalog, jenis layanan (misal: `PT_STANDARD`), dan status aktif.
- `corporate_pricing_fee_lines`: Menyimpan rincian komponen biaya (seperti Biaya Jasa Hukum, PNBP Kemenkumham, dan Biaya Administrasi).
- `corporate_pricing_milestones`: Menyimpan persentase dan urutan pencairan dana *escrow*.

Penerbitan katalog harga baru dilakukan melalui fungsi `public.fn_activate_corporate_pricing_catalog(p_catalog_id UUID)`, yang secara atomik menonaktifkan katalog versi sebelumnya dan menandai katalog baru sebagai versi aktif tunggal.

## 4.5 Implementasi Atomic Corporate Intake RPC

Pendaftaran perkara korporasi dilaksanakan secara atomik menggunakan fungsi basis data `public.fn_create_corporate_intake_from_evidence_atomic` (Migrasi `20260729115454`). Fungsi ini mengeksekusi seluruh tahapan transaksi dalam satu blok `SECURITY DEFINER`:

```sql
-- Cuplikan Logika Utama Atomik Intake RPC
CREATE OR REPLACE FUNCTION public.fn_create_corporate_intake_from_evidence_atomic(
  p_order_id UUID,
  p_client_id UUID,
  p_entity_type VARCHAR,
  p_proposed_name VARCHAR,
  p_kbli_codes VARCHAR[],
  p_parties JSONB,
  p_beneficial_owners JSONB,
  p_evidence_batch_token UUID
) RETURNS JSONB AS $$
DECLARE
  v_catalog_id UUID;
  v_case_id UUID;
BEGIN
  -- 1. Kunci mutex transaksi berdasarkan order_id
  PERFORM pg_advisory_xact_lock(hashtext(p_order_id::text));
  
  -- 2. Ambil katalog harga aktif secara resmi
  SELECT catalog_id INTO v_catalog_id 
  FROM public.corporate_pricing_catalogs 
  WHERE is_active = true LIMIT 1;
  
  -- 3. Buat entitas service_orders (status = PAYMENT_PENDING), 
  --    corporate_service_cases (current_stage = DRAFT), 
  --    escrow_transactions (status = PENDING_PAYMENT), 
  --    dan payment_milestones (status = PENDING)
  -- 4. Hubungkan bukti berkas BO yang telah tervalidasi
  RETURN jsonb_build_object('success', true, 'case_id', v_case_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
```

Penggunaan `pg_advisory_xact_lock` menjamin bahwa dua transaksi pendaftaran dengan `order_id` yang sama tidak dapat menimbulkan pendaftaran kasus ganda (*duplicate case creation*). Setelah pengisian intake berhasil disubmit, status entitas ditetapkan secara eksplisit:
- `service_orders.status = 'PAYMENT_PENDING'`
- `corporate_service_cases.current_stage = 'DRAFT'`
- `escrow_transactions.status = 'PENDING_PAYMENT'`
- `payment_milestones.status = 'PENDING'`

## 4.6 Implementasi Protected Beneficial Owner Evidence Boundary

Pengunggahan dokumen identitas Pemilik Manfaat (*Beneficial Owner*) dipisahkan dari tabel perkara utama untuk mengamankan data sensitif. Mekanisme ini menggunakan tabel `public.corporate_intake_evidence_artifacts` dan fungsi dua tahap:

1. **Tahap Persiapan (`fn_prepare_corporate_intake_evidence_atomic`)**: Mengonfirmasi identitas klien, mengalokasikan token tiket pengunggahan (`batch_token`), dan mengembalikan jalur penyimpanan *presigned storage boundary*.
2. **Tahap Finalisasi (`fn_finalize_corporate_intake_evidence_atomic`)**: Memverifikasi ukuran berkas, mencatat hash SHA-256 dokumen, serta mengubah status bukti menjadi `FINALIZED`.

Dokumen bukti yang tidak difinalisasi dalam batas waktu 24 jam akan dihapus secara otomatis oleh fungsi pembersih *batch* `fn_expire_corporate_intake_evidence_batch`.

## 4.7 Implementasi Edge Functions Intake & Webhook

Dua *Supabase Edge Functions* dibangun pada lingkungan Deno untuk menangani logika bisnis perbatasan:

1. **`supabase/functions/corporate-intake/`**: Menangani permintaan HTTP POST dari antarmuka frontend, memverifikasi header `Authorization: Bearer <JWT>`, memvalidasi skema payload JSON, dan memanggil RPC atomik basis data.
2. **`supabase/functions/payment-webhook/`**: Menangani notifikasi status pembayaran dari penyedia pembayaran. Fungsi ini menerapkan verifikasi *exact raw body bytes* sebelum membaca muatan JSON.

## 4.8 Integrasi Frontend Service, Hook, dan Single-Flight Mutation State

Pada modul `justifiqa-frontend`, integrasi backend dikapsulasi ke dalam lapisan service dan hook:
- **`phase2IntegrationService.ts`**: Menyediakan abstraksi antarmuka `Phase2IntegrationGateway` yang menghubungkan komponen React ke Supabase PostgREST Client.
- **`usePhase2Mutation.ts`**: Hook khusus yang mengimplementasikan reducer `phase2MutationReducer` dan pembungkus *single-flight mutation* (`createSingleFlightMutation`).

Jika pengguna menekan tombol *submit* berulang kali, *single-flight guard* memeriksa status `isMutating`. Permintaan sekunder secara otomatis dibatalkan, sehingga mencegah pengiriman lalu lintas jaringan ganda. Selain itu, modul `intakeError.ts` memetakan kode kesalahan internal basis data ke pesan aman pada `INTAKE_ERROR_ALLOWLIST` (seperti `ORDER_NOT_FOUND` atau `INVALID_PAYLOAD`).

## 4.9 Implementasi Corporate Escrow Settlement

Penyelesaian pendanaan jaminan perikatan hukum dikelola melalui fungsi `public.fn_process_corporate_payment_webhook_atomic` (Migrasi `20260813032019` dan roll-forward `20260813064656`).

Ketika pemberitahuan pembayaran diterima dan diverifikasi, fungsi ini secara atomik memperbarui status entitas terkait secara terkoordinasi:
- `service_orders.status = 'ACTIVE'`
- `corporate_service_cases.current_stage = 'ESCROW_LOCKED'`
- `escrow_transactions.status = 'HELD_IN_ESCROW'`
- `payment_milestones.status = 'FUNDED'`
- `provider_webhook_events.status = 'PROCESSED'`

## 4.10 Verifikasi HMAC SHA-256, Timestamp Skew, dan Exact Raw Body

Pengamanan fungsi *payment webhook* (`supabase/functions/payment-webhook/handler.ts`) mengimplementasikan verifikasi kriptografi tingkat tinggi:

```typescript
// Cuplikan Verifikasi Exact Raw Body HMAC SHA-256
export async function verifyWebhookSignature(
  rawBodyBytes: Uint8Array,
  signatureHeader: string,
  secretHex: string
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    hexToBytes(secretHex),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const signatureBytes = hexToBytes(signatureHeader);
  return await crypto.subtle.verify("HMAC", key, signatureBytes, rawBodyBytes);
}
```

Persyaratan verifikasi meliputi:
- **Exact Raw Body**: Verifikasi HMAC dilakukan terhadap array byte mentah (`Uint8Array`) yang diterima dari aliran jaringan HTTP, bukan terhadap string JSON yang telah di-parse atau diformat ulang.
- **Timestamp Skew Control**: Header timestamp diperiksa terhadap jam server; selisih waktu melebihi 300 detik (5 menit) secara otomatis ditolak untuk mencegah serangan peniruan berbasis waktu.

## 4.11 Eksekusi Atomic Settlement RPC dan Transisi Lifecycle Case

Eksekusi RPC settlement menjamin bahwa transisi siklus hidup entitas bergerak secara konsisten. Apabila panggilan *webhook* kedua dikirimkan untuk transaksi yang telah berhasil diproses, `fn_process_corporate_payment_webhook_atomic` secara idempoten mendeteksi bahwa peristiwa tersebut telah tercatat pada `provider_webhook_events`. Fungsi basis data mengembalikan hasil `replayed = true` tanpa mengulang mutasi status transaksi (*zero partial write*).

## 4.12 Penerapan Authorization Boundary dan Least-Privilege ACL

Batasan otorisasi dipastikan dengan mencabut seluruh hak akses mutasi langsung dari peramban:
- Pernyataan SQL `REVOKE ALL ON TABLE public.provider_webhook_events FROM authenticated, anon;` memastikan bahwa pengguna peramban tidak dapat menyisipkan atau memalsukan catatan peristiwa pembayaran.
- Peran `service_role` hanya diizinkan memanggil RPC `fn_process_corporate_payment_webhook_atomic` melalui saluran pelayan tepercaya (*server-only execution*).

## 4.13 Implementasi Halaman Presentasi Jujur (`/demo/readiness`)

Untuk mendukung kejujuran demonstrasi dan pelaporan, dibangun halaman presentasi publik `/demo/readiness` (Komit `53ea5ca5e0aacdf849877c9696f698ec469d9eb6`). Halaman ini dikelola oleh komponen `DevShowcasePage.tsx` dan model data `presentationReadinessModel.ts`.

Halaman menyajikan 6 kartu status rilis yang terikat pada bukti fisik repositori:
1. `Corporate Intake`: **ACCEPTED_LOCAL** (Diterima lokal pada komit `67439533`).
2. `Corporate Escrow Settlement`: **ACCEPTED_LOCAL** (Diterima lokal pada komit `4cddf686` & `59ff89df`).
3. `Payment Provider Initiation`: **BLOCKED** (Terblokir karena pemilihan vendor produksi belum selesai).
4. `Notary Workspace`: **FUTURE_WORK** (Rencana masa depan Batch 3.C).
5. `e-KYC & Signing`: **FUTURE_WORK** (Rencana masa depan Batch 3.D).
6. `Production Readiness`: **NOT_STARTED** (Belum dimulai).

Halaman presentasi ini tidak menyediakan tombol mutasi buatan atau formulir pembayaran palsu (*no fake mutation*).

## 4.14 Hasil Pengujian Otomatis Frontend dan Runtime SQL Transaction

Verifikasi kelayakan sistem dilaksanakan melalui dua suite pengujian komprehensif:

1. **Frontend & Service Automated Suite (`npm run test:phase2`)**:
   - Dieksekusi menggunakan Node.js Native Test Runner pada 12 berkas spesifikasi pengujian.
   - Hasil eksekusi: **107 passing assertions / 0 failures** (PASS).
   - Pengujian mencakup validasi skema form intake, manajemen state reducer, retry logic, error parsing, presigned upload state, serta rute halaman presentasi.

2. **Runtime SQL Transactional Suite (`Tools/corporate_escrow_settlement_runtime.sql`)**:
   - Dieksekusi langsung pada mesin basis data PostgreSQL.
   - Pengujian mensimulasikan skenario pembuatan perkara, inisiasi escrow, eksekusi signed webhook, penanganan race condition serentak, eksekusi replay webhook berulang, penolakan mutasi DML anonim, serta verifikasi aturan WORM.
   - Seluruh rangkaian pengujian SQL diakhiri dengan perintah `ROLLBACK` untuk menjamin tidak ada pencemaran data basis data lokal. Hasil eksekusi: **PASS (100% Rollback Clean)**.

Tabel 4.2 merangkum hasil audit forensik pengerasan backend PostgreSQL pada objek teruji per dokumen sertifikasi `PHASE_2_BACKEND_FORENSIC_CERTIFICATION.md`.

**Tabel 4.2**: Hasil Verifikasi Audit Forensik Backend PostgreSQL Phase 2 (Cakupan Objek Teruji)
| Kategori Audit Forensik | Item Verifikasi Objek Teruji | Hasil Factual Verification |
|---|---|---|
| RLS Coverage | 17 tabel teruji skema Phase 2 | 100% FORCE RLS Enabled pada entitas teruji |
| SECURITY DEFINER ACL | Fungsi terprosedur backend teruji | 100% Fixed `search_path = ''` pada fungsi teruji |
| WORM Triggers | Tabel event & audit ledger teruji | 100% Trigger `tgenabled = ALWAYS` pada ledger teruji |
| Replay Protection | Atomic settlement RPC | Pass (Replay returns `replayed=true`, 0 partial write) |
| Multi-tenant Isolation | Probe akses RLS antar-pengguna | Pass (Owner 1 baris, Foreign tenant 0 baris) |
| Symbol Map Check | Integrity `SYMBOLS_MAP.md` | Pass (`node Tools/generate_symbol_map.mjs --check` exit 0) |

## 4.15 Matriks Matched Requirements vs Implementation vs Test Results

Tabel 4.3 menyajikan matriks penelusuran 360-derajat (*360-degree traceability matrix*) yang menghubungkan spesifikasi kebutuhan, artefak kode sumber, metode pengujian, dan hasil faktual.

**Tabel 4.3**: Matriks Traceability Requirements → Implementation → Test → Status Result
| Requirement Code | Spesifikasi Kebutuhan | File Kode / Migrasi Source | Metode & File Pengujian | Hasil Factual Result |
|---|---|---|---|---|
| REQ-INT-01 | Pengisian Form Intake Korporasi Bertahap | `CorporateIntakeWizard.tsx` & `corporateIntakeModel.ts` | Node.js Test `corporateIntakeModel.test.ts` | PASS (107/107 Suite) |
| REQ-INT-02 | Proteksi Berkas Bukti BO Presigned Boundary | `20260729115454_protected_beneficial_owner_evidence_boundary.sql` | Node.js Test `beneficialOwnerEvidenceIntegration.test.ts` | PASS |
| REQ-INT-03 | Penggunaan Katalog Harga Resmi Berversi | `20260729021138_add_versioned_corporate_pricing_catalog.sql` | SQL Runtime `corporate_escrow_settlement_runtime.sql` | PASS (Rollback Clean) |
| REQ-ESC-01 | Webhook HMAC SHA-256 Raw Bytes Verification | `supabase/functions/payment-webhook/handler.ts` | Node.js Test `payment-webhook/handler.test.ts` | PASS |
| REQ-ESC-02 | Atomic Escrow Settlement & Mutex Locking | `20260813032019_process_corporate_payment_webhook_atomic.sql` | SQL Runtime `corporate_escrow_settlement_runtime.sql` | PASS |
| REQ-ESC-03 | Replay Attack Protection & Zero Write | `20260813064656_preserve_corporate_payment_webhook_replay.sql` | SQL Runtime & Handler Test | PASS |
| REQ-SEC-01 | Direct DML Revocation on Webhook Tables | Grant/Revoke statements on `provider_webhook_events` | SQL Runtime ACL Audit Probe | PASS (Access Denied) |
| REQ-UI-01 | Honest Presentation Scope Page | `DevShowcasePage.tsx` & `presentationReadinessModel.ts` | Node.js Test `presentationReadiness.test.ts` | PASS |

## 4.16 Keterbatasan Faktual dan Pembatasan Fitur

Berdasarkan hasil pengujian empiris pada fixed point `53ea5ca5e0aacdf849877c9696f698ec469d9eb6`, ditetapkan keterbatasan faktual sistem yang diringkas pada Tabel 4.4.

**Tabel 4.4**: Matriks Keterbatasan Faktual Rilis Sistem per Fixed Point
| Modul / Komponen | Status Faktual | Keterbatasan Faktual Spesifik | Alasan Teknis / Dependency |
|---|---|---|---|
| Corporate Intake | ACCEPTED_LOCAL | Pengujian dilakukan pada lingkungan basis data lokal | Memerlukan penyedia storage produksi untuk deployment live |
| Corporate Escrow | ACCEPTED_LOCAL | Settlement diverifikasi via simulator signed webhook lokal | Belum terhubung ke payment gateway vendor produksi |
| Payment Initiation | **BLOCKED** | Tombol pembayaran produksi sengaja tidak disediakan | Pemilihan kredensial vendor produksi belum disepakati |
| Notary Workspace | **FUTURE_WORK** | Seam basis data tersedia, alur browser belum selesai | Diteruskan sebagai target pengembangan Batch 3.C |
| e-KYC & Signing | **FUTURE_WORK** | Amplop sertifikat & liveness belum end-to-end | Diteruskan sebagai target pengembangan Batch 3.D |
| Production Go-Live | **NOT_STARTED** | Observability, runbook, & audit live belum ada | Memerlukan fase persiapan Phase 5 secara khusus |
| Berkas DOCX Rilis | **QA_BLOCKED** | Berkas DOCX dibuat; QA visual terblokir karena LibreOffice tidak ada | `DOCX CREATED; STRUCTURAL CHECK PASSED; VISUAL RENDER QA BLOCKED BY MISSING RENDERER` |
