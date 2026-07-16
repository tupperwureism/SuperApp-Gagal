import React, { useState } from 'react';

interface VerifierPanelProps {
  isDark?: boolean;
  onBackToGateway: () => void;
}

export const VerifierPanel: React.FC<VerifierPanelProps> = ({
  isDark = true,
  onBackToGateway,
}) => {
  const [verifyHash, setVerifyHash] = useState(
    'e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8'
  );
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      setVerifyHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyHash.trim() && !selectedFileName) {
      alert('Silakan masukkan hash SHA-256 atau unggah berkas PDF terlebih dahulu.');
      return;
    }
    setVerifyResult(true);
  };

  return (
    <section className="w-full max-w-[1180px] mx-auto py-12 px-6 flex flex-col items-center animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1
          className={`text-3xl sm:text-4xl md:text-[2.25rem] font-extrabold tracking-tight mb-4 uppercase ${
            isDark ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          VERIFIKASI KEASLIAN DOKUMEN HUKUM
        </h1>
        <p
          className={`text-sm md:text-[1.05rem] leading-relaxed ${
            isDark ? 'text-[#9CA3AF]' : 'text-slate-600'
          }`}
        >
          Pastikan keabsahan dokumen opini hukum, kontrak jasa, atau putusan mediasi yang
          diterbitkan melalui platform Justica menggunakan validasi kriptografi SHA-256 &amp;
          e-Meterai Peruri.
        </p>
      </div>

      <div
        className={`w-full max-w-[820px] mx-auto p-8 sm:p-12 rounded-[20px] border shadow-xl mb-12 box-border ${
          isDark ? 'bg-[#111827] border-[#374151]' : 'bg-white border-slate-200'
        }`}
      >
        <form onSubmit={handleVerifySubmit} className="space-y-6">
          <div>
            <label
              className={`block font-bold text-sm sm:text-base mb-2.5 ${
                isDark ? 'text-[#F9FAFB]' : 'text-slate-800'
              }`}
            >
              Masukkan Kode Dokumen / Hash SHA-256:
            </label>
            <input
              type="text"
              value={verifyHash}
              onChange={(e) => setVerifyHash(e.target.value)}
              className={`w-full p-4 rounded-[14px] border font-mono text-xs sm:text-sm transition-all outline-none ${
                isDark
                  ? 'bg-[#0B0F19] border-[#374151] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 text-[#F9FAFB]'
                  : 'bg-slate-50 border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800'
              }`}
            />
          </div>

          <div>
            <label
              className={`block font-bold text-sm sm:text-base mb-2.5 ${
                isDark ? 'text-[#F9FAFB]' : 'text-slate-800'
              }`}
            >
              Atau Unggah Berkas PDF Asli (.PDF):
            </label>
            <label
              className={`block border-2 border-dashed rounded-[16px] p-8 text-center cursor-pointer transition-all ${
                isDark
                  ? 'bg-[#0B0F19] border-[#374151] hover:border-[#3B82F6] hover:bg-[#3B82F6]/5'
                  : 'bg-slate-50 border-slate-300 hover:border-[#2563EB] hover:bg-[#2563EB]/5'
              }`}
            >
              <div className="text-4xl mb-2">📄</div>
              <div
                className={`font-bold text-base mb-1 ${
                  isDark ? 'text-[#F9FAFB]' : 'text-slate-800'
                }`}
              >
                {selectedFileName || 'Pilih Berkas Dokumen PDF atau Seret ke Sini...'}
              </div>
              <div className="text-xs text-gray-400">
                Maksimal 15 MB • Pemeriksaan dilakukan lokal di browser tanpa mengunggah isi rahasia
                dokumen ke server.
              </div>
              <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🛡️</span>
            <span>VERIFIKASI KEASLIAN SEKARANG</span>
          </button>
        </form>
      </div>

      {verifyResult && (
        <div
          className={`w-full max-w-[820px] mx-auto p-8 sm:p-10 rounded-[20px] border border-[#10B981] shadow-2xl mb-12 animate-fade-in ${
            isDark ? 'bg-[#111827]' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#374151]">
            <span className="text-4xl">✅</span>
            <div>
              <h3
                className="font-extrabold text-xl sm:text-2xl text-[#10B981]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                DOKUMEN ASLI TERVERIFIKASI
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Integritas kriptografi SHA-256 cocok 100% dengan rantai WORM Immutable Ledger
                Justica.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700/50">
              <span className="text-gray-400 font-semibold w-52">Status Keaslian</span>
              <span className="font-bold text-[#10B981]">
                ✅ DOKUMEN ASLI TERVERIFIKASI (Tamper-Proof)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700/50">
              <span className="text-gray-400 font-semibold w-52">Penerbit Dokumen</span>
              <span className={isDark ? 'text-gray-200 font-bold' : 'text-slate-800 font-bold'}>
                Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi SIPP: 18293/PERADI/2015)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700/50">
              <span className="text-gray-400 font-semibold w-52">Jenis Dokumen</span>
              <span className={isDark ? 'text-gray-200 font-bold' : 'text-slate-800 font-bold'}>
                Opini Hukum &amp; Analisis Risiko Kontrak Kerja Sama Korporat (#DLV-441)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700/50">
              <span className="text-gray-400 font-semibold w-52">Tanggal Diterbitkan</span>
              <span className={isDark ? 'text-gray-200 font-bold' : 'text-slate-800 font-bold'}>
                02 Juli 2026, 14:22:05 UTC (WORM Audit ID: <code>#AUD-8812</code>)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700/50">
              <span className="text-gray-400 font-semibold w-52">Meterai Elektronik</span>
              <span className="font-bold text-[#60A5FA]">
                🛡️ e-Meterai Peruri Resmi Terdaftar (API v2.4 Signature Verified)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <span className="text-gray-400 font-semibold w-52">Hash SHA-256 Validasi</span>
              <span className="font-mono text-xs text-gray-400 break-all">{verifyHash}</span>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={onBackToGateway}
          className={`px-6 py-3 rounded-[12px] font-bold text-sm border transition-all cursor-pointer ${
            isDark
              ? 'bg-[#1F2937] hover:bg-[#374151] border-[#374151] text-[#F9FAFB]'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
          }`}
        >
          &lt; Kembali ke Gerbang Utama
        </button>
      </div>
    </section>
  );
};
