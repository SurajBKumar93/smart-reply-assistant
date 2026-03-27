import { useState, useCallback, useEffect } from 'react';
import { Message, Role, Goal } from '@/types';

export interface SavedConversation {
  id: string;
  messages: Message[];
  roleName?: string;
  roleIcon?: string;
  goalLabel?: string;
  goalIcon?: string;
  createdAt: string;
  updatedAt: string;
  preview: string;
}

const STORAGE_KEY = 'chat-navigator-history';

function loadHistory(): SavedConversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: SavedConversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useConversationHistory() {
  const [history, setHistory] = useState<SavedConversation[]>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const saveConversation = useCallback((
    messages: Message[],
    role?: Role | null,
    goal?: Goal | null,
    existingId?: string
  ) => {
    if (messages.length === 0) return;

    const firstMessage = messages[0]?.content || '';
    const preview = firstMessage.length > 80 ? firstMessage.slice(0, 80) + '...' : firstMessage;
    const now = new Date().toISOString();

    setHistory(prev => {
      if (existingId) {
        return prev.map(c => c.id === existingId ? {
          ...c,
          messages,
          roleName: role?.name,
          roleIcon: role?.icon,
          goalLabel: goal?.label,
          goalIcon: goal?.icon,
          updatedAt: now,
          preview,
        } : c);
      }

      const newConv: SavedConversation = {
        id: Date.now().toString(),
        messages,
        roleName: role?.name,
        roleIcon: role?.icon,
        goalLabel: goal?.label,
        goalIcon: goal?.icon,
        createdAt: now,
        updatedAt: now,
        preview,
      };
      return [newConv, ...prev];
    });
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setHistory(prev => prev.filter(c => c.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, saveConversation, deleteConversation, clearHistory };
}
