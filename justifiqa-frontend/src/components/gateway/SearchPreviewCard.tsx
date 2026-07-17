import React from 'react';
import { X } from 'lucide-react';
import { AdvocateQuickProfile } from './AdvocateQuickProfile';

interface SearchPreviewCardProps {
  searchQuery: string;
  onClose: () => void;
}

export const SearchPreviewCard: React.FC<SearchPreviewCardProps> = ({
  searchQuery,
  onClose,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 z-40 animate-fade-in px-4">
      <div className="preview-card-gateway">
        {/* Top Glowing Accent Stripe (Perfectly conforming to outer border-radius via overflow-hidden) */}
        <div className="absolute left-0 right-0 top-0 h-[6px] bg-gradient-to-r from-amber-500 via-yellow-400 to-blue-500 z-30" />

        {/* Header Bar (Geometric continuity inside curved obsidian drawer) */}
        <div className="relative z-20 flex items-center justify-between pb-5 border-b border-white/[0.08] pt-2">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            <span className="font-extrabold text-sm sm:text-base text-amber-400 font-heading tracking-tight drop-shadow-sm">
              ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white cursor-pointer font-bold px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
            <span>Tutup Preview</span>
          </button>
        </div>

        {/* Advocate Profile Container */}
        <div className="relative z-20 pt-1">
          <AdvocateQuickProfile searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};
