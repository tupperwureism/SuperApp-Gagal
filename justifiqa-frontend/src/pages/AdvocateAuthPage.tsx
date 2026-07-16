import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Lock,
  Sun,
  Moon,
  Mail,
  Fingerprint,
  Award,
  AlertTriangle
} from 'lucide-react';

export const AdvocateAuthPage: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [showHardwareModal, setShowHardwareModal] = useState(false);
  const navigate = useNavigate();

  // Advocate credentials form state
  const [nia, setNia] = useState('');
  const [email, setEmail] = useState('');
  const [kmsPassword, setKmsPassword] = useState('');
  const [mfaOtp, setMfaOtp] = useState('');
  const [kmsPin, setKmsPin] = useState('');
  const [hardwareBoundSession, setHardwareBoundSession] = useState(true);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/advocate/dashboard');
  };

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col justify-between font-sans transition-colors duration-300 selection:bg-emerald-500/30`}>
      {/* TOPBAR HEADER (Exact 1-to-1 with MOCK-J-AD-01) */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-extrabold text-lg tracking-tight text-white font-heading">JUSTICA</span>
              <span className="text-xs text-emerald-400 sm:border-l sm:border-slate-700 sm:ml-3 sm:pl-3 font-semibold">
                Portal Mitra Advokat Berlisensi
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <button
              type="button"
              onClick={handleToggleTheme}
              className="px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 flex items-center gap-2 transition-all"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <Link
              to="/"
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Kembali ke Gerbang</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN AUTH CONTAINER */}
      <main className="max-w-xl mx-auto w-full px-6 py-10 my-auto animate-fade-in">
        <div className="p-8 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600" />

          {/* Title & Subtitle (MOCK-J-AD-01) */}
          <div className="text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MOCK-J-AD-01 • Mitra Advokat PERADI</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
              AUTENTIKASI KEAMANAN TINGGI MITRA ADVOKAT
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              Khusus bagi Advokat tersumpah yang terdaftar resmi pada Sistem Informasi Penelusuran Perkara (SIPP) Mahkamah Agung.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5 animate-fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Nomor Induk Advokat (NIA / SIPP)</span>
                <span className="text-[11px] text-emerald-400 font-mono font-bold">Verifikasi SIPP MA</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nia}
                  onChange={(e) => setNia(e.target.value)}
                  placeholder="18293/PERADI/2015"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <Award className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Alamat Email Profesional</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mahendra.k@lawfirm.id"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Kata Sandi Keamanan KMS</label>
                <button
                  type="button"
                  onClick={() => setShowHardwareModal(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  Lupa PIN KMS / Kredensial?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={kmsPassword}
                  onChange={(e) => setKmsPassword(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* MFA & PIN KMS Grid (Exact 1-to-1 with MOCK-J-AD-01) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kode MFA (6-Digit OTP)</span>
                </label>
                <input
                  type="text"
                  value={mfaOtp}
                  onChange={(e) => setMfaOtp(e.target.value)}
                  placeholder="4  8  1  9  0  2"
                  maxLength={6}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-emerald-400 font-mono font-bold tracking-[0.3em] text-center placeholder-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>PIN e-Meterai Peruri KMS</span>
                </label>
                <input
                  type="password"
                  value={kmsPin}
                  onChange={(e) => setKmsPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono font-bold tracking-[0.3em] text-center placeholder-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Hardware-bound Session Token check */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <input
                type="checkbox"
                checked={hardwareBoundSession}
                onChange={(e) => setHardwareBoundSession(e.target.checked)}
                required
                className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0 mt-0.5 w-4 h-4 cursor-pointer"
              />
              <div className="text-xs text-emerald-300 font-medium">
                <p className="font-bold text-white">Sesi Kerja Enkripsi E2EE Terproteksi</p>
                <p className="text-[11px] text-emerald-400/80 mt-0.5">
                  (Hardware-bound Session Token • FIDO2 WebAuthn &amp; Mutex Locking Ready)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>MASUK KE COMMAND CENTER ADVOKAT</span>
            </button>
          </form>

          {/* Recovery Modal / Alert simulation */}
          {showHardwareModal && (
            <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-start gap-3 animate-fade-in text-xs text-blue-300">
              <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wider">PEMULIHAN KREDENSIAL KMS:</p>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Untuk memulihkan PIN e-Meterai Peruri atau token FIDO2 perangkat keras, silakan hubungi tim
                  keamanan siber Mahkamah Agung &amp; Peruri atau gunakan kunci pemulihan HSM fisik Anda.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER (MOCK-J-AD-01) */}
      <footer className="bg-slate-900/90 border-t border-white/10 py-6 px-6 md:px-12 mt-12 text-center text-xs text-slate-500">
        © 2026 JUSTICA Legal Platform • Verifikasi Mahkamah Agung &amp; KMS e-Meterai Peruri (Hardware-bound Session Token).
      </footer>
    </div>
  );
};
