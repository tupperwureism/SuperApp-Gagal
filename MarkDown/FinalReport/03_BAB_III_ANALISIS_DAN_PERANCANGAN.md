# BAB III — ANALISIS DAN PERANCANGAN

## 3.1 Gambaran Umum Justifiqa

Justifiqa dirancang sebagai platform *legal-tech* terintegrasi yang melayani kebutuhan konsultasi hukum perseorangan serta penanganan pendirian dan perizinan badan hukum (*corporate concierge service*). Platform ini dirancang untuk mengatasi kerentanan keamanan dan inefisiensi transaksi pada platform hukum konvensional dengan menerapkan pendekatan arsitektur terdekopel berbasis *Backend-as-a-Service* (BaaS) Supabase dan basis data relasional PostgreSQL (di mana konfigurasi lokal Supabase `supabase/config.toml` menargetkan PostgreSQL versi mayor 17).

Dua pilar utama yang menjadi fokus analisis dan perancangan pada laporan ini adalah:
1. **Sistem Pendaftaran Perkara Korporasi (*Corporate Intake System*)**: Menangani proses pendaftaran perikatan hukum korporasi, identifikasi entitas, verifikasi pengurus dan pemegang saham, serta pengunggahan bukti Pemilik Manfaat (*Beneficial Owner* / BO) yang terlindungi.
2. **Sistem Penampungan Dana Jaminan (*Corporate Escrow Settlement System*)**: Mengelola pembayaran dana jaminan hukum berbasis tahapan pengerjaan (*milestones*), verifikasi notifikasi pembayaran berbasis *signed webhook*, serta pencairan atau pengembalian dana secara aman dan idempoten.

## 3.2 Analisis Kebutuhan Aktor dan Peran Sistem

Berdasarkan analisis pemangku kepentingan (*stakeholder analysis*), platform Justifiqa mengidentifikasi empat aktor utama sistem sebagai berikut:
1. **Klien Hukum Korporasi (*Corporate Client*)**: Aktor pengguna yang mendaftarkan perkara hukum, memilih paket layanan hukum korporasi, mengunggah dokumen identitas BO, serta melakukan pembayaran dana jaminan ke rekening *escrow*.
2. **Praktisi Hukum / Advokat / Notaris (*Legal Practitioner / Advocate / Notary*)**: Aktor profesional hukum yang memproses perikatan perkara, melakukan verifikasi dokumen legalitas, melaksanakan penandatanganan akta, serta menerima pencairan dana *escrow* setelah pekerjaan disetujui.
3. **Administrator Platform (*Platform Admin*)**: Aktor pengelola internal yang memantau transaksi *escrow*, memverifikasi kredensial praktisi hukum, serta mengelola katalog harga layanan hukum.
4. **Penyedia Pembayaran / Webhook System (*Payment Provider Webhook*)**: Aktor sistem eksternal yang mengirimkan notifikasi status pembayaran terautentikasi melalui protokol HTTP POST *signed webhook*.

## 3.3 Analisis Kebutuhan Fungsional (Use Case)

Kebutuhan fungsional platform Justifiqa dikelompokkan ke dalam modul-modul utama yang digambarkan pada Tabel 3.1.

**Tabel 3.1**: Matriks Kebutuhan Fungsional Utama Platform Justifiqa
| Kode Use Case | Nama Use Case | Aktor Utama | Deskripsi Singkat Fungsionalitas |
|---|---|---|---|
| UC-INT-01 | Pengisian Form Corporate Intake | Klien Korporasi | Klien mengisi data entitas (PT/CV), usulan nama, data pengurus, dan kode KBLI secara bertahap. |
| UC-INT-02 | Pengunggahan Bukti BO Terproteksi | Klien Korporasi | Klien mengunggah berkas bukti BO (KTP/Paspor) melalui *presigned storage boundary* terenkripsi. |
| UC-INT-03 | Penetapan Katalog Harga Berversi | System / Admin | Sistem menentukan struktur biaya dan *payment milestones* secara atomik berbasis katalog harga aktif (`corporate_pricing_catalogs`). |
| UC-ESC-01 | Inisiasi Pembayaran Escrow | Klien Korporasi | Sistem menampilkan rincian *escrow total* dan milestone pembayaran tanpa menyimpan kredensial pembayaran di peramban. |
| UC-ESC-02 | Verifikasi Signed Payment Webhook | Payment Provider | Edge Function menerima *webhook*, memverifikasi tanda tangan HMAC SHA-256 raw bytes, dan memeriksa *timestamp skew*. |
| UC-ESC-03 | Eksekusi Atomic Settlement RPC | System / PostgreSQL | Basis data mengunci baris escrow, mengubah status entitas terkait, dan menandai milestone `FUNDED` secara atomik. |
| UC-ESC-04 | Proteksi Replay & Concurrency Webhook | System / PostgreSQL | Basis data memblokir penimpaan data pada notifikasi webhook berulang dan menangani panggilan serentak via advisory mutex. |
| UC-DEM-01 | Visualisasi kejujuran Scope Presentasi | Publik / Tester | Antarmuka `/demo/readiness` menampilkan kartu status rilis jujur (*ACCEPTED_LOCAL*, *BLOCKED*, *FUTURE_WORK*, *NOT_STARTED*). |

