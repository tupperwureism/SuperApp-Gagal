import React from 'react';
import { UserCheck, Search, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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
  const roleLabel =
    session.role === 'CLIENT'
      ? 'Klien Hukum Terverifikasi • NIK 317123••••••0001'
      : session.role === 'ADVOCATE'
      ? 'Advokat Mitra Terverifikasi PERADI • NIA 109283••••••0088'
      : 'AI Legal Intelligence Engine • Quantum Core v4.2';

  return (
    <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xl relative overflow-hidden transition-all duration-300 w-full">
      {/* Top Gradient Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500" />

      <CardHeader className="p-0 flex-1 space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 shadow-sm">
            <UserCheck className="w-6 h-6 flex-shrink-0" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground font-heading tracking-tight uppercase">
              HALO, {session.userName || 'BUDI SANTOSO'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold tracking-wide">
              {roleLabel}
            </p>
          </div>
        </div>

        <CardContent className="p-0 pt-1">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            Kelola sesi konsultasi aktif, unduh dokumen hukum ber-meterai elektronik, atau jadwalkan
            konsultasi baru ber-escrow mutex dengan jaminan perlindungan mutlak ACID Concurrency.
          </p>
        </CardContent>
      </CardHeader>

      <CardFooter className="p-0 flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0">
        <Button
          type="button"
          size="sm"
          onClick={onNavigateCatalog}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all gap-2 min-h-[44px] whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center"
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span>+ KONSULTASI BARU (CARI ADVOKAT)</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateCatalog}
          className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[44px] whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center border-border hover:bg-secondary hover:text-foreground gap-2"
        >
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span>Layanan Pro Bono Gratis</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
