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
    <div className="w-full max-w-4xl mx-auto my-6 z-40 animate-fade-in px-4">
      <div className="preview-card-gateway">
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
            className="flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-foreground cursor-pointer font-bold px-3 py-1.5 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Tutup Preview</span>
          </button>
        </div>

        {/* Advocate Profile Container */}
        <AdvocateQuickProfile searchQuery={searchQuery} />
      </div>
    </div>
  );
};
