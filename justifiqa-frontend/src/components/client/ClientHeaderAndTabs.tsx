import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, LayoutDashboard, Search, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type ClientTabType = 'overview' | 'catalog' | 'irac';

export interface ClientHeaderAndTabsProps {
  activeTab: ClientTabType;
  onTabChange: (tab: ClientTabType) => void;
}

export const ClientHeaderAndTabs: React.FC<ClientHeaderAndTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 py-4 border-b border-border/60 transition-all duration-300">
      {/* Brand & Verification Badge Group */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-xl gap-2 font-semibold shadow-sm border-border hover:border-primary transition-all min-h-[38px]"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Gerbang Utama</span>
          </Link>
        </Button>
        <Badge
          variant="outline"
          className="px-3.5 py-1.5 rounded-full border-primary/40 bg-primary/10 text-primary text-xs font-bold gap-1.5 whitespace-nowrap min-h-[36px]"
        >
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>MOCK-J-CL-02..04 • Portal Klien Terverifikasi</span>
        </Badge>
      </div>

      {/* Navigation Tabs Switcher */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 rounded-2xl bg-secondary/80 p-1.5 border border-border shadow-inner max-w-full overflow-x-auto">
        <button
          type="button"
          onClick={() => onTabChange('overview')}
          className={`client-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          <span>Dasbor Saya &amp; Riwayat</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange('catalog')}
          className={`client-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span>Cari &amp; Katalog Advokat</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange('irac')}
          className={`client-tab-btn ${activeTab === 'irac' ? 'active' : ''}`}
        >
          <BrainCircuit className="w-4 h-4 flex-shrink-0" />
          <span>IRAC Bedah Kasus</span>
        </button>
      </div>
    </div>
  );
};
