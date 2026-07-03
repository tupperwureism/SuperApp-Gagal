# Domain Compliance Matrix — Justifica 3-in-1

**Versi**: 1.0  
**Tanggal**: 02 Juli 2026  
**Status**: Baseline untuk MVP (Sprint A-D)  
**Referensi**: UU PDP (UU 27/2022), Regulasi Sektoral per Domain

---

## 1. Ringkasan Regulasi Utama per Domain

| Domain | Regulasi Utama | Pasal Kunci | Relevansi untuk Justifica |
|--------|----------------|-------------|---------------------------|
| **Kesehatan** | UU 17/2023 Kesehatan | Pasal 172, 173, 184 | Telemedicine, e-resep, rekam medis elektronik |
| | Permenkes 20/2019 Telemedicine | Pasal 4, 5, 6, 11 | Standar layanan, konsentimen, data pasien |
| | Permenkes 73/2016 E-Resep | Pasal 3, 4, 5, 6 | Format resep elektronik, tanda tangan digital, SIA |
| | UU 36/2009 Kesehatan | Pasal 54, 55 | Rahasia medis, hak pasien |
| | UU 36/2009 Narkotika | Pasal 102, 103 | Pengendalian narkotika/psikotropika di resep |
| | UU PDP (27/2022) | Pasal 15, 16, 17, 26 | Data sensitif, consent, DPIA, cross-border |
| **Psikologi** | UU 18/2014 Kesehatan Mental | Pasal 12, 13, 14 | Hak pasien, rahasia, konsentimen |
| | Kode Etik HIMPSI 2019 | Bab III, IV, V | Kompetensi, kerahasiaan, multiple relationship |
| | Permenkumham 1/2024 | Pasal 5, 6 | Privilege psikolog-klien, duty to warn |
| | UU PDP (27/2022) | Pasal 15, 16, 26 | Data sensitif kesehatan mental, consent khusus |
| **Hukum** | UU 18/2003 Advokat | Pasal 18, 19, 20 | Hak keistimewaan, kode etik, larang buka rahasia |
| | Kode Etik Peradi 2022 | Pasal 3, 4, 5, 12 | Integritas, kerahasiaan, conflict of interest |
| | UU PDP (27/2022) | Pasal 15, 16, 26 | Data privilegede, cross-border larangan |
| | UU 10/2020 Bea Meterai | Pasal 3, 11, 13 | Keabsahan e-Meterai Rp 10.000 pada Legal Opinion/Kontrak |
| **Keuangan & Umum** | UU HPP & PER-16/PJ/2016 | Pasal 21, 23 | Pemotongan PPh 21 tenaga ahli otomatis, verifikasi NPWP |
| | UU TPPU (8/2010) | Pasal 18, 19 | AML verification, cross-check nama rekening bank vs STR/SIPP/Peradi |

---

## 2. Klasifikasi Data & Perlindungan

### 2.1 Kesehatan (Kes)

| Kategori Data | Contoh | Sensitivitas | Enkripsi | Retensi | Akses |
|---------------|--------|--------------|----------|---------|-------|
| **Identitas Pasien** | NIK, BPJS, nama, alamat, telp | Tinggi | AES-256-GCM + Field-Level | 10 th | Pasien, Dokter, Admin, Apotek (terbatas) |
| **Rekam Medis** | Diagnosis (ICD-10), anamnesis, pemeriksaan | Sangat Tinggi | AES-256-GCM + Field-Level | 10 th (UU RKM) | Pasien, Dokter behandeling, Supervisor |
| **Resep Obat** | Nama obat, dosis, aturan pakai, jumlah | Sangat Tinggi | AES-256-GCM + Field-Level | 5 th (narkotika) | Pasien, Dokter, Apotek, BPJS Verifier |
| **Resep Narkotika/Psikotropika** | Morfin, Fentanyl, Metadon, dll | Kritikal | AES-256-GCM + Field-Level + HSM | 5 th + Audit Trail WORM | Dokter (SIP Narkotika), Apotek (SIA), BNN |
| **Hasil Lab/Radiologi** | PDF, DICOM, nilai rujukan | Tinggi | AES-256-GCM | 10 th | Pasien, Dokter, Faskes Rujukan |
| **Klaim BPJS** | No. SEP, diagnosis, tarif, status | Tinggi | AES-256-GCM | 10 th | BPJS Verifier, Admin Keuangan |
| **Konsentimen** | Digital signature, timestamp, versi | Tinggi | AES-256-GCM + Hash | 10 th | Pasien, Dokter, Admin (audit) |

