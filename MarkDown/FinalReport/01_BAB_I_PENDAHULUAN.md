# BAB I — PENDAHULUAN

## 1.1 Latar Belakang Masalah

Perkembangan teknologi informasi telah mendorong transformasi digital secara menyeluruh di berbagai sektor industri, tidak terkecuali di bidang penyediaan layanan hukum (*legal services*). Di Indonesia, akses terhadap layanan hukum berkualitas—baik konsultasi perseorangan maupun pengurusan legalitas korporasi—selama ini dihadapkan pada fragmentasi proses, ketidakjelasan estimasi biaya, serta risiko keamanan data pribadi dan dokumen transaksi. Pengurusan perikatan hukum korporasi, seperti pendirian Perseroan Terbatas (PT) atau Commanditaire Vennootschap (CV), memerlukan serangkaian tahapan kompleks yang melibatkan pengumpulan data para pihak, identifikasi pemilik manfaat (*Beneficial Owner* / BO), verifikasi berkas legalitas, hingga pembayaran dana jaminan perikatan.

Dalam praktiknya, platform layanan hukum digital modern dituntut untuk menyelenggarakan infrastruktur teknis yang tidak hanya cepat dan responsif pada antarmuka pengguna, tetapi juga menjamin prinsip-prinsip keamanan sistem informasi. Beberapa aspek krusial yang menjadi syarat mutlak meliputi:
1. **Keutuhan Integritas Data dan Jejak Audit (*Audit Trail*)**: Setiap perubahan status perkara hukum dan riwayat transaksi harus dapat dilacak dan dilindungi dengan sifat *Write Once Read Many* (WORM) guna mencegah penimpaan (*overwriting*) atau pengubahan ilegal oleh pihak yang tidak berwenang.
2. **Perlindungan Akses dan Privasi (*Row Level Security / Access Control List*)**: Dokumen bukti kepemilikan korporasi dan informasi identitas peka hukum wajib diisolasi berdasarkan identitas pengguna yang terverifikasi, sehingga mencegah kebocoran data antar-penyewa (*cross-tenant data leakage*).
3. **Keandalan Transaksi Keuangan dan Idempotensi (*Idempotency & Replay Protection*)**: Pembayaran dana jaminan perikatan (*escrow*) melalui integrasi *webhook* harus menjamin bahwa eksekusi ganda yang disebabkan oleh gangguan jaringan atau percobaan eksploitasi pihak ketiga tidak menyebabkan perubahan data keuangan sekunder (*double settlement* atau *partial write*).

Platform **Justifiqa** dirancang dan dikembangkan untuk menjawab tantangan arsitektur teknologi hukum tersebut. Berbasis arsitektur modern *Backend-as-a-Service* (BaaS) Supabase dan basis data PostgreSQL (di mana konfigurasi lokal Supabase `supabase/config.toml` menargetkan PostgreSQL versi mayor 17), Justifiqa mengintegrasikan layanan antarmuka React dengan lapisan backend teruji (*hardened backend contract*). Pengembangan difokuskan pada penyediaan fondasi arsitektur yang aman dan berkinerja tinggi, secara khusus pada modul pendaftaran perkara korporasi (*Corporate Intake*) dan mekanisme penyelesaian pendanaan jaminan perikatan (*Corporate Escrow Settlement*).

## 1.2 Identifikasi Masalah

Berdasarkan analisis kondisi pengeluaran dan arsitektur sistem hukum digital, diidentifikasi beberapa permasalahan teknis utama sebagai berikut:
1. **Kerentanan Inkonstensi Data pada Pengisian Multi-Langkah**: Proses pendaftaran perkara korporasi yang melibatkan entitas usaha, data para pihak, rincian biaya, serta milestone pembayaran rentan mengalami kondisi *partial write* jika eksekusi perintah basis data tidak dibungkus dalam satu transaksi yang atomik.
2. **Resiko Kebocoran Berkas Bukti Pemilik Manfaat (*Beneficial Owner Evidence*)**: Pengunggahan dokumen bukti kepemilikan korporasi yang diakses langsung melalui antarmuka peramban (*browser*) tanpa verifikasi batas kewenangan berpotensi membocorkan data rahasia korporasi kepada pihak yang tidak memiliki hak akses.
3. **Kerentanan Serangan Replay pada Payment Webhook**: Integrasi pembayaran berbasis pemberitahuan (*webhook notification*) yang tidak menerapkan verifikasi tanda tangan digital berbasis exact raw-body bytes dan penguncian transaksi atomik (*advisory mutex*) rentan terhadap serangan manipulasi pembayaran dan eksploitasi kondisi balapan (*race condition*).
4. **Ketidaksesuaian Antara Klaim Dokumentasi dan Implementasi Fisik**: Pengembangan sistem perangkat lunak sering kali terjebak dalam penulisan klaim keberhasilan yang tidak terbukti secara empiris (*fake production readiness*), seperti mengklaim bahwa seluruh integrasi pihak ketiga (Notaris, e-KYC, dan penyedia pembayaran produksi) telah selesai padahal masih berupa rancangan awal atau simulasi lokal.

