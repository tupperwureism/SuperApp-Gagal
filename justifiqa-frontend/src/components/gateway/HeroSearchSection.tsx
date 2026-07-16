import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, ShieldCheck, Scale, FileText, Hash } from 'lucide-react';

interface HeroSearchSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onChipClick: (topic: string) => void;
  isDark?: boolean;
}

const POPULAR_CHIPS = [
  { label: 'Somasi Terbuka', topic: 'somasi', icon: ShieldCheck },
  { label: 'Gugatan Sederhana', topic: 'gugatan', icon: Scale },
  { label: 'Perjanjian Damai', topic: 'perjanjian', icon: FileText },
  { label: 'Verifikasi Hash SHA-256', topic: 'verifikasi', icon: Hash },
];

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onChipClick,
}) => {
  return (
    <section className="flex flex-col items-center text-center gap-10 w-full animate-fade-in max-w-5xl mx-auto">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-4 max-w-[900px] mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-heading text-white">
          Akses Hukum Profesional &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
            Terverifikasi
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-[780px] mx-auto font-normal leading-relaxed text-slate-300">
          Satu gerbang terpadu untuk verifikasi integritas berkas digital (SHA-256),
          konsultasi advokat berlisensi PERADI, dan transaksi escrow aman tersertifikasi.
        </p>
      </div>

      {/* Hero Search Box (Generous height h-16 and clean shadow) */}
      <form
        onSubmit={onSearchSubmit}
        className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-3xl border border-white/20 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
      >
        <div className="relative flex-1 w-full flex items-center">
          <div className="pl-4 pr-3 text-slate-400 flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-400" />
          </div>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari layanan hukum, advokat spesialis, atau verifikasi berkas..."
            className="w-full h-14 border-none bg-transparent shadow-none px-2 text-base sm:text-lg text-white placeholder:text-slate-400 focus-visible:ring-0 font-medium"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto h-14 px-10 font-extrabold text-sm gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg transition-all shrink-0"
        >
          <span>CARI ADVOKAT</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Layanan Populer Pills Container (Generous spacing pt-2) */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto pt-2">
        <span className="text-xs sm:text-sm text-slate-400 font-extrabold uppercase tracking-widest mr-2 flex items-center">
          LAYANAN POPULER:
        </span>
        {POPULAR_CHIPS.map((chip) => {
          const IconComp = chip.icon;
          return (
            <Badge
              key={chip.topic}
              variant="outline"
              onClick={() => onChipClick(chip.topic)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer border border-white/15 bg-slate-900/80 text-slate-200 hover:bg-blue-600/20 hover:border-blue-400 hover:text-blue-300 transition-all shadow-md flex items-center gap-2"
            >
              <IconComp className="w-3.5 h-3.5 text-blue-400" />
              <span>{chip.label}</span>
            </Badge>
          );
        })}
      </div>
    </section>
  );
};
