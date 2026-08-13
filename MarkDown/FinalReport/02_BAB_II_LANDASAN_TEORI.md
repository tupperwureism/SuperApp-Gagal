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
