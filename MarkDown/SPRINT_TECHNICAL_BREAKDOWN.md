# Sprint Technical Breakdown — Arsitektur 100% Siloed (Justifiqa & Qualifa)

**Versi**: 2.0 (Refactored untuk Opsi B - Standalone Apps Tanpa Medis)  
**Tanggal**: 03 Juli 2026  
**Cakupan**: 34 User Stories (17 Story Justifiqa + 17 Story Qualifa)

Dokumen ini memecah seluruh *User Story* menjadi tugas teknis (*Engineering Tasks*) untuk tim **Backend (BE)**, **Frontend (FE)**, dan **Quality Assurance (QA)** pada dua aplikasi mandiri yang terisolasi total. Seluruh tugas rekayasa medis (seperti *Drug-Drug Interaction Checker*, e-Resep, integrasi Apotek SIA, dan SOAP Note) telah dibersihkan.

---

## BAGIAN I: SPRINT TECHNICAL BREAKDOWN — APLIKASI MANDIRI JUSTIFIQA (DOMAIN HUKUM)

### Sprint J-1: Core System & Authentication Justifiqa (ST-J-01 s/d ST-J-06)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-J-01** | J-UC01 | **BE** | Buat endpoint POST `/api/v1/auth/client/register` pada layanan Justifiqa. Integrasikan middleware validasi NIK real-time ke API Dukcapil. Implementasikan enkripsi field-level AES-256 untuk NIK dan simpan hash persetujuan (*informed consent*) di tabel `client_consents`. | 16 | Endpoint Registrasi & Integrasi Dukcapil |
| | | **FE** | Buat antarmuka formulir registrasi Klien Hukum dengan validasi regex NIK 16 digit dan kotak centang persetujuan UU PDP. | 12 | UI Registrasi Klien Justifiqa |
| | | **QA** | Buat skrip automated test API menggunakan NIK valid, NIK duplikat, dan NIK tidak terdaftar (mock Dukcapil). | 8 | Automated Specs Registrasi Klien |
| **ST-J-02** | J-UC02 | **BE** | Buat endpoint POST `/api/v1/auth/login` dengan penerbitan token JWT ber-Cookie HttpOnly & TLS 1.3. Implementasikan pengecekan tabel `suspended_users`; jika berstatus suspend *Due Process*, tolak login dengan kode HTTP 403. | 14 | Auth Engine & Due Process Lock |
| | | **FE** | Buat halaman Login Justifiqa dengan input OTP 6 digit dan modal pop-up pemberitahuan hak banding 14 hari bagi akun yang di-suspend. | 10 | UI Login & Modal Banding |
| **ST-J-03** | J-UC07 | **BE** | Buat endpoint POST `/api/v1/auth/advokat/register`. Implementasikan modul upload dokumen kredensial (Kartu Peradi, SIPP) ke WORM storage berenkripsi AES-256. Buat validasi anti-duplikasi nomor SIPP/Peradi. | 16 | Endpoint Registrasi Advokat & WORM Upload |
| | | **FE** | Buat antarmuka pendaftaran Advokat/Notaris dengan *drag-and-drop* berkas SIPP/Peradi beresolusi tinggi dan *progress bar*. | 14 | UI Registrasi Advokat |
| **ST-J-04** | J-UC08 | **BE** | Implementasikan modul MFA wajib menggunakan TOTP (Google Authenticator / RFC 6238) atau SMS OTP pada login Advokat. Buat *redis rate-limiter* mengunci akun 30 menit jika gagal MFA 3x. | 16 | MFA TOTP Engine & Lockout Timer |
| | | **FE** | Buat layar verifikasi MFA 2-Langkah untuk dasbor Advokat dengan indikator hitung mundur waktu kunci. | 10 | UI MFA Verifier Advokat |
| **ST-J-05** | J-UC03 | **BE** | Buat endpoint GET `/api/v1/advokat/catalog` dengan fitur filter spesialisasi (Pidana, Perdata, Bisnis), tarif, dan status online. Sembunyikan otomatis advokat yang masa berlaku SIPP-nya habis atau berstatus suspend. | 14 | Katalog Advokat & Filter Engine |
| | | **FE** | Buat halaman direktori advokat dengan kartu profil profesional, *badge* verifikasi Peradi, dan filter dinamis. | 14 | UI Katalog & Filter Advokat |
| **ST-J-06** | J-UC09 | **BE** | Buat endpoint PATCH `/api/v1/advokat/availability` untuk *toggle* status online/offline. Validasi jadwal agar tidak bentrok dengan sesi hukum yang sedang berlangsung. | 10 | Availability Engine Justifiqa |
| | | **FE** | Buat *switch toggle* status ketersediaan di navbar dasbor Advokat yang memperbarui status secara real-time via WebSockets. | 8 | UI Toggle Status Advokat |

