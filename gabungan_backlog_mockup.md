# Product Backlog: LifeQ SuperApp (Tele-Consultation Platform)

Dokumen ini memetakan seluruh *Use Case* (Core & Domain-Specific) ke dalam struktur *Agile Product Backlog*. Setiap baris ditulis dalam format *User Story* agar siap dieksekusi oleh tim *programmer*.

* **SP (Story Points)**: Deret Fibonacci (1, 2, 3, 5, 8). Angka 8 menandakan fitur dengan tingkat kesulitan/waktu pengerjaan tertinggi.
* **Priority**: High (Wajib ada), Med (Penting), Low (Fitur tambahan).

---

## EPIC 1: Core System & Authentication (Sprint 1)
*Fondasi sistem. Tidak ada fitur yang bisa berjalan tanpa Epic ini.*

| ID | Use Case Ref | User Story | SP | Priority |
| :--- | :--- | :--- | :---: | :---: |
| **ST-001** | UC-01 | **Sebagai Klien**, saya ingin mendaftarkan akun baru dengan email/no. HP, **sehingga** saya memiliki akses ke platform. | 3 | High |
| **ST-002** | UC-02 | **Sebagai Klien**, saya ingin masuk (login) dengan sistem verifikasi OTP, **sehingga** akun saya aman dan sesi saya terjaga. | 5 | High |
| **ST-003** | UC-07 | **Sebagai Mitra Profesional**, saya ingin mendaftarkan akun dan mengunggah lisensi (STR/KTA), **sehingga** saya bisa diverifikasi oleh Admin. | 5 | High |
| **ST-004** | UC-08 | **Sebagai Mitra Profesional**, saya ingin login ke dasbor khusus, **sehingga** saya siap menerima permintaan konsultasi. | 3 | High |
| **ST-005** | UC-03 | **Sebagai Klien**, saya ingin mencari dan memfilter daftar mitra berdasarkan spesialisasi dan status *online*, **sehingga** saya menemukan konsultan yang tepat. | 5 | High |
| **ST-006** | UC-09 | **Sebagai Mitra Profesional**, saya ingin mengubah status *online/offline* via *toggle*, **sehingga** klien tahu kapan saya tersedia. | 2 | High |

---

## EPIC 2: Communication & Payment Engine (Sprint 2)
*Jantung operasional platform. Menggabungkan gerbang pembayaran dan ruang obrolan real-time.*

| ID | Use Case Ref | User Story | SP | Priority |
| :--- | :--- | :--- | :---: | :---: |
| **ST-007** | UC-05 | **Sebagai Klien**, saya ingin membayar biaya konsultasi menggunakan integrasi *Payment Gateway*, **sehingga** saya mendapatkan tiket masuk *chat room*. | 8 | High |
| **ST-008** | UC-04 | **Sebagai Klien**, saya ingin bertukar pesan secara *real-time* via *chat* dengan mitra, **sehingga** saya bisa berkonsultasi. | 8 | High |
| **ST-009** | UC-10 | **Sebagai Mitra Profesional**, saya ingin menerima notifikasi dan melayani *chat* dari klien, **sehingga** saya bisa memberikan solusi profesional. | 5 | High |
| **ST-010** | Huk-UC01 | **Sebagai Klien**, saya ingin mengunggah dokumen/berkas ke dalam *chat* dengan perlindungan enkripsi (E2EE), **sehingga** privasi dokumen saya (medis/hukum) terjamin. | 5 | High |

---

## EPIC 3: Domain-Specific & Post-Consultation (Sprint 3 & 4)
*Fitur pembeda (*Unique Selling Proposition*) untuk masing-masing domain layanan (Kesehatan, Hukum, Psikologi).*

### Sprint 3 (Medical & General Post-Session)
| ID | Use Case Ref | User Story | SP | Priority |
| :--- | :--- | :--- | :---: | :---: |
| **ST-011** | UC-11 | **Sebagai Mitra Profesional**, saya ingin membuat catatan/ringkasan medis/hukum setelah sesi selesai, **sehingga** rekam jejak klien tersimpan. | 3 | High |
| **ST-012** | UC-12 | **Sebagai Mitra Profesional**, saya ingin menerbitkan dokumen *output* (seperti resep elektronik), **sehingga** klien dapat menindaklanjuti konsultasi. | 5 | High |
| **ST-013** | Kes-UC01 | **Sebagai Klien**, saya ingin menebus resep digital yang diberikan dokter, **sehingga** obat dapat dikirimkan oleh apotek mitra. | 8 | High |
| **ST-014** | Kes-UC02 | **Sebagai Klien**, saya ingin memesan jadwal temu luring di Rumah Sakit/Klinik mitra, **sehingga** saya bisa bertemu dokter secara fisik. | 5 | Med |
| **ST-015** | Kes-UC03 | **Sebagai Klien**, saya ingin melihat rekam medis saya dan anggota keluarga terdaftar, **sehingga** saya mengetahui sejarah kesehatan (*Family Care*). | 3 | Med |

