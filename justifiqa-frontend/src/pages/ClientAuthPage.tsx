import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const ClientAuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [nik, setNik] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP / SIPP verification success
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-amber-500/30">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Gerbang Utama</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MOCK-J-CL-01 • Klien Hukum</span>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full my-auto py-12">
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">MASUK PORTAL KLIEN</h1>
            <p className="text-xs text-slate-400">
              Silakan masuk atau daftarkan identitas Anda untuk memulai konsultasi hukum terverifikasi.
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-950 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Masuk Akun
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nomor Induk Kependudukan (NIK)</label>
                <input
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="3171234567890001"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email atau NIK Terdaftar</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="budi.santoso@email.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Kode Keamanan OTP (6-Digit)</label>
                <span className="text-[11px] text-amber-400 font-mono">Kirim Ulang (00:59)</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="8  4  9  2  0  1"
                  maxLength={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-amber-400 font-mono tracking-widest placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeTab === 'login' ? 'MASUK SEKARANG' : 'DAFTAR SEKARANG'}</span>
            </button>
          </form>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-white/10 text-center text-xs text-slate-500">
        © 2026 JUSTICA Legal Platform • Enkripsi Sesi WORM &amp; OTP Verifier.
      </footer>
    </div>
  );
};
