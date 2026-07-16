---
name: frontend-ui-engineering
description: SOP & Alur Kerja Khusus untuk Membangun, Merefaktorisasi, dan Memverifikasi Komponen UI Frontend Modular di justifiqa-frontend dengan Kepatuhan Mutlak terhadap MOCK-J-FRONTEND-STANDARD.md dan Preservasi Visual 1:1.
---

# Frontend UI Engineering Skill (`justifiqa-frontend`)

Skill ini adalah prosedur operasional standar (SOP) eksekusi bagi agen AI saat diinstruksikan untuk membuat antarmuka baru, merefaktorisasi halaman yang ada, atau memperbaiki kerusakan layout di dalam `justifiqa-frontend`. 

Setiap langkah dalam skill ini **WAJIB dieksekusi secara berurutan dan disiplin** demi menjamin kualitas visual berkelas premium, struktur pemrograman modular terdekopel, serta kompilasi tanpa error.

---

## SOP 1: PRE-EXECUTION MANDATORY CHECK (FASE BACA ULANG & ANALISIS - `Zero Blind UI Generation Rule`)

Sebelum menulis baris kode pertama atau memodifikasi file `.tsx` / `.css` apa pun:
1. **Baca Spesifikasi Master & Kamus Geometri:** Jalankan `view_file` secara fisik pada 2 dokumen master:
   - [MOCK-J-FRONTEND-STANDARD.md](file:///d:/justificadll/MOCK-J-FRONTEND-STANDARD.md) (aturan makro, token warna, arsitektur terdekopel)
   - [MOCK-J-UI-COMPONENT-SPECS.md](file:///d:/justificadll/MOCK-J-UI-COMPONENT-SPECS.md) (kamus spesifikasi angka mutlak dimensi `min-height`, `padding`, dan `box-sizing` untuk pil, lencana, tombol, dan kartu agar tidak pernah terpotong atau menyempit).
2. **Baca Prototipe HTML Referensi:** Jika tugas berkaitan dengan fidelity prototipe (misal: Gateway, Verifier, atau Dashboard), jalankan `view_file` pada berkas HTML master terkait (`JUSTICA_Proto_1.1_Gateway_and_Verifier.html` atau `SuperApp_Justifiqa_Interactive_Prototype.html`) pada bagian yang relevan untuk memeriksa struktur CSS asli (`.portal-card`, `.trust-bar`, `.search-container`, dsb.).
3. **Analisis Deklarasi Prinsip (Principle Gate):** Sajikan kepada pengguna rencana arsitektur modular yang akan diterapkan (daftar komponen mikro yang akan dibuat dan kelas CSS yang akan didaftarkan di `index.css`).

---

## SOP 2: ATOMIC DECOUPLING EXECUTION (STRUKTURALISASI KOMPONEN)

Sesuai aturan *Monolithic View Ban*, jangan pernah menumpuk kode markup UI di atas 200 baris dalam satu file `*Page.tsx`. Pecahkan komponen ke direktori domain khusus:

```
src/components/<domain>/
├── <Domain>Navbar.tsx          # Komponen Topbar / Header
├── <Domain>HeroSection.tsx     # Komponen Hero / Headline
├── <Domain>MainGrid.tsx        # Kontainer Grid / List utama
├── <Domain>CardItem.tsx        # Unit Kartu atomik terisolasi
└── <Domain>FooterSection.tsx   # Bagian Footer / Bilah Kepercayaan
```

### Panduan Refaktorisasi Halaman Monolitik:
1. Buat folder domain di `src/components/<domain>/`.
2. Ekstrak bagian-bagian UI dari halaman monolitik (`*Page.tsx`) ke komponen mikro terpisah (`*.tsx`).
3. Pastikan setiap komponen mikro menerima data dan `callback` melalui *TypeScript interface props* yang terdefinisi kuat.
4. Sisakan `*Page.tsx` di `src/pages/` hanya sebagai **orkestrator kontainer bersih** yang merakit komponen mikro tersebut.

---

## SOP 3: DESIGN TOKEN & CSS CLASS ABSTRACTION

Untuk menjamin konsistensi visual dan mencegah penumpukan *inline utility bracket* yang rentan bentrok:
1. **Periksa `index.css`:** Sebelum menulis *inline style* ad-hoc (`bg-[#111827] max-w-[1180px] p-[2.5rem] rounded-[16px]`), cek apakah token warna atau kelas komponen tersebut sudah ada di `index.css`.
2. **Abstraksi Komponen Berulang:** Jika suatu struktur kartu, tombol ber-glow, atau kontainer kaca (*glassmorphism*) digunakan berkali-kali atau memiliki definisi kompleks, daftarkan sebagai kelas komponen di `index.css`:

```css
@layer components {
  .card-premium-glass {
    background: var(--bg-obsidian-card);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-glass-light);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: var(--shadow-glass);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-premium-glass:hover {
    transform: translateY(-4px);
    border-color: var(--accent-legal-gold);
    box-shadow: var(--shadow-gold-glow);
  }
}
```

3. **Gunakan Kelas CSS di JSX:** Panggil kelas abstrak tersebut pada komponen (`<div className="card-premium-glass flex flex-col justify-between">`).

---

## SOP 4: PRESERVASI SPASIAL & BOX MODEL PRESERVATION

Saat merakit komponen agar tidak mengalami penyusutan (*squished* / rata kiri gepeng) di browser:
1. **Aturan Kontainer Pembatas:** Seluruh section utama wajib dibungkus kontainer terpusat: `max-w-[1180px] mx-auto w-full px-[2.5rem]`.
2. **Aturan Grid & Gap Simetris:** Untuk susunan kartu ganda atau modular, gunakan `grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] w-full`.
3. **Isolasi Flex Item:** Untuk ikon, lencana, dan tombol CTA di dalam kontainer flex, tambahkan `flex-shrink-0 box-border` dan pastikan tinggi elemen interaktif terpatok stabil (misal: input `h-[54px]`, tombol `h-[48px]`).

---

## SOP 5: ZERO-ERROR VERIFICATION PROTOCOL (FASE VALIDASI & AUDIT)

Sebelum melaporkan penyelesaian sub-batch kepada pengguna, eksekusi validasi terminal di dalam folder `justifiqa-frontend`:

```powershell
# Jalankan build TypeScript & Vite serta linter oxlint
cd d:\justificadll\justifiqa-frontend ; npm run build ; npm run lint
```

### Kriteria Kelulusan Wajib (*Zero-Omission Checklist*):
- [ ] Output `npm run build` menunjukkan `✓ built in ...ms` dengan **0 error kompilasi TypeScript (`tsc -b`)**.
- [ ] Output `npm run lint` menunjukkan **`Found 0 warnings and 0 errors.`**
- [ ] Jika terdapat error/warning linter (misal: `react-hooks/exhaustive-deps` atau type errors), **PERBAIKI LANGSUNG DI SAAT ITU JUGA** sebelum merekam Git commit.
- [ ] Rekam perubahan ke Git dengan format pesan spesifik: `git commit -m "feat(ui): Sub-Batch X.Y - [Deskripsi Perubahan Modular]"`.
- [ ] Berhenti dan minta *sign-off* pengguna.
