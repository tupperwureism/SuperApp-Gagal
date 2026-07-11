# Kumpulan Kode PlantUML: Sequence Diagrams - Component-Level 5-Lifeline BCE Architecture (Justifiqa & Qualifa)

Dokumen ini berisi kumpulan kode PlantUML untuk seluruh Sequence Diagram pada dua aplikasi mandiri yang **100% terisolasi dan berdiri sendiri (*Siloed Architecture*)**: **Justifiqa** (Domain Hukum) dan **Qualifa** (Domain Psikologi).

Seluruh diagram menerapkan standar arsitektur terdekopel **Boundary-Control-Entity (BCE) 5-Lifeline Supremacy** dan dipetakan **1-to-1 100% dengan Activity Diagram**:
1. **Actor**: Pengguna / Pemicu eksternal.
2. **Boundary Client (`B_FE`)**: Frontend SPA/Mobile App (menangani interaksi UI & client-side DLP regex).
3. **Boundary Server (`B_BE`)**: API Controller / Gateway (`POST/GET /api/v2/...`, memverifikasi auth JWT, validasi skema JSON DTO, dan mengembalikan HTTP Status Code presisi).
4. **Control (`C_Svc`)**: Domain Application Service / Orchestrator (otak logika bisnis, kalkulasi SLA Fair-Clock, verifikasi SIPP/STR, KMS e-Meterai, dan arbitrase Escrow).
5. **Entity (`E_DB`)**: Persistent Storage & Immutable Ledger (PostgreSQL DB + WORM SHA-256 Vault).

Penomoran diagram telah distandarisasi untuk mencerminkan arsitektur terisolasi dan bersesuaian 1-to-1 dengan Activity Diagram: **`SD-J-xx`** untuk Justifiqa dan **`SD-Q-xx`** untuk Qualifa.

---

## Cara Import ke Draw.io
1. Buka Draw.io (`app.diagrams.net`).
2. Pada toolbar bagian atas, klik tombol **+ (Insert)** atau pilih menu **Arrange -> Insert**.
3. Pilih **Advanced -> PlantUML...**.
4. Salin dan tempel kode di bawah ini, lalu klik **Insert**.

---

## BAGIAN I: SEQUENCE DIAGRAMS - APLIKASI MANDIRI JUSTIFIQA (DOMAIN HUKUM)
### SD-J-01: Registrasi Akun Klien & Advokat (J-UC01, J-UC07)
*Sequence diagram alur pendaftaran akun mandiri Klien (verifikasi NIK Dukcapil) dan Advokat/Notaris (verifikasi SIPP Peradi) di platform Justifiqa berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-01).*

```plantuml
@startuml
autonumber
actor "Pengguna (Klien/Advokat)" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "API Controller (Boundary Server)" as B_BE
participant "Auth & KYC Service (Control)" as C_Svc
database "Database & WORM Ledger (Entity)" as E_DB
participant "API Dukcapil / Peradi" as Ext

activate User
User -> B_FE ++ : Buka Halaman Registrasi & Pilih Jenis Akun
B_FE --> User : Tampilkan Formulir Registrasi Spesifik Justifiqa
loop [Maksimal 3x Percobaan Input & Pendaftaran Akun hingga Valid & Unik]
    User -> B_FE : Isi Data Diri & Unggah Dokumen Kredensial (KTP/SIPP)
    B_FE -> B_BE ++ : POST /api/v2/auth/register (RegisterDTO & Files)
    B_BE -> B_BE : Validasi Skema JSON & Ukuran File (< 5MB)

    alt Format & Ukuran File Tidak Valid
        B_BE --> B_FE : 400 Bad Request / 422 Unprocessable Entity
        B_FE --> User : Tampilkan Error "Format/Ukuran File Tidak Valid" & Instruksi Perbaikan
        note over User, B_FE : [REPEAT LOOP: Pengguna memperbaiki format file]
    else Format & Ukuran File Valid
        B_BE -> C_Svc ++ : registerAccount(RegisterDTO)
        C_Svc -> E_DB ++ : checkAccountUniqueness(email, phone, nik)
        E_DB --> C_Svc -- : AccountUniquenessStatus

        alt Email / No HP / NIK Sudah Terdaftar
            C_Svc --> B_BE : AccountConflictException
            B_BE --> B_FE : 409 Conflict (Akun Sudah Terdaftar)
            B_FE --> User : Tampilkan Error "Email/No HP/NIK Sudah Terdaftar"
            note over User, B_FE : [REPEAT LOOP: Pengguna mengganti kredensial]
        else Kredensial Baru & Unik
            alt Jenis Akun = Klien (Pencari Keadilan)
                C_Svc -> Ext ++ : verifyNikDukcapil(nik, nama, tglLahir)
                Ext --> C_Svc -- : NikVerificationResult

                alt NIK Tidak Valid / Tidak Cocok di Dukcapil
                    C_Svc --> B_BE : InvalidNikException
                    B_BE --> B_FE : 422 Unprocessable Entity (NIK Tidak Terdaftar/Cocok)
                    B_FE --> User : Tampilkan Error "NIK Tidak Valid / Tidak Cocok"
                    note over User, B_FE : [REPEAT LOOP: Pengguna memperbaiki NIK]
                else NIK Valid & Cocok
                    C_Svc -> E_DB ++ : saveAccount(ClientEntity, Status: AKTIF)
                    E_DB --> C_Svc -- : AccountCreatedResult
                    C_Svc --> B_BE -- : RegisterResponseDTO(SUCCESS, userId)
                    B_BE --> B_FE -- : 201 Created (JSON {status: "SUCCESS"})
                    B_FE --> User : Arahkan ke Halaman Login Justifiqa
                    note over User, B_BE : [BREAK LOOP: NIK Valid & Akun Klien Berhasil Dibuat]
                end
            else Jenis Akun = Advokat / Notaris
                C_Svc -> E_DB ++ : saveAccount(AdvocateEntity, Status: PENDING_VERIFICATION)
                E_DB --> C_Svc -- : AdvocateCreatedResult
                C_Svc -> C_Svc : dispatchAdminAuditQueue(sippNumber)
                C_Svc --> B_BE -- : RegisterResponseDTO(PENDING_VERIFICATION)
                B_BE --> B_FE -- : 201 Created (JSON {status: "PENDING_VERIFICATION"})
                B_FE --> User : Tampilkan Pesan "Menunggu Audit Admin 1x24 Jam"
                note over User, B_BE : [BREAK LOOP: Akun Advokat Berhasil Disimpan PENDING_VERIFICATION]
            end
        end
    end
end
deactivate User
@enduml
```

### SD-J-02: Login Akun Klien & Advokat (J-UC02, J-UC08)
*Sequence diagram alur masuk (login) independen beserta verifikasi Multi-Factor Authentication (MFA / 2FA) berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-02).*

```plantuml
@startuml
autonumber
actor "Pengguna Justifiqa" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "AuthController (Boundary Server)" as B_BE
participant "AuthenticationService (Control)" as C_Svc
database "UserRepository & WORM (Entity)" as E_DB
participant "SMS / Email Gateway" as SMS

activate User
User -> B_FE ++ : Buka Halaman Login & Input Email/Password
B_FE -> B_BE ++ : POST /api/v2/auth/login (LoginDTO)
B_BE -> B_BE : Validasi Skema Input DTO
B_BE -> C_Svc ++ : authenticateCredentials(email, password)
C_Svc -> E_DB ++ : findByEmail(email)
E_DB --> C_Svc -- : UserEntity

alt Akun Tidak Ditemukan atau Password Salah
    C_Svc --> B_BE : UnauthorizedCredentialsException
    B_BE --> B_FE : 401 Unauthorized (Invalid Email or Password)
    B_FE --> User : Tampilkan Error "Kredensial Tidak Valid"
else Akun Ditemukan & Password Valid
    alt Status Akun = SUSPENDED / PENDING_VERIFICATION
        C_Svc --> B_BE : AccountInactiveException(reason)
        B_BE --> B_FE : 403 Forbidden (Akun Ditangguhkan / Belum Diverifikasi)
        B_FE --> User : Tampilkan Status Akun & Alasan Penangguhan
    else Status Akun = AKTIF
        C_Svc -> C_Svc : generateOtpChallenge()
        C_Svc -> SMS ++ : sendOtpSmsOrEmail(target, otpCode)
        SMS --> C_Svc -- : DeliveryReceipt(OK)
        C_Svc --> B_BE -- : MfaChallengeDTO(challengeId)
        B_BE --> B_FE -- : 200 OK (JSON {mfaRequired: true, challengeId})
        B_FE --> User : Tampilkan Modal Input OTP 2FA

        loop [Maksimal 3x Percobaan Input OTP]
            User -> B_FE : Input Kode OTP 6-Digit
            B_FE -> B_BE ++ : POST /api/v2/auth/verify-mfa (MfaVerifyDTO)
            B_BE -> C_Svc ++ : verifyMfaChallenge(challengeId, otpCode)

            alt Kode OTP Salah / Kadaluarsa
                C_Svc --> B_BE : InvalidOtpException
                B_BE --> B_FE : 400 Bad Request / 401 Unauthorized
                B_FE --> User : Tampilkan Error "Kode OTP Salah/Kadaluarsa"
            else Kode OTP Valid
                C_Svc -> C_Svc : generateAccessAndRefreshTokens(UserEntity)
                C_Svc -> E_DB ++ : recordLoginAuditLog(userId, ip, timestamp)
                E_DB --> C_Svc -- : AuditLoggedOK
                C_Svc --> B_BE -- : AuthTokenDTO(accessToken, refreshToken, role)
                B_BE --> B_FE -- : 200 OK (JSON {accessToken, role})
                B_FE --> User : Arahkan ke Dasbor Utama (Klien/Advokat)
                note over User, B_BE : [BREAK LOOP: Login & Verifikasi MFA Sukses]
            end
        end
    end
end
deactivate User
@enduml
```

