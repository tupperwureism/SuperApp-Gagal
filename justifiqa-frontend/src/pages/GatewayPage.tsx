import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  Search,
  CheckCircle2,
  FileCheck,
  ArrowLeft,
  Sun,
  Moon,
  BrainCircuit,
  Key,
  Database,
  Lock
} from 'lucide-react';

export const GatewayPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'gateway' | 'verifier'>('gateway');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/client/dashboard');
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyHash.trim()) {
      setVerifyResult(true);
    }
  };

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col justify-between font-sans transition-colors duration-300 selection:bg-blue-500/30`}>
      {/* TOP NAVIGATION BAR (Exact 1-to-1 with JUSTICA_Proto_1.1 & MOCK-J-GATEWAY-01) */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            onClick={() => setActiveScreen('gateway')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">JUSTICA</span>
              <span className="text-xs text-slate-400 sm:border-l sm:border-slate-700 sm:ml-3 sm:pl-3 font-medium">
                Platform Konsultasi &amp; Layanan Hukum Profesional
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={handleToggleTheme}
              className="px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 flex items-center gap-2 transition-all"
              title="Ganti Mode Tema (Light/Dark Ready)"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden md:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Verifikasi Dokumen Button (Switches to Verifier Pane / MOCK-J-PUBLIC-VERIFY) */}
            {activeScreen === 'gateway' ? (
              <button
                type="button"
                onClick={() => {
                  setActiveScreen('verifier');
                  setVerifyResult(null);
                }}
                className="px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 transition-all flex items-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Verifikasi Dokumen</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveScreen('gateway')}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <span>Kembali ke Beranda</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN VIEW PANE 1: GATEWAY SCREEN (MOCK-J-GATEWAY-01) */}
      {activeScreen === 'gateway' && (
        <main className="max-w-6xl mx-auto w-full px-6 py-12 md:py-16 space-y-16 my-auto animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BCE Enterprise 5-Lifeline Architecture &amp; WORM Vault</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              SOLUSI HUKUM TERPERCAYA UNTUK ANDA
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Konsultasikan masalah hukum Anda bersama advokat terverifikasi resmi Mahkamah Agung
              dengan mudah dan aman dalam ekosistem terenkripsi *End-to-End*.
            </p>
          </div>

          {/* Interactive Search Bar Container (Exact 1-to-1 with JUSTICA_Proto_1.1) */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto">
            <div className="p-2.5 rounded-2xl bg-slate-900 border-2 border-slate-700/80 focus-within:border-blue-500 flex flex-col sm:flex-row items-center gap-3 shadow-2xl transition-all">
              <div className="flex items-center gap-3 pl-3.5 w-full">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kendala hukum apa yang sedang Anda hadapi? (misal: Perdata, Ketenagakerjaan)..."
                  className="w-full bg-transparent py-2.5 text-sm md:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex-shrink-0 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>CARI ADVOKAT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Portal Selection Section (Exact 2 Side-by-Side Cards + AI Navigator card) */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-slate-700" />
              <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 font-heading">
                PILIH AKSES PORTAL
              </h2>
              <div className="h-px w-16 bg-slate-700" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Client Portal Card (MOCK-J-GATEWAY-01) */}
              <div className="group p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400" />
                
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-[11px] font-extrabold text-blue-400 tracking-wider">
                    PORTAL PENCARI KEADILAN
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">KLIEN HUKUM</h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    Temukan advokat, mulai konsultasi daring/luring ber-escrow mutex, atau ajukan
                    bantuan hukum Pro Bono secara langsung dengan hak istimewa kerahasiaan.
                  </p>
                </div>

                <Link
                  to="/client/auth"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2 shadow-md group-hover:scale-[1.01]"
                >
                  <span>Masuk / Daftar sebagai Klien</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Advocate Portal Card (MOCK-J-GATEWAY-01) */}
              <div className="group p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600" />
                
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[11px] font-extrabold text-emerald-400 tracking-wider">
                    PORTAL ADVOKAT TERVERIFIKASI
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">MITRA ADVOKAT</h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    Kelola praktik profesional, jadwalkan sesi, periksa antrean tiket Escrow HELD
                    (`SELECT ... FOR UPDATE`), dan tangani konsultasi klien ber-FIDO2.
                  </p>
                </div>

                <Link
                  to="/advocate/auth"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 text-white hover:text-emerald-300 font-bold text-sm text-center transition-all flex items-center justify-center gap-2 shadow-md group-hover:scale-[1.01]"
                >
                  <span>Masuk / Daftar Mitra Advokat</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* AI Legal Navigator Banner (Integrated Engine Bridge) */}
            <div className="max-w-4xl mx-auto pt-2">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg hover:border-purple-500/60 transition-all">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex-shrink-0 mt-0.5">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">AI Legal Navigator Workspace</h3>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                        INSTANT IRAC v4
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Bedah kronologi hukum mandiri dengan analisis neural 4 pilar sebelum menghubungkan ke advokat.
                    </p>
                  </div>
                </div>
                <Link
                  to="/ai-legal"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 flex-shrink-0 transition-all shadow-md"
                >
                  <span>Buka AI Navigator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Advantages Strip (Exact 1-to-1 with JUSTICA_Proto_1.1) */}
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-wrap items-center justify-around gap-6 text-center text-xs sm:text-sm font-semibold text-slate-300 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Advokat Berlisensi Resmi</span>
            </div>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Rekening Bersama (Escrow) Aman</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Kerahasiaan Sesi Terjamin</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span>WORM Immutable Vault</span>
            </div>
          </div>
        </main>
      )}

      {/* MAIN VIEW PANE 2: VERIFIER SCREEN (MOCK-J-PUBLIC-VERIFY_Verifikasi_Dokumen.md) */}
      {activeScreen === 'verifier' && (
        <main className="max-w-4xl mx-auto w-full px-6 py-12 md:py-16 space-y-10 my-auto animate-fade-in">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto shadow-lg">
              <FileCheck className="w-7 h-7" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-heading">
              VERIFIKASI KEASLIAN DOKUMEN HUKUM
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Pastikan keabsahan dokumen hukum atau kontrak resmi ber-meterai elektronik yang diterbitkan
              melalui platform Justica secara *Write-Once-Read-Many* (WORM).
            </p>
          </div>

          {/* Verifier Form */}
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
            <form onSubmit={handleVerifySubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Masukkan Kode Dokumen / Hash SHA-256
                </label>
                <input
                  type="text"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  placeholder="e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:flex-1 p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 text-center cursor-pointer hover:border-slate-500 transition-all">
                  <span className="text-xs text-slate-400 font-medium">Atau Unggah Berkas PDF (Opsional)</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFIKASI SEKARANG</span>
                </button>
              </div>
            </form>

            {/* Verification Result Table (Exact 1-to-1 with MOCK-J-PUBLIC-VERIFY) */}
            {verifyResult && (
              <div className="pt-6 border-t border-white/10 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    HASIL PEMERIKSAAN DOKUMEN
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>DOKUMEN ASLI TERVERIFIKASI</span>
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="p-3.5">Informasi Dokumen</th>
                        <th className="p-3.5">Status Verifikasi &amp; Detail WORM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                      <tr>
                        <td className="p-3.5 text-slate-400">Status Keaslian</td>
                        <td className="p-3.5 font-bold text-emerald-400">100% Valid • SHA-256 Immutable Signature</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-400">Penerbit Dokumen</td>
                        <td className="p-3.5 text-white font-semibold">Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi PERADI)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-400">Tanggal Diterbitkan</td>
                        <td className="p-3.5">02 Juli 2026 • 14:20:15 WIB</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-400">Meterai Elektronik</td>
                        <td className="p-3.5 text-blue-400 font-mono">e-Meterai Peruri Resmi Terdaftar (SN: PERURI-2026-99182A)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 text-slate-400">Audit Hash</td>
                        <td className="p-3.5 font-mono text-[11px] text-amber-400 break-all">
                          {verifyHash || 'e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* FOOTER (Exact 1-to-1 with JUSTICA_Proto_1.1) */}
      <footer className="bg-slate-900/90 border-t border-white/10 py-6 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium text-slate-400">
            <Scale className="w-4 h-4 text-blue-500" />
            <span>© 2026 JUSTICA Legal Platform • Semua sesi konsultasi dilindungi kerahasiaan hubungan advokat-klien.</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <a href="#terms" className="hover:text-slate-300 transition-colors">Ketentuan Layanan</a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Kebijakan Privasi NDA</a>
            <a href="#security" className="hover:text-slate-300 transition-colors">Audit WORM</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
