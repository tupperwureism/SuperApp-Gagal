import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  ArrowLeft,
  ShieldCheck,
  Lock,
  CheckCircle2,
  KeyRound,
  UserCheck,
  AlertCircle,
  Sun,
  Moon,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Database,
  Key
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ClientAuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regNik, setRegNik] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/dashboard');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row font-sans transition-colors duration-300 selection:bg-blue-500/30 relative overflow-x-hidden">
      {/* LEFT PANEL: 50% SPLIT — AUTHENTICATION TERMINAL */}
      <div className="w-full lg:w-1/2 flex-shrink-0 min-h-screen bg-background flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border z-20 relative shadow-2xl">
        {/* Topbar inside Left Panel — px constrained so nothing bleeds into center divider */}
        <header className="w-full px-5 sm:px-8 pt-5 pb-4 flex items-center justify-between border-b border-border flex-shrink-0 min-h-[70px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-foreground font-heading">JUSTICA</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleToggleTheme}
              className="rounded-full gap-1.5 transition-all bg-secondary/60 border-border text-foreground hover:bg-secondary h-8 px-3"
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
              className="rounded-full gap-1.5 transition-all bg-secondary/60 border-border text-foreground hover:bg-secondary h-8 px-3"
            >
              <Link to="/">
                <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Gerbang</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Center Form Container — items-center ensures box is CENTERED inside its 50% half */}
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="w-full max-w-[440px] sm:max-w-[480px] mx-auto px-6 sm:px-8 py-6 bg-card text-card-foreground border border-border rounded-3xl shadow-glass space-y-6 animate-fade-in">
            {/* Title & Subtitle (MOCK-J-CL-01) */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400 mx-auto shadow-md">
                <UserCheck className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-blue-500/15 border-blue-500/30 text-[11px] font-bold text-blue-400 tracking-wider uppercase gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-CL-01 • Klien Hukum</span>
              </Badge>
              <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
                MASUK KE PORTAL KLIEN
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Silakan masuk atau daftarkan identitas Anda untuk memulai konsultasi hukum terverifikasi.
              </p>
            </div>

            {/* Tabs Switcher (`[ Masuk Akun ]` | `[ Daftar Baru ]`) */}
            <div className="flex rounded-2xl bg-secondary p-1.5 border border-border shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-blue-600 text-white shadow-lg ring-1 ring-blue-400/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Masuk Akun</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white shadow-lg ring-1 ring-blue-400/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Daftar Baru</span>
              </button>
            </div>

            {/* TAB 1: MASUK KE AKUN ANDA */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                    <span>Email atau NIK Terdaftar</span>
                    <span className="text-[11px] text-muted-foreground font-mono">16-Digit NIK / Email</span>
                  </label>
                  {/* ZERO COLLISION INPUT WITH INLINE STYLE OVERRIDE */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="budi.santoso@email.com"
                      required
                      style={{ paddingLeft: '3.25rem' }}
                      className="w-full pr-4 h-12 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-foreground">Kata Sandi</label>
                    <button
                      type="button"
                      onClick={() => setShowStatusAlert(true)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  {/* ZERO COLLISION INPUT WITH INLINE STYLE OVERRIDE */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      required
                      style={{ paddingLeft: '3.25rem' }}
                      className="w-full pr-4 h-12 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted-foreground select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-border bg-secondary text-blue-600 focus:ring-0 w-4 h-4"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/60 border border-border space-y-2.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Kode Keamanan OTP (6-Digit)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Kode OTP baru telah dikirimkan ke WhatsApp & Email Anda.')}
                      className="text-[11px] text-blue-400 hover:text-blue-300 font-mono font-bold"
                    >
                      Kirim Ulang Kode (00:59)
                    </button>
                  </div>
                  <Input
                    type="text"
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    placeholder="8  4  9  2  0  1"
                    maxLength={6}
                    required
                    className="w-full h-11 rounded-xl bg-background border border-border text-base text-center text-blue-400 font-mono font-extrabold tracking-[0.5em] placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>MASUK SEKARANG</span>
                </Button>
              </form>
            )}

            {/* TAB 2: PENDAFTARAN AKUN BARU */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Nomor Induk Kependudukan (NIK)</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      value={regNik}
                      onChange={(e) => setRegNik(e.target.value)}
                      placeholder="3171234567890001"
                      maxLength={16}
                      required
                      style={{ paddingLeft: '3.25rem' }}
                      className="w-full pr-4 h-11 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Nama Lengkap Sesuai KTP</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Budi Santoso"
                      required
                      style={{ paddingLeft: '3.25rem' }}
                      className="w-full pr-4 h-11 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">WhatsApp Aktif</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                      </div>
                      <Input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+6281234567890"
                        required
                        style={{ paddingLeft: '2.5rem' }}
                        className="w-full pr-3 h-10 rounded-xl bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 font-mono transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Alamat Email</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center justify-center pointer-events-none z-10 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                      </div>
                      <Input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="budi@email.com"
                        required
                        style={{ paddingLeft: '2.5rem' }}
                        className="w-full pr-3 h-10 rounded-xl bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Kata Sandi Baru</label>
                    <Input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3 h-10 rounded-xl bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 font-mono transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Konfirmasi Sandi</label>
                    <Input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3 h-10 rounded-xl bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="pt-1.5">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="rounded border-border bg-secondary text-blue-600 focus:ring-0 mt-0.5 w-4 h-4"
                    />
                    <span className="leading-tight text-[11px] text-muted-foreground">
                      Saya menyetujui <strong className="text-foreground">Ketentuan Layanan</strong> &amp;{' '}
                      <strong className="text-foreground">Kebijakan Privasi NDA</strong> Justica.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>DAFTAR SEKARANG</span>
                </Button>
              </form>
            )}

            {/* Compliance Review / Information Alert Box (`INFORMASI AKUN`) */}
            {showStatusAlert && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3 animate-fade-in text-xs text-amber-300">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground uppercase text-[11px] tracking-wider">INFORMASI AKUN:</p>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">
                    Akun Anda sedang dalam peninjauan oleh tim kepatuhan layanan. Silakan hubungi pusat bantuan atau
                    periksa email terdaftar untuk aktivasi instan.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border text-center">
              <button
                type="button"
                onClick={() => setShowStatusAlert(!showStatusAlert)}
                className="text-[11px] text-muted-foreground hover:text-foreground underline transition-colors font-medium"
              >
                {showStatusAlert ? 'Sembunyikan Status Peninjauan' : 'Simulasikan Status Peninjauan Kepatuhan'}
              </button>
            </div>
          </div>
        </main>

        {/* Footer inside Left Panel */}
        <footer className="px-6 sm:px-10 py-4 border-t border-border text-center text-[11px] text-muted-foreground flex-shrink-0">
          © 2026 JUSTICA Legal Platform • Verifikasi 2 Langkah &amp; E2EE Hardened.
        </footer>
      </div>

      {/* RIGHT PANEL: 50% SPLIT — SHOWCASE BILLBOARD (Stretching from top to bottom) */}
      <div className="hidden lg:flex w-full lg:w-1/2 min-h-screen bg-gradient-to-br from-[#0a1128] via-slate-950 to-[#07191d] p-10 xl:p-14 flex-col justify-between relative overflow-hidden z-10">
        {/* Background Aesthetic Watermarks & Glows */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
        <Scale className="absolute -right-20 -bottom-20 w-[640px] h-[640px] text-white/[0.03] pointer-events-none rotate-12" />

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          <span className="badge badge-blue font-bold px-3.5 py-1.5 text-xs shadow-md border border-blue-400/30">Sertifikasi Keamanan ISO 27001</span>
          <span className="badge badge-gold font-bold px-3.5 py-1.5 text-xs shadow-md border border-amber-400/30">Enkripsi E2EE FIDO2 Ready</span>
        </div>

        {/* Middle Hero Showcase Content */}
        <div className="relative z-10 max-w-2xl mx-auto my-auto space-y-8 py-8">
          <div className="space-y-3.5">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-snug font-heading">
              Perlindungan Hukum Digital Terotentikasi &amp; Bebas Risiko Kepalsuan Dokumen
            </h2>
            <p className="text-sm xl:text-base text-slate-200 leading-relaxed font-medium">
              Seluruh transaksi konsultasi dan perakitan dokumen di Justica dilindungi protokol kriptografi Zero-Knowledge dan jaminan kepatuhan regulasi hukum nasional.
            </p>
          </div>

          {/* 3 Pillar Feature Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-blue-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Enkripsi Zero-Knowledge End-to-End</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Percakapan dan dokumen bukti hukum yang Anda unggah terenkripsi secara fisik sebelum dikirim ke server. Hanya Anda dan Advokat pendamping yang memiliki kunci privat pembuka.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-amber-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">PostgreSQL Mutex Row-Lock Escrow</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Dana konsultasi dikunci secara mutlak dalam sistem rekening bersama (`SELECT ... FOR UPDATE`) dan tidak dapat dicairkan atau digandakan sebelum verifikasi penyelesaian sesi.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-emerald-400/60 hover:bg-white/10 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex-shrink-0 mt-0.5 shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">WORM Immutable Audit Trail</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Setiap diagnosis AI dan somasi yang dirakit dibekukan dengan hash SHA-256 dalam kubah penyimpanan Write-Once-Read-Many yang sah sebagai bukti forensik digital di pengadilan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Status Banner */}
        <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Sistem Aktif &amp; Terproteksi WebAuthn Hardened</span>
          </div>
          <div className="font-mono text-slate-300">
            Latency: &lt; 1.2s &middot; SLA Uptime: 99.98%
          </div>
        </div>
      </div>
    </div>
  );
};
