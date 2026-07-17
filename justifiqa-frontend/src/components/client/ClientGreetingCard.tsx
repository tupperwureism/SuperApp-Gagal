import React from 'react';
import { UserCheck, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AuthSession } from '@/types/auth';

export interface ClientGreetingCardProps {
  session: AuthSession;
  onNavigateCatalog: () => void;
}

export const ClientGreetingCard: React.FC<ClientGreetingCardProps> = ({
  session,
  onNavigateCatalog,
}) => {
  return (
    <Card className="rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden transition-all duration-300 w-full">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500" />
      
      <div className="client-banner-safe-wrapper w-full">
        <div className="space-y-2 flex-1 min-w-[300px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
              <UserCheck className="w-6 h-6 flex-shrink-0" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading tracking-tight uppercase">
                HALO, {session.userName || 'BUDI SANTOSO'}
              </h1>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {session.role === 'CLIENT'
                  ? 'Klien Hukum Terverifikasi • NIK 317123••••••0001'
                  : session.role === 'ADVOCATE'
                  ? 'Advokat Mitra Terverifikasi PERADI • NIA 109283••••••0088'
                  : 'AI Legal Intelligence Engine • Quantum Core v4.2'}
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Kelola sesi konsultasi aktif, unduh dokumen hukum ber-meterai elektronik, atau jadwalkan
            konsultasi baru ber-escrow mutex.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <Button
            type="button"
            size="sm"
            onClick={onNavigateCatalog}
            className="px-5 py-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-all gap-2 min-h-[44px] whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center"
          >
            <Search className="w-4 h-4 flex-shrink-0" />
            <span>+ KONSULTASI BARU (CARI ADVOKAT)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onNavigateCatalog}
            className="px-4 py-5 rounded-xl font-bold text-xs transition-all min-h-[44px] whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center border-border hover:bg-secondary"
          >
            <span>Layanan Pro Bono Gratis</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