## 1.3 Rumusan Masalah

Berdasarkan identifikasi masalah di atas, rumusan masalah dalam penelitian dan pengimplementasian Tugas Akhir ini adalah:
1. Bagaimana merancang arsitektur berlapis platform *legal-tech* Justifiqa berbasis Supabase dan PostgreSQL yang memisahkan batas tanggung jawab antara antarmuka pengguna, *Edge Functions*, dan *Remote Procedure Call* (RPC) atomik?
2. Bagaimana mengimplementasikan dan mengamankan alur *Corporate Intake* serta mekanisme perlindungan berkas bukti *Beneficial Owner* agar terhindar dari *partial write* dan kebocoran data?
3. Bagaimana merancang dan menguji mekanisme *Corporate Escrow Settlement* yang aman, memiliki ketahanan terhadap serangan *replay*, dan terlindungi secara idempoten pada lapisan basis data?
4. Bagaimana memastikan integrasi antarmuka frontend tidak melanggar batasan kebijakan *Row Level Security* (RLS) dan *Access Control List* (ACL) yang telah ditetapkan pada backend?
5. Bagaimana membatasi dan melaporkan klaim status implementasi sistem secara jujur dan transparan berdasarkan bukti faktual kode sumber dan repositori Git?

## 1.4 Batasan Penelitian dan Ruang Lingkup Faktual

Untuk menjaga ketepatan akademik dan kejujuran pelaporan faktual, batasan penelitian dan status rilis platform Justifiqa dikunci secara eksplisit per fixed point repositori Git `53ea5ca5e0aacdf849877c9696f698ec469d9eb6` pada branch `draft_final_report_justifiqa` (berasal dari fixed point branch `batch-3b-corporate-escrow`) sebagai berikut:

1. **Status Diterima Lokal (*ACCEPTED_LOCAL*)**:
   - **Phase 2 Backend Hardened Contract**: Telah lulus audit integrasi backend untuk skema PostgreSQL Phase 2 (komit `018fb05e077937326c5ed4e27289f2e3b9d2e505`).
   - **Corporate Intake 3.A / 3.A.1**: Telah diterima untuk scope pengujian lokal, mencakup form wizards, batas pengunggahan bukti BO terproteksi (*presigned storage boundary*), Edge Functions, katalog harga berversi, integrasi *typed services*, retry/idempotency, dan RPC atomik (komit `67439533e079cceded8bbddba1f56a4db6388767` dan `2c7f28a86109d58acf4d1319a84ed04ca2e679bf`).
   - **Corporate Escrow Settlement 3.B / 3.B.1**: Telah diterima untuk scope pengujian lokal, mencakup verifikasi tanda tangan digital *signed payment webhook*, verifikasi *exact raw-body HMAC*, *atomic settlement RPC*, penyegaran status kanonik, serta proteksi *replay idempotency* dan *concurrency* (komit `4cddf6866c50cf410697d330bc528d0daafd99fe` dan `59ff89dff3f49a8f169f7822c522f14163d5c707`).
   - **Halaman Presentasi kejujuran Scope (`/demo/readiness`)**: Berstatus alat bantu presentasi statis yang tidak melakukan transaksi mutasi basis data.

2. **Status Terblokir (*BLOCKED_BY_PROVIDER_SELECTION*)**:
   - **Payment Provider Initiation**: Tombol atau alur *checkout* transaksi langsung menuju penyedia pembayaran produksi (*payment gateway live*) belum dapat dieksekusi karena pemilihan kredensial vendor produksi belum difinalisasi. Sistem sengaja tidak membuat tombol bayar buatan (*fake payment button*).

3. **Status Rencana Masa Depan (*FUTURE_WORK*)**:
   - **Notary Workspace (Batch 3.C)**: Seam basis data dan rancangan antarmuka Notaris belum diterima secara *end-to-end browser-safe*.
   - **e-KYC & Signing (Batch 3.D)**: Integrasi penyedia liveness, penyimpanan amplop sertifikat (*signing envelope*), dan alur penandatanganan multipihak belum diselesaikan secara *end-to-end*.
   - **Phase 4 Full E2E / Security / QA**: Pengujian E2E lingkungan produksi dan penjaminan kualitas menyeluruh berstatus *future work*.

