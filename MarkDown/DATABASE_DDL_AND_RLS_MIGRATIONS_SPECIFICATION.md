# SPESIFIKASI IMPLEMENTASI FISIK DDL POSTGRESQL/SUPABASE & ROW-LEVEL SECURITY (RLS) — JUSTICA
**Dokumen Arsitektur Eksekusi Fisik (Fase 4B)**  
**Kesesuaian:** 100% Simetris Dua Arah dengan Baseline ERD (`ERD_DATABASE_SCHEMA_SPECIFICATION.md` commit `0cad127`)

---

## 1. PENDAHULUAN & PRINSIP KEAMANAN DATA
Dokumen ini mendefinisikan implementasi fisik **Data Definition Language (DDL)** PostgreSQL 15+ / Supabase, **Row-Level Security (RLS)**, mekanisme penguncian baris konkurensi transaksional (**ACID Mutex Row Locks**), dan trigger perlindungan *Append-Only* (**WORM Immutability**) untuk 26 tabel database Justica.

---

## 2. BATCH 1: DOMAIN 1 — IDENTITY, RBAC & PROFESSIONAL LICENSING (TABEL 1 S.D. 7)

Berkas migrasi fisik untuk Batch 1 tersedia pada:  
[`database/migrations/01_domain1_identity_rbac_licensing.sql`](file:///D:/justificadll/database/migrations/01_domain1_identity_rbac_licensing.sql)

### 2.1 Ringkasan Implementasi Tabel & RLS Policy Domain 1

| No | Nama Tabel | Primary Key | Konfigurasi RLS | Kebijakan Akses (*RLS Policies*) | Status |
| :-: | :--- | :--- | :---: | :--- | :---: |
| 1 | `users_client` | `client_id` (`UUID`) | `ENABLED` | `rls_users_client_self_access`: Klien hanya dapat membaca & memperbarui profil dengan `client_id = auth.uid()`. | <color:green>COMPLETE</color> |
| 2 | `users_advocate` | `advocate_id` (`UUID`) | `ENABLED` | `rls_users_advocate_public_read`: Publik dapat membaca advokat berstatus `'VERIFIED'`.<br>`rls_users_advocate_self_update`: Advokat hanya dapat memperbarui status online profilnya sendiri. | <color:green>COMPLETE</color> |
| 3 | `users_admin` | `admin_id` (`UUID`) | `ENABLED` | `rls_users_admin_internal_access`: Akses terbatas pada staf kepatuhan/mediator berotentikasi internal. | <color:green>COMPLETE</color> |
| 4 | `user_active_devices` | `device_session_id` (`UUID`) | `ENABLED` | `rls_user_active_devices_self_manage`: Pengguna dapat memantau dan mencabut (*revoke*) perangkat loginnya sendiri. | <color:green>COMPLETE</color> |
| 5 | `sipp_verifications` | `verification_id` (`UUID`) | `ENABLED` | `rls_sipp_verifications_advocate_read`: Advokat dapat melihat riwayat verifikasi lisensi SIPP MA miliknya. | <color:green>COMPLETE</color> |
| 6 | `advocate_service_tiers` | `tier_id` (`UUID`) | `ENABLED` | `rls_advocate_service_tiers_public_read`: Klien dapat membaca katalog Tier aktif.<br>`rls_advocate_service_tiers_advocate_manage`: Advokat mengelola paket tarifnya sendiri. | <color:green>COMPLETE</color> |
| 7 | `advocate_sanctions_log` | `sanction_id` (`UUID`) | `ENABLED` | `rls_advocate_sanctions_advocate_read`: Advokat dapat membaca notifikasi sanksi SP 1-3 miliknya. | <color:green>COMPLETE</color> |

---

### 2.2 Verifikasi Aljabar Himpunan Simetris Batch 1 ($S_{\text{DDL}} = S_{\text{Baseline}}$)
* **Himpunan Tabel Baseline Bab 3 (1–7):**  
  `users_client`, `users_advocate`, `users_admin`, `user_active_devices`, `sipp_verifications`, `advocate_service_tiers`, `advocate_sanctions_log`.
* **Himpunan Tabel DDL Batch 1 (`01_domain1_identity_rbac_licensing.sql`):**  
  `users_client`, `users_advocate`, `users_admin`, `user_active_devices`, `sipp_verifications`, `advocate_service_tiers`, `advocate_sanctions_log`.
* **Bukti Matematis:**  
  $$S_{\text{DDL\_Batch1}} - S_{\text{Baseline\_Batch1}} = \emptyset \quad \land \quad S_{\text{Baseline\_Batch1}} - S_{\text{DDL\_Batch1}} = \emptyset$$

---
*Catatan: Batch 2 (Domain 2: Consultation & Fair-Clock SLA - Tabel 8 s.d. 12) akan dieksekusi pada giliran prompt berikutnya sesuai aturan **True Discrete Batching Rule**.*
