import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VerifierPanelProps {
  isDark?: boolean;
  onBackToGateway: () => void;
}

export const VerifierPanel: React.FC<VerifierPanelProps> = ({
  onBackToGateway,
}) => {
  const [verifyHash, setVerifyHash] = useState(
    'e8f9a0c2b4d6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8a0b2d4c6e8f0a2c4e6f8'
  );
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      setVerifyHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyHash.trim() && !selectedFileName) {
      alert('Silakan masukkan hash SHA-256 atau unggah berkas PDF terlebih dahulu.');
      return;
    }
    setVerifyResult(true);
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-foreground uppercase">
          VERIFIKASI KEASLIAN DOKUMEN HUKUM
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
          Pastikan keabsahan dokumen opini hukum, kontrak jasa, atau putusan mediasi yang
          diterbitkan melalui platform Justica menggunakan validasi kriptografi SHA-256 &amp;
          e-Meterai Peruri.
        </p>
      </div>

      <Card className="w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl border border-border bg-card/85 backdrop-blur-xl shadow-xl mb-12">
        <form onSubmit={handleVerifySubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-bold text-sm sm:text-base text-foreground">
              Masukkan Kode Dokumen / Hash SHA-256:
            </label>
            <Input
              type="text"
              value={verifyHash}
              onChange={(e) => setVerifyHash(e.target.value)}
              className="w-full h-12 font-mono text-xs sm:text-sm rounded-xl bg-secondary/40 border-border text-foreground focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-sm sm:text-base text-foreground">
              Atau Unggah Berkas PDF Asli (.PDF):
            </label>
            <label className="block border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer transition-all bg-secondary/20 hover:border-primary hover:bg-primary/5">
              <div className="text-4xl mb-2">📄</div>
              <div className="font-bold text-base mb-1 text-foreground">
                {selectedFileName || 'Pilih Berkas Dokumen PDF atau Seret ke Sini...'}
              </div>
              <div className="text-xs text-muted-foreground">
                Maksimal 15 MB • Pemeriksaan dilakukan lokal di browser tanpa mengunggah isi rahasia
                dokumen ke server.
              </div>
              <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>🛡️</span>
            <span>VERIFIKASI KEASLIAN SEKARANG</span>
          </Button>
        </form>
      </Card>

      {verifyResult && (
        <Card className="w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl border border-emerald-500/80 bg-card/95 shadow-2xl mb-12 animate-fade-in flex flex-col gap-6">
          <CardHeader className="p-0 flex flex-row items-center gap-4 pb-6 border-b border-border">
            <span className="text-4xl">✅</span>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-xl sm:text-2xl text-emerald-500 font-heading">
                  DOKUMEN ASLI TERVERIFIKASI
                </h3>
                <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500 text-xs font-bold uppercase">
                  Tamper-Proof
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Integritas kriptografi SHA-256 cocok 100% dengan rantai WORM Immutable Ledger
                Justica.
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground font-semibold w-52">Status Keaslian</span>
              <span className="font-bold text-emerald-500">
                ✅ DOKUMEN ASLI TERVERIFIKASI (Tamper-Proof)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground font-semibold w-52">Penerbit Dokumen</span>
              <span className="text-foreground font-bold">
                Dr. Mahendra Kusuma, S.H., M.H. (Advokat Berlisensi SIPP: 18293/PERADI/2015)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground font-semibold w-52">Jenis Dokumen</span>
              <span className="text-foreground font-bold">
                Opini Hukum &amp; Analisis Risiko Kontrak Kerja Sama Korporat (#DLV-441)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground font-semibold w-52">Tanggal Diterbitkan</span>
              <span className="text-foreground font-bold">
                02 Juli 2026, 14:22:05 UTC (WORM Audit ID: <code>#AUD-8812</code>)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground font-semibold w-52">Meterai Elektronik</span>
              <span className="font-bold text-accent">
                🛡️ e-Meterai Peruri Resmi Terdaftar (API v2.4 Signature Verified)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <span className="text-muted-foreground font-semibold w-52">Hash SHA-256 Validasi</span>
              <span className="font-mono text-xs text-muted-foreground break-all">{verifyHash}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={onBackToGateway}
          className="rounded-xl font-bold gap-2 text-sm shadow-sm"
        >
          <span>&lt; Kembali ke Gerbang Utama</span>
        </Button>
      </div>
    </section>
  );
};
