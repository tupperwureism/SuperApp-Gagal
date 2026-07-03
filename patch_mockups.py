import os

mockups_dir = r"d:\justificadll\Mockups"

patches = {
    "mockup_auth.html": """
<!-- [TAMBAHAN: Teks Validasi Error di bawah input Email (Demonstrasi)] -->
<div class="error-text" style="color: #ff4d4d; font-size: 12px; margin-top: 10px; margin-bottom: 15px; text-align: center; display: block;">
    <i class="ph ph-warning-circle"></i> Simulasi: Email ini sudah terdaftar di sistem.
</div>

<!-- [TAMBAHAN: Modal Verifikasi OTP] -->
<div id="otpModal" class="modal-overlay" style="display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center;">
    <div class="modal-box" style="background: rgba(30,30,30,0.9); backdrop-filter: blur(10px); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); width: 100%; max-width: 400px; text-align: center;">
        <h3 style="color: #fff; margin-top: 0;">Verifikasi OTP</h3>
        <p style="color: #aaa; font-size: 14px;">Masukkan 4 digit kode yang kami kirim ke email Anda.</p>
        <div class="otp-inputs" style="display: flex; gap: 10px; justify-content: center; margin: 20px 0;">
            <input type="text" maxlength="1" style="width: 50px; height: 50px; text-align: center; font-size: 24px; background: rgba(0,0,0,0.5); border: 1px solid #4facfe; color: #fff; border-radius: 8px;" value="4">
            <input type="text" maxlength="1" style="width: 50px; height: 50px; text-align: center; font-size: 24px; background: rgba(0,0,0,0.5); border: 1px solid #4facfe; color: #fff; border-radius: 8px;" value="2">
            <input type="text" maxlength="1" style="width: 50px; height: 50px; text-align: center; font-size: 24px; background: rgba(0,0,0,0.5); border: 1px solid #4facfe; color: #fff; border-radius: 8px;" value="0">
            <input type="text" maxlength="1" style="width: 50px; height: 50px; text-align: center; font-size: 24px; background: rgba(0,0,0,0.5); border: 1px solid #4facfe; color: #fff; border-radius: 8px;" value="8">
        </div>
        <button style="background: linear-gradient(135deg, #4facfe, #00f2fe); width: 100%; padding: 12px; border: none; border-radius: 8px; color: #fff; font-weight: bold; cursor: pointer;">Verifikasi & Masuk</button>
        <p style="color: #4facfe; font-size: 12px; margin-top: 15px; cursor: pointer;">[Tutup Simulasi OTP]</p>
    </div>
</div>
""",
    "mockup_dashboard_admin.html": """
<!-- [TAMBAHAN: Modal Alasan Penolakan Berkas Mitra] -->
<div id="rejectModal" class="modal-overlay" style="display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center;">
    <div class="modal-box" style="background: #1e1e24; padding: 25px; border-radius: 12px; border: 1px solid #ff4757; width: 400px; box-shadow: 0 10px 30px rgba(255, 71, 87, 0.2);">
        <h3 style="color: #ff4757; margin-top: 0;"><i class="ph ph-warning-octagon"></i> Tolak Berkas Mitra</h3>
        <label style="color: #ccc; font-size: 14px;">Masukkan alasan spesifik penolakan:</label>
        <textarea rows="4" style="width: 100%; box-sizing: border-box; margin-top: 10px; background: #2f3542; border: 1px solid #57606f; color: #fff; padding: 10px; border-radius: 6px;" placeholder="Misal: Nomor lisensi STR tidak terdaftar..."></textarea>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button style="flex: 1; padding: 10px; background: #ff4757; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Kirim Penolakan</button>
            <button style="flex: 1; padding: 10px; background: #57606f; color: #fff; border: none; border-radius: 6px; cursor: pointer;" onclick="this.parentElement.parentElement.parentElement.style.display='none'">Batal</button>
        </div>
    </div>
</div>

<!-- [TAMBAHAN: Floating Action Button - Simulasi Unsuspend] -->
<div style="position: fixed; bottom: 30px; left: 30px; z-index: 999; background: #2f3542; padding: 15px; border-radius: 10px; border-left: 4px solid #2ed573; color: white;">
    <p style="margin: 0 0 10px 0; font-size: 12px; color: #a4b0be;">Aksi Tambahan (Audit)</p>
    <button class="btn-action" style="background: rgba(46, 213, 115, 0.2); color: #2ed573; border: 1px solid #2ed573; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">
        <i class="ph ph-check-circle"></i> Unsuspend Akun Terpilih
    </button>
</div>
""",
    "mockup_chat_room.html": """
<!-- [TAMBAHAN: Modal Konfirmasi Keluar Sepihak] -->
<div id="exitConfirmModal" class="modal-overlay" style="display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 2000; align-items: center; justify-content: center;">
    <div class="modal-box" style="background: rgba(30,30,40,0.95); padding: 30px; border-radius: 12px; border: 1px solid #ff4d4d; width: 350px; text-align: center; box-shadow: 0 10px 30px rgba(255, 77, 77, 0.2);">
        <i class="ph ph-warning-octagon" style="font-size: 48px; color: #ff4d4d;"></i>
        <h3 style="color: #fff;">Keluar Ruang Chat?</h3>
        <p style="color: #ccc; font-size: 14px;">Jika Anda keluar sekarang, sesi dianggap selesai sepihak. <strong>Tidak ada pengembalian dana (Refund).</strong></p>
        <div style="display: flex; gap: 10px; margin-top: 25px;">
            <button style="flex: 1; background: #ff4d4d; border: none; color: #fff; padding: 12px; border-radius: 8px; cursor: pointer;">Ya, Akhiri</button>
            <button style="flex: 1; background: #57606f; border: none; color: #fff; padding: 12px; border-radius: 8px; cursor: pointer;" onclick="this.parentElement.parentElement.parentElement.style.display='none'">Batal</button>
        </div>
    </div>
</div>
""",
    "mockup_modul_hukum.html": """
<!-- [TAMBAHAN: Form Pengajuan Pro Bono & SKTM (Mengambang untuk demonstrasi)] -->
<div class="pro-bono-section" style="position: fixed; bottom: 20px; right: 20px; width: 350px; background: rgba(20, 20, 25, 0.95); border: 1px dashed #4facfe; padding: 25px; border-radius: 12px; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px);">
    <h3 style="color: #4facfe; display: flex; align-items: center; gap: 10px; margin-top: 0; font-size: 16px;">
        <i class="ph ph-scales"></i> Pengajuan Pro Bono
    </h3>
    <p style="color: #aaa; font-size: 12px; line-height: 1.4;">Subsidi 100% untuk klien kurang mampu. Harap unggah Surat Keterangan Tidak Mampu (SKTM).</p>
    <div class="upload-area" style="border: 2px dashed #57606f; background: #2f3542; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: 0.3s;">
        <i class="ph ph-upload-simple" style="font-size: 24px; color: #dfe4ea;"></i>
        <p style="color: #dfe4ea; margin: 10px 0 0; font-size: 12px;">Klik atau seret SKTM ke sini</p>
    </div>
    <button style="width: 100%; background: #4facfe; color: #fff; border: none; padding: 10px; border-radius: 8px; margin-top: 15px; font-weight: bold; cursor: pointer;" onclick="this.parentElement.style.display='none'">Ajukan Tiket Pro Bono</button>
</div>
""",
    "mockup_payment_gateway.html": """
<!-- [TAMBAHAN: Layer Status Pembayaran Gagal/Expired] -->
<div id="paymentFailedState" style="display: flex; position: fixed; inset: 0; background: rgba(18, 18, 18, 0.95); z-index: 9999; align-items: center; justify-content: center;">
    <div class="payment-failed-state" style="background: rgba(255, 71, 87, 0.1); border: 1px solid #ff4757; border-radius: 15px; padding: 40px; text-align: center; max-width: 400px; box-shadow: 0 10px 40px rgba(255, 71, 87, 0.2);">
        <div style="width: 80px; height: 80px; background: #ff4757; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="ph ph-x" style="font-size: 40px; color: #fff;"></i>
        </div>
        <h2 style="color: #ff4757; margin-bottom: 10px;">Transaksi Expired / Ditolak</h2>
        <p style="color: #ccc; line-height: 1.5; font-size: 14px;">Waktu pembayaran Anda telah habis, atau saldo metode pembayaran tidak mencukupi.</p>
        <button style="background: #2f3542; color: #fff; border: 1px solid #57606f; padding: 12px 25px; border-radius: 8px; margin-top: 20px; font-weight: bold; cursor: pointer; width: 100%;" onclick="document.getElementById('paymentFailedState').style.display='none'">
            <i class="ph ph-arrow-counter-clockwise"></i> Coba Metode Pembayaran Lain
        </button>
    </div>
</div>
""",
    "mockup_modul_medis.html": """
<!-- [TAMBAHAN: Card Peringatan Obat Kosong] -->
<div class="stock-warning-card" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 500px; background: rgba(255, 165, 2, 0.15); backdrop-filter: blur(10px); border-left: 4px solid #ffa502; border-right: 1px solid rgba(255,165,2,0.3); border-top: 1px solid rgba(255,165,2,0.3); border-bottom: 1px solid rgba(255,165,2,0.3); padding: 15px 20px; border-radius: 8px; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <h4 style="color: #ffa502; margin: 0 0 5px; display: flex; align-items: center; gap: 8px; font-size: 16px;">
        <i class="ph ph-warning"></i> Stok Tidak Tersedia
    </h4>
    <p style="color: #d1d8e0; font-size: 13px; margin: 0; line-height: 1.4;">Obat <strong>Amoxicillin 500mg</strong> saat ini kosong di seluruh apotek mitra dalam radius 10 km dari lokasi Anda.</p>
    <div style="margin-top: 15px; display: flex; gap: 10px;">
        <button style="background: #ffa502; border: none; color: #2f3542; font-weight: bold; padding: 8px 15px; border-radius: 5px; font-size: 12px; cursor: pointer;" onclick="this.parentElement.parentElement.style.display='none'">Pesan Nanti</button>
        <button style="background: transparent; border: 1px solid #ffa502; color: #ffa502; padding: 8px 15px; border-radius: 5px; font-size: 12px; cursor: pointer;">Cari Alternatif Generik</button>
    </div>
</div>
""",
    "mockup_dashboard_mitra.html": """
<!-- [TAMBAHAN: Modal/Toast Permintaan Konsultasi Masuk] -->
<div id="incomingConsultation" class="incoming-toast" style="position: fixed; bottom: 30px; right: 30px; background: rgba(30, 39, 46, 0.95); border-left: 5px solid #0fb9b1; padding: 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 320px; z-index: 9999;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
            <h4 style="color: #0fb9b1; margin: 0 0 5px;">Permintaan Konsultasi Baru!</h4>
            <p style="color: #fff; margin: 0; font-size: 14px;"><strong>Bpk. Klien Dummy</strong> (Umur: 32)</p>
            <p style="color: #a4b0be; margin: 5px 0 0; font-size: 12px;">Keluhan: Sakit kepala sebelah kiri sejak pagi...</p>
        </div>
        <div class="ring-indicator" style="width: 12px; height: 12px; background: #0fb9b1; border-radius: 50%; box-shadow: 0 0 10px #0fb9b1; animation: pulse 1.5s infinite;"></div>
    </div>
    <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button style="flex: 2; background: #0fb9b1; color: #fff; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;" onclick="this.parentElement.parentElement.style.display='none'">
            <i class="ph ph-check"></i> Terima
        </button>
        <button style="flex: 1; background: #485460; color: #fff; border: none; padding: 10px; border-radius: 6px; cursor: pointer;" onclick="this.parentElement.parentElement.style.display='none'">Tolak</button>
    </div>
</div>
<style>
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(15, 185, 177, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(15, 185, 177, 0); }
    100% { box-shadow: 0 0 0 0 rgba(15, 185, 177, 0); }
}
</style>
"""
}

for filename, patch_html in patches.items():
    filepath = os.path.join(mockups_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Inject just before </body>
        if "</body>" in content:
            new_content = content.replace("</body>", f"{patch_html}\n</body>")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Patched: {filename}")
        else:
            print(f"Warning: </body> not found in {filename}")
    else:
        print(f"Error: {filename} does not exist.")

print("Patching complete.")
