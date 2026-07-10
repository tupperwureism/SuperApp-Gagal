# MOCK-J-GATEWAY-01 [ORI]: Gerbang Utama & Pemilihan Peran (*Root Gateway*) Justica

## 1. METADATA SPESIFIKASI (ENGINEERING EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-GATEWAY-01` |
| **Nama Halaman** | Gerbang Depan & Pemilihan Peran Platform Justica (`justica.id`) |
| **Aktor Target** | Pengguna Publik, Calon Klien, Mitra Advokat, Admin Kepatuhan |
| **Ref. Use Case** | `J-UC01` (Registrasi Klien), `J-UC07` (Registrasi Advokat), `J-UC14` (Verifikasi Dokumen) |
| **Peta Navigasi (`from` -> `to`)** | `MOCK-J-GATEWAY-01` -> `MOCK-J-CL-01` (Klien Login), `MOCK-J-AD-01` (Advokat Login), `MOCK-J-PUBLIC-VERIFY` (Verifikasi SHA-256) |
| **Kepatuhan Keamanan** | HSTS Strict Transport, TLS 1.3 Mandatory, Client-Side Role Isolation, Rate Limiting 100 req/min |

---

## 2. DIAGRAM WIREFRAME LOGIS (PLANTUML SALT)

```plantuml
@startsalt
{+
  {* <b>JUSTICA</b> - Platform Layanan Hukum Keadilan Terverifikasi | [ ☀ Light / ☾ Dark Mode ] | [ Verifikasi Dokumen SHA-256 ] }
  --
  {
    === GERBANG KEADILAN HUKUM INDONESIA
    "Akses konsultasi hukum terverifikasi SIPP Mahkamah Agung dengan jaminan kerahasiaan E2EE & Rekening Escrow Terproteksi."
  }
  --
  {
    [ Cari Spesialisasi Hukum (Pidana, Perdata, Bisnis, Ketenagakerjaan)...                                   ] | [  <b>CARI ADVOKAT</b>  ]
  }
  --
  {
    <b>PILIH JALUR AKSES PORTAL ANDA</b>
    --
    {
      <b>PORTAL KLIEN HUKUM</b>
      Akses untuk pencari keadilan, konsultasi,
      & pengajuan bantuan Pro Bono SKTM.
      --
      [ <b>Masuk / Daftar sebagai Klien</b> ]
    } |
    {
      <b>PORTAL MITRA ADVOKAT</b>
      Akses untuk Advokat berlisensi SIPP/Peradi,
      manajemen kasus, & pencairan Escrow.
      --
      [ <b>Masuk / Daftar Mitra Advokat</b> ]
    }
  }
  --
  {
    <b>STATISTIK & KEANDALAN PLATFORM (LIVE VERIFIED)</b>
    [ Advokat Terverifikasi SIPP: 1,420+ ] | [ Rata-rata Respons DLP: ~30ms ] | [ Rekening Escrow Aktif: SHA-256 Secured ]
  }
  --
  {
    © 2026 JUSTICA Legal Platform • [ Kebijakan Privasi UU PDP ] • [ Syarat & Ketentuan ] • [ Portal Kepatuhan Admin ]
  }
}
@endsalt
```

---

## 3. CATATAN ARSITEKTUR TEKNIS & COMPLIANCE HOOKS
1. **Pemisahan Domain/Subdomain:** Tombol Klien mengarah ke `client.justica.id` (`CL-01`), tombol Advokat mengarah ke `advocate.justica.id` (`AD-01`).
2. **Pelacakan Integritas Integritas:** Setiap sesi publik diberikan token *Zero-Trust CSRF* sebelum memasuki gerbang autentikasi.
