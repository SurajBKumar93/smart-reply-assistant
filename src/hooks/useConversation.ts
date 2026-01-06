import { useState, useCallback } from 'react';
import { Message, Persona, Goal } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface GenerateReplyResponse {
  reply?: string;
  error?: string;
}

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>();
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRefineInput, setShowRefineInput] = useState(false);

  const callGenerateReplyAPI = async (
    allMessages: Message[],
    persona: Persona,
    goal: Goal,
    refinementInstruction?: string
  ): Promise<string> => {
    const { data, error } = await supabase.functions.invoke<GenerateReplyResponse>('generate-reply', {
      body: {
        messages: allMessages.map(m => ({ content: m.content, type: m.type })),
        persona: {
          name: persona.name,
          description: persona.description,
          tone: persona.tone,
          messageLength: persona.messageLength,
        },
        goal: {
          label: goal.label,
          description: goal.description,
        },
        refinementInstruction,
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate reply');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (!data?.reply) {
      throw new Error('No reply received');
    }

    return data.reply;
  };

  const addMessage = useCallback((content: string, type: 'received' | 'suggested') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const addMessageAndGenerateReply = useCallback(async (content: string) => {
    // Add the received message first
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'received',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Check if persona and goal are selected
    if (!selectedPersona) {
      toast.error('Select a persona first');
      return;
    }

    if (!selectedGoal) {
      toast.error('Set a goal first');
      return;
    }

    // Auto-generate reply using AI
    setIsGenerating(true);
    
    try {
      const allMessages = [...messages, newMessage];
      const reply = await callGenerateReplyAPI(allMessages, selectedPersona, selectedGoal);
      
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        type: 'suggested',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, replyMessage]);
      toast.success('Reply generated! Click to copy.');
    } catch (error) {
      console.error('Error generating reply:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate reply');
    } finally {
      setIsGenerating(false);
    }
  }, [messages, selectedPersona, selectedGoal]);

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
    
    try {
      const reply = await callGenerateReplyAPI(messages, selectedPersona, selectedGoal, refinementInstruction);
      
      if (refinementInstruction) {
        replaceLastSuggestion(reply);
        toast.success('Reply refined!');
      } else {
        addMessage(reply, 'suggested');
        toast.success('Reply generated! Click to copy.');
      }
    } catch (error) {
      console.error('Error generating reply:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate reply');
    } finally {
      setIsGenerating(false);
    }
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
    addMessageAndGenerateReply,
    generateReply,
    clearConversation,
    openRefineInput,
    closeRefineInput,
  };
}
