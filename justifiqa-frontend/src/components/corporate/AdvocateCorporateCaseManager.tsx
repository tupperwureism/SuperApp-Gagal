import { useState } from 'react';
import { CheckCircle2, FileCheck2, Landmark, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NotaryCaseWorkspacePanel } from './notary/NotaryCaseWorkspacePanel';

export function AdvocateCorporateCaseManager() {
  const [boVerified, setBoVerified] = useState(false);
  const [cddApproved, setCddApproved] = useState(false);
  const [ahuReference, setAhuReference] = useState('');
  const [nibReference, setNibReference] = useState('');
  const fieldClass = 'min-h-10 rounded-xl border-border bg-background';

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6" aria-label="J-BIZ professional case manager">
      <Card className="gap-4 rounded-2xl border-border bg-card p-6 shadow-md sm:p-8">
        <CardHeader className="gap-3 p-0">
          <div className="flex flex-wrap items-center justify-between gap-3"><Badge variant="outline" className="min-h-7 px-3"><ShieldAlert />Workspace Terbatas</Badge><Badge variant="secondary">JBIZ-202607-001 · NOTARY_REVIEW</Badge></div>
          <CardTitle className="text-2xl font-extrabold">PT Contoh Usaha Indonesia</CardTitle>
          <CardDescription>Area advokat/notaris yang ditugaskan. Detail CDD/EDD di bawah ini tidak masuk tracker, notifikasi, atau DTO klien.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="gap-5 rounded-2xl border-border bg-card p-6">
          <CardHeader className="gap-2 p-0"><CardTitle className="flex items-center gap-2 text-lg"><FileCheck2 className="text-primary" />BO & PMPJ</CardTitle><CardDescription>Periksa deklarasi orang perseorangan dan digest bukti sebelum keputusan.</CardDescription></CardHeader>
          <CardContent className="space-y-4 p-0"><div className="rounded-xl border border-border bg-muted/40 p-4 text-sm"><strong>Siti Rahma</strong><p className="text-muted-foreground">OWNERSHIP · 60% · Digest tervalidasi format SHA-256</p></div><Button type="button" variant={boVerified ? 'secondary' : 'default'} onClick={() => setBoVerified(true)} className="min-h-10 rounded-xl"><CheckCircle2 />{boVerified ? 'BO terverifikasi lokal' : 'Verifikasi dokumen BO'}</Button></CardContent>
        </Card>
        <Card className="gap-5 rounded-2xl border-border bg-card p-6">
          <CardHeader className="gap-2 p-0"><CardTitle className="flex items-center gap-2 text-lg"><ShieldAlert className="text-primary" />Keputusan CDD</CardTitle><CardDescription>Keputusan internal; tidak pernah tampil kepada klien.</CardDescription></CardHeader>
          <CardContent className="space-y-4 p-0"><div className="flex flex-wrap gap-2"><Badge variant="outline">PEP: NO MATCH</Badge><Badge variant="outline">SANCTION: NO MATCH</Badge><Badge variant="outline">Rules: PMPJ-2026.1</Badge></div><Button type="button" disabled={!boVerified} variant={cddApproved ? 'secondary' : 'default'} onClick={() => setCddApproved(true)} className="min-h-10 rounded-xl"><CheckCircle2 />{cddApproved ? 'CDD disetujui lokal' : 'Setujui tahap CDD'}</Button></CardContent>
        </Card>
      </div>
      <Card className="gap-5 rounded-2xl border-border bg-card p-6 sm:p-8">
        <CardHeader className="gap-2 p-0"><CardTitle className="flex items-center gap-2 text-lg"><Landmark className="text-primary" />Referensi AHU & OSS</CardTitle><CardDescription>Simpan hanya reference ID; credential, token, dan payload mentah dilarang.</CardDescription></CardHeader>
        <CardContent className="grid gap-4 p-0 md:grid-cols-2"><label className="space-y-2 text-sm font-semibold">Nomor SABH/SABU<Input value={ahuReference} onChange={(e) => setAhuReference(e.target.value)} placeholder="Masukkan referensi AHU" className={fieldClass} /></label><label className="space-y-2 text-sm font-semibold">Nomor Induk Berusaha<Input value={nibReference} onChange={(e) => setNibReference(e.target.value)} placeholder="Masukkan NIB dari OSS" className={fieldClass} /></label></CardContent>
        <p className="text-sm text-muted-foreground">Kontrol ini adalah state UI lokal. Persistensi wajib melalui server workflow, optimistic stage check, dan audit trail.</p>
      </Card>
      <NotaryCaseWorkspacePanel />
    </section>
  );
}
