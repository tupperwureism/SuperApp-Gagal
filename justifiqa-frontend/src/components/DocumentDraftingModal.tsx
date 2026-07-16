import React, { useState, useEffect } from 'react';
import { X, FileText, Download, Loader2, Database, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import type { IracAnalysis, LegalDocumentDraft, LegalDocumentTemplateId } from '../types/irac';
import type { AuthSession } from '../types/auth';
import { MockIracService } from '../services/mockIracService';

interface DocumentDraftingModalProps {
  analysis: IracAnalysis | null;
  session: AuthSession;
  onClose: () => void;
  onDraftDownloaded?: (draft: LegalDocumentDraft, wormHash: string) => void;
}

const TEMPLATES: { id: LegalDocumentTemplateId; label: string; desc: string }[] = [
  {
    id: 'SOMASI_TERBUKA',
    label: 'Surat Somasi Terbuka & Peringatan Hukum',
    desc: 'Peringatan keras dengan ultimatum waktu (7 hari) sebelum gugatan hukum diajukan.',
  },
  {
    id: 'PERJANJIAN_DAMAI',
    label: 'Perjanjian Kesepakatan Damai (Dading)',
    desc: 'Akta penyelesaian sengketa di luar pengadilan dengan pelepasan tuntutan (Release & Discharge).',
  },
  {
    id: 'GUGATAN_SEDERHANA',
    label: 'Draf Gugatan Wanprestasi / PMH',
    desc: 'Draf surat gugatan formal (Posita & Petitum) siap daftarkan ke Pengadilan Negeri.',
  },
];

export const DocumentDraftingModal: React.FC<DocumentDraftingModalProps> = ({
  analysis,
  session,
  onClose,
  onDraftDownloaded,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<LegalDocumentTemplateId>('SOMASI_TERBUKA');
  const [opponentName, setOpponentName] = useState<string>('PT Mitra Solusi / Pihak yang Bersangkutan');
  const [advocateName, setAdvocateName] = useState<string>('Dr. Hendra Wijaya, S.H., M.H. & Rekan');
  const [draft, setDraft] = useState<LegalDocumentDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccessHash, setDownloadSuccessHash] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (analysis) {
      handleGenerateDraft(selectedTemplate, opponentName, advocateName);
    }
  }, [analysis, selectedTemplate]);

  if (!analysis) return null;

  const handleGenerateDraft = async (
    templateId: LegalDocumentTemplateId,
    opponent: string,
    advocate: string
  ) => {
    setErrorMsg('');
    setIsGenerating(true);
    try {
      const result = await MockIracService.generateDocumentDraft(
        templateId,
        analysis,
        session.userName,
        advocate,
        opponent
      );
      setDraft(result);
    } catch (err) {
      setErrorMsg('Gagal merakit draf dokumen hukum. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(e.target.value);
  };

  const handleRefreshDraft = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateDraft(selectedTemplate, opponentName, advocateName);
  };

  const handleDownloadAndLock = async () => {
    if (!draft) return;
    setIsDownloading(true);
    // Simulate generation of cryptographic WORM audit hash & PDF packaging
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const wormHash = `WORM-DOC-SHA256-${Math.random().toString(36).substring(2, 16).toUpperCase()}`;
    setDownloadSuccessHash(wormHash);
    setIsDownloading(false);

    if (onDraftDownloaded) {
      onDraftDownloaded(draft, wormHash);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-card w-full max-w-4xl border border-blue-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Perakitan Draf Dokumen Hukum (Document Builder Engine)
              </h3>
              <p className="text-xs text-secondary">
                Rujukan IRAC: <strong className="text-amber-400">{analysis.caseTitle}</strong> &middot; ID: {analysis.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Column / Responsive Layout */}
        <div className="py-6 overflow-y-auto flex-grow space-y-6 pr-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Template Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
              1. Pilih Jenis Dokumen Hukum yang Akan Dirakit:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 ${
                    selectedTemplate === tmpl.id
                      ? 'bg-blue-500/20 border-blue-500 text-white shadow-md ring-1 ring-blue-400/50'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="font-bold text-xs">{tmpl.label}</span>
                  <span className="text-[11px] text-secondary leading-snug">{tmpl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customization Form */}
          <form onSubmit={handleRefreshDraft} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white block">
                Nama Pihak Lawan / Tergugat / Mitra:
              </label>
              <input
                type="text"
                value={opponentName}
                onChange={handleOpponentChange}
                placeholder="Contoh: PT Mitra Solusi"
                className="w-full rounded-lg bg-[#0b0f19] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white block">
                Nama Advokat Pendamping / Kuasa Hukum:
              </label>
              <input
                type="text"
                value={advocateName}
                onChange={(e) => setAdvocateName(e.target.value)}
                placeholder="Contoh: Dr. Hendra Wijaya, S.H., M.H."
                className="w-full rounded-lg bg-[#0b0f19] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-1">
              <button
                type="submit"
                disabled={isGenerating}
                className="btn btn-secondary-glass py-2 px-4 text-xs flex items-center gap-1.5"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Merakit Ulang Klausul...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Perbarui Teks Draf Dokumen</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Live Document Preview Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                2. Pratinjau Klausul &amp; Isi Dokumen (Live Preview):
              </span>
              {isGenerating && (
                <span className="text-xs text-blue-400 flex items-center gap-1 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Merakit draf...
                </span>
              )}
            </div>

            {draft ? (
              <div className="bg-[#0b0f19] border border-white/15 rounded-2xl p-6 space-y-6 shadow-inner font-mono text-xs leading-relaxed max-h-[400px] overflow-y-auto">
                <div className="text-center border-b border-white/10 pb-4">
                  <h4 className="text-base md:text-lg font-bold text-white tracking-wide uppercase">
                    {draft.title}
                  </h4>
                  <p className="text-[11px] text-muted mt-1">
                    Diterbitkan tanggal {new Date(draft.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })} &middot; FIDO2 Watermarked
                  </p>
                </div>

                {/* Parties Summary Box */}
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted">Pihak Pengirim/Penggugat:</span>
                    <span className="text-white font-semibold">{draft.clientName} (Kuasa: {draft.advocateName})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Pihak Penerima/Tergugat:</span>
                    <span className="text-amber-400 font-semibold">{draft.opponentName}</span>
                  </div>
                </div>

                {/* Rendered Clauses */}
                <div className="space-y-5">
                  {draft.clauses.map((clause) => (
                    <div key={clause.id} className="space-y-2 border-l-2 border-amber-500/50 pl-3.5">
                      <h5 className="font-bold text-white uppercase text-xs tracking-wider">
                        {clause.title}
                      </h5>
                      <p className="text-slate-300 whitespace-pre-line text-xs font-sans">
                        {clause.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-muted border border-dashed border-white/15 rounded-2xl">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-400" />
                <span>Merakit draf dokumen hukum dari analisis IRAC...</span>
              </div>
            )}
          </div>

          {/* Download Success WORM Box or Action Buttons */}
          {downloadSuccessHash ? (
            <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Draf Dokumen Berhasil Diunduh &amp; Terkunci!</h4>
                <p className="text-xs text-secondary max-w-lg mx-auto">
                  Paket dokumen (Mock PDF/Word) telah siap diunduh ke peramban Anda. Jejak integritas dokumen telah dicatat secara permanen di WORM Vault.
                </p>
              </div>
              <div className="bg-black/50 p-3 rounded-xl font-mono text-[11px] text-blue-400 max-w-md mx-auto break-all border border-white/10 flex items-center justify-center gap-2">
                <Database className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>Hash WORM: {downloadSuccessHash}</span>
              </div>
              <div className="pt-2">
                <button onClick={onClose} className="btn btn-primary-gold px-6">
                  <span>Tutup &amp; Kembali ke Dasbor</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Draf dilindungi enkripsi E2EE &amp; diverifikasi sebelum pengunduhan.</span>
                </span>
                <span className="hidden sm:inline text-amber-400 font-mono text-[11px]">
                  ACID Transaction Ready
                </span>
              </div>

              <button
                type="button"
                onClick={handleDownloadAndLock}
                disabled={isDownloading || !draft}
                className="w-full btn btn-primary-gold py-3.5 shadow-lg text-base"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengekspor PDF &amp; Mencatat Hash WORM Vault...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Unduh Draf Dokumen &amp; Kunci Jejak WORM Vault (Mock Export)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
