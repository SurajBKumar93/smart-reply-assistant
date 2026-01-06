import { Persona, Goal } from '@/types';

export const defaultPersonas: Persona[] = [
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Professional yet approachable for client communications',
    tone: 'professional',
    messageLength: 'moderate',
    icon: '💼',
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Respectful and clear for academic contexts',
    tone: 'formal',
    messageLength: 'concise',
    icon: '📚',
  },
  {
    id: 'friend',
    name: 'Personal',
    description: 'Warm and casual for friends and family',
    tone: 'friendly',
    messageLength: 'moderate',
    icon: '💬',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Clear, decisive leadership communication',
    tone: 'professional',
    messageLength: 'concise',
    icon: '👔',
  },
];

export const defaultGoals: Goal[] = [
  {
    id: 'get-job',
    label: 'Get the job',
    description: 'Impress and secure the opportunity',
    icon: '🎯',
  },
  {
    id: 'book-call',
    label: 'Book a call',
    description: 'Schedule a meeting or discussion',
    icon: '📅',
  },
  {
    id: 'negotiate',
    label: 'Negotiate politely',
    description: 'Find middle ground respectfully',
    icon: '🤝',
  },
  {
    id: 'follow-up',
    label: 'Follow up',
    description: 'Re-engage after no reply',
    icon: '📨',
  },
  {
    id: 'decline',
    label: 'Decline respectfully',
    description: 'Say no while preserving relationship',
    icon: '🙏',
  },
  {
    id: 'de-escalate',
    label: 'De-escalate',
    description: 'Calm a tense situation',
    icon: '🕊️',
  },
  {
    id: 'clarify',
    label: 'Clarify',
    description: 'Get or provide clear information',
    icon: '💡',
  },
  {
    id: 'build-rapport',
    label: 'Build rapport',
    description: 'Strengthen the relationship',
    icon: '❤️',
  },
];