### SD-J-03: Konsultasi Hukum & Pembayaran Escrow (J-UC03, J-UC04, J-UC05, J-UC10)
*Sequence diagram alur pemesanan konsultasi hukum, percabangan Legal Triage Gratis 15 Menit vs Konsultasi Premium/Pro (Virtual Token / Split Payment / Escrow Tunai), dan pemantauan SLA Fair-Clock berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-03).*

```plantuml
@startuml
autonumber
actor "Klien Justifiqa" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "ConsultationController (Boundary Server)" as B_BE
participant "ConsultationService (Control)" as C_Svc
database "ConsultationLedger & WORM (Entity)" as E_DB
participant "Midtrans Escrow Gateway" as Pay

activate User
User -> B_FE ++ : Buka Katalog Advokat & Pilih Level Konsultasi (Gratis / Premium / Pro)

alt Level Konsultasi = Gratisan / Legal Triage 15 Menit (Rp 0)
    B_FE -> B_BE ++ : POST /api/v2/consultation/book-triage (TriageDTO)
    B_BE -> C_Svc ++ : createTriageSession(clientJwt)
    C_Svc -> E_DB ++ : allocateTriageAdvocate()
    E_DB --> C_Svc -- : AdvocateAllocated(SUCCESS)
    C_Svc -> E_DB ++ : saveOrderLedger(orderId, amount=0, status=TRIAGE_ACTIVE)
    E_DB --> C_Svc -- : OrderSavedOK
    C_Svc --> B_BE -- : TriageSessionDTO(orderId, roomId)
    B_BE --> B_FE -- : 201 Created (JSON {orderId, roomId, status: "TRIAGE_ACTIVE"})
    B_FE --> User : Buka Ruang Chat E2EE Triage (Countdown Maks 15 Menit)

    opt Klien Membutuhkan Analisis Kasus Lanjutan pasca-Triage
        User -> B_FE : Klik Upgrade ke Sesi Konsultasi Premium / Pro
        B_FE -> B_BE ++ : POST /api/v2/consultation/upgrade (UpgradeDTO)
        B_BE -> C_Svc ++ : initiateUpgradeOrder(orderId, newTier)
        C_Svc --> B_BE -- : UpgradeOrderResultDTO(newOrderId)
        B_BE --> B_FE -- : 200 OK (JSON {newOrderId})
    end

else Level Konsultasi = Konsultasi Premium / Pro Berbayar
    User -> B_FE : Pilih Advokat, Tier, & Slot Jadwal Praktik
    B_FE -> B_BE ++ : POST /api/v2/consultation/book (BookingDTO)
    B_BE -> C_Svc ++ : calculateConsultationFeeAndTokens(clientJwt, advocateId, tier)
    C_Svc -> E_DB ++ : getWalletBalance(userId)
    E_DB --> C_Svc -- : WalletBalance(virtualTokens, welcomeBonus)

    alt Saldo Virtual Token Mencukupi 100% Tagihan
        C_Svc -> E_DB ++ : deductVirtualTokens(userId, totalFee)
        E_DB --> C_Svc -- : DeductedOK
        C_Svc -> E_DB ++ : saveEscrowTransaction(PAID_BY_VIRTUAL_TOKEN, amount=0)
        E_DB --> C_Svc -- : LedgerSavedOK
        C_Svc -> C_Svc : initiateFairClockSlaMonitor(orderId)
        C_Svc --> B_BE : BookingResponseDTO(orderId, status="PAID")
        B_BE --> B_FE : 201 Created (JSON {orderId, status: "PAID"})
        B_FE --> User : Langsung Buka Ruang Obrolan Hukum E2EE (MOCK-J-CL-04)
    else Tagihan Membutuhkan Pembayaran Tunai Rupiah (Split Payment / Full Cash)
        C_Svc -> Pay ++ : createPaymentTransaction(orderId, cashAmountNeeded)
        Pay --> C_Svc -- : PaymentInstructionDTO(vaNumber, expiryTime)
        C_Svc -> E_DB ++ : saveEscrowTransaction(PENDING_PAYMENT, sha256Ref)
        E_DB --> C_Svc -- : LedgerSavedOK
        C_Svc --> B_BE -- : BookingResponseDTO(orderId, vaNumber, status="PENDING")
        B_BE --> B_FE -- : 201 Created (JSON {orderId, vaNumber})
        B_FE --> User : Tampilkan Instruksi Pembayaran VA / QRIS & Countdown Timer

        User -> Pay : Lakukan Pembayaran VA / QRIS Escrow
        Pay -> B_BE ++ : POST /api/v2/webhooks/midtrans (PaymentNotification)
        B_BE -> B_BE : Verifikasi Signature HMAC-SHA512 Webhook
        B_BE -> C_Svc ++ : handleEscrowPaidNotification(orderId)
        C_Svc -> E_DB ++ : updateEscrowStatus(PAID, freezeFunds=true)
        E_DB --> C_Svc -- : EscrowFrozenOK
        C_Svc -> C_Svc : initiateFairClockSlaMonitor(orderId)
        C_Svc --> B_BE -- : WebhookProcessedOK
        B_BE --> Pay -- : HTTP 200 OK

        B_FE -> B_BE ++ : GET /api/v2/consultation/status/{orderId}
        B_BE -> C_Svc ++ : getConsultationStatus(orderId)
        C_Svc -> E_DB ++ : findOrder(orderId)
        E_DB --> C_Svc -- : OrderEntity(PAID)
        C_Svc --> B_BE -- : StatusDTO(PAID, roomId)
        B_BE --> B_FE -- : 200 OK (JSON {status: "PAID", roomId})
        B_FE --> User : Buka Ruang Obrolan Hukum E2EE (MOCK-J-CL-04)
    end
end
deactivate User
@enduml
```

### SD-J-04: Mengatur Status Ketersediaan Praktik Advokat (J-UC09)
*Sequence diagram alur pengaturan slot sesi konsultasi, pengecekan bentrok jadwal, dan validasi kuota harian Advokat berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-04).*

