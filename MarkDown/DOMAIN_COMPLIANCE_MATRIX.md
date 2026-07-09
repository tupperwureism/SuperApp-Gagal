# Domain Compliance Matrix — Arsitektur 100% Siloed (Justifiqa & Qualifa)

**Versi**: 2.0 (Refactored untuk Opsi B - Standalone Apps)  
**Tanggal**: 03 Juli 2026  
**Status**: Mandatory Compliance Baseline  
**Referensi**: UU PDP (UU 27/2022), UU 18/2003 Advokat, UU 10/2020 e-Meterai, UU 18/2014 Kesehatan Mental, Kode Etik HIMPSI 2019

Dokumen ini menetapkan matriks kepatuhan regulasi mutlak untuk dua aplikasi mandiri yang tidak berbagi database maupun infrastruktur backend: **Justifiqa** (Platform Hukum Digital) dan **Qualifa** (Platform Kesehatan Mental & Konseling Psikologi). Seluruh regulasi dan komponen medis (*Sehatifiqa*) telah dihapus seutuhnya.

---

## BAGIAN I: REGULASI & KEPATUHAN — APLIKASI MANDIRI JUSTIFIQA (DOMAIN HUKUM)

### 1.1 Ringkasan Regulasi Utama Hukum
| Regulasi Utama | Pasal Kunci | Relevansi untuk Justifiqa |
| :--- | :--- | :--- |
| **UU 18/2003 tentang Advokat** | Pasal 18, 19, 20, 21 | Hak keistimewaan advokat (*Attorney-Client Privilege*), kewajiban menjaga kerahasiaan perkara klien, dan perlindungan berkas perkara dari sitaan/pemeriksaan pihak luar. |
| **Kode Etik Peradi 2022** | Pasal 3, 4, 5, 12, 13 | Integritas profesional advokat, larangan *conflict of interest*, dan larangan menelantarkan klien hukum. |
| **UU 10/2020 tentang Bea Meterai** | Pasal 3, 4, 11, 13 | Keabsahan e-Meterai resmi Perum Peruri senilai Rp 10.000 pada dokumen *Legal Opinion* dan draf perjanjian hukum digital agar bernilai alat bukti sah di pengadilan. |
| **UU 16/2011 tentang Bantuan Hukum** | Pasal 5, 6, 7, 8 | Hak masyakarat tidak mampu mendapat layanan Pro Bono secara cuma-cuma melalui verifikasi SKTM yang sah. |
| **UU PDP No. 27 Tahun 2022** | Pasal 15, 16, 17, 26, 46 | Perlindungan data pribadi hukum dan sensitif, kewajiban pemrosesan berbasis *consent*, larangan transfer data rahasia ke luar negeri (*data residency* Indonesia), dan notifikasi insiden kebocoran maksimal 3x24 jam. |
| **UU HPP & PER-16/PJ/2016** | Pasal 21, 23 | Pemotongan pajak PPh 21 otomatis atas penghasilan tenaga ahli advokat serta validasi NPWP aktif. |

---

### 1.2 Klasifikasi & Enkripsi Data Hukum (Justifiqa)
| Kategori Data | Contoh Data | Tingkat Sensitivitas | Standar Enkripsi & Proteksi | Masa Retensi | Hak Akses (*RBAC*) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Identitas Klien Hukum** | NIK Dukcapil, KK, Nama, Alamat, No. HP | Tinggi (*Sensitive PII*) | AES-256-GCM + Field-Level Encryption | 10 Tahun | Klien bersangkutan, Advokat aktif, Admin Legal (terbatas) |
| **Dokumen Bukti Perkara** | Gugatan, Jawaban, Foto Bukti, Putusan | **Privileged / Sangat Rahasia** | **E2EE Wajib (Zero-Knowledge)** + Legal Hold Flag | Minimum 10 Tahun / Permanen | **Hanya Klien & Advokat** (Admin Justifiqa dilarang dan tidak bisa membuka) |
| **Catatan Sesi IRAC Note** | Issue, Rule, Application, Conclusion | **Privileged / Sangat Rahasia** | **E2EE Wajib** + AES-256-GCM | Minimum 10 Tahun | **Hanya Advokat** (dan Klien jika dibagikan oleh Advokat) |
| **Legal Drafting & e-Meterai** | Draf Kontrak v1/v2, Legal Opinion ber-Meterai | Tinggi | AES-256-GCM + WORM Hash SHA-256 | 10 Tahun | Advokat pengonsep, Klien pemesan, API Peruri (hash only) |
| **Berkas Pro Bono (SKTM)** | Foto SKTM, Status verifikasi Dinsos | Tinggi | AES-256-GCM | 10 Tahun | Klien pengaju, Advokat Pro Bono, Admin Legal |
| **Audit Log WORM Justifiqa** | Jejak login, unduhan, verifikasi, suspend | **Kritikal / Forensik** | **Immutable WORM Storage (SHA-256 Chain)** | Permanen | Admin Legal, Auditor Eksternal, Aparat Penegak Hukum (atas perintah pengadilan) |

