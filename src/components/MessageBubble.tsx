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
          'group relative max-w-[90%] md:max-w-[85%] rounded-2xl px-3 md:px-4 py-2.5 md:py-3',
          isReceived
            ? 'bg-muted text-foreground rounded-bl-md'
            : 'gradient-primary text-primary-foreground rounded-br-md shadow-glow'
        )}
      >
        {!isReceived && (
          <div className="absolute -top-2 -right-1">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-accent animate-pulse-soft" />
          </div>
        )}
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {!isReceived && (
          <div className="absolute -bottom-1 -right-1 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 bg-background/80 hover:bg-background shadow-soft"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
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
          className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-9 px-3"
        >
          <RefreshCw className="h-3 w-3" />
          Not quite right? Refine it
        </Button>
      )}
    </div>
  );
}
