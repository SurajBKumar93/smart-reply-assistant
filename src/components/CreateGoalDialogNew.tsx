import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Goal } from '@/types';
import { IconPicker } from './IconPicker';

interface CreateGoalDialogProps {
  onCreate: (goal: Goal) => void;
  editGoal?: Goal;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateGoalDialogNew({ onCreate, editGoal, open: controlledOpen, onOpenChange }: CreateGoalDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🎯');

  useEffect(() => {
    if (editGoal) {
      setLabel(editGoal.label);
      setDescription(editGoal.description);
      setIcon(editGoal.icon);
    }
  }, [editGoal]);

  const handleCreate = () => {
    if (!label.trim()) return;

    const goal: Goal = {
      id: editGoal?.id ?? `custom-${Date.now()}`,
      label: label.trim(),
      description: description.trim() || `Achieve: ${label}`,
      icon,
      isFavorite: editGoal?.isFavorite,
    };

    onCreate(goal);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setLabel('');
    setDescription('');
    setIcon('🎯');
  };

  const isEditMode = !!editGoal;

  const dialogContent = (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Edit Goal' : 'Create Goal'}</DialogTitle>
        <DialogDescription>
          What do you want to achieve in this conversation?
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex items-start gap-4">
          <div className="space-y-2">
            <Label>Icon</Label>
            <IconPicker value={icon} onChange={setIcon} />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="label">Goal</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Close the deal, Ask for extension"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What outcome are you looking for?"
            rows={2}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="gradient" onClick={handleCreate} disabled={!label.trim()}>
          {isEditMode ? 'Save Changes' : 'Create Goal'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  if (controlledOpen !== undefined) {
    return <Dialog open={open} onOpenChange={setOpen}>{dialogContent}</Dialog>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full gap-2 justify-start text-muted-foreground">
          <Plus className="h-4 w-4" />
          Create goal
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
