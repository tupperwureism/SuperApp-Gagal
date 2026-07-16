export type ConsultationTierId = 'TIER_1_AI' | 'TIER_2_ADVOCATE' | 'TIER_3_EMERGENCY';

export type EscrowStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'REFUNDED';

export interface ConsultationTier {
  id: ConsultationTierId;
  title: string;
  badgeText: string;
  price: number;
  priceLabel: string;
  description: string;
  features: string[];
  recommendedFor: string;
  isEscrowRequired: boolean;
  highlightColor: 'blue' | 'gold' | 'red';
}

export interface ConsultationSlot {
  id: string;
  advocateId: string;
  advocateName: string;
  advocateTitle: string;
  advocateRating: number;
  specialty: string;
  slotTimeLabel: string;
  isBooked: boolean;
}

export interface EscrowTransaction {
  id: string;
  slotId: string;
  tierId: ConsultationTierId;
  clientEmail: string;
  advocateName: string;
  amount: number;
  status: EscrowStatus;
  createdAt: string;
  mutexLockId: string;
  wormAuditHash: string;
}

export interface BookingRequest {
  tierId: ConsultationTierId;
  slotId?: string;
  clientEmail: string;
  clientName: string;
  caseSummary: string;
}
