import React, { useState } from 'react';
import { IracCard } from './IracCard';
import { MockIracService } from '../services/mockIracService';
import type { IracAnalysis } from '../types/irac';
import { Sparkles, Loader2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface IracSectionProps {
  onProceedToDraft: (analysis: IracAnalysis) => void;
}

const PRESET_FACTS = [
  {
    label: 'Sengketa Penyerobotan Tanah & AJB',
    text: 'Tanah warisan keluarga seluas 1.200 m2 di Bandung yang telah bersertifikat SHM atas nama Klien tiba-tiba dipagar dan dibangun pondasi oleh pihak pengembang properti sebelah tanpa izin atau transaksi jual beli akta PPAT. Pengembang mengklaim telah membeli dari pihak ketiga yang tidak berhak.',
  },
  {
    label: 'PHK Sepihak & Penahanan Pesangon',
    text: 'Klien telah bekerja selama 8 tahun dengan status PKWTT (karyawan tetap) di perusahaan logistik. Tanpa melalui surat peringatan (SP) dan tanpa mediasi bipartit, Klien diberhentikan sepihak dan perusahaan menolak membayar pesangon, UPMK, serta uang penggantian hak sesuai PP 35/2021 dengan alasan efisiensi.',
  },
  {
    label: 'Wanprestasi Kontrak Proyek Komersial',
    text: 'Klien menyepakati kontrak pengadaan perangkat keras server senilai Rp 850 Juta dengan PT Mitra Solusi. Perangkat telah dikirim dan diuji coba dengan berita acara terima (BAST) yang sah, namun setelah jatuh tempo 60 hari dari tagihan invoice, mitra tidak membayar dan mengabaikan 2 kali surat tagihan.',
  },
];

export const IracSection: React.FC<IracSectionProps> = ({ onProceedToDraft }) => {
  const [factsInput, setFactsInput] = useState<string>(PRESET_FACTS[0].text);
  const [caseTitleInput, setCaseTitleInput] = useState<string>('Sengketa Penyerobotan Tanah & AJB');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<IracAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handlePresetSelect = (preset: typeof PRESET_FACTS[0]) => {
    setCaseTitleInput(preset.label);
    setFactsInput(preset.text);
    setAnalysisResult(null);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!factsInput.trim()) {
      setErrorMsg('Silakan masukkan kronologi fakta permasalahan hukum terlebih dahulu.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await MockIracService.analyzeFactsToIrac(factsInput, caseTitleInput);
      setAnalysisResult(result);
    } catch (err) {
      setErrorMsg('Gagal melakukan analisis neural IRAC. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="space-y-8 animate-fade-in py-8 border-t border-white/10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proses Inti 2 &middot; Bedah Kronologi &amp; Generator IRAC</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Bedah Fakta ke Format <span className="text-gradient-gold">IRAC Presisi AI</span>
        </h2>

        <p className="text-secondary text-sm md:text-base leading-relaxed">
          Tuliskan cerita kronologi hukum Anda atau pilih prasetel sengketa di bawah. 
          Mesin AI Justifiqa akan membedah secara yuridis menjadi rumusan <strong className="text-white">Issue, Rule, Application, dan Conclusion</strong>.
        </p>
      </div>

      {/* Preset Buttons & Input Card */}
      <div className="glass-card max-w-4xl mx-auto p-6 md:p-8 border border-white/15 space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
            Pilih Kasus Prasetel Instan (Untuk Uji Coba Cepat):
          </label>
          <div className="flex flex-wrap gap-2.5">
            {PRESET_FACTS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
                  caseTitleInput === preset.label
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-4 pt-2 border-t border-white/10">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white block">
              Judul Sengketa / Permasalahan:
            </label>
            <input
              type="text"
              value={caseTitleInput}
              onChange={(e) => setCaseTitleInput(e.target.value)}
              placeholder="Contoh: Sengketa Penyerobotan Tanah Warisan"
              className="w-full rounded-xl bg-[#0b0f19] border border-white/15 p-3 text-xs text-white placeholder:text-muted focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white block">
              Kronologi Fakta Hukum (Story of Facts):
            </label>
            <textarea
              rows={5}
              value={factsInput}
              onChange={(e) => setFactsInput(e.target.value)}
              placeholder="Tuliskan kronologi lengkap kejadian, waktu, pihak yang terlibat, dan kerugian nyata yang timbul..."
              className="w-full rounded-xl bg-[#0b0f19] border border-white/15 p-3.5 text-xs text-white placeholder:text-muted focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full btn btn-primary-gold py-3.5 text-base shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menganalisis Ontologi &amp; Yurisprudensi Hukum (AI Neural)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Bedah Fakta ke Format IRAC Sekarang</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Render Analysis Result if available */}
      {analysisResult && (
        <div id="irac-result">
          <IracCard analysis={analysisResult} onProceedToDraft={onProceedToDraft} />
        </div>
      )}
    </section>
  );
};
