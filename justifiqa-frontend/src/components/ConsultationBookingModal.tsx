import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, Clock, Star, AlertCircle, Loader2, Database, Key } from 'lucide-react';
import type { ConsultationTier, ConsultationSlot, EscrowTransaction } from '../types/consultation';
import type { AuthSession } from '../types/auth';
import { MockConsultationService } from '../services/mockConsultationService';

interface ConsultationBookingModalProps {
  tier: ConsultationTier | null;
  session: AuthSession;
  onClose: () => void;
  onBookingSuccess?: (transaction: EscrowTransaction) => void;
}

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  tier,
  session,
  onClose,
  onBookingSuccess,
}) => {
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [caseSummary, setCaseSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<EscrowTransaction | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (tier) {
      const available = MockConsultationService.getAvailableSlots();
      setSlots(available);
      if (available.length > 0) {
        setSelectedSlotId(available[0].id);
      }
    }
  }, [tier]);

  if (!tier) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedSlotId && tier.id !== 'TIER_1_AI') {
      setErrorMsg('Silakan pilih jadwal slot konsultasi advokat terlebih dahulu.');
      return;
    }

    if (!caseSummary.trim()) {
      setErrorMsg('Silakan tuliskan ringkasan singkat permasalahan hukum Anda.');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await MockConsultationService.processDummyEscrowCheckout({
        tierId: tier.id,
        slotId: selectedSlotId,
        clientEmail: session.userEmail,
        clientName: session.userName,
        caseSummary,
      });

      setTransaction(result);
      if (onBookingSuccess) {
        onBookingSuccess(result);
      }
    } catch (err) {
      setErrorMsg('Gagal memproses transaksi simulasi Escrow. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 w-full max-w-3xl border-2 border-amber-500/60 shadow-[0_0_60px_rgba(0,0,0,0.95)] rounded-2xl my-auto max-h-[90vh] flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-slate-950/80 border-b border-white/15 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white tracking-tight">
                Reservasi &amp; Checkout Escrow Mutex
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-medium">
                {tier.title} &middot; <span className="text-amber-400 font-bold">{tier.priceLabel}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          {transaction ? (
            /* SUCCESS VIEW: TICKET & ESCROW HELD STATUS */
            <div className="space-y-6 animate-fade-in text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="badge badge-success font-bold px-3 py-1 text-xs">Dana Escrow HELD (Terkunci Mutex)</span>
                <h4 className="text-2xl font-extrabold text-white">Simulasi Pembayaran Berhasil!</h4>
                <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                  Dana konsultasi sejumlah <strong className="text-white">{tier.priceLabel}</strong> telah dikunci oleh sistem menggunakan PostgreSQL Row-Lock Mutex dan baru akan dicairkan ke advokat setelah sesi konsultasi selesai.
                </p>
              </div>

              {/* Ticket Details Box */}
              <div className="bg-slate-950 border border-white/15 rounded-xl p-5 text-left space-y-3.5 max-w-lg mx-auto text-xs font-mono shadow-inner">
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span className="text-slate-400">ID Transaksi Escrow:</span>
                  <span className="text-amber-400 font-bold">{transaction.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span className="text-slate-400">Advokat Terpilih:</span>
                  <span className="text-white font-bold">{transaction.advocateName}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2.5">
                  <span className="text-slate-400">Status Mutex Lock:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Key className="w-4 h-4" />
                    SELECT ... FOR UPDATE (VERIFIED)
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-400 shrink-0">WORM Vault Trail Hash:</span>
                  <span className="text-blue-400 break-all text-[11px] font-semibold">{transaction.wormAuditHash}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="btn btn-primary-gold w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-black"
                >
                  <span>Selesai &amp; Kembali ke Portal</span>
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM VIEW */
            <form onSubmit={handleCheckout} className="space-y-6">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center gap-2.5 text-xs sm:text-sm text-red-200 font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Slot Selection Grid */}
              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300 block">
                  1. Pilih Jadwal &amp; Advokat Spesialis:
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        selectedSlotId === slot.id
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400'
                          : 'bg-slate-800/80 border-white/15 text-slate-200 hover:border-white/30 hover:bg-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm sm:text-base text-white">{slot.advocateName}</span>
                          <span className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {slot.advocateRating}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">{slot.advocateTitle}</p>
                        <p className="text-xs text-blue-300 font-bold flex items-center gap-1.5 mt-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.slotTimeLabel} &middot; {slot.specialty}</span>
                        </p>
                      </div>

                      <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                        {selectedSlotId === slot.id && (
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Summary Input */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300 block">
                  2. Ringkasan Fakta Permasalahan Hukum (Story of Facts):
                </label>
                <textarea
                  rows={3}
                  value={caseSummary}
                  onChange={(e) => setCaseSummary(e.target.value)}
                  placeholder="Contoh: Perusahaan mitra melanggar klausul pembayaran kontrak proyek konstruksi senilai Rp 800 Juta yang seharusnya jatuh tempo bulan lalu..."
                  className="w-full rounded-xl bg-slate-950 border border-white/20 p-4 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none font-medium leading-relaxed"
                />
              </div>

              {/* Security & ACID Row-Lock Assurance Box */}
              <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-xl p-4.5 space-y-3 text-xs sm:text-sm text-slate-200 shadow-inner">
                <div className="flex items-center justify-between text-white font-bold border-b border-white/10 pb-2.5">
                  <span>Rincian Pembayaran (Simulasi Bypass):</span>
                  <span className="text-amber-400 font-extrabold text-base">{tier.priceLabel}</span>
                </div>
                {selectedSlot && (
                  <div className="flex items-center justify-between text-xs text-blue-300 font-semibold pb-1">
                    <span>Advokat Terpilih:</span>
                    <span className="text-white font-bold">{selectedSlot.advocateName}</span>
                  </div>
                )}
                <div className="space-y-2 text-xs text-slate-300 font-medium pt-1">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Dana dikunci dengan <strong className="text-white">ACID Mutex Lock (`status: HELD`)</strong>.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Audit trail langsung diinskripsikan ke <strong className="text-white">WORM Immutable Vault</strong>.</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn btn-primary-gold py-4 rounded-xl shadow-lg text-base font-extrabold text-black flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses Penguncian Escrow Mutex...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Bayar Rp {tier.price.toLocaleString('id-ID')} &amp; Kunci Jadwal (Dummy)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
