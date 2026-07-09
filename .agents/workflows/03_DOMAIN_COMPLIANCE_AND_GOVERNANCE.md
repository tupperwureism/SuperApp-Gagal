# Standard Operating Procedure (SOP): Core Governance & Architectural Compliance

Dokumen ini adalah acuan tata kelola mutlak (*Mandatory Governance SOP*) bagi Agen maupun Developer dalam merancang alur aktivitas (`AD`), diagram sekuens (`SD`), dan kode sistem Justifiqa. Seluruh aturan di bawah ini **WAJIB** ditegakkan tanpa kecuali.

---

## 1. Prinsip Persetujuan Ganda (*4-Eyes Principle / Dual-Sign-Off Rule*)
Setiap tindakan administratif yang berdampak hukum atau finansial tinggi **DILARANG KERAS** dieksekusi oleh satu aktor tunggal. Sistem wajib memisahkan peran **Inisiator (*Maker*)** dan **Validator (*Checker*)**:
1. **Penjatuhan Sanksi Suspend Akun (`AD/SD-J-21`)**:
   - *Inisiator*: Admin Legal Investigasi (mengajukan draf sanksi & melampirkan bukti WORM SHA-256).
   - *Validator*: Supervisor Legal / Komite Etik (melakukan *review & final approval/reject*).
2. **Pencairan / Rollback Dana Escrow Sengketa**:
   - *Inisiator*: Admin Keuangan (*Finance Maker*).
   - *Validator*: Manajer Keuangan (*Finance Checker*).

---

## 2. Regulasi Waktu Konsultasi Daring (*Fair-Clock & Smart SLA Engine*)
1. **Active Session Trigger**: Timer konsultasi (45–90 menit) **TIDAK BOLEH BERDETAK** sebelum Advokat mengirimkan respons substansial pertama atas pesan Klien di ruang chat E2EE.
2. **Auto-Pause SLA 5 Menit**: Jika Advokat tidak membalas pesan Klien dalam $> 5$ menit, server otomatis **MENJEDA (*PAUSE*)** timer utama sesi.
3. **AFK Abandonment Penalty**: Jika Advokat tidak aktif selama $> 15$ menit berturut-turut, sistem otomatis mengaktifkan tombol klaim *Refund Escrow 100%* bagi Klien.

---

## 3. Konsultasi Tatap Muka (*Offline Consultation QR-Code Handshake*)
Untuk mencegah *Platform Leakage* (transaksi di luar sistem) pada Tier Premium & Pro:
1. **Lokasi Terverifikasi**: Hanya sah dilakukan di Kantor Hukum resmi terdaftar atau *Legal Lounge* mitra Justifiqa.
2. **Dual QR Handshake**: Sesi dimulai via pemindaian **QR Code Check-in** di lokasi. Pelepasan dana Escrow hanya dipicu setelah pemindaian **QR Code Check-out**.

---

## 4. Akuntansi Terpisah Token Virtual vs. Tunai Escrow (*Dual-Bucket Ledger*)
1. **Uang Tunai Rupiah via Payment Gateway**: Dicatat di Rekening Escrow Sementara $\rightarrow$ Dicairkan ke Saldo Dompet Tunai Advokat (*Cashable Withdrawal*).
2. **Token Virtual (*Welcome Bonus / Uang-Uangan*)**: Dicatat di *Virtual Token Ledger* $\rightarrow$ Dikreditkan ke profil Advokat sebagai **Poin/Token Internal Non-Tunai (*Non-Cashable Reputation / In-App Reward*)**.
