import { useEffect, useRef } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Message, Role, Goal } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageBubble } from '@/components/MessageBubble';
import { EmptyState } from '@/components/EmptyState';

interface ConversationAreaProps {
  messages: Message[];
  selectedRole: Role | null;
  selectedGoal: Goal | null;
  isGenerating: boolean;
  onClearConversation: () => void;
  onRegenerate: () => void;
}

export function ConversationArea({
  messages,
  selectedRole,
  selectedGoal,
  isGenerating,
  onClearConversation,
  onRegenerate,
}: ConversationAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const latestSuggestionId = messages
    .filter(m => m.type === 'suggested')
    .pop()?.id;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border px-4 flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-3">
          {selectedRole && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm">
              <span>{selectedRole.icon}</span>
              <span className="font-medium text-foreground">{selectedRole.name}</span>
            </div>
          )}
          {selectedGoal && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-sm">
              <span>{selectedGoal.icon}</span>
              <span className="font-medium text-foreground">{selectedGoal.label}</span>
            </div>
          )}
          {!selectedRole && !selectedGoal && (
            <span className="text-sm text-muted-foreground">Select a role and goal to start</span>
          )}
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearConversation}
            className="text-muted-foreground hover:text-foreground"
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            New
          </Button>
        )}
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-3xl mx-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLatestSuggestion={message.id === latestSuggestionId}
                onRegenerate={message.id === latestSuggestionId ? onRegenerate : undefined}
              />
            ))}
            {isGenerating && (
              <div className="flex justify-end">
                <div className="gradient-primary rounded-2xl rounded-br-md px-4 py-3 shadow-glow">
                  <div className="flex items-center gap-2 text-primary-foreground">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm">Crafting reply...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
