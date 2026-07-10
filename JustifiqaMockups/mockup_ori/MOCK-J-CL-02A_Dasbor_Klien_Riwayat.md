# MOCK-J-CL-02A [ORI]: Dasbor Utama Klien & Riwayat Perkara Aktif Justica

## 1. METADATA SPESIFIKASI (ENGINEERING EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-CL-02A` |
| **Nama Halaman** | Dasbor Utama & Pusat Manajemen Perkara Klien (`client.justica.id/dashboard`) |
| **Aktor Target** | Klien Hukum Terverifikasi (*Client*) |
| **Ref. Use Case** | `J-UC03` (Katalog), `J-UC04` (Chat), `J-UC12` (Deliverable), `J-UC15` (Pro Bono SKTM) |
| **Peta Navigasi (`from` -> `to`)** | `MOCK-J-CL-01` -> `MOCK-J-CL-02A` -> `MOCK-J-CL-02` (Cari Advokat), `MOCK-J-CL-04` (Chat Room), `MOCK-J-CL-06` (Async Room) |
| **Kepatuhan Keamanan** | JWT Bearer Session Validation, Escrow Status Real-Time Hook, PDP Consent Log Badge |

---

## 2. DIAGRAM WIREFRAME LOGIS (PLANTUML SALT)

```plantuml
@startsalt
{+
  {* <b>JUSTICA</b> - Portal Klien Terverifikasi | [ Dasbor Saya ] | [ Cari Advokat ] | [ Pengaturan Akun ] | [ ☀ / ☾ ] }
  --
  {
    === SELAMAT DATANG, BUDI SANTOSO (NIK: 3171••••••••0001 - SHA-256 Verified)
    "Status Akun: AKTIF • UU PDP Consent: VERIFIED • Sesi MFA Aktif"
  }
  --
  {
    [ <b>+ MULAI KONSULTASI BARU (CARI ADVOKAT)</b> ] | [ Ajukan Bantuan Pro Bono SKTM ]
  }
  --
  {
    <b>1. PERKARA & KONSULTASI AKTIF SAAT INI</b>
    --
    {#
      <b>ID Sesi</b> | <b>Advokat Mitra</b> | <b>Spesialisasi</b> | <b>Status Sesi / Timer</b> | <b>Escrow Status</b> | <b>Aksi Cepat</b>
      REQ-202607-001 | Dr. Mahendra K., S.H. | Hukum Bisnis | ACTIVE (44:12 Fair-Clock) | HELD (SHA-256) | [ <b>BUKA RUANG CHAT (E2EE)</b> ]
      REQ-202607-002 | Anita Wulandari, M.H. | Ketenagakerjaan | ASYNC DRAFTING (SLA 24h) | HELD (Tier 3) | [ <b>LIHAT DELIVERABLE</b> ]
    }
  }
  --
  {
    <b>2. ARSIP PERKARA SELESAI & UNDUHAN e-METERAI</b>
    --
    {#
      <b>Tanggal</b> | <b>Advokat</b> | <b>Judul Dokumen / Sesi</b> | <b>Integritas Dokumen</b> | <b>Unduhan Resmi</b>
      02/07/2026 | Dr. Mahendra K., S.H. | Legal Opinion Kontrak NDA | SHA-256 VALIDATED | [ Unduh PDF e-Meterai ]
      18/06/2026 | Budi Hartono, S.H. | Konsultasi Tatap Muka (QR) | COMPLETED & RATED | [ Resi Invoice Escrow ]
    }
  }
}
@endsalt
```

---

## 3. CATATAN ARSITEKTUR TEKNIS
1. **Real-time Session Status:** Status sesi terhubung langsung ke WebSocket Fair-Clock Timer (`CL-04`).
2. **Integritas Arsip:** Setiap unduhan PDF divalidasi tanda tangan digital SHA-256 dan e-Meterai Peruri sebelum disajikan ke klien.
