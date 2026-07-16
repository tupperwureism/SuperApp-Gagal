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
        className="search-container-hero mt-2"
      >
        <div className="relative flex-1 w-full flex items-center">
          <span className="pl-3 pr-2 text-gray-400 text-lg flex-shrink-0">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari layanan hukum, advokat spesialis, atau verifikasi berkas..."
            className="w-full py-2 bg-transparent border-none text-sm sm:text-base outline-none text-inherit placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="btn-search-hero w-full sm:w-auto"
        >
          <span>CARI ADVOKAT</span>
          <span>→</span>
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-[880px] mx-auto mt-1">
        <span className="text-xs sm:text-sm text-gray-300 font-bold uppercase tracking-wider mr-1">
          Layanan Populer:
        </span>
        {POPULAR_CHIPS.map((chip) => (
          <button
            key={chip.topic}
            type="button"
            onClick={() => onChipClick(chip.topic)}
            className={`chip-gateway ${
              isDark
                ? 'bg-[#1F2937]/80 border-[#374151] hover:border-[#3B82F6] hover:bg-blue-500/15 text-gray-200'
                : 'bg-slate-100 border-slate-300 hover:border-[#3B82F6] hover:bg-blue-50 text-slate-800'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </section>
  );
};
