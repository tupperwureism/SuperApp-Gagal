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
  2. Sistem memverifikasi tiket pembayaran (UC-05) dan membuka ruang obrolan (chat room).
  3. Sistem mengirimkan notifikasi ke dasbor Mitra Profesional (UC-10) untuk menerima obrolan.
  4. Klien dan Mitra Profesional melangsungkan sesi tanya jawab via chat.
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

---

### UC-10: Melayani Konsultasi
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Klien
* **Deskripsi Singkat**: Mitra Profesional menerima tiket konsultasi klien dan memberikan respons dalam ruang obrolan chat real-time.
* **Pre-condition**: Mitra Profesional dalam status online (UC-09) dan ada klien yang mengajukan sesi konsultasi aktif (UC-04).
* **Post-condition**: Mitra Profesional menyelesaikan sesi obrolan chat dan membuat catatan medis.
* **Alur Utama (Basic Flow)**:
  1. Sistem memunculkan pop-up permintaan konsultasi masuk ke dasbor Mitra Profesional.
  2. Mitra Profesional mengklik tombol "Terima Permintaan".
  3. Sistem menghubungkan Mitra Profesional ke ruang obrolan (chat room) yang aktif dengan Klien.
  4. Mitra Profesional membaca keluhan klien dan merespons dengan memberikan diagnosis serta arahan medis via chat.
  5. Setelah diagnosis selesai, Mitra Profesional menulis catatan medis dan dokumen anjuran/telaah obat (UC-11).
  6. Mitra Profesional mengklik tombol "Selesaikan Konsultasi".
  7. Sistem menutup dan mengunci ruang obrolan chat.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Mitra Profesional Menolak Permintaan Konsultasi**:
    1. Mitra Profesional memilih tombol "Tolak / Sibuk".
    2. Sistem mengembalikan tiket klien ke antrean pencarian mitra profesional online lainnya.
    3. Sesi konsultasi pada mitra profesional bersangkutan dibatalkan.

---

### UC-11: Membuat Catatan Medis
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Mitra Profesional menuliskan diagnosis singkat dan kesimpulan medis klien di rekam medis elektronik setelah sesi chat selesai.
* **Pre-condition**: Mitra Profesional berada dalam sesi konsultasi aktif (UC-10).
* **Post-condition**: Data rekam medis disimpan secara permanen di database dan dapat diakses kembali oleh Klien.
* **Alur Utama (Basic Flow)**:
  1. Mitra Profesional mengklik opsi "Buat Catatan Medis" di panel konsultasi.
  2. Sistem menampilkan formulir Rekam Medis (Gejala, Diagnosis, Rekomendasi Tindak Lanjut, dan Instruksi Dokumen Anjuran/Telaah).
  3. Mitra Profesional mengisi detail diagnosis medis dan instruksi pengobatan klien.
  4. Mitra Profesional memilih untuk menambahkan dokumen anjuran/telaah obat (*Extend* ke UC-12).
  5. Mitra Profesional menyimpan catatan medis tersebut.
  6. Sistem menyimpan data rekam medis klien di database dengan status terkunci.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Pengisian Formulir Tidak Lengkap**:
    1. Mitra Profesional mengklik simpan namun kolom wajib seperti "Diagnosis" belum terisi.
    2. Sistem membatalkan proses penyimpanan dan memunculkan notifikasi: *"Kolom Diagnosis wajib diisi sebelum menyimpan catatan medis"*.

---

### UC-12: Membuat Dokumen Anjuran/Telaah Digital
* **Aktor Utama**: Mitra Profesional
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Mitra Profesional meracik dokumen anjuran/telaah obat digital dengan memilih obat dari katalog obat resmi yang disediakan sistem (*Extend dari* UC-11).
* **Pre-condition**: Mitra Profesional sedang mengisi formulir catatan medis (UC-11) dan mendiagnosis penyakit yang memerlukan terapi obat.
* **Post-condition**: Dokumen Anjuran/Telaah digital terbit dan terlampir pada riwayat rekam medis klien.
* **Alur Utama (Basic Flow)**:
  1. Mitra Profesional mengklik tombol "Tambah Obat" pada formulir catatan medis.
  2. Sistem menampilkan kolom pencarian obat yang terhubung dengan katalog obat sistem.
  3. Mitra Profesional mengetik nama obat, memilih obat dari katalog, menentukan dosis (misal: 3x1 sehari), dan jumlah obat (misal: 10 tablet).
  4. Mitra Profesional mengklik "Simpan Dokumen Anjuran/Telaah".
  5. Sistem melampirkan data dokumen anjuran/telaah obat ke catatan medis klien yang bersangkutan.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Stok Obat Kosong / Tidak Tersedia**:
    1. Mitra Profesional mencari obat namun sistem mendeteksi obat tersebut tidak ada dalam katalog obat aktif.
    2. Sistem menampilkan pesan: *"Obat tidak ditemukan dalam katalog"*.
    3. Mitra Profesional memilih opsi obat alternatif dari katalog lain atau menuliskan dokumen anjuran/telaah manual secara teks bebas.

---

## C. Aktor: Admin (Administrator)

### UC-13: Memverifikasi Berkas Mitra Profesional
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin meninjau dokumen STR dan ijazah mitra profesional baru untuk menyetujui atau menolak pendaftaran mereka.
* **Pre-condition**: Ada pendaftaran mitra profesional baru dengan status `PENDING_VERIFICATION` (UC-07).
* **Post-condition**: Status verifikasi mitra profesional berubah menjadi aktif (`ACTIVE`) atau ditolak (`REJECTED`) di database.
* **Alur Utama (Basic Flow)**:
  1. Admin membuka menu "Verifikasi Mitra Profesional" di panel dashboard admin.
  2. Sistem menampilkan daftar mitra profesional baru beserta berkas STR yang telah diunggah.
  3. Admin membuka detail berkas dan melakukan pengecekan keabsahan STR mitra profesional ke database eksternal KKI (Konsil Kemitra profesionalan Indonesia) secara manual.
  4. Berkas dinyatakan sah dan valid. Admin mengklik tombol "Setujui / Approve".
  5. Sistem mengubah status akun mitra profesional menjadi `ACTIVE` dan mengirimkan email pemberitahuan sukses pendaftaran.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **4a. Berkas Tidak Valid / STR Palsu**:
    1. Admin mendeteksi berkas STR tidak valid, kedaluwarsa, atau tidak cocok dengan data KKI.
    2. Admin mengklik tombol "Tolak / Reject".
    3. Sistem menampilkan kolom pengisian alasan penolakan berkas.
    4. Admin mengisi alasan penolakan (misal: *"File STR tidak terbaca / buram"*).
    5. Sistem mengubah status verifikasi mitra profesional menjadi `REJECTED` dan mengirimkan email penolakan berkas beserta alasan detailnya.

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
