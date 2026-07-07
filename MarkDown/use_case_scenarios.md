# Spesifikasi Skenario Use Case - LifeQ Ecosystem (Justifiqa & Qualifa Standalone Apps)

Dokumen ini berisi spesifikasi skenario tertulis (*Use Case Scenarios*) untuk seluruh Use Case yang teridentifikasi dalam rancangan sistem **LifeQ Ecosystem**. Setiap skenario merinci deskripsi, aktor, kondisi prasyarat (*pre-condition*), kondisi akhir (*post-condition*), alur sukses utama (*basic flow*), dan alur alternatif/gagal (*alternative flow*).

> **Catatan UML**: Aktor hanya diisi oleh entitas di luar sistem (*external entities*). Sistem itu sendiri bertindak sebagai batasan sistem (*system boundary*) sehingga tidak dimasukkan sebagai aktor pendukung.

---

## DAFTAR ISI KELOMPOK AKTOR
* [A. Aktor: Klien (Client)](#a-aktor-klien-patient)
* [B. Aktor: Mitra Profesional (Advokat / Psikolog)](#b-aktor-mitra profesional-doctor)
* [C. Aktor: Admin (Administrator)](#c-aktor-admin-administrator)

---

## A. Aktor: Klien (Client)

### UC-01: Melakukan Registrasi Klien
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Calon klien mendaftarkan akun baru agar dapat mengakses layanan kesehatan dalam aplikasi.
* **Pre-condition**: Klien belum terdaftar dan tidak sedang masuk ke akun lain.
* **Post-condition**: Akun klien baru berhasil dibuat di database dengan status aktif.
* **Alur Utama (Basic Flow)**:
  1. Klien membuka halaman pendaftaran akun.
  2. Sistem menampilkan formulir registrasi (Nama Lengkap, Email, Nomor Telepon, dan Kata Sandi).
  3. Klien mengisi seluruh data wajib dan mengklik tombol "Daftar".
  4. Sistem memvalidasi kelengkapan dan format data yang diinput.
  5. Sistem menyimpan data akun baru di database dengan status aktif.
  6. Sistem menampilkan pesan sukses dan mengarahkan klien ke halaman Login.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **4a. Email atau Nomor Telepon Sudah Terdaftar**:
    1. Sistem mendeteksi bahwa email atau nomor telepon sudah terdaftar di database.
    2. Sistem menampilkan pesan error: *"Email atau Nomor Telepon sudah digunakan"*.
    3. Sistem meminta klien memasukkan data yang berbeda.
  * **4b. Format Data Tidak Valid**:
    1. Sistem mendeteksi format email tidak valid atau panjang kata sandi kurang dari 8 karakter.
    2. Sistem menampilkan pesan error validasi yang sesuai.
    3. Klien memperbaiki input data.

---

### UC-02: Melakukan Login Klien
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Klien masuk ke dalam aplikasi menggunakan kredensial akun dan kode verifikasi email (OTP).
* **Pre-condition**: Klien sudah memiliki akun aktif dan berada di halaman Login.
* **Post-condition**: Klien berhasil masuk dan mendapatkan token sesi aktif untuk mengakses dasbor utama.
* **Alur Utama (Basic Flow)**:
  1. Klien memasukkan Email/Nomor Telepon dan Kata Sandi pada halaman Login.
  2. Klien mengklik tombol "Masuk".
  3. Sistem memverifikasi kecocokan data dengan database.
  4. Sistem mengirimkan kode verifikasi (OTP) ke email Klien yang terdaftar.
  5. Sistem menampilkan halaman verifikasi OTP.
  6. Klien memasukkan kode verifikasi (OTP) yang diterima di email.
  7. Sistem memvalidasi kode verifikasi.
  8. Sistem membuat token sesi baru (JWT) untuk menjaga status masuk.
  9. Sistem mengarahkan klien ke halaman Dasbor Utama Klien.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Kredensial Salah**:
    1. Sistem mendeteksi email tidak terdaftar atau kata sandi tidak cocok.
    2. Sistem menampilkan pesan error: *"Email atau Kata Sandi salah"*.
    3. Klien diminta mengisi kembali kredensial.
  * **3b. Akun Diblokir/Ditangguhkan**:
    1. Sistem mendeteksi status akun klien adalah `SUSPENDED` (karena pelanggaran).
    2. Sistem menampilkan pesan error: *"Akun Anda dinonaktifkan karena melanggar ketentuan. Silakan hubungi Customer Service"*.
    3. Sesi masuk dibatalkan.
  * **7a. Kode Verifikasi (OTP) Salah / Kadaluarsa**:
    1. Sistem mendeteksi kode OTP tidak cocok atau waktu aktif OTP habis.
    2. Sistem menampilkan pesan error: *"Kode verifikasi salah atau sudah kadaluarsa"*.
    3. Klien diminta mengisi kembali OTP atau mengklik "Kirim Ulang Kode".

---

### UC-03: Memilih Mitra Profesional
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Klien mencari dan memfilter daftar mitra profesional spesialis yang sedang online untuk dikonsultasikan.
* **Pre-condition**: Klien sudah login dan berada di halaman utama pencarian mitra profesional.
* **Post-condition**: Klien memilih satu profil mitra profesional spesialis untuk sesi konsultasi.
* **Alur Utama (Basic Flow)**:
  1. Klien memilih kategori spesialisasi (misal: Mitra Profesional Umum, Mitra Profesional Spesialis Anak).
  2. Sistem menampilkan daftar mitra profesional yang sesuai dengan filter spesialisasi.
  3. Klien memfilter daftar berdasarkan status ketersediaan (Hanya menampilkan yang online).
  4. Sistem memperbarui daftar mitra profesional secara real-time.
  5. Klien mengklik salah satu profil mitra profesional untuk melihat detail tarif dan rating.
  6. Sistem menampilkan detail profil mitra profesional yang dipilih.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Mitra Profesional Tidak Ditemukan**:
    1. Sistem mendeteksi tidak ada mitra profesional yang memenuhi kriteria pencarian/spesialisasi.
    2. Sistem menampilkan pesan: *"Mitra Profesional tidak ditemukan atau sedang offline"*.
    3. Klien kembali memilih kategori lain.

---

### UC-04: Melakukan Konsultasi
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Mitra Profesional
* **Deskripsi Singkat**: Klien melakukan konsultasi interaktif via chat real-time dengan mitra profesional setelah proses pembayaran berhasil.
* **Pre-condition**: Klien sudah memilih mitra profesional (UC-03) dan memiliki sesi aktif yang terverifikasi pembayarannya.
* **Post-condition**: Sesi chat ditutup, dan data konsultasi serta dokumen anjuran/telaah disimpan di database.
* **Alur Utama (Basic Flow)**:
  1. Klien mengklik "Mulai Konsultasi" setelah pembayaran diverifikasi sukses.
  2. Sistem memverifikasi tiket pembayaran (UC-05) dan membuka ruang obrolan (chat room). **[Actor Viewpoint Routing]:** Sistem menyajikan antarmuka dengan struktur DOM dari sudut pandang Klien (`?role=klien`, pesan Klien di kanan sebagai `.user`).
  3. Sistem mengirimkan notifikasi ke dasbor Mitra Profesional (UC-10) untuk menerima obrolan.
  4. Klien dan Mitra Profesional melangsungkan sesi tanya jawab via chat. Saat Mitra masuk (`?role=mitra`), sistem merender presentasi DOM yang dibalik secara adaptif (pesan Mitra di kanan sebagai `.user`, Klien di kiri sebagai `.partner`).
  5. Mitra Profesional menutup sesi setelah selesai memberikan diagnosis.
  6. Sistem mengunci ruang obrolan sehingga pesan baru tidak dapat dikirim lagi.
  7. Sistem menyimpan riwayat obrolan dan mengarahkan klien ke halaman pemberian ulasan (UC-06).
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Tiket Pembayaran Tidak Valid/Belum Dibayar**:
    1. Sistem mendeteksi status transaksi pembayaran untuk tiket konsultasi ini adalah `FAILED` atau `PENDING`.
    2. Sistem membatalkan pembukaan ruang obrolan dan mengarahkan klien kembali ke halaman pembayaran.
  * **3a. Mitra Profesional Tidak Merespon (Timeout)**:
    1. Mitra Profesional tidak bergabung ke chat room setelah waktu tunggu berakhir (misal: 5 menit).
    2. Sistem membatalkan sesi konsultasi secara otomatis.
    3. Sistem menginisiasi pengembalian dana (*refund*) transaksi otomatis ke klien.
    4. Sistem menampilkan pesan permintaan maaf ke klien.
  * **3b. Klien Keluar dari Ruang Chat Secara Sepihak**:
    1. Sistem mendeteksi klien menutup halaman obrolan/aplikasi secara sengaja sebelum mitra profesional mengakhiri sesi.
    2. Sistem mengirimkan pesan konfirmasi pop-up untuk memastikan tindakan klien.
    3. Klien mengonfirmasi ingin keluar. Sistem mengunci ruang chat dan mengakhiri sesi.
    4. Sistem menandai status sesi sebagai `COMPLETED` dan menutup transaksi tanpa pengembalian dana (*no refund*).

---

### UC-05: Melakukan Pembayaran
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Payment Gateway
* **Deskripsi Singkat**: Klien melakukan pembayaran biaya konsultasi menggunakan metode pembayaran digital pilihan mereka (*Include* dari UC-04).
* **Pre-condition**: Klien telah memilih mitra profesional dan jadwal janji temu konsultasi.
* **Post-condition**: Pembayaran diverifikasi sukses, dan tiket konsultasi aktif diterbitkan.
* **Alur Utama (Basic Flow)**:
  1. Klien memilih metode pembayaran (E-wallet, Virtual Account, Kartu Kredit) pada halaman checkout.
  2. Sistem mengirimkan data transaksi ke Payment Gateway untuk membuat Snap Token pembayaran.
  3. Payment Gateway mengembalikan token transaksi dan instruksi pembayaran.
  4. Sistem menampilkan instruksi pembayaran kepada Klien.
  5. Klien menyelesaikan pembayaran di aplikasi e-wallet atau m-banking miliknya.
  6. Payment Gateway memvalidasi transaksi dan mengirim callback status "Sukses" ke Sistem.
  7. Sistem memperbarui status transaksi menjadi `PAID` dan menerbitkan tiket konsultasi aktif.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **5a. Pembayaran Gagal / Ditolak (Saldo Kurang, dll.)**:
    1. Payment Gateway mendeteksi transaksi gagal dan mengirimkan status callback "Gagal" ke Sistem.
    2. Sistem memperbarui status transaksi menjadi `FAILED` dan menampilkan notifikasi: *"Pembayaran Anda Gagal"*.
    3. Klien diarahkan kembali ke halaman pemilihan metode pembayaran untuk mencoba lagi.
  * **5b. Batas Waktu Pembayaran Habis (Timeout)**:
    1. Klien tidak melakukan pembayaran hingga batas waktu (misal: 15 menit) berakhir.
    2. Payment Gateway membatalkan transaksi dan mengirim status callback "Expired".
    3. Sistem memperbarui status transaksi menjadi `EXPIRED` dan membatalkan booking mitra profesional.

---

### UC-06: Memberikan Ulasan dan Rating
* **Aktor Utama**: Klien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Klien memberikan penilaian berupa skor rating bintang dan ulasan teks untuk mitra profesional setelah sesi konsultasi selesai.
* **Pre-condition**: Sesi konsultasi telah ditutup secara resmi (UC-04).
* **Post-condition**: Ulasan tersimpan dan mempengaruhi nilai rata-rata rating mitra profesional di profil publik mereka.
* **Alur Utama (Basic Flow)**:
  1. Sistem menampilkan halaman pemberian ulasan kepada klien setelah ruang obrolan ditutup.
  2. Klien memilih skor bintang (1 hingga 5).
  3. Klien menuliskan ulasan singkat mengenai pengalaman konsultasinya.
  4. Klien mengklik tombol "Kirim Ulasan".
  5. Sistem menyimpan ulasan ke database dan memperbarui kalkulasi rating rata-rata mitra profesional.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Klien Melewati Ulasan (Skip)**:
    1. Klien memilih tombol "Nanti Saja / Skip".
    2. Sistem menutup halaman ulasan dan langsung mengarahkan klien kembali ke halaman dasbor utama tanpa menyimpan rating.

---

## B. Aktor: Mitra Profesional (Advokat / Psikolog)

### UC-07: Melakukan Registrasi Mitra Profesional
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Calon mitra profesional mendaftarkan akun baru dan mengunggah berkas STR agar dapat diverifikasi oleh admin.
* **Pre-condition**: Mitra Profesional belum terdaftar di sistem.
* **Post-condition**: Akun mitra profesional baru dibuat dengan status `PENDING_VERIFICATION` menunggu persetujuan admin.
* **Alur Utama (Basic Flow)**:
  1. Mitra Profesional membuka halaman registrasi khusus mitra profesional.
  2. Sistem menampilkan formulir registrasi (Nama Lengkap, Spesialisasi, Nomor STR, Ijazah, Foto STR, dan Kata Sandi).
  3. Mitra Profesional mengisi formulir, mengunggah file foto dokumen STR, dan mengklik "Kirim Pendaftaran".
  4. Sistem memvalidasi kelengkapan data dan format file yang diunggah.
  5. Sistem menyimpan data ke database dengan status akun `PENDING_VERIFICATION`.
  6. Sistem mengirimkan notifikasi tugas baru ke dasbor Admin (UC-13) dan menampilkan pesan sukses pengunggahan kepada mitra profesional.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Berkas Kredensial Wajib Kosong**:
    1. Mitra Profesional tidak mengunggah file STR atau ijazah.
    2. Sistem mendeteksi ketiadaan file wajib dan membatalkan pengiriman data.
    3. Sistem menampilkan error: *"Dokumen STR dan Ijazah wajib diunggah"*.
  * **3b. Format File Tidak Didukung**:
    1. Mitra Profesional mengunggah file berformat selain PDF atau JPG/PNG (misal: .zip).
    2. Sistem menampilkan error: *"Format file tidak didukung. Harap unggah PDF, JPG, atau PNG"*.

---

### UC-08: Melakukan Login Mitra Profesional
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Mitra Profesional masuk ke dasbor profesional menggunakan kredensial akun dan verifikasi email (OTP).
* **Pre-condition**: Akun mitra profesional sudah aktif dan telah diverifikasi oleh admin.
* **Post-condition**: Mitra Profesional masuk ke dasbor mitra profesional dan siap menerima chat klien.
* **Alur Utama (Basic Flow)**:
  1. Mitra Profesional memasukkan Email/Nomor STR dan Kata Sandi pada halaman Login Mitra Profesional.
  2. Mitra Profesional mengklik tombol "Masuk".
  3. Sistem mencocokkan kredensial di database mitra profesional.
  4. Sistem mengirimkan kode verifikasi (OTP) ke email Mitra Profesional yang terdaftar.
  5. Sistem menampilkan halaman verifikasi OTP.
  6. Mitra Profesional memasukkan kode verifikasi (OTP) yang diterima di email.
  7. Sistem memvalidasi kode verifikasi.
  8. Sistem membuat token sesi aktif dan mengarahkan mitra profesional ke halaman Dasbor Profesional Mitra Profesional.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Akun Belum Diverifikasi Admin**:
    1. Sistem mendeteksi kredensial benar, tetapi status verifikasi akun masih `PENDING_VERIFICATION`.
    2. Sesi masuk ditolak.
    3. Sistem menampilkan pesan: *"Akun Anda masih dalam proses verifikasi oleh Admin. Harap tunggu"*.
  * **3b. Akun Ditolak oleh Admin**:
    1. Sistem mendeteksi status verifikasi akun mitra profesional adalah `REJECTED`.
    2. Sistem menampilkan pesan error dan detail alasan penolakan berkas dari admin.
    3. Sistem mengarahkan mitra profesional kembali ke formulir pendaftaran untuk mengoreksi berkas.
  * **7a. Kode Verifikasi (OTP) Salah / Kadaluarsa**:
    1. Sistem mendeteksi kode OTP tidak cocok atau waktu aktif OTP habis.
    2. Sistem menampilkan pesan error: *"Kode verifikasi salah atau sudah kadaluarsa"*.
    3. Mitra Profesional diminta mengisi kembali OTP atau mengklik "Kirim Ulang Kode".

---

### UC-09: Mengonfirmasi Status Ketersediaan (on/off)
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Mitra Profesional mengubah status ketersediaan mereka menjadi online atau offline agar sistem dapat menampilkan ketersediaan mereka kepada klien.
* **Pre-condition**: Mitra Profesional sudah login dan berada di dasbor utama mitra profesional.
* **Post-condition**: Status ketersediaan mitra profesional di database diperbarui secara instan.
* **Alur Utama (Basic Flow)**:
  1. Mitra Profesional membuka dasbor mitra profesional dan melihat toggle status "Online / Siap Melayani".
  2. Mitra Profesional mengubah toggle tersebut menjadi aktif (Online).
  3. Sistem memproses permintaan perubahan status ketersediaan.
  4. Sistem memperbarui status mitra profesional menjadi `ONLINE` di database dan menampilkan status hijau aktif.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Mitra Profesional Menonaktifkan Status (Offline)**:
    1. Mitra Profesional menggeser toggle status ketersediaan menjadi tidak aktif.
    2. Sistem mengubah status mitra profesional menjadi `OFFLINE` di database.
    3. Profil mitra profesional tidak akan muncul dalam filter pencarian mitra profesional online klien.
  * **2b. Kegagalan Perubahan Status karena Konflik Jadwal / Sesi Aktif (Error 409 Conflict - SD-J-04)**:
    1. Mitra Profesional menggeser toggle status ketersediaan.
    2. Sistem mendeteksi adanya sesi konsultasi yang sedang berjalan (aktif) atau jadwal sidang yang bentrok di database.
    3. Sistem menolak perubahan status dan mengembalikan HTTP 409 Conflict.
    4. Sistem menampilkan pesan error: *"Gagal mengubah status ketersediaan! Terdapat sesi konsultasi yang sedang berlangsung atau konflik jadwal sidang"*.

---

### J-UC10: Melayani Konsultasi Hukum & Litigasi E2EE
* **Aktor Utama**: Advokat Mitra Peradi
* **Aktor Pendukung**: Klien Hukum
* **Deskripsi Singkat**: Advokat menerima permintaan konsultasi klien dan memberikan layanan konsultasi hukum, review kontrak, atau analisis litigasi di dalam ruang konsultasi terenkripsi Zero-Knowledge.
* **Pre-condition**: Advokat dalam status Online (J-UC09) dan ada klien yang memulai sesi konsultasi dari escrow pembayarannya (J-UC05).
* **Post-condition**: Sesi konsultasi ditutup dan advokat beralih ke Workstation Hukum untuk menyusun IRAC Note (J-UC11) dan Legal Opinion / Draf Kontrak e-Meterai (J-UC12).
* **Alur Utama (Basic Flow)**:
  1. Sistem memunculkan pop-up permintaan konsultasi masuk ke dasbor Advokat Mitra Peradi.
  2. Advokat mengklik tombol "Terima Sesi Litigasi".
  3. Sistem menghubungkan Advokat ke ruang obrolan (chat room E2EE `SCR-JST-06`) yang aktif dengan Klien. **[Actor Viewpoint Routing]:** Sistem mengaktifkan parameter `?role=mitra` dan membalikkan presentasi DOM secara otomatis (identitas Klien di topbar, pesan Advokat di kanan sebagai `.user`).
  4. Advokat meninjau keluhan hukum klien serta bukti perkara yang diunggah (J-UC13) dan memberikan nasihat hukum profesional via chat.
  5. Setelah konsultasi selesai, Advokat atau Klien mengklik tombol "Akhiri Sesi Litigasi" (SD-J-03).
  6. Sistem menutup ruang obrolan, mencairkan dana escrow ke advokat, dan mengarahkan advokat ke Workstation Hukum (`SCR-JST-05`).
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Advokat Menolak / Sesi Timeout (Error 408 / SD-J-03 Alternatif)**:
    1. Advokat mengklik tombol penolakan atau tidak merespons dalam batas waktu yang ditentukan.
    2. Sistem mengembalikan dana escrow secara penuh ke saldo klien dan menawarkan pencarian advokat alternatif lain.

---

### J-UC11: Membuat Catatan Sesi Hukum Terstruktur (IRAC Note)
* **Aktor Utama**: Advokat Mitra Peradi
* **Aktor Pendukung**: WORM Hash Storage
* **Deskripsi Singkat**: Advokat menyusun catatan analisis hukum terstruktur menggunakan metode IRAC (Issue, Rule, Application, Conclusion) setelah sesi konsultasi selesai, yang disimpan secara permanen di WORM Storage dengan enkripsi AES-256.
* **Pre-condition**: Advokat telah mengakhiri sesi konsultasi hukum (J-UC10 / SD-J-03).
* **Post-condition**: Catatan IRAC tersimpan di WORM Storage dengan retensi 10 tahun dan dapat dipilih untuk dibagikan ke klien atau sebagai arsip internal.
* **Alur Utama (Basic Flow)**:
  1. Advokat membuka Workstation Kontrak & Litigasi (`SCR-JST-05`).
  2. Sistem menampilkan formulir IRAC Note dengan field wajib: Referensi Kasus/Sesi Klien (`Session ID`), Rumusan Masalah (Issue), Dasar UU (Rule), Analisis Hukum (Application), dan Kesimpulan (Conclusion).
  3. Advokat memilih Referensi Kasus/Sesi (misal: `#CASE-2026-001`) serta mengisi rumusan masalah hukum, pasal/undang-undang yang relevan, analisis penerapan, dan kesimpulan strategis.
  4. Advokat memilih visibilitas catatan (Bagikan ke Klien atau Internal Law Firm).
  5. Advokat mengklik tombol "Simpan & Enkripsi IRAC Note ke WORM".
  6. Sistem mengenkripsi catatan dengan AES-256 dan menyimpannya di WORM Hash Storage.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Form IRAC Tidak Lengkap (Error 400 Validation)**:
    1. Advokat mengklik simpan namun field wajib (seperti Rumusan Masalah atau Dasar UU) masih kosong.
    2. Sistem membatalkan penyimpanan dan memunculkan peringatan error: *"⚠️ Error 400 Bad Request: Seluruh field IRAC (Issue, Rule, Application, Conclusion) wajib diisi untuk standar rekam hukum Justifiqa."*

---

### J-UC12 / J-UC14: Menerbitkan Legal Opinion & Draf Kontrak e-Meterai Peruri
* **Aktor Utama**: Advokat Mitra Peradi
* **Aktor Pendukung**: Klien Hukum, API Perum Peruri Stamping, WORM Storage
* **Deskripsi Singkat**: Advokat merancang dan menerbitkan dokumen hukum sah (Legal Opinion, Somasi, atau Draf Perjanjian) berdasarkan template baku dan membubuhkannya dengan e-Meterai resmi Peruri Rp10.000 yang berketetapan hukum tetap (*Download Gate*).
* **Pre-condition**: Advokat sedang mengelola perkara klien di Workstation Hukum (`SCR-JST-05`).
* **Post-condition**: Dokumen hukum bersertifikat e-Meterai diterbitkan, tersimpan di database/WORM, dan siap diunduh oleh klien setelah verifikasi kuota & stamping berhasil.
* **Alur Utama (Basic Flow - SD-J-06 Langkah 227-243)**:
  1. Advokat membuka tab "Generator Draf Hukum / Legal Opinion" pada Workstation (`SCR-JST-05`).
  2. Advokat memilih template dokumen hukum baku yang dapat diedit (misal: *Legal Opinion*, *Surat Somasi*, atau *Perjanjian Sewa / NDA*).
  3. Advokat mengisi klausul hukum dan mencentang opsi pembubuhan **"e-Meterai Peruri Rp10.000 bersertifikat SHA-256"**.
  4. Advokat mengklik tombol "Terbitkan Dokumen & Bubuhkan e-Meterai (SD-J-06)".
  5. Sistem melakukan panggilan API ke Perum Peruri (`POST /api/v3/stamp`), memverifikasi kuota, dan membubuhkan serial number e-Meterai sah pada dokumen PDF.
  6. Sistem menyimpan dokumen bersertifikat di WORM Storage dan mengirimkan notifikasi kepada klien.
  7. *Download Gate*: Klien diverifikasi oleh sistem dan diizinkan mengunduh dokumen akhir yang telah sah bermeterai.
* **Alur Alternatif/Gagal (Alternative Flow - SD-J-06)**:
  * **3a. Kuota e-Meterai Habis / Kegagalan API Peruri (Error 502 / 402 - J-UC14 Alternatif)**:
    1. Sistem mendeteksi kuota e-Meterai advokat/platform habis atau API Peruri mengalami gangguan/timeout.
    2. Sistem membatalkan penerbitan sertifikat e-Meterai dan memunculkan error: *"⚠️ Stamping Gagal (Error 402 Payment Required / 502 Bad Gateway - SD-J-06): Kuota e-Meterai Peruri tidak mencukupi atau layanan stamping sedang sibuk. Silakan isi ulang kuota atau terbitkan sebagai Draf Tanpa Meterai terlebih dahulu."*
  * **3b. Validasi Download Gate (Dokumen Belum Bermeterai / Pending Stamping)**:
    1. Klien mencoba mengunduh dokumen hukum saat proses stamping Peruri belum selesai diverifikasi.
    2. Sistem menolak akses unduhan dan memunculkan peringatan *Download Gate*: *"⚠️ Access Denied (Error 403 Forbidden - J-UC12 Download Gate): Dokumen hukum sedang dalam proses pembubuhan e-Meterai Peruri dan verifikasi SHA-256. Unduhan baru dibuka setelah status dokumen SAH & BERMETERAI."*

---

### J-UC13: Mengunggah Berkas Perkara E2EE Zero-Knowledge
* **Aktor Utama**: Klien Hukum
* **Aktor Pendukung**: Advokat Mitra Peradi, WORM Hash Storage, Backend Justifiqa
* **Deskripsi Singkat**: Klien atau advokat mengunggah bukti perkara hukum (PDF/JPG, maks 15 MB) ke dalam ruang obrolan dengan perlindungan enkripsi *client-side Zero-Knowledge* dan penyimpanan terintegrasi di WORM storage.
* **Pre-condition**: Sesi konsultasi hukum aktif di dalam ruang obrolan E2EE (`SCR-JST-06`).
* **Post-condition**: Berkas terenkripsi tersimpan di WORM Hash Storage dengan stempel metadata *"PRIVILEGED LEGAL EVIDENCE"*, dan dapat diunduh/didekripsi oleh lawan bicara.
* **Alur Utama (Basic Flow - SD-J-05 Langkah 197-209)**:
  1. Klien mengklik tombol unggah bukti perkara dan memilih file bukti hukum (format PDF/JPG, maksimal 15 MB).
  2. Sistem lokal klien (`LocK`) melakukan pemindaian virus/malware di *client-side* secara otomatis.
  3. Sistem lokal klien (`LocK`) melakukan enkripsi file dengan *Session Key* (metode *Zero-Knowledge*, kunci tidak pernah dikirim atau disimpan di server).
  4. Sistem lokal mengirimkan *encrypted blob* dan hash SHA-256 ke *Backend* (`BE`), yang diteruskan untuk disimpan ke *WORM Hash Storage*.
  5. *WORM Storage* mengonfirmasi penyimpanan dan sistem menyematkan stempel metadata *"PRIVILEGED LEGAL EVIDENCE - ATTORNEY-CLIENT PRIVILEGE"*.
  6. *Backend* mengirimkan notifikasi *webhook* ke workstation Advokat dan menampilkan gelembung dokumen baru di ruang obrolan.
  7. Advokat mengklik tombol unduh/dekripsi bukti perkara pada gelembung obrolan.
  8. Sistem lokal advokat (`LocM`) mengambil *encrypted blob* dari WORM dan melakukan dekripsi lokal menggunakan *Session Key*.
  9. Dokumen utuh dan sah ditampilkan di *workstation* advokat untuk ditelaah dalam penyusunan IRAC Note.
* **Alur Alternatif/Gagal (Alternative Flow - SD-J-05)**:
  * **3a. Kegagalan Pemindaian Malware (Malware Detected - Error 400)**:
    1. Mesin pemindai *client-side* mendeteksi adanya virus atau kode berbahaya pada berkas yang dipilih.
    2. Sistem membatalkan proses enkripsi dan menolak pengunggahan berkas sebelum meninggalkan perangkat klien.
    3. Sistem memunculkan peringatan error: *"⚠️ Upload Ditolak (400 Bad Request - J-UC13 3a): Sistem mendeteksi potensi ancaman keamanan/malware pada berkas."*
  * **3b. Ukuran Berkas Melebihi Batas 15 MB / Format Tidak Valid (Error 413 / 415)**:
    1. Klien memilih berkas dengan ukuran > 15 MB atau format di luar PDF/JPG.
    2. Sistem menolak pemrosesan dan memunculkan peringatan validasi: *"⚠️ Upload Gagal (413 Payload Too Large / 415 Unsupported Media Type - J-UC13 3b): Ukuran file melebihi batas maksimal 15 MB atau format tidak sesuai (Wajib PDF/JPG)."*

---

### J-UC15: Pengajuan Bantuan Hukum Cuma-Cuma (Pro Bono SKTM)
* **Aktor Utama**: Klien Hukum Prasejahtera
* **Aktor Pendukung**: API Dukcapil & Dinas Sosial (DTKS), Advokat Litigasi Pro Bono, Sistem Justifiqa
* **Deskripsi Singkat**: Klien mengajukan permohonan pendampingan hukum dan litigasi 100% bebas biaya (Pro Bono) dengan melakukan verifikasi identitas (NIK) dan Surat Keterangan Tidak Mampu (SKTM) yang tersinkronisasi dengan Data Terpadu Kesejahteraan Sosial (DTKS).
* **Pre-condition**: Klien telah terdaftar dan berada di Dasbor Klien Hukum (`SCR-JST-02`) atau Workstation Pembayaran (`SCR-JST-04`).
* **Post-condition**: Permohonan Pro Bono disetujui, Invoice Subsidi Rp 0 diterbitkan, dan perkara dialokasikan kepada Advokat kuota Pro Bono aktif.
* **Alur Utama (Basic Flow - SD-J-07 Langkah 261-274)**:
  1. Klien memilih opsi "Ajukan Subsidi Pro Bono" atau metode pembayaran "Voucher Pro Bono SKTM" pada dasbor / payment gateway.
  2. Klien memasukkan 16 digit Nomor Induk Kependudukan (NIK) dan Nomor SKTM resmi dari Kelurahan/Dinsos, serta mengunggah berkas bukti SKTM.
  3. Sistem Justifiqa mengirimkan permintaan verifikasi ke API Dukcapil & Dinas Sosial untuk mencocokkan keabsahan nomor SKTM dan status terdaftar di DTKS.
  4. API eksternal merespons dengan status Valid (200 OK).
  5. Sistem menyetujui pengajuan subsidi dan menerbitkan Invoice Retainer sebesar Rp 0 (Gratis 100%).
  6. Sistem menugaskan Advokat Litigasi yang memiliki kuota Pro Bono aktif untuk menangani perkara klien.
  7. Advokat menerima penugasan dan sistem memberikan akses ruang obrolan konsultasi hukum gratis kepada klien.
* **Alur Alternatif/Gagal (Alternative Flow - SD-J-07)**:
  * **3a. SKTM Tidak Valid / NIK Tidak Terdaftar di DTKS (Error 400 Bad Request - Langkah 266-268)**:
    1. API Dukcapil & Dinas Sosial mengembalikan respons penolakan karena nomor SKTM palsu/kadaluwarsa atau NIK tidak terdaftar di DTKS.
    2. Sistem menolak permohonan bantuan hukum cuma-cuma dan memunculkan peringatan error: *"⚠️ Gagal Verifikasi SKTM (Error 400 Bad Request - J-UC15 3a): Nomor SKTM atau NIK tidak ditemukan dalam Data Terpadu Kesejahteraan Sosial (DTKS) Dinsos."*
    3. Sistem menawarkan opsi kepada klien untuk beralih menggunakan layanan konsultasi melalui Sesi Berbayar Reguler.

---

### J-UC18: Memantau Log Audit Transaksi & WORM Hash Storage
* **Aktor Utama**: Advokat Mitra / Admin Legal Justifiqa
* **Aktor Pendukung**: WORM Hash Storage, Dirjen Pajak (DJP), Peradi
* **Deskripsi Singkat**: Advokat atau Admin melihat dan mengunduh bukti pencatatan transaksi mutlak (*Write-Once-Read-Many*) dalam bentuk kriptografi SHA-256 Hash yang terkunci permanen selama masa retensi 10 tahun untuk kepatuhan audit (`SD-J-10`).
* **Pre-condition**: Terdapat riwayat transaksi pencairan dana atau sesi litigasi yang telah dilog ke dalam sistem WORM Storage.
* **Post-condition**: Bukti potong PPh 21 dan laporan audit WORM SHA-256 dapat diunduh untuk pelaporan pajak tahunan e-Filing DJP.
* **Alur Utama (Basic Flow — SD-J-10 Langkah 364-367)**:
  1. Advokat membuka Workstation Keuangan pada Dasbor Advokat Mitra (`SCR-JST-03`).
  2. Sistem menampilkan tabel riwayat transaksi pencairan beserta string verifikasi WORM Hash SHA-256.
  3. Advokat mengklik tombol **"📑 Unduh PPh 21"**.
  4. Sistem menerbitkan resi bukti pemotongan pajak PPh Pasal 21 yang memuat NPWP, penghasilan bruto, tarif pemotongan 5%, serta kode hash WORM sebagai bukti hukum yang sah.

---

### J-UC19: Melakukan Pencairan Dana Escrow & Perhitungan PPh 21 (Withdrawal)
* **Aktor Utama**: Advokat Mitra Justifiqa
* **Aktor Pendukung**: Payment Gateway Disbursement, Backend Justifiqa, WORM Hash Storage
* **Deskripsi Singkat**: Advokat mengajukan penarikan dana konsultasi (*withdrawal*) dari rekening bersama (*escrow*) ke rekening bank pribadi (misal: BCA). Sistem melakukan perhitungan potongan pajak PPh 21 secara otomatis, memproses transfer real-time, dan menyimpan bukti ke WORM Storage (`SD-J-10`).
* **Pre-condition**: Advokat memiliki Saldo Aktif Siap Tarik yang mencukupi dan nomor rekening bank terverifikasi.
* **Post-condition**: Saldo aktif advokat berkurang, dana berhasil ditransfer ke rekening bank pribadi (`200 OK`), dan log transaksi SHA-256 tersimpan permanen di WORM Storage.
* **Alur Utama (Basic Flow — SD-J-10 Langkah 356-367)**:
  1. Advokat memasukkan nominal pencairan pada formulir pencairan di Dasbor Advokat Mitra (`SCR-JST-03`).
  2. Sistem secara dinamis mengkalkulasi estimasi potongan pajak PPh 21 (5% untuk tenaga ahli advokat) dan estimasi terima bersih (netto).
  3. Advokat mengklik tombol **"💸 Tarik Dana Sekarang (200 OK)"**.
  4. Backend memverifikasi kecukupan saldo, memproses transfer via API Payment Gateway Disbursement, dan memotong saldo aktif advokat.
  5. Sistem mencatat log hash transaksi secara permanen ke WORM Storage dan menampilkan resi sukses penarikan dana beserta rincian pajak PPh 21.
* **Alur Alternatif/Gagal (Alternative Flow — SD-J-10 Langkah 359)**:
  * **3a. Saldo Tidak Cukup / Nominal Tidak Valid (Error 400 Bad Request / 422 Unprocessable Entity)**:
    1. Advokat mengajukan penarikan dengan nominal melebihi Saldo Aktif Siap Tarik atau bernilai Rp 0.
    2. Sistem menolak pemrosesan transaksi dan memunculkan peringatan error: *"⚠️ ERROR 400 BAD REQUEST / 422 UNPROCESSABLE ENTITY (SD-J-10): Gagal memproses pencairan dana! Nominal pencairan melebihi Saldo Aktif Siap Tarik atau tidak valid."*
    3. Saldo advokat tetap utuh dan tidak ada transaksi yang diproses ke Payment Gateway.

---

## C. Aktor: Admin (Administrator)

---

### J-UC16: Memverifikasi Kredensial & Lisensi Advokat (NIA & BAS)
* **Aktor Utama**: Admin Legal Justifiqa / Dewan Kehormatan Peradi
* **Aktor Pendukung**: Pangkalan Data Mahkamah Agung (MA), Registry Peradi/KAI, WORM Storage
* **Deskripsi Singkat**: Admin Legal melakukan cross-check dan otentikasi atas Nomor Induk Advokat (NIA / SIPP) dan Berita Acara Sumpah (BAS) dari advokat yang mendaftar di platform Justifiqa (`SD-J-09`).
* **Pre-condition**: Advokat baru telah menyelesaikan proses registrasi (`J-UC07`) dan mengunggah berkas lisensi hukum.
* **Post-condition**: Akun advokat diaktifkan di katalog publik Justifiqa (`200 OK / VERIFIED`) atau ditolak dengan alasan hukum (`400 Bad Request / REJECTED`).
* **Alur Utama (Basic Flow — SD-J-09 Langkah 317-332)**:
  1. Admin Legal membuka antrean verifikasi advokat pada Dasbor Admin (`SCR-JST-07`).
  2. Sistem menampilkan daftar advokat berstatus pending beserta dokumen bukti (KTP, Kartu Peradi, dan Berita Acara Sumpah PT).
  3. Admin melakukan verifikasi nomor SIPP dan keaslian BAS secara langsung ke Pangkalan Data Mahkamah Agung / Peradi.
  4. Admin mengklik tombol **"✅ Setujui (Approve — 200 OK)"**.
  5. Sistem memperbarui status advokat menjadi `AKTIF / VERIFIED` di dalam database dan mengirimkan email pemberitahuan aktivasi akun siap praktik.
* **Alur Alternatif/Gagal (Alternative Flow — SD-J-09 Langkah 322-326)**:
  * **4a. Kredensial Palsu / Kadaluarsa (Error 400 Bad Request / 403 Forbidden)**:
    1. Admin menemukan bahwa nomor SIPP tidak terdaftar di Pangkalan Data MA atau BAS telah dicabut/kadaluwarsa.
    2. Admin mengklik tombol **"❌ Tolak (Reject)"** dan memasukkan alasan penolakan secara eksplisit.
    3. Sistem memperbarui status advokat menjadi `REJECTED`, mencatat log penolakan di WORM Storage, dan mengirimkan email penjelasan hukum kepada pendaftar.

---

### J-UC17: Memoderasi Laporan Pelanggaran Kode Etik & Suspend Akun (Due Process)
* **Aktor Utama**: Admin Legal Justifiqa / Dewan Kehormatan Peradi
* **Aktor Pendukung**: Advokat Mitra Terlapor, Klien Pelapor, WORM Storage
* **Deskripsi Singkat**: Admin memproses laporan pelanggaran kode etik atau wanprestasi layanan konsultasi hukum yang diajukan oleh klien, serta melakukan penahanan akun darurat (*Due Process Suspend*) (`SD-J-09`).
* **Pre-condition**: Terdapat laporan pelanggaran etik yang masuk dari klien disertai bukti log percakapan E2EE atau berkas WORM.
* **Post-condition**: Akun advokat ditahan sementara (`SUSPENDED`) dan surat panggilan klarifikasi etik internal diterbitkan.
* **Alur Utama (Basic Flow — SD-J-09 Langkah 334-338)**:
  1. Admin membuka tab "🏛️ Sidang Etik & Moderasi" pada Dasbor Admin (`SCR-JST-07`).
  2. Sistem menampilkan daftar kasus dugaan pelanggaran etik beserta bukti berkas terenkripsi dari WORM Storage.
  3. Admin memeriksa bukti pelanggaran (misal: penelantaran sesi konsultasi setelah dana escrow cair).
  4. Admin mengklik tombol **"🛑 Suspend Akun (Due Process — 200 OK)"** dan memasukkan alasan hukum penahanan akun.
  5. Sistem mengubah status akun menjadi `SUSPENDED (Due Process)`, menghapus sementara advokat dari katalog pencarian, dan mengirimkan Surat Panggilan Klarifikasi Internal kepada advokat terkait.

---

### UC-14: Mengelola Data Akun Klien
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin menangguhkan (suspend) akun klien yang terbukti melanggar aturan platform.
* **Pre-condition**: Admin telah login dan berada di dasbor manajemen akun admin.
* **Post-condition**: Akun klien yang melanggar ditangguhkan dan tidak bisa melakukan login.
* **Alur Utama (Basic Flow)**:
  1. Admin memilih menu Kelola Akun Klien.
  2. Sistem menampilkan daftar data akun klien secara keseluruhan.
  3. Admin memeriksa data akun. Jika perlu tindakan penangguhan (Suspend) karena adanya laporan pelanggaran, maka lanjut ke langkah 4. Jika tidak perlu, alur selesai (Sistem tetap menampilkan halaman daftar akun).
  4. Admin memilih akun klien yang melanggar dan mengklik tombol "Suspend/Tangguhkan".
  5. Sistem meminta konfirmasi penangguhan akun klien.
  6. Admin mengonfirmasi tindakan tersebut.
  7. Sistem memperbarui status akun klien menjadi `SUSPENDED` di database, mematikan token sesi aktif klien tersebut, dan menampilkan notifikasi sukses.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Mengaktifkan Kembali Akun Klien (Unsuspend)**:
    1. Admin meninjau banding dari klien dan memutuskan memulihkan akun.
    2. Admin mencari akun klien tersuspend dan mengklik tombol "Aktifkan Kembali".
    3. Sistem memperbarui status akun klien kembali menjadi `ACTIVE` di database dan menampilkan notifikasi sukses.

---

### UC-15: Mengelola Data Akun Mitra Profesional
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin menangguhkan (suspend) akun mitra profesional yang terbukti melanggar kode etik atau kebijakan platform.
* **Pre-condition**: Admin telah login dan berada di dasbor manajemen akun admin.
* **Post-condition**: Akun mitra profesional yang melanggar ditangguhkan dan tidak muncul di filter pencarian mitra profesional.
* **Alur Utama (Basic Flow)**:
  1. Admin memilih menu Kelola Akun Mitra Profesional.
  2. Sistem menampilkan daftar data akun mitra profesional secara keseluruhan.
  3. Admin memeriksa data akun. Jika perlu tindakan penangguhan (Suspend) karena adanya laporan pelanggaran, maka lanjut ke langkah 4. Jika tidak perlu, alur selesai (Sistem tetap menampilkan halaman daftar akun).
  4. Admin memilih akun mitra profesional yang melanggar dan mengklik tombol "Suspend/Tangguhkan".
  5. Sistem meminta konfirmasi penangguhan akun mitra profesional.
  6. Admin mengonfirmasi tindakan tersebut.
  7. Sistem memperbarui status akun mitra profesional menjadi `SUSPENDED` di database, menonaktifkan profil mitra profesional dari filter pencarian, dan menampilkan notifikasi sukses.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Mengaktifkan Kembali Akun Mitra Profesional (Unsuspend)**:
    1. Admin meninjau klarifikasi dari mitra profesional dan memutuskan memulihkan akun.
    2. Admin mencari akun mitra profesional tersuspend dan mengklik tombol "Aktifkan Kembali".
    3. Sistem memperbarui status akun mitra profesional kembali menjadi `ACTIVE` di database dan menampilkan notifikasi sukses.

---

### UC-16: Memantau Laporan Transaksi
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin memantau seluruh transaksi keuangan dari layanan konsultasi yang masuk ke platform dan mengunduh laporan ekspor data.
* **Pre-condition**: Admin telah login dan berada di halaman Laporan Keuangan.
* **Post-condition**: Admin melihat visualisasi grafik keuangan dan mengunduh laporan transaksi berformat PDF/Excel.
* **Alur Utama (Basic Flow)**:
  1. Admin masuk ke halaman Laporan Transaksi Keuangan.
  2. Sistem menampilkan tabel seluruh riwayat transaksi default beserta grafik mingguan.
  3. Admin memilih opsi "Filter" berdasarkan rentang tanggal tertentu.
  4. Sistem memperbarui grafik dan tabel sesuai parameter filter yang dimasukkan.
  5. Admin mengklik tombol "Ekspor Laporan".
  6. Sistem memproses data terfilter dan menghasilkan file ekspor berformat `.xlsx` (Excel).
  7. Sistem mengirim file ke browser Admin untuk diunduh otomatis.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Data Transaksi Tidak Ditemukan Sesuai Filter**:
    1. Sistem mendeteksi tidak ada transaksi yang tercatat pada rentang tanggal filter yang ditentukan Admin.
    2. Sistem menampilkan pesan: *"Tidak ada data transaksi pada periode ini"*.
    3. Sistem menonaktifkan tombol ekspor laporan.