## 3.4 Analisis Kebutuhan Non-Fungsional

Kebutuhan non-fungsional mendefinisikan batasan kualitas dan keamanan sistem seperti dirangkum pada Tabel 3.2.

**Tabel 3.2**: Matriks Kebutuhan Non-Fungsional Platform Justifiqa
| Kategori | Spesifikasi Kebutuhan Non-Fungsional |
|---|---|
| **Security** | Seluruh komunikasi menggunakan HTTPS/TLS 1.3. Otentikasi berbasis JWT GoTrue. Verifikasi *webhook* menggunakan HMAC SHA-256 berbasis berkas *exact raw body bytes*. |
| **Privacy** | Dokumen bukti BO diisolasi menggunakan *presigned storage URL* dan kebijakan RLS `ENABLE ALWAYS` pada PostgreSQL. |
| **Auditability** | Setiap transaksi keuangan dan peristiwa kepatuhan dicatat ke dalam tabel *Write Once Read Many* (WORM) `compliance_workflow_events_worm`. |
| **Consistency** | Seluruh transaksi *intake* dan *escrow* wajib mematuhi aturan ACID PostgreSQL dengan garansi *zero partial write*. |
| **Availability & Responsiveness** | Antarmuka berbasis React 19 / Vite dengan waktu muat halaman < 2 detik pada jaringan standar. |
| **Responsive UI** | Tata letak antarmuka bersifat responsif (*fluid responsive*) menggunakan Tailwind CSS tanpa *overflow* pada berbagai resolusi layar. |

## 3.5 Arsitektur Berlapis Sistem Justifiqa

Arsitektur platform Justifiqa dirancang menggunakan pemisahan empat lapisan utama (*four-tier decoupled architecture*):
1. **Presentation Layer (React Frontend)**: Antarmuka berbasis React 19, TypeScript, dan Tailwind CSS. Komponen UI berkomunikasi hanya melalui *Custom Hooks* dan *Integration Services*.
2. **Integration & Edge Layer (Supabase Edge Functions & Services)**: Berada pada lingkungan Deno Edge Runtime. Bertanggung jawab memverifikasi otentikasi JWT pengguna, memverifikasi tanda tangan HMAC *webhook*, serta mengodekan payload sebelum dikirim ke basis data.
3. **API & Facade Layer (PostgREST & RPC Facades)**: Menjadi perantara aman yang mengekspos fungsi terprosedur (`public.fn_*`) tanpa mengizinkan akses DML langsung dari peramban ke tabel sensitif.
4. **Database & Storage Layer (PostgreSQL Engine)**: Menargetkan PostgreSQL versi mayor 17 (per `supabase/config.toml`). Menyimpan data relasional, mengonfigurasi aturan *Row Level Security* (RLS), *Access Control List* (ACL), serta pemicu transaksi (*database triggers*).

Gambar 3.1 mengilustrasikan arsitektur berlapis platform Justifiqa (As-Built vs Target Architecture).

```
+-----------------------------------------------------------------------+
|                    PRESENTATION LAYER (React 19 / TS)                 |
|  [CorporateIntakeWizard]  [CorporateEscrowPanel]  [/demo/readiness]   |
+-----------------------------------++----------------------------------+
                                    || (REST / HTTPS)
+-----------------------------------vv----------------------------------+
|                  INTEGRATION LAYER (Supabase Edge Functions)          |
|   - JWT Claims Verification       - HMAC SHA-256 Signature Check      |
|   - Single-Flight Mutation State  - Exact Raw Body Digest Audit       |
+-----------------------------------++----------------------------------+
                                    || (PostgREST Facade / RPC)
+-----------------------------------vv----------------------------------+
|               DATABASE LAYER (PostgreSQL Major Version 17)            |
|   - Versioned Pricing Catalog     - Atomic RPCs (SECURITY DEFINER)    |
|   - Beneficial Owner Boundary     - WORM Event Ledgers & Triggers     |
|   - FORCE Row Level Security      - Advisory Lock Concurrency Mutex   |
+-----------------------------------------------------------------------+
```
*Gambar 3.1: Arsitektur Berlapis Platform Justifiqa (As-Built vs Target Architecture) [INLINE_TEXT_DIAGRAM]*