### Sprint 4 (Psychology & Law)
| ID | Use Case Ref | User Story | SP | Priority |
| :--- | :--- | :--- | :---: | :---: |
| **ST-016** | Psi-UC01 | **Sebagai Klien**, saya ingin mengisi *mood tracker* harian, **sehingga** psikolog dapat mengevaluasi kondisi emosional saya. | 3 | Med |
| **ST-017** | Psi-UC02 | **Sebagai Klien**, saya ingin mendengarkan *streaming* audio meditasi, **sehingga** saya bisa melakukan relaksasi mandiri. | 5 | Low |
| **ST-018** | Psi-UC03 | **Sebagai Klien**, saya ingin mengisi kuesioner psikometri (DASS-21) sebelum sesi, **sehingga** psikolog memiliki basis penilaian kuantitatif. | 5 | Med |
| **ST-019** | Huk-UC02 | **Sebagai Advokat**, saya ingin memilih *template* dokumen hukum dan merendernya dengan data klien, **sehingga** saya bisa memproduksi *Legal Drafting* secara instan. | 8 | High |
| **ST-020** | Huk-UC03 | **Sebagai Klien**, saya ingin mengajukan konsultasi gratis (Pro Bono) dengan mengunggah SKTM, **sehingga** saya mendapat bantuan hukum subsidi. | 5 | Med |

---

## EPIC 4: Admin & Feedback Module (Sprint 5)
*Panel kontrol operasional sistem.*

| ID | Use Case Ref | User Story | SP | Priority |
| :--- | :--- | :--- | :---: | :---: |
| **ST-021** | UC-06 | **Sebagai Klien**, saya ingin memberikan skor rating dan ulasan, **sehingga** mitra profesional mendapatkan evaluasi kinerja publik. | 3 | Med |
| **ST-022** | UC-13 | **Sebagai Admin Sistem**, saya ingin melihat daftar mitra baru dan memverifikasi dokumen lisensi mereka, **sehingga** hanya profesional sah yang aktif di platform. | 5 | High |
| **ST-023** | UC-14 | **Sebagai Admin Sistem**, saya ingin menangguhkan (*suspend*) akun klien yang melanggar, **sehingga** platform tetap aman. | 2 | Med |
| **ST-024** | UC-15 | **Sebagai Admin Sistem**, saya ingin menangguhkan (*suspend*) akun mitra profesional yang melanggar etik, **sehingga** kualitas layanan terjaga. | 2 | Med |
| **ST-025** | UC-16 | **Sebagai Admin Sistem**, saya ingin melihat laporan dan grafik transaksi keuangan, **sehingga** saya bisa memonitor pendapatan platform. | 5 | Med |

---

# 2. Wireframes & High-Fidelity Mockups

Berikut adalah daftar seluruh antarmuka yang telah dibangun untuk memenuhi spesifikasi Use Case dan Product Backlog di atas. Klik tautan untuk membuka desain di *browser* Anda.

## Auth & Dashboard Utama
* **Autentikasi (Login/Register)**
  * Low-Fi Wireframe: [wf_auth.html](file:///d:/justificadll/Mockups/wf_auth.html)
  * High-Fi Mockup: [mockup_auth.html](file:///d:/justificadll/Mockups/mockup_auth.html)
* **Dashboard Klien**
  * Low-Fi Wireframe: [wireframe_dashboard_klien.html](file:///d:/justificadll/Mockups/wireframe_dashboard_klien.html)
  * High-Fi Mockup: [mockup_dashboard_klien.html](file:///d:/justificadll/Mockups/mockup_dashboard_klien.html)
* **Dashboard Mitra Profesional (Dokter/Advokat/Psikolog)**
  * Low-Fi Wireframe: [wf_dashboard_mitra.html](file:///d:/justificadll/Mockups/wf_dashboard_mitra.html)
  * High-Fi Mockup: [mockup_dashboard_mitra.html](file:///d:/justificadll/Mockups/mockup_dashboard_mitra.html)
* **Dashboard Admin Sistem**
  * Low-Fi Wireframe: [wf_dashboard_admin.html](file:///d:/justificadll/Mockups/wf_dashboard_admin.html)
  * High-Fi Mockup: [mockup_dashboard_admin.html](file:///d:/justificadll/Mockups/mockup_dashboard_admin.html)

## Konsultasi & Pembayaran
* **Payment Gateway (Checkout)**
  * Low-Fi Wireframe: [wf_payment_gateway.html](file:///d:/justificadll/Mockups/wf_payment_gateway.html)
  * High-Fi Mockup: [mockup_payment_gateway.html](file:///d:/justificadll/Mockups/mockup_payment_gateway.html)
* **Chat Room (E2EE Konsultasi)**
  * Low-Fi Wireframe: [wf_chat_room.html](file:///d:/justificadll/Mockups/wf_chat_room.html)
  * High-Fi Mockup: [mockup_chat_room.html](file:///d:/justificadll/Mockups/mockup_chat_room.html) (Juga terdapat versi alternatif `chat_room.html`)

## Modul Domain Spesifik
* **Modul Medis (Resep & RS)**
  * Low-Fi Wireframe: [wf_modul_medis.html](file:///d:/justificadll/Mockups/wf_modul_medis.html)
  * High-Fi Mockup: [mockup_modul_medis.html](file:///d:/justificadll/Mockups/mockup_modul_medis.html)
* **Modul Psikologi (Asesmen DASS-21 & Jurnal Mood)**
  * Low-Fi Wireframe: [wf_modul_psikologi.html](file:///d:/justificadll/Mockups/wf_modul_psikologi.html)
  * High-Fi Mockup: [mockup_modul_psikologi.html](file:///d:/justificadll/Mockups/mockup_modul_psikologi.html)
* **Modul Hukum (Legal Drafting & Pro Bono)**
  * Low-Fi Wireframe: [wf_modul_hukum.html](file:///d:/justificadll/Mockups/wf_modul_hukum.html)
  * High-Fi Mockup: [mockup_modul_hukum.html](file:///d:/justificadll/Mockups/mockup_modul_hukum.html)
