import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { ConsultationSection } from '../components/ConsultationSection';
import { ConsultationBookingModal } from '../components/ConsultationBookingModal';
import { IracSection } from '../components/IracSection';
import { DocumentDraftingModal } from '../components/DocumentDraftingModal';
import type { ConsultationTier, EscrowTransaction } from '../types/consultation';
import type { IracAnalysis, LegalDocumentDraft } from '../types/irac';
import {
  ArrowLeft,
  CheckCircle2,
  Key,
  Database,
  FileText,
  LayoutDashboard,
  Search,
  BrainCircuit,
  MessageSquare,
  Download,
  Clock,
  ShieldCheck,
  UserCheck,
  Filter
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'irac'>('overview');
  const [selectedTier, setSelectedTier] = useState<ConsultationTier | null>(null);
  const [latestTransaction, setLatestTransaction] = useState<EscrowTransaction | null>(null);
  const [activeIrac, setActiveIrac] = useState<IracAnalysis | null>(null);
  const [downloadedDraftInfo, setDownloadedDraftInfo] = useState<{
    title: string;
    wormHash: string;
  } | null>(null);

  // Catalog filters state (MOCK-J-CL-02)
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const handleSelectTier = (tier: ConsultationTier) => {
    setSelectedTier(tier);
  };

  const handleBookingSuccess = (tx: EscrowTransaction) => {
    setLatestTransaction(tx);
    setActiveTab('overview');
  };

  const handleProceedToDraft = (analysis: IracAnalysis) => {
    setActiveIrac(analysis);
  };

  const handleDraftDownloaded = (draft: LegalDocumentDraft, wormHash: string) => {
    setDownloadedDraftInfo({
      title: draft.title,
      wormHash,
    });
  };

  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-8 py-6 animate-fade-in font-sans">
          {/* Top Header & Navigation Bar (MOCK-J-CL-02A) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-blue-400" />
                <span>Gerbang Utama</span>
              </Link>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-CL-02..04 • Portal Klien Terverifikasi</span>
              </span>
            </div>

            {/* Navigation Tabs Switcher */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-white/10 shadow-inner overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dasbor Saya &amp; Riwayat</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'catalog'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Cari &amp; Katalog Advokat</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('irac')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'irac'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>IRAC Bedah Kasus</span>
              </button>
            </div>
          </div>

          {/* Escrow Status Banner when an active transaction exists (MOCK-J-CL-03) */}
          {latestTransaction && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-lg">
              <div className="flex items-start gap-3 text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-white text-sm uppercase tracking-wide">Tiket Konsultasi Aktif (Escrow HELD)</p>
                  <p className="text-slate-300 mt-0.5">
                    Advokat: <strong className="text-white">{latestTransaction.advocateName}</strong> &middot; ID: <code className="text-emerald-400 font-mono">{latestTransaction.id}</code>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Key className="w-3 h-3" />
                      Mutex Lock Active (SELECT ... FOR UPDATE)
                    </span>
                    <span className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      <Database className="w-3 h-3" />
                      WORM Audit Logged
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-slate-950 font-extrabold text-xs self-start sm:self-center shadow-md">
                Status: ACTIVE_HELD
              </span>
            </div>
          )}

          {/* Document Status Banner when WORM document downloaded (MOCK-J-CL-04) */}
          {downloadedDraftInfo && (
            <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-lg">
              <div className="flex items-start gap-3 text-xs text-blue-300 font-medium">
                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-white text-sm uppercase tracking-wide">Draf Dokumen Hukum Terverifikasi &amp; Terkunci WORM</p>
                  <p className="text-slate-300 mt-0.5">
                    Dokumen: <strong className="text-white">{downloadedDraftInfo.title}</strong>
                  </p>
                  <p className="text-[11px] text-amber-400 font-mono mt-1 break-all">
                    Hash Audit: {downloadedDraftInfo.wormHash}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs self-start sm:self-center shadow-md">
                Status: WORM_VERIFIED
              </span>
            </div>
          )}

          {/* TAB 1 CONTENT: DASBOR SAYA & RIWAYAT (MOCK-J-CL-02A) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Greeting Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight uppercase">
                          HALO, {session.userName || 'BUDI SANTOSO'}
                        </h1>
                        <p className="text-xs text-blue-400 font-semibold">Klien Hukum Terverifikasi • NIK 317123••••••0001</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">
                      Kelola sesi konsultasi aktif, unduh dokumen hukum ber-meterai elektronik, atau jadwalkan
                      konsultasi baru ber-escrow mutex.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>+ KONSULTASI BARU (CARI ADVOKAT)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-bold text-xs transition-all"
                    >
                      <span>Layanan Pro Bono Gratis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* KONSULTASI HUKUM AKTIF (Table 1 MOCK-J-CL-02A) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>KONSULTASI HUKUM AKTIF</span>
                  </h2>
                  <span className="text-xs text-slate-400">Sinkronisasi Escrow Mutex Real-Time</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="p-4">Advokat Mitra</th>
                        <th className="p-4">Spesialisasi</th>
                        <th className="p-4">Status Layanan &amp; Durasi</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Dr. Mahendra Kusuma, S.H., M.H.</span>
                        </td>
                        <td className="p-4 text-slate-400">Hukum Bisnis &amp; Sengketa</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                            Sesi Berjalan (44:12) • Escrow HELD
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert('Membuka Ruang Obrolan E2EE (MOCK-J-CL-04)...')}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Buka Ruang Obrolan</span>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span>Anita Wulandari, S.H., M.H.</span>
                        </td>
                        <td className="p-4 text-slate-400">Hukum Ketenagakerjaan &amp; PHK</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-bold">
                            Penyusunan Dokumen Draf
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => setActiveTab('irac')}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-bold text-xs transition-all inline-flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Lihat Dokumen</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RIWAYAT DOKUMEN & KONSULTASI SELESAI (Table 2 MOCK-J-CL-02A) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span>RIWAYAT DOKUMEN &amp; KONSULTASI SELESAI (WORM IMMUTABLE)</span>
                </h2>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="p-4">Tanggal</th>
                        <th className="p-4">Advokat Mitra</th>
                        <th className="p-4">Layanan &amp; Dokumen</th>
                        <th className="p-4 text-right">Unduhan WORM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono text-slate-400">02/07/2026</td>
                        <td className="p-4 font-bold text-white">Dr. Mahendra Kusuma, S.H., M.H.</td>
                        <td className="p-4 text-slate-300">Legal Opinion Kontrak NDA (e-Meterai Peruri)</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert('Mengunduh Dokumen PDF terverifikasi SHA-256 WORM Vault...')}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-blue-300 hover:text-blue-200 font-bold text-xs transition-all inline-flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5 text-blue-400" />
                            <span>Unduh Dokumen PDF</span>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono text-slate-400">18/06/2026</td>
                        <td className="p-4 font-bold text-white">Budi Hartono, S.H.</td>
                        <td className="p-4 text-slate-300">Konsultasi Tatap Muka &amp; Resi Escrow</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert('Mengunduh Bukti Transaksi Escrow Mutex HELD...')}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-bold text-xs transition-all inline-flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-400" />
                            <span>Unduh Bukti Transaksi</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 CONTENT: CARI & KATALOG ADVOKAT (MOCK-J-CL-02) */}
          {activeTab === 'catalog' && (
            <div className="space-y-8 animate-fade-in">
              {/* Filter Bar Header (Exact 1-to-1 with MOCK-J-CL-02) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">FILTER DIRECTORY:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">Spesialisasi: ^Semua Spesialisasi^</option>
                    <option value="BUSINESS">Hukum Bisnis &amp; Sengketa</option>
                    <option value="LABOR">Hukum Ketenagakerjaan &amp; PHK</option>
                    <option value="CRIMINAL">Pidana &amp; Litigasi Perdata</option>
                  </select>

                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={onlineOnly}
                      onChange={(e) => setOnlineOnly(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
                    />
                    <span className="font-bold">Advokat Online Saat Ini</span>
                  </label>
                </div>
              </div>

              {/* Full Consultation Section component (Catalog of tiers and advocates) */}
              <ConsultationSection onSelectTier={handleSelectTier} />
            </div>
          )}

          {/* TAB 3 CONTENT: IRAC BEDAH KASUS & DRAF (MOCK-J-CL-04 / IRAC Section) */}
          {activeTab === 'irac' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 to-slate-900 border border-purple-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                      GENERATOR IRAC &amp; PENYUSUNAN DOKUMEN KLIEN
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Bedah kronologi hukum mandiri dengan analisis neural 4 pilar sebelum atau selama sesi konsultasi advokat.
                    </p>
                  </div>
                </div>
              </div>

              <IracSection onProceedToDraft={handleProceedToDraft} />
            </div>
          )}

          {/* Consultation Booking & Escrow Mutex Modal (MOCK-J-CL-03) */}
          <ConsultationBookingModal
            tier={selectedTier}
            session={session}
            onClose={() => setSelectedTier(null)}
            onBookingSuccess={handleBookingSuccess}
          />

          {/* Document Drafting Builder & Preview Modal */}
          <DocumentDraftingModal
            analysis={activeIrac}
            session={session}
            onClose={() => setActiveIrac(null)}
            onDraftDownloaded={handleDraftDownloaded}
          />
        </div>
      )}
    </BaseLayout>
  );
};
