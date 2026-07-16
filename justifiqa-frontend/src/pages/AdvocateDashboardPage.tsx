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
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl gap-2 font-semibold shadow-sm"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span>Gerbang Utama</span>
                </Link>
              </Button>
              <Badge variant="outline" className="px-3 py-1.5 rounded-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-xs font-bold gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MOCK-J-AD-02A..06 • Command Center Advokat PERADI</span>
              </Badge>
            </div>

            {/* Navigation Tabs Switcher */}
            <div className="flex rounded-xl bg-secondary/60 p-1 border border-border shadow-inner overflow-x-auto">
              <Button
                type="button"
                variant={activeTab === 'command_center' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('command_center')}
                className="rounded-lg gap-2 font-bold whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Command Center</span>
              </Button>
              <Button
                type="button"
                variant={activeTab === 'e2ee_room' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('e2ee_room')}
                className="rounded-lg gap-2 font-bold whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ruang Konsultasi E2EE</span>
              </Button>
              <Button
                type="button"
                variant={activeTab === 'schedule' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('schedule')}
                className="rounded-lg gap-2 font-bold whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwal &amp; Slot</span>
              </Button>
              <Button
                type="button"
                variant={activeTab === 'deliverable' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('deliverable')}
                className="rounded-lg gap-2 font-bold whitespace-nowrap"
              >
                <FileCheck className="w-4 h-4" />
                <span>Deliverable e-Meterai</span>
              </Button>
              <Button
                type="button"
                variant={activeTab === 'wallet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('wallet')}
                className="rounded-lg gap-2 font-bold whitespace-nowrap"
              >
                <Wallet className="w-4 h-4" />
                <span>Dompet &amp; Honor</span>
              </Button>
            </div>
          </div>

          {/* Practice Status & Conflict simulation bar */}
          <Card className="p-4 rounded-2xl bg-card/90 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${practiceStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Status Praktik Anda: <strong className={practiceStatus === 'ONLINE' ? 'text-emerald-400' : 'text-muted-foreground'}>{practiceStatus}</strong>
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleToggleStatus}
                className="rounded-lg text-[11px] font-bold"
              >
                Ubah ke {practiceStatus === 'ONLINE' ? 'OFFLINE' : 'ONLINE'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateConflict}
                  onChange={(e) => {
                    setSimulateConflict(e.target.checked);
                    if (!e.target.checked) setConflictError(null);
                  }}
                  className="rounded border-border bg-secondary text-emerald-600 focus:ring-0"
                />
                <span>Simulasikan Sesi Aktif / Sidang (Error 409 Conflict)</span>
              </label>
            </div>
          </Card>

          {conflictError && (
            <Card className="p-4 rounded-xl bg-destructive/15 border border-destructive/40 text-destructive text-xs font-medium flex items-center gap-3 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <span>{conflictError}</span>
            </Card>
          )}

          {/* TAB 1 CONTENT: COMMAND CENTER ADVOKAT (MOCK-J-AD-02A) */}
          {activeTab === 'command_center' && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Greeting & SIPP Reputation Summary */}
              <Card className="p-8 rounded-3xl bg-gradient-to-r from-card via-card to-emerald-950/40 border border-border shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
                          INFORMASI ADVOKAT &amp; RINGKASAN REPUTASI SIPP
                        </h1>
                        <p className="text-xs text-emerald-400 font-semibold">
                          Selamat datang, Adv. {session.userName || 'Dr. Mahendra Kusuma'}, S.H., M.H. &middot; NIA: 18293/PERADI/2015
                        </p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
                      Seluruh aktivitas sesi konsultasi dan penerbitan opini hukum Anda diawasi langsung oleh
                      <strong className="text-foreground"> Fair-Clock SLA Monitor</strong> demi transparansi hubungan advokat-klien.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <Card className="p-3.5 rounded-2xl bg-secondary/40 border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Status Verifikasi MA</p>
                      <span className="text-xs font-extrabold text-emerald-400 mt-1 inline-block">ACTIVE SIPP VERIFIED</span>
                    </Card>
                    <Card className="p-3.5 rounded-2xl bg-secondary/40 border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">SLA Respons E2EE</p>
                      <span className="text-xs font-extrabold text-foreground mt-1 inline-block font-mono">99.4% (&lt; 2 Menit)</span>
                    </Card>
                    <Card className="p-3.5 rounded-2xl bg-secondary/40 border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Perkara Selesai</p>
                      <span className="text-xs font-extrabold text-foreground mt-1 inline-block">318 Perkara</span>
                    </Card>
                    <Card className="p-3.5 rounded-2xl bg-secondary/40 border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Escrow Siap Cair</p>
                      <span className="text-xs font-extrabold text-emerald-400 mt-1 inline-block font-mono">Rp 14.850.000</span>
                    </Card>
                  </div>
                </div>
              </Card>

              {/* DAFTAR PERKARA HUKUM AKTIF & JADWAL KONSULTASI HARI INI (Table MOCK-J-AD-02A) */}
              <Card className="p-6 rounded-3xl bg-card/90 border border-border shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <span>DAFTAR PERKARA HUKUM AKTIF &amp; JADWAL KONSULTASI HARI INI</span>
                  </h2>
                  <span className="text-xs text-muted-foreground font-mono">SELECT ... FOR UPDATE Mutex Lock</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border bg-secondary/30">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/60 text-muted-foreground font-bold uppercase tracking-wider">
                        <th className="p-4">ID Perkara</th>
                        <th className="p-4">Nama Klien</th>
                        <th className="p-4">Layanan &amp; Tier</th>
                        <th className="p-4">Jadwal / Deadline</th>
                        <th className="p-4">Status Fair-Clock</th>
                        <th className="p-4 text-right">Aksi Langsung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-foreground font-medium">
                      <tr className="hover:bg-secondary/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-emerald-400">REQ-202607-001</td>
                        <td className="p-4 font-bold text-foreground">PT Mitra Jaya (Klien)</td>
                        <td className="p-4 text-muted-foreground">Tier 2 (E2EE 45m)</td>
                        <td className="p-4 font-mono">10:30 - 11:15 WIB</td>
                        <td className="p-4">
                          <Badge variant="outline" className="px-2.5 py-1 rounded-full bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                            READY (SLA OK)
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setActiveTab('e2ee_room')}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                          >
                            MASUK RUANG CHAT
                          </Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-400">REQ-202607-002</td>
                        <td className="p-4 font-bold text-foreground">Bpk. Hendra S.</td>
                        <td className="p-4 text-muted-foreground">Tier 3 (Drafting e-Meterai)</td>
                        <td className="p-4 font-mono">Deadline: 11 Juli 2026</td>
                        <td className="p-4">
                          <Badge variant="outline" className="px-2.5 py-1 rounded-full bg-blue-500/15 border-blue-500/30 text-blue-400 font-bold text-[11px]">
                            DRAFTING IN PROGRESS
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setActiveTab('deliverable')}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                          >
                            UNGGAH DELIVERABLE
                          </Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-secondary/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-red-400">REQ-202607-003</td>
                        <td className="p-4 font-bold text-foreground">Ibu Kartika</td>
                        <td className="p-4 text-muted-foreground">Tier 2 (E2EE 45m)</td>
                        <td className="p-4 font-mono">09 Juli 2026</td>
                        <td className="p-4">
                          <Badge variant="outline" className="px-2.5 py-1 rounded-full bg-red-500/15 border-red-500/30 text-red-400 font-bold text-[11px]">
                            ESCROW FROZEN (DISPUTE)
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Membuka Pusat Mediasi Sengketa (ADM-02)...')}
                            className="px-3.5 py-1.5 rounded-lg font-bold text-xs"
                          >
                            LIHAT MEDIASI
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* PENCAIRAN SALDO ESCROW STRIP (MOCK-J-AD-02A / AD-06 shortcut) */}
              <Card className="p-6 rounded-3xl bg-card/90 border border-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-extrabold text-foreground uppercase">PENCAIRAN SALDO ESCROW TERVERIFIKASI</h3>
                    <p className="text-xs text-muted-foreground">Transfer otomatis ke rekening Bank Mandiri terdaftar via BI-FAST.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    onClick={() => setActiveTab('wallet')}
                    className="px-5 py-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    TARIK SALDO ESCROW (Rp 14.850.000) VIA BI-FAST
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => alert('Mengunduh Laporan Audit Pajak PPh 21 dan Bukti Potong WORM...')}
                    className="px-4 py-5 rounded-xl font-bold text-xs gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Laporan PPh 21</span>
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2 CONTENT: RUANG KONSULTASI ADVOKAT E2EE (MOCK-J-AD-04) */}
          {activeTab === 'e2ee_room' && (
            <div className="space-y-8 animate-fade-in">
              <Card className="p-6 rounded-3xl bg-gradient-to-r from-card via-card to-blue-950/40 border border-border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight">
                      SESI KONSULTASI HUKUM AKTIF • PT MITRA JAYA
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Percakapan diamankan dengan enkripsi E2EE AES-GCM 256-Bit &amp; Hardware-bound Session Token.
                    </p>
                  </div>
                </div>

                {/* Fair-Clock SLA Monitor Display */}
                <div className="flex items-center gap-3 bg-secondary/40 p-3 rounded-2xl border border-border">
                  <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Sisa Waktu Sesi (Fair-Clock)</p>
                    <p className="text-lg font-mono font-extrabold text-foreground">{formatClock(clockSeconds)}</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={isClockPaused ? 'destructive' : 'outline'}
                    onClick={handleTogglePauseClock}
                    className="rounded-xl text-xs font-bold gap-1.5"
                  >
                    {isClockPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isClockPaused ? 'Lanjutkan Sesi' : 'Jeda Sesi (Fair-Clock)'}</span>
                  </Button>
                </div>
              </Card>

              {/* SLA Guardrails 3-Layer Alert Box (MOCK-J-AD-04 section 3) */}
              <Card className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-300">
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
              </Card>

              {/* Chat Box Area */}
              <Card className="p-6 rounded-3xl bg-card/90 border border-border shadow-2xl space-y-4">
                <div className="h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="font-mono text-emerald-400">[{msg.time}]</span>
                        <strong className="text-foreground">{msg.sender}:</strong>
                      </div>
                      <p className="text-sm text-foreground pl-14 bg-secondary/60 p-2.5 rounded-xl border border-border/50">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ketik analisis atau balasan hukum ber-enkripsi E2EE untuk Klien..."
                    className="flex-1 h-12 rounded-xl bg-secondary/40 border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-emerald-500"
                  />
                  <Button
                    type="submit"
                    className="px-6 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                  >
                    Kirim Pesan E2EE
                  </Button>
                </form>

                <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <Button
                    type="button"
                    onClick={() => setActiveTab('deliverable')}
                    className="px-5 py-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2 shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>BUAT DOKUMEN DELIVERABLE</span>
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Akhiri sesi konsultasi? Saldo Escrow akan diteruskan ke dompet Anda.')) {
                        setActiveTab('command_center');
                      }
                    }}
                    className="px-5 py-5 rounded-xl font-bold text-xs shadow-sm"
                  >
                    Akhiri Sesi Konsultasi
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3 CONTENT: PENGATURAN JADWAL & SLOT PRACTIK (MOCK-J-AD-03) */}
          {activeTab === 'schedule' && (
            <div className="space-y-8 animate-fade-in">
              <Card className="p-8 rounded-3xl bg-card/90 border border-border shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight">
                      ATUR JADWAL &amp; SLOT KONSULTASI ANDA
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tentukan hari dan jam operasional untuk konsultasi daring dan luring. Terkunci dengan <code className="text-emerald-400">SELECT ... FOR UPDATE</code>.
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
                      <Card key={dayKey} className="p-4 rounded-2xl bg-secondary/30 border border-border flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-foreground select-none">
                          <input
                            type="checkbox"
                            checked={slot.active}
                            onChange={(e) =>
                              setScheduleSlots((prev) => ({
                                ...prev,
                                [dayKey]: { ...prev[dayKey], active: e.target.checked }
                              }))
                            }
                            className="rounded border-border bg-secondary text-emerald-600 focus:ring-0 w-4 h-4"
                          />
                          <span>{dayName}</span>
                        </label>
                        <Input
                          type="text"
                          value={slot.hours}
                          onChange={(e) =>
                            setScheduleSlots((prev) => ({
                              ...prev,
                              [dayKey]: { ...prev[dayKey], hours: e.target.value }
                            }))
                          }
                          disabled={!slot.active}
                          className="w-48 px-4 h-10 rounded-xl bg-secondary/60 border-border text-xs font-mono text-emerald-400 disabled:opacity-40 focus-visible:ring-emerald-500"
                        />
                      </Card>
                    );
                  })}
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={() => alert('Jadwal berhasil disimpan dan dikunci dengan row-level mutex (SELECT ... FOR UPDATE).')}
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-all"
                >
                  SIMPAN JADWAL MUTEX
                </Button>
              </Card>
            </div>
          )}

          {/* TAB 4 CONTENT: PENERBITAN DELIVERABLE & E-METERAI (MOCK-J-AD-05) */}
          {activeTab === 'deliverable' && (
            <div className="space-y-8 animate-fade-in">
              <Card className="p-8 rounded-3xl bg-card/90 border border-border shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight">
                      PENERBITAN OPINI HUKUM &amp; E-METERAI PERURI
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Unggah dokumen opini hukum resmi atau kontrak ber-meterai elektronik Anda untuk diverifikasi oleh Klien.
                    </p>
                  </div>
                  <FileCheck className="w-8 h-8 text-blue-400" />
                </div>

                <Card className="p-6 rounded-2xl bg-secondary/30 border border-dashed border-border space-y-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">File Dokumen Siap Dibubuhkan:</p>
                    <p className="text-xs font-mono text-blue-400 mt-1">{deliverableFile} (2.4 MB)</p>
                    <div className="mt-3">
                      <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs text-foreground font-semibold transition-all inline-block">
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
                </Card>

                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    setDeliverablePublished(true);
                    alert('Dokumen berhasil diterbitkan dengan e-Meterai Peruri dan tercatat pada WORM Vault!');
                  }}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl transition-all gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>TERBITKAN DOKUMEN BER-EMETERAI</span>
                </Button>

                {deliverablePublished && (
                  <Card className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                    ✓ Dokumen deliverable telah diterbitkan dan dikirimkan ke dasbor Klien (`MOCK-J-CL-04`).
                  </Card>
                )}
              </Card>
            </div>
          )}

          {/* TAB 5 CONTENT: DOMPET ADVOKAT & PENCAIRAN HONOR (MOCK-J-AD-06) */}
          {activeTab === 'wallet' && (
            <div className="space-y-8 animate-fade-in">
              <Card className="p-8 rounded-3xl bg-card/90 border border-border shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight">
                      DOMPET ADVOKAT &amp; PENCAIRAN HONOR
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Kelola saldo honorarium dan lakukan penarikan dana langsung ke rekening bank terdaftar Anda.
                    </p>
                  </div>
                  <Wallet className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Saldo Tersedia (Siap Cair)</p>
                    <p className="text-2xl font-mono font-extrabold text-emerald-400">
                      Rp {availableBalance.toLocaleString('id-ID')}
                    </p>
                  </Card>
                  <Card className="p-6 rounded-2xl bg-secondary/40 border border-border space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Saldo Escrow HELD (Aktif)</p>
                    <p className="text-2xl font-mono font-extrabold text-blue-400">
                      Rp {escrowBalance.toLocaleString('id-ID')}
                    </p>
                  </Card>
                </div>

                <Card className="p-5 rounded-2xl bg-secondary/40 border border-border space-y-3">
                  <h3 className="text-xs font-bold text-foreground uppercase">Rekening Tujuan Penarikan BI-FAST</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-foreground">Bank Mandiri • Dr. Mahendra Kusuma</span>
                    <span className="font-mono text-emerald-400 font-bold">123-00-0998877-6</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    * Perhitungan potongan pajak PPh 21 tenaga ahli hukum (NPPN/Progressive) dihitung otomatis
                    dan diterbitkan bukti potong WORM instan saat pencairan.
                  </p>
                </Card>

                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    setPayoutSuccess(true);
                    setAvailableBalance(0);
                    alert('Dana Rp 14.850.000 berhasil dicairkan via BI-FAST ke Bank Mandiri Anda!');
                  }}
                  disabled={availableBalance === 0}
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-xl transition-all"
                >
                  {availableBalance === 0 ? 'SALDO TELAH DICAIRKAN' : 'CAIRKAN DANA KE BANK MANDIRI SEKARANG'}
                </Button>

                {payoutSuccess && (
                  <Card className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                    ✓ Transaksi penarikan sukses! Bukti potong pajak PPh 21 telah dicatat ke dalam WORM Immutable Vault.
                  </Card>
                )}
              </Card>
            </div>
          )}
        </div>
      )}
    </BaseLayout>
  );
};
