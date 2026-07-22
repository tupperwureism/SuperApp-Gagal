import { Check, Circle, Clock3, Landmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CORPORATE_STAGES } from './corporateUiModel';

type Props = {
  caseCode?: string;
  entityName?: string;
  currentStage?: string;
  externalReference?: string | null;
};

export function CorporateCaseTrackerPanel({
  caseCode = 'JBIZ-202607-001',
  entityName = 'PT Contoh Usaha Indonesia',
  currentStage = 'AHU_SUBMITTED',
  externalReference = 'SABH-PENDING-2026',
}: Props) {
  const currentIndex = CORPORATE_STAGES.findIndex(([key]) => key === currentStage);
  return (
    <Card className="mx-auto w-full max-w-4xl gap-6 rounded-2xl border-border bg-card p-6 shadow-md sm:p-8">
      <CardHeader className="gap-3 p-0">
        <div className="flex flex-wrap items-center justify-between gap-3"><Badge variant="outline" className="min-h-7 px-3"><Landmark />Pelacakan AHU & OSS</Badge><Badge variant="secondary">{caseCode}</Badge></div>
        <CardTitle className="text-2xl font-extrabold">{entityName}</CardTitle>
        <CardDescription>Hanya status operasional yang aman bagi klien. Risk score, red flag, keputusan CDD, dan data pelaporan tidak pernah ditampilkan.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-0 md:grid-cols-2">
        {CORPORATE_STAGES.map(([key, label], index) => {
          const done = currentIndex >= 0 && index < currentIndex;
          const active = index === currentIndex;
          return <div key={key} className={`flex items-center gap-3 rounded-xl border p-3 ${active ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'}`}>
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${done || active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{done ? <Check className="size-4" /> : active ? <Clock3 className="size-4" /> : <Circle className="size-4" />}</span>
            <span><strong className="block text-sm">{label}</strong><small className="text-muted-foreground">{active ? 'Sedang diproses' : done ? 'Selesai' : 'Menunggu'}</small></span>
          </div>;
        })}
      </CardContent>
      {externalReference && <p className="rounded-xl border border-border bg-muted/40 p-3 text-sm"><strong>Referensi eksternal:</strong> {externalReference}</p>}
    </Card>
  );
}
