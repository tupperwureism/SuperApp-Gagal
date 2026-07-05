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
