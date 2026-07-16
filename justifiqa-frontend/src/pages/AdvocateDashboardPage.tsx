import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../components/BaseLayout';
import {
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Wallet,
  Clock,
  ShieldCheck,
  Award,
  Upload,
  Lock,
  Pause,
  Play,
  FileText,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';

export const AdvocateDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'command_center' | 'e2ee_room' | 'schedule' | 'deliverable' | 'wallet'>('command_center');
  const [practiceStatus, setPracticeStatus] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [simulateConflict, setSimulateConflict] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Fair-Clock SLA Monitor State (MOCK-J-AD-04)
  const [clockSeconds, setClockSeconds] = useState(44 * 60 + 12);
  const [isClockPaused, setIsClockPaused] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ time: string; sender: string; text: string }>>([
    { time: '10:30', sender: 'Klien (PT Mitra Jaya)', text: 'Selamat pagi Pak Advokat, kami mengalami sengketa klaim kontrak vendor mendadak.' },
    { time: '10:31', sender: 'Anda (Dr. Mahendra)', text: 'Selamat pagi. Siap membantu. Mohon unggah draf kontrak NDA dan pasal yang dipermasalahkan agar saya tinjau.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Schedule slots state (MOCK-J-AD-03)
  const [scheduleSlots, setScheduleSlots] = useState({
    monday: { active: true, hours: '09:00 - 15:00 WIB' },
    tuesday: { active: true, hours: '09:00 - 16:00 WIB' },
    wednesday: { active: true, hours: '10:00 - 14:00 WIB' },
    thursday: { active: false, hours: '09:00 - 15:00 WIB' },
    friday: { active: false, hours: '13:00 - 17:00 WIB' }
  });

  // Deliverable upload state (MOCK-J-AD-05)
  const [deliverableFile, setDeliverableFile] = useState('Legal_Opinion_NDA_v1.pdf');
  const [deliverablePublished, setDeliverablePublished] = useState(false);

  // Wallet state (MOCK-J-AD-06)
  const [availableBalance, setAvailableBalance] = useState(14850000);
  const [escrowBalance] = useState(4200000);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeTab === 'e2ee_room' && !isClockPaused && clockSeconds > 0) {
      timer = setInterval(() => {
        setClockSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, isClockPaused, clockSeconds]);

  const handleToggleStatus = () => {
    if (simulateConflict) {
      setConflictError('Error 409 Conflict: Gagal mengubah status praktik karena ada sesi konsultasi aktif atau sidang pengadilan.');
      return;
    }
    setConflictError(null);
    setPracticeStatus((prev) => (prev === 'ONLINE' ? 'OFFLINE' : 'ONLINE'));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setChatMessages((prev) => [...prev, { time: timeStr, sender: 'Anda (Dr. Mahendra)', text: newMessage.trim() }]);
    setNewMessage('');
  };

  const handleTogglePauseClock = () => {
    if (!isClockPaused && pauseCount >= 2) {
      alert('Batas maksimal akumulasi jeda 2 kali per sesi telah dicapai (SLA Guardrails Lapis 2).');
      return;
    }
    if (!isClockPaused) {
      setPauseCount((prev) => prev + 1);
    }
    setIsClockPaused(!isClockPaused);
  };

  const formatClock = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <BaseLayout>
      {(session) => (
        <div className="space-y-8 py-6 animate-fade-in font-sans">
          {/* Top Header & Navigation Bar (MOCK-J-AD-02A) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>Gerbang Utama</span>
              </Link>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-AD-02A..06 • Command Center Advokat PERADI</span>
              </span>
            </div>

            {/* Navigation Tabs Switcher */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-white/10 shadow-inner overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('command_center')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'command_center'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Command Center</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('e2ee_room')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'e2ee_room'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ruang Konsultasi E2EE</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'schedule'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwal &amp; Slot</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('deliverable')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'deliverable'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>Deliverable e-Meterai</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'wallet'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Dompet &amp; Honor</span>
              </button>
            </div>
          </div>

          {/* Practice Status & Conflict simulation bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${practiceStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Status Praktik Anda: <strong className={practiceStatus === 'ONLINE' ? 'text-emerald-400' : 'text-slate-400'}>{practiceStatus}</strong>
              </span>
              <button
                type="button"
                onClick={handleToggleStatus}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-[11px] font-bold text-white transition-all"
              >
                Ubah ke {practiceStatus === 'ONLINE' ? 'OFFLINE' : 'ONLINE'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateConflict}
                  onChange={(e) => {
                    setSimulateConflict(e.target.checked);
                    if (!e.target.checked) setConflictError(null);
                  }}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-0"
                />
                <span>Simulasikan Sesi Aktif / Sidang (Error 409 Conflict)</span>
              </label>
            </div>
          </div>

          {conflictError && (
            <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-medium flex items-center gap-3 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{conflictError}</span>
            </div>
          )}

          {/* TAB 1 CONTENT: COMMAND CENTER ADVOKAT (MOCK-J-AD-02A) */}
          {activeTab === 'command_center' && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Greeting & SIPP Reputation Summary */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-extrabold text-white font-heading tracking-tight">
                          INFORMASI ADVOKAT &amp; RINGKASAN REPUTASI SIPP
                        </h1>
                        <p className="text-xs text-emerald-400 font-semibold">
                          Selamat datang, Adv. {session.userName || 'Dr. Mahendra Kusuma'}, S.H., M.H. &middot; NIA: 18293/PERADI/2015
                        </p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">
                      Seluruh aktivitas sesi konsultasi dan penerbitan opini hukum Anda diawasi langsung oleh
                      <strong> Fair-Clock SLA Monitor</strong> demi transparansi hubungan advokat-klien.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status Verifikasi MA</p>
                      <span className="text-xs font-extrabold text-emerald-400 mt-1 inline-block">ACTIVE SIPP VERIFIED</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">SLA Respons E2EE</p>
                      <span className="text-xs font-extrabold text-white mt-1 inline-block font-mono">99.4% (&lt; 2 Menit)</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Perkara Selesai</p>
                      <span className="text-xs font-extrabold text-white mt-1 inline-block">318 Perkara</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Escrow Siap Cair</p>
                      <span className="text-xs font-extrabold text-emerald-400 mt-1 inline-block font-mono">Rp 14.850.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DAFTAR PERKARA HUKUM AKTIF & JADWAL KONSULTASI HARI INI (Table MOCK-J-AD-02A) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <span>DAFTAR PERKARA HUKUM AKTIF &amp; JADWAL KONSULTASI HARI INI</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">SELECT ... FOR UPDATE Mutex Lock</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="p-4">ID Perkara</th>
                        <th className="p-4">Nama Klien</th>
                        <th className="p-4">Layanan &amp; Tier</th>
                        <th className="p-4">Jadwal / Deadline</th>
                        <th className="p-4">Status Fair-Clock</th>
                        <th className="p-4 text-right">Aksi Langsung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-emerald-400">REQ-202607-001</td>
                        <td className="p-4 font-bold text-white">PT Mitra Jaya (Klien)</td>
                        <td className="p-4 text-slate-300">Tier 2 (E2EE 45m)</td>
                        <td className="p-4 font-mono">10:30 - 11:15 WIB</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                            READY (SLA OK)
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => setActiveTab('e2ee_room')}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm"
                          >
                            MASUK RUANG CHAT
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-400">REQ-202607-002</td>
                        <td className="p-4 font-bold text-white">Bpk. Hendra S.</td>
                        <td className="p-4 text-slate-300">Tier 3 (Drafting e-Meterai)</td>
                        <td className="p-4 font-mono">Deadline: 11 Juli 2026</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold text-[11px]">
                            DRAFTING IN PROGRESS
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => setActiveTab('deliverable')}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
                          >
                            UNGGAH DELIVERABLE
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-red-400">REQ-202607-003</td>
                        <td className="p-4 font-bold text-white">Ibu Kartika</td>
                        <td className="p-4 text-slate-300">Tier 2 (E2EE 45m)</td>
                        <td className="p-4 font-mono">09 Juli 2026</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold text-[11px]">
                            ESCROW FROZEN (DISPUTE)
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert('Membuka Pusat Mediasi Sengketa (ADM-02)...')}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-bold text-xs transition-all"
                          >
                            LIHAT MEDIASI
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PENCAIRAN SALDO ESCROW STRIP (MOCK-J-AD-02A / AD-06 shortcut) */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">PENCAIRAN SALDO ESCROW TERVERIFIKASI</h3>
                    <p className="text-xs text-slate-400">Transfer otomatis ke rekening Bank Mandiri terdaftar via BI-FAST.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('wallet')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    TARIK SALDO ESCROW (Rp 14.850.000) VIA BI-FAST
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Mengunduh Laporan Audit Pajak PPh 21 dan Bukti Potong WORM...')}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Laporan PPh 21</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 CONTENT: RUANG KONSULTASI ADVOKAT E2EE (MOCK-J-AD-04) */}
          {activeTab === 'e2ee_room' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                      SESI KONSULTASI HUKUM AKTIF • PT MITRA JAYA
                    </h2>
                    <p className="text-xs text-slate-300">
                      Percakapan diamankan dengan enkripsi E2EE AES-GCM 256-Bit &amp; Hardware-bound Session Token.
                    </p>
                  </div>
                </div>

                {/* Fair-Clock SLA Monitor Display */}
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-white/10">
                  <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">Sisa Waktu Sesi (Fair-Clock)</p>
                    <p className="text-lg font-mono font-extrabold text-white">{formatClock(clockSeconds)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTogglePauseClock}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isClockPaused ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isClockPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isClockPaused ? 'Lanjutkan Sesi' : 'Jeda Sesi (Fair-Clock)'}</span>
                  </button>
                </div>
              </div>

              {/* SLA Guardrails 3-Layer Alert Box (MOCK-J-AD-04 section 3) */}
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-300">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                    ATURAN FAIR-CLOCK &amp; 3 LAPIS PENGAMAN SLA (SLA GUARDRAILS):
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-1 text-slate-300">
                    <li><strong>Lapis 1 (Maks. 15 Menit/Jeda):</strong> Jika jeda melebihi 15 menit, arloji otomatis berjalan (*Auto-Resume*).</li>
                    <li><strong>Lapis 2 (Maks. Akumulasi 30 Menit/Sesi):</strong> Anda telah menggunakan <span className="text-amber-400 font-bold">{pauseCount} / 2</span> kesempatan jeda.</li>
                    <li><strong>Lapis 3 (Anti-Malpractice):</strong> Jeda digunakan untuk meninjau lampiran/bukti hukum Klien agar waktu berbayar tidak tergerus sia-sia.</li>
                  </ul>
                </div>
              </div>

              {/* Chat Box Area */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
                <div className="h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-950 border border-white/5">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-mono text-emerald-400">[{msg.time}]</span>
                        <strong className="text-white">{msg.sender}:</strong>
                      </div>
                      <p className="text-sm text-slate-200 pl-14 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ketik analisis atau balasan hukum ber-enkripsi E2EE untuk Klien..."
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                  >
                    Kirim Pesan E2EE
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('deliverable')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>BUAT DOKUMEN DELIVERABLE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Akhiri sesi konsultasi? Saldo Escrow akan diteruskan ke dompet Anda.')) {
                        setActiveTab('command_center');
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-sm"
                  >
                    Akhiri Sesi Konsultasi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 CONTENT: PENGATURAN JADWAL & SLOT PRACTIK (MOCK-J-AD-03) */}
          {activeTab === 'schedule' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                      ATUR JADWAL &amp; SLOT KONSULTASI ANDA
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tentukan hari dan jam operasional untuk konsultasi daring dan luring. Terkunci dengan <code>SELECT ... FOR UPDATE</code>.
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="space-y-4">
                  {(Object.keys(scheduleSlots) as Array<keyof typeof scheduleSlots>).map((dayKey) => {
                    const slot = scheduleSlots[dayKey];
                    const dayName = {
                      monday: 'Senin',
                      tuesday: 'Selasa',
                      wednesday: 'Rabu',
                      thursday: 'Kamis',
                      friday: 'Jumat'
                    }[dayKey];

                    return (
                      <div key={dayKey} className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-white select-none">
                          <input
                            type="checkbox"
                            checked={slot.active}
                            onChange={(e) =>
                              setScheduleSlots((prev) => ({
                                ...prev,
                                [dayKey]: { ...prev[dayKey], active: e.target.checked }
                              }))
                            }
                            className="rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-0 w-4 h-4"
                          />
                          <span>{dayName}</span>
                        </label>
                        <input
                          type="text"
                          value={slot.hours}
                          onChange={(e) =>
                            setScheduleSlots((prev) => ({
                              ...prev,
                              [dayKey]: { ...prev[dayKey], hours: e.target.value }
                            }))
                          }
                          disabled={!slot.active}
                          className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-emerald-400 disabled:opacity-40 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => alert('Jadwal berhasil disimpan dan dikunci dengan row-level mutex (SELECT ... FOR UPDATE).')}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-all"
                >
                  SIMPAN JADWAL MUTEX
                </button>
              </div>
            </div>
          )}

          {/* TAB 4 CONTENT: PENERBITAN DELIVERABLE & E-METERAI (MOCK-J-AD-05) */}
          {activeTab === 'deliverable' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                      PENERBITAN OPINI HUKUM &amp; E-METERAI PERURI
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Unggah dokumen opini hukum resmi atau kontrak ber-meterai elektronik Anda untuk diverifikasi oleh Klien.
                    </p>
                  </div>
                  <FileCheck className="w-8 h-8 text-blue-400" />
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-dashed border-slate-700 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">File Dokumen Siap Dibubuhkan:</p>
                    <p className="text-xs font-mono text-blue-400 mt-1">{deliverableFile} (2.4 MB)</p>
                    <div className="mt-3">
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs text-slate-200 font-semibold transition-all inline-block">
                        <span>Pilih Berkas Lain...</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setDeliverableFile(file.name);
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-2">
                      Status e-Meterai: Siap Dibubuhkan (Peruri SHA-256 KMS Signature)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDeliverablePublished(true);
                    alert('Dokumen berhasil diterbitkan dengan e-Meterai Peruri dan tercatat pada WORM Vault!');
                  }}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>TERBITKAN DOKUMEN BER-EMETERAI</span>
                </button>

                {deliverablePublished && (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                    ✓ Dokumen deliverable telah diterbitkan dan dikirimkan ke dasbor Klien (`MOCK-J-CL-04`).
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5 CONTENT: DOMPET ADVOKAT & PENCAIRAN HONOR (MOCK-J-AD-06) */}
          {activeTab === 'wallet' && (
            <div className="space-y-8 animate-fade-in">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                      DOMPET ADVOKAT &amp; PENCAIRAN HONOR
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Kelola saldo honorarium dan lakukan penarikan dana langsung ke rekening bank terdaftar Anda.
                    </p>
                  </div>
                  <Wallet className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Saldo Tersedia (Siap Cair)</p>
                    <p className="text-2xl font-mono font-extrabold text-emerald-400">
                      Rp {availableBalance.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Saldo Escrow HELD (Aktif)</p>
                    <p className="text-2xl font-mono font-extrabold text-blue-400">
                      Rp {escrowBalance.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase">Rekening Tujuan Penarikan BI-FAST</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-white">Bank Mandiri • Dr. Mahendra Kusuma</span>
                    <span className="font-mono text-emerald-400 font-bold">123-00-0998877-6</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    * Perhitungan potongan pajak PPh 21 tenaga ahli hukum (NPPN/Progressive) dihitung otomatis
                    dan diterbitkan bukti potong WORM instan saat pencairan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPayoutSuccess(true);
                    setAvailableBalance(0);
                    alert('Dana Rp 14.850.000 berhasil dicairkan via BI-FAST ke Bank Mandiri Anda!');
                  }}
                  disabled={availableBalance === 0}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-xl transition-all"
                >
                  {availableBalance === 0 ? 'SALDO TELAH DICAIRkan' : 'CAIRKAN DANA KE BANK MANDIRI SEKARANG'}
                </button>

                {payoutSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                    ✓ Transaksi penarikan sukses! Bukti potong pajak PPh 21 telah dicatat ke dalam WORM Immutable Vault.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </BaseLayout>
  );
};
