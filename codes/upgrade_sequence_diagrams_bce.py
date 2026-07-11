import re
import os

FILE_PATH = r"D:\justificadll\MarkDown\plantuml_sequence_diagrams.md"

def upgrade_file():
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # We will upgrade the header introduction to explain the 5-Lifeline Component-Level BCE Architecture
    old_intro = "# Kumpulan Kode PlantUML: Sequence Diagrams - 100% Siloed Architecture (Justifiqa & Qualifa)"
    new_intro = """# Kumpulan Kode PlantUML: Sequence Diagrams - Component-Level 5-Lifeline BCE Architecture (Justifiqa & Qualifa)

Dokumen ini berisi kumpulan kode PlantUML untuk seluruh Sequence Diagram pada dua aplikasi mandiri yang **100% terisolasi dan berdiri sendiri (*Siloed Architecture*)**: **Justifiqa** (Domain Hukum) dan **Qualifa** (Domain Psikologi). 

Seluruh diagram menerapkan standar arsitektur terdekopel **Boundary-Control-Entity (BCE) 5-Lifeline Supremacy**:
1. **Actor**: Pengguna / Pemicu eksternal.
2. **Boundary Client (`B_FE`)**: Frontend SPA/Mobile App (menangani interaksi UI & client-side DLP regex).
3. **Boundary Server (`B_BE`)**: API Controller / Gateway (`POST/GET /api/v2/...`, memverifikasi auth JWT, validasi skema JSON DTO, dan mengembalikan HTTP Status Code presisi).
4. **Control (`C_Svc`)**: Domain Application Service / Orchestrator (otak logika bisnis, kalkulasi SLA Fair-Clock, verifikasi SIPP/STR, KMS e-Meterai, dan arbitrase Escrow).
5. **Entity (`E_DB`)**: Persistent Storage & Immutable Ledger (PostgreSQL DB + WORM SHA-256 Vault)."""

    content = content.replace(old_intro, new_intro, 1)

    # Dictionary of upgraded diagrams by ID
    upgrades = {}

    upgrades["SD-J-01"] = """@startuml
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
@enduml"""

    upgrades["SD-J-02"] = """@startuml
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
@enduml"""

    upgrades["SD-J-03"] = """@startuml
autonumber
actor "Klien Justifiqa" as User
participant "Frontend Justifiqa (Boundary Client)" as B_FE
participant "ConsultationController (Boundary Server)" as B_BE
participant "Escrow & ChatService (Control)" as C_Svc
database "ConsultationLedger & WORM (Entity)" as E_DB
participant "Midtrans Escrow Gateway" as Pay

activate User
User -> B_FE ++ : Pilih Advokat & Klik Buat Sesi Konsultasi
B_FE -> B_BE ++ : POST /api/v2/consultation/book (BookingDTO)
B_BE -> C_Svc ++ : createEscrowBooking(clientJwt, advocateId, slotId)
C_Svc -> E_DB ++ : checkAdvocateAvailability(advocateId, slotId)
E_DB --> C_Svc -- : SlotStatus(AVAILABLE)
C_Svc -> Pay ++ : createPaymentTransaction(orderId, amount)
Pay --> C_Svc -- : PaymentInstructionDTO(vaNumber, expiryTime)
C_Svc -> E_DB ++ : saveEscrowTransaction(PENDING_PAYMENT, sha256Ref)
E_DB --> C_Svc -- : LedgerSavedOK
C_Svc --> B_BE -- : BookingResponseDTO(orderId, vaNumber)
B_BE --> B_FE -- : 201 Created (JSON {orderId, vaNumber})
B_FE --> User : Tampilkan Instruksi Pembayaran & Countdown Timer

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
deactivate User
@enduml"""

    # We replace SD-J-01, SD-J-02, SD-J-03 first, and let's write a general regex transformer for any remaining diagram blocks to upgrade 4-lifeline to 5-lifeline BCE automatically!
    # Let's perform explicit replacements for SD-J-01, SD-J-02, SD-J-03
    for sd_id, new_puml in upgrades.items():
        pattern = re.compile(rf"(### {sd_id}:.*?\n.*?\n```plantuml\n)@startuml.*?@enduml(\n```)", re.DOTALL)
        content = pattern.sub(rf"\1{new_puml}\2", content)

    # For all other sequence diagrams in the file, let's transform `participant "Frontend ... App" as FE` and `participant "Backend ... Justifiqa/Qualifa" as BE`
    # into Boundary Controller + Control Service + Entity Database
    def upgrade_block(match):
        block = match.group(0)
        # If already upgraded (has Boundary Server), skip
        if "Boundary Server" in block:
            return block
        
        # Replace participants definition
        block = re.sub(
            r'participant "Frontend ([^"]+)" as FE',
            r'participant "Frontend \1 (Boundary Client)" as B_FE\nparticipant "API Controller (Boundary Server)" as B_BE\nparticipant "Domain Service (Control)" as C_Svc',
            block
        )
        block = re.sub(
            r'database "Database ([^"]+)" as DB',
            r'database "Database \1 & WORM Vault (Entity)" as E_DB',
            block
        )
        # Replace FE references
        block = re.sub(r'\bFE\b', 'B_FE', block)
        # Replace DB references
        block = re.sub(r'\bDB\b', 'E_DB', block)
        # Replace BE interactions with B_BE -> C_Svc flow
        block = re.sub(r'B_FE -> BE (\+\+ \: .*?)\n', r'B_FE -> B_BE \1\n    B_BE -> C_Svc ++ : dispatchDomainUseCase()\n', block)
        block = re.sub(r'BE --> B_FE (\-\- \: .*?)\n', r'C_Svc --> B_BE -- : DomainResultDTO\n    B_BE --> B_FE \1\n', block)
        block = re.sub(r'BE --> B_FE (\: .*?)\n', r'B_BE --> B_FE \1\n', block)
        block = re.sub(r'\bBE\b', 'C_Svc', block)
        return block

    content = re.sub(r'@startuml.*?@enduml', upgrade_block, content, flags=re.DOTALL)

    with open(FILE_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully upgraded plantuml_sequence_diagrams.md to Component-Level 5-Lifeline BCE Architecture!")

if __name__ == "__main__":
    upgrade_file()
