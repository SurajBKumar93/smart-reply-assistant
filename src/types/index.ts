export interface Role {
  id: string;
  name: string;
  description: string;
  tone: 'formal' | 'casual' | 'friendly' | 'professional';
  messageLength: 'concise' | 'moderate' | 'detailed';
  icon: string;
  isFavorite?: boolean;
}

// Keep Persona as alias for backward compatibility
export type Persona = Role;

export interface Contact {
  id: string;
  name: string;
  relationship: string;
  notes?: string;
  communicationStyle?: string;
}

export interface Goal {
  id: string;
  label: string;
  description: string;
  icon: string;
  isFavorite?: boolean;
}

export interface Message {
  id: string;
  content: string;
  type: 'received' | 'suggested';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  personaId?: string;
  contactId?: string;
  goalId?: string;
  messages: Message[];
  createdAt: Date;
}
