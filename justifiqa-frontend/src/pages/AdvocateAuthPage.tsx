import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, ShieldCheck, Key, CheckCircle2 } from 'lucide-react';

export const AdvocateAuthPage: React.FC = () => {
  const [nia, setNia] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [kmsPin, setKmsPin] = useState('');
  const navigate = useNavigate();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate KMS SIPP verify
    navigate('/advocate/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Gerbang Utama</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MOCK-J-AD-01 • Mitra Advokat PERADI</span>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full my-auto py-12">
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">AUTENTIKASI MITRA ADVOKAT</h1>
            <p className="text-xs text-slate-400">
              Khusus bagi Advokat tersumpah yang terdaftar resmi pada Sistem SIPP Mahkamah Agung.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nomor Induk Advokat (NIA / SIPP)</label>
              <input
                type="text"
                value={nia}
                onChange={(e) => setNia(e.target.value)}
                placeholder="18293/PERADI/2015"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Alamat Email Profesional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="advokat@lawfirm.id"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">MFA OTP (6-Digit)</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4 8 1 9 0 2"
                  maxLength={6}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-blue-400 font-mono text-center placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">PIN KMS Peruri</label>
                <input
                  type="password"
                  value={kmsPin}
                  onChange={(e) => setKmsPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white font-mono text-center placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2.5 text-xs text-blue-300">
              <Key className="w-4 h-4 flex-shrink-0 text-blue-400" />
              <span>Sesi Kerja Enkripsi E2EE Terproteksi (Hardware-bound Session Token)</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>MASUK KE COMMAND CENTER ADVOKAT</span>
            </button>
          </form>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-white/10 text-center text-xs text-slate-500">
        © 2026 JUSTICA Legal Platform • Verifikasi Mahkamah Agung &amp; KMS e-Meterai.
      </footer>
    </div>
  );
};
