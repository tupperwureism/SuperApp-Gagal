# LAPORAN TUGAS AKHIR

**PERANCANGAN DAN IMPLEMENTASI PLATFORM LEGAL-TECH JUSTIFIQA BERBASIS SUPABASE DENGAN CORPORATE INTAKE DAN ESCROW SETTLEMENT YANG AMAN DAN IDEMPOTEN**

---

### PERNYATAAN IDENTITAS AKADEMIK

- **Nama Mahasiswa**: [NAMA MAHASISWA]
- **Nomor Induk Mahasiswa**: [NIM]
- **Program Studi**: [PROGRAM STUDI]
- **Fakultas**: [FAKULTAS]
- **Institusi**: [NAMA INSTITUSI]
- **Dosen Pembimbing**: [DOSEN PEMBIMBING]
- **Kota**: [KOTA]
- **Tahun Akademik**: [TAHUN AKADEMIK]

---

## LEMBAR PENGESAHAN

**Judul Tugas Akhir**: Perancangan dan Implementasi Platform Legal-Tech Justifiqa Berbasis Supabase dengan Corporate Intake dan Escrow Settlement yang Aman dan Idempoten
**Nama Mahasiswa**: [NAMA MAHASISWA]
**NIM**: [NIM]
**Program Studi**: [PROGRAM STUDI]

Disetujui dan disahkan oleh Dewan Penguji Tugas Akhir pada tanggal [TANGGAL PENGESAHAN].

**Dosen Pembimbing Utama**:

___________________________
[DOSEN PEMBIMBING]
NIP/NIDN: [NIP DOSEN PEMBIMBING]

**Dosen Penguji I**:

___________________________
[NAMA DOSEN PENGUJI 1]
NIP/NIDN: [NIP PENGUJI 1]

**Dosen Penguji II**:

___________________________
[NAMA DOSEN PENGUJI 2]
NIP/NIDN: [NIP PENGUJI 2]

Mengetahui,
**Ketua Program Studi [PROGRAM STUDI]**:

___________________________
[NAMA KETUA PROGRAM STUDI]
NIP/NIDN: [NIP KETUA PRODI]

---

## PERNYATAAN KEASLIAN KARYA

Saya yang bertanda tangan di bawah ini menyatakan dengan sesungguhnya bahwa Laporan Tugas Akhir yang berjudul **"Perancangan dan Implementasi Platform Legal-Tech Justifiqa Berbasis Supabase dengan Corporate Intake dan Escrow Settlement yang Aman dan Idempoten"** ini adalah hasil karya ilmiah mandiri saya sendiri di bawah bimbingan [DOSEN PEMBIMBING], dan bukan merupakan tiruan, plagiasi, atau duplikasi dari karya orang lain yang pernah diajukan untuk memperoleh gelar akademik di perguruan tinggi manapun.

Seluruh sumber informasi, kutipan, referensi kode sumber, skema migrasi database, dan data pengujian yang digunakan dalam penyusunan laporan ini telah dicantumkan dengan jelas sesuai dengan kaidah dan etika penulisan ilmiah yang berlaku. Apabila di kemudian hari terbukti terdapat unsur plagiasi atau pemalsuan klaim implementasi dalam karya ini, saya bersedia menerima sanksi akademik sesuai dengan peraturan yang berlaku di [NAMA INSTITUSI].

[KOTA], [TANGGAL PERNYATAAN]
Yang menyatakan,

___________________________
**[NAMA MAHASISWA]**
NIM: [NIM]

---

## KATA PENGANTAR

Puji dan syukur penulis panjatkan ke hadirat Tuhan Yang Maha Esa atas segala rahmat dan karunia-Nya sehingga penyusunan Laporan Tugas Akhir yang berjudul **"Perancangan dan Implementasi Platform Legal-Tech Justifiqa Berbasis Supabase dengan Corporate Intake dan Escrow Settlement yang Aman dan Idempoten"** dapat diselesaikan dengan baik.

