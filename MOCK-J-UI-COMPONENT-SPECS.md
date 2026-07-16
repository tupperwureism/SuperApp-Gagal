# MOCK-J-UI-COMPONENT-SPECS.md — Kamus Spesifikasi Geometri & Token UI (Intermediate Design Contract)

> **Status Dokumen:** `SINGLE SOURCE OF TRUTH (LAPIS 2 - INTERMEDIATE DESIGN CONTRACT — FORENSICALLY CERTIFIED)`  
> **Kepatuhan Sistemik:** Wajib dipatuhi 100% oleh seluruh agen AI dan *Frontend Engineer* sebelum menulis atau merefaktorisasi kode JSX / CSS pada repositori `justifiqa-frontend`. DILARANG KERAS melakukan tebak-tebakan proporsi (*arbitrary size guessing*) yang menghasilkan elemen terpotong (*clipped*), menyempit (*squished*), ataupun tidak proporsional.  
> **Sertifikasi Forensik:** Telah direkonsiliasi secara matematis (*Bi-Directional Set Equality*) 1:1 terhadap `JUSTICA_Proto_1.1_Gateway_and_Verifier.html` dan `MOCK-J-FRONTEND-STANDARD.md`.

---

## 1. Filosofi & Penegakan Hukum Geometri UI (`Box-Model Supremacy`)

Seluruh antarmuka (*User Interface*) pada platform **JUSTICA** dibangun berdasarkan **Box-Model Supremacy & Precision Geometry**.  
Aturan mendasar untuk setiap elemen atomik yang diprogram:
1. **Zero-Clipping & Zero-Squishing Guarantee:** Seluruh kontainer tombol (`button`, `a`), lencana (`badge`), dan pil (`chip/pill`) **WAJIB** menerapkan properti perlindungan geometri:
   - `box-sizing: border-box`
   - `flex-shrink: 0`
   - `white-space: nowrap` (untuk teks 1 baris pada tombol/lencana/pil agar tidak pernah terpotong oleh border lengkung saat resolusi layar berubah)
2. **Minimum Touch Target & Vertical Rhythm:** Setiap elemen interaktif yang dapat diklik **WAJIB** memiliki tinggi minimum (*minimum height*) yang terstandardisasi. DILARANG menggunakan `py-1` atau `py-1.5` sembarangan untuk tombol/pil interaktif.
3. **Strict Flex & Alignment:** Penggabungan ikon (emoji/SVG) dengan teks dalam satu tombol atau lencana **WAJIB** berada dalam kontainer `display: inline-flex` atau `display: flex` dengan `align-items: center` dan rasio `gap` yang pasti (`gap-1.5`, `gap-2`, `gap-3`). DILARANG menaruh ikon dan teks secara *inline* polos tanpa *flex wrapper*.
4. **Universal Radius Standard:** Sesuai prototipe master `JUSTICA_Proto_1.1` baris 30, nilai standar border-radius (`--radius`) adalah **`12px`** (`rounded-[12px]`), dengan pengecualian kontainer kartu portal & search input yang menggunakan `calc(var(--radius) + 4px) = 16px` (`rounded-[16px]`), serta lencana/chips yang menggunakan `999px` (`rounded-full`).

---

## 2. Katalog Geometri & Spesifikasi Token Atomik (Exact 1:1 Reconciliation)

