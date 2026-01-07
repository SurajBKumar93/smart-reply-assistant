import { useState, useCallback } from 'react';
import { Role, Goal } from '@/types';
import { defaultRoles, defaultGoals } from '@/data/defaults';
import { toast } from 'sonner';

export function useRolesAndGoals() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [editingRole, setEditingRole] = useState<Role | undefined>();
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>();
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);

  const addRole = useCallback((role: Role) => {
    setRoles(prev => [...prev, role]);
    toast.success(`Role "${role.name}" created!`);
  }, []);

  const updateRole = useCallback((role: Role) => {
    setRoles(prev => prev.map(r => r.id === role.id ? role : r));
    toast.success(`Role "${role.name}" updated!`);
    setEditingRole(undefined);
  }, []);

  const deleteRole = useCallback((roleId: string) => {
    setRoles(prev => {
      const role = prev.find(r => r.id === roleId);
      if (role) {
        toast.success(`Role "${role.name}" deleted!`);
      }
      return prev.filter(r => r.id !== roleId);
    });
  }, []);

  const toggleRoleFavorite = useCallback((roleId: string) => {
    setRoles(prev => prev.map(r => 
      r.id === roleId ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  }, []);

  const openEditRole = useCallback((role: Role) => {
    setEditingRole(role);
    setRoleDialogOpen(true);
  }, []);

  const addGoal = useCallback((goal: Goal) => {
    setGoals(prev => [...prev, goal]);
    toast.success(`Goal "${goal.label}" created!`);
  }, []);

  const updateGoal = useCallback((goal: Goal) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
    toast.success(`Goal "${goal.label}" updated!`);
    setEditingGoal(undefined);
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    setGoals(prev => {
      const goal = prev.find(g => g.id === goalId);
      if (goal) {
        toast.success(`Goal "${goal.label}" deleted!`);
      }
      return prev.filter(g => g.id !== goalId);
    });
  }, []);

  const toggleGoalFavorite = useCallback((goalId: string) => {
    setGoals(prev => prev.map(g => 
      g.id === goalId ? { ...g, isFavorite: !g.isFavorite } : g
    ));
  }, []);

  const openEditGoal = useCallback((goal: Goal) => {
    setEditingGoal(goal);
    setGoalDialogOpen(true);
  }, []);

  const handleRoleDialogChange = useCallback((open: boolean) => {
    setRoleDialogOpen(open);
    if (!open) setEditingRole(undefined);
  }, []);

  const handleGoalDialogChange = useCallback((open: boolean) => {
    setGoalDialogOpen(open);
    if (!open) setEditingGoal(undefined);
  }, []);

  return {
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
  };
}