```plantuml
@startuml
autonumber
actor "Advokat Mitra" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "AdvocateScheduleController (Boundary Server)" as B_BE
participant "AdvocateScheduleService (Control)" as C_Svc
database "ScheduleLedger & WORM (Entity)" as E_DB

activate User
User -> B_FE ++ : Buka Kalender & Pilih Slot Waktu Praktik
B_FE -> B_BE ++ : POST /api/v2/advocate/schedule/slots (ScheduleSlotDTO)
B_BE -> B_BE : Validasi Skema & Token JWT Advokat
B_BE -> C_Svc ++ : createOrUpdateScheduleSlot(advocateId, slotsDTO)

alt Slot Waktu Bertabrakan dengan Jadwal Sidang / Sesi Eksisting
    C_Svc --> B_BE : SlotOverlapException
    B_BE --> B_FE : 409 Conflict (Jadwal Bentrok)
    B_FE --> User : Tampilkan Peringatan Jadwal Bentrok
else Batas Maksimal Kuota Harian Terlampaui (> 8 Sesi/Hari)
    C_Svc --> B_BE : DailyQuotaExceededException
    B_BE --> B_FE : 422 Unprocessable Entity (Batas Kuota Harian Tercapai)
    B_FE --> User : Tampilkan Pesan Kuota Penuh
else Slot Valid & Kuota Tersedia
    C_Svc -> E_DB ++ : saveScheduleSlots(advocateId, slotsDTO)
    E_DB --> C_Svc -- : SlotsSavedOK
    C_Svc -> E_DB ++ : logScheduleChangeAudit(advocateId, timestamp)
    E_DB --> C_Svc -- : AuditLoggedOK
    C_Svc --> B_BE -- : ScheduleUpdateResultDTO(SUCCESS)
    B_BE --> B_FE -- : 200 OK (JSON {status: "UPDATED"})
    B_FE --> User : Tampilkan Konfirmasi Kalender Terperbarui
end
deactivate User
@enduml
```

### SD-J-05: Mengunggah Berkas Perkara E2EE Zero-Knowledge (J-UC13)
*Sequence diagram alur pengunggahan dokumen berkas perkara klien terenkripsi AES-GCM lokal di browser berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-05).*

```plantuml
@startuml
autonumber
actor "Klien / Advokat" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "DocumentVaultController (Boundary Server)" as B_BE
participant "EncryptedVaultService (Control)" as C_Svc
database "DocumentVault & WORM Ledger (Entity)" as E_DB

activate User
User -> B_FE ++ : Pilih File Berkas Perkara (.pdf/.docx) & Klik Unggah
B_FE -> B_FE : Validasi Ukuran File (<= 15MB) & Enkripsi Lokal AES-GCM 256-Bit

alt Ukuran File > 15MB atau Format Tidak Didukung
    B_FE --> User : Tampilkan Error "Ukuran File Melebihi Batas / Format Salah"
else File Valid & Berhasil Dienkripsi Lokal
    B_FE -> B_BE ++ : POST /api/v2/documents/upload-encrypted (EncryptedChunkPayload)
    B_BE -> B_BE : Validasi Header JWT & Ciphertext Stream
    B_BE -> C_Svc ++ : storeEncryptedDocument(userId, roomId, cipherBlob, clientSha256)
    C_Svc -> C_Svc : Verifikasi SHA-256 Checksum Ciphertext
    C_Svc -> E_DB ++ : saveEncryptedObject(objectKey, cipherBlob)
    E_DB --> C_Svc -- : ObjectStoredOK
    C_Svc -> E_DB ++ : appendWormAuditLog(docId, clientSha256, timestamp)
    E_DB --> C_Svc -- : WormAuditSavedOK
    C_Svc --> B_BE -- : DocumentUploadDTO(docId, sha256Ref)
    B_BE --> B_FE -- : 201 Created (JSON {docId, status: "ENCRYPTED_STORED"})
    B_FE --> User : Tampilkan Lencana Verifikasi SHA-256 pada Berkas
end
deactivate User
@enduml
```

### SD-J-06: Membuat & Memfinalisasi Draf Kontrak Hukum Bermeterai KMS (J-UC12, J-UC14)
*Sequence diagram alur penyusunan draf hukum, pembubuhan e-Meterai KMS Peruri, dan verifikasi persetujuan klien berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-06).*

```plantuml
@startuml
autonumber
actor "Advokat Mitra" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "DeliverableController (Boundary Server)" as B_BE
participant "DeliverableKmsSigningService (Control)" as C_Svc
database "DocumentLedger & WORM (Entity)" as E_DB
participant "Peruri KMS API" as KMS

activate User
User -> B_FE ++ : Unggah Draf Opini Hukum & Input PIN KMS 6-Digit
B_FE -> B_BE ++ : POST /api/v2/advocate/deliverables/sign-and-upload (SignDeliverableDTO)
B_BE -> B_BE : Validasi Skema DTO & PIN Format
B_BE -> C_Svc ++ : signAndStampDeliverable(advocateId, documentPdf, kmsPin)
C_Svc -> KMS ++ : verifyPinAndApplyEmeterai(documentPdf, kmsPin)
KMS --> C_Svc -- : StampedPdfDocument & StampSerialHash

alt PIN KMS Tidak Valid / Kuota e-Meterai Habis
    C_Svc --> B_BE : KmsSigningFailedException
    B_BE --> B_FE : 422 Unprocessable Entity / 403 Forbidden
    B_FE --> User : Tampilkan Error Pembubuhan e-Meterai Gagal
else Pembubuhan e-Meterai Sukses
    C_Svc -> C_Svc : computeSha256Fingerprint(StampedPdfDocument)
    C_Svc -> E_DB ++ : saveDeliverableDocument(docId, StampedPdfDocument, sha256Fingerprint)
    E_DB --> C_Svc -- : DocumentSavedOK
    C_Svc -> E_DB ++ : unlockClientReviewGate(orderId, docId)
    E_DB --> C_Svc -- : ReviewGateUnlockedOK
    C_Svc --> B_BE -- : SignDeliverableResultDTO(docId, stampSerialHash)
    B_BE --> B_FE -- : 201 Created (JSON {docId, status: "SIGNED_STAMPED"})
    B_FE --> User : Tampilkan Dokumen Ber-Meterai & SHA-256 Lencana

    loop [Siklus Review & Revisi Draf Kontrak (Maks 2x Revisi Klien)]
        User -> B_FE : Klien Memeriksa Dokumen (Setuju / Minta Revisi)
        alt Klien Mengajukan Revisi (< 2x Kuota)
            B_FE -> B_BE ++ : POST /api/v2/deliverables/{docId}/revise (RevisionNoteDTO)
            B_BE -> C_Svc ++ : processRevisionRequest(docId, note)
            C_Svc -> E_DB ++ : updateDocumentStatus(REVISION_REQUESTED)
            E_DB --> C_Svc -- : UpdatedOK
            C_Svc --> B_BE -- : RevisionACK
            B_BE --> B_FE -- : 200 OK
            B_FE --> User : Kirim Notifikasi Perbaikan ke Advokat
        else Klien Menyetujui Dokumen Final
            B_FE -> B_BE ++ : POST /api/v2/deliverables/{docId}/approve
            B_BE -> C_Svc ++ : finalizeDocumentAndUnlockPayout(docId)
            C_Svc -> E_DB ++ : updateDocumentStatus(FINAL_APPROVED_WORM)
            E_DB --> C_Svc -- : FinalizedOK
            C_Svc --> B_BE -- : ApproveACK
            B_BE --> B_FE -- : 200 OK
            B_FE --> User : Dokumen Resmi Final & Pencairan Escrow Diaktifkan
        end
    end
end
deactivate User
@enduml
```

### SD-J-07: Konsultasi Pro Bono SKTM (J-UC15)
*Sequence diagram alur verifikasi NIK DTKS Kemensos dan pembukaan sesi konsultasi Pro Bono Rp 0 bersubsidi penuh berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-07).*

```plantuml
@startuml
autonumber
actor "Klien Pro Bono" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "ProBonoController (Boundary Server)" as B_BE
participant "ProBonoVerificationService (Control)" as C_Svc
database "ConsultationLedger & WORM (Entity)" as E_DB
participant "API Kemensos DTKS" as Kemensos

activate User
User -> B_FE ++ : Pilih Konsultasi Pro Bono & Masukkan NIK / Nomor SKTM
B_FE -> B_BE ++ : POST /api/v2/consultation/pro-bono-verify (ProBonoDTO)
B_BE -> B_BE : Validasi Skema Request NIK
B_BE -> C_Svc ++ : verifyProBonoEligibility(clientJwt, nik, sktmNumber)
C_Svc -> Kemensos ++ : verifyDtksStatus(nik)
Kemensos --> C_Svc -- : DtksVerificationResult

alt NIK Tidak Terdaftar di DTKS / Tidak Memenuhi Syarat Pro Bono
    C_Svc --> B_BE : ProBonoIneligibleException
    B_BE --> B_FE : 403 Forbidden (Tidak Memenuhi Syarat Pro Bono SKTM)
    B_FE --> User : Tampilkan Error & Opsi Konsultasi Escrow Berbayar
else NIK Terverifikasi DTKS (Subsidi Penuh Rp 0)
    C_Svc -> E_DB ++ : allocateProBonoSlot(advocateId, clientJwt)
    E_DB --> C_Svc -- : SlotAllocatedOK
    C_Svc -> E_DB ++ : createConsultationOrder(orderId, amount=0, status=SUBSIDIZED_PROBONO)
    E_DB --> C_Svc -- : OrderSavedOK
    C_Svc --> B_BE -- : ProBonoOrderDTO(orderId, status: "SUBSIDIZED")
    B_BE --> B_FE -- : 201 Created (JSON {orderId, subsidized: true})
    B_FE --> User : Langsung Masuk ke Ruang Obrolan Hukum Pro Bono E2EE
end
deactivate User
@enduml
```