---

### Sprint J-2: Communication & Escrow Payment Engine (ST-J-07 s/d ST-J-10)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-J-07** | J-UC05 | **BE** | Buat modul integrasi *Payment Gateway* (Midtrans/Xendit) dengan metode Virtual Account & E-Wallet untuk rekening **Escrow Justifiqa**. Buat timer kedaluwarsa 15 menit dan verifikasi webhook callback SHA-256. | 20 | Escrow Payment Gateway Engine |
| | | **FE** | Buat halaman *checkout* pembayaran konsultasi hukum dengan rincian biaya, nomor VA, dan hitung mundur timer 15 menit. | 12 | UI Checkout Pembayaran Hukum |
| **ST-J-08** | J-UC04 | **BE** | Bangun infrastruktur *Chat Room WebSocket* terenkripsi E2EE (*Zero-Knowledge*). Buat *daemon background task* yang memonitor durasi sesi; saat timer menyentuh 00:00, putuskan koneksi input pesan dan ubah status sesi menjadi `COMPLETED` di database WORM. | 24 | E2EE WebSocket Chat & Timer Lock |
| | | **FE** | Buat antarmuka ruang obrolan hukum dengan *watermark* permanen *"PRIVILEGED AND CONFIDENTIAL"*, timer hitung mundur sesi, dan visualisasi penguncian input saat sesi berakhir. | 18 | UI Chat Hukum & Watermark Privilege |
| **ST-J-09** | J-UC10 | **BE** | Implementasikan *SLA Monitoring Daemon*. Jika advokat tidak memasuki ruang chat dalam 5 menit pasca-pembayaran, piku protokol *Auto-Refund* 100% ke rekening klien atau alihkan antrean ke advokat lain. | 16 | SLA Monitor & Auto-Refund Engine |
| | | **QA** | Uji simulasi advokat tidak respons selama 301 detik, verifikasi sistem memicu *Auto-Refund* dan notifikasi SMS ke klien. | 10 | Automated Specs SLA Refund |
| **ST-J-10** | J-UC13 | **BE** | Buat endpoint upload berkas perkara `/api/v1/chat/evidence/upload`. Implementasikan enkripsi *client-side* E2EE sebelum dikirim ke server. Sematkan metadata stempel *"PRIVILEGED LEGAL EVIDENCE"*. | 18 | E2EE Evidence Upload & Metadata Stamp |
| | | **FE** | Buat komponen *file uploader* di dalam chat hukum dengan pemindaian tipe berkas (PDF/JPG, max 15 MB) dan indikator enkripsi *Zero-Knowledge*. | 12 | UI Evidence Uploader |

---

### Sprint J-3: Domain-Specific Legal & Pro Bono Module (ST-J-11 s/d ST-J-13)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-J-11** | J-UC11 | **BE** | Buat endpoint POST `/api/v1/advokat/notes/irac`. Implementasikan penyimpanan terenkripsi AES-256 untuk struktur catatan IRAC (Issue, Rule, Application, Conclusion) ke dalam WORM storage dengan retensi 10 tahun. | 16 | IRAC Note Engine & WORM Storage |
| | | **FE** | Buat formulir catatan hukum interaktif dengan 4 tab terstruktur (Issue, Rule, Application, Conclusion) dan opsi *share to client*. | 14 | UI Formulir IRAC Note |
| **ST-J-12** | J-UC12,<br>J-UC14 | **BE** | Bangun *Legal Template Drafting Engine* untuk merender dokumen *Legal Opinion* / Draf Kontrak. Integrasikan API Perum Peruri untuk pembubuhan e-Meterai Rp10.000 bersertifikat SHA-256. Implementasikan *Download Gate* (klien baru bisa unduh setelah pembubuhan meterai sukses). | 28 | e-Meterai Peruri Engine & Download Gate |
| | | **FE** | Buat editor draf hukum dengan fitur *preview PDF*, tombol *request e-Meterai*, dan indikator pembubuhan meterai elektronik. | 18 | UI Editor Legal Opinion & e-Meterai |
| | | **QA** | Uji end-to-end pembuatan Legal Opinion, pembubuhan e-Meterai di sandbox Peruri, dan verifikasi hash SHA-256 pada dokumen final. | 12 | Automated Specs e-Meterai Peruri |
| **ST-J-13** | J-UC15 | **BE** | Buat endpoint POST `/api/v1/probono/apply` dengan upload foto SKTM. Integrasikan pengecekan NIK dan nomor SKTM ke API Dinsos/DTKS Kemensos. Buat logika penghitungan kuota advokat pro bono (maksimal 3 kasus/bulan) dan penerbitan tiket Rp0. | 20 | Pro Bono Verification & Quota Engine |
| | | **FE** | Buat halaman pengajuan Pro Bono bagi masyarakat tidak mampu dengan panduan foto SKTM dan indikator sisa kuota advokat. | 12 | UI Pengajuan Pro Bono SKTM |

