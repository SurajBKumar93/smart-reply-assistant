import { useState } from 'react';
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

interface CreateGoalDialogProps {
  onCreate: (goal: Goal) => void;
}

const emojiOptions = ['🎯', '📅', '🤝', '📨', '🙏', '🕊️', '💡', '❤️', '✅', '🚀', '💰', '📞'];

export function CreateGoalDialog({ onCreate }: CreateGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🎯');

  const handleCreate = () => {
    if (!label.trim()) return;

    const newGoal: Goal = {
      id: `custom-${Date.now()}`,
      label: label.trim(),
      description: description.trim() || `Achieve: ${label}`,
      icon,
    };

    onCreate(newGoal);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setLabel('');
    setDescription('');
    setIcon('🎯');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full gap-2 justify-start text-muted-foreground">
          <Plus className="h-4 w-4" />
          Create goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
          <DialogDescription>
            What do you want to achieve in this conversation?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${
                    icon === emoji
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Goal</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Close the deal, Ask for extension"
            />
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
            Create Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