### SD-J-08: Membuat Catatan Sesi IRAC Note Advokat (J-UC11)
*Sequence diagram alur pencatatan opini hukum terstruktur IRAC (Issue, Rule, Analysis, Conclusion) oleh Advokat berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-08).*

```plantuml
@startuml
autonumber
actor "Advokat Mitra" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "IracNoteController (Boundary Server)" as B_BE
participant "LegalNoteService (Control)" as C_Svc
database "CaseNoteVault & WORM (Entity)" as E_DB

activate User
User -> B_FE ++ : Lengkapi Form Catatan IRAC & Klik Simpan
B_FE -> B_BE ++ : POST /api/v2/advocate/notes/irac (IracNoteDTO)
B_BE -> B_BE : Validasi Skema JSON IRAC (issue, rule, analysis, conclusion)
B_BE -> C_Svc ++ : saveIracNote(advocateId, consultationId, iracDTO)
C_Svc -> C_Svc : Verifikasi Akses Advokat pada Konsultasi Aktif/Selesai
C_Svc -> E_DB ++ : saveNoteEntity(consultationId, iracPayload, encrypted=true)
E_DB --> C_Svc -- : NoteSavedOK
C_Svc -> E_DB ++ : appendAuditTrail(noteId, sha256Fingerprint)
E_DB --> C_Svc -- : AuditLoggedOK
C_Svc --> B_BE -- : IracNoteResultDTO(noteId, status: "SAVED")
B_BE --> B_FE -- : 201 Created (JSON {noteId, status: "SAVED"})
B_FE --> User : Tampilkan Konfirmasi Catatan IRAC Tersimpan
deactivate User
@enduml
```

### SD-J-09: Verifikasi Kredensial & Sanitasi Profil/Media 3-Lapisan Advokat Mitra (J-UC16)
*Sequence diagram alur audit berkas lisensi Advokat oleh Admin & pemeriksaan otomatis SIPP MA berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-09).*

```plantuml
@startuml
autonumber
actor "Admin Verifikator Justifiqa" as User
participant "Frontend Admin Portal (Boundary Client)" as B_FE
participant "AdvocateAuditController (Boundary Server)" as B_BE
participant "AdvocateAuditService (Control)" as C_Svc
database "AdvocateRepository & WORM (Entity)" as E_DB
participant "API SIPP Mahkamah Agung" as SIPP

activate User
User -> B_FE ++ : Pilih Berkas Pendaftaran Advokat & Klik Verifikasi SIPP
B_FE -> B_BE ++ : POST /api/v2/admin/advocate/audit (AuditDecisionDTO)
B_BE -> B_BE : Validasi JWT RBAC Admin Verifikator
B_BE -> C_Svc ++ : executeAdvocateAudit(advocateId, sippNumber, decision)
C_Svc -> SIPP ++ : verifySippRegistration(sippNumber)
SIPP --> C_Svc -- : SippStatusResult

alt SIPP Tidak Terdaftar / Expired / Dalam Sanksi Etik
    C_Svc -> E_DB ++ : updateAdvocateStatus(advocateId, REJECTED, reason)
    E_DB --> C_Svc -- : StatusUpdatedOK
    C_Svc --> B_BE : AdvocateAuditRejectedDTO(reason)
    B_BE --> B_FE : 200 OK (JSON {status: "REJECTED"})
    B_FE --> User : Tampilkan Keputusan Penolakan & Kirim Email ke Advokat
else SIPP Valid & Berkas Lengkap
    C_Svc -> E_DB ++ : updateAdvocateStatus(advocateId, VERIFIED_ACTIVE)
    E_DB --> C_Svc -- : StatusUpdatedOK
    C_Svc -> E_DB ++ : appendKycAuditLog(advocateId, adminId, timestamp)
    E_DB --> C_Svc -- : AuditLoggedOK
    C_Svc --> B_BE -- : AdvocateAuditSuccessDTO(advocateId)
    B_BE --> B_FE -- : 200 OK (JSON {status: "VERIFIED_ACTIVE"})
    B_FE --> User : Tampilkan Lencana Terverifikasi pada Profil Advokat
end
deactivate User
@enduml
```

### SD-J-10: Moderasi Akun, Deteksi Fraud Perilaku, & Due Process Suspend Admin Justifiqa (J-UC17)
*Sequence diagram alur investigasi pelanggaran DLP/Etik dan penangguhan akun bersanksi berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-10).*

```plantuml
@startuml
autonumber
actor "Admin Komite Etik Justifiqa" as User
participant "Frontend Admin Portal (Boundary Client)" as B_FE
participant "ModerationController (Boundary Server)" as B_BE
participant "ModerationAndFraudService (Control)" as C_Svc
database "AccountLedger & WORM Audit (Entity)" as E_DB

activate User
User -> B_FE ++ : Buka Laporan Investigasi Fraud & Klik Suspend Akun
B_FE -> B_BE ++ : POST /api/v2/admin/moderation/suspend (SuspendAccountDTO)
B_BE -> B_BE : Validasi Otorisasi Admin Komite Etik
B_BE -> C_Svc ++ : enforceAccountSuspension(targetUserId, reason, evidenceHash)

alt Laporan Fraud Terbukti Sah & Melanggar Ketentuan
    C_Svc -> E_DB ++ : updateAccountStatus(targetUserId, SUSPENDED)
    E_DB --> C_Svc -- : AccountSuspendedOK
    C_Svc -> C_Svc : freezeActiveEscrowAndSessions(targetUserId)
    C_Svc -> E_DB ++ : recordImmutableSanctionWorm(targetUserId, reason, evidenceHash)
    E_DB --> C_Svc -- : WormSanctionRecordedOK
    C_Svc --> B_BE : ModerationResultDTO(status: "SUSPENDED")
    B_BE --> B_FE : 200 OK (JSON {status: "SUSPENDED", wormHash})
    B_FE --> User : Tampilkan Konfirmasi Akun Ditangguhkan & Rekam WORM Audit
else Bukti Tidak Mencukupi (Laporan Palsu / Dismiss)
    C_Svc -> E_DB ++ : recordDismissedInvestigation(targetUserId, reason)
    E_DB --> C_Svc -- : LoggedOK
    C_Svc --> B_BE -- : ModerationResultDTO(status: "DISMISSED")
    B_BE --> B_FE -- : 200 OK (JSON {status: "DISMISSED"})
    B_FE --> User : Tampilkan Status Investigasi Ditutup
end
deactivate User
@enduml
```

### SD-J-11: Pencairan Dana Escrow & Perhitungan PPh 21 Advokat (J-UC19)
*Sequence diagram alur penyelesaian sesi konsultasi, pemotongan PPh 21 otomatis, dan pencairan honor ke rekening Advokat berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-11).*

