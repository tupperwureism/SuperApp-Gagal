# MOCK-J-UI-COMPONENT-SPECS.md — Kamus Spesifikasi Geometri & Token UI (Intermediate Design Contract)

> **Status Dokumen:** `SINGLE SOURCE OF TRUTH (LAPIS 2 - INTERMEDIATE DESIGN CONTRACT)`  
> **Kepatuhan Sistemik:** Wajib dipatuhi 100% oleh seluruh agen AI dan *Frontend Engineer* sebelum menulis atau merefaktorisasi kode JSX / CSS pada repositori `justifiqa-frontend`. DILARANG KERAS melakukan tebak-tebakan proporsi (*arbitrary size guessing*) yang menghasilkan elemen terpotong (*clipped*), menyempit (*squished*), ataupun tidak proporsional.

---

## 1. Filosofi & Penegakan Hukum Geometri UI

Seluruh antarmuka (*User Interface*) pada platform **JUSTICA** dibangun berdasarkan **Box-Model Supremacy & Precision Geometry**.  
Aturan mendasar untuk setiap elemen atomik yang diprogram:
1. **Zero-Clipping & Zero-Squishing Guarantee:** Seluruh kontainer tombol (`button`, `a`), lencana (`badge`), dan pil (`chip/pill`) **WAJIB** menerapkan properti perlindungan geometri:
   - `box-sizing: border-box`
   - `flex-shrink: 0`
   - `white-space: nowrap` (untuk teks 1 baris pada tombol/lencana/pil agar tidak pernah terpotong oleh border lengkung saat resolusi layar berubah)
2. **Minimum Touch Target & Vertical Rhythm:** Setiap elemen interaktif yang dapat diklik **WAJIB** memiliki tinggi minimum (*minimum height*) yang terstandardisasi. DILARANG menggunakan `py-1` atau `py-1.5` sembarangan untuk tombol/pil interaktif.
3. **Strict Flex & Alignment:** Penggabungan ikon (emoji/SVG) dengan teks dalam satu tombol atau lencana **WAJIB** berada dalam kontainer `display: inline-flex` atau `display: flex` dengan `align-items: center` dan rasio `gap` yang pasti (`gap-1.5`, `gap-2`, `gap-3`). DILARANG menaruh ikon dan teks secara *inline* polos tanpa *flex wrapper*.

---

## 2. Katalog Geometri & Spesifikasi Token Atomik

### 2.1. Interactive Pills & Chips (Layanan Populer / Tag Filter)
Digunakan pada komponen seperti `HeroSearchSection` (Layanan Populer) atau filter tabel/daftar.
* **Tinggi Minimum (Min-Height):** `38px` (Kelas Tailwind setara: `min-h-[38px]` / `h-[38px]`)
* **Padding Spasial:** `px-4` (16px) dan `py-2` (8px) — *DILARANG `px-3 py-1.5`*
* **Tipografi:** `font-size: 0.875rem` (`14px` / `text-sm`), `font-weight: 600` (`font-semibold`), `line-height: 1.4`
* **Struktur Flex:** `inline-flex items-center gap-2 white-space-nowrap box-border flex-shrink-0 cursor-pointer rounded-full`
* **Efek Visual:** Border `1px` dengan efek hover halus (`hover:border-[#3B82F6] hover:scale-[1.02] transition-all`).

---

### 2.2. Topbar & Navbar Action Buttons (Tombol Aksi Topbar)
Digunakan pada `NavbarGateway` (`Verifikasi Dokumen SHA-256`, `Dark Mode`, atau `Login`).
* **Tinggi Minimum (Min-Height):** `42px` (Kelas Tailwind setara: `min-h-[42px]` / `h-[42px]`)
* **Padding Spasial:** `px-4.5` (`18px`) dan `py-2.25` (`9px`)
* **Tipografi:** `font-size: 0.85rem` (`13.6px`), `font-weight: 700` (`font-bold`), `letter-spacing: 0.03em`
* **Struktur Flex & Proteksi Box:** `inline-flex items-center justify-center gap-2.5 white-space-nowrap box-border flex-shrink-0 rounded-[14px] cursor-pointer transition-all active:scale-95`
* **Perlindungan Terhadap Pemotongan Teks:** Karena tombol topbar berada di pojok kanan layar, kontainer `topbar-gateway` **WAJIB** menggunakan `flex items-center justify-between w-full box-border px-4 sm:px-8 py-3.5 gap-4` dan melarang pemaksaan lebar (*zero squeezing*) pada tombol kanan.

---

### 2.3. Card Badges & Status Tags (Lencana Atas Kartu Portal)
Digunakan pada `PortalCardItem` (`👤 PORTAL PENCARI KEADILAN`, `⚖️ PORTAL PRAKTISI HUKUM`) dan kartu konsultasi E2EE.
* **Tinggi Minimum (Min-Height):** `34px`
* **Padding Spasial:** `px-4` (`16px`) dan `py-1.75` (`7px`)
* **Tipografi:** `font-size: 0.78rem` (`12.5px`), `font-weight: 800` (`font-extrabold`), `text-transform: uppercase`, `letter-spacing: 0.08em` (`tracking-[0.08em]`), `line-height: 1.4`
* **Struktur Flex:** `inline-flex items-center gap-2 white-space-nowrap box-border flex-shrink-0 rounded-full w-fit mb-5 border`
* **Proporsi Ikon:** Ikon emoji atau karakter di dalam lencana memiliki ukuran `text-[14px]` sehingga seimbang dengan teks `12.5px` dan tidak menabrak batas atas/bawah lencana.

---

