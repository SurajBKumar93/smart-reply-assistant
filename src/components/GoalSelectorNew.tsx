import { useState } from 'react';
import { Goal } from '@/types';
import { cn } from '@/lib/utils';
import { Target, ChevronDown, Star, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CreateGoalDialogNew } from './CreateGoalDialogNew';

interface GoalSelectorProps {
  goals: Goal[];
  selectedGoal?: Goal;
  onSelect: (goal: Goal) => void;
  onCreateGoal: (goal: Goal) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleFavorite: (goalId: string) => void;
}

export function GoalSelectorNew({
  goals,
  selectedGoal,
  onSelect,
  onCreateGoal,
  onEditGoal,
  onDeleteGoal,
  onToggleFavorite,
}: GoalSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sort: favorites first, then alphabetically
  const sortedGoals = [...goals].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.label.localeCompare(b.label);
  });

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
      <DropdownMenuContent align="start" className="w-72 p-2 max-h-80 overflow-y-auto">
        {sortedGoals.map((goal) => (
          <DropdownMenuItem
            key={goal.id}
            onClick={() => onSelect(goal)}
            onMouseEnter={() => setHoveredId(goal.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors group',
              selectedGoal?.id === goal.id && 'bg-primary/10'
            )}
          >
            <span className="text-xl mt-0.5">{goal.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium text-sm">{goal.label}</p>
                {goal.isFavorite && (
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {goal.description}
              </p>
            </div>
            {hoveredId === goal.id && (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(goal.id);
                  }}
                >
                  <Star className={cn(
                    "h-3.5 w-3.5",
                    goal.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )} />
                </Button>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditGoal(goal);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteGoal(goal.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateGoalDialogNew onCreate={onCreateGoal} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