```plantuml
@startuml
autonumber
actor "Sistem / Advokat Mitra" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "PayoutController (Boundary Server)" as B_BE
participant "PayoutAndTaxService (Control)" as C_Svc
database "FinancialLedger & WORM (Entity)" as E_DB
participant "Bank Payout Gateway" as Bank

activate User
User -> B_FE ++ : Minta Pencairan Honor Konsultasi Selesai
B_FE -> B_BE ++ : POST /api/v2/advocate/payout/request (PayoutRequestDTO)
B_BE -> B_BE : Validasi Token JWT & Sesi Konsultasi Selesai
B_BE -> C_Svc ++ : executeEscrowDisbursement(consultationId, advocateId)
C_Svc -> E_DB ++ : findOrderAndEscrowBalance(consultationId)
E_DB --> C_Svc -- : EscrowBalanceEntity(status: COMPLETED)

alt Sesi Dalam Sengketa / Belum Disetujui Klien
    C_Svc --> B_BE : EscrowFrozenUnderDisputeException
    B_BE --> B_FE : 409 Conflict (Dana Ditahan dalam Investigasi Dispute)
    B_FE --> User : Tampilkan Pesan Dana Escrow Ditahan
else Sesi Selesai Sah & Tidak Ada Sengketa
    C_Svc -> C_Svc : calculatePph21TaxAndPlatformFee(grossAmount)
    C_Svc -> Bank ++ : transferDisbursement(advocateBankAccount, netAmount)
    Bank --> C_Svc -- : TransferReceipt(SUCCESS, trxRef)
    C_Svc -> E_DB ++ : updateLedgerStatus(SETTLED_DISBURSED, trxRef)
    E_DB --> C_Svc -- : LedgerUpdatedOK
    C_Svc -> E_DB ++ : generateTaxWithholdingSlip(advocateId, pph21Amount)
    E_DB --> C_Svc -- : TaxSlipGeneratedOK
    C_Svc --> B_BE -- : PayoutResultDTO(SUCCESS, netAmount, trxRef)
    B_BE --> B_FE -- : 200 OK (JSON {status: "DISBURSED", trxRef})
    B_FE --> User : Tampilkan Konfirmasi Pencairan & Bukti Potong PPh 21
end
deactivate User
@enduml
```

### SD-J-12: Memantau Laporan Keuangan Escrow & Audit WORM (J-UC18)
*Sequence diagram alur ekspor laporan audit finansial transparan berbasis kriptografi WORM SHA-256 berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-12).*

```plantuml
@startuml
autonumber
actor "Admin Auditor Justifiqa" as User
participant "Frontend Admin Portal (Boundary Client)" as B_FE
participant "AuditReportController (Boundary Server)" as B_BE
participant "WormAuditReportingService (Control)" as C_Svc
database "WormFinancialVault (Entity)" as E_DB

activate User
User -> B_FE ++ : Pilih Rentang Waktu & Klik Ekspor Laporan WORM
B_FE -> B_BE ++ : GET /api/v2/admin/audit/financial-worm?startDate=X&endDate=Y
B_BE -> B_BE : Validasi Token JWT RBAC Auditor Keuangan
B_BE -> C_Svc ++ : generateImmutableFinancialReport(startDate, endDate)
C_Svc -> E_DB ++ : queryWormAuditLedger(startDate, endDate)
E_DB --> C_Svc -- : WormAuditLedgerRecords
C_Svc -> C_Svc : verifyChainOfTrustSha256(WormAuditLedgerRecords)
C_Svc --> B_BE -- : FinancialWormReportDTO(records, sha256RootHash)
B_BE --> B_FE -- : 200 OK (JSON {reportData, sha256RootHash})
B_FE --> User : Tampilkan Laporan Keuangan & Verifikasi Root Hash WORM
deactivate User
@enduml
```

### SD-J-13: Memberikan Ulasan & Rating Advokat (J-UC06)
*Sequence diagram alur pemberian ulasan pasca-sesi konsultasi hukum berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-13).*

```plantuml
@startuml
autonumber
actor "Klien Justifiqa" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "RatingController (Boundary Server)" as B_BE
participant "AdvocateRatingService (Control)" as C_Svc
database "RatingAndReviewRepository (Entity)" as E_DB

activate User
User -> B_FE ++ : Isi Bintang Rating (1-5) & Ulasan Kinerja Advokat
B_FE -> B_FE : Client-Side Regex DLP Scanner (Sanitasi Identitas Pribadi)
B_FE -> B_BE ++ : POST /api/v2/consultation/reviews (ReviewDTO)
B_BE -> B_BE : Validasi Skema Rating (1-5) & JWT Klien
B_BE -> C_Svc ++ : submitConsultationReview(clientJwt, orderId, reviewDTO)
C_Svc -> E_DB ++ : checkExistingReview(orderId)
E_DB --> C_Svc -- : ReviewExistenceStatus

alt Ulasan Sudah Pernah Diberikan untuk Sesi Ini
    C_Svc --> B_BE : DuplicateReviewException
    B_BE --> B_FE : 409 Conflict (Ulasan Sudah Ada)
    B_FE --> User : Tampilkan Peringatan Ulasan Sudah Direkam
else Sesi Sah & Ulasan Baru
    C_Svc -> E_DB ++ : saveReview(orderId, advocateId, stars, sanitizedComment)
    E_DB --> C_Svc -- : ReviewSavedOK
    C_Svc -> C_Svc : recalculateAdvocateAverageRating(advocateId)
    C_Svc --> B_BE -- : ReviewResultDTO(SUCCESS)
    B_BE --> B_FE -- : 201 Created (JSON {status: "REVIEW_SAVED"})
    B_FE --> User : Tampilkan Konfirmasi Terima Kasih Atas Ulasan
end
deactivate User
@enduml
```

### SD-J-14: [DILEBUR KE DALAM SD-J-06]
*Catatan Arsitektur:* Alur finalisasi dokumen bermeterai telah dilebur secara utuh ke dalam **SD-J-06** (Sinkron 1-to-1 dengan AD-J-14).

### SD-J-21: Melaporkan Dugaan Pelanggaran Etik Advokat (J-UC21)
*Sequence diagram alur pelaporan whistleblowing / sengketa etika konsultasi hukum berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-21).*

```plantuml
@startuml
autonumber
actor "Klien Whistleblower" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "DisputeController (Boundary Server)" as B_BE
participant "DisputeResolutionService (Control)" as C_Svc
database "DisputeVault & WORM Ledger (Entity)" as E_DB

activate User
User -> B_FE ++ : Lengkapi Form Pelaporan Sengketa/Etik & Unggah Bukti
B_FE -> B_BE ++ : POST /api/v2/disputes/report (DisputeReportDTO)
B_BE -> B_BE : Validasi Skema & Lampiran Bukti
B_BE -> C_Svc ++ : fileDisputeReport(clientJwt, orderId, disputeDTO)
C_Svc -> E_DB ++ : freezeEscrowFunds(orderId, reason="DISPUTE_FILED")
E_DB --> C_Svc -- : EscrowFrozenOK
C_Svc -> E_DB ++ : saveDisputeReport(disputeId, payload, status: UNDER_INVESTIGATION)
E_DB --> C_Svc -- : DisputeSavedOK
C_Svc -> E_DB ++ : recordImmutableWormLog(disputeId, sha256Proof)
E_DB --> C_Svc -- : WormLogRecordedOK
C_Svc --> B_BE -- : DisputeReportResultDTO(disputeId, status: "UNDER_INVESTIGATION")
B_BE --> B_FE -- : 201 Created (JSON {disputeId, status: "UNDER_INVESTIGATION"})
B_FE --> User : Arahkan ke Pusat Pemantauan Dispute (MOCK-J-CL-09)
deactivate User
@enduml
```

### SD-J-22: Mengisi Saldo Dompet Advokat (Top-Up / Cash-In - J-UC22)
*Sequence diagram alur penambahan saldo dompet Advokat untuk pembelian meterai/fitur premium berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-22).*

```plantuml
@startuml
autonumber
actor "Advokat Mitra" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "WalletController (Boundary Server)" as B_BE
participant "AdvocateWalletService (Control)" as C_Svc
database "WalletLedger (Entity)" as E_DB
participant "Payment Gateway" as Pay

activate User
User -> B_FE ++ : Pilih Nominal Top-Up & Metode Pembayaran
B_FE -> B_BE ++ : POST /api/v2/advocate/wallet/topup (TopUpDTO)
B_BE -> C_Svc ++ : initiateTopUpTransaction(advocateId, amount)
C_Svc -> Pay ++ : createPaymentVA(orderId, amount)
Pay --> C_Svc -- : PaymentInstructionDTO(vaNumber)
C_Svc -> E_DB ++ : createPendingTopUpLedger(orderId, amount)
E_DB --> C_Svc -- : LedgerCreatedOK
C_Svc --> B_BE -- : TopUpResponseDTO(orderId, vaNumber)
B_BE --> B_FE -- : 201 Created (JSON {orderId, vaNumber})
B_FE --> User : Tampilkan Instruksi VA Pembayaran Top-Up

User -> Pay : Lakukan Pembayaran VA
Pay -> B_BE ++ : POST /api/v2/webhooks/wallet-topup (PaymentNotification)
B_BE -> C_Svc ++ : processTopUpWebhook(orderId)
C_Svc -> E_DB ++ : updateWalletBalance(advocateId, +amount, status: PAID)
E_DB --> C_Svc -- : WalletBalanceUpdatedOK
C_Svc --> B_BE -- : WebhookACK
B_BE --> Pay -- : HTTP 200 OK
deactivate User
@enduml
```

