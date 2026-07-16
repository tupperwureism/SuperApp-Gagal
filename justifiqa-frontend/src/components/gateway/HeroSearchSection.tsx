import React from 'react';

interface HeroSearchSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onChipClick: (topic: string) => void;
  isDark?: boolean;
}

const POPULAR_CHIPS = [
  { label: '🛡️ Somasi Terbuka', topic: 'somasi' },
  { label: '⚖️ Gugatan Sederhana', topic: 'gugatan' },
  { label: '📝 Perjanjian Damai', topic: 'perjanjian' },
  { label: '🔍 Verifikasi Hash', topic: 'verifikasi' },
];

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onChipClick,
  isDark = true,
}) => {
  return (
    <section className="flex flex-col items-center text-center gap-6 w-full animate-fade-in">
      <div className="flex flex-col gap-3 max-w-[840px] mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-heading">
          Akses Hukum Profesional &amp;{' '}
          <span className="text-gradient-gold">Terverifikasi</span>
        </h1>
        <p
          className={`text-sm sm:text-base md:text-lg max-w-[720px] mx-auto font-normal leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-slate-600'
          }`}
        >
          Satu gerbang terpadu untuk verifikasi integritas berkas digital (SHA-256),
          konsultasi advokat berlisensi PERADI, dan transaksi escrow aman tersertifikasi.
        </p>
      </div>

      <form
        onSubmit={onSearchSubmit}
        className="w-full max-w-[800px] mx-auto flex flex-col sm:flex-row items-center gap-3 mt-2"
      >
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari layanan hukum, advokat spesialis, atau verifikasi berkas..."
            className={`w-full h-[54px] pl-12 pr-4 rounded-[14px] border text-sm sm:text-base outline-none transition-all ${
              isDark
                ? 'bg-[#1F2937]/90 border-[#374151] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#F9FAFB] placeholder-gray-400'
                : 'bg-white border-slate-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-slate-800 placeholder-slate-400'
            }`}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary-gold h-[54px] px-8 rounded-[14px] font-bold text-sm sm:text-base flex-shrink-0 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          CARI ADVOKAT
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-[800px] mx-auto mt-1">
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mr-1">
          Layanan Populer:
        </span>
        {POPULAR_CHIPS.map((chip) => (
          <button
            key={chip.topic}
            type="button"
            onClick={() => onChipClick(chip.topic)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#1F2937]/80 border-[#374151] hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-300'
                : 'bg-slate-100 border-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-700'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </section>
  );
};
