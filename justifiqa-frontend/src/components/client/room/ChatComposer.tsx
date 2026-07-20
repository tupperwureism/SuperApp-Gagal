import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatComposer({ value, onChange, onSend }: ChatComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSend();
  };

  return (
    <form className="consultation-chat-input-row" onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ketik pesan konsultasi Anda di sini..."
        className="consultation-chat-input"
      />
      <Button type="submit" className="consultation-action consultation-send-action">
        <Send className="size-4" />
        KIRIM PESAN
      </Button>
    </form>
  );
}
