import React from 'react';
import { PortalCardItem } from './PortalCardItem';
import { User, Award } from 'lucide-react';

interface PortalCardsGridProps {
  isDark?: boolean;
}

export const PortalCardsGrid: React.FC<PortalCardsGridProps> = ({ isDark = true }) => {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Section Header with Generous Spacing mb-16 */}
      <div className="flex items-center justify-center gap-6 mb-16 w-full">
        <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-white/30 to-white/10" />
        <h2 className="text-center font-black text-lg md:text-2xl uppercase tracking-[0.2em] text-white font-heading">
          PILIH AKSES PORTAL
        </h2>
        <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent via-white/30 to-white/10" />
      </div>

      {/* Grid container with gap-10 and full height cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 w-full items-stretch">
        {/* CARD 1: KLIEN HUKUM */}
        <PortalCardItem
          isDark={isDark}
          badge="PORTAL PENCARI KEADILAN"
          badgeClass="bg-blue-500/20 text-blue-300 border-blue-500/40"
          badgeIcon={User}
          title="KLIEN HUKUM"
          description="Temukan advokat berlisensi, mulai konsultasi hukum daring (E2EE) maupun luring, tangani sengketa, atau ajukan bantuan hukum Pro Bono secara aman dengan perlindungan Escrow."
          features={[
            'Konsultasi terenkripsi Zero-Knowledge E2EE',
            'Perlindungan dana rekening bersama (Mutex Escrow)',
            'Akses kuota bantuan hukum Pro Bono PERADI',
          ]}
          btnText="Masuk / Daftar sebagai Klien"
          btnClass="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold shadow-xl border-0"
          to="/client/auth"
          topStripeClass="bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500"
          accentColor="blue"
        />

        {/* CARD 2: MITRA ADVOKAT */}
        <PortalCardItem
          isDark={isDark}
          badge="PORTAL PRAKTISI HUKUM"
          badgeClass="bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          badgeIcon={Award}
          title="MITRA ADVOKAT"
          description="Kelola praktik profesional Anda, verifikasi SIPP Mahkamah Agung RI, jadwalkan sesi konsultasi, terbitkan opini hukum ber-eMeterai SHA-256, dan cairkan honorarium via BI-FAST."
          features={[
            'Verifikasi real-time SIPP Mahkamah Agung & PERADI',
            'Penerbitan opini hukum ber-eMeterai SHA-256 sah',
            'Pencairan honor instan BI-FAST tanpa potongan gelap',
          ]}
          btnText="Masuk / Daftar Mitra Advokat"
          btnClass="bg-slate-900 hover:bg-slate-800 border-2 border-white/20 hover:border-emerald-500 text-white hover:text-emerald-300 font-extrabold shadow-xl"
          to="/advocate/auth"
          topStripeClass="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
          accentColor="emerald"
        />
      </div>
    </section>
  );
};