---

### Sprint J-4: Legal Admin & Governance Module (ST-J-14 s/d ST-J-17)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-J-14** | J-UC06 | **BE** | Buat endpoint POST `/api/v1/advokat/reviews`. Implementasikan fungsi *auto-anonymize* yang secara mutlak menyamarkan nama klien hukum (misal: `Klien Huk-9912`) pada *query* tampilan ulasan publik. | 12 | Review API & Auto-Anonymization |
| | | **FE** | Buat modal pop-up Rating & Review (1-5 Bintang + Ulasan) yang muncul secara *blocking* saat sesi chat ditutup. | 10 | UI Blocking Modal Rating Hukum |
| **ST-J-15** | J-UC16 | **BE** | Buat modul Admin Verification `/api/v1/admin/verify/advokat` dan `/sktm`. Integrasikan tombol *cross-check API* ke database Mahkamah Agung (SIPP) dan Peradi. Simpan setiap log keputusan (Approve/Reject) ke WORM storage. | 18 | Admin Verifier Engine & API Cross-Check |
| | | **FE** | Buat dasbor Admin Legal dengan tab verifikasi antrean Advokat dan tab SKTM Klien dilengkapi *document viewer* bersisian. | 16 | UI Dasbor Verifikasi Admin Legal |
| **ST-J-16** | J-UC17 | **BE** | Bangun modul *Due Process of Law* untuk moderasi etik. Buat sistem peringatan bertingkat (Warning 1, 2, 3) dan fungsi pemotongan akses akun (*suspend*) yang menerbitkan surat resmi ber-hash SHA-256 dengan *timer appeal window* 14 hari kerja. | 20 | Due Process Suspend & Appeal Engine |
| | | **FE** | Buat panel manajemen sanggah/banding di Dasbor Admin dan halaman form banding pengajuan bukti bagi akun yang di-suspend. | 14 | UI Panel Moderasi & Banding Hukum |
| **ST-J-17** | J-UC18,<br>J-UC19 | **BE** | Bangun *Financial Escrow & Tax Engine* Justifiqa. Kalkulasi otomatis bagi hasil (25% Platform / 75% Advokat). Implementasikan rumus pemotongan pajak PPh 21 otomatis atas jasa profesi advokat sesuai aturan Dirjen Pajak. Buat validasi pencocokan nama rekening bank dengan nama di Kartu Peradi/SIPP (anti pencucian uang). Implementasikan *two-person approval* untuk pencairan ≥ Rp 10.000.000. | 28 | Escrow PPh 21 Tax Engine & AML Verifier |
| | | **FE** | Buat halaman Manajemen Keuangan Advokat dengan rincian saldo escrow, bukti potong PPh 21 digital, dan tombol penarikan dana. | 16 | UI Manajemen Finansial & Pajak Advokat |

---

## BAGIAN II: SPRINT TECHNICAL BREAKDOWN — APLIKASI MANDIRI QUALIFA (DOMAIN PSIKOLOGI)

