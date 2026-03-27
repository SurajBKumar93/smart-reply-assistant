import { useState, useCallback } from 'react';
import { ChatInput } from '@/components/ChatInput';
import { RefineInput } from '@/components/RefineInput';
import { RoleSidebar } from '@/components/RoleSidebar';
import { GoalSidebar } from '@/components/GoalSidebar';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ConversationArea } from '@/components/ConversationArea';
import { HistorySheet } from '@/components/HistorySheet';
import { CreateRoleDialog } from '@/components/CreateRoleDialog';
import { CreateGoalDialogNew } from '@/components/CreateGoalDialogNew';
import { useConversation } from '@/hooks/useConversation';
import { useRolesAndGoals } from '@/hooks/useRolesAndGoals';
import { useConversationHistory, SavedConversation } from '@/hooks/useConversationHistory';
import { useBackPress } from '@/hooks/useBackPress';
import { toast } from 'sonner';

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

  const { history, saveConversation, deleteConversation, clearHistory } = useConversationHistory();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>();

  // Save conversation whenever messages change (auto-save)
  const handleSendMessage = (content: string) => {
    addMessageAndGenerateReply(content);
  };

  // Auto-save after generating a reply
  const handleClearConversation = () => {
    // Save current conversation before clearing
    if (messages.length > 0) {
      saveConversation(messages, selectedRole, selectedGoal, currentConversationId);
    }
    clearConversation();
    setCurrentConversationId(undefined);
  };

  const handleLoadConversation = (conv: SavedConversation) => {
    // Save current first
    if (messages.length > 0) {
      saveConversation(messages, selectedRole, selectedGoal, currentConversationId);
    }
    // We can't directly set messages in useConversation, so we'll show a toast
    // For now, let's just show the preview
    toast.info(`Loading conversation is not yet fully supported. Preview: "${conv.preview}"`);
  };

  // Back press handling - close sheets/dialogs
  const handleBackPress = useCallback((): boolean => {
    if (historyOpen) {
      setHistoryOpen(false);
      return true;
    }
    if (roleDialogOpen) {
      handleRoleDialogChange(false);
      return true;
    }
    if (goalDialogOpen) {
      handleGoalDialogChange(false);
      return true;
    }
    if (showRefineInput) {
      closeRefineInput();
      return true;
    }
    // If there are messages, clear conversation on back
    if (messages.length > 0) {
      handleClearConversation();
      return true;
    }
    return false; // Let the system handle (minimize app)
  }, [historyOpen, roleDialogOpen, goalDialogOpen, showRefineInput, messages.length]);

  useBackPress(handleBackPress);

  const handleOpenRoleDialog = () => {
    handleRoleDialogChange(true);
  };

  const handleOpenGoalDialog = () => {
    handleGoalDialogChange(true);
  };

  // Auto-save when a new reply is generated
  // We detect this by checking if the last message is a suggestion
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.type === 'suggested' && messages.length >= 2) {
    // Debounced save would be better, but for simplicity:
    setTimeout(() => {
      saveConversation(messages, selectedRole, selectedGoal, currentConversationId);
      if (!currentConversationId) {
        setCurrentConversationId(Date.now().toString());
      }
    }, 500);
  }

  return (
    <div className="flex h-[100dvh] bg-background pt-safe">
      {/* Left Sidebar - Roles (hidden on mobile) */}
      <div className="hidden md:block">
        <RoleSidebar
          roles={roles}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onAddRole={handleOpenRoleDialog}
          onEditRole={openEditRole}
          onDeleteRole={deleteRole}
          onToggleFavorite={toggleRoleFavorite}
        />
      </div>

      {/* Center - Conversation */}
      <div className="flex-1 flex flex-col overflow-hidden pb-[76px] md:pb-0">
        <ConversationArea
          messages={messages}
          selectedRole={selectedRole}
          selectedGoal={selectedGoal}
          isGenerating={isGenerating}
          onClearConversation={handleClearConversation}
          onRegenerate={openRefineInput}
          historyButton={
            <HistorySheet
              history={history}
              onLoadConversation={handleLoadConversation}
              onDeleteConversation={deleteConversation}
              onClearHistory={clearHistory}
              open={historyOpen}
              onOpenChange={setHistoryOpen}
            />
          }
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

      {/* Right Sidebar - Goals (hidden on mobile) */}
      <div className="hidden md:block">
        <GoalSidebar
          goals={goals}
          selectedGoal={selectedGoal}
          onSelectGoal={setSelectedGoal}
          onAddGoal={handleOpenGoalDialog}
          onEditGoal={openEditGoal}
          onDeleteGoal={deleteGoal}
          onToggleFavorite={toggleGoalFavorite}
        />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        roles={roles}
        goals={goals}
        selectedRole={selectedRole}
        selectedGoal={selectedGoal}
        onSelectRole={setSelectedRole}
        onSelectGoal={setSelectedGoal}
        onAddRole={handleOpenRoleDialog}
        onAddGoal={handleOpenGoalDialog}
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