## 3.6 Perancangan Skema Database PostgreSQL (ERD)

Skema basis data Justifiqa dirancang terintegrasi untuk mendukung proses perikatan korporasi dan transaksi *escrow*. Gambar 3.2 menyajikan konseptualisasi relasi entitas (*Entity Relationship Diagram*).

```
+-----------------------------+       +-----------------------------------+
| corporate_pricing_catalogs  |       |     corporate_service_cases       |
+-----------------------------+       +-----------------------------------+
| catalog_id (PK)             |<----->| case_id (PK)                      |
| service_type                |       | order_id (FK -> service_orders)   |
| is_active / version         |       | current_stage (DRAFT/LOCKED/etc)  |
+--------------+--------------+       +-----------------+-----------------+
               |                                        |
               v                                        v
+--------------+--------------+       +-----------------+-----------------+
| corporate_pricing_fee_lines |       |        beneficial_owners        |
+-----------------------------+       +-----------------------------------+
| line_id (PK)                |       | owner_id (PK)                     |
| catalog_id (FK)             |       | case_id (FK)                      |
| amount / fee_type           |       | full_name / id_card_number_enc    |
+-----------------------------+       +-----------------------------------+
                                                        |
                                                        v
+-----------------------------+       +-----------------------------------+
|     escrow_transactions     |       | corporate_intake_evidence_artifacts|
+-----------------------------+       +-----------------------------------+
| escrow_id (PK)              |       | evidence_id (PK)                  |
| order_id / case_id (FK)     |       | client_id / case_id (FK)          |
| status                      |       | storage_path / checksum_sha256    |
+-----------------------------+       +-----------------------------------+
```
*Gambar 3.2: Conceptual Entity Relationship Diagram (ERD) Corporate Intake & Escrow [INLINE_TEXT_DIAGRAM]*

Rincian spesifikasi entitas utama dijelaskan pada Tabel 3.3.

**Tabel 3.3**: Spesifikasi Entitas Utama Skema Database PostgreSQL
| Nama Tabel | Peran Utama | Kunci Utama (PK) / Kunci Asing (FK) | Mekanisme Perlindungan |
|---|---|---|---|
| `corporate_pricing_catalogs` | Menyimpan versi katalog harga resmi | `catalog_id` (PK) | Immutable via trigger `fn_guard_corporate_pricing_catalog_mutation` |
| `corporate_service_cases` | Menyimpan siklus hidup perkara korporasi | `case_id` (PK), `order_id` (FK) | State machine transition guard `fn_guard_corporate_case_stage_mutation` |
| `beneficial_owners` | Menyimpan data pemilik manfaat korporasi | `owner_id` (PK), `case_id` (FK) | Kolom identitas sensitif dienkripsi |
| `corporate_intake_evidence_artifacts` | Menyimpan rujukan bukti berkas BO | `evidence_id` (PK), `client_id` (FK) | Presigned storage boundary + TTL Expiration Job |
| `escrow_transactions` | Menyimpan data transaksi jaminan | `escrow_id` (PK), `order_id` (FK) | FORCE RLS + trigger `fn_guard_escrow_financial_state` |
| `provider_webhook_events` | Ledger catatan peristiwa webhook | `event_id` (PK), `provider_event_id` (UK) | Append-only ACL (`REVOKE ALL FROM authenticated, anon`) |
| `compliance_workflow_events_worm` | Ledger bukti audit aturan hukum | `event_id` (PK) | WORM Trigger (`tgenabled = ALWAYS`), penolakan UPDATE/DELETE |

## 3.7 State Model dan Transisi Status Terikat Entitas

Siklus hidup perikatan perkara korporasi dan transaksi *escrow* dikendalikan oleh transisi status yang terpisah pada masing-masing entitas basis data. Penting untuk tidak menggabungkan status entitas yang berbeda ke dalam satu *state machine* tunggal, melainkan mendokumentasikannya secara eksplisit sesuai entitas terkait:

