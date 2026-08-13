# BAB V — PENUTUP

## 5.1 Kesimpulan

Berdasarkan hasil perancangan, implementasi, dan pengujian empiris yang dilakukan pada platform *legal-tech* Justifiqa per fixed point repositori Git `53ea5ca5e0aacdf849877c9696f698ec469d9eb6` pada branch `draft_final_report_justifiqa` (berasal dari fixed point branch `batch-3b-corporate-escrow`), diperoleh kesimpulan yang menjawab rumusan masalah sebagai berikut:

1. **Arsitektur Berlapis yang Terisolasi**: Perancangan arsitektur terdekopel empat lapis (*React Frontend*, *Edge Functions*, *PostgREST Facades*, dan *PostgreSQL Engine* menargetkan versi mayor 17 per `supabase/config.toml`) berhasil memisahkan tanggung jawab antara logika antarmuka dan transaksi backend. Penerapan *Row Level Security* (RLS) dan *Access Control List* (ACL) `FORCE RLS` pada 17 tabel teruji menjamin pencapaian isolasi data multi-penyewa secara ketat.
2. **Keamanan dan Kejujuran Modul Corporate Intake**: Modul *Corporate Intake* berhasil menjamin konsistensi data pendaftaran perkara korporasi melalui penggunaan katalog harga resmi berversi (*Versioned Pricing Catalog*) dan eksekusi transaksi atomik `fn_create_corporate_intake_from_evidence_atomic`. Berkas bukti Pemilik Manfaat (*Beneficial Owner*) berhasil dilindungi menggunakan batas penyimpanan terproteksi (*presigned storage boundary*) yang mencegah akses data rahasia oleh pihak yang tidak berhak. Setelah intake disubmit, status entitas ditetapkan secara eksplisit: `service_orders.status = PAYMENT_PENDING`, `corporate_service_cases.current_stage = DRAFT`, `escrow_transactions.status = PENDING_PAYMENT`, dan `payment_milestones.status = PENDING`.
3. **Ketahanan dan Idempotensi Corporate Escrow Settlement**: Modul *Corporate Escrow Settlement* berhasil membuktikan ketahanan terhadap serangan *replay* dan kondisi balapan (*race condition*). Penerapan verifikasi tanda tangan digital HMAC SHA-256 berbasis berkas *exact raw body bytes* pada *Edge Function* serta penggunaan penguncian penasihat (*advisory mutex*) pada RPC atomik `fn_process_corporate_payment_webhook_atomic` menjamin bahwa panggilan *webhook* yang dieksekusi secara berulang mengembalikan status yang konsisten tanpa menimbulkan mutasi dana sekunder (*zero partial write*). Setelah pembayaran berhasil, status entitas diperbarui: `service_orders.status = ACTIVE`, `corporate_service_cases.current_stage = ESCROW_LOCKED`, `escrow_transactions.status = HELD_IN_ESCROW`, dan `payment_milestones.status = FUNDED`.
4. **Integritas Integrasi Antarmuka Frontend**: Integrasi antarmuka frontend React berhasil dikapsulasi menggunakan pola *single-flight mutation state* dan *safe error mapping*. Pola ini terbukti mencegah pengiriman mutasi ganda pada sisi klien serta melindungi sistem dari pencemaran informasi internal basis data.
5. **Kejujuran Pelaporan dan Pembatasan Fitur**: Seluruh klaim rilis sistem dilaporkan secara transparan berdasarkan bukti faktual repositori. Halaman presentasi `/demo/readiness` menyajikan status rilis secara jujur tanpa tombol pembayaran buatan, memisahkan modul yang telah berstatus *ACCEPTED_LOCAL* dari modul yang berstatus *BLOCKED*, *FUTURE_WORK*, dan *NOT_STARTED*. Pengujian otomatis mengeksekusi 107 passing assertions tanpa kegagalan.

## 5.2 Kontribusi Sistem Faktual

