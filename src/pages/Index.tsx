import { ChatInput } from '@/components/ChatInput';
import { RefineInput } from '@/components/RefineInput';
import { RoleSidebar } from '@/components/RoleSidebar';
import { GoalSidebar } from '@/components/GoalSidebar';
import { ConversationArea } from '@/components/ConversationArea';
import { CreateRoleDialog } from '@/components/CreateRoleDialog';
import { CreateGoalDialogNew } from '@/components/CreateGoalDialogNew';
import { useConversation } from '@/hooks/useConversation';
import { useRolesAndGoals } from '@/hooks/useRolesAndGoals';

const Index = () => {
  const {
    roles,
    goals,
    addRole,
    updateRole,
    deleteRole,
    toggleRoleFavorite,
    openEditRole,
    editingRole,
    roleDialogOpen,
    handleRoleDialogChange,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleGoalFavorite,
    openEditGoal,
    editingGoal,
    goalDialogOpen,
    handleGoalDialogChange,
  } = useRolesAndGoals();
  
  const {
    messages,
    selectedPersona: selectedRole,
    selectedGoal,
    isGenerating,
    showRefineInput,
    setSelectedPersona: setSelectedRole,
    setSelectedGoal,
    addMessageAndGenerateReply,
    generateReply,
    clearConversation,
    openRefineInput,
    closeRefineInput,
  } = useConversation();

  const handleSendMessage = (content: string) => {
    addMessageAndGenerateReply(content);
  };

  const handleOpenRoleDialog = () => {
    handleRoleDialogChange(true);
  };

  const handleOpenGoalDialog = () => {
    handleGoalDialogChange(true);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Roles */}
      <RoleSidebar
        roles={roles}
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        onAddRole={handleOpenRoleDialog}
        onEditRole={openEditRole}
        onDeleteRole={deleteRole}
        onToggleFavorite={toggleRoleFavorite}
      />

      {/* Center - Conversation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ConversationArea
          messages={messages}
          selectedRole={selectedRole}
          selectedGoal={selectedGoal}
          isGenerating={isGenerating}
          onClearConversation={clearConversation}
          onRegenerate={openRefineInput}
        />

        {showRefineInput ? (
          <RefineInput
            onSubmit={(instruction) => generateReply(instruction)}
            onCancel={closeRefineInput}
            isGenerating={isGenerating}
          />
        ) : (
          <ChatInput
            onSend={handleSendMessage}
            isGenerating={isGenerating}
          />
        )}
      </div>

      {/* Right Sidebar - Goals */}
      <GoalSidebar
        goals={goals}
        selectedGoal={selectedGoal}
        onSelectGoal={setSelectedGoal}
        onAddGoal={handleOpenGoalDialog}
        onEditGoal={openEditGoal}
        onDeleteGoal={deleteGoal}
        onToggleFavorite={toggleGoalFavorite}
      />

      {/* Dialogs */}
      <CreateRoleDialog
        open={roleDialogOpen}
        onOpenChange={handleRoleDialogChange}
        onCreate={editingRole ? updateRole : addRole}
        editRole={editingRole}
      />

      <CreateGoalDialogNew
        open={goalDialogOpen}
        onOpenChange={handleGoalDialogChange}
        onCreate={editingGoal ? updateGoal : addGoal}
        editGoal={editingGoal}
      />
    </div>
  );
};

export default Index;
