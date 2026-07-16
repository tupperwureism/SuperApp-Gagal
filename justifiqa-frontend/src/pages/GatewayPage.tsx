import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarGateway } from '../components/gateway/NavbarGateway';
import { HeroSearchSection } from '../components/gateway/HeroSearchSection';
import { PortalCardsGrid } from '../components/gateway/PortalCardsGrid';
import { TrustBarSection } from '../components/gateway/TrustBarSection';
import { VerifierPanel } from '../components/gateway/VerifierPanel';

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
      document.body.style.backgroundColor = '#0B0F19';
      document.body.style.color = '#F9FAFB';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#1E293B';
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
    <div
      className={`min-h-screen flex flex-col justify-between font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F19] text-[#F9FAFB]' : 'bg-[#F8FAFC] text-[#1E293B]'
      }`}
    >
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
              <div
                className={`w-full max-w-[880px] mx-auto -mt-8 mb-12 p-6 rounded-[16px] border shadow-2xl z-40 animate-fade-in ${
                  isDark
                    ? 'bg-[#111827] border-[#3B82F6]'
                    : 'bg-white border-[#2563EB] shadow-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#374151]">
                  <span className="font-extrabold text-sm md:text-[0.95rem] text-[#60A5FA]">
                    ⚡ HASIL PENCARIAN CEPAT ADVOKAT TERVERIFIKASI (`CL-02`)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSearchPreview(false)}
                    className="text-xs text-gray-400 hover:text-white cursor-pointer font-semibold"
                  >
                    ✖ Tutup Preview
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-[12px] border flex flex-col justify-between gap-3 ${
                      isDark ? 'bg-[#0B0F19] border-[#374151]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-[0.95rem]">
                        <span>Dr. Mahendra Kusuma, S.H., M.H.</span>
                        <span className="text-[#10B981] text-xs font-bold">● ONLINE</span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-slate-500'
                        }`}
                      >
                        Spesialisasi: Hukum Perdata &amp; Sengketa Bisnis • SIPP MA Terverifikasi
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="font-extrabold text-sm text-[#60A5FA]">
                        Rp 350.000 / sesi
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'Perdata')}`)
                        }
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Pilih Advokat →
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-[12px] border flex flex-col justify-between gap-3 ${
                      isDark ? 'bg-[#0B0F19] border-[#374151]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-sm md:text-[0.95rem]">
                        <span>Adv. Rina Kartika, S.H., M.Kn.</span>
                        <span className="text-[#10B981] text-xs font-bold">● ONLINE</span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-slate-500'
                        }`}
                      >
                        Spesialisasi: Hukum Ketenagakerjaan &amp; PHK • Kuota Pro Bono Tersedia
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="font-extrabold text-sm text-[#10B981]">PRO BONO (Rp 0)</span>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/client/dashboard?q=${encodeURIComponent(searchQuery || 'PHK')}`)
                        }
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Pilih Advokat →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
      <footer
        className={`py-8 px-4 text-center border-t text-xs md:text-sm font-medium mt-8 ${
          isDark
            ? 'border-[#374151] text-[#9CA3AF] bg-[#0B0F19]'
            : 'border-slate-200 text-slate-500 bg-[#F8FAFC]'
        }`}
      >
        © 2026 JUSTICA Legal Platform • Seluruh sesi konsultasi dilindungi kerahasiaan hubungan
        advokat-klien (Attorney-Client Privilege) &amp; WORM Audit Trail.
      </footer>
    </div>
  );
};
