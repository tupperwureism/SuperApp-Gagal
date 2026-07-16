import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import { Briefcase, ArrowLeft, CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';

export const AdvocateDashboardPage: React.FC = () => {
  const [practiceStatus, setPracticeStatus] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [simulateConflict, setSimulateConflict] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  const handleToggleStatus = () => {
    if (simulateConflict) {
      setConflictError('Error 409 Conflict: Gagal mengubah status praktik karena ada sesi konsultasi aktif/sidang.');
      return;
    }
    setConflictError(null);
    setPracticeStatus(prev => prev === 'ONLINE' ? 'OFFLINE' : 'ONLINE');
  };

  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-8 py-6 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Kembali ke Gerbang Utama (/)</span>
            </Link>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
              MOCK-J-AD-02A..06 • Command Center Advokat PERADI
            </span>
          </div>

          {/* Advocate Header Profile Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Adv. {session.userName}, S.H., M.H.</h2>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      SIPP ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">NIA PERADI: 18293/PERADI/2015 &middot; Litigasi &amp; Hukum Korporasi</p>
                </div>
              </div>

              {/* Practice Availability Toggle */}
              <div className="flex flex-col items-start md:items-end gap-2 bg-slate-950 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-300">Status Praktik:</span>
                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                      practiceStatus === 'ONLINE'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{practiceStatus}</span>
                  </button>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={simulateConflict}
                    onChange={(e) => setSimulateConflict(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-0"
                  />
                  <span>Simulasi Konflik Jadwal (409 Conflict)</span>
                </label>
              </div>
            </div>

            {conflictError && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{conflictError}</span>
              </div>
            )}
          </div>

          {/* Active Tickets Queue Table placeholder */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>Antrean Tiket Konsultasi Escrow Mutex HELD</span>
              </h3>
              <span className="text-xs text-slate-400">Sinkronisasi Real-Time</span>
            </div>
            <div className="p-8 rounded-xl bg-slate-950 border border-white/5 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-300">Belum ada antrean tiket aktif di sesi ini.</p>
              <p className="text-xs text-slate-500">
                Tiket yang dibayar oleh klien dengan status <code className="text-emerald-400">Escrow HELD</code> akan muncul seketika di tabel ini.
              </p>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};