4. **Status Belum Dimulai (*NOT_STARTED*)**:
   - **Phase 5 Production Readiness**: Kegiatan *deployment* produksi, konfigurasi pemantauan operasional (*observability*), *runbook*, dan audit kelayakan produksi (*go-live audit*) belum dilaksanakan.

5. **Produk Lain yang Diarsipkan (*OUT_OF_SCOPE*)**:
   - Modul **Qualifa** (penelitian psikologi terpisah) dinyatakan berstatus arsip/riset luar cakupan dan tidak menjadi bagian dari Laporan Tugas Akhir Justifiqa.

Tabel 1.1 merangkum matriks status kanonik dari seluruh fase dan kelompok tugas dalam platform Justifiqa.

**Tabel 1.1**: Matriks Status Kanonik Fase dan Kelompok Tugas (*Batch*) Justifiqa
| Kelompok Tugas / Modul | Status Kanonik Faktual | Bukti Utama Repositori | Batasan Faktual Utama |
|---|---|---|---|
| Phase 2 Backend Hardened Contract | Lulus Audit Integrasi | Komit `018fb05` & `PHASE_2_BACKEND_FORENSIC_CERTIFICATION.md` | Bukan *production go-live approval* |
| Corporate Intake (Batch 3.A / 3.A.1) | **ACCEPTED_LOCAL** | Komit `67439533` & `2c7f28a8` | Berjalan pada lingkungan pengujian lokal |
| Corporate Escrow Settlement (Batch 3.B / 3.B.1) | **ACCEPTED_LOCAL** | Komit `4cddf686` & `59ff89df` | Terbatas pada verifikasi *signed webhook* lokal |
| Payment Provider Initiation | **BLOCKED** | `CURRENT_STATE.md` & `DEMO_GUIDE.md` | Memerlukan pemilihan kredensial vendor live |
| Notary Workspace (Batch 3.C) | **FUTURE_WORK** | `TRACEABILITY_MATRIX.md` | Seam basis data ada; alur browser belum selesai |
| e-KYC & Signing (Batch 3.D) | **FUTURE_WORK** | `TRACEABILITY_MATRIX.md` | Provider liveness & envelope belum end-to-end |
| Phase 4 E2E / Security / QA | **FUTURE_WORK** | `CURRENT_STATE.md` | Pengujian lokal tidak sama dengan E2E live |
| Phase 5 Production Readiness | **NOT_STARTED** | `CURRENT_STATE.md` | *Deployment*, *runbook*, dan *observability* belum ada |
| Presentation Page (`/demo/readiness`) | **ACCEPTED_LOCAL** | Komit `53ea5ca5` & `DevShowcasePage.tsx` | Alat bantu visual statis; tanpa mutasi DB |

## 1.5 Tujuan Penelitian

Tujuan dari perancangan dan implementasi platform Justifiqa dalam Tugas Akhir ini adalah:
1. Merancang arsitektur perangkat lunak *legal-tech* terdekopel berbasis Supabase BaaS dan PostgreSQL (menargetkan PostgreSQL versi mayor 17 per `supabase/config.toml`) yang memenuhi standar keamanan ACID dan prinsip *least privilege*.
2. Membangun modul *Corporate Intake* yang mampu menangani pendaftaran perkara korporasi berbasis katalog harga berversi (*Versioned Pricing Catalog*) dan eksekusi RPC atomik.
3. Membangun modul *Corporate Escrow Settlement* yang memiliki fitur verifikasi *signed webhook* HMAC SHA-256 dan perlindungan terhadap *replay attack* serta kondisi balapan.
4. Mengintegrasikan antarmuka frontend React dengan lapisan backend melalui pola *typed integration service*, *custom hooks*, dan *single-flight mutation state* guna mencegah mutasi ganda pada sisi klien.
5. Menyediakan dokumentasi ilmiah berbasis bukti faktual repositori yang secara jujur memetakan keterbatasan sistem serta memverifikasi 107 pengujian otomatis yang lulus.

## 1.6 Manfaat Penelitian

