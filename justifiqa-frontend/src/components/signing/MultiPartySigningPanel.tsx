import { useMemo, useState } from 'react';
import { CheckCircle2, ExternalLink, FileSignature, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export type SigningParty = { id: string; name: string; role: 'CLIENT' | 'ADVOCATE' | 'NOTARY' | 'WITNESS'; status: 'PENDING' | 'SIGNED' | 'REJECTED' };
interface MultiPartySigningPanelProps { documentTitle: string; parties: SigningParty[] }

export function MultiPartySigningPanel({ documentTitle, parties }: MultiPartySigningPanelProps) {
  const [provider, setProvider] = useState<'PRIVY' | 'MEKARI_SIGN'>('PRIVY');
  const [partyState, setPartyState] = useState(parties);
  const [sandboxOpened, setSandboxOpened] = useState(false);
  const signedCount = partyState.filter((party) => party.status === 'SIGNED').length;
  const envelopeStatus = partyState.length > 0 && signedCount === partyState.length ? 'COMPLETED' : signedCount > 0 ? 'PARTIALLY_SIGNED' : 'SENT';
  const nextParty = useMemo(() => partyState.find((party) => party.status === 'PENDING'), [partyState]);

  const openSandbox = () => {
    setSandboxOpened(true);
    if (!nextParty) return;
    setPartyState((current) => current.map((party) => party.id === nextParty.id ? { ...party, status: 'SIGNED' } : party));
  };

  return (
    <Card className="w-full rounded-2xl border-border bg-card p-6 sm:p-8">
      <CardHeader className="gap-3 p-0">
        <div className="flex flex-wrap items-center justify-between gap-3"><Badge variant="outline">TTE MULTI-PIHAK</Badge><Badge variant={envelopeStatus === 'COMPLETED' ? 'default' : 'secondary'}>{envelopeStatus}</Badge></div>
        <CardTitle className="flex items-center gap-3 text-xl"><FileSignature className="size-6 text-primary" />{documentTitle}</CardTitle>
        <CardDescription>Urutan signer dan status envelope provider. Aksi di panel ini adalah sandbox UI sampai adapter webhook produksi dikonfigurasi.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-0">
        <div className="flex flex-wrap gap-2" aria-label="Pilih provider TTE">
          {(['PRIVY', 'MEKARI_SIGN'] as const).map((name) => <Button key={name} type="button" variant={provider === name ? 'default' : 'outline'} size="sm" onClick={() => setProvider(name)}>{name === 'MEKARI_SIGN' ? 'Mekari Sign' : 'Privy'}</Button>)}
        </div>
        <ul className="divide-y divide-border rounded-2xl border border-border">
          {partyState.map((party, index) => (
            <li key={party.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><p className="font-semibold text-foreground">{index + 1}. {party.name}</p><p className="text-sm text-muted-foreground">{party.role}</p></div>
              <Badge variant={party.status === 'SIGNED' ? 'default' : party.status === 'REJECTED' ? 'destructive' : 'outline'}>{party.status === 'SIGNED' && <CheckCircle2 />}{party.status}</Badge>
            </li>
          ))}
        </ul>
        <div className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /><span>Provider mengendalikan sertifikat dan kunci privat. Justica menyimpan status, recipient ID, timestamp, dan digest dokumen saja.</span></div>
        {sandboxOpened && <p role="status" className="text-sm text-muted-foreground">Handoff sandbox {provider === 'PRIVY' ? 'Privy' : 'Mekari Sign'} disimulasikan; tidak ada API eksternal yang dipanggil.</p>}
      </CardContent>
      <CardFooter className="p-0">
        <Button type="button" size="lg" className="w-full" disabled={!nextParty} onClick={openSandbox}><ExternalLink />{nextParty ? `Buka sandbox ${provider === 'PRIVY' ? 'Privy' : 'Mekari Sign'} untuk ${nextParty.name}` : 'Semua pihak telah menandatangani'}</Button>
      </CardFooter>
    </Card>
  );
}