Platform Justifiqa dikembangkan sebagai solusi teknologi hukum (*legal-tech*) terintegrasi yang bertujuan menjembatani kebutuhan masyarakat dan korporasi terhadap layanan hukum modern yang transparan, terstruktur, aman, dan dapat diaudit secara digital. Dalam pengembangannya, laporan ini mendokumentasikan secara faktual hasil perancangan dan implementasi komponen *hardened backend* berbasis Supabase/PostgreSQL (di mana konfigurasi lokal Supabase `supabase/config.toml` menargetkan PostgreSQL versi mayor 17), mencakup pengisian perkara korporasi (*Corporate Intake*), perlindungan berkas bukti pemilik manfaat (*Beneficial Owner*), serta penyelesaian pembayaran dana jaminan (*Corporate Escrow Settlement*) yang terlindungi dari resiko manipulasi dan eksekusi ganda (*replay*).

Penulis menyadari bahwa keberhasilan penyelesaian Tugas Akhir ini tidak lepas dari bantuan, bimbingan, dorongan, dan kerja sama dari berbagai pihak. Oleh karena itu, penulis ingin menyampaikan terima kasih yang sebesar-besarnya kepada:
1. Pimpinan [NAMA INSTITUSI] dan Dekan [FAKULTAS] atas fasilitas akademik yang disediakan.
2. Ketua Program Studi [PROGRAM STUDI] yang telah memberikan arahan administratif dan akademik.
3. Bapak/Ibu [DOSEN PEMBIMBING] selaku Dosen Pembimbing yang telah memberikan bimbingan teknis, koreksi, dan arahan berharga selama proses penelitian dan penyusunan laporan.
4. Rekan-rekan mahasiswa dan keluarga yang senantiasa memberikan dukungan moril dan materil.

Penulis menyadari bahwa laporan ini masih memiliki keterbatasan teknis yang diverifikasi secara jujur, khususnya terkait integrasi penyedia pembayaran produksi serta modul kerja lanjutan yang menjadi bagian dari rencana pengembangan masa depan (*future work*). Penulis berharap laporan ini dapat memberikan kontribusi akademis dan praktis yang bermanfaat bagi pengembangan sistem teknologi hukum di Indonesia.

[KOTA], [TAHUN AKADEMIK]

**[NAMA MAHASISWA]**

---

## ABSTRAK

Fragmentasi layanan hukum digital di Indonesia sering kali menghadapi tantangan serius terkait keamanan berkas sensitif, transparansi penetapan tarif, serta keandalan transaksi keuangan. Penelitian dan pengembangan ini bertujuan untuk merancang serta mengimplementasikan Platform *Legal-Tech* Justifiqa berbasis arsitektur *Backend-as-a-Service* (BaaS) Supabase dan PostgreSQL (konfigurasi lokal Supabase menargetkan PostgreSQL versi mayor 17 per `supabase/config.toml`). Fokus utama implementasi mencakup dua modul kritis, yaitu *Corporate Intake* untuk pendaftaran perkara korporasi dan *Corporate Escrow Settlement* untuk penyelesaian pembayaran dana jaminan perikatan hukum.

Metodologi yang digunakan adalah pendekatan pengembangan inkremental berbasis kelompok tugas (*batch-based development*) yang diverifikasi secara ketat melalui audit forensik kode sumber dan pengujian otomatis. Hasil pengimplementasian menunjukkan bahwa modul *Corporate Intake* berhasil menjamin konsistensi data melalui katalog harga berversi (*Versioned Pricing Catalog*) dan fungsi transaksi atomik (*Atomic RPC*) `fn_create_corporate_intake_from_evidence_atomic`, serta mengamankan dokumen *Beneficial Owner* (BO) melalui proteksi *presigned storage boundary*. Sementara itu, modul *Corporate Escrow Settlement* berhasil membuktikan ketahanan terhadap serangan eksekusi ganda (*replay attack*) dan kondisi balapan (*race condition*) melalui verifikasi tanda tangan digital HMAC SHA-256 pada *payment webhook* dan penguncian transaksi atomik `fn_process_corporate_payment_webhook_atomic`.

