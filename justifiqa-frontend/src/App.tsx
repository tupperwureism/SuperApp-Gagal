import React from 'react';
import { BaseLayout } from './components/BaseLayout';
import { Scale, Sparkles, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-12 py-6 animate-fade-in">
          {/* Hero Banner with Dynamic Role Context */}
          <div className="glass-card p-8 md:p-12 relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-[#d4af37]/15 to-[#3b82f6]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sesi Aktif: {session.userName} ({session.role})</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Keadilan Digital Berstandar <span className="text-gradient-gold">BCE Enterprise</span>
              </h1>

              <p className="text-secondary text-base md:text-lg max-w-2xl">
                Selamat datang di antarmuka prototipe interaktif Justifiqa. 
                Gunakan pengalih peran di atas untuk menguji alur sebagai Klien, Advokat, atau AI Navigator.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button className="btn btn-primary-gold">
                  <span>Mulai Konsultasi &amp; Reservasi Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn btn-secondary-glass">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Buka Generator IRAC &amp; Draf Dokumen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default App;
