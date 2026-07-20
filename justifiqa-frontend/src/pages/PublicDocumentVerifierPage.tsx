import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavbarGateway } from '../components/gateway/NavbarGateway';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShieldCheck, Upload, FileText, CheckCircle2, XCircle, Info } from 'lucide-react';

type VerifyStatus = 'idle' | 'verified' | 'mismatch';

const RESULT_DATA = {
  penerbit: 'Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi SIPP: 18293/PERADI/2015)',
  jenis: 'Opini Hukum & Analisis Risiko Kontrak Kerja Sama Korporat (#DLV-441)',
  tanggal: '02 Juli 2026, 14:22:05 UTC (WORM Audit ID: #AUD-8812)',
  meterai: '🛡️ e-Meterai Peruri Resmi Terdaftar (API v2.4 Signature Verified)',
};

/**
 * PublicDocumentVerifierPage — Halaman Verifikasi Publik SHA-256 (MOCK-J-PUBLIC-VERIFY)
 * Standalone page dengan NavbarGateway dan proper back navigation via Link.
 * Rule #2: All buttons locked: whitespace-nowrap, flex-shrink-0, min-height via CSS class.
 * Rule #3: Satu Card = satu tanggung jawab, no min-height raksasa.
 */
export const PublicDocumentVerifierPage: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [verifyHash, setVerifyHash] = useState('e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  const handleFileSelect = (file: File) => {
    setSelectedFileName(`📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    setVerifyHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    setVerifyStatus('idle');
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyHash.trim() && !selectedFileName) {
      alert('Silakan masukkan hash SHA-256 atau unggah berkas PDF terlebih dahulu.');
      return;
    }
    // Simulation: hash yang diawali 'e8' → verified, lainnya → mismatch
    setVerifyStatus(verifyHash.startsWith('e8') ? 'verified' : 'mismatch');
    // Scroll to result
    setTimeout(() => {
      document.getElementById('verify-result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setVerifyHash('');
    setSelectedFileName(null);
    setVerifyStatus('idle');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-background text-foreground relative overflow-x-clip">
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-blue-600/8 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-500/6 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ── NAVBAR ── */}
      <NavbarGateway isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      {/* ── MAIN ── */}
      <main className="flex-1 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 flex flex-col items-center gap-10">

          {/* ── PAGE HERO ── */}
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Portal Verifikasi Publik</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading text-foreground leading-tight">
              VERIFIKASI KEASLIAN{' '}
              <span className="text-gradient-gold">DOKUMEN HUKUM</span>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Pastikan keabsahan dokumen opini hukum, kontrak jasa, atau putusan mediasi
              yang diterbitkan melalui platform Justica menggunakan validasi kriptografi
              SHA-256 &amp; e-Meterai Peruri.
            </p>
          </div>

          {/* ── FORM CARD ── */}
          <Card
            id="verifier-form-card"
            className="w-full max-w-4xl rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-xl animate-fade-in"
          >
            <CardHeader className="px-8 pt-8 pb-0">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Input Verifikasi
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-6">
              <form onSubmit={handleVerifySubmit} className="space-y-7">
                {/* Hash input */}
                <div className="space-y-2.5">
                  <label htmlFor="verify-hash" className="block font-bold text-sm sm:text-base text-foreground">
                    Masukkan Kode Dokumen / Hash SHA-256:
                  </label>
                  <Input
                    id="verify-hash"
                    type="text"
                    value={verifyHash}
                    onChange={(e) => { setVerifyHash(e.target.value); setVerifyStatus('idle'); }}
                    placeholder="Contoh: e8f9a0c2b4d6..."
                    className="w-full h-12 font-mono text-xs sm:text-sm rounded-xl bg-secondary/40 border-border text-foreground focus-visible:ring-primary"
                  />
                </div>

                {/* Dropzone */}
                <div className="space-y-2.5">
                  <label className="block font-bold text-sm sm:text-base text-foreground">
                    Atau Unggah Berkas PDF Asli (.PDF):
                  </label>
                  <label
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${isDraggingOver
                      ? 'border-primary bg-primary/8 scale-[1.01]'
                      : 'border-border bg-secondary/20 hover:border-primary/60 hover:bg-primary/5'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={handleDrop}
                  >
                    <Upload className={`w-10 h-10 transition-colors ${isDraggingOver ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                    <div className="space-y-1">
                      <div className="font-bold text-base text-foreground">
                        {selectedFileName ?? 'Seret & Lepas berkas PDF di sini'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        atau klik untuk memilih file &bull; Maks. 15 MB &bull; Pemeriksaan dilakukan lokal di browser
                      </div>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  id="btn-verifikasi-sekarang"
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-[0_8px_30px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] gap-2"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>VERIFIKASI KEASLIAN SEKARANG</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ── RESULT CARD ── */}
          {verifyStatus !== 'idle' && (
            <div id="verify-result-section" className="w-full max-w-4xl animate-fade-in">
              {verifyStatus === 'verified' ? (
                <Card className="rounded-2xl border-2 border-emerald-500/70 bg-card/95 shadow-2xl overflow-hidden">
                  {/* Green accent stripe */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-green-500" />
                  <CardHeader className="px-8 pt-6 pb-4 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 shrink-0 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" strokeWidth={1.5} />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-500">
                            DOKUMEN ASLI TERVERIFIKASI
                          </h3>
                          <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500 text-xs font-extrabold uppercase tracking-wider">
                            Tamper-Proof ✓
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Integritas kriptografi SHA-256 cocok 100% dengan rantai WORM Immutable Ledger Justica.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 py-6 space-y-0">
                    {[
                      { label: 'Status Keaslian', value: '✅ DOKUMEN ASLI TERVERIFIKASI (Tamper-Proof)', color: 'text-emerald-500' },
                      { label: 'Penerbit Dokumen', value: RESULT_DATA.penerbit, color: 'text-foreground' },
                      { label: 'Jenis Dokumen', value: RESULT_DATA.jenis, color: 'text-foreground' },
                      { label: 'Tanggal Diterbitkan', value: RESULT_DATA.tanggal, color: 'text-foreground' },
                      { label: 'Meterai Elektronik', value: RESULT_DATA.meterai, color: 'text-accent' },
                      { label: 'Hash SHA-256 Validasi', value: verifyHash, mono: true },
                    ].map(({ label, value, color = 'text-muted-foreground', mono }) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b border-border/50 last:border-b-0">
                        <span className="text-muted-foreground font-semibold text-xs sm:text-sm w-52 shrink-0">{label}</span>
                        <span className={`font-bold text-xs sm:text-sm break-all ${mono ? 'font-mono text-muted-foreground' : color}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="rounded-2xl border-2 border-red-500/70 bg-card/95 shadow-2xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-orange-500" />
                  <CardContent className="px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <XCircle className="w-12 h-12 text-red-500 shrink-0" strokeWidth={1.5} />
                      <div className="space-y-1">
                        <h3 className="font-heading font-extrabold text-xl text-red-500">DOKUMEN TIDAK COCOK / PALSU</h3>
                        <p className="text-sm text-muted-foreground">
                          Hash SHA-256 tidak ditemukan dalam rantai WORM Ledger Justica. Dokumen kemungkinan telah dimodifikasi
                          atau bukan diterbitkan oleh platform ini.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reset */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="navbar-btn-action bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-sm cursor-pointer transition-colors mx-auto"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Verifikasi Dokumen Lain</span>
                </button>
              </div>
            </div>
          )}

          {/* ── BACK LINK ── */}
          <Link
            to="/"
            className="navbar-btn-action bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-sm cursor-pointer transition-colors"
            id="btn-kembali-beranda"
          >
            &larr; Kembali ke Gerbang Utama
          </Link>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 text-center border-t border-border bg-background text-muted-foreground text-xs font-medium">
        © 2026 JUSTICA Legal Platform &bull; Verifikasi dilakukan secara lokal di browser Anda &bull; WORM Immutable Ledger
      </footer>
    </div>
  );
};
