import React from 'react';
import { ClientGreetingCard } from './ClientGreetingCard';
import { ClientOverviewTables } from './ClientOverviewTables';
import type { AuthSession } from '@/types/auth';
import type { ClientTabType } from './ClientHeaderAndTabs';

export interface ClientOverviewTabProps {
  session: AuthSession;
  onNavigateCatalog: () => void;
  onTabChange: (tab: ClientTabType) => void;
}

export const ClientOverviewTab: React.FC<ClientOverviewTabProps> = ({
  session,
  onNavigateCatalog,
  onTabChange,
}) => {
  return (
    <div className="space-y-8 animate-fade-in w-full">
      <ClientGreetingCard session={session} onNavigateCatalog={onNavigateCatalog} />
      <ClientOverviewTables onTabChange={onTabChange} />
    </div>
  );
};
