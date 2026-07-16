import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';

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
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col justify-between font-sans transition-colors duration-300 selection:bg-blue-500/30`}>
      {/* TOPBAR HEADER (Exact 1-to-1 with MOCK-J-CL-01) */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-extrabold text-lg tracking-tight text-white font-heading">JUSTICA</span>
              <span className="text-xs text-slate-400 sm:border-l sm:border-slate-700 sm:ml-3 sm:pl-3 font-medium">
                Platform Konsultasi &amp; Layanan Hukum Profesional
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
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400" />

          {/* Title & Subtitle (MOCK-J-CL-01) */}
          <div className="text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto shadow-md">
              <UserCheck className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[11px] font-bold text-blue-400 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MOCK-J-CL-01 • Klien Hukum</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
              MASUK KE PORTAL KLIEN
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              Silakan masuk atau daftarkan identitas Anda untuk memulai konsultasi hukum terverifikasi.
            </p>
          </div>

          {/* Tabs Switcher (`[ Masuk Akun ]` | `[ Daftar Baru ]`) */}
          <div className="flex rounded-2xl bg-slate-950 p-1.5 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
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
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
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
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Email atau NIK Terdaftar</span>
                  <span className="text-[11px] text-slate-500 font-mono">16-Digit NIK / Email</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="budi.santoso@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Kata Sandi</label>
                  <button
                    type="button"
                    onClick={() => setShowStatusAlert(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Lupa Kata Sandi?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 w-4 h-4"
                  />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
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
                <input
                  type="text"
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder="8  4  9  2  0  1"
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-base text-center text-blue-400 font-mono font-bold tracking-[0.5em] placeholder-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>MASUK SEKARANG</span>
              </button>
            </form>
          )}

          {/* TAB 2: PENDAFTARAN AKUN BARU */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nomor Induk Kependudukan (NIK)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={regNik}
                    onChange={(e) => setRegNik(e.target.value)}
                    placeholder="3171234567890001"
                    maxLength={16}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nama Lengkap Sesuai KTP</label>
                <div className="relative">
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Budi Santoso"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <UserCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nomor WhatsApp Terverifikasi</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+6281234567890"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Alamat Email Aktif</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="budi@email.com"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Kata Sandi Baru</label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Konfirmasi Kata Sandi</label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 mt-0.5 w-4 h-4"
                  />
                  <span className="leading-tight text-[11px] text-slate-400">
                    Saya menyetujui <strong className="text-white">Ketentuan Layanan</strong> &amp;{' '}
                    <strong className="text-white">Kebijakan Privasi NDA</strong> Justica.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>DAFTAR SEKARANG</span>
              </button>
            </form>
          )}

          {/* Compliance Review / Information Alert Box (`INFORMASI AKUN`) */}
          {showStatusAlert && (
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3 animate-fade-in text-xs text-amber-300">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white uppercase text-[11px] tracking-wider">INFORMASI AKUN:</p>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Akun Anda sedang dalam peninjauan oleh tim kepatuhan layanan. Silakan hubungi pusat bantuan atau
                  periksa email terdaftar untuk aktivasi instan.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => setShowStatusAlert(!showStatusAlert)}
              className="text-[11px] text-slate-500 hover:text-slate-400 underline transition-colors"
            >
              {showStatusAlert ? 'Sembunyikan Status Peninjauan' : 'Simulasikan Status Peninjauan Kepatuhan'}
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER (MOCK-J-CL-01) */}
      <footer className="bg-slate-900/90 border-t border-white/10 py-6 px-6 md:px-12 mt-12 text-center text-xs text-slate-500">
        © 2026 JUSTICA Legal Platform • Semua percakapan dilindungi kerahasiaan hubungan advokat-klien (Verifikasi 2 Langkah OTP).
      </footer>
    </div>
  );
};