### 2.1. Topbar & Navbar Action Buttons (`.btn-verify-nav`, `.theme-toggle`)
Digunakan pada `NavbarGateway` (`Verifikasi Dokumen SHA-256`, `Dark Mode`, atau `Login`).
* **Tinggi Minimum (Min-Height):** `42px` (`min-h-[42px]` / `h-[42px]`)
* **Padding Spasial 1:1:** `padding: 0.55rem 1.15rem` (`py-[0.55rem] px-[1.15rem]`) untuk tombol aksi utama; `padding: 0.55rem 1rem` (`py-[0.55rem] px-[1rem]`) untuk toggle tema.
* **Border Radius:** `border-radius: 12px` (`rounded-[12px]`)
* **Tipografi:** `font-size: 0.85rem` (`13.6px`), `font-weight: 700` (`font-bold`) untuk tombol verifikasi; `font-weight: 600` (`font-semibold`) untuk toggle tema.
* **Struktur Flex & Proteksi Box:** `inline-flex items-center justify-center gap-2 white-space-nowrap box-border flex-shrink-0 cursor-pointer transition-all active:scale-95`
* **Perlindungan Terhadap Pemotongan Teks:** Karena tombol topbar berada di pojok kanan layar, kontainer `.topbar` **WAJIB** menggunakan `display: flex; justify-content: space-between; align-items: center; width: 100%; box-sizing: border-box; padding: 1.15rem 3rem;` (`px-4 sm:px-8 lg:px-12 py-[1.15rem]`) dan melarang pemaksaan lebar (*zero squeezing*) pada kelompok tombol kanan (`.controls-group flex items-center gap-4 flex-shrink-0`).

---

### 2.2. Interactive Pills & Chips (`.chip-gateway` / Layanan Populer)
Digunakan pada komponen `HeroSearchSection` (Layanan Populer) atau tag filter.
* **Tinggi Minimum (Min-Height):** `38px` (`min-h-[38px]` / `h-[38px]`)
* **Padding Spasial:** `padding: 0.5rem 1.15rem` (`px-4.5 py-2`) — *DILARANG `px-3 py-1.5`*
* **Tipografi:** `font-size: 0.85rem` (`13.6px`), `font-weight: 600` (`font-semibold`), `line-height: 1.4`
* **Struktur Flex:** `inline-flex items-center gap-2 white-space-nowrap box-border flex-shrink-0 cursor-pointer rounded-full`
* **Efek Visual:** Border `1px` (`border-gray-600/40`) dengan latar belakang kaca bergelap dan efek hover (`hover:border-[#3B82F6] hover:bg-blue-500/10 transition-all`).

---

### 2.3. Hero Search Input & Submit Button (`.search-container`, `.btn-search`)
Digunakan pada `HeroSearchSection` di layar gerbang utama.
* **Dimensi Kontainer Input (`.search-container` / wrapper):**
  - `max-width: 880px`, `width: 100%`, `margin: 0 auto 3.5rem auto`
  - `padding: 0.65rem` (`p-[0.65rem]`)
  - `border-radius: 16px` (`rounded-[16px]`), `border: 2px solid var(--border-color)`
  - `display: flex; flex-direction: row; align-items: center; gap: 0.75rem; box-sizing: border-box; box-shadow: var(--shadow);` (Pada layar ponsel `< 640px`, beralih ke `flex-col sm:flex-row`).
* **Input Field (`.search-input`):** `flex: 1; width: 100%; background: transparent; border: none; font-size: 1.05rem (16.8px); padding: 0.6rem 0.75rem; color: inherit; focus:outline-none;`
* **Tombol Submit (`.btn-search` / `CARI ADVOKAT →`):**
  - **Tinggi Seragam:** `min-height: 46px` (`h-[46px] sm:h-[48px]`)
  - **Padding Spasial 1:1:** `padding: 0.85rem 2rem` (`py-[0.85rem] px-[2rem]`)
  - **Border Radius:** `border-radius: 12px` (`rounded-[12px]`)
  - **Tipografi:** `font-size: 0.95rem` (`15.2px`), `font-weight: 700` (`font-bold`), `letter-spacing: 0.02em`
  - **Struktur Flex:** `w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white box-border flex-shrink-0 cursor-pointer transition-all active:scale-95 white-space-nowrap`

---