Berdasarkan pengujian faktual pada tingkat lokal (*ACCEPTED_LOCAL*), platform Justifiqa berhasil mengeksekusi 107 pengujian otomatis frontend dan *service layer* tanpa kegagalan. Pengujian *runtime* PostgreSQL membuktikan bahwa mekanisme *replay* webhook yang diproses secara berulang mengembalikan status yang konsisten tanpa melakukan modifikasi data sekunder (*zero partial write*). Penelitian ini menyimpulkan bahwa arsitektur yang dirancang berhasil menyediakan fondasi sistem hukum digital yang aman, transparan, dan idempoten.

**Kata Kunci**: Legal-Tech, Supabase, PostgreSQL, Corporate Intake, Escrow Settlement, Idempotensi, Row Level Security.

---

## ABSTRACT

*The fragmentation of digital legal services in Indonesia often faces serious challenges concerning the security of sensitive documents, transparency of pricing structures, and reliability of financial transactions. This study aims to design and implement the Justifiqa Legal-Tech Platform based on Supabase Backend-as-a-Service (BaaS) architecture and PostgreSQL (local Supabase configuration targets PostgreSQL major version 17 per `supabase/config.toml`). The primary implementation focus encompasses two critical modules: Corporate Intake for corporate case registration and Corporate Escrow Settlement for securing escrow payment transactions.*

*The methodology employs an incremental batch-based development approach verified through strict codebase forensic auditing and automated testing. The implementation results demonstrate that the Corporate Intake module successfully ensures data consistency via a Versioned Pricing Catalog and an atomic transaction function (`fn_create_corporate_intake_from_evidence_atomic`), while securing Beneficial Owner (BO) evidence documents via a presigned storage boundary. Furthermore, the Corporate Escrow Settlement module proves resilience against replay attacks and race conditions through HMAC SHA-256 raw-body signature verification on payment webhooks and atomic transaction locking via `fn_process_corporate_payment_webhook_atomic`.*

*Based on local empirical verification (ACCEPTED_LOCAL), the Justifiqa platform executed 107 automated frontend and service-layer test assertions with zero failures. PostgreSQL runtime testing confirms that replayed webhook payloads execute idempotently with zero partial writes. This research concludes that the proposed architecture establishes a secure, transparent, and idempotent foundation for digital legal technology platforms.*

***Keywords***: *Legal-Tech, Supabase, PostgreSQL, Corporate Intake, Escrow Settlement, Idempotency, Row Level Security.*

---

## DAFTAR ISI

- **PERNYATAAN IDENTITAS AKADEMIK**
- **LEMBAR PENGESAHAN**
- **PERNYATAAN KEASLIAN KARYA**
- **KATA PENGANTAR**
- **ABSTRAK**
- **ABSTRACT**
- **DAFTAR ISI**
- **DAFTAR GAMBAR**
- **DAFTAR TABEL**
- **DAFTAR SINGKATAN**
- **BAB I PENDAHULUAN**
  - 1.1 Latar Belakang Masalah
  - 1.2 Identifikasi Masalah
  - 1.3 Rumusan Masalah
  - 1.4 Batasan Penelitian dan Ruang Lingkup Faktual
  - 1.5 Tujuan Penelitian
  - 1.6 Manfaat Penelitian
  - 1.7 Metodologi Pengembangan dan Verifikasi
  - 1.8 Sistematika Penulisan
- **BAB II LANDASAN TEORI**
  - 2.1 Teknologi Hukum (*Legal Technology*)
  - 2.2 Corporate Intake dan Kerangka Kerja Beneficial Owner (BO)
  - 2.3 Mekanisme Escrow dan Milestone Pembayaran Hukum
  - 2.4 Database Relasional PostgreSQL dan Sifat ACID
  - 2.5 Idempotensi, Replay Protection, dan HMAC SHA-256
  - 2.6 Arsitektur Supabase: GoTrue, PostgREST, RLS, dan Edge Functions
  - 2.7 Pola Desain Integration Layer dan Single-Flight Mutation State
  - 2.8 Pengujian Berbasis Bukti Faktual dan Audit Forensik
