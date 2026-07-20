// src/components/client/ClientHeaderAndTabs.tsx
import { Link } from 'react-router-dom';
import { Scale, Sun, Moon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientTabNav } from './ClientTabNav';
import type { ClientTabKey } from '@/types/client';

interface ClientHeaderAndTabsProps {
  activeTab: ClientTabKey;
  onTabChange: (tab: ClientTabKey) => void;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate?: (path: string) => void;
}

export function ClientHeaderAndTabs({
  activeTab,
  onTabChange,
  themeMode,
  onToggleTheme,
  onNavigate,
}: ClientHeaderAndTabsProps) {
  return (
    <header className="gateway-navbar-shell">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="navbar-brand-pill flex-shrink-0" onClick={() => onNavigate?.('/')}>
          <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-extrabold text-base tracking-tight text-foreground font-heading">JUSTICA</span>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Portal Klien Terverifikasi</span>
          </div>
        </Link>

        {/* Tab Switcher — desktop */}
        <ClientTabNav activeTab={activeTab} onTabChange={onTabChange} className="hidden md:flex" />

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            className="rounded-full gap-1.5 font-semibold h-9 px-3"
          >
            {themeMode === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 font-semibold h-9 px-3"
          >
            <Link to="/" onClick={() => onNavigate?.('/')}>
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Pengaturan</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Tab Switcher — mobile */}
      <div className="md:hidden w-full px-4 pb-3 -mt-1">
        <ClientTabNav activeTab={activeTab} onTabChange={onTabChange} className="flex" />
      </div>
    </header>
  );
}
