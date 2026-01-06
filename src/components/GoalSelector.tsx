import { Goal } from '@/types';
import { cn } from '@/lib/utils';
import { Target, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CreateGoalDialog } from './CreateGoalDialog';

interface GoalSelectorProps {
  goals: Goal[];
  selectedGoal?: Goal;
  onSelect: (goal: Goal) => void;
  onCreateGoal: (goal: Goal) => void;
}

export function GoalSelector({ goals, selectedGoal, onSelect, onCreateGoal }: GoalSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="warm" size="sm" className="gap-2">
          {selectedGoal ? (
            <>
              <span className="text-base">{selectedGoal.icon}</span>
              <span className="font-medium">{selectedGoal.label}</span>
            </>
          ) : (
            <>
              <Target className="h-4 w-4" />
              <span>Set Goal</span>
            </>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-2 max-h-80 overflow-y-auto">
        {goals.map((goal) => (
          <DropdownMenuItem
            key={goal.id}
            onClick={() => onSelect(goal)}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
              selectedGoal?.id === goal.id && 'bg-primary/10'
            )}
          >
            <span className="text-xl mt-0.5">{goal.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{goal.label}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {goal.description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateGoalDialog onCreate={onCreateGoal} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
