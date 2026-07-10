# MOCK-J-CL-03 [ORI]: Checkout Pembayaran Escrow & Pengajuan Pro Bono SKTM Justica

## 1. METADATA SPESIFIKASI (ENGINEERING EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-CL-03` |
| **Nama Halaman** | Checkout Escrow & Pro Bono Claim (`client.justica.id/checkout/REQ-202607-003`) |
| **Aktor Target** | Klien Hukum Terverifikasi (*Client*) |
| **Ref. Use Case** | `J-UC05` (Pembayaran Escrow 75/25), `J-UC15` (Klaim Layanan Pro Bono SKTM) |
| **Peta Navigasi (`from` -> `to`)** | `MOCK-J-CL-02B` -> `MOCK-J-CL-03` -> `MOCK-J-CL-03B` (Invoice VA/QRIS) |
| **Kepatuhan Keamanan** | SHA-256 Transaction Idempotency Key, Kemensos DTKS NIK API Verification |

---

## 2. DIAGRAM WIREFRAME LOGIS (PLANTUML SALT)

```plantuml
@startsalt
{+
  {* <b>JUSTICA</b> - Portal Klien | [ < Kembali ] | [ Sesi Waktu Kunci Slot: 14:28 ] | [ ☀ / ☾ ] }
  --
  {
    === RINGKASAN PEMESANAN KONSULTASI HUKUM
    "Pemesanan Anda dilindungi sistem Escrow 100% (dana baru diteruskan ke advokat setelah sesi tuntas)."
  }
  --
  {
    Advokat Mitra      | "Dr. Mahendra Kusuma, S.H., M.H."
    Layanan Dipilih    | "Tier 2: Konsultasi Hukum Mendalam E2EE (45 Menit)"
    Jadwal Konsultasi  | "Hari Ini, 10 Juli 2026 — Pukul 10:30 WIB"
    Total Tagihan      | "<b>Rp 450.000</b> (Termasuk PPN & Biaya Escrow SHA-256)"
  }
  --
  {/ <b>[ TAB 1: PEMBAYARAN REKENING ESCROW ]</b> | [ TAB 2: PENGAJUAN PRO BONO SKTM (Rp 0) ] }
  --
  {
    <b>TAB 1 AKTIF: PILIH METODE PEMBAYARAN ESCROW BERAMANAT</b>
    --
    (*) QRIS Instan (Semua E-Wallet & Mobile Banking)
    () Virtual Account BCA / Mandiri / BNI / BRI (Otomatis Terverifikasi)
    () Kartu Kredit / Debit Terverifikasi 3D-Secure
    --
    [X] Saya menyetujui Ketentuan Pencairan Dana Escrow & Kebijakan Privasi
    --
    [  <b>BAYAR SEKARANG — Rp 450.000</b>  ]
  }
  --
  {
    <b>TAB 2 ALTERNATIF: PENGAJUAN BANTUAN HUKUM PRO BONO (SKTM)</b>
    --
    Nomor NIK KTP Pencari Keadilan | "3171234567890001                  "
    Nomor Surat SKTM Kelurahan     | "SKTM/2026/VII/0921                  "
    Unggah Foto Dokumen SKTM Asli  | [ Pilih Berkas PDF/JPG (Max 5MB)... ]
    --
    [  <b>VERIFIKASI NIK KE KEMENSOS & AJUKAN PRO BONO Rp 0</b>  ]
  }
}
@endsalt
```

---

## 3. CATATAN ARSITEKTUR TEKNIS
1. **Idempotency Key Tracking:** Setiap klik tombol bayar menyertakan header `X-Idempotence-Key: SHA256(user_id + slot_id + timestamp)` untuk mencegah penagihan ganda.