Penelitian dan pengembangan platform Justifiqa ini memberikan beberapa kontribusi teknis faktual:
1. **Hardened Backend Contract**: Menyediakan fondasi basis data PostgreSQL yang dikeras dengan aturan RLS, pemicu WORM `ENABLE ALWAYS`, dan fungsi `SECURITY DEFINER` dengan `search_path = ''` yang bersih dari potensi kerentanan keamanan pada himpunan objek teraudit.
2. **Canonical Versioned Pricing Model**: Menyediakan mekanisme penetapan struktur biaya dan milestone pembayaran hukum korporasi berbasis katalog berversi yang tidak dapat diubah secara sepihak oleh klien peramban.
3. **Protected Beneficial Owner Evidence Boundary**: Menyediakan pola arsitektur pengunggahan dan validasi dokumen rahasia pemilik manfaat korporasi berbasis *presigned URL* dan pembersihan otomatis berkas kedaluwarsa.
4. **Secure & Idempotent Escrow Settlement**: Menyediakan referensi implementasi penyelesaian pembayaran jaminan perikatan hukum yang aman dari serangan eksekusi ganda dan manipulasi muatan *webhook*.
5. **Honest Presentation Control Plane**: Menyediakan standar pelaporan rilis sistem yang transparan berbasis *fixed point Git* dan pembatasan fitur secara jujur pada lingkungan akademik.

## 5.3 Keterbatasan Faktual Sistem

Sesuai dengan komitmen kejujuran akademis, dilaporkan keterbatasan faktual sistem Justifiqa pada fixed point saat ini:
1. **Payment Provider Initiation (*BLOCKED_BY_PROVIDER_SELECTION*)**: Inisiasi pembayaran langsung menuju penyedia pembayaran produksi (*payment gateway live*) belum dapat dilakukan karena pemilihan dan konfigurasi kredensial vendor produksi belum disetujui.
2. **Notary Workspace Batch 3.C (*FUTURE_WORK*)**: Alur penugasan, persetujuan akta, dan transisi status pada antarmuka Notaris belum diselesaikan secara *end-to-end browser-safe*.
3. **e-KYC & Signing Batch 3.D (*FUTURE_WORK*)**: Integrasi penyedia verifikasi liveness luring, penerbitan amplop penandatanganan elektronik, serta pemanggilan API callback PSrE belum diterima secara *end-to-end*.
4. **Phase 4 Full E2E / Security QA (*FUTURE_WORK*)**: Pengujian *end-to-end* pada lingkungan produksi terdistribusi dan audit keamanan penestrasi penuh belum dilaksanakan.
5. **Phase 5 Production Readiness (*NOT_STARTED*)**: Penggelaran produksi (*deployment*), pemantauan operasional (*observability*), penyusunan *runbook*, dan audit kelayakan produksi belum dimulai.
6. **Verifikasi Visual Berkas DOCX**: Berkas laporan format DOCX telah berhasil dibuat secara struktural, namun pengujian rendering visual (*visual render QA*) terblokir karena perangkat lunak LibreOffice/soffice tidak tersedia pada lingkungan eksekusi (`DOCX CREATED; STRUCTURAL CHECK PASSED; VISUAL RENDER QA BLOCKED BY MISSING RENDERER`).

## 5.4 Saran Pengembangan Masa Depan (*Future Work*)

Berdasarkan kesimpulan dan keterbatasan di atas, disarankan beberapa langkah pengembangan masa depan untuk menyempurnakan platform Justifiqa:

1. **Penyelesaian Batch 3.C (Notary Workspace)**: Mengembangkan antarmuka khusus Notaris yang aman, termasuk fitur pemeriksaan draft akta perseroan, integrasi stempel Kemenkumham, serta validasi hak akses peramban secara *browser-safe*.
2. **Penyelesaian Batch 3.D (e-KYC & Multi-Party Signing)**: Mengintegrasikan API penyedia e-KYC resmi terakreditasi PSrE Indonesia untuk verifikasi identitas liveness serta memfasilitasi penandatanganan dokumen elektronik berbekat e-Meterai Peruri.
3. **Pelaksanaan Phase 4 (Full Production E2E & PenTest)**: Melaksanakan pengujian E2E menyeluruh pada jaringan produksi dan melakukan uji penetrasi (*penetration testing*) independen untuk memverifikasi ketahanan arsitektur terhadap serangan *OWASP API Top 10*.
4. **Pelaksanaan Phase 5 (Production Deployment & Observability)**: Mengonfigurasi lingkungan penggelaran produksi terdistribusi, menyiapkan pemantauan performa dan log (*OpenTelemetry / Prometheus*), menyusun *operational runbook*, serta melaksanakan audit kelayakan produksi (*go-live audit*).
5. **Integrasi Live Payment Gateway**: Memilih vendor penyedia pembayaran resmi (seperti Midtrans atau Xendit) dan mengonfigurasi kredensial produksi untuk mengaktifkan alur pembayaran langsung dari peramban klien.
