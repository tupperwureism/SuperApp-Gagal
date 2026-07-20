export interface ChatMessage {
  id: string;
  sender: 'advocate' | 'client';
  author: string;
  time: string;
  security: string;
  content: string;
}

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    sender: 'advocate',
    author: 'Dr. Mahendra Kusuma, S.H., M.H.',
    time: '10:31',
    security: 'AES-256',
    content: 'Selamat pagi Pak Budi. Silakan sampaikan kronologi kasus pelanggaran kontrak yang dihadapi beserta bukti dokumen awal agar bisa kita bedah bersama.',
  },
  {
    id: 'msg-002',
    sender: 'client',
    author: 'Budi Santoso (Anda)',
    time: '10:32',
    security: '✓✓ Terenkripsi',
    content: 'Pagi Pak Dr. Mahendra. Pihak vendor melanggar pasal kesepakatan waktu pengiriman barang selama 45 hari kerja. Nilai kerugian kami mencapai Rp 850 juta. Apakah bisa langsung digugat wanprestasi?',
  },
];
