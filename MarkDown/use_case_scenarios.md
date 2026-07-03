# Spesifikasi Skenario Use Case - LifeQ SuperApp (Tele-Consultation Platform)

Dokumen ini berisi spesifikasi skenario tertulis (*Use Case Scenarios*) untuk seluruh Use Case yang teridentifikasi dalam rancangan sistem **LifeQ SuperApp**. Setiap skenario merinci deskripsi, aktor, kondisi prasyarat (*pre-condition*), kondisi akhir (*post-condition*), alur sukses utama (*basic flow*), dan alur alternatif/gagal (*alternative flow*).

> **Catatan UML**: Aktor hanya diisi oleh entitas di luar sistem (*external entities*). Sistem itu sendiri bertindak sebagai batasan sistem (*system boundary*) sehingga tidak dimasukkan sebagai aktor pendukung.

---

## DAFTAR ISI KELOMPOK AKTOR
* [A. Aktor: Pasien (Patient)](#a-aktor-pasien-patient)
* [B. Aktor: Dokter (Doctor)](#b-aktor-dokter-doctor)
* [C. Aktor: Admin (Administrator)](#c-aktor-admin-administrator)

---

## A. Aktor: Pasien (Patient)

### UC-01: Melakukan Registrasi Pasien
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Calon pasien mendaftarkan akun baru agar dapat mengakses layanan kesehatan dalam aplikasi.
* **Pre-condition**: Pasien belum terdaftar dan tidak sedang masuk ke akun lain.
* **Post-condition**: Akun pasien baru berhasil dibuat di database dengan status aktif.
* **Alur Utama (Basic Flow)**:
  1. Pasien membuka halaman pendaftaran akun.
  2. Sistem menampilkan formulir registrasi (Nama Lengkap, Email, Nomor Telepon, dan Kata Sandi).
  3. Pasien mengisi seluruh data wajib dan mengklik tombol "Daftar".
  4. Sistem memvalidasi kelengkapan dan format data yang diinput.
  5. Sistem menyimpan data akun baru di database dengan status aktif.
  6. Sistem menampilkan pesan sukses dan mengarahkan pasien ke halaman Login.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **4a. Email atau Nomor Telepon Sudah Terdaftar**:
    1. Sistem mendeteksi bahwa email atau nomor telepon sudah terdaftar di database.
    2. Sistem menampilkan pesan error: *"Email atau Nomor Telepon sudah digunakan"*.
    3. Sistem meminta pasien memasukkan data yang berbeda.
  * **4b. Format Data Tidak Valid**:
    1. Sistem mendeteksi format email tidak valid atau panjang kata sandi kurang dari 8 karakter.
    2. Sistem menampilkan pesan error validasi yang sesuai.
    3. Pasien memperbaiki input data.

---

### UC-02: Melakukan Login Pasien
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Pasien masuk ke dalam aplikasi menggunakan kredensial akun dan kode verifikasi email (OTP).
* **Pre-condition**: Pasien sudah memiliki akun aktif dan berada di halaman Login.
* **Post-condition**: Pasien berhasil masuk dan mendapatkan token sesi aktif untuk mengakses dasbor utama.
* **Alur Utama (Basic Flow)**:
  1. Pasien memasukkan Email/Nomor Telepon dan Kata Sandi pada halaman Login.
  2. Pasien mengklik tombol "Masuk".
  3. Sistem memverifikasi kecocokan data dengan database.
  4. Sistem mengirimkan kode verifikasi (OTP) ke email Pasien yang terdaftar.
  5. Sistem menampilkan halaman verifikasi OTP.
  6. Pasien memasukkan kode verifikasi (OTP) yang diterima di email.
  7. Sistem memvalidasi kode verifikasi.
  8. Sistem membuat token sesi baru (JWT) untuk menjaga status masuk.
  9. Sistem mengarahkan pasien ke halaman Dasbor Utama Pasien.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Kredensial Salah**:
    1. Sistem mendeteksi email tidak terdaftar atau kata sandi tidak cocok.
    2. Sistem menampilkan pesan error: *"Email atau Kata Sandi salah"*.
    3. Pasien diminta mengisi kembali kredensial.
  * **3b. Akun Diblokir/Ditangguhkan**:
    1. Sistem mendeteksi status akun pasien adalah `SUSPENDED` (karena pelanggaran).
    2. Sistem menampilkan pesan error: *"Akun Anda dinonaktifkan karena melanggar ketentuan. Silakan hubungi Customer Service"*.
    3. Sesi masuk dibatalkan.
  * **7a. Kode Verifikasi (OTP) Salah / Kadaluarsa**:
    1. Sistem mendeteksi kode OTP tidak cocok atau waktu aktif OTP habis.
    2. Sistem menampilkan pesan error: *"Kode verifikasi salah atau sudah kadaluarsa"*.
    3. Pasien diminta mengisi kembali OTP atau mengklik "Kirim Ulang Kode".

---

### UC-03: Memilih Dokter
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Pasien mencari dan memfilter daftar dokter spesialis yang sedang online untuk dikonsultasikan.
* **Pre-condition**: Pasien sudah login dan berada di halaman utama pencarian dokter.
* **Post-condition**: Pasien memilih satu profil dokter spesialis untuk sesi konsultasi.
* **Alur Utama (Basic Flow)**:
  1. Pasien memilih kategori spesialisasi (misal: Dokter Umum, Dokter Spesialis Anak).
  2. Sistem menampilkan daftar dokter yang sesuai dengan filter spesialisasi.
  3. Pasien memfilter daftar berdasarkan status ketersediaan (Hanya menampilkan yang online).
  4. Sistem memperbarui daftar dokter secara real-time.
  5. Pasien mengklik salah satu profil dokter untuk melihat detail tarif dan rating.
  6. Sistem menampilkan detail profil dokter yang dipilih.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Dokter Tidak Ditemukan**:
    1. Sistem mendeteksi tidak ada dokter yang memenuhi kriteria pencarian/spesialisasi.
    2. Sistem menampilkan pesan: *"Dokter tidak ditemukan atau sedang offline"*.
    3. Pasien kembali memilih kategori lain.

---

### UC-04: Melakukan Konsultasi
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Dokter
* **Deskripsi Singkat**: Pasien melakukan konsultasi interaktif via chat real-time dengan dokter setelah proses pembayaran berhasil.
* **Pre-condition**: Pasien sudah memilih dokter (UC-03) dan memiliki sesi aktif yang terverifikasi pembayarannya.
* **Post-condition**: Sesi chat ditutup, dan data konsultasi serta resep disimpan di database.
* **Alur Utama (Basic Flow)**:
  1. Pasien mengklik "Mulai Konsultasi" setelah pembayaran diverifikasi sukses.
  2. Sistem memverifikasi tiket pembayaran (UC-05) dan membuka ruang obrolan (chat room).
  3. Sistem mengirimkan notifikasi ke dasbor Dokter (UC-10) untuk menerima obrolan.
  4. Pasien dan Dokter melangsungkan sesi tanya jawab via chat.
  5. Dokter menutup sesi setelah selesai memberikan diagnosis.
  6. Sistem mengunci ruang obrolan sehingga pesan baru tidak dapat dikirim lagi.
  7. Sistem menyimpan riwayat obrolan dan mengarahkan pasien ke halaman pemberian ulasan (UC-06).
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Tiket Pembayaran Tidak Valid/Belum Dibayar**:
    1. Sistem mendeteksi status transaksi pembayaran untuk tiket konsultasi ini adalah `FAILED` atau `PENDING`.
    2. Sistem membatalkan pembukaan ruang obrolan dan mengarahkan pasien kembali ke halaman pembayaran.
  * **3a. Dokter Tidak Merespon (Timeout)**:
    1. Dokter tidak bergabung ke chat room setelah waktu tunggu berakhir (misal: 5 menit).
    2. Sistem membatalkan sesi konsultasi secara otomatis.
    3. Sistem menginisiasi pengembalian dana (*refund*) transaksi otomatis ke pasien.
    4. Sistem menampilkan pesan permintaan maaf ke pasien.
  * **3b. Pasien Keluar dari Ruang Chat Secara Sepihak**:
    1. Sistem mendeteksi pasien menutup halaman obrolan/aplikasi secara sengaja sebelum dokter mengakhiri sesi.
    2. Sistem mengirimkan pesan konfirmasi pop-up untuk memastikan tindakan pasien.
    3. Pasien mengonfirmasi ingin keluar. Sistem mengunci ruang chat dan mengakhiri sesi.
    4. Sistem menandai status sesi sebagai `COMPLETED` dan menutup transaksi tanpa pengembalian dana (*no refund*).

---

### UC-05: Melakukan Pembayaran
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Payment Gateway
* **Deskripsi Singkat**: Pasien melakukan pembayaran biaya konsultasi menggunakan metode pembayaran digital pilihan mereka (*Include* dari UC-04).
* **Pre-condition**: Pasien telah memilih dokter dan jadwal janji temu konsultasi.
* **Post-condition**: Pembayaran diverifikasi sukses, dan tiket konsultasi aktif diterbitkan.
* **Alur Utama (Basic Flow)**:
  1. Pasien memilih metode pembayaran (E-wallet, Virtual Account, Kartu Kredit) pada halaman checkout.
  2. Sistem mengirimkan data transaksi ke Payment Gateway untuk membuat Snap Token pembayaran.
  3. Payment Gateway mengembalikan token transaksi dan instruksi pembayaran.
  4. Sistem menampilkan instruksi pembayaran kepada Pasien.
  5. Pasien menyelesaikan pembayaran di aplikasi e-wallet atau m-banking miliknya.
  6. Payment Gateway memvalidasi transaksi dan mengirim callback status "Sukses" ke Sistem.
  7. Sistem memperbarui status transaksi menjadi `PAID` dan menerbitkan tiket konsultasi aktif.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **5a. Pembayaran Gagal / Ditolak (Saldo Kurang, dll.)**:
    1. Payment Gateway mendeteksi transaksi gagal dan mengirimkan status callback "Gagal" ke Sistem.
    2. Sistem memperbarui status transaksi menjadi `FAILED` dan menampilkan notifikasi: *"Pembayaran Anda Gagal"*.
    3. Pasien diarahkan kembali ke halaman pemilihan metode pembayaran untuk mencoba lagi.
  * **5b. Batas Waktu Pembayaran Habis (Timeout)**:
    1. Pasien tidak melakukan pembayaran hingga batas waktu (misal: 15 menit) berakhir.
    2. Payment Gateway membatalkan transaksi dan mengirim status callback "Expired".
    3. Sistem memperbarui status transaksi menjadi `EXPIRED` dan membatalkan booking dokter.

---

### UC-06: Memberikan Ulasan dan Rating
* **Aktor Utama**: Pasien
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Pasien memberikan penilaian berupa skor rating bintang dan ulasan teks untuk dokter setelah sesi konsultasi selesai.
* **Pre-condition**: Sesi konsultasi telah ditutup secara resmi (UC-04).
* **Post-condition**: Ulasan tersimpan dan mempengaruhi nilai rata-rata rating dokter di profil publik mereka.
* **Alur Utama (Basic Flow)**:
  1. Sistem menampilkan halaman pemberian ulasan kepada pasien setelah ruang obrolan ditutup.
  2. Pasien memilih skor bintang (1 hingga 5).
  3. Pasien menuliskan ulasan singkat mengenai pengalaman konsultasinya.
  4. Pasien mengklik tombol "Kirim Ulasan".
  5. Sistem menyimpan ulasan ke database dan memperbarui kalkulasi rating rata-rata dokter.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Pasien Melewati Ulasan (Skip)**:
    1. Pasien memilih tombol "Nanti Saja / Skip".
    2. Sistem menutup halaman ulasan dan langsung mengarahkan pasien kembali ke halaman dasbor utama tanpa menyimpan rating.

---

## B. Aktor: Dokter (Doctor)

### UC-07: Melakukan Registrasi Dokter
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Calon dokter mendaftarkan akun baru dan mengunggah berkas STR agar dapat diverifikasi oleh admin.
* **Pre-condition**: Dokter belum terdaftar di sistem.
* **Post-condition**: Akun dokter baru dibuat dengan status `PENDING_VERIFICATION` menunggu persetujuan admin.
* **Alur Utama (Basic Flow)**:
  1. Dokter membuka halaman registrasi khusus dokter.
  2. Sistem menampilkan formulir registrasi (Nama Lengkap, Spesialisasi, Nomor STR, Ijazah, Foto STR, dan Kata Sandi).
  3. Dokter mengisi formulir, mengunggah file foto dokumen STR, dan mengklik "Kirim Pendaftaran".
  4. Sistem memvalidasi kelengkapan data dan format file yang diunggah.
  5. Sistem menyimpan data ke database dengan status akun `PENDING_VERIFICATION`.
  6. Sistem mengirimkan notifikasi tugas baru ke dasbor Admin (UC-13) dan menampilkan pesan sukses pengunggahan kepada dokter.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Berkas Kredensial Wajib Kosong**:
    1. Dokter tidak mengunggah file STR atau ijazah.
    2. Sistem mendeteksi ketiadaan file wajib dan membatalkan pengiriman data.
    3. Sistem menampilkan error: *"Dokumen STR dan Ijazah wajib diunggah"*.
  * **3b. Format File Tidak Didukung**:
    1. Dokter mengunggah file berformat selain PDF atau JPG/PNG (misal: .zip).
    2. Sistem menampilkan error: *"Format file tidak didukung. Harap unggah PDF, JPG, atau PNG"*.

---

### UC-08: Melakukan Login Dokter
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Dokter masuk ke dasbor profesional menggunakan kredensial akun dan verifikasi email (OTP).
* **Pre-condition**: Akun dokter sudah aktif dan telah diverifikasi oleh admin.
* **Post-condition**: Dokter masuk ke dasbor dokter dan siap menerima chat pasien.
* **Alur Utama (Basic Flow)**:
  1. Dokter memasukkan Email/Nomor STR dan Kata Sandi pada halaman Login Dokter.
  2. Dokter mengklik tombol "Masuk".
  3. Sistem mencocokkan kredensial di database dokter.
  4. Sistem mengirimkan kode verifikasi (OTP) ke email Dokter yang terdaftar.
  5. Sistem menampilkan halaman verifikasi OTP.
  6. Dokter memasukkan kode verifikasi (OTP) yang diterima di email.
  7. Sistem memvalidasi kode verifikasi.
  8. Sistem membuat token sesi aktif dan mengarahkan dokter ke halaman Dasbor Profesional Dokter.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Akun Belum Diverifikasi Admin**:
    1. Sistem mendeteksi kredensial benar, tetapi status verifikasi akun masih `PENDING_VERIFICATION`.
    2. Sesi masuk ditolak.
    3. Sistem menampilkan pesan: *"Akun Anda masih dalam proses verifikasi oleh Admin. Harap tunggu"*.
  * **3b. Akun Ditolak oleh Admin**:
    1. Sistem mendeteksi status verifikasi akun dokter adalah `REJECTED`.
    2. Sistem menampilkan pesan error dan detail alasan penolakan berkas dari admin.
    3. Sistem mengarahkan dokter kembali ke formulir pendaftaran untuk mengoreksi berkas.
  * **7a. Kode Verifikasi (OTP) Salah / Kadaluarsa**:
    1. Sistem mendeteksi kode OTP tidak cocok atau waktu aktif OTP habis.
    2. Sistem menampilkan pesan error: *"Kode verifikasi salah atau sudah kadaluarsa"*.
    3. Dokter diminta mengisi kembali OTP atau mengklik "Kirim Ulang Kode".

---

### UC-09: Mengonfirmasi Status Ketersediaan (on/off)
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Dokter mengubah status ketersediaan mereka menjadi online atau offline agar sistem dapat menampilkan ketersediaan mereka kepada pasien.
* **Pre-condition**: Dokter sudah login dan berada di dasbor utama dokter.
* **Post-condition**: Status ketersediaan dokter di database diperbarui secara instan.
* **Alur Utama (Basic Flow)**:
  1. Dokter membuka dasbor dokter dan melihat toggle status "Online / Siap Melayani".
  2. Dokter mengubah toggle tersebut menjadi aktif (Online).
  3. Sistem memproses permintaan perubahan status ketersediaan.
  4. Sistem memperbarui status dokter menjadi `ONLINE` di database dan menampilkan status hijau aktif.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Dokter Menonaktifkan Status (Offline)**:
    1. Dokter menggeser toggle status ketersediaan menjadi tidak aktif.
    2. Sistem mengubah status dokter menjadi `OFFLINE` di database.
    3. Profil dokter tidak akan muncul dalam filter pencarian dokter online pasien.

---

### UC-10: Melayani Konsultasi
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Pasien
* **Deskripsi Singkat**: Dokter menerima tiket konsultasi pasien dan memberikan respons dalam ruang obrolan chat real-time.
* **Pre-condition**: Dokter dalam status online (UC-09) dan ada pasien yang mengajukan sesi konsultasi aktif (UC-04).
* **Post-condition**: Dokter menyelesaikan sesi obrolan chat dan membuat catatan medis.
* **Alur Utama (Basic Flow)**:
  1. Sistem memunculkan pop-up permintaan konsultasi masuk ke dasbor Dokter.
  2. Dokter mengklik tombol "Terima Permintaan".
  3. Sistem menghubungkan Dokter ke ruang obrolan (chat room) yang aktif dengan Pasien.
  4. Dokter membaca keluhan pasien dan merespons dengan memberikan diagnosis serta arahan medis via chat.
  5. Setelah diagnosis selesai, Dokter menulis catatan medis dan resep obat (UC-11).
  6. Dokter mengklik tombol "Selesaikan Konsultasi".
  7. Sistem menutup dan mengunci ruang obrolan chat.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **2a. Dokter Menolak Permintaan Konsultasi**:
    1. Dokter memilih tombol "Tolak / Sibuk".
    2. Sistem mengembalikan tiket pasien ke antrean pencarian dokter online lainnya.
    3. Sesi konsultasi pada dokter bersangkutan dibatalkan.

---

### UC-11: Membuat Catatan Medis
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Dokter menuliskan diagnosis singkat dan kesimpulan medis pasien di rekam medis elektronik setelah sesi chat selesai.
* **Pre-condition**: Dokter berada dalam sesi konsultasi aktif (UC-10).
* **Post-condition**: Data rekam medis disimpan secara permanen di database dan dapat diakses kembali oleh Pasien.
* **Alur Utama (Basic Flow)**:
  1. Dokter mengklik opsi "Buat Catatan Medis" di panel konsultasi.
  2. Sistem menampilkan formulir Rekam Medis (Gejala, Diagnosis, Rekomendasi Tindak Lanjut, dan Instruksi Resep).
  3. Dokter mengisi detail diagnosis medis dan instruksi pengobatan pasien.
  4. Dokter memilih untuk menambahkan resep obat (*Extend* ke UC-12).
  5. Dokter menyimpan catatan medis tersebut.
  6. Sistem menyimpan data rekam medis pasien di database dengan status terkunci.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Pengisian Formulir Tidak Lengkap**:
    1. Dokter mengklik simpan namun kolom wajib seperti "Diagnosis" belum terisi.
    2. Sistem membatalkan proses penyimpanan dan memunculkan notifikasi: *"Kolom Diagnosis wajib diisi sebelum menyimpan catatan medis"*.

---

### UC-12: Membuat Resep Digital
* **Aktor Utama**: Dokter
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Dokter meracik resep obat digital dengan memilih obat dari katalog obat resmi yang disediakan sistem (*Extend dari* UC-11).
* **Pre-condition**: Dokter sedang mengisi formulir catatan medis (UC-11) dan mendiagnosis penyakit yang memerlukan terapi obat.
* **Post-condition**: Resep digital terbit dan terlampir pada riwayat rekam medis pasien.
* **Alur Utama (Basic Flow)**:
  1. Dokter mengklik tombol "Tambah Obat" pada formulir catatan medis.
  2. Sistem menampilkan kolom pencarian obat yang terhubung dengan katalog obat sistem.
  3. Dokter mengetik nama obat, memilih obat dari katalog, menentukan dosis (misal: 3x1 sehari), dan jumlah obat (misal: 10 tablet).
  4. Dokter mengklik "Simpan Resep".
  5. Sistem melampirkan data resep obat ke catatan medis pasien yang bersangkutan.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Stok Obat Kosong / Tidak Tersedia**:
    1. Dokter mencari obat namun sistem mendeteksi obat tersebut tidak ada dalam katalog obat aktif.
    2. Sistem menampilkan pesan: *"Obat tidak ditemukan dalam katalog"*.
    3. Dokter memilih opsi obat alternatif dari katalog lain atau menuliskan resep manual secara teks bebas.

---

## C. Aktor: Admin (Administrator)

### UC-13: Memverifikasi Berkas Dokter
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin meninjau dokumen STR dan ijazah dokter baru untuk menyetujui atau menolak pendaftaran mereka.
* **Pre-condition**: Ada pendaftaran dokter baru dengan status `PENDING_VERIFICATION` (UC-07).
* **Post-condition**: Status verifikasi dokter berubah menjadi aktif (`ACTIVE`) atau ditolak (`REJECTED`) di database.
* **Alur Utama (Basic Flow)**:
  1. Admin membuka menu "Verifikasi Dokter" di panel dashboard admin.
  2. Sistem menampilkan daftar dokter baru beserta berkas STR yang telah diunggah.
  3. Admin membuka detail berkas dan melakukan pengecekan keabsahan STR dokter ke database eksternal KKI (Konsil Kedokteran Indonesia) secara manual.
  4. Berkas dinyatakan sah dan valid. Admin mengklik tombol "Setujui / Approve".
  5. Sistem mengubah status akun dokter menjadi `ACTIVE` dan mengirimkan email pemberitahuan sukses pendaftaran.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **4a. Berkas Tidak Valid / STR Palsu**:
    1. Admin mendeteksi berkas STR tidak valid, kedaluwarsa, atau tidak cocok dengan data KKI.
    2. Admin mengklik tombol "Tolak / Reject".
    3. Sistem menampilkan kolom pengisian alasan penolakan berkas.
    4. Admin mengisi alasan penolakan (misal: *"File STR tidak terbaca / buram"*).
    5. Sistem mengubah status verifikasi dokter menjadi `REJECTED` dan mengirimkan email penolakan berkas beserta alasan detailnya.

---

### UC-14: Mengelola Data Akun Pasien
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin menangguhkan (suspend) akun pasien yang terbukti melanggar aturan platform.
* **Pre-condition**: Admin telah login dan berada di dasbor manajemen akun admin.
* **Post-condition**: Akun pasien yang melanggar ditangguhkan dan tidak bisa melakukan login.
* **Alur Utama (Basic Flow)**:
  1. Admin memilih menu Kelola Akun Pasien.
  2. Sistem menampilkan daftar data akun pasien secara keseluruhan.
  3. Admin memeriksa data akun. Jika perlu tindakan penangguhan (Suspend) karena adanya laporan pelanggaran, maka lanjut ke langkah 4. Jika tidak perlu, alur selesai (Sistem tetap menampilkan halaman daftar akun).
  4. Admin memilih akun pasien yang melanggar dan mengklik tombol "Suspend/Tangguhkan".
  5. Sistem meminta konfirmasi penangguhan akun pasien.
  6. Admin mengonfirmasi tindakan tersebut.
  7. Sistem memperbarui status akun pasien menjadi `SUSPENDED` di database, mematikan token sesi aktif pasien tersebut, dan menampilkan notifikasi sukses.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Mengaktifkan Kembali Akun Pasien (Unsuspend)**:
    1. Admin meninjau banding dari pasien dan memutuskan memulihkan akun.
    2. Admin mencari akun pasien tersuspend dan mengklik tombol "Aktifkan Kembali".
    3. Sistem memperbarui status akun pasien kembali menjadi `ACTIVE` di database dan menampilkan notifikasi sukses.

---

### UC-15: Mengelola Data Akun Dokter
* **Aktor Utama**: Admin
* **Aktor Pendukung**: Tidak ada
* **Deskripsi Singkat**: Admin menangguhkan (suspend) akun dokter yang terbukti melanggar kode etik atau kebijakan platform.
* **Pre-condition**: Admin telah login dan berada di dasbor manajemen akun admin.
* **Post-condition**: Akun dokter yang melanggar ditangguhkan dan tidak muncul di filter pencarian dokter.
* **Alur Utama (Basic Flow)**:
  1. Admin memilih menu Kelola Akun Dokter.
  2. Sistem menampilkan daftar data akun dokter secara keseluruhan.
  3. Admin memeriksa data akun. Jika perlu tindakan penangguhan (Suspend) karena adanya laporan pelanggaran, maka lanjut ke langkah 4. Jika tidak perlu, alur selesai (Sistem tetap menampilkan halaman daftar akun).
  4. Admin memilih akun dokter yang melanggar dan mengklik tombol "Suspend/Tangguhkan".
  5. Sistem meminta konfirmasi penangguhan akun dokter.
  6. Admin mengonfirmasi tindakan tersebut.
  7. Sistem memperbarui status akun dokter menjadi `SUSPENDED` di database, menonaktifkan profil dokter dari filter pencarian, dan menampilkan notifikasi sukses.
* **Alur Alternatif/Gagal (Alternative Flow)**:
  * **3a. Mengaktifkan Kembali Akun Dokter (Unsuspend)**:
    1. Admin meninjau klarifikasi dari dokter dan memutuskan memulihkan akun.
    2. Admin mencari akun dokter tersuspend dan mengklik tombol "Aktifkan Kembali".
    3. Sistem memperbarui status akun dokter kembali menjadi `ACTIVE` di database dan menampilkan notifikasi sukses.

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
