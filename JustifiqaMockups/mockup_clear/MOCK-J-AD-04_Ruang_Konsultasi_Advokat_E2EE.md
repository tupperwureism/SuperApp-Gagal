# MOCK-J-AD-04 [CLEAR]: Ruang Konsultasi Advokat E2EE Justica

## 1. METADATA SPESIFIKASI (PRODUCT UI EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-AD-04` |
| **Nama Halaman** | Ruang Konsultasi Advokat (`advocate.justica.id/room`) |
| **Gaya Desain (*Design System*)** | **Professional Corporate Slate UI** (*Light / Dark Mode Ready*) |
| **Aktor Target** | Mitra Advokat Berlisensi Mahkamah Agung |
| **Ref. Use Case** | `J-UC04` (`ST-J-08`), `J-UC10` (`ST-J-09`) |

---

## 2. DIAGRAM WIREFRAME BERSIH (END-USER UI SALTWIREFRAME)

```plantuml
@startsalt
{+
  {* <b>JUSTICA ADVOCATE</b> • Ruang Konsultasi | [ Command Center ] | [ Sisa Waktu: 44:12 ] | [ ☀ / ☾ ] }
  --
  {
    === SESI KONSULTASI HUKUM AKTIF
    "Percakapan diamankan dengan enkripsi E2EE AES-GCM 256-Bit."
  }
  --
  {
    [10:30] <b>Klien:</b> Selamat pagi Pak Advokat.
    [10:31] <b>Anda:</b> Selamat pagi, siap membantu.
  }
  --
  {
    [  <b>BUAT DOKUMEN DELIVERABLE</b>  ] | [ Akhiri Sesi ]
  }
}
@endsalt
```
