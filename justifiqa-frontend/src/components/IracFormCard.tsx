import React from 'react';
import { FileText, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface PresetFact {
  label: string;
  text: string;
}

export interface IracFormCardProps {
  presetFacts: PresetFact[];
  caseTitleInput: string;
  onCaseTitleChange: (val: string) => void;
  factsInput: string;
  onFactsChange: (val: string) => void;
  onPresetSelect: (preset: PresetFact) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing: boolean;
  errorMsg: string;
}

export const IracFormCard: React.FC<IracFormCardProps> = ({
  presetFacts,
  caseTitleInput,
  onCaseTitleChange,
  factsInput,
  onFactsChange,
  onPresetSelect,
  onSubmit,
  isAnalyzing,
  errorMsg,
}) => {
  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-card border border-border shadow-xl space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Pilih Kasus Prasetel Instan (Untuk Uji Coba Cepat):
        </label>
        <div className="flex flex-wrap gap-2.5">
          {presetFacts.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPresetSelect(preset)}
              className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 min-h-[38px] whitespace-nowrap ${
                caseTitleInput === preset.label
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'bg-secondary border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 pt-4 border-t border-border">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Judul Sengketa / Permasalahan:
          </label>
          <input
            type="text"
            value={caseTitleInput}
            onChange={(e) => onCaseTitleChange(e.target.value)}
            placeholder="Contoh: Sengketa Penyerobotan Tanah Warisan"
            className="w-full rounded-xl bg-secondary/60 border border-border p-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-colors min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground block">
            Kronologi Fakta Hukum (Story of Facts):
          </label>
          <textarea
            rows={5}
            value={factsInput}
            onChange={(e) => onFactsChange(e.target.value)}
            placeholder="Tuliskan kronologi lengkap kejadian, waktu, pihak yang terlibat, dan kerugian nyata yang timbul..."
            className="w-full rounded-xl bg-secondary/60 border border-border p-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-colors resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 min-h-[46px]"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
              <span>Menganalisis Ontologi &amp; Yurisprudensi Hukum (AI Neural)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span>Bedah Fakta ke Format IRAC Sekarang</span>
            </>
          )}
        </button>
      </form>
    </Card>
  );
};
