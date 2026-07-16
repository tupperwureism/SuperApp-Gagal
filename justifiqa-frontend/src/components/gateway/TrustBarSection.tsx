import React from 'react';

interface TrustBarSectionProps {
  isDark?: boolean;
}

export const TrustBarSection: React.FC<TrustBarSectionProps> = ({ isDark = true }) => {
  const TRUST_ITEMS = [
    {
      icon: '🛡️',
      text: 'Advokat Berlisensi Resmi (SIPP MA Terverifikasi)',
    },
    {
      icon: '🔒',
      text: 'Rekening Bersama (Escrow ACID) Aman Terjamin',
    },
    {
      icon: '🗝️',
      text: 'Kerahasiaan Sesi Terjamin (Zero-Knowledge E2EE)',
    },
  ];

  return (
    <section className="w-full max-w-[1180px] mx-auto pb-8">
      <div
        className={`trust-bar-gateway transition-all duration-300 shadow-md ${
          isDark
            ? 'bg-[#111827]/85 border-[#374151]'
            : 'bg-white/85 border-slate-200 shadow-slate-200/50'
        }`}
      >
        {TRUST_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center gap-3 font-bold text-sm md:text-[0.95rem] box-border flex-shrink-0"
          >
            <span className="text-xl md:text-2xl flex-shrink-0">{item.icon}</span>
            <span className={isDark ? 'text-[#F9FAFB]' : 'text-[#111827]'}>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
