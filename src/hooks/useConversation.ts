import { useState, useCallback } from 'react';
import { Message, Persona, Goal } from '@/types';
import { toast } from 'sonner';

const generateMockReply = (
  messages: Message[],
  persona?: Persona,
  goal?: Goal
): string => {
  const lastReceived = messages.filter(m => m.type === 'received').pop();
  if (!lastReceived) return "I'm not sure what to reply to.";

  const toneMap = {
    formal: 'polite and professional',
    casual: 'relaxed and natural',
    friendly: 'warm and personable',
    professional: 'clear and businesslike',
  };

  const lengthMap = {
    concise: 'brief',
    moderate: 'balanced',
    detailed: 'thorough',
  };

  const tone = persona ? toneMap[persona.tone] : 'thoughtful';
  const length = persona ? lengthMap[persona.messageLength] : 'moderate';
  const goalText = goal ? ` to ${goal.description.toLowerCase()}` : '';

  // Mock smart replies based on context
  const mockReplies = [
    `Thank you for reaching out. I appreciate you taking the time to share this with me. I'd love to discuss this further at your convenience.`,
    `I understand your perspective on this. Let me think about the best way to move forward, and I'll get back to you with some concrete next steps.`,
    `That's a great point. I've been considering the same thing, and I believe we can find a solution that works for everyone.`,
    `I really appreciate your patience here. Let me look into this and provide you with a more detailed response soon.`,
    `Thanks for the update. I'm on board with this approach and look forward to seeing how things develop.`,
  ];

  return mockReplies[Math.floor(Math.random() * mockReplies.length)];
};

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>();
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);

  const addMessage = useCallback((content: string, type: 'received' | 'suggested') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const generateReply = useCallback(async () => {
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
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reply = generateMockReply(messages, selectedPersona, selectedGoal);
    addMessage(reply, 'suggested');
    
    setIsGenerating(false);
    toast.success('Reply generated! Click to copy.');
  }, [messages, selectedPersona, selectedGoal, addMessage]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    toast.info('Conversation cleared');
  }, []);

  return {
    messages,
    selectedPersona,
    selectedGoal,
    isGenerating,
    setSelectedPersona,
    setSelectedGoal,
    addMessage,
    generateReply,
    clearConversation,
  };
}