### Sprint Q-1: Core System & Authentication Qualifa (ST-Q-01 s/d ST-Q-06)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-Q-01** | Q-UC01 | **BE** | Buat endpoint POST `/api/v1/auth/client/register` pada layanan Qualifa. Implementasikan kewajiban pengisian profil kontak darurat (*emergency contact wali*) dan enkripsi field-level AES-256 untuk data medis. Simpan hash *informed consent* di tabel `qualifa_consents`. | 16 | Endpoint Registrasi Klien & Emergency Contact |
| | | **FE** | Buat antarmuka formulir registrasi Klien Psikologi dengan form kontak darurat wali dan kotak centang persetujuan kerahasiaan klinis. | 12 | UI Registrasi Klien Qualifa |
| **ST-Q-02** | Q-UC02 | **BE** | Buat endpoint POST `/api/v1/auth/login` dengan penerbitan token JWT ber-Cookie HttpOnly & TLS 1.3. Implementasikan pengecekan tabel `suspended_users`; jika berstatus suspend oleh Komite Etik Qualifa, tolak login dengan kode HTTP 403. | 14 | Auth Engine & Ethics Lock |
| | | **FE** | Buat halaman Login Qualifa dengan input OTP 6 digit dan modal pop-up informasi sekretariat etik bagi akun yang di-suspend. | 10 | UI Login & Modal Etik Qualifa |
| **ST-Q-03** | Q-UC07 | **BE** | Buat endpoint POST `/api/v1/auth/psikolog/register`. Implementasikan modul upload dokumen kredensial (STR Klinis, Kartu HIMPSI) ke WORM storage berenkripsi AES-256. Buat validasi anti-duplikasi nomor STR/HIMPSI. | 16 | Endpoint Registrasi Psikolog & WORM Upload |
| | | **FE** | Buat antarmuka pendaftaran Psikolog Klinis dengan *drag-and-drop* berkas STR/HIMPSI beresolusi tinggi dan *progress bar*. | 14 | UI Registrasi Psikolog |
| **ST-Q-04** | Q-UC08 | **BE** | Implementasikan modul MFA wajib menggunakan TOTP (Google Authenticator / RFC 6238) atau SMS OTP pada login Psikolog Klinis. Buat *redis rate-limiter* mengunci akun 30 menit jika gagal MFA 3x. | 16 | MFA TOTP Engine & Lockout Timer |
| | | **FE** | Buat layar verifikasi MFA 2-Langkah untuk dasbor Psikolog dengan indikator hitung mundur waktu kunci. | 10 | UI MFA Verifier Psikolog |
| **ST-Q-05** | Q-UC03 | **BE** | Buat endpoint GET `/api/v1/psikolog/catalog` dengan fitur filter keahlian (Kecemasan, Depresi, Trauma, Relasi) dan tarif. Sembunyikan otomatis psikolog yang masa berlaku STR Klinis-nya habis atau dalam masa investigasi etik. | 14 | Katalog Psikolog & Filter Engine |
| | | **FE** | Buat halaman direktori psikolog klinis dengan kartu profil profesional, *badge* verifikasi HIMPSI, dan filter spesialisasi emosi. | 14 | UI Katalog & Filter Psikolog |
| **ST-Q-06** | Q-UC09 | **BE** | Bangun **Buffer Rule 30 Menit Engine** pada modul jadwal praktisi Qualifa. Saat psikolog mengonfirmasi atau menyelesaikan sesi konseling klinis, sistem secara mutlak mengunci slot waktu 30 menit berikutnya sebagai *mandatory resting buffer* dan menolak reservasi baru pada jeda waktu tersebut. | 18 | Mandatory Buffer Rule 30 Mnt Engine |
| | | **FE** | Buat tampilan manajemen jadwal di dasbor Psikolog dengan blok warna khusus (*grayed-out buffer zone*) selama 30 menit pasca-sesi konseling. | 12 | UI Jadwal & Buffer Zone Psikolog |
| | | **QA** | Uji coba pemesanan sesi berurutan pada psikolog yang sama, verifikasi bahwa sistem menolak slot dalam jeda < 30 menit dari sesi sebelumnya. | 10 | Automated Specs Buffer Rule 30 Mnt |

---

