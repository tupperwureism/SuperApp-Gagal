# Figure & Diagram Plan — Laporan Tugas Akhir Justifiqa

> Dokumen perencanaan dan inventarisasi gambar/diagram untuk Laporan Tugas Akhir Justifiqa per fixed point `53ea5ca5e0aacdf849877c9696f698ec469d9eb6` pada branch `draft_final_report_justifiqa` (berasal dari fixed point branch `batch-3b-corporate-escrow`).

## 1. Inventarisasi dan Status Gambar Faktual

| No. Gambar | Bab / Section | Caption Gambar | Tujuan Visualisasi | Source / Route / Origin | Status Faktual | Catatan Pengambilan / Masking |
|---|---|---|---|---|---|---|
| Gambar 3.1 | Bab III / 3.5 | Arsitektur Berlapis Platform Justifiqa (As-Built vs Target) | Menjelaskan struktur arsitektur 4-tier dari React Frontend, Edge Functions, RPC, hingga PostgreSQL Engine | Teks Diagram Laporan | INLINE_TEXT_DIAGRAM | Teks diagram terindikasi langsung dalam dokumen Markdown. |
| Gambar 3.2 | Bab III / 3.6 | Conceptual Entity Relationship Diagram (ERD) Corporate Intake & Escrow | Visualisasi relasi entitas basis data terintegrasi | `supabase/migrations/` | INLINE_TEXT_DIAGRAM | Teks ERD terindikasi langsung dalam dokumen Markdown. |
| Gambar 3.3 | Bab III / 3.7 | Diagram Transaksi Terikat Entitas (Entity-Bound Status Transitions) | Menjelaskan alur transisi status entitas service_orders, corporate_service_cases, escrow_transactions, dan payment_milestones | `supabase/migrations/20260722000017_p2_b4_corporate_concierge_and_bo.sql` & `supabase/migrations/20260813032019_process_corporate_payment_webhook_atomic.sql` | INLINE_TEXT_DIAGRAM | Teks transisi entitas terindikasi langsung dalam dokumen Markdown. |
| Gambar 3.4 | Bab III / 3.10 | Wireframe Antarmuka Corporate Intake Wizard | Menampilkan rancangan UI pengisian data perseroan dan beneficial owner | `justifiqa-frontend/src/components/corporate/CorporateIntakeWizard.tsx` | INLINE_TEXT_DIAGRAM | Teks wireframe terindikasi langsung dalam dokumen Markdown. |
| Gambar 3.5 | Bab III / 3.10 | Wireframe Antarmuka Presentation Readiness Demo Page | Menampilkan rancangan UI dashboard kejujuran scope presentasi | `justifiqa-frontend/src/pages/DevShowcasePage.tsx` | INLINE_TEXT_DIAGRAM | Teks wireframe terindikasi langsung dalam dokumen Markdown. |
| Gambar 4.1 | Bab IV / 4.2 | Tangkapan Layar Halaman Landing Gateway Justifiqa | Menunjukkan portal beranda publik Justifiqa | Route `/` | TO_CAPTURE | Jalankan `npm run dev` pada `justifiqa-frontend`, buka `http://localhost:5173/`. Masking: tidak ada data pribadi. |
| Gambar 4.2 | Bab IV / 4.13 | Tangkapan Layar Halaman Presentation Readiness — Ringkasan Scope | Menunjukkan 6 kartu status rilis dan roadmap | Route `/demo/readiness` (Tab Ringkasan) | TO_CAPTURE | Buka `http://localhost:5173/demo/readiness`, tab Ringkasan. Masking: tidak ada. |
| Gambar 4.3 | Bab IV / 4.13 | Tangkapan Layar Halaman Presentation Readiness — Alur Diterima Lokal | Menunjukkan alur intake hingga settlement yang diterima lokal | Route `/demo/readiness` (Tab Alur Diterima Lokal) | TO_CAPTURE | Buka `http://localhost:5173/demo/readiness`, tab Alur Diterima Lokal. Masking: tidak ada. |
| Gambar 4.4 | Bab IV / 4.13 | Tangkapan Layar Halaman Presentation Readiness — Roadmap Pengembangan | Menunjukkan pembatasan eksplisit untuk Batch 3.C, 3.D, Phase 4, dan Phase 5 | Route `/demo/readiness` (Tab Roadmap) | TO_CAPTURE | Buka `http://localhost:5173/demo/readiness`, tab Roadmap. Masking: tidak ada. |
| Gambar 4.5 | Bab IV / 4.6 | Form Corporate Intake Wizard Terintegrasi | Menunjukkan input data perseroan dan beneficial owner | Route `/client/dashboard` (Corporate Suite) | TO_CAPTURE | Buka portal klien lokal, pilih Corporate Suite. Masking: NIK / Nama KTP dummy. |
| Gambar 4.6 | Bab IV / 4.6 | Protected BO Evidence Upload & Verification Feedback State | Menunjukkan status pengunggahan bukti dokumen BO via presigned boundary | `BeneficialOwnerEvidencePanel.tsx` | TO_CAPTURE | Buka Corporate Suite step evidence. Masking: Nama file / hash mock. |
| Gambar 4.7 | Bab IV / 4.9 | Panel Status Corporate Escrow Settlement | Menunjukkan status HELD_IN_ESCROW dan rincian breakdown pembayaran | `CorporateEscrowCheckoutPanel.tsx` | TO_CAPTURE | Buka Corporate Suite step payment checkout. Masking: Nominal & Order ID. |
| Gambar 4.8 | Bab IV / 4.14 | Tangkapan Layar Hasil Eksekusi Test Suite Phase 2 (107 Passing Assertions) | Bukti eksekusi pengujian otomatis frontend & service layer | Terminal output `npm run test:phase2` | TO_CAPTURE | Tangkapan layar terminal output eksekusi 107 passing tests. |
| Gambar 4.9 | Bab IV / 4.14 | Tangkapan Layar Hasil Eksekusi Transaksi SQL Runtime Batch 3.B.1 | Bukti eksekusi pengujian atomik RPC webhook settlement dan replay protection | Terminal output `corporate_escrow_settlement_runtime.sql` | TO_CAPTURE | Tangkapan layar terminal output transaksi SQL rollback. |

