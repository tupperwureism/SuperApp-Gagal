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
  Sparkles,
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300 selection:bg-blue-500/30">
      {/* TOPBAR HEADER (Exact 1-to-1 with MOCK-J-CL-01) */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-6 md:px-12 py-4 shadow-xl flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-extrabold text-lg tracking-tight text-foreground font-heading">JUSTICA</span>
              <span className="text-xs text-slate-300 sm:border-l sm:border-border sm:ml-3 sm:pl-3 font-medium">
                Platform Konsultasi &amp; Layanan Hukum Profesional
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleToggleTheme}
              className="rounded-full gap-2 transition-all"
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
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full gap-2 transition-all"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 text-slate-300" />
                <span>Kembali ke Gerbang</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* SPLIT-SCREEN 50:50 MAIN CONTAINER */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)] w-full">
        {/* LEFT COLUMN: AUTH FORM (`col-span-1 lg:col-span-6 xl:col-span-5`) */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-12 py-10 bg-background border-r border-border/80 relative">
          <div className="w-full max-w-md space-y-7 animate-fade-in">
            {/* Title & Subtitle (MOCK-J-CL-01) */}
            <div className="text-center space-y-2.5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto shadow-md">
                <UserCheck className="w-7 h-7" />
              </div>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-blue-500/15 border-blue-500/30 text-[11px] font-bold text-blue-400 tracking-wider uppercase gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-CL-01 • Klien Hukum</span>
              </Badge>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading tracking-tight">
                MASUK KE PORTAL KLIEN
              </h1>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Silakan masuk atau daftarkan identitas Anda untuk memulai konsultasi hukum terverifikasi.
              </p>
            </div>

            {/* Tabs Switcher (`[ Masuk Akun ]` | `[ Daftar Baru ]`) */}
            <div className="flex rounded-2xl bg-secondary/60 p-1.5 border border-border shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Masuk Akun</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Daftar Baru</span>
              </button>
            </div>

            {/* TAB 1: MASUK KE AKUN ANDA */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                    <span>Email atau NIK Terdaftar</span>
                    <span className="text-[11px] text-slate-300 font-mono">16-Digit NIK / Email</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="budi.santoso@email.com"
                      required
                      className="w-full pl-10 pr-4 h-12 rounded-xl bg-secondary/40 border-border text-sm text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
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
                  <div className="relative">
                    <Input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      required
                      className="w-full pl-10 pr-4 h-12 rounded-xl bg-secondary/40 border-border text-sm text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500 font-mono"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-border bg-secondary text-blue-600 focus:ring-0 w-4 h-4"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
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
                    className="w-full h-12 rounded-xl bg-secondary/60 border-border text-base text-center text-blue-400 font-mono font-bold tracking-[0.5em] placeholder:text-slate-400 focus-visible:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MASUK SEKARANG</span>
                </Button>
              </form>
            )}

            {/* TAB 2: PENDAFTARAN AKUN BARU */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Nomor Induk Kependudukan (NIK)</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={regNik}
                      onChange={(e) => setRegNik(e.target.value)}
                      placeholder="3171234567890001"
                      maxLength={16}
                      required
                      className="w-full pl-10 pr-4 h-11 rounded-xl bg-secondary/40 border-border text-sm text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500 font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Nama Lengkap Sesuai KTP</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Budi Santoso"
                      required
                      className="w-full pl-10 pr-4 h-11 rounded-xl bg-secondary/40 border-border text-sm text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500"
                    />
                    <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Nomor WhatsApp Terverifikasi</label>
                    <div className="relative">
                      <Input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+6281234567890"
                        required
                        className="w-full pl-9 pr-3 h-11 rounded-xl bg-secondary/40 border-border text-xs text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500 font-mono"
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Alamat Email Aktif</label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="budi@email.com"
                        required
                        className="w-full pl-9 pr-3 h-11 rounded-xl bg-secondary/40 border-border text-xs text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500"
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Kata Sandi Baru</label>
                    <Input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3.5 h-11 rounded-xl bg-secondary/40 border-border text-xs text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Konfirmasi Kata Sandi</label>
                    <Input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3.5 h-11 rounded-xl bg-secondary/40 border-border text-xs text-foreground placeholder:text-slate-400 focus-visible:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="rounded border-border bg-secondary text-blue-600 focus:ring-0 mt-0.5 w-4 h-4"
                    />
                    <span className="leading-tight text-[11px] text-slate-300">
                      Saya menyetujui <strong className="text-foreground">Ketentuan Layanan</strong> &amp;{' '}
                      <strong className="text-foreground">Kebijakan Privasi NDA</strong> Justica.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DAFTAR SEKARANG</span>
                </Button>
              </form>
            )}

            {/* Compliance Review / Information Alert Box (`INFORMASI AKUN`) */}
            {showStatusAlert && (
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3 animate-fade-in text-xs text-amber-300">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px] tracking-wider">INFORMASI AKUN:</p>
                  <p className="text-slate-200 mt-1 leading-relaxed">
                    Akun Anda sedang dalam peninjauan oleh tim kepatuhan layanan. Silakan hubungi pusat bantuan atau
                    periksa email terdaftar untuk aktivasi instan.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border text-center">
              <button
                type="button"
                onClick={() => setShowStatusAlert(!showStatusAlert)}
                className="text-[11px] text-slate-300 hover:text-foreground underline transition-colors font-medium"
              >
                {showStatusAlert ? 'Sembunyikan Status Peninjauan' : 'Simulasikan Status Peninjauan Kepatuhan'}
              </button>
            </div>

            <div className="pt-6 text-center text-[11px] text-slate-400 border-t border-border/40">
              © 2026 JUSTICA Legal Platform • Verifikasi 2 Langkah OTP &amp; E2EE Hardened.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRAND & TRUST SHOWCASE (`hidden lg:flex lg:col-span-6 xl:col-span-7`) */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-gradient-to-br from-slate-950 via-[#0a1122] to-slate-900 p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
          {/* Aesthetic Background Glows & Watermark */}
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <Scale className="absolute -right-20 -bottom-20 w-[480px] h-[480px] text-white/5 pointer-events-none rotate-12" />

          {/* Top Badges */}
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="badge badge-blue font-bold px-3 py-1 text-xs">Sertifikasi Keamanan ISO 27001</span>
              <span className="badge badge-gold font-bold px-3 py-1 text-xs">Enkripsi E2EE FIDO2</span>
            </div>
            <span className="text-xs text-slate-300 font-mono flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sistem Aktif 24/7</span>
            </span>
          </div>

          {/* Middle Hero Showcase Card */}
          <div className="relative z-10 max-w-2xl my-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Perlindungan Hukum Digital Terotentikasi &amp; Bebas Risiko Kepalsuan Dokumen
              </h2>
              <p className="text-sm xl:text-base text-slate-200 leading-relaxed font-medium">
                Seluruh transaksi konsultasi dan perakitan dokumen di Justica dilindungi protokol kriptografi Zero-Knowledge dan jaminan kepatuhan regulasi hukum nasional.
              </p>
            </div>

            {/* 3 Pillar Feature Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-blue-400/50 hover:bg-white/10">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Enkripsi Zero-Knowledge End-to-End</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Percakapan dan dokumen bukti hukum yang Anda unggah terenkripsi secara fisik sebelum dikirim ke server. Hanya Anda dan Advokat pendamping yang memiliki kunci privat pembuka.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-amber-400/50 hover:bg-white/10">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0 mt-0.5">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">PostgreSQL Mutex Row-Lock Escrow</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Dana konsultasi dikunci secara mutlak dalam sistem rekening bersama (`SELECT ... FOR UPDATE`) dan tidak dapat dicairkan atau digandakan sebelum verifikasi penyelesaian sesi.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-start gap-4 transition-all hover:border-emerald-400/50 hover:bg-white/10">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0 mt-0.5">
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
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">Sistem Aktif &amp; Terproteksi WebAuthn Hardened</span>
            </div>
            <div className="font-mono text-slate-300">
              Latency: &lt; 1.2s &middot; SLA Uptime: 99.98%
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