---

### 1.3 Kepatuhan Anti-Bypass, Pre-Chat Agreement (MoU) & DLP Platform Leakage

Untuk melindungi kepastian hukum, hak keistimewaan profesi, perlindungan dana Escrow, serta menjaga keberlangsungan pendapatan platform Justifiqa, setiap transaksi konsultasi tunduk pada protokol kepatuhan berikut:

#### 1. Pre-Chat Clickwrap Agreement (MoU / Terms of Engagement Modal)
Sebelum Klien dan Advokat dapat membuka ruang obrolan E2EE (`J-UC03`), kedua belah pihak **WAJIB menekan tombol persetujuan eksplisit (*"I Accept This Agreement / Saya Menyetujui Syarat & Ketentuan Konsultasi Hukum Justifiqa"*)** yang mencakup 3 klausul mengikat:
1. **Larangan Transaksi Off-Platform**: Klien dan Advokat dilarang keras mengalihkan pembicaraan, menyepakati pertemuan offline liar, atau melakukan pembayaran di luar mekanisme resmi Justifiqa (kecuali menggunakan fitur **QR-Code Handshake Offline Consultation** yang dipesan sah via aplikasi).
2. **Persetujuan DLP Security Scan**: Sepakat bahwa sistem berhak mengoperasikan pemindaian **DLP (*Data Loss Prevention*) Circumvention Filter** pada pertukaran teks/meta untuk mendeteksi pola nomor telepon/kontak pribadi ilegal dan upaya *bypass* tagihan.
3. **Pembatalan Garansi & Pelepasan Tanggung Jawab (*Liability Disclaimer*)**: Segala bentuk penipuan, malpraktik, atau sengketa yang timbul akibat pertemuan/transaksi di luar platform secara otomatis **membatalkan hak Klaim Refund Escrow 100%** dan membebaskan Justifiqa dari segala tuntutan hukum.

#### 2. Matriks Eskalasi Pelanggaran Platform Leakage (DLP Enforcement Matrix)
| Tingkat Pelanggaran | Kondisi Pemicu (DLP Filter) | Tindakan Sistem Otomatis | Sanksi & Eskalasi Hukum |
| :--- | :--- | :--- | :--- |
| **Strike 1 (Warning)** | Terdeteksi pola nomor telepon luar/ajakan ketemuan offline liar pertama kali | 1. Masking/penyensoran otomatis string kontak.<br>2. Menampilkan *In-Chat Security Warning Banner* kepada Klien & Advokat. | Peringatan tercatat pada profil Advokat (*Internal Audit Log*). |
| **Strike 2 (Temporary Freeze)** | Mengulangi ajakan *bypass* / bertukar kontak luar setelah peringatan | 1. Sesi obrolan dibekukan sementara (*Chat Freeze*).<br>2. Penahanan sementara dana Escrow pada Rekening Penampungan. | Pembuatan tiket investigasi otomatis ke **Admin Legal Compliance (`J-UC21`)**. |
| **Strike 3 (Sanction & Suspend)** | Residivis terbukti melakukan pengalihan transaksi luar platform | 1. Penghentian sesi permanen.<br>2. Pembatalan pencairan Escrow ke Advokat (refund ke Klien atau hold sesuai keputusan etik). | **Pembekuan Akun Advokat (Suspension)** & pelaporan ke Komisi Pengawas Etik Mitra Justifiqa. |

---

## BAGIAN II: REGULASI & KEPATUHAN — APLIKASI MANDIRI QUALIFA (DOMAIN PSIKOLOGI)

