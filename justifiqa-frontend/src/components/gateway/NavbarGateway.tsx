import React from 'react';
import { Button } from '@/components/ui/button';

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
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Subtitle */}
        <div
          onClick={onLogoClick}
          className="navbar-brand-pill cursor-pointer group transition-transform hover:scale-[1.01]"
          role="button"
          tabIndex={0}
        >
          <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-foreground">
            ⚖️ JUSTICA
          </span>
          <span className="hidden lg:inline-flex items-center text-xs sm:text-sm font-semibold text-muted border-l-2 border-border/80 pl-3">
            Platform Konsultasi &amp; Layanan Hukum Profesional
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onToggleTheme}
            className="navbar-btn-action bg-card hover:bg-accent text-foreground border-border"
          >
            <span>{isDark ? '🌙' : '☀️'}</span>
            <span className="hidden sm:inline">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={onVerifyClick}
            className="navbar-btn-action bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <span>🛡️</span>
            <span>Verifikasi Dokumen SHA-256</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