### 2.2 Psikologi (Psi)

| Kategori Data | Contoh | Sensitivitas | Enkripsi | Retensi | Akses |
|---------------|--------|--------------|----------|---------|-------|
| **Identitas Klien** | Nama, email, telp, emergency contact | Tinggi | AES-256-GCM | 10 th | Klien, Psikolog, Supervisor, Krisis Responder |
| **Asesmen Psikologi** | DASS-21, skor, interpretasi, rekomendasi | Sangat Tinggi | AES-256-GCM + Zero-Knowledge (client-side decrypt) | 10 th | Klien, Psikolog behandeling, Supervisor |
| **Jurnal Mood** | Emotikon, catatan harian, timestamp | Sangat Tinggi | **Zero-Knowledge** (server tidak bisa baca, E2EE) | 10 th | **Hanya Klien** (Psikolog lihat via consent per sesi) |
| **Catatan Terapi (DAP Note)** | Data, Assessment, Plan | Sangat Tinggi | AES-256-GCM + E2EE | 20 th (Kode Etik) | Psikolog, Supervisor |
| **Audio Meditasi** | File MP3, metadata | Rendah | Standard (CDN) | Permanen | Semua klien (public) |
| **Krisis Flag** | Suicidal ideation, self-harm risk, timestamp | Kritikal | AES-256-GCM + Separate Vault | 20 th | Psikolog, Supervisor, Krisis Responder (real-time) |
| **Konsentimen Khusus** | Crisis protocol consent, emergency contact | Tinggi | AES-256-GCM | 10 th | Klien, Psikolog, Supervisor |

### 2.3 Hukum (Huk)

| Kategori Data | Contoh | Sensitivitas | Enkripsi | Retensi | Akses |
|---------------|--------|--------------|----------|---------|-------|
| **Identitas Klien** | NIK, KK, alamat, dokumen pendukung | Tinggi | AES-256-GCM + E2EE | 10 th | Klien, Advokat, Admin, Legal Aid Verifier |
| **Dokumen Perkara** | Guguran, jawaban, bukti, putusan | **Privileged** | **E2EE Wajib (Client-side encrypt)** + Legal Hold | 10 th min / Permanen (privileged) | **Hanya Klien & Advokat** (Admin tidak baca) |
| **Strategi Kasus** | Legal opinion, IRAC memo, riset hukum | **Privileged** | **E2EE Wajib** + Legal Hold | Permanen | **Hanya Advokat** (Klien via consent) |
| **Legal Drafting** | Template, variabel, draf v1-vN, final PDF | Tinggi | AES-256-GCM + E2EE | 10 th | Advokat, Klien (final), Notaris (e-meterai) |
| **Pro Bono (SKTM)** | File SKTM, status verifikasi, quota | Tinggi | AES-256-GCM | 10 th | Klien, Admin, Legal Aid Verifier, Advokat Pro Bono |
| **Engagement Letter (PKS)** | Digital signature, fee arrangement, scope | Tinggi | AES-256-GCM + Hash | 10 th | Klien, Advokat, Admin |
| **Privilege Waiver** | Surat pelepasan hak keistimewaan | Kritikal | AES-256-GCM + Immutable Log | Permanen | Klien, Advokat, Pengadilan (jika diminta) |
| **Audit Log Akses** | Siapa, kapan, apa, dari mana (WORM) | Kritikal | **Immutable (WORM Storage)** | Permanen | Admin Security, Regulator |

---

## 3. Consent Management

