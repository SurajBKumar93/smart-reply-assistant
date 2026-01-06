import { Persona, Goal } from '@/types';
import { PersonaSelector } from './PersonaSelector';
import { GoalSelector } from './GoalSelector';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationHeaderProps {
  personas: Persona[];
  goals: Goal[];
  selectedPersona?: Persona;
  selectedGoal?: Goal;
  onSelectPersona: (persona: Persona) => void;
  onSelectGoal: (goal: Goal) => void;
  onNewConversation: () => void;
  hasMessages: boolean;
}

export function ConversationHeader({
  personas,
  goals,
  selectedPersona,
  selectedGoal,
  onSelectPersona,
  onSelectGoal,
  onNewConversation,
  hasMessages,
}: ConversationHeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 glass sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-semibold text-lg leading-tight">ReplyWise</h1>
              <p className="text-xs text-muted-foreground">Write smarter replies</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <PersonaSelector
              personas={personas}
              selectedPersona={selectedPersona}
              onSelect={onSelectPersona}
            />
            <GoalSelector
              goals={goals}
              selectedGoal={selectedGoal}
              onSelect={onSelectGoal}
            />
            {hasMessages && (
              <Button
                variant="ghost"
                size="iconSm"
                onClick={onNewConversation}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
