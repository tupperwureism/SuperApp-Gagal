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
    <div
      className={`min-h-screen ${
        themeMode === 'dark' ? 'bg-[#0a0f1d] text-slate-100' : 'bg-slate-50 text-slate-900'
      } flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300 selection:bg-blue-500/30`}
    >
      {/* Ambient Glassmorphism Glow Mesh Orbs (Spatial Depth & Anti-Flat Elevation) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 blur-[130px] pointer-events-none rounded-full z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-gradient-to-br from-blue-500/10 via-emerald-500/10 to-purple-500/10 blur-[150px] pointer-events-none rounded-full z-0" />

      {/* TOP NAVIGATION BAR (Exact 1-to-1 with JUSTICA_Proto_1.1 & MOCK-J-GATEWAY-01) */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            onClick={() => setActiveScreen('gateway')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                JUSTICA
              </span>
              <span className="text-xs text-slate-400 sm:border-l sm:border-slate-700 sm:ml-3.5 sm:pl-3.5 font-medium">
                Platform Konsultasi &amp; Layanan Hukum Profesional
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 text-slate-300 flex items-center gap-2 transition-all shadow-sm active:scale-95"
              title="Ganti Mode Tema (Light/Dark Ready)"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-400" />
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
                className="px-5 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 transition-all flex items-center gap-2 shadow-sm font-bold active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Verifikasi Dokumen</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveScreen('gateway')}
                className="px-5 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 text-slate-300 transition-all flex items-center gap-2 font-bold shadow-sm active:scale-95"
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
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:py-16 flex flex-col justify-center space-y-12 md:space-y-16 z-10 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-5 max-w-4xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/35 text-xs font-bold text-blue-400 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>BCE Enterprise 5-Lifeline Architecture &amp; WORM Vault</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              SOLUSI HUKUM TERPERCAYA UNTUK ANDA
            </h1>

            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Konsultasikan masalah hukum Anda bersama advokat terverifikasi resmi Mahkamah Agung
              dengan mudah dan aman dalam ekosistem terenkripsi *End-to-End*.
            </p>
          </div>

          {/* Interactive Search Bar Container (Exact 1-to-1 with JUSTICA_Proto_1.1) */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto w-full">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] flex flex-col sm:flex-row items-center gap-3 shadow-2xl hover:border-blue-500/60 transition-all duration-300">
              <div className="flex items-center gap-3.5 pl-4 w-full">
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm transition-all flex-shrink-0 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 active:scale-95"
              >
                <span>CARI ADVOKAT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Portal Selection Section (Exact 2 Side-by-Side Cards + AI Navigator card) */}
          <div className="space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-slate-800" />
              <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 font-heading">
                PILIH AKSES PORTAL
              </h2>
              <div className="h-px w-20 bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Client Portal Card (MOCK-J-GATEWAY-01) */}
              <div className="group p-8 md:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 hover:border-blue-500/60 hover:shadow-[0_0_45px_-10px_rgba(59,130,246,0.3)] transition-all duration-300 flex flex-col space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

                <div>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/40 text-[11px] font-extrabold text-blue-400 tracking-wider inline-block shadow-sm">
                    PORTAL PENCARI KEADILAN
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-heading">
                    KLIEN HUKUM
                  </h3>
                </div>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  Temukan advokat, mulai konsultasi daring/luring ber-escrow mutex, atau ajukan
                  bantuan hukum Pro Bono secara langsung dengan hak istimewa kerahasiaan.
                </p>

                <div className="pt-4 mt-auto">
                  <Link
                    to="/client/auth"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 group-hover:scale-[1.01] active:scale-95"
                  >
                    <span>Masuk / Daftar sebagai Klien</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Advocate Portal Card (MOCK-J-GATEWAY-01) */}
              <div className="group p-8 md:p-10 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 hover:border-emerald-500/60 hover:shadow-[0_0_45px_-10px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400" />

                <div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[11px] font-extrabold text-emerald-400 tracking-wider inline-block shadow-sm">
                    PORTAL ADVOKAT TERVERIFIKASI
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-heading">
                    MITRA ADVOKAT
                  </h3>
                </div>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  Kelola praktik profesional, jadwalkan sesi, periksa antrean tiket Escrow HELD
                  (`SELECT ... FOR UPDATE`), dan tangani konsultasi klien ber-FIDO2.
                </p>

                <div className="pt-4 mt-auto">
                  <Link
                    to="/advocate/auth"
                    className="w-full py-4 px-6 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 hover:border-emerald-500/50 text-white hover:text-emerald-300 font-bold text-sm text-center transition-all flex items-center justify-center gap-2.5 shadow-lg group-hover:scale-[1.01] active:scale-95"
                  >
                    <span>Masuk / Daftar Mitra Advokat</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* AI Legal Navigator Banner (Integrated Engine Bridge) */}
            <div className="pt-2">
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-indigo-950/60 backdrop-blur-2xl border border-purple-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl hover:border-purple-500/60 hover:shadow-[0_0_35px_-10px_rgba(168,85,247,0.3)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex-shrink-0 mt-0.5 shadow-sm">
                    <BrainCircuit className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                        AI Legal Navigator Workspace
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold tracking-wider">
                        INSTANT IRAC v4
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                      Bedah kronologi hukum mandiri dengan analisis neural 4 pilar sebelum
                      menghubungkan ke advokat.
                    </p>
                  </div>
                </div>
                <Link
                  to="/ai-legal"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 flex-shrink-0 transition-all shadow-lg shadow-purple-600/25 active:scale-95"
                >
                  <span>Buka AI Navigator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Advantages Strip (Exact 1-to-1 with JUSTICA_Proto_1.1) */}
          <div className="max-w-5xl mx-auto w-full p-6 md:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs md:text-sm font-bold text-slate-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Advokat Berlisensi Resmi</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Key className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Rekening Bersama (Escrow) Aman</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>Kerahasiaan Sesi Terjamin</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Database className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span>WORM Immutable Vault</span>
            </div>
          </div>
        </main>
      )}

      {/* MAIN VIEW PANE 2: VERIFIER SCREEN (MOCK-J-PUBLIC-VERIFY_Verifikasi_Dokumen.md) */}
      {activeScreen === 'verifier' && (
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 flex flex-col justify-center space-y-12 z-10 animate-fade-in">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto shadow-xl">
              <FileCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              VERIFIKASI KEASLIAN DOKUMEN HUKUM
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
              Pastikan keabsahan dokumen hukum atau kontrak resmi ber-meterai elektronik yang
              diterbitkan melalui platform Justica secara *Write-Once-Read-Many* (WORM).
            </p>
          </div>

          {/* Verifier Form */}
          <div className="p-8 md:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-8">
            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Masukkan Kode Dokumen / Hash SHA-256
                </label>
                <input
                  type="text"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  placeholder="e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6..."
                  required
                  className="w-full px-4.5 py-3.5 rounded-2xl bg-slate-950/90 border border-white/10 text-xs md:text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:flex-1 p-3.5 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 text-center cursor-pointer hover:border-slate-500 hover:bg-slate-950/80 transition-all">
                  <span className="text-xs md:text-sm text-slate-400 font-medium">
                    Atau Unggah Berkas PDF (Opsional)
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFIKASI SEKARANG</span>
                </button>
              </div>
            </form>

            {/* Verification Result Table (Exact 1-to-1 with MOCK-J-PUBLIC-VERIFY) */}
            {verifyResult && (
              <div className="pt-8 border-t border-white/10 space-y-5 animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
                    HASIL PEMERIKSAAN DOKUMEN
                  </h3>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>DOKUMEN ASLI TERVERIFIKASI</span>
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/90 shadow-inner">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="p-4">Informasi Dokumen</th>
                        <th className="p-4">Status Verifikasi &amp; Detail WORM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                      <tr>
                        <td className="p-4 text-slate-400">Status Keaslian</td>
                        <td className="p-4 font-bold text-emerald-400">
                          100% Valid • SHA-256 Immutable Signature
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-400">Penerbit Dokumen</td>
                        <td className="p-4 text-white font-semibold">
                          Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi PERADI)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-400">Tanggal Diterbitkan</td>
                        <td className="p-4">02 Juli 2026 • 14:20:15 WIB</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-400">Meterai Elektronik</td>
                        <td className="p-4 text-blue-400 font-mono">
                          e-Meterai Peruri Resmi Terdaftar (SN: PERURI-2026-99182A)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-400">Audit Hash</td>
                        <td className="p-4 font-mono text-[11px] text-amber-400 break-all">
                          {verifyHash ||
                            'e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8'}
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
      <footer className="mt-auto bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-8 px-6 md:px-12 z-10 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs md:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2.5 text-slate-400">
            <Scale className="w-4 h-4 text-blue-500" />
            <span>
              © 2026 JUSTICA Legal Platform • Semua sesi konsultasi dilindungi kerahasiaan hubungan
              advokat-klien.
            </span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Ketentuan Layanan
            </a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Kebijakan Privasi NDA
            </a>
            <a href="#security" className="hover:text-slate-300 transition-colors">
              Audit WORM
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
