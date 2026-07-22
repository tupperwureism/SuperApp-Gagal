import { useState } from 'react';
import { ArrowLeft, ArrowRight, ScanFace, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const steps = ['Pemberitahuan', 'OCR & liveness', 'Verifikasi provider', 'Hasil metadata'] as const;

interface EkycVerificationWizardProps {
  userRole: 'client' | 'advocate';
  providerName?: 'VIDA' | 'Verihubs' | 'ASLI_RI';
}

export function EkycVerificationWizard({ userRole, providerName = 'VIDA' }: EkycVerificationWizardProps) {
  const [step, setStep] = useState(0);
  const completed = step === steps.length - 1;

  return (
    <Card className="mx-auto w-full max-w-4xl rounded-2xl border-border bg-card p-6 sm:p-8">
      <CardHeader className="gap-3 p-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="outline" className="px-3 py-1">e-KYC {userRole === 'client' ? 'Klien' : 'Advokat'}</Badge>
          <Badge variant={completed ? 'default' : 'secondary'}>{completed ? 'PASSED · SIMULASI' : `${step + 1}/${steps.length}`}</Badge>
        </div>
        <CardTitle className="flex items-center gap-3 text-2xl"><ScanFace className="size-6 text-primary" />Verifikasi identitas via {providerName}</CardTitle>
        <CardDescription>Capture diproses di lingkungan provider; Justica hanya menerima reference ID, status, waktu, dan digest SHA-256.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <ol className="grid gap-2 sm:grid-cols-4" aria-label="Tahapan e-KYC">
          {steps.map((label, index) => (
            <li key={label} className={`rounded-xl border p-3 text-sm ${index <= step ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground'}`}>
              <span className="block text-xs font-semibold">LANGKAH {index + 1}</span>{label}
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-border bg-muted/40 p-6">
          {step === 0 && <p>Setujui pemberitahuan tujuan, provider, retensi, serta jalur review manual sebelum meninggalkan Justica.</p>}
          {step === 1 && <p>Sandbox provider akan meminta OCR KTP dan liveness. Tidak ada file, selfie, video, atau template wajah yang dikirim ke server Justica.</p>}
          {step === 2 && <p>Callback harus lolos verifikasi signature, timestamp, nonce, dan replay protection sebelum status diterima.</p>}
          {completed && <p>Simulasi menghasilkan status <strong>PASSED</strong>. Produksi wajib menyimpan opaque provider reference dan digest 64-heksadesimal saja.</p>}
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <span><strong className="text-foreground">Zero raw biometric storage.</strong> KTP, selfie liveness, sidik jari, embedding, dan payload mentah tidak disimpan di PostgreSQL maupun storage internal.</span>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-3 p-0">
        <Button variant="outline" size="lg" disabled={step === 0} onClick={() => setStep((value) => value - 1)}><ArrowLeft />Kembali</Button>
        <Button size="lg" disabled={completed} onClick={() => setStep((value) => value + 1)}>{step === 0 ? 'Saya Paham · Mulai Sandbox' : 'Lanjutkan'}<ArrowRight /></Button>
      </CardFooter>
    </Card>
  );
}