- **BAB III ANALISIS DAN PERANCANGAN**
  - 3.1 Gambaran Umum Sistem Justifiqa
  - 3.2 Analisis Kebutuhan Aktor dan Peran Sistem
  - 3.3 Analisis Kebutuhan Fungsional (Use Case)
  - 3.4 Analisis Kebutuhan Non-Fungsional
  - 3.5 Arsitektur Berlapis Sistem Justifiqa
  - 3.6 Perancangan Skema Database PostgreSQL (ERD)
  - 3.7 State Machine dan Lifecycle Entitas Utama
  - 3.8 Perancangan Keamanan Data, Access Control List (ACL), dan RLS
  - 3.9 Perancangan Idempotensi dan Penguncian Concurrency (Mutex)
  - 3.10 Perancangan Antarmuka Pengguna (UI Wireframe & Design System)
  - 3.11 Pemisahan Target Architecture versus As-Built Scope
- **BAB IV IMPLEMENTASI DAN PENGUJIAN**
  - 4.1 Lingkungan Pengoperasian dan Teknologi Utama
  - 4.2 Struktur Repository dan Pengorganisasian Kode
  - 4.3 Implementasi Backend Hardened Contract (Phase 2)
  - 4.4 Implementasi Versioned Corporate Pricing Catalog
  - 4.5 Implementasi Atomic Corporate Intake RPC
  - 4.6 Implementasi Protected Beneficial Owner Evidence Boundary
  - 4.7 Implementasi Edge Functions Intake & Webhook
  - 4.8 Integrasi Frontend Service, Hook, dan Single-Flight Mutation State
  - 4.9 Implementasi Corporate Escrow Settlement
  - 4.10 Verifikasi HMAC SHA-256, Timestamp Skew, dan Exact Raw Body
  - 4.11 Eksekusi Atomic Settlement RPC dan Transisi Lifecycle Case
  - 4.12 Penerapan Authorization Boundary dan Least-Privilege ACL
  - 4.13 Implementasi Halaman Presentasi Jujur (`/demo/readiness`)
  - 4.14 Hasil Pengujian Otomatis Frontend dan Runtime SQL Transaction
  - 4.15 Matriks Matched Requirements vs Implementation vs Test Results
  - 4.16 Keterbatasan Faktual dan Pembatasan Fitur
- **BAB V PENUTUP**
  - 5.1 Kesimpulan
  - 5.2 Kontribusi Sistem Faktual
  - 5.3 Keterbatasan Faktual Sistem
  - 5.4 Saran Pengembangan Masa Depan (*Future Work*)
- **DAFTAR PUSTAKA**
- **LAMPIRAN**

---

## DAFTAR GAMBAR

- **Gambar 3.1**: Arsitektur Berlapis Platform Justifiqa (As-Built vs Target Architecture) [INLINE_TEXT_DIAGRAM]
- **Gambar 3.2**: Conceptual Entity Relationship Diagram (ERD) Corporate Intake & Escrow [INLINE_TEXT_DIAGRAM]
- **Gambar 3.3**: Diagram Transaksi Terikat Entitas (Entity-Bound Status Transitions) [INLINE_TEXT_DIAGRAM]
- **Gambar 3.4**: Wireframe Antarmuka Corporate Intake Wizard [INLINE_TEXT_DIAGRAM]
- **Gambar 3.5**: Wireframe Antarmuka Presentation Readiness Demo Page [INLINE_TEXT_DIAGRAM]
- **Gambar 4.1**: Tangkapan Layar Halaman Landing Gateway Justifiqa [TO_CAPTURE]
- **Gambar 4.2**: Tangkapan Layar Halaman Presentation Readiness — Ringkasan Scope [TO_CAPTURE]
- **Gambar 4.3**: Tangkapan Layar Halaman Presentation Readiness — Alur Diterima Lokal [TO_CAPTURE]
- **Gambar 4.4**: Tangkapan Layar Halaman Presentation Readiness — Roadmap Pengembangan [TO_CAPTURE]
- **Gambar 4.5**: Form Corporate Intake Wizard Terintegrasi [TO_CAPTURE]
- **Gambar 4.6**: Protected BO Evidence Upload & Verification Feedback State [TO_CAPTURE]
- **Gambar 4.7**: Panel Status Corporate Escrow Settlement [TO_CAPTURE]
- **Gambar 4.8**: Tangkapan Layar Hasil Eksekusi Test Suite Phase 2 (107 Passing Assertions) [TO_CAPTURE]
- **Gambar 4.9**: Tangkapan Layar Hasil Eksekusi Transaksi SQL Runtime Batch 3.B.1 [TO_CAPTURE]

