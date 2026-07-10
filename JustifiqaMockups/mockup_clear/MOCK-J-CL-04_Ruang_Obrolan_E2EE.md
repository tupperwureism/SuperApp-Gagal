# MOCK-J-CL-04 [CLEAR]: Ruang Konsultasi Hukum Online Justica

## 1. METADATA SPESIFIKASI (PRODUCT UI EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-CL-04` |
| **Nama Halaman** | Ruang Konsultasi (`client.justica.id/room`) |
| **Gaya Desain (*Design System*)** | **Professional Corporate Slate UI** (*Light / Dark Mode Ready*) |
| **Aktor Target** | Klien Hukum |
| **Ref. Use Case** | `J-UC04`, `J-UC10` |

---

## 2. DIAGRAM WIREFRAME BERSIH (END-USER UI SALTWIREFRAME)

```plantuml
@startsalt
{+
  {* <b>JUSTICA</b> • Platform Hukum Profesional | [ Dasbor Saya ] | [ Sisa Waktu: 44 Menit 12 Detik ] | [ Akhiri Sesi ] | [ ☀ / ☾ ] }
  --
  {
    === KONSULTASI BERSAMA DR. MAHENDRA KUSUMA, S.H., M.H.
    "Percakapan Anda terenkripsi secara pribadi dan dilindungi kebijakan privasi ketat."
  }
  --
  {
    {
      <b>RUANG PERCAKAPAN</b>
      --
      <b>Dr. Mahendra:</b> Selamat pagi Pak Budi. Silakan sampaikan kronologi kasus yang dihadapi.
      <b>Budi Santoso (Anda):</b> Pagi Pak. Pihak vendor melanggar pasal kesepakatan waktu pengiriman barang.
    } | {
      <b>INFORMASI KONSULTASI</b>
      --
      Status Konsultasi  | <b>Sesi Berjalan</b>
      Perlindungan Dana  | <b>Rekening Bersama Aman</b>
      --
      [  <b>MINTA JEDA WAKTU</b>  ]
      --
      [  Unggah Dokumen Tambahan  ]
    }
  }
  --
  {
    Ketik pesan konsultasi Anda di sini...              | [  <b>KIRIM PESAN</b>  ]
  }
}
@endsalt
```

---

## 3. SPESIFIKASI PENGALAMAN PENGGUNA (*UX FLOW*)
1. **Keamanan Nyaman:** Memberikan rasa tenang bagi klien saat menyampaikan permasalahan sensitif karena pesan terenkripsi secara otomatis.