### Sprint Q-2: Counseling & Payment Engine (ST-Q-07 s/d ST-Q-09)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-Q-07** | Q-UC05 | **BE** | Buat modul integrasi *Payment Gateway* (Midtrans/Xendit) dengan metode QRIS & Virtual Account untuk rekening **Penampungan Qualifa**. Buat timer kedaluwarsa 15 menit dan verifikasi webhook callback SHA-256. | 20 | Counseling Payment Gateway Engine |
| | | **FE** | Buat halaman *checkout* pembayaran konseling psikologi dengan rincian tarif, QRIS dinamis, dan hitung mundur timer 15 menit. | 12 | UI Checkout Pembayaran Qualifa |
| **ST-Q-08** | Q-UC04 | **BE** | Bangun infrastruktur *Virtual Therapy Room* (Chat & Audio/Video WebRTC signaling) terenkripsi E2EE. Buat *daemon background task* yang memonitor durasi terapi; saat timer menyentuh 00:00, otomatis akhiri panggilan, tutup ruang chat, dan ubah status sesi menjadi `COMPLETED` di database WORM. | 26 | E2EE Therapy Room & Timer Auto-Close |
| | | **FE** | Buat antarmuka ruang terapi virtual dengan *watermark* kerahasiaan klinis, timer hitung mundur sesi, dan kontrol panggilan WebRTC. | 18 | UI Ruang Terapi Virtual E2EE |
| **ST-Q-09** | Q-UC10 | **BE** | Implementasikan *SLA Monitoring Daemon* Qualifa. Jika psikolog klinis tidak memasuki ruang terapi virtual dalam 5 menit pasca-jadwal dimulai, piku protokol *Auto-Refund* 100% ke rekening klien atau tawarkan penjadwalan ulang gratis. | 16 | SLA Monitor & Auto-Refund Qualifa |
| | | **QA** | Uji simulasi psikolog terlambat > 300 detik, verifikasi sistem memicu *Auto-Refund* dan pengiriman pengingat darurat. | 10 | Automated Specs SLA Refund Qualifa |

---

### Sprint Q-3: Psychology Wellness & Clinical Assessment (ST-Q-10 s/d ST-Q-13)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-Q-10** | Q-UC13 | **BE** | Buat endpoint POST `/api/v1/wellness/mood-tracker`. Implementasikan enkripsi *Zero-Knowledge* untuk catatan jurnal emosi. Bangun **Proactive Wellness Engine**: analisa tren log 5 hari terakhir; jika terdeteksi skor emosi sedih/cemas ekstrem selama 5 hari beruntun, trigger status alert `PROACTIVE_ALERT` di database klien. | 22 | Mood Tracker ZK & Proactive Alert Engine |
| | | **FE** | Buat antarmuka Jurnal Mood Tracker interaktif dengan pilihan emotikon emosi harian dan komponen *Proactive Wellness Banner* yang menawarkan psikoedukasi/diskon konseling saat alert aktif. | 16 | UI Mood Tracker & Proactive Banner |
| **ST-Q-11** | Q-UC14 | **BE** | Buat modul Audio Relaksasi `/api/v1/wellness/audio/stream`. Integrasikan *Adaptive Bitrate Streaming CDN* yang otomatis menurunkan kualitas stream dari 320 kbps ke 128 kbps saat koneksi internet klien lambat. Catat waktu relaksasi di profil klien. | 18 | Adaptive Audio Streaming & CDN Engine |
| | | **FE** | Buat pemutar musik audio meditasi interaktif (*mindfulness player*) dengan kontrol pemutaran, latar belakang menenangkan, dan daftar putar kurasi HIMPSI. | 14 | UI Mindfulness Audio Player |
| **ST-Q-12** | Q-UC15 | **BE** | Bangun modul Asesmen Psikometri Klinis `/api/v1/assessment/dass21`. Implementasikan algoritma kalkulasi skor Depression, Anxiety, dan Stress. **MANDATORY CRISIS PROTOCOL ENGINE**: jika skor akhir masuk kategori **SEVERE / EXTREME (Risk of Self-Harm)**, sistem secara mutlak menembakkan alarm krisis real-time via WebSocket ke dasbor Supervisor, mengirim SMS darurat ke kontak wali klien, dan menandai akun klien dengan *flag `CRISIS_119_ACTIVE`*. | 28 | DASS-21 Scoring & Mandatory Crisis 119 Engine |
| | | **FE** | Buat kuesioner DASS-21 interaktif. **BLOCKING CRISIS POP-UP UI**: jika menerima respons *flag `CRISIS_119_ACTIVE`*, layar **wajib memunculkan modal pop-up merah Hotline Krisis 119 yang menutupi seluruh layar (*blocking*), menonaktifkan tombol close selama 10 detik hitung mundur**, dan menyediakan tombol panggilan darurat langsung. | 20 | UI DASS-21 & Blocking Crisis 119 Modal |
| | | **QA** | Inject payload jawaban DASS-21 dengan skor depresi ekstrem (> 28), verifikasi bahwa modal merah 119 mengunci layar FE selama 10 detik dan SMS darurat terkirim ke kontak wali. | 14 | Automated Specs Mandatory Crisis 119 |
| **ST-Q-13** | Q-UC11,<br>Q-UC12 | **BE** | Buat endpoint POST `/api/v1/psikolog/notes/dap` untuk penyimpanan DAP Note (Data, Assessment, Plan) berenkripsi AES-256 di WORM storage dengan retensi 20 tahun (sesuai Kode Etik). Buat endpoint generator *Worksheet CCBT* `/api/v1/psikolog/worksheet/assign` yang menugaskan lembar kerja terapi interaktif ke dasbor klien dan mengaitkannya dengan grafik *Mood Tracker*. | 24 | DAP Note Engine & CCBT Worksheet Assign |
| | | **FE** | Buat formulir klinis DAP Note 3 kolom di dasbor Psikolog dan antarmuka pengerjaan *Worksheet CCBT* interaktif di aplikasi Klien yang menampilkan pemantauan tren emosi bersisian. | 18 | UI DAP Note & CCBT Interactive Worksheet |