---

## DAFTAR TABEL

- **Tabel 1.1**: Matriks Status Kanonik Fase dan Kelompok Tugas (*Batch*) Justifiqa
- **Tabel 3.1**: Matriks Kebutuhan Fungsional Utama Platform Justifiqa
- **Tabel 3.2**: Matriks Kebutuhan Non-Fungsional Platform Justifiqa
- **Tabel 3.3**: Spesifikasi Entitas Utama skema Database PostgreSQL
- **Tabel 4.1**: Daftar Komit Git Bukti Faktual Implementasi Utama
- **Tabel 4.2**: Hasil Verifikasi Audit Forensik Backend PostgreSQL Phase 2
- **Tabel 4.3**: Matriks Traceability Requirements → Implementation → Test → Status Result
- **Tabel 4.4**: Matriks Keterbatasan Faktual Rilis Sistem per Fixed Point

---

## DAFTAR SINGKATAN

- **ACID**: *Atomicity, Consistency, Isolation, Durability*
- **ACL**: *Access Control List*
- **AHU**: Administrasi Hukum Umum (Kemenkumham RI)
- **API**: *Application Programming Interface*
- **BaaS**: *Backend-as-a-Service*
- **BO**: *Beneficial Owner* (Pemilik Manfaat Korporasi)
- **DML**: *Data Manipulation Language*
- **E2E**: *End-to-End*
- **e-KYC**: *Electronic Know Your Customer*
- **ERD**: *Entity Relationship Diagram*
- **HMAC**: *Hash-based Message Authentication Code*
- **ITE**: Informasi dan Transaksi Elektronik
- **JSON**: *JavaScript Object Notation*
- **JWT**: *JSON Web Token*
- **KBLI**: Klasifikasi Baku Lapangan Usaha Indonesia
- **NIK**: Nomor Induk Kependudukan
- **OSS**: *Online Single Submission*
- **PDP**: Perlindungan Data Pribadi
- **PSrE**: Penyelenggara Sertifikat Elektronik
- **REST**: *Representational State Transfer*
- **RLS**: *Row Level Security*
- **RPC**: *Remote Procedure Call*
- **SLA**: *Service Level Agreement*
- **SQL**: *Structured Query Language*
- **UI**: *User Interface*
- **UX**: *User Experience*
- **WORM**: *Write Once Read Many*


---

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


---

# BAB II — LANDASAN TEORI

## 2.1 Teknologi Hukum (*Legal Technology*)

Teknologi Hukum (*Legal Technology* atau *Legal-Tech*) merujuk pada penggunaan perangkat lunak dan teknologi digital untuk menyediakan, meningkatkan, serta mengotomatisasi pengiriman layanan hukum. Industri *legal-tech* mencakup berbagai domain aplikasi, mulai dari manajemen dokumen hukum, sistem manajemen perkara (*case management system*), konsultasi hukum jarak jauh, hingga otomatisasi proses pendirian dan kepatuhan hukum korporasi.

Dalam konteks hukum Indonesia, digitalisasi layanan hukum harus tunduk pada kerangka regulasi nasional yang mengatur transaksi elektronik dan perlindungan data. Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE) sebagaimana telah diubah dengan Undang-Undang Nomor 1 Tahun 2024 menetapkan keabsahan dokumen elektronik dan tanda tangan elektronik sebagai alat bukti hukum yang sah. Selain itu, Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) mengamanatkan bahwa setiap platform digital yang mengelola data identitas perseorangan wajib menerapkan prinsip kerahasiaan, integritas, dan pemisahan hak akses yang ketat.

