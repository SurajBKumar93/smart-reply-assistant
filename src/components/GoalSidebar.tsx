import { useState, useRef } from 'react';
import { Plus, Star, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Goal } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GoalSidebarProps {
  goals: Goal[];
  selectedGoal: Goal | null;
  onSelectGoal: (goal: Goal) => void;
  onAddGoal: () => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleFavorite: (goalId: string) => void;
}

export function GoalSidebar({
  goals,
  selectedGoal,
  onSelectGoal,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
  onToggleFavorite,
}: GoalSidebarProps) {
  const [longPressGoal, setLongPressGoal] = useState<Goal | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  const handleMouseDown = (goal: Goal) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressGoal(goal);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = (goal: Goal) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressGoal(goal);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <TooltipProvider>
      <div className="w-16 bg-card border-l border-border flex flex-col items-center py-4 gap-2">
        <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Goals</span>
        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-col items-center gap-2 px-2">
            {sortedGoals.map((goal) => (
              <Popover 
                key={goal.id} 
                open={longPressGoal?.id === goal.id} 
                onOpenChange={(open) => !open && setLongPressGoal(null)}
              >
                <PopoverTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          if (!longPressGoal) {
                            onSelectGoal(goal);
                          }
                        }}
                        onMouseDown={() => handleMouseDown(goal)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={() => handleTouchStart(goal)}
                        onTouchEnd={handleTouchEnd}
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all relative',
                          'hover:bg-muted hover:scale-105',
                          selectedGoal?.id === goal.id
                            ? 'bg-accent/20 ring-2 ring-accent shadow-glow'
                            : 'bg-secondary'
                        )}
                      >
                        {goal.icon}
                        {goal.isFavorite && (
                          <Star className="absolute -top-1 -right-1 w-3 h-3 fill-accent text-accent" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="font-medium">{goal.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent side="left" className="w-64 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{goal.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{goal.label}</h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onToggleFavorite(goal.id);
                          setLongPressGoal(null);
                        }}
                        className="flex-1"
                      >
                        <Star className={cn('w-4 h-4 mr-1', goal.isFavorite && 'fill-accent text-accent')} />
                        {goal.isFavorite ? 'Unfavorite' : 'Favorite'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onEditGoal(goal);
                          setLongPressGoal(null);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onDeleteGoal(goal.id);
                          setLongPressGoal(null);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ScrollArea>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddGoal}
              className="w-12 h-12 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-accent hover:bg-accent/10"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Add Goal</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
