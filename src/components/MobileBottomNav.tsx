import { useState } from 'react';
import { Plus, User, Target, icons } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Role, Goal } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = icons[iconName as keyof typeof icons];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <span className={className}>{iconName}</span>;
};

interface MobileBottomNavProps {
  roles: Role[];
  goals: Goal[];
  selectedRole: Role | null;
  selectedGoal: Goal | null;
  onSelectRole: (role: Role) => void;
  onSelectGoal: (goal: Goal) => void;
  onAddRole: () => void;
  onAddGoal: () => void;
}

export function MobileBottomNav({
  roles,
  goals,
  selectedRole,
  selectedGoal,
  onSelectRole,
  onSelectGoal,
  onAddRole,
  onAddGoal,
}: MobileBottomNavProps) {
  const [rolesOpen, setRolesOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);

  const sortedRoles = [...roles].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-safe z-50 md:hidden">
      <div className="flex items-center justify-between gap-2 py-2">
        {/* Roles Section */}
        <Sheet open={rolesOpen} onOpenChange={setRolesOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex-1 h-14 flex flex-col items-center justify-center gap-1 rounded-xl",
                selectedRole ? "bg-primary/10" : "bg-muted/50"
              )}
            >
              {selectedRole ? (
                <>
                  <DynamicIcon iconName={selectedRole.icon} className="w-5 h-5" />
                  <span className="text-[10px] font-medium truncate max-w-[60px]">
                    {selectedRole.name}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Role</span>
                </>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Select Role</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(60vh-80px)]">
              <div className="grid grid-cols-3 gap-3 p-1">
                {sortedRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      onSelectRole(role);
                      setRolesOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all min-h-[100px]",
                      "active:scale-95",
                      selectedRole?.id === role.id
                        ? "bg-primary/20 ring-2 ring-primary"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <DynamicIcon iconName={role.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-2">
                      {role.name}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    onAddRole();
                    setRolesOpen(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-dashed border-muted-foreground/30 min-h-[100px] active:scale-95"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Add New</span>
                </button>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Goals Section */}
        <Sheet open={goalsOpen} onOpenChange={setGoalsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex-1 h-14 flex flex-col items-center justify-center gap-1 rounded-xl",
                selectedGoal ? "bg-accent/10" : "bg-muted/50"
              )}
            >
              {selectedGoal ? (
                <>
                  <DynamicIcon iconName={selectedGoal.icon} className="w-5 h-5" />
                  <span className="text-[10px] font-medium truncate max-w-[60px]">
                    {selectedGoal.label}
                  </span>
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Goal</span>
                </>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Select Goal</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(60vh-80px)]">
              <div className="grid grid-cols-3 gap-3 p-1">
                {sortedGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      onSelectGoal(goal);
                      setGoalsOpen(false);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all min-h-[100px]",
                      "active:scale-95",
                      selectedGoal?.id === goal.id
                        ? "bg-accent/20 ring-2 ring-accent"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <DynamicIcon iconName={goal.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-2">
                      {goal.label}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    onAddGoal();
                    setGoalsOpen(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-dashed border-muted-foreground/30 min-h-[100px] active:scale-95"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">Add New</span>
                </button>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
