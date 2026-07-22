export type CorporateEntityType = 'PT_ORDINARY' | 'PT_INDIVIDUAL_UMK' | 'CV';

export type CorporateIntakeDraft = {
  entityType: CorporateEntityType;
  businessName: string;
  domicile: string;
  kbli: string;
  founderName: string;
  ownership: string;
  boName: string;
  controlBasis: string;
};
export const INTAKE_STEPS = [
  'Jenis Entitas',
  'Nama & KBLI',
  'Pendiri & Saham',
  'Beneficial Owner',
  'Review & Escrow',
] as const;

export const CORPORATE_STAGES = [
  ['DRAFT', 'Draf'],
  ['IDENTITY_PENDING', 'Verifikasi identitas'],
  ['CDD_REVIEW', 'Review internal'],
  ['DOCUMENTS_PENDING', 'Kelengkapan dokumen'],
  ['NOTARY_REVIEW', 'Review notaris'],
  ['AHU_SUBMITTED', 'Diajukan ke AHU'],
  ['AHU_APPROVED', 'Disetujui AHU'],
  ['OSS_PENDING', 'Proses OSS'],
  ['NIB_ISSUED', 'NIB terbit'],
  ['COMPLETED', 'Selesai'],
] as const;

export const EMPTY_INTAKE_DRAFT: CorporateIntakeDraft = {
  entityType: 'PT_ORDINARY',
  businessName: '',
  domicile: '',
  kbli: '',
  founderName: '',
  ownership: '100',
  boName: '',
  controlBasis: 'OWNERSHIP',
};
