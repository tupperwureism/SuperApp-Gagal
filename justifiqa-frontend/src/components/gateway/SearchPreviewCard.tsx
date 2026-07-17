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
      {/* Outer Shell (Pure Structural Frame with 0 padding and guaranteed border radius clip) */}
      <div className="preview-card-gateway">
        {/* Top Glowing Accent Stripe conforming to outer border-radius */}
        <div className="absolute left-0 right-0 top-0 h-[6px] bg-gradient-to-r from-amber-500 via-yellow-400 to-blue-500 z-30 pointer-events-none" />

        {/* INNER SAFE-ZONE WRAPPER: Enforcing massive 56px-64px (`px-10 sm:px-16 py-12 sm:py-16`) physical clearance from all outer walls */}
        <div className="relative z-20 px-10 sm:px-16 py-12 sm:py-16 flex flex-col gap-9">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] pt-2">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)] shrink-0" />
              <span className="font-extrabold text-sm sm:text-base text-amber-400 font-heading tracking-tight drop-shadow-sm">
                ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white cursor-pointer font-bold px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] transition-all shadow-sm shrink-0"
            >
              <X className="w-4 h-4 shrink-0" />
              <span>Tutup Preview</span>
            </button>
          </div>

          {/* Advocate Profile Container */}
          <div className="pt-2">
            <AdvocateQuickProfile searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};
