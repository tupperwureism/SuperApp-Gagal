import type React from 'react';
import { LayoutDashboard, Search, Scale } from 'lucide-react';
import type { ClientTabKey } from '@/types/client';

interface ClientTabNavProps {
  activeTab: ClientTabKey;
  onTabChange: (tab: ClientTabKey) => void;
  className?: string;
}

const TAB_ITEMS: { key: ClientTabKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dasbor Saya & Riwayat', icon: LayoutDashboard },
  { key: 'catalog', label: 'Cari & Katalog Advokat', icon: Search },
  { key: 'irac', label: 'IRAC Bedah Kasus', icon: Scale },
];

export function ClientTabNav({ activeTab, onTabChange, className = '' }: ClientTabNavProps) {
  return (
    <nav className={`items-center gap-1.5 bg-secondary/60 border border-border rounded-2xl p-1.5 overflow-x-auto ${className}`}>
      {TAB_ITEMS.map(({ key, label, icon: Icon }) => (
        <button key={key} type="button" onClick={() => onTabChange(key)} className={`client-tab-btn ${activeTab === key ? 'active' : ''}`}>
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
