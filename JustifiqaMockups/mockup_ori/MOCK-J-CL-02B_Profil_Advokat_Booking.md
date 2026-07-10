# MOCK-J-CL-02B [ORI]: Profil Detail Advokat & Pemilihan Jadwal Booking Justica

## 1. METADATA SPESIFIKASI (ENGINEERING EDITION)
| Atribut | Nilai Spesifikasi |
| :--- | :--- |
| **ID Mockup** | `MOCK-J-CL-02B` |
| **Nama Halaman** | Profil Lengkap Advokat & Booking Slot (`client.justica.id/advocates/mahendra-kusuma`) |
| **Aktor Target** | Klien Hukum Terverifikasi (*Client*) |
| **Ref. Use Case** | `J-UC03` (Cari & Lihat Detail Advokat), `J-UC05` (Pilih Jadwal & Lanjut ke Checkout) |
| **Peta Navigasi (`from` -> `to`)** | `MOCK-J-CL-02` -> `MOCK-J-CL-02B` -> `MOCK-J-CL-03` (Checkout Pembayaran Escrow) |
| **Kepatuhan Keamanan** | SIPP MA Credential Verification SHA-256, Slot Concurrency Locking (Mutex Redis TTL 15m) |

---

## 2. DIAGRAM WIREFRAME LOGIS (PLANTUML SALT)

```plantuml
@startsalt
{+
  {* <b>JUSTICA</b> - Portal Klien | [ < Kembali ke Katalog ] | [ ☀ / ☾ ] }
  --
  {
    === DR. MAHENDRA KUSUMA, S.H., M.H.
    "Spesialis Hukum Bisnis, Sengketa Komersial, & Hak Kekayaan Intelektual"
  }
  --
  {
    [ SIPP MA VERIFIED #18293 ] | [ PERADI ACTIVE ] | [ ★ 4.9 (124 ULASAN VALIDATED) ] | [ ONLINE E2EE ]
  }
  --
  {
    <b>1. BIOGRAFI & REKAM JEJAK HUKUM</b>
    "Dr. Mahendra berpraktik selama lebih dari 15 tahun mendampingi korporasi nasional dan multinasional. Anggota aktif Peradi dan terdaftar resmi pada Berita Acara Sumpah (BAS) Pengadilan Tinggi Jakarta."
  }
  --
  {
    <b>2. PILIH TINGKAT LAYANAN (*TIERING PLATFORM*)</b>
    --
    () <b>Tier 1: Konsultasi Awal Cepat (15 Menit) — GRATIS Rp 0</b>
       Untuk evaluasi awal kasus dan pengecekan kelayakan hukum.
    (*) <b>Tier 2: Konsultasi Hukum Mendalam E2EE (45 Menit) — Rp 450.000</b>
        Analisis pasal, pembedahan strategi hukum, dan ringkasan sesi.
    () <b>Tier 3: Konsultasi + Penyusunan Dokumen / Legal Opinion — Rp 3.500.000</b>
       Termasuk dokumen resmi ber-e-Meterai & garansi 2x revisi.
  }
  --
  {
    <b>3. PILIH METODE & JADWAL KONSULTASI</b>
    --
    Metode Pertemuan: (*) Online E2EE Chat / Call | () Offline Tatap Muka (QR Check-in)
    Tanggal Konsultasi: ^Hari Ini, 10 Juli 2026^
    Pilihan Slot Waktu:
    [ 09:00 - 09:45 (Penuh) ] | [ <b>10:30 - 11:15 (Tersedia)</b> ] | [ 14:00 - 14:45 (Tersedia) ]
  }
  --
  {
    [ <b>LANJUTKAN KE CHECKOUT PEMBAYARAN ESCROW</b> ] | [ Batal ]
  }
}
@endsalt
```

---

## 3. CATATAN ARSITEKTUR TEKNIS
1. **Mutex Concurrency Locking:** Saat slot `10:30` dipilih, sistem mengunci slot di Redis selama 15 menit agar tidak terjadi pesanan ganda (*double booking*) saat checkout di `CL-03`.