### 2.4. Card CTA Buttons (Tombol Aksi Bawah Kartu Portal)
Digunakan di dasar kartu pada `PortalCardItem` (`Masuk / Daftar sebagai Klien →`, `Masuk / Daftar Mitra Advokat →`).
* **Aturan Proporsi Anti-Plank (Anti-Balok Panjang):**
  - Tombol diletakkan di dalam kontainer bawah kartu: `mt-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-700/30 (atau tanpa border-t sesuai tema) w-full box-border flex-shrink-0`.
  - Untuk menjaga agar tombol tidak terlihat tipis dan terlalu mendatar, tombol **WAJIB** memiliki tinggi minimum `52px` (`min-h-[52px]` / `h-[52px]`).
* **Padding Spasial:** `px-7` (`28px`) dan `py-3.5` (`14px`)
* **Tipografi:** `font-size: 1rem` (`16px` / `text-base`), `font-weight: 700` (`font-bold`), `letter-spacing: 0.02em`
* **Struktur Flex:** `w-full inline-flex items-center justify-center gap-3 rounded-[14px] box-border flex-shrink-0 cursor-pointer transition-all shadow-md active:scale-95`

---

### 2.5. Hero Search Input & Submit Button (Bilah Pencarian Utama)
Digunakan pada `HeroSearchSection` di layar gerbang utama.
* **Dimensi Kontainer Input (`form` / wrapper):**
  - Tinggi seragam dengan tombol submit: `min-h-[60px]` (`p-2 rounded-[18px] border-2 flex flex-col sm:flex-row items-center gap-3 box-border shadow-xl`)
* **Input Field:** `flex-1 w-full bg-transparent px-4 py-2.5 text-[15px] sm:text-base font-normal focus:outline-none placeholder-gray-400`
* **Tombol Submit (`CARI ADVOKAT →`):**
  - **Tinggi Seragam:** `h-[46px] sm:h-[48px]` (sesuai tinggi dalam wrapper `p-2`)
  - **Padding Spasial:** `px-8` (`32px`) dan `py-3` (`12px`)
  - **Tipografi:** `font-size: 0.95rem` (`15px`), `font-weight: 700` (`font-bold`), `letter-spacing: 0.03em`
  - **Struktur Flex:** `w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white box-border flex-shrink-0 cursor-pointer transition-all shadow-md active:scale-95 white-space-nowrap`

---

### 2.6. Trust Bar & Advantage Strip (Bilah Jaminan Keamanan Bawah)
Digunakan pada `TrustBarSection` di dasar halaman Gateway (`Advokat Berlisensi Resmi`, `Rekening Bersama Escrow ACID`, `Kerahasiaan Sesi E2EE`).
* **Dimensi Kontainer (`.trust-bar-gateway`):**
  - `max-width: 1180px`, `width: 100%`, `margin: 0 auto`
  - `padding: 1.75rem 2.5rem` (`py-7 px-10`)
  - `border-radius: 16px` (`rounded-[16px]`), `border: 1px solid`
  - `display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-around; gap: 2rem (32px); box-sizing: border-box;`
* **Item Jaminan (`Trust Item`):**
  - **Struktur Flex:** `inline-flex items-center justify-center gap-3.5 box-border flex-shrink-0`
  - **Ikon SVG / Emoji:** `text-2xl` (`24px` / `flex-shrink-0`)
  - **Teks Jaminan:** `font-size: 0.95rem` (`15px`), `font-weight: 700` (`font-bold`), `line-height: 1.5`, warna `text-[#F9FAFB]` (dark) atau `text-slate-800` (light).

---

## 3. Matriks Pemetaan Kepatuhan Kelas CSS (`index.css` Layer Components)

Setiap spesifikasi geometri di atas **WAJIB** didaftarkan sebagai kelas abstrak di `src/index.css` (`@layer components`) pada **Sub-Batch 5.9.2** agar dapat dipanggil secara bersih tanpa *arbitrary utility clutter*:

| Nama Spesifikasi | Kelas Komponen CSS (`@layer components`) | Penggunaan pada Berkas Komponen React |
| :--- | :--- | :--- |
| **Interactive Pill / Chip** | `.chip-gateway` | `HeroSearchSection.tsx` (Layanan Populer) |
| **Topbar Action Button** | `.btn-topbar-action` | `NavbarGateway.tsx` (Tombol Verifikasi SHA-256 & Dark Mode) |
| **Card Badge** | `.badge-portal-card` | `PortalCardItem.tsx` (Lencana Atas Kartu) |
| **Card CTA Button** | `.btn-portal-cta` | `PortalCardItem.tsx` (Tombol Masuk / Daftar) |
| **Hero Search Submit Button** | `.btn-search-hero` | `HeroSearchSection.tsx` (Tombol CARI ADVOKAT →) |
| **Trust Bar Container** | `.trust-bar-gateway` | `TrustBarSection.tsx` (Bilah Jaminan Keamanan Bawah) |

---

## 4. SOP Wajib Sebelum Koding UI (*Zero Blind UI Generation Rule*)

1. **Baca Kontrak Ini (`view_file MOCK-J-UI-COMPONENT-SPECS.md`):** Sebelum menyentuh atau menulis file `*.tsx` maupun `*.css`, agen wajib memeriksa angka presisi pada kamus ini.
2. **Periksa Box-Model Protection:** Pastikan setiap kontainer tombol dan lencana memiliki `box-sizing: border-box`, `flex-shrink: 0`, dan `white-space: nowrap`.
3. **Verifikasi Terminal (`tsc -b && vite build` & `oxlint`):** Setelah menerapkan kelas-kelas dari spesifikasi ini, lakukan audit terminal untuk memastikan 0 error, 0 warning, dan geometri tampilan 1:1 sempurna.
