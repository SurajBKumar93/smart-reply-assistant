import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface MessageBubbleProps {
  message: Message;
  isLatestSuggestion?: boolean;
  onRegenerate?: () => void;
}

export function MessageBubble({ message, isLatestSuggestion, onRegenerate }: MessageBubbleProps) {
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
        'flex flex-col gap-2 animate-slide-up',
        isReceived ? 'items-start' : 'items-end'
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
          <div className="absolute -bottom-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="iconSm"
              onClick={handleCopy}
              className="bg-background/80 hover:bg-background shadow-soft"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Regenerate button for the latest suggestion */}
      {!isReceived && isLatestSuggestion && onRegenerate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
        >
          <RefreshCw className="h-3 w-3" />
          Not quite right? Refine it
        </Button>
      )}
    </div>
  );
}
