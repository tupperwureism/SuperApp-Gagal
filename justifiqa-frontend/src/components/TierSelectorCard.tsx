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
    if (tier.highlightColor === 'gold') return 'glass-card glass-card-gold border-amber-500/40';
    if (tier.highlightColor === 'red') return 'glass-card border-red-500/40 hover:border-red-500';
    return 'glass-card glass-card-blue border-blue-500/30';
  };

  const getBadgeStyle = () => {
    if (tier.highlightColor === 'gold') return 'badge badge-gold';
    if (tier.highlightColor === 'red') return 'badge bg-red-500/20 text-red-400 border border-red-500/40';
    return 'badge badge-blue';
  };

  return (
    <div
      className={`${getCardStyle()} flex flex-col justify-between h-full relative transition-all duration-300 ${
        isSelected ? 'ring-2 ring-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.4)]' : ''
      }`}
    >
      {/* Top Banner & Badge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className={getBadgeStyle()}>{tier.badgeText}</span>
          {tier.isEscrowRequired ? (
            <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              <Lock className="w-3 h-3" />
              <span>Escrow Mutex Required</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Direct Instant Access</span>
            </span>
          )}
        </div>

        {/* Title & Price */}
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{tier.title}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-2xl md:text-3xl font-extrabold ${
              tier.highlightColor === 'gold' ? 'text-gradient-gold' : 'text-white'
            }`}>
              {tier.priceLabel}
            </span>
          </div>
          <p className="text-xs text-secondary mt-2.5 leading-relaxed">{tier.description}</p>
        </div>

        {/* Feature List */}
        <div className="pt-4 border-t border-white/10 space-y-2.5">
          <p className="text-xs uppercase tracking-wider text-muted font-semibold">
            Spesifikasi Layanan:
          </p>
          <ul className="space-y-2">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
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
      <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-[11px] text-slate-300 flex items-start gap-2">
          {tier.highlightColor === 'red' ? (
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-semibold text-white">Rekomendasi: </span>
            {tier.recommendedFor}
          </div>
        </div>

        <button
          onClick={() => onSelect(tier)}
          className={`w-full btn ${
            tier.highlightColor === 'gold'
              ? 'btn-primary-gold animate-pulse-gold'
              : tier.highlightColor === 'red'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:from-red-500 hover:to-rose-500'
              : 'btn-primary-blue'
          }`}
        >
          <span>Pilih {tier.id === 'TIER_1_AI' ? 'Navigasi AI' : 'Jadwal & Bayar Escrow'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
