import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { ConsultationSection } from '../components/ConsultationSection';
import { ConsultationBookingModal } from '../components/ConsultationBookingModal';
import { IracSection } from '../components/IracSection';
import { DocumentDraftingModal } from '../components/DocumentDraftingModal';
import type { ConsultationTier, EscrowTransaction } from '../types/consultation';
import type { IracAnalysis, LegalDocumentDraft } from '../types/irac';
import { ArrowLeft, CheckCircle2, Key, Database, FileText } from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<ConsultationTier | null>(null);
  const [latestTransaction, setLatestTransaction] = useState<EscrowTransaction | null>(null);
  const [activeIrac, setActiveIrac] = useState<IracAnalysis | null>(null);
  const [downloadedDraftInfo, setDownloadedDraftInfo] = useState<{
    title: string;
    wormHash: string;
  } | null>(null);

  const handleSelectTier = (tier: ConsultationTier) => {
    setSelectedTier(tier);
  };

  const handleBookingSuccess = (tx: EscrowTransaction) => {
    setLatestTransaction(tx);
  };

  const handleProceedToDraft = (analysis: IracAnalysis) => {
    setActiveIrac(analysis);
  };

  const handleDraftDownloaded = (draft: LegalDocumentDraft, wormHash: string) => {
    setDownloadedDraftInfo({
      title: draft.title,
      wormHash,
    });
  };

  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-10 py-6 animate-fade-in">
          {/* Navigation header back to gateway */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Kembali ke Gerbang Utama (/)</span>
            </Link>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              MOCK-J-CL-02..04 • Dasbor Klien &amp; Reservasi Escrow Mutex
            </span>
          </div>

          {/* Status banner when a ticket is HELD */}
          {latestTransaction && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
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

          {/* Status banner when a document is downloaded & WORM locked */}
          {downloadedDraftInfo && (
            <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-start gap-2.5 text-xs text-blue-300 font-medium">
                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Draf Dokumen Hukum Terverifikasi &amp; Terkunci WORM</p>
                  <p className="text-slate-300 mt-0.5">
                    Dokumen: <strong>{downloadedDraftInfo.title}</strong>
                  </p>
                  <p className="text-[11px] text-amber-400 font-mono mt-1 break-all">
                    Hash Audit: {downloadedDraftInfo.wormHash}
                  </p>
                </div>
              </div>
              <span className="badge badge-blue flex-shrink-0 self-start sm:self-center">
                Status: WORM_VERIFIED
              </span>
            </div>
          )}

          {/* Consultation Tiers Section */}
          <ConsultationSection onSelectTier={handleSelectTier} />

          {/* IRAC Generator Section */}
          <IracSection onProceedToDraft={handleProceedToDraft} />

          {/* Consultation Booking & Dummy Escrow Modal */}
          <ConsultationBookingModal
            tier={selectedTier}
            session={session}
            onClose={() => setSelectedTier(null)}
            onBookingSuccess={handleBookingSuccess}
          />

          {/* Document Drafting Builder & Preview Modal */}
          <DocumentDraftingModal
            analysis={activeIrac}
            session={session}
            onClose={() => setActiveIrac(null)}
            onDraftDownloaded={handleDraftDownloaded}
          />
        </div>
      )}
    </BaseLayout>
  );
};
