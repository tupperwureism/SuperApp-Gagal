import React from 'react';
import { Clock, Database, MessageSquare, FileText, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ClientTabType } from './ClientHeaderAndTabs';

export interface ClientOverviewTablesProps {
  onTabChange: (tab: ClientTabType) => void;
}

export const ClientOverviewTables: React.FC<ClientOverviewTablesProps> = ({ onTabChange }) => {
  return (
    <div className="space-y-8 w-full">
      {/* Table 1: KONSULTASI HUKUM AKTIF (MOCK-J-CL-02A) */}
      <Card className="rounded-3xl bg-card border border-border shadow-xl w-full overflow-hidden">
        <div className="client-table-safe-wrapper">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full border-b border-border/60 pb-3">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>KONSULTASI HUKUM AKTIF</span>
            </h2>
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
              Sinkronisasi Escrow Mutex Real-Time
            </span>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-border bg-secondary/30">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-muted-foreground font-bold uppercase tracking-wider">
                  <th className="p-4 sm:px-5 min-w-[240px]">Advokat Mitra</th>
                  <th className="p-4 sm:px-5 min-w-[200px]">Spesialisasi</th>
                  <th className="p-4 sm:px-5 min-w-[220px]">Status Layanan &amp; Durasi</th>
                  <th className="p-4 sm:px-5 text-right min-w-[170px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground font-medium">
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4 sm:px-5 font-bold text-foreground flex items-center gap-2.5 whitespace-nowrap">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span>Dr. Mahendra Kusuma, S.H., M.H.</span>
                  </td>
                  <td className="p-4 sm:px-5 text-muted-foreground whitespace-nowrap">
                    Hukum Bisnis &amp; Sengketa
                  </td>
                  <td className="p-4 sm:px-5 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className="px-3 py-1 rounded-full bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold"
                    >
                      Sesi Berjalan (44:12) • Escrow HELD
                    </Badge>
                  </td>
                  <td className="p-4 sm:px-5 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => alert('Membuka Ruang Obrolan E2EE (MOCK-J-CL-04)...')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all gap-2 shadow-sm whitespace-nowrap min-h-[38px] inline-flex items-center justify-center flex-shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Buka Ruang Obrolan</span>
                    </Button>
                  </td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4 sm:px-5 font-bold text-foreground flex items-center gap-2.5 whitespace-nowrap">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                    <span>Anita Wulandari, S.H., M.H.</span>
                  </td>
                  <td className="p-4 sm:px-5 text-muted-foreground whitespace-nowrap">
                    Hukum Ketenagakerjaan &amp; PHK
                  </td>
                  <td className="p-4 sm:px-5 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className="px-3 py-1 rounded-full bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold"
                    >
                      Penyusunan Dokumen Draf
                    </Badge>
                  </td>
                  <td className="p-4 sm:px-5 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onTabChange('irac')}
                      className="px-4 py-2 rounded-xl font-bold text-xs transition-all gap-2 whitespace-nowrap min-h-[38px] inline-flex items-center justify-center flex-shrink-0 border-border hover:bg-secondary"
                    >
                      <FileText className="w-3.5 h-3.5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                      <span>Lihat Dokumen</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Table 2: RIWAYAT DOKUMEN & KONSULTASI SELESAI (WORM IMMUTABLE) */}
      <Card className="rounded-3xl bg-card border border-border shadow-xl w-full overflow-hidden">
        <div className="client-table-safe-wrapper">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full border-b border-border/60 pb-3">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2.5">
              <Database className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              <span>RIWAYAT DOKUMEN &amp; KONSULTASI SELESAI (WORM IMMUTABLE)</span>
            </h2>
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
              SHA-256 Verified WORM Vault
            </span>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-border bg-secondary/30">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-muted-foreground font-bold uppercase tracking-wider">
                  <th className="p-4 sm:px-5 min-w-[130px]">Tanggal</th>
                  <th className="p-4 sm:px-5 min-w-[240px]">Advokat Mitra</th>
                  <th className="p-4 sm:px-5 min-w-[260px]">Layanan &amp; Dokumen</th>
                  <th className="p-4 sm:px-5 text-right min-w-[180px]">Unduhan WORM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground font-medium">
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4 sm:px-5 font-mono text-muted-foreground font-semibold whitespace-nowrap">
                    02/07/2026
                  </td>
                  <td className="p-4 sm:px-5 font-bold text-foreground whitespace-nowrap">
                    Dr. Mahendra Kusuma, S.H., M.H.
                  </td>
                  <td className="p-4 sm:px-5 text-foreground whitespace-nowrap font-medium">
                    Legal Opinion Kontrak NDA (e-Meterai Peruri)
                  </td>
                  <td className="p-4 sm:px-5 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => alert('Mengunduh Dokumen PDF terverifikasi SHA-256 WORM Vault...')}
                      className="px-4 py-2 rounded-xl font-bold text-xs transition-all gap-2 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/10 whitespace-nowrap min-h-[38px] inline-flex items-center justify-center flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Unduh Dokumen PDF</span>
                    </Button>
                  </td>
                </tr>
                <tr className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4 sm:px-5 font-mono text-muted-foreground font-semibold whitespace-nowrap">
                    18/06/2026
                  </td>
                  <td className="p-4 sm:px-5 font-bold text-foreground whitespace-nowrap">
                    Budi Hartono, S.H.
                  </td>
                  <td className="p-4 sm:px-5 text-foreground whitespace-nowrap font-medium">
                    Konsultasi Tatap Muka &amp; Resi Escrow
                  </td>
                  <td className="p-4 sm:px-5 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => alert('Mengunduh Bukti Resi Escrow SHA-256...')}
                      className="px-4 py-2 rounded-xl font-bold text-xs transition-all gap-2 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 whitespace-nowrap min-h-[38px] inline-flex items-center justify-center flex-shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Unduh Bukti Transaksi</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};
