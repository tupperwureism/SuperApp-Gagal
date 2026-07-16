import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const GatewayPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'gateway' | 'verifier'>('gateway');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchPreview, setShowSearchPreview] = useState(false);
  const [verifyHash, setVerifyHash] = useState('e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 2) {
      setShowSearchPreview(true);
    } else {
      setShowSearchPreview(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchPreview(true);
    } else {
      alert('Silakan ketik kendala hukum Anda terlebih dahulu (misal: Perdata, Ketenagakerjaan, Sengketa Bisnis).');
    }
  };

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

  const isDark = themeMode === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F19] text-[#F9FAFB]' : 'bg-[#F3F4F6] text-[#111827]'
      }`}
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* TOP NAVIGATION BAR (Exact 1-to-1 with JUSTICA_Proto_1.1 lines 67-147) */}
      <header
        className={`sticky top-0 z-50 px-6 md:px-12 py-[1.15rem] border-b transition-colors flex items-center justify-between shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] ${
          isDark
            ? 'bg-[#111827]/95 border-[#374151] backdrop-blur-md'
            : 'bg-white/95 border-slate-200 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1180px] mx-auto w-full flex items-center justify-between">
          <div
            onClick={() => {
              setActiveScreen('gateway');
              setVerifyResult(null);
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <span
              className="font-extrabold text-2xl md:text-[1.45rem] tracking-tight transition-transform group-hover:scale-[1.02]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ⚖️ JUSTICA
            </span>
            <span
              className={`hidden sm:flex items-center text-xs md:text-[0.85rem] font-medium border-l-2 pl-3.5 ${
                isDark ? 'text-[#9CA3AF] border-[#374151]' : 'text-slate-500 border-slate-300'
              }`}
            >
              Platform Konsultasi &amp; Layanan Hukum Profesional
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleToggleTheme}
              className={`px-4 py-[0.55rem] rounded-[12px] text-xs md:text-[0.85rem] font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1F2937] border-[#374151] hover:border-[#3B82F6] hover:bg-[#374151] text-[#F9FAFB]'
                  : 'bg-slate-100 border-slate-300 hover:border-[#2563EB] hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>{isDark ? '☾' : '☀'}</span>
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            {activeScreen === 'gateway' ? (
              <button
                type="button"
                onClick={() => {
                  setActiveScreen('verifier');
                  setVerifyResult(null);
                }}
                className="px-4.5 py-[0.55rem] rounded-[12px] text-xs md:text-[0.85rem] font-bold bg-[#8B5CF6]/15 border border-[#8B5CF6] hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>🛡️ Verifikasi Dokumen SHA-256</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActiveScreen('gateway');
                  setVerifyResult(null);
                }}
                className={`px-4.5 py-[0.55rem] rounded-[12px] text-xs md:text-[0.85rem] font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-transparent border-[#374151] hover:bg-[#1F2937] text-[#F9FAFB]'
                    : 'bg-transparent border-slate-300 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <span>&lt; Kembali ke Beranda</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==================== SCREEN 1: ROOT GATEWAY (Exact 1-to-1 with JUSTICA_Proto_1.1 lines 172-404 & 540-640) ==================== */}
      {activeScreen === 'gateway' && (
        <main className="flex-1 max-w-[1180px] mx-auto w-full px-6 sm:px-8 py-16 flex flex-col justify-center animate-fade-in">
          {/* HERO SECTION */}
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4 uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: isDark
                  ? 'linear-gradient(135deg, #F9FAFB 0%, #60A5FA 100%)'
                  : 'linear-gradient(135deg, #111827 0%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SOLUSI HUKUM TERPERCAYA UNTUK ANDA
            </h1>
            <p
              className={`text-base md:text-[1.15rem] leading-[1.7] max-w-[760px] mx-auto ${
                isDark ? 'text-[#9CA3AF]' : 'text-slate-600'
              }`}
            >
              Konsultasikan masalah hukum Anda bersama advokat terverifikasi resmi Mahkamah Agung
              dengan mudah, transparan, dan dilindungi kerahasiaan absolut.
            </p>
          </div>

          {/* SEARCH BAR (Exact lines 198-258 & 547-554) */}
          <div className="max-w-[880px] mx-auto w-full mb-16 relative">
            <form
              onSubmit={handleSearchSubmit}
              className={`flex flex-col sm:flex-row items-center gap-3 p-[0.65rem] rounded-[16px] border-2 transition-all shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] ${
                isDark
                  ? 'bg-[#111827] border-[#374151] focus-within:border-[#3B82F6] focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]'
                  : 'bg-white border-slate-200 focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]'
              }`}
            >
              <div className="flex items-center gap-3.5 px-3.5 flex-1 w-full">
                <span className={`text-xl ${isDark ? 'text-[#9CA3AF]' : 'text-slate-400'}`}>🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  placeholder="Kendala hukum apa yang sedang Anda hadapi? (misal: Perdata, Ketenagakerjaan, Bisnis)..."
                  className={`w-full bg-transparent py-2 text-sm sm:text-[1.05rem] font-normal focus:outline-none ${
                    isDark
                      ? 'text-[#F9FAFB] placeholder-[#9CA3AF]'
                      : 'text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-[0.85rem] rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm sm:text-[0.95rem] tracking-wide flex items-center justify-center gap-2 transition-all shadow-md flex-shrink-0 cursor-pointer active:scale-95"
              >
                <span>CARI ADVOKAT</span>
                <span>→</span>
              </button>
            </form>

            {/* DYNAMIC SEARCH PREVIEW SIMULATION */}
            {showSearchPreview && (
              <div
                className={`absolute top-full left-0 right-0 mt-3 p-6 rounded-[16px] border shadow-2xl z-40 animate-fade-in ${
                  isDark
                    ? 'bg-[#111827] border-[#3B82F6]'
                    : 'bg-white border-[#2563EB] shadow-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#374151]">
                  <span className="font-extrabold text-sm md:text-[0.95rem] text-[#60A5FA]">
                    ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSearchPreview(false)}
                    className="text-xs text-[#9CA3AF] hover:text-white cursor-pointer font-semibold"
                  >
                    ✖ Tutup Preview
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-[12px] border flex flex-col justify-between gap-3 ${
                      isDark
                        ? 'bg-[#0B0F19] border-[#374151]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-[0.95rem]">
                        <span>Dr. Mahendra Kusuma, S.H., M.H.</span>
                        <span className="text-[#10B981] text-xs font-bold">● ONLINE</span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-[#9CA3AF]' : 'text-slate-500'
                        }`}
                      >
                        Spesialisasi: Hukum Perdata &amp; Sengketa Bisnis • SIPP MA Terverifikasi
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="font-extrabold text-sm text-[#60A5FA]">
                        Rp 350.000 / sesi
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'Perdata')}`)
                        }
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Pilih Advokat →
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-[12px] border flex flex-col justify-between gap-3 ${
                      isDark
                        ? 'bg-[#0B0F19] border-[#374151]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-[0.95rem]">
                        <span>Adv. Rina Kartika, S.H., M.Kn.</span>
                        <span className="text-[#10B981] text-xs font-bold">● ONLINE</span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-[#9CA3AF]' : 'text-slate-500'
                        }`}
                      >
                        Spesialisasi: Hukum Ketenagakerjaan &amp; PHK • Kuota Pro Bono Tersedia
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="font-extrabold text-sm text-[#10B981]">
                        PRO BONO (Rp 0)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'Pro Bono')}`)
                        }
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Pilih Advokat →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PORTAL SELECTION (Strictly 2 Cards Side-by-Side — EXACT lines 259-368 & 588-620) */}
          <div className="mb-18">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`h-px w-20 ${isDark ? 'bg-[#374151]' : 'bg-slate-300'}`} />
              <h2
                className="text-center font-extrabold text-base md:text-[1.35rem] uppercase tracking-[0.08em] text-[#F9FAFB]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                PILIH AKSES PORTAL
              </h2>
              <div className={`h-px w-20 ${isDark ? 'bg-[#374151]' : 'bg-slate-300'}`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1180px] mx-auto">
              {/* CARD 1: KLIEN HUKUM */}
              <div
                className={`relative overflow-hidden rounded-[16px] border p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] min-h-[420px] ${
                  isDark
                    ? 'bg-[#111827] border-[#374151] hover:border-[#3B82F6] hover:-translate-y-1'
                    : 'bg-white border-slate-200 hover:border-[#2563EB] hover:-translate-y-1'
                }`}
              >
                {/* Top indicator stripe (height 5px) */}
                <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />

                <div>
                  <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.08em] mb-5 bg-[#3B82F6]/15 text-[#60A5FA] border border-[#2563EB] w-fit">
                    👤 PORTAL PENCARI KEADILAN
                  </span>
                  <h3
                    className="text-2xl md:text-[1.65rem] font-extrabold mb-4 text-[#F9FAFB]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    KLIEN HUKUM
                  </h3>
                  <p
                    className={`text-sm md:text-[0.98rem] leading-[1.7] mb-9 font-normal ${
                      isDark ? 'text-[#9CA3AF]' : 'text-slate-600'
                    }`}
                  >
                    Temukan advokat berlisensi, mulai konsultasi hukum daring (E2EE) maupun luring,
                    tangani sengketa, atau ajukan bantuan hukum Pro Bono secara aman dengan
                    perlindungan Escrow.
                  </p>
                </div>

                <Link
                  to="/client/auth"
                  className="w-full py-[1.05rem] px-6 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base text-center transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Masuk / Daftar sebagai Klien</span>
                  <span>→</span>
                </Link>
              </div>

              {/* CARD 2: MITRA ADVOKAT */}
              <div
                className={`relative overflow-hidden rounded-[16px] border p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] min-h-[420px] ${
                  isDark
                    ? 'bg-[#111827] border-[#374151] hover:border-[#10B981] hover:-translate-y-1'
                    : 'bg-white border-slate-200 hover:border-[#10B981] hover:-translate-y-1'
                }`}
              >
                {/* Top indicator stripe (height 5px) */}
                <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#10B981] to-[#059669]" />

                <div>
                  <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.08em] mb-5 bg-[#10B981]/15 text-[#10B981] border border-[#10B981] w-fit">
                    ⚖️ PORTAL PRAKTISI HUKUM
                  </span>
                  <h3
                    className="text-2xl md:text-[1.65rem] font-extrabold mb-4 text-[#F9FAFB]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    MITRA ADVOKAT
                  </h3>
                  <p
                    className={`text-sm md:text-[0.98rem] leading-[1.7] mb-9 font-normal ${
                      isDark ? 'text-[#9CA3AF]' : 'text-slate-600'
                    }`}
                  >
                    Kelola praktik profesional Anda, verifikasi SIPP Mahkamah Agung RI, jadwalkan sesi
                    konsultasi, terbitkan opini hukum ber-eMeterai SHA-256, dan cairkan honor
                    honorarium via BI-FAST.
                  </p>
                </div>

                <Link
                  to="/advocate/auth"
                  className={`w-full py-[1.05rem] px-6 rounded-[12px] font-bold text-base text-center transition-all flex items-center justify-center gap-3 border active:scale-95 cursor-pointer ${
                    isDark
                      ? 'bg-[#1F2937] hover:bg-[#374151] border-[#374151] hover:border-[#10B981] text-[#F9FAFB] hover:text-[#10B981]'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-[#10B981] text-slate-800 hover:text-[#10B981]'
                  }`}
                >
                  <span>Masuk / Daftar Mitra Advokat</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ADVANTAGES STRIP (Exact lines 370-397 & 622-637) */}
          <div
            className={`max-w-[1180px] mx-auto w-full p-6 sm:py-6 sm:px-8 rounded-[12px] border flex flex-col sm:flex-row justify-around items-center gap-6 text-center transition-all shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] ${
              isDark ? 'bg-[#111827] border-[#374151]' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2.5 font-bold text-sm md:text-[0.92rem] text-[#F9FAFB]">
              <span className="text-[#60A5FA] text-xl">🛡️</span>
              <span>Advokat Berlisensi Resmi (SIPP MA Terverifikasi)</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 font-bold text-sm md:text-[0.92rem] text-[#F9FAFB]">
              <span className="text-[#60A5FA] text-xl">🔒</span>
              <span>Rekening Bersama (Escrow ACID) Aman Terjamin</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 font-bold text-sm md:text-[0.92rem] text-[#F9FAFB]">
              <span className="text-[#60A5FA] text-xl">🗝️</span>
              <span>Kerahasiaan Sesi Terjamin (Zero-Knowledge E2EE)</span>
            </div>
          </div>
        </main>
      )}

      {/* ==================== SCREEN 2: PORTAL VERIFIKASI DOKUMEN (Exact lines 646-700) ==================== */}
      {activeScreen === 'verifier' && (
        <main className="flex-1 max-w-[1180px] mx-auto w-full px-6 sm:px-8 py-16 flex flex-col justify-center animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1
              className="text-3xl sm:text-4xl md:text-[2.25rem] font-extrabold tracking-tight mb-4 uppercase text-[#F9FAFB]"
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

          {/* VERIFICATION FORM (`.verify-box` exact lines 656-675) */}
          <div
            className={`max-w-[760px] mx-auto w-full p-10 rounded-[16px] border shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] mb-14 ${
              isDark ? 'bg-[#111827] border-[#374151]' : 'bg-white border-slate-200'
            }`}
          >
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <div>
                <label className="block font-bold text-sm md:text-base mb-2.5">
                  Masukkan Kode Dokumen / Hash SHA-256:
                </label>
                <input
                  type="text"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  placeholder="e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6..."
                  className={`w-full px-4.5 py-3.5 rounded-[12px] border font-mono text-sm md:text-base transition-all focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 ${
                    isDark
                      ? 'bg-[#0B0F19] border-[#374151] text-white placeholder-[#9CA3AF]'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-sm md:text-base mb-2.5">
                  Atau Unggah Berkas PDF Asli (.PDF):
                </label>
                <div
                  onClick={() => document.getElementById('hidden-file-input-page')?.click()}
                  className={`p-8 rounded-[12px] border-2 border-dashed text-center cursor-pointer transition-all ${
                    isDark
                      ? 'bg-[#0B0F19] border-white/15 hover:border-[#3B82F6] hover:bg-[#3B82F6]/5'
                      : 'bg-slate-50 border-slate-300 hover:border-[#3B82F6] hover:bg-blue-50/40'
                  }`}
                >
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-bold text-base mb-1">
                    {selectedFileName || 'Pilih Berkas Dokumen PDF atau Seret ke Sini...'}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                    Maksimal 15 MB • Pemeriksaan dilakukan lokal di browser tanpa mengunggah isi rahasia
                    dokumen ke server.
                  </div>
                  <input
                    type="file"
                    id="hidden-file-input-page"
                    style={{ display: 'none' }}
                    accept=".pdf"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-[1.1rem] rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base text-center flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>🛡️ VERIFIKASI KEASLIAN SEKARANG</span>
              </button>
            </form>
          </div>

          {/* RESULT CARD (Exact lines 678-715) */}
          {verifyResult && (
            <div
              className={`max-w-[760px] mx-auto w-full p-10 rounded-[16px] border border-[#10B981] shadow-2xl animate-fade-in ${
                isDark ? 'bg-[#111827]' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#374151]">
                <div className="text-4xl">✅</div>
                <div>
                  <h3
                    className="font-extrabold text-xl md:text-[1.4rem] text-[#10B981]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    DOKUMEN ASLI TERVERIFIKASI
                  </h3>
                  <p className={`text-xs md:text-[0.88rem] ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                    Integritas kriptografi SHA-256 cocok 100% dengan rantai WORM Immutable Ledger Justica.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <tbody className="divide-y divide-[#374151]">
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold w-56 ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Status Keaslian
                      </td>
                      <td className="py-3.5 font-bold text-[#10B981]">
                        ✅ DOKUMEN ASLI TERVERIFIKASI (Tamper-Proof)
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Penerbit Dokumen
                      </td>
                      <td className="py-3.5 font-bold">
                        Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi SIPP: 18293/PERADI/2015)
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Jenis Dokumen
                      </td>
                      <td className="py-3.5 font-bold">
                        Opini Hukum &amp; Analisis Risiko Kontrak Kerja Sama Korporat (#DLV-441)
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Tanggal Diterbitkan
                      </td>
                      <td className="py-3.5 font-bold">
                        02 Juli 2026, 14:22:05 UTC (WORM Audit ID: <code>#AUD-8812</code>)
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Meterai Elektronik
                      </td>
                      <td className="py-3.5 font-bold text-[#60A5FA]">
                        🛡️ e-Meterai Peruri Resmi Terdaftar (API v2.4 Signature Verified)
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-3.5 pr-4 font-semibold ${isDark ? 'text-[#9CA3AF]' : 'text-slate-500'}`}>
                        Hash SHA-256 Validasi
                      </td>
                      <td className={`py-3.5 font-mono text-xs break-all ${isDark ? 'text-[#9CA3AF]' : 'text-slate-600'}`}>
                        <code>{verifyHash || 'e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8'}</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => {
                setActiveScreen('gateway');
                setVerifyResult(null);
              }}
              className={`px-6 py-[0.75rem] rounded-[12px] font-bold text-sm border inline-flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#1F2937] border-[#374151] hover:bg-[#374151] text-white'
                  : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>&lt; Kembali ke Gerbang Utama</span>
            </button>
          </div>
        </main>
      )}

      {/* FOOTER (Exact lines 398-404 & 639-641) */}
      <footer
        className={`py-10 px-6 border-t text-center text-xs md:text-sm font-medium mt-auto transition-colors ${
          isDark
            ? 'bg-[#111827] border-[#374151] text-[#9CA3AF]'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        © 2026 JUSTICA Legal Platform • Seluruh sesi konsultasi dilindungi kerahasiaan hubungan
        advokat-klien (Attorney-Client Privilege) &amp; WORM Audit Trail.
      </footer>
    </div>
  );
};