---

### Sprint Q-4: Ethics Admin & Financial Module (ST-Q-14 s/d ST-Q-17)
| Story ID | Use Case Ref | Role | Deskripsi Tugas Teknis (Engineering Task) | Estimasi Jam | Deliverable Kunci |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **ST-Q-14** | Q-UC06 | **BE** | Buat endpoint POST `/api/v1/psikolog/reviews`. Jika review untuk psikolog klinis berating ≤ 2 bintang, sistem otomatis memicu tiket investigasi `CLINICAL_EVALUATION` di tabel `ethics_alerts` untuk diperiksa oleh Komite Etik Qualifa. | 14 | Review API & Clinical Ethics Trigger |
| | | **FE** | Buat modal pop-up Rating & Review (1-5 Bintang + Ulasan Klinis) yang muncul secara *blocking* saat sesi konseling ditutup. | 10 | UI Blocking Modal Rating Psikologi |
| **ST-Q-15** | Q-UC16 | **BE** | Buat modul Admin Verification `/api/v1/admin/verify/psikolog`. Integrasikan pencocokan nomor STR Klinis ke database HIMPSI / Kemenkes secara automated/semi-automated. Simpan log persetujuan ke WORM storage. | 18 | Admin Verifier Engine HIMPSI & WORM Log |
| | | **FE** | Buat dasbor Admin Etik Qualifa dengan antarmuka verifikasi antrean berkas STR Klinis dan Kartu HIMPSI psikolog baru. | 14 | UI Dasbor Verifikasi Admin Etik |
| **ST-Q-16** | Q-UC17 | **BE** | Bangun modul **Komite Etik Psikologi**. Buat alur penanganan pelanggaran kode etik HIMPSI yang memfasilitasi penjadwalan *Hearing Etik Virtual*, pembekuan akun (*suspend*), dan penerbitan laporan investigasi ber-hash SHA-256 ke sekretariat HIMPSI Pusat. | 22 | Ethics Committee Flow & Suspend Engine |
| | | **FE** | Buat panel manajemen Komite Etik di Dasbor Admin dan antarmuka undangan sidang etik virtual bagi psikolog terlapor. | 16 | UI Panel Komite Etik & Sidang Virtual |
| **ST-Q-17** | Q-UC18,<br>Q-UC19 | **BE** | Bangun *Financial & Tax Engine* Qualifa. Kalkulasi otomatis bagi hasil (20% Platform / 80% Psikolog). Implementasikan rumus pemotongan pajak PPh 21 otomatis atas honorarium psikolog klinis sesuai aturan Dirjen Pajak serta penerbitan bukti potong pajak. Buat validasi pencocokan nama rekening bank dengan nama di STR HIMPSI (anti pencucian uang). Simpan log pencairan abadi di WORM storage. | 26 | Honorarium PPh 21 Tax Engine & AML Verifier |
| | | **FE** | Buat halaman Manajemen Honor Psikolog dengan rincian saldo konseling, bukti potong PPh 21 digital, dan formulir pencairan honor ke bank. | 16 | UI Manajemen Honor & Pajak Psikolog |

---

## RINGKASAN TOTAL ALOKASI JAM REKAYASA (ENGINEERING HOURS)
* **Total Jam Backend (BE)**: ~384 Jam (Justifiqa: 194 Jam | Qualifa: 190 Jam)
* **Total Jam Frontend (FE)**: ~278 Jam (Justifiqa: 140 Jam | Qualifa: 138 Jam)
* **Total Jam Automated QA / Security**: ~78 Jam (Justifiqa: 40 Jam | Qualifa: 38 Jam)
* **Total Keseluruhan Engineering Effort**: **740 Jam Kerja** (Terbagi seimbang dan terisolasi untuk 2 Tim Pengembang Mandiri Justifiqa dan Qualifa).
