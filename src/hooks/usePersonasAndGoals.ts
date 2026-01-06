import { useState, useCallback } from 'react';
import { Persona, Goal } from '@/types';
import { defaultPersonas, defaultGoals } from '@/data/defaults';
import { toast } from 'sonner';

export function usePersonasAndGoals() {
  const [personas, setPersonas] = useState<Persona[]>(defaultPersonas);
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);

  const addPersona = useCallback((persona: Persona) => {
    setPersonas(prev => [...prev, persona]);
    toast.success(`Persona "${persona.name}" created!`);
  }, []);

  const addGoal = useCallback((goal: Goal) => {
    setGoals(prev => [...prev, goal]);
    toast.success(`Goal "${goal.label}" created!`);
  }, []);

  return {
    personas,
    goals,
    addPersona,
    addGoal,
  };
}
