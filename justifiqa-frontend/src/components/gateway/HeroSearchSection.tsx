import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
}) => {
  return (
    <section className="flex flex-col items-center text-center gap-6 w-full animate-fade-in">
      <div className="flex flex-col gap-3 max-w-[840px] mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-heading text-foreground">
          Akses Hukum Profesional &amp;{' '}
          <span className="text-gradient-gold">Terverifikasi</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-[720px] mx-auto font-normal leading-relaxed text-muted-foreground">
          Satu gerbang terpadu untuk verifikasi integritas berkas digital (SHA-256),
          konsultasi advokat berlisensi PERADI, dan transaksi escrow aman tersertifikasi.
        </p>
      </div>

      <form
        onSubmit={onSearchSubmit}
        className="w-full max-w-4xl mx-auto mt-2 flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl border border-border bg-card/85 backdrop-blur-xl shadow-lg transition-all"
      >
        <div className="relative flex-1 w-full flex items-center">
          <span className="pl-3 pr-2 text-muted-foreground text-lg shrink-0">
            🔍
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari layanan hukum, advokat spesialis, atau verifikasi berkas..."
            className="w-full h-11 border-none bg-transparent shadow-none px-2 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto h-11 px-8 font-bold gap-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm shrink-0"
        >
          <span>CARI ADVOKAT</span>
          <span>→</span>
        </Button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mt-1">
        <span className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider mr-2">
          Layanan Populer:
        </span>
        {POPULAR_CHIPS.map((chip) => (
          <Badge
            key={chip.topic}
            variant="outline"
            onClick={() => onChipClick(chip.topic)}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold cursor-pointer border border-border bg-secondary/60 text-secondary-foreground hover:bg-accent/15 hover:border-accent hover:text-accent transition-all shrink-0"
          >
            {chip.label}
          </Badge>
        ))}
      </div>
    </section>
  );
};
