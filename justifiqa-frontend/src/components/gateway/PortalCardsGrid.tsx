import React from 'react';
import { PortalCardItem } from './PortalCardItem';

interface PortalCardsGridProps {
  isDark?: boolean;
}

export const PortalCardsGrid: React.FC<PortalCardsGridProps> = ({ isDark = true }) => {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <div className="flex items-center justify-center gap-4 mb-8 w-full">
        <div className="h-px w-16 sm:w-20 bg-border" />
        <h2 className="text-center font-extrabold text-base md:text-xl uppercase tracking-widest text-foreground font-heading">
          PILIH AKSES PORTAL
        </h2>
        <div className="h-px w-16 sm:w-20 bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch mb-14">
        {/* CARD 1: KLIEN HUKUM */}
        <PortalCardItem
          isDark={isDark}
          badge="👤 PORTAL PENCARI KEADILAN"
          badgeClass="bg-blue-500/15 text-blue-400 border-blue-500/40"
          title="KLIEN HUKUM"
          description="Temukan advokat berlisensi, mulai konsultasi hukum daring (E2EE) maupun luring, tangani sengketa, atau ajukan bantuan hukum Pro Bono secara aman dengan perlindungan Escrow."
          btnText="Masuk / Daftar sebagai Klien"
          btnClass="bg-blue-600 hover:bg-blue-700 text-white border-0"
          to="/client/auth"
          topStripeClass="bg-gradient-to-r from-blue-600 to-blue-400"
        />

        {/* CARD 2: MITRA ADVOKAT */}
        <PortalCardItem
          isDark={isDark}
          badge="⚖️ PORTAL PRAKTISI HUKUM"
          badgeClass="bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
          title="MITRA ADVOKAT"
          description="Kelola praktik profesional Anda, verifikasi SIPP Mahkamah Agung RI, jadwalkan sesi konsultasi, terbitkan opini hukum ber-eMeterai SHA-256, dan cairkan honorarium via BI-FAST."
          btnText="Masuk / Daftar Mitra Advokat"
          btnClass="bg-secondary hover:bg-secondary/80 border border-border text-secondary-foreground hover:border-emerald-500 hover:text-emerald-400"
          to="/advocate/auth"
          topStripeClass="bg-gradient-to-r from-emerald-500 to-emerald-600"
        />
      </div>
    </section>
  );
};