### 2.1 Ringkasan Regulasi Utama Psikologi
| Regulasi Utama | Pasal Kunci | Relevansi untuk Qualifa |
| :--- | :--- | :--- |
| **UU 18/2014 tentang Kesehatan Mental** | Pasal 12, 13, 14, 15 | Hak penyandang masalah kesehatan jiwa atas kerahasiaan rekam psikologis, persetujuan tindakan medis/psikologis (*informed consent*), dan perlindungan dari stigma. |
| **Kode Etik HIMPSI 2019** | Bab III, IV, V (Pasal 23-27) | Kompetensi psikolog klinis, batas kerahasiaan (*confidentiality*), pengecualian kerahasiaan untuk kondisi darurat (*duty to protect / warn*), dan aturan hubungan majemuk. |
| **Permenkumham No. 1 Tahun 2024** | Pasal 5, 6 | Perlindungan hak keistimewaan komunikasi psikolog-klien dan penegakan hukum psikologi forensik. |
| **UU PDP No. 27 Tahun 2022** | Pasal 15, 16, 26, 46 | Data kesehatan mental dikategorikan sebagai **Data Pribadi Spesifik / Sensitif**; wajib enkripsi tingkat tinggi, persetujuan eksplisit, dan penyimpanan server di Indonesia. |
| **Pedoman Krisis Suicide (WHO/HIMPSI)** | Protokol Intervensi Krisis | Kewajiban pemicuan **Mandatory Crisis Protocol** (Hotline 119 dan alert darurat) saat terdeteksi kecenderungan bunuh diri (*self-harm / suicidal ideation*). |

---

### 2.2 Klasifikasi & Enkripsi Data Psikologi (Qualifa)
| Kategori Data | Contoh Data | Tingkat Sensitivitas | Standar Enkripsi & Proteksi | Masa Retensi | Hak Akses (*RBAC*) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Identitas Klien & Kontak Darurat** | Nama, Email, No. HP, Nama & No. Wali Darurat | Tinggi (*Sensitive PII*) | AES-256-GCM + Field-Level Encryption | 10 Tahun | Klien, Psikolog aktif, Tim Respons Krisis 119 |
| **Jurnal Mood Tracker Harian** | Emotikon tren, catatan perasaan harian | **Sangat Rahasia / Klinis** | **Zero-Knowledge Architecture (E2EE)** | 10 Tahun | **Hanya Klien** (Psikolog melihat dalam bentuk grafik via consent per sesi) |
| **Skor Asesmen Klinis DASS-21** | Skor Depression, Anxiety, Stress, Interpretasi | **Sangat Rahasia / Klinis** | AES-256-GCM + Client-Side Decrypt | 10 Tahun | Klien bersangkutan, Psikolog penanggung jawab, Supervisor Klinis |
| **Catatan Terapi DAP Note** | Data, Assessment, Plan klinis | **Sangat Rahasia / Klinis** | AES-256-GCM + E2EE Wajib | 20 Tahun (Sesuai Kode Etik) | Psikolog pembuat catatan, Supervisor Klinis (atas mandat etik) |
| **Flag Krisis & Alert 119** | Pemicu ancaman bunuh diri, timestamp krisis | **Kritikal / Darurat** | AES-256-GCM + Isolated Emergency Vault | 20 Tahun | Psikolog aktif, Tim Respons Krisis, Supervisor HIMPSI |
| **Audio Meditasi Relaksasi** | Trek MP3 relaksasi, metadata mindfulness | Rendah (Publik) | Standard SSL / CDN Distribution | Permanen | Seluruh pengguna aktif Qualifa |
| **Audit Log WORM Qualifa** | Jejak akses rekam klinis, sidang etik, login | **Kritikal / Forensik** | **Immutable WORM Storage (SHA-256 Chain)** | Permanen | Admin Etik Qualifa, Dewan Komite Etik HIMPSI |

---

## 3. ARSITEKTUR DATA RESIDENCY & LARANGAN CROSS-BORDER
Sesuai amanat **UU PDP No. 27 Tahun 2022 Pasal 26 & Pasal 46**, seluruh data sensitif hukum (Justifiqa) dan data rekam kesehatan mental (Qualifa) **WAJIB DISIMPAN DAN DIPROSES DI DALAM WILAYAH HUKUM REPUBLIK INDONESIA**.
1. **Pusat Data Utama (*Primary Database*)**: Terletak di *Cloud Data Center* wilayah Indonesia (AWS Region Jakarta `ap-southeast-3` atau GCP Jakarta `asia-southeast2`).
2. **WORM Storage Vault**: Penyimpanan log forensik ber-hash SHA-256 abadi berada pada *Object Storage Lock (Compliance Mode)* di Indonesia.
3. **Pengecualian CDN Asset Publik**: Hanya aset statis publik tanpa PII/PHI (seperti gambar antarmuka, berkas suara meditasi MP3, dan *stylesheet* antarmuka) yang diizinkan menggunakan *Global CDN* (Cloudflare/CloudFront).

