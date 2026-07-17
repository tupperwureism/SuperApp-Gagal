import React, { useState } from 'react';
import { BaseLayout } from '@/components/BaseLayout';
import { EscrowStatusBanner } from '@/components/client/EscrowStatusBanner';
import { ClientHeaderAndTabs } from '@/components/client/ClientHeaderAndTabs';
import { ClientOverviewTab } from '@/components/client/ClientOverviewTab';
import { ClientCatalogTab } from '@/components/client/ClientCatalogTab';
import { ClientIracTab } from '@/components/client/ClientIracTab';
import { ConsultationBookingModal } from '@/components/ConsultationBookingModal';
import { DocumentDraftingModal } from '@/components/DocumentDraftingModal';
import type { ConsultationTier, EscrowTransaction } from '@/types/consultation';
import type { IracAnalysis, LegalDocumentDraft } from '@/types/irac';

export const ClientDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'irac'>('overview');
  const [selectedTier, setSelectedTier] = useState<ConsultationTier | null>(null);
  const [latestTransaction, setLatestTransaction] = useState<EscrowTransaction | null>(null);
  const [activeIrac, setActiveIrac] = useState<IracAnalysis | null>(null);
  const [downloadedDraftInfo, setDownloadedDraftInfo] = useState<{ title: string; wormHash: string } | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('ALL');
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);

  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-8 py-6 animate-fade-in font-sans w-full">
          <EscrowStatusBanner
            latestTransaction={latestTransaction}
            downloadedDraftInfo={downloadedDraftInfo}
          />
          <ClientHeaderAndTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'overview' && (
            <ClientOverviewTab
              session={session}
              onNavigateCatalog={() => setActiveTab('catalog')}
              onTabChange={setActiveTab}
            />
          )}

          {activeTab === 'catalog' && (
            <ClientCatalogTab
              specialtyFilter={specialtyFilter}
              onSpecialtyChange={setSpecialtyFilter}
              onlineOnly={onlineOnly}
              onOnlineOnlyChange={setOnlineOnly}
              onSelectTier={setSelectedTier}
            />
          )}

          {activeTab === 'irac' && (
            <ClientIracTab onProceedToDraft={setActiveIrac} />
          )}

          <ConsultationBookingModal
            tier={selectedTier}
            session={session}
            onClose={() => setSelectedTier(null)}
            onBookingSuccess={(tx) => {
              setLatestTransaction(tx);
              setActiveTab('overview');
            }}
          />

          <DocumentDraftingModal
            analysis={activeIrac}
            session={session}
            onClose={() => setActiveIrac(null)}
            onDraftDownloaded={(draft: LegalDocumentDraft, wormHash: string) => {
              setDownloadedDraftInfo({ title: draft.title, wormHash });
            }}
          />
        </div>
      )}
    </BaseLayout>
  );
};