## 2.2 Corporate Intake dan Kerangka Kerja Beneficial Owner (BO)

*Corporate Intake* merupakan proses awal pengumpulan data, dokumen legalitas, serta rincian struktur organisasi yang dibutuhkan dalam pengurusan perkara atau legalitas badan hukum (seperti Perseroan Terbatas atau Commanditaire Vennootschap). Proses ini memerlukan validasi data secara bertahap (*multi-step wizard*) untuk memastikan bahwa informasi yang dimasukkan oleh klien memenuhi syarat administrasi hukum pemerintah.

Salah satu komponen paling krusial dalam *Corporate Intake* di Indonesia adalah identifikasi Pemilik Manfaat (*Beneficial Owner* / BO). Berdasarkan Peraturan Presiden Nomor 13 Tahun 2018 tentang Penerapan Prinsip Mengenali Pemilik Manfaat dari Korporasi dalam Rangka Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang dan Tindak Pidana Pendanaan Terorisme, setiap korporasi diwajibkan menyampaikan informasi mengenai individu yang menjadi pemilik sebenarnya atas saham atau hak mengendalikan korporasi. Berkas dokumen bukti BO (seperti KTP, Paspor, atau Akta Kepemilikan) tergolong sebagai berkas rahasia dan sensitif. Oleh karena itu, arsitektur basis data harus menyediakan batas keamanan khusus (*protected evidence boundary*) menggunakan mekanisme *presigned storage URL* dan pengaksesan terikat sesi (*session-bound authorization*) guna mengisolasi berkas bukti dari akses publik.

## 2.3 Mekanisme Escrow dan Milestone Pembayaran Hukum

*Escrow* adalah mekanisme keuangan di mana pihak ketiga yang terpercaya menampung dan mengelola dana pembayaran atas suatu perjanjian hukum sampai seluruh syarat dan kewajiban perikatan dipenuhi oleh para pihak. Dalam penyediaan layanan hukum digital, *escrow* berfungsi melindungi klien dari risiko kegagalan penyelesaian pekerjaan oleh penyedia jasa hukum, sekaligus memberikan kepastian pembayaran (*financial commitment*) bagi praktisi hukum.

Struktur pembayaran *escrow* pada layanan hukum korporasi umumnya dibagi ke dalam beberapa tahapan (*payment milestones*). Setiap *milestone* merepresentasikan persentase atau tahapan pengerjaan tertentu (seperti verifikasi nama perseroan, pemrosesan di Kemenkumham, dan pengesahan akta). Dana yang tersimpan pada akun *escrow* berada dalam status teruji (*HELD_IN_ESCROW*) dan hanya dapat dicairkan (*RELEASED*) atau dikembalikan (*REFUNDED*) setelah memenuhi syarat penandatanganan dokumen atau persetujuan pihak yang berwenang.

## 2.4 Database Relasional PostgreSQL dan Sifat ACID

PostgreSQL merupakan sistem manajemen basis data relasional (*Relational Database Management System* / RDBMS) tingkat lanjut yang bersifat *open-source* dan mendukung penuh prinsip ACID (*Atomicity, Consistency, Isolation, Durability*) (PostgreSQL Global Development Group, 2024):
1. ***Atomicity***: Menjamin bahwa seluruh rangkaian perintah SQL dalam satu transaksi dieksekusi secara utuh; jika terjadi kegagalan pada salah satu perintah, seluruh transaksi dibatalkan (*ROLLBACK*) tanpa menyisakan penulisan data parsial.
2. ***Consistency***: Menjamin bahwa data yang ditulis harus memenuhi seluruh aturan pembatas (*constraints*), tipe data, dan pemicu (*triggers*) yang didefinisikan pada skema basis data.
3. ***Isolation***: Menjamin bahwa transaksi yang berjalan secara serentak (*concurrent transactions*) tidak saling mempengaruhi atau menghasilkan kondisi *lost update*. PostgreSQL menggunakan mekanisme *Multi-Version Concurrency Control* (MVCC) dan perintah penguncian baris (`SELECT ... FOR UPDATE`) untuk mengisolasi transaksi sensitif.
4. ***Durability***: Menjamin bahwa data transaksi yang telah dikomit (*COMMIT*) tersimpan secara permanen pada media penyimpanan fisik.

