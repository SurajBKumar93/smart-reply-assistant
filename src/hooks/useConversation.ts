import { useState, useCallback } from 'react';
import { Message, Persona, Goal } from '@/types';
import { toast } from 'sonner';

const generateMockReply = (
  messages: Message[],
  persona?: Persona,
  goal?: Goal,
  refinementInstruction?: string
): string => {
  const lastReceived = messages.filter(m => m.type === 'received').pop();
  if (!lastReceived) return "I'm not sure what to reply to.";

  // Mock smart replies based on context and refinement
  const baseReplies = [
    `Thank you for reaching out. I appreciate you taking the time to share this with me. I'd love to discuss this further at your convenience.`,
    `I understand your perspective on this. Let me think about the best way to move forward, and I'll get back to you with some concrete next steps.`,
    `That's a great point. I've been considering the same thing, and I believe we can find a solution that works for everyone.`,
    `I really appreciate your patience here. Let me look into this and provide you with a more detailed response soon.`,
    `Thanks for the update. I'm on board with this approach and look forward to seeing how things develop.`,
  ];

  // Refined versions based on common instructions
  if (refinementInstruction) {
    const instruction = refinementInstruction.toLowerCase();
    
    if (instruction.includes('shorter') || instruction.includes('concise')) {
      return `Thanks for sharing. I'll review and get back to you soon.`;
    }
    if (instruction.includes('formal')) {
      return `Dear colleague, I acknowledge receipt of your message and appreciate you bringing this matter to my attention. I shall review the details carefully and respond with my considered thoughts at the earliest opportunity.`;
    }
    if (instruction.includes('friendly') || instruction.includes('casual')) {
      return `Hey! Thanks so much for this 😊 Really appreciate you thinking of me. Let me take a look and I'll circle back soon!`;
    }
    if (instruction.includes('urgent') || instruction.includes('urgency')) {
      return `Thanks for flagging this. I understand the time-sensitive nature of this matter. I'm prioritizing this now and will have a response to you within the hour.`;
    }
    if (instruction.includes('soft') || instruction.includes('gentle')) {
      return `I really appreciate you sharing this with me. I hear what you're saying, and I want to take some time to think about how we can move forward together.`;
    }
    if (instruction.includes('question')) {
      return `Thank you for bringing this up. I've given it some thought and I'm leaning towards moving forward. What are your thoughts on the timeline?`;
    }

    // Generic refined response
    return `I appreciate your message. Based on your feedback, I'd like to propose we ${refinementInstruction.toLowerCase()}. What do you think?`;
  }

  return baseReplies[Math.floor(Math.random() * baseReplies.length)];
};

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>();
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRefineInput, setShowRefineInput] = useState(false);

  const addMessage = useCallback((content: string, type: 'received' | 'suggested') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const replaceLastSuggestion = useCallback((content: string) => {
    setMessages(prev => {
      const lastSuggestionIndex = prev.map((m, i) => ({ m, i }))
        .filter(({ m }) => m.type === 'suggested')
        .pop()?.i;
      
      if (lastSuggestionIndex === undefined) return prev;
      
      const updated = [...prev];
      updated[lastSuggestionIndex] = {
        ...updated[lastSuggestionIndex],
        content,
        timestamp: new Date(),
      };
      return updated;
    });
  }, []);

  const generateReply = useCallback(async (refinementInstruction?: string) => {
    if (messages.length === 0) {
      toast.error('Paste a message first');
      return;
    }

    if (!selectedPersona) {
      toast.error('Select a persona first');
      return;
    }

    if (!selectedGoal) {
      toast.error('Set a goal first');
      return;
    }

    setIsGenerating(true);
    setShowRefineInput(false);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reply = generateMockReply(messages, selectedPersona, selectedGoal, refinementInstruction);
    
    if (refinementInstruction) {
      replaceLastSuggestion(reply);
      toast.success('Reply refined!');
    } else {
      addMessage(reply, 'suggested');
      toast.success('Reply generated! Click to copy.');
    }
    
    setIsGenerating(false);
  }, [messages, selectedPersona, selectedGoal, addMessage, replaceLastSuggestion]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setShowRefineInput(false);
    toast.info('Conversation cleared');
  }, []);

  const openRefineInput = useCallback(() => {
    setShowRefineInput(true);
  }, []);

  const closeRefineInput = useCallback(() => {
    setShowRefineInput(false);
  }, []);

  return {
    messages,
    selectedPersona,
    selectedGoal,
    isGenerating,
    showRefineInput,
    setSelectedPersona,
    setSelectedGoal,
    addMessage,
    generateReply,
    clearConversation,
    openRefineInput,
    closeRefineInput,
  };
}
