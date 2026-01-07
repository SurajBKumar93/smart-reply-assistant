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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/types';
import { IconPicker } from './IconPicker';

interface CreateRoleDialogProps {
  onCreate: (role: Role) => void;
  editRole?: Role;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateRoleDialog({ onCreate, editRole, open: controlledOpen, onOpenChange }: CreateRoleDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState<Role['tone']>('professional');
  const [messageLength, setMessageLength] = useState<Role['messageLength']>('moderate');
  const [icon, setIcon] = useState('💼');

  useEffect(() => {
    if (editRole) {
      setName(editRole.name);
      setDescription(editRole.description);
      setTone(editRole.tone);
      setMessageLength(editRole.messageLength);
      setIcon(editRole.icon);
    }
  }, [editRole]);

  const handleCreate = () => {
    if (!name.trim()) return;

    const role: Role = {
      id: editRole?.id ?? `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || `Custom ${name} role`,
      tone,
      messageLength,
      icon,
      isFavorite: editRole?.isFavorite,
    };

    onCreate(role);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setTone('professional');
    setMessageLength('moderate');
    setIcon('💼');
  };

  const isEditMode = !!editRole;

  const dialogContent = (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Edit Role' : 'Create Role'}</DialogTitle>
        <DialogDescription>
          Define how you want to communicate in this role.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex items-start gap-4">
          <div className="space-y-2">
            <Label>Icon</Label>
            <IconPicker value={icon} onChange={setIcon} />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Freelancer, Student, Parent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this communication style..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Role['tone'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Message Length</Label>
            <Select value={messageLength} onValueChange={(v) => setMessageLength(v as Role['messageLength'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="gradient" onClick={handleCreate} disabled={!name.trim()}>
          {isEditMode ? 'Save Changes' : 'Create Role'}
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
          Create role
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
