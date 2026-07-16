import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarGateway } from '../components/gateway/NavbarGateway';
import { HeroSearchSection } from '../components/gateway/HeroSearchSection';
import { PortalCardsGrid } from '../components/gateway/PortalCardsGrid';
import { TrustBarSection } from '../components/gateway/TrustBarSection';
import { VerifierPanel } from '../components/gateway/VerifierPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const GatewayPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen flex flex-col justify-between font-sans transition-colors duration-300 bg-background text-foreground">
      {/* 1. TOPBAR GATEWAY ORCHESTRATOR */}
      <NavbarGateway
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onLogoClick={() => setActiveScreen('gateway')}
        onVerifyClick={() => setActiveScreen('verifier')}
      />

      {/* 2. SCREEN 1: GERBANG UTAMA (GATEWAY-01) */}
      {activeScreen === 'gateway' && (
        <main className="flex-1 w-full flex flex-col items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="w-full flex flex-col items-center">
            <HeroSearchSection
              isDark={isDark}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onChipClick={handleChipClick}
            />

            {/* QUICK PREVIEW POPUP SIMULATION */}
            {showSearchPreview && (
              <Card className="w-full max-w-4xl mx-auto -mt-6 mb-12 p-6 rounded-2xl border border-accent bg-card/95 shadow-2xl z-40 animate-fade-in flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3.5 border-b border-border">
                  <span className="font-extrabold text-sm md:text-base text-accent font-heading">
                    ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSearchPreview(false)}
                    className="text-xs text-muted-foreground hover:text-foreground cursor-pointer font-semibold"
                  >
                    ✖ Tutup Preview
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-base text-foreground">
                        <span>Dr. Mahendra Kusuma, S.H., M.H.</span>
                        <span className="text-emerald-500 text-xs font-bold">● ONLINE</span>
                      </div>
                      <p className="text-xs mt-1 leading-relaxed text-muted-foreground">
                        Spesialisasi: Hukum Perdata &amp; Sengketa Bisnis • SIPP MA Terverifikasi
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="font-extrabold text-sm text-accent">
                        Rp 350.000 / sesi
                      </span>
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'Perdata')}`)
                        }
                        className="rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs"
                      >
                        Pilih Advokat →
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-base text-foreground">
                        <span>Adv. Rina Kartika, S.H., M.Kn.</span>
                        <span className="text-emerald-500 text-xs font-bold">● ONLINE</span>
                      </div>
                      <p className="text-xs mt-1 leading-relaxed text-muted-foreground">
                        Spesialisasi: Hukum Ketenagakerjaan &amp; PHK • Kuota Pro Bono Tersedia
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="font-extrabold text-sm text-emerald-500">PRO BONO (Rp 0)</span>
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'PHK')}`)
                        }
                        className="rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-xs"
                      >
                        Pilih Advokat →
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <PortalCardsGrid isDark={isDark} />
          </div>

          <TrustBarSection isDark={isDark} />
        </main>
      )}

      {/* 3. SCREEN 2: VERIFIKASI DOKUMEN (PUBLIC-VERIFY) */}
      {activeScreen === 'verifier' && (
        <main className="flex-1 w-full">
          <VerifierPanel isDark={isDark} onBackToGateway={() => setActiveScreen('gateway')} />
        </main>
      )}

      {/* 4. FOOTER */}
      <footer className="py-8 px-4 text-center border-t border-border bg-background text-muted-foreground text-xs md:text-sm font-medium mt-8">
        © 2026 JUSTICA Legal Platform • Seluruh sesi konsultasi dilindungi kerahasiaan hubungan
        advokat-klien (Attorney-Client Privilege) &amp; WORM Audit Trail.
      </footer>
    </div>
  );
};
