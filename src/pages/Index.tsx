import { ConversationHeader } from '@/components/ConversationHeader';
import { ChatInput } from '@/components/ChatInput';
import { MessageBubble } from '@/components/MessageBubble';
import { EmptyState } from '@/components/EmptyState';
import { useConversation } from '@/hooks/useConversation';
import { defaultPersonas, defaultGoals } from '@/data/defaults';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';

const Index = () => {
  const {
    messages,
    selectedPersona,
    selectedGoal,
    isGenerating,
    setSelectedPersona,
    setSelectedGoal,
    addMessage,
    generateReply,
    clearConversation,
  } = useConversation();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    addMessage(content, 'received');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ConversationHeader
        personas={defaultPersonas}
        goals={defaultGoals}
        selectedPersona={selectedPersona}
        selectedGoal={selectedGoal}
        onSelectPersona={setSelectedPersona}
        onSelectGoal={setSelectedGoal}
        onNewConversation={clearConversation}
        hasMessages={messages.length > 0}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollArea className="flex-1" ref={scrollRef}>
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
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
      </main>

      <ChatInput
        onSend={handleSendMessage}
        onGenerateReply={generateReply}
        hasMessages={messages.length > 0}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default Index;