Dalam konfigurasi lokal Supabase untuk platform Justifiqa (`supabase/config.toml`), target basis data mengacu pada PostgreSQL versi mayor 17 (`major_version = 17`). Fungsi *Remote Procedure Call* (RPC) ditulis menggunakan bahasa terprosedur PL/pgSQL dengan atribut `SECURITY DEFINER` untuk menjalankan transaksi kompleks dalam batasan privilese yang terkontrol.

## 2.5 Idempotensi, Replay Protection, dan HMAC SHA-256

*Idempotensi* adalah sifat dari suatu operasi API atau perintah basis data di mana eksekusi perintah tersebut secara berulang kali dengan parameter yang identik menghasilkan efek samping (*side effect*) dan hasil yang sama persis seperti pada eksekusi pertama (Fielding et al., 2014). Sifat ini sangat penting dalam integrasi pembayaran berbasis *webhook*, di mana server penyedia pembayaran dapat mengirimkan pemberitahuan yang sama berkali-kali (*retry delivery*).

Perlindungan terhadap serangan eksekusi ganda (*replay attack*) dicapai melalui kombinasi dua teknik:
1. **Penguncian Baris dan Event Ledger**: Menyimpan ID peristiwa unik (`provider_event_id`) ke dalam tabel khusus. Ketika peristiwa yang sama diterima kembali, basis data mendeteksi status yang telah diproses (*PROCESSED*) dan mengembalikan tanda terima asli tanpa mengulang mutasi dana (*zero partial write*).
2. **Verifikasi Tanda Tangan HMAC SHA-256**: Menggunakan algoritma *Hash-based Message Authentication Code* (HMAC) dengan fungsi hash SHA-256 untuk memverifikasi autentisitas dan integritas muatan pesan *webhook* (Krawczyk et al., 1997). Verifikasi dilakukan terhadap berkas *raw body bytes* yang asli sebelum diproses oleh parser JSON guna mencegah serangan manipulasi muatan (*payload tampering*) dan perbedaan pemformatan (*canonicalization drift*).

## 2.6 Arsitektur Supabase: GoTrue, PostgREST, RLS, dan Edge Functions

Supabase adalah platform *Backend-as-a-Service* (BaaS) berbasis PostgreSQL yang menyediakan komponen infrastruktur terintegrasi (Supabase Inc., 2024):
1. **Supabase Auth (GoTrue)**: Layanan otentikasi berbasis *JSON Web Token* (JWT) yang mengelola sesi pengguna, peran (*roles*), dan identitas *OAuth*.
2. **PostgREST**: Mesin web pelayan yang secara otomatis mengonversi skema basis data PostgreSQL menjadi *RESTful API* yang aman.
3. **Row Level Security (RLS)**: Fitur bawaan PostgreSQL yang membatasi baris data yang dapat dibaca, ditambah, diubah, atau dihapus oleh pengguna berdasarkan klaim token JWT (`auth.uid()` dan `auth.role()`).
4. **Supabase Edge Functions**: Lingkungan eksekusi *serverless* berbasis Deno/TypeScript yang berjalan dekat dengan pengguna (*edge nodes*). Edge Functions digunakan untuk menangani logika bisnis yang memerlukan kunci rahasia (*server secret*), seperti verifikasi *webhook* HMAC dan pemanggilan API eksternal.

## 2.7 Pola Desain Integration Layer dan Single-Flight Mutation State

Pada sisi antarmuka frontend React, integrasi dengan Supabase menerapkan pemisahan lapisan yang tegas antara komponen tampilan (*presentational components*), kait khusus (*custom hooks*), dan layanan integrasi (*integration services*).

