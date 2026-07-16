import React, { useState } from 'react';
import { BaseLayout } from './components/BaseLayout';
import { ConsultationSection } from './components/ConsultationSection';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { IracSection } from './components/IracSection';
import type { ConsultationTier, EscrowTransaction } from './types/consultation';
import type { IracAnalysis } from './types/irac';
import { Scale, Sparkles, ArrowRight, CheckCircle2, Key, Database } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<ConsultationTier | null>(null);
  const [latestTransaction, setLatestTransaction] = useState<EscrowTransaction | null>(null);
  const [activeIrac, setActiveIrac] = useState<IracAnalysis | null>(null);

  const handleSelectTier = (tier: ConsultationTier) => {
    setSelectedTier(tier);
    console.log('Opening Booking Modal for Tier:', tier);
  };

  const handleBookingSuccess = (tx: EscrowTransaction) => {
    setLatestTransaction(tx);
    console.log('Dummy Escrow checkout completed successfully:', tx);
  };

  const handleProceedToDraft = (analysis: IracAnalysis) => {
    setActiveIrac(analysis);
    console.log('Proceeding to Document Generator Draft for IRAC:', analysis);
    // In Batch 3.3, this will open our Document Draft Builder & Preview Modal!
  };

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
                <a href="#consultation-tiers" className="btn btn-primary-gold">
                  <span>Mulai Konsultasi &amp; Reservasi Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#irac-generator" className="btn btn-secondary-glass">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Buka Generator IRAC &amp; Draf Dokumen</span>
                </a>
              </div>

              {/* Status banner when a ticket is HELD */}
              {latestTransaction && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-start gap-2.5 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm">Tiket Konsultasi Aktif (Escrow HELD)</p>
                      <p className="text-slate-300 mt-0.5">
                        Advokat: <strong>{latestTransaction.advocateName}</strong> &middot; ID: {latestTransaction.id}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-muted font-mono">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Key className="w-3 h-3" />
                          Mutex Lock Active
                        </span>
                        <span className="flex items-center gap-1 text-blue-400">
                          <Database className="w-3 h-3" />
                          WORM Audit Logged
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-success flex-shrink-0 self-start sm:self-center">
                    Status: ACTIVE_HELD
                  </span>
                </div>
              )}

              {/* Status banner when IRAC is selected for drafting */}
              {activeIrac && (
                <div className="mt-4 p-4 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5 text-xs text-blue-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>Analisis IRAC Siap Draf: <strong className="text-white">{activeIrac.caseTitle}</strong> (Keyakinan AI: {activeIrac.confidenceScore}%)</span>
                  </div>
                  <span className="text-xs text-muted hidden sm:inline">
                    (Modal Draf Surat akan aktif di Batch 3.3)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Consultation Tiers Section (Batch 2.2) */}
          <div id="consultation-tiers">
            <ConsultationSection onSelectTier={handleSelectTier} />
          </div>

          {/* IRAC Generator Section (Batch 3.2) */}
          <div id="irac-generator">
            <IracSection onProceedToDraft={handleProceedToDraft} />
          </div>

          {/* Consultation Booking & Dummy Escrow Modal (Batch 2.3) */}
          <ConsultationBookingModal
            tier={selectedTier}
            session={session}
            onClose={() => setSelectedTier(null)}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
      )}
    </BaseLayout>
  );
};

export default App;
