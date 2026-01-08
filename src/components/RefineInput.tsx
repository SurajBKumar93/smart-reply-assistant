import { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface RefineInputProps {
  onSubmit: (instruction: string) => void;
  onCancel: () => void;
  isGenerating: boolean;
}

export function RefineInput({ onSubmit, onCancel, isGenerating }: RefineInputProps) {
  const [instruction, setInstruction] = useState('');

  const handleSubmit = () => {
    if (!instruction.trim()) return;
    onSubmit(instruction.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const suggestions = [
    'Make it shorter',
    'More formal',
    'Be friendlier',
    'Add urgency',
    'Softer tone',
  ];

  return (
    <div className="animate-slide-up border-t border-border bg-card/50 p-3 md:p-4">
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">How should I improve it?</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick suggestions - horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="soft"
              size="sm"
              onClick={() => onSubmit(suggestion)}
              disabled={isGenerating}
              className="text-xs shrink-0 h-9 px-3"
            >
              {suggestion}
            </Button>
          ))}
        </div>

        {/* Custom instruction input */}
        <div className="relative">
          <Textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g., 'Make it more casual' or 'Add a question at the end'"
            className="min-h-[48px] md:min-h-[52px] max-h-[100px] resize-none pr-12 rounded-xl bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary/50 text-sm md:text-base"
            rows={1}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSubmit}
            disabled={!instruction.trim() || isGenerating}
            className="absolute right-2 bottom-2 h-8 w-8 hover:bg-primary/10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="gradient"
          onClick={handleSubmit}
          disabled={!instruction.trim() || isGenerating}
          className="w-full gap-2 h-11 md:h-10"
        >
          <Sparkles className={cn("h-4 w-4", isGenerating && "animate-pulse-soft")} />
          {isGenerating ? 'Regenerating...' : 'Regenerate with instructions'}
        </Button>
      </div>
    </div>
  );
}
