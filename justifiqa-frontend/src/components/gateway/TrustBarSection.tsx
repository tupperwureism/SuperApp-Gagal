import React from 'react';

interface TrustBarSectionProps {
  isDark?: boolean;
}

export const TrustBarSection: React.FC<TrustBarSectionProps> = () => {
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
    <section className="w-full max-w-6xl mx-auto pb-8 px-4 sm:px-6">
      <div className="w-full rounded-xl border border-border bg-card/85 backdrop-blur-md p-6 shadow-sm flex flex-wrap items-center justify-around gap-6 transition-colors">
        {TRUST_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 font-bold text-sm md:text-base text-foreground shrink-0"
          >
            <span className="text-xl md:text-2xl shrink-0">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