Untuk mencegah mutasi ganda akibat penekanan tombol berulang kali oleh pengguna, antarmuka menerapkan pola *Single-Flight Mutation State*. Pola ini memanfaatkan kait status (*mutation state hooks*) yang mengunci fungsi mutasi ketika status berstatus `PENDING` atau `IN_FLIGHT`. Jika pengguna melakukan aksi pengiriman berulang, permintaan sekunder secara otomatis diabaikan atau dibatalkan sebelum mencapai jaringan (*single-flight guard*). Selain itu, seluruh pesan kesalahan dari backend dipetakan melalui *allowlist error codes* yang aman untuk mencegah kebocoran informasi internal basis data ke layar pengguna (*safe error mapping*).

## 2.8 Pengujian Berbasis Bukti Faktual dan Audit Forensik

Dalam rekayasa perangkat lunak akademik, kebenaran klaim implementasi sistem tidak boleh bersumber dari asumsi, rancangan teoritis, atau narasi dokumentasi semata. Perangkat lunak yang dikembangkan wajib diaudit menggunakan metode audit forensik 360-derajat (*360-degree forensic audit*) (Pressman & Maxim, 2020).

Audit forensik membandingkan secara langsung antara kewajiban normatif (spesifikasi kebutuhan), bukti komit repositori Git, eksekusi perintah pengujian otomatis (*automated test suites*), dan ketersediaan simbol (*symbol map verification*). Dalam konteks pengujian lokal (*ACCEPTED_LOCAL*), pengujian basis data dilaksanakan menggunakan transaksi *runtime SQL* yang sengaja diakhiri dengan perintah `ROLLBACK` agar tidak mencemari lingkungan basis data pengujian, sambil memastikan bahwa pemicu (*triggers*), aturan RLS, dan penguncian mutex pada objek teruji berfungsi sesuai spesifikasi.


---

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


---

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


---

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


---

# DAFTAR PUSTAKA

Fielding, R., Reschke, J., & Berners-Lee, T. (2014). *Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content* (RFC 7231). Internet Engineering Task Force (IETF). https://datatracker.ietf.org/doc/html/rfc7231

Krawczyk, H., Bellare, M., & Canetti, R. (1997). *HMAC: Keyed-Hashing for Message Authentication* (RFC 2104). Network Working Group. https://datatracker.ietf.org/doc/html/rfc2104

OWASP Foundation. (2023). *OWASP Top 10 API Security Risks – 2023*. https://owasp.org/API-Security/editions/2023/en/0x00-header/

PostgreSQL Global Development Group. (2024). *PostgreSQL 17 Documentation*. https://www.postgresql.org/docs/17/

Pressman, R. S., & Maxim, B. R. (2020). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education.

Republik Indonesia. (2008). *Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik*. Lembaran Negara Republik Indonesia Tahun 2008 Nomor 58.

Republik Indonesia. (2018). *Peraturan Presiden Nomor 13 Tahun 2018 tentang Penerapan Prinsip Mengenali Pemilik Manfaat dari Korporasi dalam Rangka Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang dan Tindak Pidana Pendanaan Terorisme*. Lembaran Negara Republik Indonesia Tahun 2018 Nomor 23.

Republik Indonesia. (2021). *Peraturan Pemerintah Nomor 8 Tahun 2021 tentang Modal Perseroan serta Pendirian, Perubahan, dan Pembubaran Perseroan yang Memenuhi Kriteria untuk Usaha Mikro dan Kecil*. Lembaran Negara Republik Indonesia Tahun 2021 Nomor 18.

Republik Indonesia. (2022). *Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi*. Lembaran Negara Republik Indonesia Tahun 2022 Nomor 226.

Republik Indonesia. (2024). *Undang-Undang Nomor 1 Tahun 2024 tentang Perubahan Kedua atas Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik*. Lembaran Negara Republik Indonesia Tahun 2024 Nomor 14.

Supabase Inc. (2024). *Supabase Documentation*. https://supabase.com/docs/


---

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
