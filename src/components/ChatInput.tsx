import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'document';
}

interface ChatInputProps {
  onSend: (message: string, attachments?: Attachment[]) => void;
  isGenerating: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isGenerating,
  placeholder = "Paste the message you received...",
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
    setMessage('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map(file => {
      const isImage = file.type.startsWith('image/');
      const attachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        file,
        type: isImage ? 'image' : 'document',
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setAttachments(prev =>
            prev.map(a => a.id === attachment.id ? { ...a, preview: ev.target?.result as string } : a)
          );
        };
        reader.readAsDataURL(file);
      }

      return attachment;
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const hasContent = message.trim() || attachments.length > 0;

  return (
    <div className="border-t border-border bg-card p-3 md:p-4">
      <div className="max-w-3xl mx-auto">
        {/* Attachment previews */}
        {attachments.length > 0 && (
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
            {attachments.map((att) => (
              <div key={att.id} className="relative shrink-0 group">
                {att.type === 'image' ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted border border-border">
                    {att.preview ? (
                      <img src={att.preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted border border-border flex flex-col items-center justify-center gap-1 px-1">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[8px] text-muted-foreground truncate w-full text-center">
                      {att.file.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative flex items-end">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] md:min-h-[52px] max-h-[120px] md:max-h-[200px] resize-none pl-11 pr-12 rounded-2xl bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary/50 text-[16px] md:text-base"
            rows={1}
            enterKeyHint="send"
            autoComplete="off"
            autoCorrect="on"
          />
          {/* Attachment button inside input, left side */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="absolute left-1.5 bottom-1.5 h-8 w-8 hover:bg-primary/10 active:scale-90 transition-transform text-muted-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          {/* Send button inside input, right side */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSend}
            disabled={!hasContent || isGenerating}
            className="absolute right-1.5 bottom-1.5 h-8 w-8 hover:bg-primary/10 active:scale-90 transition-transform"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