1. **Entitas `service_orders`**:
   - `DRAFT` → `PAYMENT_PENDING` (saat pengisian intake disubmit) → `ACTIVE` (saat pembayaran escrow dikonfirmasi).
2. **Entitas `corporate_service_cases`**:
   - `DRAFT` (saat perkara dibuat) → `ESCROW_LOCKED` (saat dana escrow berhasil dikunci via webhook settlement).
3. **Entitas `escrow_transactions`**:
   - `PENDING_PAYMENT` (saat tagihan diterbitkan) → `HELD_IN_ESCROW` (saat pembayaran dikonfirmasi terikat transaksi).
4. **Entitas `payment_milestones`**:
   - `PENDING` (saat alokasi milestone dibuat) → `FUNDED` (saat pendanaan escrow berhasil diproses).

Eksekusi *signed payment webhook* melalui RPC atomik `fn_process_corporate_payment_webhook_atomic` mengoordinasikan seluruh transisi status entitas tersebut secara atomik dalam satu transaksi basis data. Alur transisi status terikat entitas ini digambarkan pada Gambar 3.3 (diturunkan langsung dari berkas migrasi `supabase/migrations/20260722000017_*` dan `20260813032019_*`).

```
+-----------------------------------------------------------------------------------+
|                        ALUR TRANSISI STATUS PER ENTITY                            |
+-----------------------------------------------------------------------------------+
| Entitas               | Setelah Submit Intake       | Setelah Payment Webhook     |
+-----------------------+-----------------------------+-----------------------------+
| service_orders        | status = PAYMENT_PENDING    | status = ACTIVE             |
| corporate_service_cases| current_stage = DRAFT       | current_stage = ESCROW_LOCKED|
| escrow_transactions   | status = PENDING_PAYMENT    | status = HELD_IN_ESCROW     |
| payment_milestones    | status = PENDING            | status = FUNDED             |
+-----------------------------------------------------------------------------------+
```
*Gambar 3.3: Diagram Transisi Status Terikat Entitas Basis Data [INLINE_TEXT_DIAGRAM]*

## 3.8 Perancangan Keamanan Data, Access Control List (ACL), dan RLS

Sistem keamanan Justifiqa menerapkan prinsip *Defense in Depth*:
1. **Row Level Security (RLS)**: Seluruh 17 tabel keuangan dan perkara korporasi dikonfigurasi dengan aturan `ALTER TABLE ... FORCE ROW LEVEL SECURITY`. Aturan RLS memverifikasi bahwa `auth.uid()` pemanggil cocok dengan kolom `client_id` atau `advocate_id` pada baris data.
2. **Least-Privilege Access Control List (ACL)**: Hak akses DML langsung pada tabel sensitif seperti `provider_webhook_events` dan `escrow_transactions` dicabut dari peran `authenticated` dan `anon` (`REVOKE ALL ON TABLE ... FROM authenticated, anon`). Peramban dilarang melakukan operasi `INSERT` atau `UPDATE` secara langsung.
3. **Protected Evidence Boundary**: Pengunggahan berkas bukti BO dilakukan melalui fungsi atomik dua tahap: `fn_prepare_corporate_intake_evidence_atomic` (menghasilkan *presigned upload URL* dan token tiket) serta `fn_finalize_corporate_intake_evidence_atomic` (mencatat hash SHA-256 dan memvalidasi ukuran berkas).

## 3.9 Perancangan Idempotensi dan Penguncian Concurrency (Mutex)

Untuk mengatasi masalah eksekusi ganda dan kondisi balapan (*race condition*) pada saat penyelesaian pembayaran *escrow*, dirancang dua mekanisme penguncian:
1. **Transaction Mutex (`pg_advisory_xact_lock`)**: RPC `fn_process_corporate_payment_webhook_atomic` memperoleh penguncian penasihat berbasis hash transaksi `hashtext(p_provider_event_id)` pada awal eksekusi. Jika dua panggilan *webhook* serentak tiba pada milidetik yang sama, transaksi kedua dipaksa menunggu sampai transaksi pertama selesai (*serialized execution*).
2. **Durable Replay Protection**: Apabila panggilan *webhook* kedua memiliki `provider_event_id` yang identik dengan peristiwa yang telah berstatus `PROCESSED`, fungsi basis data secara otomatis mengenali bukti transaksi yang telah tersimpan, mengembalikan tanda terima yang identik, dan melakukan penolakan mutasi ulang (*short-circuit zero partial write*).

## 3.10 Perancangan UI Corporate Intake/Escrow & Presentation Page