### SD-J-20: Autentikasi Portal Backoffice Admin Justifiqa (TOTP 2FA - J-UC20)
*Sequence diagram alur login aman Multi-Factor Authentication berbasis TOTP Authenticator untuk Admin Justifiqa berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-J-20).*

```plantuml
@startuml
autonumber
actor "Admin Backoffice" as User
participant "Admin Portal UI (Boundary Client)" as B_FE
participant "AdminAuthController (Boundary Server)" as B_BE
participant "AdminAuthService (Control)" as C_Svc
database "AdminAccountVault & WORM (Entity)" as E_DB

activate User
User -> B_FE ++ : Masukkan Email & Password Admin
B_FE -> B_BE ++ : POST /api/v2/admin/auth/login (AdminLoginDTO)
B_BE -> C_Svc ++ : verifyAdminCredentials(email, password)
C_Svc -> E_DB ++ : findAdminByEmail(email)
E_DB --> C_Svc -- : AdminEntity

alt Kredensial Salah / Akun Terkunci
    C_Svc --> B_BE : InvalidAdminAuthException
    B_BE --> B_FE : 401 Unauthorized
    B_FE --> User : Tampilkan Error Login Admin
else Kredensial Valid
    C_Svc --> B_BE : MfaChallengeDTO(mfaToken)
    B_BE --> B_FE : 200 OK (JSON {mfaRequired: true, mfaToken})
    B_FE --> User : Tampilkan Input Kode TOTP 6-Digit (Google Authenticator)

    User -> B_FE : Input Kode TOTP 6-Digit
    B_FE -> B_BE ++ : POST /api/v2/admin/auth/verify-totp (TotpDTO)
    B_BE -> C_Svc ++ : verifyTotpCode(mfaToken, totpCode)

    alt Kode TOTP Salah
        C_Svc --> B_BE : InvalidTotpException
        B_BE --> B_FE : 401 Unauthorized (Kode TOTP Tidak Valid)
        B_FE --> User : Tampilkan Error Kode TOTP
    else Kode TOTP Sah
        C_Svc -> E_DB ++ : recordAdminAccessLogWorm(adminId, ip, timestamp)
        E_DB --> C_Svc -- : AccessLoggedOK
        C_Svc --> B_BE -- : AdminSessionDTO(accessToken, permissions)
        B_BE --> B_FE -- : 200 OK (JSON {accessToken, permissions})
        B_FE --> User : Masuk ke Dasbor Admin Kepatuhan / Command Center
    end
end
deactivate User
@enduml
```


---

## BAGIAN II: SEQUENCE DIAGRAMS - APLIKASI MANDIRI QUALIFA (DOMAIN PSIKOLOGI)

### SD-Q-01: Registrasi Akun Klien & Psikolog Klinis (Q-UC01, Q-UC07)
*Sequence diagram alur pendaftaran akun Klien Klinis dan Psikolog Klinis (verifikasi STR HIMPSI / SATUSEHAT) berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-01).*

```plantuml
@startuml
autonumber
actor "Pengguna (Klien/Psikolog)" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "QualifaAuthController (Boundary Server)" as B_BE
participant "QualifaKycService (Control)" as C_Svc
database "QualifaDB & WORM Ledger (Entity)" as E_DB
participant "API SATUSEHAT / HIMPSI" as Ext

activate User
User -> B_FE ++ : Buka Registrasi Qualifa & Pilih Jenis Akun
B_FE --> User : Tampilkan Formulir Registrasi Klien/Psikolog
User -> B_FE : Lengkapi Data & Unggah STR/Sertifikat HIMPSI
B_FE -> B_BE ++ : POST /api/v2/auth/register (QualifaRegisterDTO)
B_BE -> B_BE : Validasi Skema JSON & Ukuran Berkas

alt Kredensial Tidak Lengkap / Format Salah
    B_BE --> B_FE : 400 Bad Request
    B_FE --> User : Tampilkan Error Validasi
else Skema Valid
    B_BE -> C_Svc ++ : registerQualifaUser(RegisterDTO)
    C_Svc -> E_DB ++ : checkUniqueness(email, phone)
    E_DB --> C_Svc -- : UniquenessStatus

    alt Akun Sudah Ada
        C_Svc --> B_BE : AccountConflictException
        B_BE --> B_FE : 409 Conflict
        B_FE --> User : Tampilkan Error Akun Sudah Terdaftar
    else Kredensial Unik
        alt Jenis Akun = Klien Konseling
            C_Svc -> E_DB ++ : saveAccount(ClientEntity, AKTIF)
            E_DB --> C_Svc -- : SavedOK
            C_Svc --> B_BE -- : RegisterResult(SUCCESS)
            B_BE --> B_FE -- : 201 Created (JSON {status: "SUCCESS"})
            B_FE --> User : Arahkan ke Login Qualifa
        else Jenis Akun = Psikolog Klinis
            C_Svc -> Ext ++ : verifyStrHimpsi(strNumber)
            Ext --> C_Svc -- : StrVerificationStatus

            alt STR Tidak Valid / Kedaluwarsa di SATUSEHAT
                C_Svc --> B_BE : StrInvalidException
                B_BE --> B_FE : 422 Unprocessable Entity (STR Tidak Terdaftar)
                B_FE --> User : Tampilkan Error STR Tidak Valid
            else STR Sah & Terverifikasi
                C_Svc -> E_DB ++ : saveAccount(PsychologistEntity, PENDING_VERIFICATION)
                E_DB --> C_Svc -- : SavedOK
                C_Svc --> B_BE -- : RegisterResult(PENDING_VERIFICATION)
                B_BE --> B_FE -- : 201 Created (JSON {status: "PENDING_VERIFICATION"})
                B_FE --> User : Tampilkan Pesan Audit STR 1x24 Jam
            end
        end
    end
end
deactivate User
@enduml
```

### SD-Q-02: Login Akun Klien & Psikolog Klinis (Q-UC02, Q-UC08)
*Sequence diagram alur login independen Qualifa dengan verifikasi MFA berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-02).*

```plantuml
@startuml
autonumber
actor "Pengguna Qualifa" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "QualifaAuthController (Boundary Server)" as B_BE
participant "QualifaAuthService (Control)" as C_Svc
database "QualifaUserRepository (Entity)" as E_DB
participant "SMS / Email Gateway" as SMS

activate User
User -> B_FE ++ : Masukkan Email & Password
B_FE -> B_BE ++ : POST /api/v2/auth/login (LoginDTO)
B_BE -> C_Svc ++ : authenticateUser(email, password)
C_Svc -> E_DB ++ : findByEmail(email)
E_DB --> C_Svc -- : UserEntity

alt Password Salah / Akun Tidak Ditemukan
    C_Svc --> B_BE : UnauthorizedException
    B_BE --> B_FE : 401 Unauthorized
    B_FE --> User : Tampilkan Error Login
else Akun Valid & Aktif
    C_Svc -> SMS ++ : sendOtp2FA(userPhone, otpCode)
    SMS --> C_Svc -- : SentOK
    C_Svc --> B_BE -- : MfaChallenge(challengeId)
    B_BE --> B_FE -- : 200 OK (JSON {mfaRequired: true, challengeId})
    B_FE --> User : Tampilkan Modal Input OTP 2FA

    User -> B_FE : Input Kode OTP 6-Digit
    B_FE -> B_BE ++ : POST /api/v2/auth/verify-mfa (VerifyDTO)
    B_BE -> C_Svc ++ : verifyOtp(challengeId, otpCode)
    C_Svc -> E_DB ++ : logSessionAccess(userId)
    E_DB --> C_Svc -- : AccessLoggedOK
    C_Svc --> B_BE -- : SessionTokens(accessToken)
    B_BE --> B_FE -- : 200 OK (JSON {accessToken})
    B_FE --> User : Masuk ke Dasbor Qualifa
end
deactivate User
@enduml
```