## 2. Ringkasan Kuantitatif Gambar

- **Diagram Teks Terindikasi Langsung (*INLINE_TEXT_DIAGRAM*)**: 5 item (Gambar 3.1, 3.2, 3.3, 3.4, 3.5)
- **Tangkapan Layar yang Harus Diambil (*TO_CAPTURE*)**: 9 item (Gambar 4.1 s.d. 4.9)
- **Berkas Gambar yang Tertanam (*EMBEDDED_IMAGE*)**: 0 item
- **Sumber Berkas Ada tapi Belum Dirender (*SOURCE_AVAILABLE_NOT_RENDERED*)**: 0 item
- **Total Entri Gambar Terinventarisasi**: 14 entri (5 diagram teks, 9 placeholder tangkapan layar, 0 gambar tertanam).

## 3. Aturan Penyamaran Data (Data Masking Protocol)

Untuk setiap gambar antarmuka yang diambil:
1. **Secret & Key**: JWT Token, Supabase Anon Key, Service Role Key, HMAC Secret, dan Database Connection String wajib disamarkan atau dipotong.
2. **Identitas Perorangan (PII)**: NIK, No. KTP, Swafoto, dan Nomor Telepon wajib menggunakan data dummy/fiktif (`3171000000000000`, `Klien Fiktif Test`).
3. **Identitas Akademik**: Nama Mahasiswa, NIM, dan Dosen Pembimbing disesuaikan dengan placeholder standar `[NAMA MAHASISWA]`.