### 2.4. Card Badges & Status Tags (`.portal-badge`, `.badge-client`, `.badge-advocate`)
Digunakan pada `PortalCardItem` (`👤 PORTAL PENCARI KEADILAN`, `⚖️ PORTAL PRAKTISI HUKUM`) dan kartu konsultasi E2EE.
* **Tinggi Minimum (Min-Height):** `32px`
* **Padding Spasial 1:1:** `padding: 0.3rem 0.75rem` (`py-[0.3rem] px-[0.75rem]`)
* **Border Radius:** `border-radius: 999px` (`rounded-full`)
* **Tipografi 1:1:** `font-size: 0.72rem` (`11.5px`), `font-weight: 800` (`font-extrabold`), `text-transform: uppercase`, `letter-spacing: 0.08em` (`tracking-[0.08em]`), `line-height: 1.4`
* **Struktur Flex:** `inline-flex items-center gap-1.5 white-space-nowrap box-border flex-shrink-0 w-fit mb-5 border`
* **Proporsi Ikon:** Ikon emoji (`👤`, `⚖️`) berukuran `text-[13px]` di dalam wrapper `inline-flex items-center justify-center` sehingga tidak menabrak border atas-bawah.

---

### 2.5. Portal Card Container & Anti-Plank CTA Button (`.portal-card`, `.btn-portal`)
Digunakan pada `PortalCardsGrid` dan `PortalCardItem`.
* **Dimensi Kontainer Kartu (`.portal-card`):**
  - **Tinggi Minimum (Min-Height):** `min-height: 420px` (`min-h-[420px]`) — *Krusial untuk mencegah kesan kartu yang terlalu horizontal/pendek*.
  - **Padding Spasial 1:1:** `padding: 2.5rem` (`p-[2rem] sm:p-[2.5rem]`)
  - **Border Radius:** `border-radius: 16px` (`rounded-[16px]`), `border: 1px solid var(--border-color)`
  - **Struktur Flex & Distribusi:** `display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-sizing: border-box; box-shadow: var(--shadow);`
  - **Pita Atas (`::before` / topStripeClass):** `position: absolute; top: 0; left: 0; right: 0; height: 5px;`
* **Tipografi Kartu:**
  - **Judul (`.portal-title`):** `font-family: Outfit; font-size: 1.65rem (26.4px); font-weight: 800; margin-bottom: 1rem;`
  - **Deskripsi (`.portal-desc`):** `font-size: 0.98rem (15.68px); line-height: 1.7; margin-bottom: 2.25rem;` (`mb-9`)
* **Tombol Aksi Bawah Kartu (`.btn-portal` / Anti-Plank Rule):**
  - Karena kartu memiliki `min-height: 420px` dan `padding: 2.5rem` dengan `justify-content: space-between`, tombol diletakkan di dasar kartu (`mt-auto`).
  - **Tinggi Minimum:** `min-height: 52px` (`min-h-[52px]` / `h-[52px]`)
  - **Padding Spasial 1:1:** `padding: 1.05rem 1.5rem` (`py-[1.05rem] px-[1.5rem]`)
  - **Border Radius:** `border-radius: 12px` (`rounded-[12px]`)
  - **Tipografi:** `font-size: 1rem` (`16px`), `font-weight: 700` (`font-bold`)
  - **Struktur Flex:** `width: 100% (w-full); display: flex; align-items: center; justify-content: center; gap: 0.75rem; box-sizing: border-box; flex-shrink: 0; cursor: pointer; transition: all 0.25s ease;`

---

### 2.6. Trust Bar & Advantage Strip (`.advantage-strip`)
Digunakan pada `TrustBarSection` di dasar halaman Gateway (`Advokat Berlisensi Resmi`, `Rekening Bersama Escrow ACID`, `Kerahasiaan Sesi E2EE`).
* **Dimensi Kontainer (`.advantage-strip`):**
  - `max-width: 1180px`, `width: 100%`, `margin: 0 auto 3rem auto`
  - `padding: 1.5rem 2rem` (`py-6 px-8 sm:px-10`)
  - `border-radius: 12px` (`rounded-[12px]`), `border: 1px solid var(--border-color)`
  - `display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-around; gap: 2rem (32px); box-sizing: border-box;`
