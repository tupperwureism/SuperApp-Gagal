import React, { useState, useEffect } from 'react';
import { NavbarGateway } from '../components/gateway/NavbarGateway';
import { HeroSearchSection } from '../components/gateway/HeroSearchSection';
import { PortalCardsGrid } from '../components/gateway/PortalCardsGrid';
import { TrustBarSection } from '../components/gateway/TrustBarSection';
import { VerifierPanel } from '../components/gateway/VerifierPanel';
import { SearchPreviewCard } from '../components/gateway/SearchPreviewCard';

export const GatewayPage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'gateway' | 'verifier'>('gateway');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchPreview, setShowSearchPreview] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setShowSearchPreview(false);
      return;
    }
    setShowSearchPreview(true);
  };

  const handleChipClick = (topic: string) => {
    setSearchQuery(topic);
    setShowSearchPreview(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans transition-colors duration-300 bg-background text-foreground selection:bg-blue-500/30 relative overflow-x-clip">
      {/* Background Aesthetic Watermarks & Gradients */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* 1. TOPBAR GATEWAY ORCHESTRATOR */}
      <NavbarGateway
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onLogoClick={() => setActiveScreen('gateway')}
        onVerifyClick={() => setActiveScreen('verifier')}
      />

      {/* 2. SCREEN 1: GERBANG UTAMA (GATEWAY-01 GOLDEN MASTER) */}
      {activeScreen === 'gateway' && (
        <main className="flex-1 w-full flex flex-col items-center justify-between px-4 sm:px-6 md:px-8">
          {/* HARMONIOUS BALANCED SPACING: gap-24 sm:gap-32 (96px-128px) between Hero, Portal Grid, and Trust Bar */}
          <div className="w-full flex flex-col items-center gap-24 sm:gap-32 pt-12 pb-24 sm:pt-16 sm:pb-32 max-w-7xl mx-auto">
            <HeroSearchSection
              isDark={isDark}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onChipClick={handleChipClick}
            />

            {/* QUICK PREVIEW MODULAR CARD (CL-02) */}
            {showSearchPreview && (
              <SearchPreviewCard
                searchQuery={searchQuery}
                onClose={() => setShowSearchPreview(false)}
              />
            )}

            <PortalCardsGrid isDark={isDark} />

            <TrustBarSection isDark={isDark} />
          </div>
        </main>
      )}

      {/* 3. SCREEN 2: VERIFIKASI DOKUMEN (PUBLIC-VERIFY) */}
      {activeScreen === 'verifier' && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
          <VerifierPanel isDark={isDark} onBackToGateway={() => setActiveScreen('gateway')} />
        </main>
      )}

      {/* 4. FOOTER */}
      <footer className="py-8 px-6 text-center border-t border-white/10 bg-slate-950 text-slate-400 text-xs md:text-sm font-medium mt-8">
        © 2026 JUSTICA Legal Platform • Seluruh sesi konsultasi dilindungi kerahasiaan hubungan
        advokat-klien (Attorney-Client Privilege) &amp; WORM Audit Trail.
      </footer>
    </div>
  );
};