Penelitian dan pengembangan platform Justifiqa ini diharapkan memberikan manfaat sebagai berikut:
1. **Manfaat Akademis**:
   - Memberikan contoh penerapan arsitektur *Backend-as-a-Service* (BaaS) Supabase dan PostgreSQL yang aman pada domain aplikasi hukum yang memiliki persyaratan kepatuhan ketat.
   - Menyediakan referensi ilmiah mengenai penerapan prinsip idempotensi, penguncian *concurrency*, serta verifikasi *signed webhook* pada aplikasi keuangan jaminan hukum (*escrow*).
2. **Manfaat Praktis**:
   - Menyediakan prototipe platform *legal-tech* teruji yang dapat dikembangkan lebih lanjut menjadi platform produksi untuk membantu masyarakat dan korporasi mengurus legalitas hukum secara efisien.
   - Memberikan standar pola perancangan (*design pattern*) mengenai bagaimana membatasi klaim rilis sistem secara transparan dalam lingkungan pengembangan perangkat lunak.

## 1.7 Metodologi Pengembangan dan Verifikasi

Metodologi yang digunakan dalam pengembangan platform Justifiqa mengombinasikan pendekatan *incremental batch-based development* dengan verifikasi berbasis bukti faktual (*evidence-bound verification*). Tahapan metodologi meliputi:
1. **Analisis Kebutuhan (*Requirements Analysis*)**: Pengumpulan dan identifikasi kebutuhan fungsional serta non-fungsional berdasar regulasi hukum Indonesia (UU ITE, UU PDP, PP Perseroan Terbatas).
2. **Perancangan Sistem (*System Design*)**: Penyusunan arsitektur berlapis, pemodelan data (ERD), pemodelan perilaku (*Activity & Sequence Diagrams*), serta perancangan skema keamanan PostgreSQL (RLS dan ACL).
3. **Pengembangan Berbasis Kelompok Tugas (*Batch-Based Implementation*)**: Eksekusi pengkodean secara bertahap yang dibatasi oleh aturan isolasi batch. Setiap perubahan kode dikunci oleh *fixed point* repositori Git.
4. **Pengujian Berbasis Bukti (*Test-Driven Verification*)**: Pelaksanaan pengujian otomatis frontend (*Node.js test runner*) dan pengujian *runtime SQL transaction* pada PostgreSQL yang diakhiri dengan mekanisme *ROLLBACK*.
5. **Audit Forensik Kode dan Dokumentasi (*Forensic Audit & Control Plane*)**: Verifikasi 360-derajat terhadap keberadaan simbol, fungsi, skema RLS, dan komit Git untuk memastikan tidak ada klaim palsu atau berkas yang hilang.
6. **Pembekuan Scope Presentasi (*Presentation Scope Freeze*)**: Penyediaan halaman `/demo/readiness` yang memisahkan modul yang telah diterima lokal dengan modul yang dibatasi atau berstatus rencana masa depan.

## 1.8 Sistematika Penulisan

Sistematika penulisan Laporan Tugas Akhir ini disusun dalam lima bab utama sebagai berikut:

- **BAB I PENDAHULUAN**: Memuat latar belakang masalah, identifikasi masalah, rumusan masalah, batasan penelitian dan ruang lingkup faktual, tujuan, manfaat, metodologi pengembangan, serta sistematika penulisan.
- **BAB II LANDASAN TEORI**: Menjelaskan konsep-konsep akademis pendukung, meliputi teknologi hukum (*legal-tech*), *Corporate Intake*, *Beneficial Owner*, *escrow*, sifat ACID PostgreSQL, idempotensi, HMAC SHA-256, arsitektur Supabase (GoTrue, PostgREST, RLS, Edge Functions), serta prinsip audit forensik perangkat lunak.
- **BAB III ANALISIS DAN PERANCANGAN**: Menguraikan analisis kebutuhan fungsional dan non-fungsional, perancangan arsitektur berlapis Justifiqa, skema database (ERD), *state machine*, mekanisme penguncian *concurrency*, perancangan keamanan RLS/ACL, serta desain antarmuka pengguna.
- **BAB IV IMPLEMENTASI DAN PENGUJIAN**: Menyajikan rincian implementasi fisik kode sumber, skema migrasi PostgreSQL, RPC atomik, Edge Functions, integrasi frontend, verifikasi HMAC, serta laporan hasil pengujian otomatis dan *runtime SQL suite* beserta matriks ketersediaan fitur.
- **BAB V PENUTUP**: Menyajikan kesimpulan dari seluruh penelitian yang menjawab rumusan masalah, kontribusi faktual sistem, keterbatasan sistem yang diverifikasi, serta saran untuk pengembangan masa depan (*future work*).
