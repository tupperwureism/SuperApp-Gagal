import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatComposer } from './ChatComposer';
import { ChatTranscript } from './ChatTranscript';
import { ConsultationInfoPanel } from './ConsultationInfoPanel';
import { INITIAL_CHAT_MESSAGES, type ChatMessage } from './roomData';

interface EncryptedChatPanelProps {
  onPause: () => void;
  onOpenVault: () => void;
  onOpenQr: () => void;
}

export function EncryptedChatPanel({ onPause, onOpenVault, onOpenQr }: EncryptedChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    const content = draft.trim();
    if (!content) return;
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setMessages((current) => [...current, {
      id: `msg-${Date.now()}`,
      sender: 'client',
      author: 'Budi Santoso (Anda)',
      time,
      security: '✓✓ Terenkripsi E2EE',
      content,
    }]);
    setDraft('');
  };

  return (
    <section>
      <div className="consultation-privileged-banner"><LockKeyhole className="mr-2 inline size-4" />PRIVILEGED AND CONFIDENTIAL — PROTOKOL ZERO-KNOWLEDGE (AES-256-GCM)</div>
      <div className="consultation-content-grid">
        <Card className="consultation-card-shell">
          <CardHeader className="consultation-card-header"><CardTitle className="consultation-card-title">Ruang Percakapan Terenkripsi E2EE</CardTitle></CardHeader>
          <CardContent className="consultation-card-content"><ChatTranscript messages={messages} /></CardContent>
          <CardFooter className="consultation-card-footer"><ChatComposer value={draft} onChange={setDraft} onSend={sendMessage} /></CardFooter>
        </Card>
        <ConsultationInfoPanel onPause={onPause} onOpenVault={onOpenVault} onOpenQr={onOpenQr} />
      </div>
    </section>
  );
}
