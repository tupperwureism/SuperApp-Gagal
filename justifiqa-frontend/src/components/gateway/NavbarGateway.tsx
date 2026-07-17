import React from 'react';

interface NavbarGatewayProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onLogoClick: () => void;
  onVerifyClick: () => void;
}

export const NavbarGateway: React.FC<NavbarGatewayProps> = ({
  isDark,
  onToggleTheme,
  onLogoClick,
  onVerifyClick,
}) => {
  return (
    <header className="gateway-navbar-shell">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 flex items-center justify-between gap-4 py-2">
        {/* Brand Logo & Subtitle */}
        <div
          onClick={onLogoClick}
          className="navbar-brand-pill cursor-pointer group transition-transform hover:scale-[1.01]"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">⚖️</span>
            <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-white drop-shadow-sm">
              JUSTICA
            </span>
          </div>
          <span className="hidden lg:inline-flex items-center text-xs sm:text-sm font-semibold text-slate-300 border-l-2 border-white/[0.12] pl-3.5 tracking-wide">
            Platform Konsultasi &amp; Layanan Hukum Profesional
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            className="navbar-btn-action bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.1] shadow-sm cursor-pointer"
          >
            <span>{isDark ? '🌙' : '☀️'}</span>
            <span className="hidden sm:inline">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <button
            type="button"
            onClick={onVerifyClick}
            className="navbar-btn-action bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 font-extrabold shadow-[0_4px_20px_rgba(245,158,11,0.35)] border-0 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <span>🛡️</span>
            <span>Verifikasi Dokumen SHA-256</span>
          </button>
        </div>
      </div>
    </header>
  );
};
