---
name: frontend-ui-engineering
description: SOP & Alur Kerja Khusus untuk Membangun, Merefaktorisasi, dan Memverifikasi Komponen UI Frontend Modular di justifiqa-frontend dengan Kepatuhan Mutlak terhadap Design System First (Claude's 4 Rules), MOCK-J-FRONTEND-STANDARD.md, dan Preservasi Visual 1:1.
---

# Frontend UI Engineering Skill (`justifiqa-frontend` — Design System First Supremacy)

Skill ini adalah prosedur operasional standar (SOP) eksekusi bagi agen AI saat diinstruksikan untuk membuat antarmuka baru, merefaktorisasi halaman yang ada, atau memperbaiki kerusakan layout di dalam `justifiqa-frontend`. 

Setiap langkah dalam skill ini **WAJIB dieksekusi secara berurutan dan disiplin** demi menjamin kualitas visual berkelas premium, struktur pemrograman modular terdekopel, serta kompilasi tanpa error.

---

## SOP 1: PRE-EXECUTION MANDATORY CHECK (FASE BACA ULANG & ANALISIS - `Zero Blind UI Generation Rule`)

Sebelum menulis baris kode pertama atau memodifikasi file `.tsx` / `.css` apa pun:
1. **Baca Spesifikasi Master & Kamus Geometri:** Jalankan `view_file` secara fisik pada 2 dokumen master:
   - [MOCK-J-FRONTEND-STANDARD.md](file:///d:/justificadll/MOCK-J-FRONTEND-STANDARD.md) (aturan makro, token warna, arsitektur terdekopel)
   - [MOCK-J-UI-COMPONENT-SPECS.md](file:///d:/justificadll/MOCK-J-UI-COMPONENT-SPECS.md) (kamus spesifikasi angka mutlak dimensi `min-height`, `padding`, dan `box-sizing` untuk pil, lencana, tombol, dan kartu agar tidak pernah terpotong atau menyempit).
2. **Baca Prototipe HTML Referensi:** Jika tugas berkaitan dengan fidelity prototipe, jalankan `view_file` pada berkas HTML master terkait (`JUSTICA_Proto_1.1_Gateway_and_Verifier.html` atau `SuperApp_Justifiqa_Interactive_Prototype.html`) pada bagian yang relevan untuk memeriksa struktur CSS asli (`.portal-card`, `.trust-bar`, `.search-container`, dsb.).
3. **Visual Prototype Anchoring Gate (`Claude Rule #3`):** Sajikan kepada pengguna **Deklarasi Geometri Visual** dalam bentuk deskripsi teks konkret (warna, shadow, padding, min-height, dan border-radius) sebelum mengeksekusi kode agar pengguna dapat memverifikasi kemewahan dan proporsinya.

---

## SOP 2: DESIGN SYSTEM FIRST MANDATE (`Claude Rule #1`)

DILARANG KERAS menulis atau mengubah JSX dengan menumpuk puluhan *ad-hoc utility classes* secara sembarangan (*JSX-First Thinking*).
1. **Bangun Kelas Komponen di `src/index.css` Terlebih Dahulu:** Sebelum membuat atau memodifikasi komponen JSX, agen **WAJIB membangun atau memastikan kelas komponen CSS terisolasi di `src/index.css` (`@layer components`) terlebih dahulu**.
2. **Konsumsi Bersih di JSX:** JSX hanya boleh bertindak sebagai konsumen yang memanggil kelas desain sistem yang sudah matang di `index.css` tersebut (`<div className="portal-card-box">`, `<button className="chip-service-item">`).
3. **Pemetaan Token Semantik:** Seluruh variabel warna dan dimensi dikendalikan oleh variabel CSS semantik (`--background`, `--foreground`, `--card`, `--primary`, `--border`, `--ring`) di `index.css` sesuai kamus kontrak `MOCK-J-UI-COMPONENT-SPECS.md`.

---

## SOP 3: ANTI-WRAP & ANTI-GEPENG GEOMETRY PROTECTION (`Claude Rule #2`)

Untuk mencegah keruntuhan proporsi (*squished / wrapped / clipped elements*):
1. **Aturan Geometri Mutlak:** Seluruh elemen interaktif dan informatif atomik (tombol CTA, chip layanan, pil spesialisasi, lencana/badge, dan item topbar) **WAJIB** dikunci geometri fisiknya dengan properti mutlak di dalam kelas komponen `index.css`:
   ```css
   .chip-item, .pill-badge, .btn-action {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     white-space: nowrap;          /* KRITIS: tidak boleh wrap */
     flex-shrink: 0;               /* KRITIS: tidak boleh gepeng/menyusut */
     min-height: 40px;             /* KRITIS: tinggi minimum standar interaktif */
     box-sizing: border-box;
   }
   ```
2. **Aturan Kontainer Pembatas:** Seluruh section utama wajib dibungkus kontainer terpusat yang memiliki `overflow-x-clip` (bukan `hidden` agar tidak merusak `sticky top-0` browser): `max-w-7xl mx-auto w-full px-6 sm:px-12`.

---

## SOP 4: STRICT ATOMIC DECOUPLING & SHADCN V4 PRIMITIVES (`Claude Rule #4`)

1. **Aturan Batas Baris (< 100 Baris):** Satu file = satu komponen = satu tanggung jawab murni. Halaman (`*Page.tsx` di `src/pages/`) HANYA bertindak sebagai orkestrator kontainer (*View Controller*). Seluruh elemen UI wajib dipecah menjadi mikro-komponen atomik terisolasi (`src/components/<domain>/...`) yang **tidak boleh melebihi 100 baris kode bersih**.
2. **Shadcn v4 Primitives Supremacy:** Komponen atomik wajib mengonsumsi komponen dasar dari `src/components/ui/` (`<Button>`, `<Card>`, `<Badge>`, `<Input>`) yang dikombinasikan dengan kelas desain sistem dari `index.css`.
3. **Zero Void Card Architecture (`Anti-Kopong Rule`):** Kartu **WAJIB** menerapkan hierarki natural (`<Card className="portal-card-shell"> -> <CardHeader> -> <CardContent className="flex-1"> -> <CardFooter className="mt-auto">`) tanpa `min-height` statis raksasa agar tidak pernah ada ruang hampa gelap (*dark void*) di tengah kartu.

---

## SOP 5: ZERO-ERROR VERIFICATION PROTOCOL (FASE VALIDASI & AUDIT)

Sebelum melaporkan penyelesaian sub-batch kepada pengguna, eksekusi validasi terminal di dalam folder `justifiqa-frontend`:

```powershell
# Jalankan build TypeScript & Vite serta linter oxlint
cd d:\justificadll\justifiqa-frontend ; npx tsc -b ; npx vite build ; npx oxlint
```

### Kriteria Kelulusan Wajib (*Zero-Omission Checklist*):
- [ ] Output `npx vite build` menunjukkan `✓ built in ...ms` dengan **0 error kompilasi TypeScript (`tsc -b`)**.
- [ ] Output `npx oxlint` menunjukkan **`Found 0 warnings and 0 errors.`**
- [ ] Jika terdapat error/warning linter (misal: `react-hooks/exhaustive-deps` atau type errors), **PERBAIKI LANGSUNG DI SAAT ITU JUGA** sebelum merekam Git commit.
- [ ] Rekam perubahan ke Git dengan format pesan spesifik: `git commit -m "feat(ui): Sub-Batch X.Y - [Deskripsi Perubahan Modular]"`.
- [ ] Berhenti dan minta *sign-off* pengguna sebelum melanjutkan ke sub-batch berikutnya.