---

## BAGIAN III: CORE GOVERNANCE & ARCHITECTURAL GUARDRAILS (JUSTIFIQA COMPLIANCE FRAMEWORK)

Seluruh perancangan diagram alur (`AD`), diagram interaksi (`SD`), dan implementasi kode Justifiqa **WAJIB** tunduk pada 4 pilar tata kelola arsitektur berikut:

### 3.1 Prinsip Persetujuan Ganda (*4-Eyes Principle / Dual-Sign-Off Rule*)
Untuk mencegah penyalahgunaan wewenang sepihak (*unilateral abuse of power*), kesalahan mitigasi, dan menjaga *Due Process of Law*, seluruh tindakan administratif berdampak tinggi **DILARANG KERAS** dieksekusi oleh satu aktor admin tunggal.
| Tindakan Kritis (*High-Impact Action*) | Aktor Inisiator (*Maker / Tahap 1*) | Aktor Validator (*Checker / Approver Tahap 2*) | Bukti Audit yang Wajib Dilampirkan |
| :--- | :--- | :--- | :--- |
| **Penjatuhan Sanksi Suspend Akun (`AD/SD-J-21`)** | Admin Legal Investigasi | Supervisor Legal / Komite Etik | Hash SHA-256 Surat Teguran & Bukti Forensik Pelanggaran Berat |
| **Pencairan / Rollback Darurat Dana Escrow** | Admin Keuangan (*Finance Maker*) | Manajer Keuangan (*Finance Checker*) | Berita Acara Sengketa & Tiket Resolusi Dispute |
| **Pencabutan / Pembatalan Sanksi Advokat** | Admin Legal | Dewan Kehormatan / Compliance Head | Berita Acara Klarifikasi / Putusan Banding |

### 3.2 Regulasi Waktu Konsultasi Daring (*Fair-Clock & Smart SLA Engine*)
Untuk mencegah manipulasi waktu konsultasi (*stalling tactics*) dan melindungi hak konsumen hukum:
1. **Trigger Mulai Sesi (*Active Session Trigger*)**: Timer konsultasi (45–90 menit) **tidak boleh berdetak** sebelum Advokat mengirimkan respons pertama yang substansial di ruang obrolan E2EE.
2. **Jeda Otomatis SLA 5 Menit (*Auto-Pause SLA*)**: Jika Advokat tidak merespons pertanyaan Klien dalam durasi $> 5$ menit, sistem otomatis **menjeda (*PAUSE*)** timer utama sesi.
3. **Penalti Pengabaian Sesi (*AFK Abandonment Clause*)**: Jika Advokat tidak aktif selama $> 15$ menit tanpa persetujuan penundaan, Klien berhak mengklaim pengembalian dana Escrow 100% secara otomatis.

### 3.3 Kepatuhan Sesi Tatap Muka (*Offline Consultation QR-Code Handshake*)
Untuk memitigasi kebocoran transaksi di luar sistem (*Platform Leakage*) pada layanan Tier Premium & Pro:
* **Verifikasi Kehadiran Fisik**: Sesi konsultasi offline wajib dipicu melalui pemindaian **QR Code Check-in** di lokasi kantor hukum resmi/mitra terverifikasi.
* **Pelepasan Escrow Berbasis QR**: Pencairan dana Escrow konsultasi offline hanya sah jika telah terjadi pemindaian ganda (*Dual QR Check-in & Check-out*).

### 3.4 Akuntansi Terpisah Token Virtual vs. Tunai Escrow (*Dual-Bucket Ledger*)
* **Uang Tunai Rupiah via Payment Gateway**: Dicatat pada Rekening Escrow Sementara $\rightarrow$ Dicairkan ke Saldo Dompet Tunai Advokat (*Cashable Withdrawal*).
* **Token Virtual / Uang-Uangan (*Promo Welcome Credit*)**: Dicatat pada *Virtual Token Ledger* $\rightarrow$ Dikreditkan sebagai **Poin/Token Internal Non-Tunai (*Non-Cashable Reputation / In-App Reward*)**. Advokat tidak dapat mencairkan token virtual menjadi uang Rupiah.
