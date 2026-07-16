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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-card w-full max-w-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Reservasi &amp; Checkout Escrow Mutex
              </h3>
              <p className="text-xs text-secondary">
                {tier.title} &middot; <span className="text-amber-400 font-bold">{tier.priceLabel}</span>
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

        {/* Modal Body */}
        <div className="py-6 space-y-6 overflow-y-auto flex-grow pr-1">
          {transaction ? (
            /* SUCCESS VIEW: TICKET & ESCROW HELD STATUS */
            <div className="space-y-6 animate-fade-in text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="badge badge-success">Dana Escrow HELD (Terkunci Mutex)</span>
                <h4 className="text-2xl font-bold text-white">Simulasi Pembayaran Berhasil!</h4>
                <p className="text-xs text-secondary max-w-md mx-auto">
                  Dana konsultasi sejumlah <strong className="text-white">{tier.priceLabel}</strong> telah dikunci oleh sistem menggunakan PostgreSQL Row-Lock Mutex dan baru akan dicairkan ke advokat setelah sesi konsultasi selesai.
                </p>
              </div>

              {/* Ticket Details Box */}
              <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-4 text-left space-y-3 max-w-lg mx-auto text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">ID Transaksi Escrow:</span>
                  <span className="text-amber-400 font-semibold">{transaction.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Advokat Terpilih:</span>
                  <span className="text-white">{transaction.advocateName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Status Mutex Lock:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" />
                    SELECT ... FOR UPDATE (VERIFIED)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">WORM Vault Trail Hash:</span>
                  <span className="text-blue-400 break-all text-[11px]">{transaction.wormAuditHash}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="btn btn-primary-gold w-full sm:w-auto"
                >
                  <span>Selesai &amp; Kembali ke Portal</span>
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM VIEW */
            <form onSubmit={handleCheckout} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Slot Selection Grid */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                  1. Pilih Jadwal &amp; Advokat Spesialis:
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        selectedSlotId === slot.id
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{slot.advocateName}</span>
                          <span className="flex items-center gap-0.5 text-xs text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {slot.advocateRating}
                          </span>
                        </div>
                        <p className="text-xs text-secondary">{slot.advocateTitle}</p>
                        <p className="text-[11px] text-blue-400 font-medium flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{slot.slotTimeLabel} &middot; {slot.specialty}</span>
                        </p>
                      </div>

                      <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0">
                        {selectedSlotId === slot.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Summary Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                  2. Ringkasan Fakta Permasalahan Hukum (Story of Facts):
                </label>
                <textarea
                  rows={3}
                  value={caseSummary}
                  onChange={(e) => setCaseSummary(e.target.value)}
                  placeholder="Contoh: Perusahaan mitra melanggar klausul pembayaran kontrak proyek konstruksi senilai Rp 800 Juta yang seharusnya jatuh tempo bulan lalu..."
                  className="w-full rounded-xl bg-[#0b0f19] border border-white/15 p-3.5 text-xs text-white placeholder:text-muted focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Security & ACID Row-Lock Assurance Box */}
              <div className="bg-[#111827] border border-white/10 rounded-xl p-4 space-y-2.5 text-xs text-secondary">
                <div className="flex items-center justify-between text-white font-semibold border-b border-white/5 pb-2">
                  <span>Rincian Pembayaran (Simulasi Bypass):</span>
                  <span className="text-amber-400 font-bold text-sm">{tier.priceLabel}</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Dana dikunci dengan <strong className="text-slate-200">ACID Mutex Lock (`status: HELD`)</strong>.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span>Audit trail langsung diinskripsikan ke <strong className="text-slate-200">WORM Immutable Vault</strong>.</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn btn-primary-gold py-3.5 shadow-lg text-base"
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
