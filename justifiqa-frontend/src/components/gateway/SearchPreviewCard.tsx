import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Star, Briefcase, Clock, CheckCircle2, ArrowRight, X, MapPin } from 'lucide-react';

interface SearchPreviewCardProps {
  searchQuery: string;
  onClose: () => void;
}

export const SearchPreviewCard: React.FC<SearchPreviewCardProps> = ({
  searchQuery,
  onClose,
}) => {
  const navigate = useNavigate();
  const queryLabel = searchQuery.trim() || 'Hukum Perdata & Bisnis';

  return (
    <div className="w-full max-w-4xl mx-auto -mt-6 z-40 animate-fade-in px-4">
      <Card className="w-full p-6 sm:p-8 rounded-3xl border border-primary/40 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 relative overflow-hidden transition-all">
        {/* Top Glowing Accent Stripe */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-primary via-amber-400 to-blue-500" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-border pt-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-sm sm:text-base text-primary font-heading tracking-tight">
              ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground cursor-pointer font-bold px-3 py-1.5 rounded-xl hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Tutup Preview</span>
          </button>
        </div>

        {/* Featured Advocate Profile Container */}
        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-border bg-background/80 shadow-inner">
          {/* Top Status & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-extrabold px-3 py-1 text-xs gap-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </Badge>
                <Badge variant="outline" className="border-primary/40 text-primary font-extrabold px-3 py-1 text-xs rounded-full bg-primary/10">
                  SIPP TERVERIFIKASI
                </Badge>
              </div>
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              ID: ADV-8891-JKT
            </span>
          </div>

          {/* Advocate Name & Location Info */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
              Dr. Aryo Wibisono, S.H., M.H.
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Jakarta Pusat • Spesialis {queryLabel}</span>
            </p>
          </div>

          {/* Stats Bar (3 Columns) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl border border-border bg-card/60">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 text-amber-400 font-black text-lg sm:text-xl">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>4.97</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                RATING
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-x border-border px-2">
              <div className="flex items-center gap-1.5 text-foreground font-black text-lg sm:text-xl">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>312</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                KASUS
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-lg sm:text-xl">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>&lt; 2 Jam</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                RESPON
              </span>
            </div>
          </div>

          {/* Specialization Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['Somasi Terbuka', 'Gugatan Perdata', 'Perjanjian Bisnis', 'Mediasi Sengketa'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-border bg-card text-foreground shadow-2sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price & Pro Bono Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-primary/30 bg-primary/10">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm sm:text-base font-bold text-foreground">
                Konsultasi pertama terenkripsi E2EE
              </span>
            </div>
            <span className="text-base sm:text-lg font-black text-primary font-heading">
              Gratis <span className="text-xs font-bold text-muted-foreground">/ 30 mnt</span>
            </span>
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
              className="w-full h-12 rounded-2xl font-bold text-sm sm:text-base border-border hover:bg-accent text-foreground transition-all shadow-sm"
            >
              Lihat Profil Lengkap
            </Button>

            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
              className="w-full h-12 rounded-2xl font-black text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Konsultasi Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
