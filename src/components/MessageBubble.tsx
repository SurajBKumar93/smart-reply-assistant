import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isReceived = message.type === 'received';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex gap-2 animate-slide-up',
        isReceived ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={cn(
          'group relative max-w-[85%] rounded-2xl px-4 py-3',
          isReceived
            ? 'bg-muted text-foreground rounded-bl-md'
            : 'gradient-primary text-primary-foreground rounded-br-md shadow-glow'
        )}
      >
        {!isReceived && (
          <div className="absolute -top-2 -right-1">
            <Sparkles className="h-4 w-4 text-accent animate-pulse-soft" />
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {!isReceived && (
          <Button
            variant="ghost"
            size="iconSm"
            onClick={handleCopy}
            className="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background shadow-soft"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