Antarmuka pengguna Justifiqa dibangun menggunakan React 19 dan Tailwind CSS dengan prinsip *Function-Driven Design*:
1. **Corporate Intake Wizard**: Antarmuka alur langkah terpandu (*stepper*) yang membagi pengisian data menjadi empat langkah utama: (a) Profil Perseroan, (b) Data Para Pihak, (c) Pemilik Manfaat & Bukti BO, dan (d) Ringkasan & Checkout.
2. **Corporate Escrow Checkout Panel**: Panel yang menampilkan breakdown biaya transparan berdasarkan katalog harga resmi serta status penguncian dana jaminan.
3. **Presentation Readiness Page (`/demo/readiness`)**: Halaman khusus yang menyajikan kartu status rilis secara jujur tanpa tombol mutasi buatan, yang memisahkan fitur berstatus *ACCEPTED_LOCAL*, *BLOCKED*, *FUTURE_WORK*, dan *NOT_STARTED*.

Gambar 3.4 dan 3.5 menyajikan rancangan visual antarmuka pengguna.

```
+-----------------------------------------------------------------------+
|  Corporate Intake Wizard -- Langkah 3: Pemilik Manfaat (BO)           |
|  [+] Tambah Beneficial Owner                                          |
|  Nama Lengkap: [__________________]  NIK: [__________________]        |
|  Upload Bukti KTP/Paspor: [ Choose File ] -> (Presigned Upload State) |
|  [ Kembali ]                                            [ Lanjutkan ] |
+-----------------------------------------------------------------------+
```
*Gambar 3.4: Wireframe Antarmuka Corporate Intake Wizard [INLINE_TEXT_DIAGRAM]*

```
+-----------------------------------------------------------------------+
|  DevShowcase -- Presentation Readiness Dashboard (/demo/readiness)     |
|  [ ACCEPTED_LOCAL ] Corporate Intake 3.A      (Verified Local)        |
|  [ ACCEPTED_LOCAL ] Corporate Escrow 3.B      (Verified Local)        |
|  [ BLOCKED        ] Payment Provider Init     (No Live Provider)      |
|  [ FUTURE_WORK    ] Notary Workspace 3.C      (Roadmap Target)        |
|  [ FUTURE_WORK    ] e-KYC & Signing 3.D       (Roadmap Target)        |
|  [ NOT_STARTED    ] Phase 5 Production Ready  (Unstarted)             |
+-----------------------------------------------------------------------+
```
*Gambar 3.5: Wireframe Antarmuka Presentation Readiness Demo Page [INLINE_TEXT_DIAGRAM]*

## 3.11 Pemisahan Target Architecture versus As-Built Scope

Penataan dokumentasi arsitektur Justifiqa menegaskan pemisahan yang jelas antara **Target Architecture** (rancangan jangka panjang) dan **As-Built Scope** (kondisi fisik yang terimplementasi pada fixed point `53ea5ca5`):
- **As-Built Scope**: Hardened backend contract Phase 2, Corporate Intake (3.A/3.A.1), dan Corporate Escrow Settlement (3.B/3.B.1) pada tingkat pengujian lokal.
- **Target Architecture**: Integrasi otomatis ke portal Kemenkumham (AHU Online), sistem OSS, kerja sama dengan Penyelenggara Sertifikat Elektronik (PSrE) untuk e-KYC liveness luring, serta penyedia pembayaran langsung produksi. Seluruh target ini tetap disimpan pada dokumentasi perancangan sebagai peta jalan (*roadmap*), namun tidak dicantumkan sebagai fitur yang telah selesai.

## 3.12 Metode Batching dan Audit Gate

Pengembangan platform Justifiqa dikelola melalui metode *Batch-Based Implementation*. Setiap kelompok tugas (*batch*) memiliki dokumen rencana (*Design Before Code* / DBB) dan dokumen pembelajaran (*Design Beyond State* / DBS) yang disimpan pada folder `MarkDown/Batches/`.

Sebelum suatu *batch* dinyatakan diterima (*ACCEPTED_LOCAL*), *batch* tersebut wajib melewati pintu pemeriksaan (*Audit Gate*) yang memeriksa:
1. Kesesuaian kode sumber terhadap batasan kontrak RLS/ACL.
2. Keberhasilan pengujian otomatis unit dan integrasi.
3. Ketersediaan pemetaan simbol pada `SYMBOLS_MAP.md`.
4. Kejujuran pelaporan status tanpa menaikkan klaim ke tingkat produksi tanpa otorisasi eksplisit.
