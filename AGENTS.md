# Justifiqa Agent Guidance

- Mulai navigasi kode dengan `MarkDown/SYMBOLS_MAP.md` dan `rg`; buka `MarkDown/SQL_SECURITY_SYMBOLS.md` hanya untuk tugas RLS/trigger. Kode tetap sumber kebenaran.
- Setelah mengubah export TypeScript atau objek migrasi PostgreSQL, jalankan `node Tools/generate_symbol_map.mjs` dan `node Tools/generate_symbol_map.mjs --check`.
- Setelah mengubah generator, jalankan `node --test --test-isolation=none Tools/symbol_map_lib.test.mjs` (mode in-process diperlukan pada sandbox Windows).
- Gunakan skill secara on-demand sesuai tugas. Jangan memuat seluruh dokumen hukum/desain jika satu referensi terarah cukup.
- Jalankan tes yang paling sempit lebih dahulu. Laporkan ringkasan hasil dan error yang relevan, bukan seluruh log mentah.
- Di batas sub-batch panjang, perbarui checkpoint dari `MarkDown/CONTEXT_CHECKPOINT_TEMPLATE.md`, lalu gunakan `/compact` bila konteks perlu diringkas.
- Jangan mengubah atau membersihkan pekerjaan pengguna yang tidak terkait; stage dan commit hanya file milik tugas aktif.
