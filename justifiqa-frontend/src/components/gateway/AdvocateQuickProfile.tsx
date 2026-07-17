import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Star, Briefcase, Clock, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

interface AdvocateQuickProfileProps {
  searchQuery: string;
}

export const AdvocateQuickProfile: React.FC<AdvocateQuickProfileProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const queryLabel = searchQuery.trim() || 'Hukum Perdata & Bisnis';

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-inner">
      {/* Top Status & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-extrabold px-3 py-1 text-xs gap-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </Badge>
            <Badge variant="outline" className="border-primary/40 text-primary font-extrabold px-3 py-1 text-xs rounded-full bg-primary/10">
              SIPP TERVERIFIKASI
            </Badge>
          </div>
        </div>
        <span className="text-xs font-bold text-muted uppercase tracking-widest">
          ID: ADV-8891-JKT
        </span>
      </div>

      {/* Advocate Name & Location */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
          Dr. Aryo Wibisono, S.H., M.H.
        </h3>
        <p className="text-sm sm:text-base text-muted font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span>Jakarta Pusat • Spesialis {queryLabel}</span>
        </p>
      </div>

      {/* Stats Box (Using `.preview-stat-box` from index.css) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-2 rounded-xl border border-border bg-muted/20">
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-amber-400 font-black text-lg sm:text-xl">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>4.97</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-muted uppercase tracking-wider mt-0.5">RATING</span>
        </div>
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-foreground font-black text-lg sm:text-xl">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>312</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-muted uppercase tracking-wider mt-0.5">KASUS</span>
        </div>
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-emerald-400 font-black text-lg sm:text-xl">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>&lt; 2 Jam</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-muted uppercase tracking-wider mt-0.5">RESPON</span>
        </div>
      </div>

      {/* Specialization Tags (`Design System First & Anti-Wrap`) */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {['Somasi Terbuka', 'Gugatan Perdata', 'Perjanjian Bisnis', 'Mediasi Sengketa'].map((tag) => (
          <span key={tag} className="preview-chip-pill">
            {tag}
          </span>
        ))}
      </div>

      {/* Price Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-primary/30 bg-primary/10">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm sm:text-base font-bold text-foreground">Konsultasi pertama terenkripsi E2EE</span>
        </div>
        <span className="text-base sm:text-lg font-black text-primary font-heading">
          Gratis <span className="text-xs font-bold text-muted">/ 30 mnt</span>
        </span>
      </div>

      {/* Action CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Button
          variant="outline"
          onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
          className="w-full h-12 rounded-2xl font-bold text-base border-border hover:bg-accent text-foreground transition-all"
        >
          Lihat Profil Lengkap
        </Button>
        <Button
          variant="default"
          onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
          className="w-full h-12 rounded-2xl font-black text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <span>Konsultasi Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
