import { CheckCircle2, FileText, SearchX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { PublicVerificationResult, VerifyStatus } from '@/hooks/usePublicVerifier';

interface PublicVerifierResultProps { status: Exclude<VerifyStatus, 'idle'>; verifyHash: string; result: PublicVerificationResult | null; onReset: () => void }

export function PublicVerifierResult({ status, verifyHash, result, onReset }: PublicVerifierResultProps) {
  const publicRows = result ? [
    ['ID Verifikasi Publik', result.verification_id],
    ['Jenis Dokumen', result.document_type],
    ['Judul Dokumen', result.document_title],
    ['Waktu Finalisasi', new Date(result.finalized_at).toLocaleString('id-ID')],
    ['Status Penyedia Tanda Tangan', result.signature_provider_status],
    ['Serial e-Meterai', result.emeterai_serial],
    ['Status e-Meterai', result.emeterai_status],
    ['Hash SHA-256 Validasi', verifyHash],
  ] : [];
  return (
    <div id="verify-result-section" className="w-full max-w-4xl animate-fade-in">
      {status === 'verified' && result ? (
        <Card className="rounded-2xl border-2 border-emerald-500/70 bg-card/95 shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-green-500" />
          <CardHeader className="px-8 pt-6 pb-4 border-b border-border"><div className="flex flex-col sm:flex-row sm:items-center gap-4"><CheckCircle2 className="w-12 h-12 text-emerald-500 shrink-0" strokeWidth={1.5} /><div className="space-y-1"><div className="flex flex-wrap items-center gap-3"><h3 className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-500">DIGEST DOKUMEN COCOK</h3><Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500 text-xs font-extrabold uppercase">SHA-256 Match</Badge></div><p className="text-xs sm:text-sm text-muted-foreground">Berkas cocok dengan anchor integritas yang tersimpan di Justica.</p></div></div></CardHeader>
          <CardContent className="px-8 py-6">{publicRows.map(([label, value]) => <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b border-border/50"><span className="text-muted-foreground font-semibold text-xs sm:text-sm w-52 shrink-0">{label}</span><span className="font-bold text-xs sm:text-sm break-all text-foreground">{value}</span></div>)}<p className="pt-4 text-xs font-semibold text-amber-500">{result.warning}</p></CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl border-2 border-red-500/70 bg-card/95 shadow-2xl overflow-hidden"><div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-orange-500" /><CardContent className="px-8 py-8"><div className="flex flex-col sm:flex-row sm:items-center gap-4"><SearchX className="w-12 h-12 text-red-500 shrink-0" /><div><h3 className="font-heading font-extrabold text-xl text-red-500">ANCHOR DOKUMEN TIDAK DITEMUKAN</h3><p className="text-sm text-muted-foreground">Hash SHA-256 berkas ini tidak ditemukan. Hasil ini tidak dengan sendirinya membuktikan bahwa dokumen palsu.</p></div></div></CardContent></Card>
      )}
      <div className="text-center mt-6"><button type="button" onClick={onReset} className="navbar-btn-action bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-sm cursor-pointer transition-colors mx-auto"><FileText className="w-4 h-4 shrink-0" />Verifikasi Dokumen Lain</button></div>
    </div>
  );
}
