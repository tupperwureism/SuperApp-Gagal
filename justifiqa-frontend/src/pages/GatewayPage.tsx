import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, Sparkles, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export const GatewayPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-amber-500/30">
      {/* Top Bar (MOCK-J-GATEWAY-01) */}
      <header className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">JUSTICA</span>
            <span className="text-xs text-slate-400 block sm:inline sm:ml-2">
              • Platform Konsultasi &amp; Layanan Hukum Profesional
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-300">
            Professional Corporate Slate UI
          </span>
          <Link
            to="/verify"
            className="px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verifikasi Dokumen WORM</span>
          </Link>
        </div>
      </header>

      {/* Main Gateway Content Area */}
      <main className="max-w-6xl mx-auto w-full my-auto py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BCE Enterprise 5-Lifeline Architecture</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            SOLUSI HUKUM TERPERCAYA UNTUK ANDA
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Konsultasikan masalah hukum Anda bersama advokat terverifikasi resmi Mahkamah Agung
            dengan mudah, rahasia, dan aman dalam ekosistem terenkripsi.
          </p>
        </div>

        {/* Quick Search Box (MOCK-J-GATEWAY-01) */}
        <div className="max-w-2xl mx-auto">
          <div className="p-2 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-2 shadow-2xl">
            <input
              type="text"
              placeholder="Kendala hukum apa yang sedang Anda hadapi? (misal: Perdata, Ketenagakerjaan)..."
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
            />
            <Link
              to="/client/dashboard"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all flex-shrink-0 flex items-center gap-2 shadow-lg"
            >
              <span>CARI ADVOKAT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Portal Access Selection Cards */}
        <div className="space-y-4">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            PILIH AKSES PORTAL TERISOLASI
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Client Portal Card */}
            <div className="group p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">KLIEN HUKUM</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Temukan advokat berlisensi, mulai konsultasi daring/luring ber-escrow, bedah kronologi
                  kasus dengan AI IRAC, atau ajukan bantuan hukum Pro Bono.
                </p>
              </div>
              <Link
                to="/client/auth"
                className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2 group-hover:border-amber-500/40 relative z-10"
              >
                <span>Masuk / Daftar sebagai Klien</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

            {/* Advocate Portal Card */}
            <div className="group p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">MITRA ADVOKAT PERADI</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Kelola praktik profesional, periksa antrean tiket konsultasi Escrow HELD, verifikasi
                  FIDO2 MFA, dan tangani pencairan honor PPh 21 WORM.
                </p>
              </div>
              <Link
                to="/advocate/auth"
                className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2 group-hover:border-blue-500/40 relative z-10"
              >
                <span>Masuk / Daftar Mitra Advokat</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (MOCK-J-GATEWAY-01) */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-400">KEUNGGULAN JUSTICA:</span>
          <span>• Advokat Berlisensi Resmi</span>
          <span>• Escrow Mutex Aman</span>
          <span>• Kerahasiaan E2EE</span>
        </div>
        <div>
          © 2026 JUSTICA Legal Platform • Seluruh sesi konsultasi dilindungi kerahasiaan advokat-klien.
        </div>
      </footer>
    </div>
  );
};
