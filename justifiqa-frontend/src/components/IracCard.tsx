import React from 'react';
import { HelpCircle, BookOpen, Scale, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import type { IracAnalysis } from '../types/irac';

interface IracCardProps {
  analysis: IracAnalysis;
  onProceedToDraft: (analysis: IracAnalysis) => void;
}

export const IracCard: React.FC<IracCardProps> = ({ analysis, onProceedToDraft }) => {
  return (
    <div className="space-y-6 animate-fade-in pt-4">
      {/* Top Meta Summary */}
      <div className="glass-card p-6 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-gold">AI Neural Diagnosis</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tingkat Keyakinan: {analysis.confidenceScore}%
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {analysis.caseTitle}
          </h3>
          <p className="text-xs text-muted">
            Diproses pada: {new Date(analysis.generatedAt).toLocaleString('id-ID')} &middot; Ontologi Hukum Terverifikasi
          </p>
        </div>

        {/* Action button to proceed directly to drafting */}
        <button
          onClick={() => onProceedToDraft(analysis)}
          className="btn btn-primary-gold self-start md:self-center flex-shrink-0"
        >
          <span>Buat Draf Somasi / Gugatan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Pillars Grid: I - R - A - C */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* I - ISSUE */}
        <div className="glass-card p-5 border border-blue-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-blue-400">
            <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-white">I &mdash; Issue (Rumusan Masalah)</h4>
              <p className="text-[11px] text-muted">Inti pertanyaan yuridis atas fakta kasus</p>
            </div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 font-medium">
            {analysis.issue}
          </p>
        </div>

        {/* R - RULE */}
        <div className="glass-card p-5 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-white">R &mdash; Rule (Dasar Hukum &amp; Pasal)</h4>
              <p className="text-[11px] text-muted">Yurisprudensi dan pasal undang-undang terkait</p>
            </div>
          </div>
          <div className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 whitespace-pre-line font-medium">
            {analysis.rule}
          </div>
          {/* Article Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {analysis.relevantArticles.map((article, idx) => (
              <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                {article}
              </span>
            ))}
          </div>
        </div>

        {/* A - APPLICATION */}
        <div className="glass-card p-5 border border-purple-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-purple-400">
            <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-white">A &mdash; Application (Analisis &amp; Subsumsi)</h4>
              <p className="text-[11px] text-muted">Penerapan aturan hukum pada kronologi nyata</p>
            </div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 font-medium">
            {analysis.application}
          </p>
        </div>

        {/* C - CONCLUSION */}
        <div className="glass-card p-5 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-white">C &mdash; Conclusion (Kesimpulan &amp; Solusi)</h4>
              <p className="text-[11px] text-muted">Rekomendasi taktis langkah penyelesaian</p>
            </div>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/20 font-semibold">
            {analysis.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
};
