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
    <header className="topbar-gateway">
      <div
        onClick={onLogoClick}
        className="topbar-brand group"
        role="button"
        tabIndex={0}
      >
        <span className="transition-transform group-hover:scale-[1.02]">
          ⚖️ JUSTICA
        </span>
        <span className="topbar-subtitle hidden sm:flex">
          Platform Konsultasi &amp; Layanan Hukum Profesional
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <button
          type="button"
          onClick={onToggleTheme}
          className={`btn-topbar-toggle border ${
            isDark
              ? 'bg-[#1F2937] border-[#374151] hover:border-[#3B82F6] hover:bg-[#374151] text-[#F9FAFB]'
              : 'bg-slate-100 border-slate-300 hover:border-[#3B82F6] hover:bg-slate-200 text-slate-800'
          }`}
        >
          <span>{isDark ? '🌙' : '☀️'}</span>
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <button
          type="button"
          onClick={onVerifyClick}
          className="btn-topbar-action border border-[#8B5CF6] bg-[#8B5CF6]/15 hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white"
        >
          <span>🛡️</span>
          <span>Verifikasi Dokumen SHA-256</span>
        </button>
      </div>
    </header>
  );
};