### SD-Q-03: Sesi Konseling Klinis & Pembayaran (Q-UC03, Q-UC04, Q-UC05, Q-UC10)
*Sequence diagram alur pemesanan konseling klinis, percabangan Sesi Crisis 119 Gratis vs Konseling Berbayar (Escrow/Voucher), dan pembukaan ruang obrolan E2EE berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-03).*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "CounselingController (Boundary Server)" as B_BE
participant "CounselingService (Control)" as C_Svc
database "QualifaLedger & WORM (Entity)" as E_DB
participant "Payment Gateway" as Pay

activate User
User -> B_FE ++ : Buka Katalog Psikolog & Pilih Mode Konseling

alt Mode = Crisis Counseling Darurat 119 (Gratis Subsidi Rp 0)
    B_FE -> B_BE ++ : POST /api/v2/counseling/book-crisis
    B_BE -> C_Svc ++ : createCrisisSession(clientJwt)
    C_Svc -> E_DB ++ : allocateOnCallPsychologist()
    E_DB --> C_Svc -- : PsychAllocated(SUCCESS)
    C_Svc -> E_DB ++ : saveOrderLedger(orderId, amount=0, status=CRISIS_ACTIVE)
    E_DB --> C_Svc -- : OrderSavedOK
    C_Svc --> B_BE -- : CrisisSessionDTO(orderId, roomId)
    B_BE --> B_FE -- : 201 Created (JSON {orderId, roomId, crisis: true})
    B_FE --> User : Langsung Buka Ruang Obrolan Crisis 119 E2EE
else Mode = Konseling Klinis Berjadwal / Premium
    User -> B_FE : Pilih Psikolog & Jadwal Konseling
    B_FE -> B_BE ++ : POST /api/v2/counseling/book (CounselingBookDTO)
    B_BE -> C_Svc ++ : createCounselingOrder(clientJwt, psychId, slotId)
    C_Svc -> Pay ++ : createVaPayment(orderId, amount)
    Pay --> C_Svc -- : PaymentInstruction(vaNumber)
    C_Svc -> E_DB ++ : saveOrderLedger(orderId, PENDING)
    E_DB --> C_Svc -- : LedgerSavedOK
    C_Svc --> B_BE -- : BookResponse(orderId, vaNumber)
    B_BE --> B_FE -- : 201 Created (JSON {orderId, vaNumber})
    B_FE --> User : Tampilkan Instruksi Pembayaran Konseling

    User -> Pay : Lakukan Pembayaran VA
    Pay -> B_BE ++ : POST /api/v2/webhooks/qualifa-payment (Notification)
    B_BE -> C_Svc ++ : confirmPaymentWebhook(orderId)
    C_Svc -> E_DB ++ : updateOrderStatus(PAID)
    E_DB --> C_Svc -- : UpdatedOK
    C_Svc --> B_BE -- : WebhookACK
    B_BE --> Pay -- : HTTP 200 OK
end
deactivate User
@enduml
```

### SD-Q-04: Mengatur Status Ketersediaan & Buffer 30 Mnt (Q-UC09)
*Sequence diagram alur penjadwalan sesi psikolog dengan penegakan buffer waktu pemulihan mental minimal 30 menit antar-sesi berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-04).*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "PsychScheduleController (Boundary Server)" as B_BE
participant "PsychScheduleService (Control)" as C_Svc
database "QualifaScheduleLedger (Entity)" as E_DB

activate User
User -> B_FE ++ : Atur Slot Sesi & Simpan Jadwal Praktik
B_FE -> B_BE ++ : POST /api/v2/psychologist/schedule/slots (SlotsDTO)
B_BE -> C_Svc ++ : saveScheduleWithRecoveryBuffer(psychId, slotsDTO)

alt Jarak Antar-Sesi < 30 Menit (Pelanggaran Buffer Mental Health)
    C_Svc --> B_BE : RecoveryBufferViolationException
    B_BE --> B_FE : 422 Unprocessable Entity (Jeda Minimal 30 Menit Wajib)
    B_FE --> User : Tampilkan Error Wajib Menyediakan Jeda 30 Menit Antar-Sesi
else Jadwal & Buffer Valid
    C_Svc -> E_DB ++ : updateScheduleSlots(psychId, slotsDTO)
    E_DB --> C_Svc -- : SavedOK
    C_Svc --> B_BE -- : ScheduleResult(SUCCESS)
    B_BE --> B_FE -- : 200 OK (JSON {status: "UPDATED"})
    B_FE --> User : Tampilkan Konfirmasi Jadwal Terperbarui
end
deactivate User
@enduml
```

### SD-Q-05: Mengisi Jurnal Mood Tracker Harian Proactive Alert (Q-UC13)
*Sequence diagram alur pencatatan suasana hati (Mood Tracker) dengan peringatan dini otomatis berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-05).*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "MoodTrackerController (Boundary Server)" as B_BE
participant "MoodAssessmentService (Control)" as C_Svc
database "MoodLedger & AlertQueue (Entity)" as E_DB

activate User
User -> B_FE ++ : Pilih Skor Mood (1-5) & Tulis Jurnal Harian
B_FE -> B_BE ++ : POST /api/v2/mood/tracker (MoodEntryDTO)
B_BE -> C_Svc ++ : recordDailyMood(clientJwt, moodScore, journalText)
C_Svc -> E_DB ++ : saveMoodEntry(userId, score, text, timestamp)
E_DB --> C_Svc -- : EntrySavedOK

alt Mood Score <= 2 Berturut-turut 3 Hari (Crisis Trigger)
    C_Svc -> E_DB ++ : dispatchCrisisAlertQueue(userId)
    E_DB --> C_Svc -- : AlertQueuedOK
    C_Svc --> B_BE : MoodResult(SAVED_WITH_CRISIS_RECOMMENDATION)
    B_BE --> B_FE : 201 Created (JSON {status: "SAVED", triggerCrisisButton: true})
    B_FE --> User : Tampilkan Rekomendasi Bantuan Darurat 119 / Konseling Segera
else Mood Normal (Score > 2)
    C_Svc --> B_BE -- : MoodResult(SAVED_NORMAL)
    B_BE --> B_FE -- : 201 Created (JSON {status: "SAVED"})
    B_FE --> User : Tampilkan Grafik Mood Tracker Harian
end
deactivate User
@enduml
```

### SD-Q-06: Mengakses Streaming Audio Meditasi & Relaksasi (Q-UC14)
*Sequence diagram alur pemutaran konten relaksasi audio berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-06).*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "AudioStreamController (Boundary Server)" as B_BE
participant "RelaxationMediaService (Control)" as C_Svc
database "MediaLibraryVault (Entity)" as E_DB

activate User
User -> B_FE ++ : Pilih Trek Meditasi Audio & Klik Putar
B_FE -> B_BE ++ : GET /api/v2/wellness/audio/{trackId}/stream
B_BE -> C_Svc ++ : authorizeAudioStream(userJwt, trackId)
C_Svc -> E_DB ++ : getTrackSignedUrl(trackId)
E_DB --> C_Svc -- : SignedAudioStreamUrl
C_Svc --> B_BE -- : AudioStreamDTO(url, duration)
B_BE --> B_FE -- : 200 OK (JSON {streamUrl})
B_FE --> User : Mulai Pemutaran Streaming Audio Meditasi
deactivate User
@enduml
```

### SD-Q-07: Mengisi Asesmen DASS-21 & Protokol Crisis Button 119 (Q-UC15)
*Sequence diagram alur pengisian skrining kesehatan mental DASS-21 dan eskalasi tombol darurat berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-07).*

```plantuml
@startuml
autonumber
actor "Klien Qualifa" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "AssessmentController (Boundary Server)" as B_BE
participant "Dass21EvaluationService (Control)" as C_Svc
database "ClinicalAssessmentVault (Entity)" as E_DB

activate User
User -> B_FE ++ : Lengkapi 21 Pertanyaan DASS-21 & Kirim
B_FE -> B_BE ++ : POST /api/v2/assessments/dass21 (DassAnswersDTO)
B_BE -> C_Svc ++ : evaluateDassScore(clientJwt, answers)
C_Svc -> C_Svc : Hitung Skor Depresi, Kecemasan, & Stres
C_Svc -> E_DB ++ : saveAssessmentResult(userId, scoreMap, severity)
E_DB --> C_Svc -- : AssessmentSavedOK

alt Tingkat Keparahan = SEVERE / EXTREMELY SEVERE
    C_Svc --> B_BE : DassResultDTO(scoreMap, severity="SEVERE", enableCrisis119=true)
    B_BE --> B_FE : 201 Created (JSON {severity: "SEVERE", trigger119: true})
    B_FE --> User : Tampilkan Tombol Darurat Crisis 119 & Hotline Kesehatan Mental
else Tingkat Keparahan = MILD / MODERATE / NORMAL
    C_Svc --> B_BE -- : DassResultDTO(scoreMap, severity="MODERATE")
    B_BE --> B_FE -- : 201 Created (JSON {severity: "MODERATE"})
    B_FE --> User : Tampilkan Laporan Hasil Asesmen DASS-21
end
deactivate User
@enduml
```