* **Item Jaminan (`Trust Item`):**
  - **Struktur Flex:** `inline-flex items-center justify-center gap-3.5 box-border flex-shrink-0`
  - **Ikon SVG / Emoji:** `text-2xl` (`24px` / `flex-shrink-0`)
  - **Teks Jaminan:** `font-size: 0.95rem` (`15.2px`), `font-weight: 700` (`font-bold`), `line-height: 1.5`, warna `text-[#F9FAFB]` (dark) atau `text-slate-800` (light).

---

## 3. Matriks Pemetaan Kepatuhan Kelas CSS (`index.css` Layer Components)

Setiap spesifikasi geometri di atas **WAJIB** didaftarkan sebagai kelas abstrak di `src/index.css` (`@layer components`) pada **Sub-Batch 5.9.2** agar dapat dipanggil secara bersih tanpa *arbitrary utility clutter*:

| Nama Spesifikasi | Kelas Komponen CSS (`@layer components`) | Penggunaan pada Berkas Komponen React |
| :--- | :--- | :--- |
| **Topbar Action Button** | `.btn-topbar-action` | `NavbarGateway.tsx` (Tombol Verifikasi SHA-256 & Dark Mode) |
| **Interactive Pill / Chip** | `.chip-gateway` | `HeroSearchSection.tsx` (Layanan Populer) |
| **Hero Search Submit Button** | `.btn-search-hero` | `HeroSearchSection.tsx` (Tombol CARI ADVOKAT →) |
| **Card Badge** | `.badge-portal-card` | `PortalCardItem.tsx` (Lencana Atas Kartu) |
| **Card CTA Button** | `.btn-portal-cta` | `PortalCardItem.tsx` (Tombol Masuk / Daftar) |
| **Trust Bar Container** | `.trust-bar-gateway` | `TrustBarSection.tsx` (Bilah Jaminan Keamanan Bawah) |

---

## 4. Responsi Layar & Breakpoint Standard (`Responsive Rules`)
1. **Mobile (`< 640px` / `sm:`):**
   - Topbar padding berkurang menjadi `px-4 py-3`. Tombol aksi topbar menyembunyikan teks sekunder atau menyesuaikan `px-3 py-1.5 text-xs` namun tetap mempertahankan `box-sizing: border-box white-space-nowrap`.
   - `PortalCardsGrid` wajib `grid-cols-1 gap-6`.
   - `HeroSearchSection` input dan tombol submit berubah menjadi susunan vertikal (`flex-col gap-3`).
2. **Tablet & Desktop (`>= 768px` / `md:` dan `>= 1024px` / `lg:`):**
   - `PortalCardsGrid` menerapkan `grid-cols-2 gap-[2.5rem]`.
   - `TrustBarSection` menyebar item dengan `justify-around gap-8`.

---

## 5. SOP Wajib Sebelum Koding UI (*Zero Blind UI Generation Rule*)
1. **Baca Kontrak Ini (`view_file MOCK-J-UI-COMPONENT-SPECS.md`):** Sebelum menyentuh atau menulis file `*.tsx` maupun `*.css`, agen wajib memeriksa angka presisi pada kamus ini.
2. **Periksa Box-Model Protection:** Pastikan setiap kontainer tombol dan lencana memiliki `box-sizing: border-box`, `flex-shrink: 0`, dan `white-space: nowrap`.
3. **Verifikasi Terminal (`tsc -b && vite build` & `oxlint`):** Setelah menerapkan kelas-kelas dari spesifikasi ini, lakukan audit terminal untuk memastikan 0 error, 0 warning, dan geometri tampilan 1:1 sempurna.