| Domain | Jenis Consent | Kapan Diperlukan | Format | Penyimpanan |
|--------|---------------|------------------|--------|-------------|
| **Kesehatan** | Informed Consent Telemedicine | Setiap sesi baru (UC-04) | Digital signature + timestamp + versi | DB + PDF (hash blockchain) |
| | Specific Consent Sharing | Rujuk ke RS/Apotek/BPJS (Kes-UC01,02) | Checkbox granular per penerima + tujuan | DB + Audit log |
| | Consent Data Riset (Opsional) | Registrasi / Profil | Opt-in terpisah, tidak memengaruhi layanan | DB terpisah |
| **Psikologi** | Informed Consent Konseling | Setiap sesi baru (UC-04) | Digital signature + timestamp | DB + PDF |
| | Crisis Protocol Consent | Registrasi + awal sesi (Psi-UC03) | Checkbox mandatory + emergency contact | DB + Alert ke Supervisor |
| | Consent Sharing ke Supervisor | Registrasi / awal terapi | Opt-in, granular (catatan/jurnal/asesmen) | DB |
| | Research Consent (Opsional) | Registrasi | Opt-in terpisah | DB terpisah |
| **Hukum** | Engagement Letter (PKS) | Sebelum konsultasi pertama (UC-03/04) | Digital signature dua pihak + fee arrangement | DB + PDF (hash) |
| | Privilege Waiver | Saat klien mau share dokumen ke pihak ketiga | Surat terpisah, digital signature, witness | DB + PDF (immutable) |
| | Specific Consent Sharing | Rujuk ke advokat lain / notaris / pengadilan | Per dokumen, per penerima, per tujuan | DB + Audit log |

---

## 4. Audit Log & Monitoring Requirements

| Domain | Event Wajib Log | Format | Retensi | Immutable? |
|--------|-----------------|--------|---------|------------|
| **Kesehatan** | Login/Logout, Akses RM, Cetak Resep, Ekspor Data, Sharing ke RS/Apotek, Ubah Diagnosis | JSON (CEF) + Hash chain | 10 th | Ya (WORM untuk resep narkotika) |
| **Psikologi** | Login/Logout, Akses Asesmen, Akses Jurnal (dengan consent), Krisis Flag Trigger, Sharing ke Supervisor | JSON (CEF) + Hash chain | 20 th | Ya (WORM untuk krisis flag) |
| **Hukum** | **SEMUA AKSES** (Login, Buka Dokumen, Baca Chat, Unduh, Share, Print, Edit Draft) | JSON (CEF) + Hash chain + Digital Signature | Permanen | **Ya (WORM Mandatory)** |

**Log Fields Minimum**:
```json
{
  "timestamp": "ISO8601",
  "user_id": "UUID",
  "user_role": "CLIENT|MITRA|ADMIN|APOTEK|FASKES|SUPERVISOR",
  "action": "READ|WRITE|DOWNLOAD|PRINT|SHARE|DELETE|CONSENT_GRANT|CONSENT_REVOKE",
  "resource_type": "MEDICAL_RECORD|PRESCRIPTION|ASSESSMENT|JOURNAL|CASE_DOCUMENT|LEGAL_DRAFT|PRIVILEGE_DOC",
  "resource_id": "UUID",
  "domain": "KESEHATAN|PSIKOLOGI|HUKUM",
  "ip_address": "IPv4/IPv6",
  "user_agent": "string",
  "consent_ref": "UUID|null",
  "hash_chain": "SHA256(prev_hash + current_event)"
}
```

---

## 5. Cross-Border Data Transfer (Larangan UU PDP)

| Domain | Larangan | Eksepsi | Mekanisme Compliance |
|--------|----------|---------|----------------------|
| **Kesehatan** | Data pasien **wajib disimpan di Indonesia** (UU 17/2023 Pasal 184, UU PDP Pasal 26) | Tidak ada untuk data identitas & rekam medis | - Database primary di DC Indonesia (AWS Jakarta / GCP Jakarta / On-prem)<br>- CDN untuk static asset (audio meditasi, template hukum) boleh global tapi **tanpa PII** |
| **Psikologi** | Sama dengan Kesehatan (data kesehatan mental = data sensitif) | Tidak ada | Sama |
| **Hukum** | Data privilegede **wajib di Indonesia** (UU 18/2003, UU PDP) | Tidak ada | Sama + Legal Hold harus enforce di storage Indonesia |

