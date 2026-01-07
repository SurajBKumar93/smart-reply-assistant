import { Role, Goal } from '@/types';
import { RoleSelector } from './RoleSelector';
import { GoalSelectorNew } from './GoalSelectorNew';
import { CreateRoleDialog } from './CreateRoleDialog';
import { CreateGoalDialogNew } from './CreateGoalDialogNew';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationHeaderProps {
  roles: Role[];
  goals: Goal[];
  selectedRole?: Role;
  selectedGoal?: Goal;
  onSelectRole: (role: Role) => void;
  onSelectGoal: (goal: Goal) => void;
  onCreateRole: (role: Role) => void;
  onCreateGoal: (goal: Goal) => void;
  onEditRole: (role: Role) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteRole: (roleId: string) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleRoleFavorite: (roleId: string) => void;
  onToggleGoalFavorite: (goalId: string) => void;
  onNewConversation: () => void;
  hasMessages: boolean;
  // Edit dialog props
  editingRole?: Role;
  roleDialogOpen: boolean;
  onRoleDialogChange: (open: boolean) => void;
  onUpdateRole: (role: Role) => void;
  editingGoal?: Goal;
  goalDialogOpen: boolean;
  onGoalDialogChange: (open: boolean) => void;
  onUpdateGoal: (goal: Goal) => void;
}

export function ConversationHeader({
  roles,
  goals,
  selectedRole,
  selectedGoal,
  onSelectRole,
  onSelectGoal,
  onCreateRole,
  onCreateGoal,
  onEditRole,
  onEditGoal,
  onDeleteRole,
  onDeleteGoal,
  onToggleRoleFavorite,
  onToggleGoalFavorite,
  onNewConversation,
  hasMessages,
  editingRole,
  roleDialogOpen,
  onRoleDialogChange,
  onUpdateRole,
  editingGoal,
  goalDialogOpen,
  onGoalDialogChange,
  onUpdateGoal,
}: ConversationHeaderProps) {
  return (
    <>
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
              <RoleSelector
                roles={roles}
                selectedRole={selectedRole}
                onSelect={onSelectRole}
                onCreateRole={onCreateRole}
                onEditRole={onEditRole}
                onDeleteRole={onDeleteRole}
                onToggleFavorite={onToggleRoleFavorite}
              />
              <GoalSelectorNew
                goals={goals}
                selectedGoal={selectedGoal}
                onSelect={onSelectGoal}
                onCreateGoal={onCreateGoal}
                onEditGoal={onEditGoal}
                onDeleteGoal={onDeleteGoal}
                onToggleFavorite={onToggleGoalFavorite}
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

      {/* Edit Role Dialog */}
      <CreateRoleDialog
        onCreate={onUpdateRole}
        editRole={editingRole}
        open={roleDialogOpen}
        onOpenChange={onRoleDialogChange}
      />

      {/* Edit Goal Dialog */}
      <CreateGoalDialogNew
        onCreate={onUpdateGoal}
        editGoal={editingGoal}
        open={goalDialogOpen}
        onOpenChange={onGoalDialogChange}
      />
    </>
  );
}
