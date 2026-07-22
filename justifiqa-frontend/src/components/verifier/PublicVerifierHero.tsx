import { ShieldCheck } from 'lucide-react';

export function PublicVerifierHero() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2"><ShieldCheck className="w-4 h-4 shrink-0" /><span>Portal Verifikasi Publik</span></div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading text-foreground leading-tight">VERIFIKASI KEASLIAN <span className="text-gradient-gold">DOKUMEN HUKUM</span></h1>
      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">Periksa integritas dokumen hukum yang diterbitkan melalui platform Justica menggunakan digest SHA-256 yang dihitung langsung di browser Anda.</p>
    </div>
  );
}