**Arsitektur Data Residency**:
```
┌─────────────────────────────────────────────────────────────┐
│                    INDONESIA DATA CENTER                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │  Primary DB │ │  WORM Log   │ │  Encrypted Vault    │   │
│  │  (PostgreSQL)│ │  (Append-only)│ │  (HSM/KMS)        │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      GLOBAL CDN (Cloudflare/AWS CloudFront) │
│  Static Assets Only: Audio, Template, JS, CSS, Fonts       │
│  **NO PII, NO PHI, NO PRIVILEGED DATA**                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Role-Based Access Control (RBAC) Matrix

| Role | Kesehatan | Psikologi | Hukum | Admin |
|------|-----------|-----------|-------|-------|
| **Klien** | RM sendiri, Resep sendiri, Booking RS, Konsentimen | Jurnal sendiri, Asesmen sendiri, Audio, Konsentimen | Dokumen perkara sendiri, Draft sendiri, PKS, SKTM | - |
| **Dokter Umum** | RM pasien (behandeling), Resep, Catatan SOAP, Konsentimen | - | - | - |
| **Dokter Spesialis** | Sama + Rujukan, Second Opinion | - | - | - |
| **Dokter Gigi** | RM Gigi, Resep Gigi, Odontogram | - | - | - |
| **Psikolog Klinis** | - | Asesmen, Jurnal (consent), Catatan DAP, Krisis Flag, Supervisi | - | - |
| **Psikolog Konselor** | - | Asesmen basic, Catatan DAP (supervised), No krisis flag | - | - |
| **Advokat** | - | - | Case docs (behandeling), Legal Opinion, Drafting, PKS, Pro Bono | - |
| **Advokat Pro Bono** | - | - | Case docs (quota 3/bln), LBH Report | - |
| **Apotek** | Resep (SIA), Status Dispense, Stok Obat | - | - | - |
| **Faskes/RS** | RM (rujukan), Booking, Jadwal Dokter | - | - | - |
| **Supervisor Psikolog** | - | Asesmen, Catatan, Krisis Flag (read-only), Supervisi log | - | - |
| **Krisis Responder** | - | Krisis Flag (real-time), Emergency Contact | - | - |
| **Legal Aid Verifier** | - | - | SKTM, Quota Pro Bono, LBH Report | - |
| **Notaris/PPAT** | - | - | Draft Final (e-meterai), Template | - |
| **Admin Sistem** | User mgmt, System config, Audit log (read) | User mgmt, System config, Audit log (read) | User mgmt, System config, Audit log (read) | Full (kecuali baca privileged content) |
| **Admin Finansial** | Transaksi, Payout, Revenue Sharing | Transaksi, Payout, Revenue Sharing | Transaksi, Payout, Revenue Sharing, Escrow Pro Bono | Financial only |
| **Compliance Officer** | Audit log (read), DPIA, Breach report | Audit log (read), DPIA, Breach report | **Audit log (read termasuk privileged access log)**, DPIA, Breach report | Compliance only |

---

## 7. Data Retention & Disposal Schedule

| Data Category | Retensi Aktif | Retensi Arsip | Metode Disposal | Bukti Disposal |
|---------------|---------------|---------------|-----------------|----------------|
| Rekam Medis / RM | 10 th | 10 th (total 20 th) | Crypto-shred (key destruction) + Physical shred (backup tape) | Certificate of Destruction |
| Resep Narkotika | 5 th | 10 th (total 15 th) | Crypto-shred + WORM log retained | Certificate + WORM log intact |
| Asesmen Psikologi | 10 th | 10 th (total 20 th) | Crypto-shred | Certificate |
| Jurnal Mood (ZK) | 10 th | 10 th | Client-side key rotation + Server metadata purge | Client attestation + Server log |
| Catatan Terapi (DAP) | 20 th | Permanen (privilege) | **Tidak dispose** (Legal Hold) | N/A |
| Dokumen Perkara | 10 th min | Permanen (privilege) | **Tidak dispose** (Legal Hold) | N/A |
| Legal Drafting (Final) | 10 th | Permanen | Crypto-shred (draf v1-vN), Final retained | Certificate |
| Audit Log (WORM) | Permanen | Permanen | **Tidak dispose** | N/A |
| Konsentimen | 10 th | 10 th | Crypto-shred | Certificate |
| Data Transaksi | 10 th (PSAK 71) | 10 th | Crypto-shred | Certificate |

---

## 8. Incident Response & Breach Notification

| Domain | Ambang Breach | Waktu Notifikasi ke Klien | Waktu Notifikasi ke Regulator | Kontak Regulator |
|--------|---------------|---------------------------|-------------------------------|------------------|
| **Kesehatan** | Akses tidak sah ke RM/Resep | 3x24 jam (UU PDP Pasal 46) | 3x24 jam (Kemenkes + Kominfo) | Kemenkes Ditjen Pelayanan Kesehatan, Kominfo |
| **Psikologi** | Akses tidak sah ke Asesmen/Jurnal/Krisis Flag | 3x24 jam | 3x24 jam (Kemenkes + Kominfo) | Kemenkes Ditjen Kesehatan Mental, Kominfo |
| **Hukum** | **Akses tidak sah ke Privileged Content** | **1x24 jam** (Hak Keistimewaan Advokat) | **1x24 jam** (Peradi + Kominfo + Pengadilan terkait) | Peradi Pengadilan Tinggi, Kominfo, Kemenkumham |

**Playbook Singkat**:
1. **Deteksi** → SIEM alert / Audit log anomaly / User report
2. **Kontain** → Revoke token, isolate account, preserve evidence (WORM)
3. **Investigasi** → Forensic log, scope determination
4. **Notifikasi** → Template per domain (ID/EN), kirim ke klien terkena + regulator
5. **Remediasi** → Patch vuln, rotate key, update policy
6. **Dokumentasi** → Incident report (ID/EN), lessons learned

---

## 9. Compliance Checklist per Sprint (Definition of Done)

### Sprint A (Core Compliance & Auth)
- [ ] UU PDP Article 15, 16, 17 implemented (Consent, Purpose Limitation, Data Minimization)
- [ ] Field-Level Encryption untuk diagnosis, resep, asesmen
- [ ] Zero-Knowledge architecture untuk Jurnal Mood (client-side encrypt)
- [ ] E2EE mandatory untuk Hukum (Web Crypto API / libsodium)
- [ ] Audit Log WORM storage terpasang (append-only, hash chain)
- [ ] Consent Management UI (granular, versioned, revocable)
- [ ] Dual Language (ID/EN) untuk semua consent & legal docs

### Sprint B (Domain-Specific Flow)
- [ ] **Kes**: SIA Integration mock + Permenkes 73/2016 PDF generator + Drug Interaction (Major) + Controlled Drug workflow
- [ ] **Psi**: DASS-21 Scoring + Crisis Protocol (popup + auto-assign + supervisor alert) + ZK Jurnal
- [ ] **Huk**: Template Engine + IRAC Generator + Version Control + Privilege Marking + Legal Hold Flag
- [ ] Cross-domain: Revenue Sharing Calculation (Kes 15%, Psi 20%, Huk 25%) + Audit Trail

### Sprint C (Admin & Financial)
- [ ] Admin Suspend Klien: Due Process (3x warning → surat resmi → appeal 14hr)
- [ ] Admin Suspend Mitra: Ethics Committee Flow → Report to Konsil/Peradi/HIMPSI
- [ ] Laporan Transaksi: Revenue Sharing Breakdown + Export Audit-Ready (XLSX/PDF + Hash)
- [ ] Penarikan Dana: NPWP/BPJS Validation (Kes), Escrow Pro Bono (Huk), Threshold Auto/Manual

### Sprint D (Integration & Polish)
- [ ] Third-party Mock → Real Integration Prep (API Contract signed)
- [ ] DPIA (Data Protection Impact Assessment) selesai & documented
- [ ] Penetration Test & Code Review (OWASP ASVS Level 2)
- [ ] Compliance Documentation Package (ID/EN) untuk Audit Eksternal
- [ ] Incident Response Drill (Tabletop Exercise) per domain

---

## 10. Glossary Istilah Compliance (ID/EN)

| Indonesia | English | Domain |
|-----------|---------|--------|
| Rekam Medis | Medical Record | Kes |
| Resep Elektronik / E-Resep | Electronic Prescription | Kes |
| Obat Terlarang / Narkotika | Controlled Substance / Narcotics | Kes |
| Interaksi Obat | Drug Interaction | Kes |
| Sistem Informasi Apotek (SIA) | Pharmacy Information System | Kes |
| Asesmen Psikologi | Psychological Assessment | Psi |
| Jurnal Mood | Mood Journal / Mood Tracker | Psi |
| Catatan Terapi / DAP Note | Therapy Note / DAP Note | Psi |
| Krisis / Ideasi Bunuh Diri | Crisis / Suicidal Ideation | Psi |
| Supervisi Klinis | Clinical Supervision | Psi |
| Hak Keistimewaan Advokat | Attorney-Client Privilege | Huk |
| Dokumen Perkara | Case Document | Huk |
| Legal Opinion / Telaah Hukum | Legal Opinion | Huk |
| Legal Drafting | Legal Drafting | Huk |
| Surat Kuasa Khusus | Special Power of Attorney | Huk |
| Surat Keterangan Tidak Mampu (SKTM) | Certificate of Indigency | Huk |
| Bantuan Hukum / Pro Bono | Legal Aid / Pro Bono | Huk |
| Lembaga Bantuan Hukum (LBH) | Legal Aid Institute | Huk |
| E-Meterai | Electronic Stamp Duty | Huk |
| Konsentimen / Informed Consent | Informed Consent | All |
| Data Sensitif | Sensitive Personal Data | All |
| Penanggung Jawab Pengendalian Data | Data Controller | All |
| Pemroses Data | Data Processor | All |
| Analisis Dampak Privasi (DPIA) | Data Protection Impact Assessment | All |
| Pencabutan Konsentimen | Consent Withdrawal | All |
| Portabilitas Data | Data Portability | All |
| Penghapusan Data | Right to Erasure | All |
| Log Audit Tidak Bisa Diubah | Immutable Audit Log / WORM | All |
| Enkripsi Ujung-ke-Ujung | End-to-End Encryption (E2EE) | All |
| Enkripsi Level Field | Field-Level Encryption | All |
| Zero-Knowledge Architecture | Zero-Knowledge Architecture | Psi |
| Legal Hold | Legal Hold | Huk |
| Revenue Sharing | Revenue Sharing | All |

---

## 11. Referensi Lengkap (Untuk Tim Legal & Dev)

### Kesehatan
1. UU No. 17 Tahun 2023 tentang Kesehatan (Pasal 172, 173, 184, 185, 186)
2. Permenkes No. 20 Tahun 2019 tentang Pelayanan Telemedicine
3. Permenkes No. 73 Tahun 2016 tentang Standar Rekam Medis & E-Resep
4. Permenkes No. 24 Tahun 2022 tentang Standar Pelayanan Farmasi di Apotek
5. UU No. 36 Tahun 2009 tentang Kesehatan (Pasal 54, 55 - Rahasia Medis)
6. UU No. 36 Tahun 2009 tentang Narkotika (Pasal 102, 103, 127)
7. Peraturan BNN No. 6 Tahun 2021 tentang E-Resep Narkotika
8. PSAK 71 (Keuangan) - Revenue Recognition untuk Platform

### Psikologi
1. UU No. 18 Tahun 2014 tentang Kesehatan Mental (Pasal 12, 13, 14, 15)
2. Kode Etik HIMPSI 2019 (Bab III Kompetensi, IV Kerahasiaan, V Multiple Relationship)
3. Permenkumham No. 1 Tahun 2024 tentang Hak Keistimewaan Psikolog
4. WHO mhGAP Intervention Guide (untuk crisis protocol)
5. DASS-21 Manual (Lovibond & Lovibond, 1995) - Scoring & Interpretation

### Hukum
1. UU No. 18 Tahun 2003 tentang Advokat (Pasal 18, 19, 20, 21, 22)
2. Kode Etik Peradi 2022 (Pasal 3, 4, 5, 12, 13, 14, 15)
3. KUHAP (Pasal 54, 55 - Hak Bantuan Hukum)
4. UU No. 16 Tahun 2011 tentang Bantuan Hukum (Pasal 5, 6, 7, 8)
5. UU No. 10 Tahun 2020 tentang Meterai (Pasal 3, 4, 5 - E-Meterai)
6. PP No. 46 Tahun 2021 tentang Meterai Elektronik
7. Peraturan Peruri tentang E-Meterai API

### Umum & Keuangan
1. UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)
2. ISO 27001:2022 (Information Security Management)
3. ISO 27701:2019 (Privacy Information Management)
4. OWASP ASVS 4.0.3 Level 2 (Application Security Verification)
5. NIST Cybersecurity Framework 2.0
6. UU No. 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (UU HPP) - Ketentuan PPh 21 Tenaga Ahli
7. Peraturan Dirjen Pajak No. PER-16/PJ/2016 tentang Pemotongan PPh 21 atas Jasa Profesional
8. UU No. 8 Tahun 2010 tentang Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang (UU TPPU / AML)

---

**Dokumen ini adalah living document.** Update setiap Sprint Review berdasarkan findings baru.