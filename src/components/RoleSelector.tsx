import { useState } from 'react';
import { Role } from '@/types';
import { cn } from '@/lib/utils';
import { User, ChevronDown, Star, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CreateRoleDialog } from './CreateRoleDialog';

interface RoleSelectorProps {
  roles: Role[];
  selectedRole?: Role;
  onSelect: (role: Role) => void;
  onCreateRole: (role: Role) => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  onToggleFavorite: (roleId: string) => void;
}

export function RoleSelector({
  roles,
  selectedRole,
  onSelect,
  onCreateRole,
  onEditRole,
  onDeleteRole,
  onToggleFavorite,
}: RoleSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sort: favorites first, then alphabetically
  const sortedRoles = [...roles].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="warm" size="sm" className="gap-2">
          {selectedRole ? (
            <>
              <span className="text-base">{selectedRole.icon}</span>
              <span className="font-medium">{selectedRole.name}</span>
            </>
          ) : (
            <>
              <User className="h-4 w-4" />
              <span>Select Role</span>
            </>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2 max-h-80 overflow-y-auto">
        {sortedRoles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => onSelect(role)}
            onMouseEnter={() => setHoveredId(role.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors group',
              selectedRole?.id === role.id && 'bg-primary/10'
            )}
          >
            <span className="text-xl mt-0.5">{role.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium text-sm">{role.name}</p>
                {role.isFavorite && (
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {role.description}
              </p>
            </div>
            {hoveredId === role.id && (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(role.id);
                  }}
                >
                  <Star className={cn(
                    "h-3.5 w-3.5",
                    role.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )} />
                </Button>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditRole(role);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="h-7 w-7 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteRole(role.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <CreateRoleDialog onCreate={onCreateRole} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