### SD-Q-08: Membuat Catatan Terapi DAP Note & Worksheet CCBT (Q-UC11, Q-UC12)
*Sequence diagram alur pencatatan medis klinis DAP (Data, Assessment, Plan) secara terenkripsi berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-08).*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "ClinicalNoteController (Boundary Server)" as B_BE
participant "DapNoteService (Control)" as C_Svc
database "MedicalRecordVault & WORM (Entity)" as E_DB

activate User
User -> B_FE ++ : Lengkapi Catatan Medis DAP & Klik Simpan
B_FE -> B_BE ++ : POST /api/v2/psychologist/notes/dap (DapNoteDTO)
B_BE -> C_Svc ++ : saveEncryptedDapNote(psychId, sessionId, dapDTO)
C_Svc -> E_DB ++ : storeClinicalNote(sessionId, dapPayload, encrypted=true)
E_DB --> C_Svc -- : NoteStoredOK
C_Svc -> E_DB ++ : appendClinicalAuditWorm(noteId, sha256Ref)
E_DB --> C_Svc -- : WormLoggedOK
C_Svc --> B_BE -- : DapNoteResult(status: "SAVED_ENCRYPTED")
B_BE --> B_FE -- : 201 Created (JSON {status: "SAVED_ENCRYPTED"})
B_FE --> User : Tampilkan Konfirmasi Catatan Klinis Tersimpan
deactivate User
@enduml
```

### SD-Q-09: Verifikasi STR/HIMPSI & Moderasi Komite Etik Admin Qualifa (Q-UC16, Q-UC17)
*Sequence diagram alur verifikasi kredensial psikolog klinis oleh Admin berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-09).*

```plantuml
@startuml
autonumber
actor "Admin Etik Qualifa" as User
participant "Admin Portal Qualifa (Boundary Client)" as B_FE
participant "PsychAuditController (Boundary Server)" as B_BE
participant "QualifaAuditService (Control)" as C_Svc
database "PsychologistRepository (Entity)" as E_DB
participant "API SATUSEHAT / HIMPSI" as Ext

activate User
User -> B_FE ++ : Periksa Berkas Psikolog & Klik Verifikasi STR
B_FE -> B_BE ++ : POST /api/v2/admin/psychologist/verify (AuditDecisionDTO)
B_BE -> C_Svc ++ : verifyPsychologistCredential(psychId, strNumber)
C_Svc -> Ext ++ : checkStrValidity(strNumber)
Ext --> C_Svc -- : StrStatus(VALID)

alt STR Tidak Valid / Kedaluwarsa
    C_Svc -> E_DB ++ : updatePsychStatus(psychId, REJECTED)
    E_DB --> C_Svc -- : UpdatedOK
    C_Svc --> B_BE : AuditResult(REJECTED)
    B_BE --> B_FE : 200 OK (JSON {status: "REJECTED"})
    B_FE --> User : Tampilkan Keputusan Ditolak
else STR Valid & Berkas Lengkap
    C_Svc -> E_DB ++ : updatePsychStatus(psychId, VERIFIED_ACTIVE)
    E_DB --> C_Svc -- : UpdatedOK
    C_Svc --> B_BE -- : AuditResult(VERIFIED_ACTIVE)
    B_BE --> B_FE -- : 200 OK (JSON {status: "VERIFIED_ACTIVE"})
    B_FE --> User : Tampilkan Lencana Terverifikasi pada Profil Psikolog
end
deactivate User
@enduml
```

### SD-Q-10: Pencairan Honor Psikolog & Perhitungan PPh 21 (Q-UC19)
*Sequence diagram alur pencairan honor konseling pasca-sesi ke rekening psikolog berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-10).*

```plantuml
@startuml
autonumber
actor "Psikolog Klinis" as User
participant "Frontend Qualifa (Boundary Client)" as B_FE
participant "QualifaPayoutController (Boundary Server)" as B_BE
participant "QualifaPayoutService (Control)" as C_Svc
database "FinancialLedger (Entity)" as E_DB
participant "Bank Gateway" as Bank

activate User
User -> B_FE ++ : Ajukan Pencairan Honor Konseling
B_FE -> B_BE ++ : POST /api/v2/psychologist/payout/request (PayoutRequestDTO)
B_BE -> C_Svc ++ : processPsychologistDisbursement(psychId, counselingId)
C_Svc -> Bank ++ : transferFunds(bankAccount, netAmount)
Bank --> C_Svc -- : TransferReceipt(OK)
C_Svc -> E_DB ++ : updateLedgerDisbursed(counselingId, trxRef)
E_DB --> C_Svc -- : UpdatedOK
C_Svc --> B_BE -- : PayoutSuccessDTO(trxRef)
B_BE --> B_FE -- : 200 OK (JSON {status: "DISBURSED", trxRef})
B_FE --> User : Tampilkan Konfirmasi Transfer & Slip Potong PPh 21
deactivate User
@enduml
```

### SD-Q-11: Memantau Laporan Keuangan Qualifa & Audit WORM (Q-UC18)
*Sequence diagram alur pemeriksaan laporan keuangan & integritas hash WORM pada Qualifa berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-11).*

```plantuml
@startuml
autonumber
actor "Auditor Keuangan Qualifa" as User
participant "Admin Portal Qualifa (Boundary Client)" as B_FE
participant "QualifaAuditController (Boundary Server)" as B_BE
participant "QualifaWormReportService (Control)" as C_Svc
database "QualifaWormVault (Entity)" as E_DB

activate User
User -> B_FE ++ : Ekspor Laporan Finansial Qualifa WORM
B_FE -> B_BE ++ : GET /api/v2/admin/qualifa/audit/financial-worm
B_BE -> C_Svc ++ : generateWormReport()
C_Svc -> E_DB ++ : queryLedgerEntries()
E_DB --> C_Svc -- : WormRecords
C_Svc --> B_BE -- : ReportDTO(records, rootHashSha256)
B_BE --> B_FE -- : 200 OK (JSON {reportData, rootHashSha256})
B_FE --> User : Tampilkan Laporan Audit & Validasi SHA-256
deactivate User
@enduml
```

### SD-Q-20: Autentikasi Portal Backoffice Admin Qualifa (TOTP 2FA - Q-UC20)
*Sequence diagram alur login portal backoffice Admin Qualifa dengan otentikasi ganda TOTP berbasis 5-Lifeline BCE (Sinkron 1-to-1 dengan AD-Q-20).*

```plantuml
@startuml
autonumber
actor "Admin Qualifa" as User
participant "Admin Portal UI (Boundary Client)" as B_FE
participant "AdminQualifaAuthController (Boundary Server)" as B_BE
participant "AdminQualifaAuthService (Control)" as C_Svc
database "AdminVault (Entity)" as E_DB

activate User
User -> B_FE ++ : Masukkan Email & Password Admin Qualifa
B_FE -> B_BE ++ : POST /api/v2/admin/qualifa/auth/login (AdminLoginDTO)
B_BE -> C_Svc ++ : verifyAdmin(email, password)
C_Svc --> B_BE : MfaChallengeDTO(mfaToken)
B_BE --> B_FE : 200 OK (JSON {mfaRequired: true, mfaToken})
B_FE --> User : Tampilkan Input Kode TOTP 6-Digit

User -> B_FE : Input Kode TOTP 6-Digit
B_FE -> B_BE ++ : POST /api/v2/admin/qualifa/auth/verify-totp (TotpDTO)
B_BE -> C_Svc ++ : verifyTotpCode(mfaToken, totpCode)
C_Svc -> E_DB ++ : logAdminLoginWorm(adminId, timestamp)
E_DB --> C_Svc -- : LoggedOK
C_Svc --> B_BE -- : AdminSessionDTO(accessToken)
B_BE --> B_FE -- : 200 OK (JSON {accessToken})
B_FE --> User : Masuk ke Dasbor Backoffice Qualifa
deactivate User
@enduml
```
