# Project Decision & Correction Log (LifeQ Standalone Ecosystem)

Dokumen ini mencatat seluruh keputusan arsitektural penting, koreksi teknis dari pengguna, dan aturan rekayasa yang **WAJIB** dipatuhi oleh tim pengembang dan Agen AI agar tidak terjadi kesalahan berulang (*Context Rot & Memory Integrity* - Aturan 3).

---

## 1. Catatan Koreksi Teknis & Aturan PlantUML (03 Juli 2026)
* **Koreksi Pengguna**: Terjadi *syntax error* pada saat import kode PlantUML ke Draw.io karena pemenggalan baris (*newline/multiline*) di dalam tanda kutip nama aktor.
* **Akar Masalah**: Penulisan literal newline `\n` atau enter di dalam string `actor "Klien\n(Pencari Keadilan)" as Klien` dianggap sebagai tanda kutip tidak tertutup oleh parser PlantUML 1.2025.10 di Draw.io.
* **ATURAN MUTLAK PLANTUML**:
  1. **DILARANG KERAS** menggunakan karakter pemenggal baris (`\n`, `\r`, atau enter) di dalam tanda kutip untuk definisi Aktor, Use Case, Participant, Swimlane/Partition, atau Component.
  2. Semua label entitas PlantUML **WAJIB** ditulis dalam 1 baris utuh yang bersih:
     * *Benar*: `actor "Klien (Pencari Keadilan)" as Klien`
     * *Salah*: `actor "Klien\n(Pencari Keadilan)" as Klien`
  3. Biarkan mesin pembuat diagram (Draw.io/PlantUML) melakukan *text-wrapping* secara otomatis pada kotak/elemen grafisnya tanpa pemenggalan manual di level sintaks.

---

## 2. Keputusan Arsitektural: Opsi B - 100% Siloed Standalone Apps (03 Juli 2026)
* **Latar Belakang**: Keputusan bisnis terbaru dari manajemen/bos meniadakan konsep SuperApp 3 domain (Medis, Hukum, Psikologi) dan menghapus total domain Medis (*Sehatifiqa*).
* **Arsitektur Terpilih**: **Opsi B (100% Siloed & Independent Total Architecture)**.
* **Spesifikasi Arsitektur**:
  1. **Justifiqa (Domain Hukum)**: Aplikasi berdiri sendiri dari ujung ke ujung (*frontend, backend, database, authentication MFA, escrow payment, dan admin panel khusus hukum*). Tidak berbagi sistem dengan aplikasi lain.
  2. **Qualifa (Domain Psikologi)**: Aplikasi berdiri sendiri dari ujung ke ujung (*frontend, backend, database, authentication MFA, payment, dan admin panel khusus psikologi/komite etik*). Tidak berbagi sistem dengan aplikasi lain.
* **Pembersihan Konteks Lama (*Cognitive Refresh*)**:
  * Seluruh ingatan dan referensi mengenai "SuperApp", "LifeQ Core Shared Engine", "SSO LifeQ ID", dan "Domain Medis/Sehatifiqa/Dokter/Apotek" dinyatakan **TIDAK BERLAKU LAGI** dan telah dipangkas dari spesifikasi aktif proyek.

---

## 3. Status Alur Kerja Rekayasa (*Phase-Gate Tracking*)
* [x] **Langkah 1.A**: Refactoring Use Case Diagram (`plantuml_uc_diagrams.md`) & Skenario Teks (`unified_use_case_scenarios.md`, `use_case_scenarios.md`) ke Arsitektur Siloed Opsi B. *(Selesai & Direview)*
* [x] **Langkah 1.B**: Refactoring Activity Diagram (`plantuml_activity_diagrams.md`). *(Selesai & Direview)*
* [x] **Langkah 1.C**: Refactoring Sequence Diagram (`plantuml_sequence_diagrams.md`). *(Selesai & Direview)*
* [ ] **Langkah 2**: Refactoring Product Backlog (`product_backlog.md`) & Matriks Kepatuhan.
* [x] **Langkah 3**: Refactoring Wireframe & Mockup HTML (Membuang modul medis & memisahkan antarmuka Klien dan Mitra untuk Justifiqa & Qualifa). *(Selesai & Direview)*
* [ ] **Langkah 4**: Desain ERD & Database Schema Standalone.
