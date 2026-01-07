import { Role, Goal } from '@/types';

export const defaultRoles: Role[] = [
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Professional yet approachable for client communications',
    tone: 'professional',
    messageLength: 'moderate',
    icon: 'Briefcase',
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Respectful and clear for academic contexts',
    tone: 'formal',
    messageLength: 'concise',
    icon: 'GraduationCap',
  },
  {
    id: 'friend',
    name: 'Personal',
    description: 'Warm and casual for friends and family',
    tone: 'friendly',
    messageLength: 'moderate',
    icon: 'MessageCircle',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Clear, decisive leadership communication',
    tone: 'professional',
    messageLength: 'concise',
    icon: 'UserCog',
  },
];

// Keep for backward compatibility
export const defaultPersonas = defaultRoles;

export const defaultGoals: Goal[] = [
  {
    id: 'get-job',
    label: 'Get the job',
    description: 'Impress and secure the opportunity',
    icon: 'Target',
  },
  {
    id: 'book-call',
    label: 'Book a call',
    description: 'Schedule a meeting or discussion',
    icon: 'CalendarCheck',
  },
  {
    id: 'negotiate',
    label: 'Negotiate politely',
    description: 'Find middle ground respectfully',
    icon: 'Handshake',
  },
  {
    id: 'follow-up',
    label: 'Follow up',
    description: 'Re-engage after no reply',
    icon: 'Send',
  },
  {
    id: 'decline',
    label: 'Decline respectfully',
    description: 'Say no while preserving relationship',
    icon: 'HandHeart',
  },
  {
    id: 'de-escalate',
    label: 'De-escalate',
    description: 'Calm a tense situation',
    icon: 'Feather',
  },
  {
    id: 'clarify',
    label: 'Clarify',
    description: 'Get or provide clear information',
    icon: 'Lightbulb',
  },
  {
    id: 'build-rapport',
    label: 'Build rapport',
    description: 'Strengthen the relationship',
    icon: 'Heart',
  },
];
