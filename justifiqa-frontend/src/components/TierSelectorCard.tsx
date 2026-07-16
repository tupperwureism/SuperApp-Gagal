import React from 'react';
import { CheckCircle2, Lock, ArrowRight, Sparkles, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { ConsultationTier } from '../types/consultation';

interface TierSelectorCardProps {
  tier: ConsultationTier;
  isSelected?: boolean;
  onSelect: (tier: ConsultationTier) => void;
}

export const TierSelectorCard: React.FC<TierSelectorCardProps> = ({
  tier,
  isSelected = false,
  onSelect,
}) => {
  const getCardStyle = () => {
    if (tier.highlightColor === 'gold') return 'glass-card glass-card-gold border-amber-500/50 bg-slate-900/90';
    if (tier.highlightColor === 'red') return 'glass-card border-red-500/50 bg-slate-900/90 hover:border-red-500';
    return 'glass-card glass-card-blue border-blue-500/40 bg-slate-900/90';
  };

  const getBadgeStyle = () => {
    if (tier.highlightColor === 'gold') return 'badge badge-gold font-bold';
    if (tier.highlightColor === 'red') return 'badge bg-red-500/20 text-red-300 border border-red-500/50 font-bold';
    return 'badge badge-blue font-bold';
  };

  return (
    <div
      className={`${getCardStyle()} flex flex-col justify-between h-full relative transition-all duration-300 p-6 rounded-2xl ${
        isSelected ? 'ring-2 ring-amber-400 shadow-[0_0_35px_rgba(212,175,55,0.45)]' : ''
      }`}
    >
      {/* Top Banner & Badge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={getBadgeStyle()}>{tier.badgeText}</span>
          {tier.isEscrowRequired ? (
            <span className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-500/15 px-2.5 py-1 rounded-md border border-amber-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>Escrow Mutex Required</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-blue-300 font-bold bg-blue-500/15 px-2.5 py-1 rounded-md border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Instant Access</span>
            </span>
          )}
        </div>

        {/* Title & Price */}
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">{tier.title}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-2xl md:text-3xl font-extrabold ${
              tier.highlightColor === 'gold' ? 'text-gradient-gold' : 'text-white'
            }`}>
              {tier.priceLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed font-medium">
            {tier.description}
          </p>
        </div>

        {/* Feature List */}
        <div className="pt-4 border-t border-white/15 space-y-2.5">
          <p className="text-xs uppercase tracking-wider text-amber-300 font-extrabold">
            Spesifikasi Layanan:
          </p>
          <ul className="space-y-2">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 font-medium leading-snug">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  tier.highlightColor === 'gold' ? 'text-amber-400' : 'text-blue-400'
                }`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended For & Action Button */}
      <div className="mt-6 pt-4 border-t border-white/15 space-y-4">
        <div className="bg-white/10 rounded-xl p-3.5 border border-white/15 text-xs text-slate-200 flex items-start gap-2.5">
          {tier.highlightColor === 'red' ? (
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-extrabold text-white">Rekomendasi: </span>
            <span className="font-medium text-slate-100">{tier.recommendedFor}</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(tier)}
          className={`w-full btn py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            tier.highlightColor === 'gold'
              ? 'btn-primary-gold animate-pulse-gold text-black'
              : tier.highlightColor === 'red'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:from-red-500 hover:to-rose-500'
              : 'btn-primary-blue text-white'
          }`}
        >
          <span>Pilih {tier.id === 'TIER_1_AI' ? 'Navigasi AI' : 'Jadwal & Bayar Escrow'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
