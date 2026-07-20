import { CheckCircle2, Download, FileCheck2, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DeliverableVaultPanelProps {
  onApprove: () => void;
}

export function DeliverableVaultPanel({ onApprove }: DeliverableVaultPanelProps) {
  return (
    <Card className="consultation-card-shell deliverable-vault-shell">
      <CardHeader className="deliverable-heading">
        <CardTitle className="font-heading text-2xl font-extrabold">Dokumen Hukum Siap Diunduh</CardTitle>
        <p className="mt-2 text-sm text-muted-foreground">Advokat Anda telah menyelesaikan dokumen hukum resmi ber-e-Meterai.</p>
      </CardHeader>
      <CardContent className="consultation-card-content flex flex-col gap-6">
        <div className="deliverable-meta">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Judul Dokumen Resmi</p>
            <h2 className="mt-1 font-heading text-xl font-extrabold">Pendapat Hukum (Legal Opinion) &amp; Kontrak Perjanjian</h2>
            <p className="mt-1 font-mono text-xs text-blue-500">#DLV-441 • SHA-256: 8f9b201a...</p>
          </div>
          <Badge variant="outline" className="deliverable-legal-badge"><ShieldCheck />TERVERIFIKASI &amp; SAH BER-e-METERAI PERURI SHA-256</Badge>
        </div>
        <article className="deliverable-preview">
          <header className="mb-5 border-b-2 border-foreground pb-4 text-center">
            <FileCheck2 className="mx-auto mb-2 size-8 text-blue-500" />
            <h3 className="font-heading font-extrabold">KANTOR HUKUM DR. MAHENDRA KUSUMA &amp; REKAN</h3>
            <p className="text-xs text-muted-foreground">Legal Opinion • No. 092/LO/MK/VII/2026</p>
          </header>
          <p><strong>Berdasarkan analisis Perjanjian Kerjasama Pengadaan Barang No. 44/PKS/2026,</strong> Vendor terbukti melakukan wanprestasi sesuai Pasal 1243 KUHPerdata akibat keterlambatan penyerahan objek perjanjian tanpa keadaan memaksa.</p>
        </article>
        <Button type="button" onClick={() => window.alert('Simulasi unduhan: Legal_Opinion_Dr_Mahendra_eMeterai.pdf (2,4 MB) telah diverifikasi SHA-256.')} className="consultation-action consultation-send-action"><Download />UNDUH DOKUMEN LENGKAP (PDF)</Button>
      </CardContent>
      <CardFooter className="consultation-card-footer deliverable-actions">
        <h3 className="font-heading text-center text-lg font-extrabold">Apakah dokumen ini sudah memenuhi kebutuhan Anda?</h3>
        <p className="text-center text-sm text-muted-foreground">Persetujuan akhir mencairkan dana Rekening Bersama kepada Advokat.</p>
        <Button type="button" onClick={onApprove} className="consultation-action consultation-success-action"><CheckCircle2 />SETUJUI &amp; SELESAIKAN PERKARA</Button>
        <Button type="button" variant="outline" onClick={() => window.alert('Form catatan revisi akan dikirim terenkripsi. Sisa garansi perbaikan dokumen: 2x.')} className="consultation-action consultation-warning-action"><RefreshCcw />Ajukan Perbaikan Dokumen (Sisa Garansi: 2x)</Button>
      </CardFooter>
    </Card>
  );
}
