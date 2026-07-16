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

## SOP 3: SHADCN V4 PRIMITIVE SUPREMACY & DESIGN TOKEN ALIGNMENT

Untuk menjamin konsistensi visual enterprise-class dan mencegah penumpukan *inline utility bracket* atau *ad-hoc utility classes*:
1. **Larangan Ad-Hoc Utilities & Arbitrary Brackets:** DILARANG KERAS membuat *utility class* custom di `index.css` (`@layer components`) seperti `.portal-card-gateway`, `min-height: 420px justify-between`, atau `.btn-topbar-action`. DILARANG KERAS menggunakan *inline brackets* tebakan (`bg-[#111827] max-w-[1180px] p-[2.5rem]`).
2. **Wajib Memanggil Primitives dari `src/components/ui/`:** Seluruh elemen UI atomik (tombol, kartu, lencana, input) **WAJIB** diimpor dari folder `src/components/ui/` yang merupakan turunan resmi dari Shadcn v4:
   ```tsx
   import { Button } from "@/components/ui/button"
   import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
   import { Badge } from "@/components/ui/badge"
   import { Input } from "@/components/ui/input"
   ```
3. **Zero Void Card Architecture (`Anti-Kopong Rule`):** Untuk komponen kartu portal atau kontainer informasi, dilarang memasang `min-height` statis raksasa yang dipadukan dengan `justify-between`. Gunakan hierarki natural proporsional:
   ```tsx
   <Card className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border border-border bg-card/90 shadow-md h-full">
     <CardHeader className="gap-2 p-0">
       <Badge variant="outline" className="w-fit">...</Badge>
       <CardTitle className="text-2xl font-bold">...</CardTitle>
     </CardHeader>
     <CardContent className="p-0 flex-1 text-base text-muted-foreground leading-relaxed">...</CardContent>
     <CardFooter className="p-0 mt-auto pt-4">
       <Button variant="default" size="lg" className="w-full h-12 rounded-xl">...</Button>
     </CardFooter>
   </Card>
   ```
4. **Pemetaan Token Semantik di `index.css`:** Seluruh variabel warna dan dimensi dikendalikan oleh variabel CSS semantik (`--background`, `--foreground`, `--card`, `--primary`, `--border`, `--ring`) sesuai kamus kontrak `MOCK-J-UI-COMPONENT-SPECS.md`.

---

## SOP 4: PRESERVASI SPASIAL & BOX MODEL PRESERVATION

Saat merakit kontainer makro agar tidak mengalami keruntuhan tata letak (*clipped* atau *squished*):
1. **Aturan Kontainer Pembatas:** Seluruh section utama wajib dibungkus kontainer terpusat: `max-w-7xl mx-auto w-full px-6 sm:px-12`.
2. **Aturan Grid & Gap Simetris:** Untuk susunan kartu ganda atau modular, gunakan `grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 w-full`.
3. **Isolasi Box Model Primitives:** Komponen dari `src/components/ui/` (`Button`, `Badge`) secara bawaan telah memiliki `inline-flex shrink-0 items-center justify-center whitespace-nowrap box-border overflow-hidden`. Jangan pernah menimpa atau merusak properti proteksi geometri ini dengan style *inline* sembarangan.

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
