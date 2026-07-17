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
    <div className="flex flex-col gap-6">
      {/* Top Status & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-extrabold px-3 py-1 text-xs gap-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </Badge>
            <Badge variant="outline" className="border-amber-500/40 text-amber-300 font-extrabold px-3 py-1 text-xs rounded-full bg-amber-500/10 shadow-sm">
              SIPP TERVERIFIKASI
            </Badge>
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
          ID: ADV-8891-JKT
        </span>
      </div>

      {/* Advocate Name & Location */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading drop-shadow-sm">
          Dr. Aryo Wibisono, S.H., M.H.
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Jakarta Pusat • Spesialis {queryLabel}</span>
        </p>
      </div>

      {/* Stats Section (Breathable Glass Grid without Nested Box Clutter) */}
      <div className="grid grid-cols-3 divide-x divide-white/[0.08] py-4 my-1 border-y border-white/[0.08]">
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-amber-400 font-black text-lg sm:text-xl">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>4.97</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">RATING</span>
        </div>
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-white font-black text-lg sm:text-xl">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>312</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">KASUS</span>
        </div>
        <div className="preview-stat-box">
          <div className="flex items-center gap-1.5 text-emerald-400 font-black text-lg sm:text-xl">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>&lt; 2 Jam</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">RESPON</span>
        </div>
      </div>

      {/* Specialization Tags */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {['Somasi Terbuka', 'Gugatan Perdata', 'Perjanjian Bisnis', 'Mediasi Sengketa'].map((tag) => (
          <span key={tag} className="preview-chip-pill">
            {tag}
          </span>
        ))}
      </div>

      {/* Price Highlight Row (Glowing Gradient Glass Emphasis without Heavy Borders) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/25 text-foreground shadow-sm">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm sm:text-base font-bold text-slate-200">Konsultasi pertama terenkripsi E2EE</span>
        </div>
        <span className="text-base sm:text-lg font-black text-amber-400 font-heading">
          Gratis <span className="text-xs font-bold text-slate-400">/ 30 mnt</span>
        </span>
      </div>

      {/* Action CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Button
          variant="outline"
          onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
          className="w-full h-12 rounded-2xl font-bold text-base border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white transition-all shadow-sm"
        >
          Lihat Profil Lengkap
        </Button>
        <Button
          variant="default"
          onClick={() => navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery)}`)}
          className="w-full h-12 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
        >
          <span>Konsultasi Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
