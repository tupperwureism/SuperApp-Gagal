import React, { useState, useEffect } from 'react';
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
  AlertTriangle,
  Database,
  Key
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/advocate/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-foreground flex flex-col lg:flex-row font-sans transition-colors duration-300 selection:bg-emerald-500/30 relative overflow-x-hidden">
      {/* LEFT PANEL: FIXED 580PX FULL-HEIGHT AUTHENTICATION TERMINAL */}
      <div className="w-full lg:w-[540px] xl:w-[580px] flex-shrink-0 min-h-screen bg-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15 z-20 relative shadow-2xl">
        {/* Topbar inside Left Panel */}
        <header className="px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white font-heading">JUSTICA</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleToggleTheme}
              className="rounded-full gap-1.5 transition-all bg-white/5 border-white/15 text-white hover:bg-white/15 h-8 px-3"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dark</span>
                </>
              )}
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 transition-all bg-white/5 border-white/15 text-white hover:bg-white/15 h-8 px-3"
            >
              <Link to="/">
                <ArrowLeft className="w-3.5 h-3.5 text-slate-300" />
                <span>Gerbang</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Center Form Container */}
        <main className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-8 my-auto">
          <div className="w-full max-w-[420px] mx-auto space-y-6 animate-fade-in">
            {/* Title & Subtitle (MOCK-J-AD-01) */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-emerald-500/15 border-emerald-500/30 text-[11px] font-bold text-emerald-400 tracking-wider uppercase gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-AD-01 • Mitra Advokat PERADI</span>
              </Badge>
              <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
                AUTENTIKASI MITRA ADVOKAT
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Khusus bagi Advokat tersumpah yang terdaftar resmi pada Sistem Informasi Penelusuran Perkara (SIPP) Mahkamah Agung.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>Nomor Induk Advokat (NIA / SIPP)</span>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">Verifikasi SIPP MA</span>
                </label>
                {/* ZERO COLLISION INPUT WITH INLINE STYLE OVERRIDE */}
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-slate-400">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <Input
                    type="text"
                    value={nia}
                    onChange={(e) => setNia(e.target.value)}
                    placeholder="18293/PERADI/2015"
                    required
                    style={{ paddingLeft: '3.25rem' }}
                    className="w-full pr-4 h-12 rounded-xl bg-slate-900 border border-white/20 text-sm text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500 font-mono transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">Alamat Email Profesional</label>
                {/* ZERO COLLISION INPUT WITH INLINE STYLE OVERRIDE */}
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mahendra.k@lawfirm.id"
                    required
                    style={{ paddingLeft: '3.25rem' }}
                    className="w-full pr-4 h-12 rounded-xl bg-slate-900 border border-white/20 text-sm text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-white">Kata Sandi Keamanan KMS</label>
                  <button
                    type="button"
                    onClick={() => setShowHardwareModal(true)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    Lupa PIN KMS / Kredensial?
                  </button>
                </div>
                {/* ZERO COLLISION INPUT WITH INLINE STYLE OVERRIDE */}
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-slate-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <Input
                    type="password"
                    value={kmsPassword}
                    onChange={(e) => setKmsPassword(e.target.value)}
                    placeholder="••••••••••••••••••••••••"
                    required
                    style={{ paddingLeft: '3.25rem' }}
                    className="w-full pr-4 h-12 rounded-xl bg-slate-900 border border-white/20 text-sm text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500 font-mono transition-all"
                  />
                </div>
              </div>

              {/* MFA & PIN KMS Grid (Exact 1-to-1 with MOCK-J-AD-01) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-white/10">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kode MFA (6-Digit OTP)</span>
                  </label>
                  <Input
                    type="text"
                    value={mfaOtp}
                    onChange={(e) => setMfaOtp(e.target.value)}
                    placeholder="4  8  1  9  0  2"
                    maxLength={6}
                    required
                    className="w-full h-11 rounded-xl bg-slate-950 border border-white/25 text-sm text-emerald-400 font-mono font-bold tracking-[0.3em] text-center placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    <span>PIN e-Meterai KMS</span>
                  </label>
                  <Input
                    type="password"
                    value={kmsPin}
                    onChange={(e) => setKmsPin(e.target.value)}
                    placeholder="••••••"
                    maxLength={6}
                    required
                    className="w-full h-11 rounded-xl bg-slate-950 border border-white/25 text-sm text-white font-mono font-bold tracking-[0.3em] text-center placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Hardware-bound Session Token check */}
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={hardwareBoundSession}
                  onChange={(e) => setHardwareBoundSession(e.target.checked)}
                  required
                  className="rounded border-white/20 bg-slate-900 text-emerald-600 focus:ring-0 mt-0.5 w-4 h-4 cursor-pointer"
                />
                <div className="text-xs text-emerald-300 font-medium">
                  <p className="font-bold text-white">Sesi Kerja Enkripsi E2EE Terproteksi</p>
                  <p className="text-[11px] text-emerald-400/90 mt-0.5">
                    (Hardware-bound Session Token • FIDO2 WebAuthn &amp; Mutex Locking Ready)
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>MASUK KE COMMAND CENTER ADVOKAT</span>
              </Button>
            </form>

            {/* Recovery Modal / Alert simulation */}
            {showHardwareModal && (
              <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-start gap-3 animate-fade-in text-xs text-blue-300">
                <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px] tracking-wider">PEMULIHAN KREDENSIAL KMS:</p>
                  <p className="text-slate-200 mt-0.5 leading-relaxed">
                    Untuk memulihkan PIN e-Meterai Peruri atau token FIDO2 perangkat keras, silakan hubungi tim
                    keamanan siber Mahkamah Agung &amp; Peruri atau gunakan kunci pemulihan HSM fisik Anda.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer inside Left Panel */}
        <footer className="px-6 sm:px-10 py-4 border-t border-white/10 text-center text-[11px] text-slate-400 flex-shrink-0">
          © 2026 JUSTICA Legal Platform • Verifikasi Mahkamah Agung &amp; KMS e-Meterai Peruri.
        </footer>
      </div>

      {/* RIGHT PANEL: FLEX-1 FULL-HEIGHT SHOWCASE BILLBOARD (Stretching from top to bottom) */}
      <div className="hidden lg:flex flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-[#07191d] to-slate-950 p-12 xl:p-20 flex-col justify-between relative overflow-hidden z-10">
        {/* Background Aesthetic Glows & Watermark */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none" />
        <Briefcase className="absolute -right-20 -bottom-20 w-[640px] h-[640px] text-white/[0.03] pointer-events-none rotate-12" />

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold px-3.5 py-1.5 text-xs shadow-md">Verifikasi SIPP Mahkamah Agung</span>
          <span className="badge badge-blue font-bold px-3.5 py-1.5 text-xs shadow-md border border-blue-400/30">KMS e-Meterai Peruri</span>
        </div>

        {/* Middle Hero Showcase Content */}
        <div className="relative z-10 max-w-2xl mx-auto my-auto space-y-8 py-8">
          <div className="space-y-3.5">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-snug font-heading">
              Infrastruktur Praktik Hukum Digital Terproteksi Tingkat Tinggi SIPP MA
            </h2>
            <p className="text-sm xl:text-base text-slate-200 leading-relaxed font-medium">
              Portal khusus bagi Advokat tersumpah PERADI untuk mengelola sesi konsultasi klien, penegakan diagnosis hukum AI, serta otentikasi dokumen e-Meterai berlisensi resmi.
            </p>
          </div>

          {/* 3 Pillar Feature Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-emerald-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Otentikasi SIPP &amp; PERADI Real-Time</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Sinkronisasi langsung dengan pangkalan data Mahkamah Agung memastikan bahwa hanya advokat dengan lisensi aktif yang dapat membuka sesi konsultasi atau menerbitkan opini yuridis.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-blue-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Sesi FIDO2 WebAuthn &amp; Hardware HSM</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Setiap aksi penandatanganan dokumen dan pelepasan dana Escrow memerlukan otorisasi multi-faktor MFA dan verifikasi token perangkat keras fisik (Hardware Security Module).
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-teal-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Kubah WORM Audit Trail &amp; Bukti Forensik</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Semua somasi, gugatan, dan log konsultasi dienkripsi dengan SHA-256 dan disimpan dalam kubah Immutable Write-Once-Read-Many yang sah sebagai barang bukti digital.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Status Banner */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Command Center Advokat Aktif &amp; Terproteksi HSM</span>
          </div>
          <div className="font-mono text-slate-300">
            Peruri KMS API: Connected &middot; Mutex Engine: Ready
          </div>
        </div>
      </div>
    </div>
  );
};
