import React from 'react';
import { PortalCardItem } from './PortalCardItem';

interface PortalCardsGridProps {
  isDark?: boolean;
}

export const PortalCardsGrid: React.FC<PortalCardsGridProps> = ({ isDark = true }) => {
  return (
    <section className="w-full max-w-[1180px] mx-auto flex flex-col items-center">
      <div className="flex items-center justify-center gap-4 mb-8 w-full">
        <div className={`h-px w-16 sm:w-20 ${isDark ? 'bg-[#374151]' : 'bg-slate-300'}`} />
        <h2
          className={`text-center font-extrabold text-base md:text-[1.35rem] uppercase tracking-[0.08em] ${
            isDark ? 'text-[#F9FAFB]' : 'text-[#111827]'
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          PILIH AKSES PORTAL
        </h2>
        <div className={`h-px w-16 sm:w-20 ${isDark ? 'bg-[#374151]' : 'bg-slate-300'}`} />
      </div>

      <div className="portal-cards-grid mb-14">
        {/* CARD 1: KLIEN HUKUM */}
        <PortalCardItem
          isDark={isDark}
          badge="👤 PORTAL PENCARI KEADILAN"
          badgeClass="bg-[#3B82F6]/15 text-[#60A5FA] border border-[#2563EB]"
          title="KLIEN HUKUM"
          description="Temukan advokat berlisensi, mulai konsultasi hukum daring (E2EE) maupun luring, tangani sengketa, atau ajukan bantuan hukum Pro Bono secara aman dengan perlindungan Escrow."
          btnText="Masuk / Daftar sebagai Klien"
          btnClass="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          to="/client/auth"
          topStripeClass="bg-gradient-to-r from-[#2563EB] to-[#60A5FA]"
        />

        {/* CARD 2: MITRA ADVOKAT */}
        <PortalCardItem
          isDark={isDark}
          badge="⚖️ PORTAL PRAKTISI HUKUM"
          badgeClass="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]"
          title="MITRA ADVOKAT"
          description="Kelola praktik profesional Anda, verifikasi SIPP Mahkamah Agung RI, jadwalkan sesi konsultasi, terbitkan opini hukum ber-eMeterai SHA-256, dan cairkan honor honorarium via BI-FAST."
          btnText="Masuk / Daftar Mitra Advokat"
          btnClass={
            isDark
              ? 'bg-[#1F2937] hover:bg-[#374151] border border-[#374151] hover:border-[#10B981] text-[#F9FAFB] hover:text-[#10B981]'
              : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-[#10B981] text-slate-800 hover:text-[#10B981]'
          }
          to="/advocate/auth"
          topStripeClass="bg-gradient-to-r from-[#10B981] to-[#059669]"
        />
      </div>
    </section>
  );
};
