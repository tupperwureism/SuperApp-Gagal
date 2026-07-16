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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm transition-colors">
      <div
        onClick={onLogoClick}
        className="flex items-center gap-3 font-heading font-extrabold text-xl sm:text-2xl text-foreground cursor-pointer group shrink-0"
        role="button"
        tabIndex={0}
      >
        <span className="transition-transform group-hover:scale-[1.02]">
          ⚖️ JUSTICA
        </span>
        <span className="hidden sm:flex items-center text-xs sm:text-sm font-medium text-muted-foreground border-l-2 border-border pl-3">
          Platform Konsultasi &amp; Layanan Hukum Profesional
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleTheme}
          className="gap-2 font-semibold shrink-0"
        >
          <span>{isDark ? '🌙' : '☀️'}</span>
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </Button>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onVerifyClick}
          className="gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shrink-0"
        >
          <span>🛡️</span>
          <span>Verifikasi Dokumen SHA-256</span>
        </Button>
      </div>
    </header>
  );
};
