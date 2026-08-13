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
