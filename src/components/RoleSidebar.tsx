import { useState, useRef } from 'react';
import { Plus, Star, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Role } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RoleSidebarProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
  onAddRole: () => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  onToggleFavorite: (roleId: string) => void;
}

export function RoleSidebar({
  roles,
  selectedRole,
  onSelectRole,
  onAddRole,
  onEditRole,
  onDeleteRole,
  onToggleFavorite,
}: RoleSidebarProps) {
  const [longPressRole, setLongPressRole] = useState<Role | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const sortedRoles = [...roles].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  const handleMouseDown = (role: Role) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressRole(role);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = (role: Role) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressRole(role);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <TooltipProvider>
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
        <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Roles</span>
        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-col items-center gap-2 px-2">
            {sortedRoles.map((role) => (
              <Popover 
                key={role.id} 
                open={longPressRole?.id === role.id} 
                onOpenChange={(open) => !open && setLongPressRole(null)}
              >
                <PopoverTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          if (!longPressRole) {
                            onSelectRole(role);
                          }
                        }}
                        onMouseDown={() => handleMouseDown(role)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={() => handleTouchStart(role)}
                        onTouchEnd={handleTouchEnd}
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all relative',
                          'hover:bg-muted hover:scale-105',
                          selectedRole?.id === role.id
                            ? 'bg-primary/20 ring-2 ring-primary shadow-glow'
                            : 'bg-secondary'
                        )}
                      >
                        {role.icon}
                        {role.isFavorite && (
                          <Star className="absolute -top-1 -right-1 w-3 h-3 fill-accent text-accent" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-medium">{role.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-64 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{role.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{role.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{role.tone} • {role.messageLength}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onToggleFavorite(role.id);
                          setLongPressRole(null);
                        }}
                        className="flex-1"
                      >
                        <Star className={cn('w-4 h-4 mr-1', role.isFavorite && 'fill-accent text-accent')} />
                        {role.isFavorite ? 'Unfavorite' : 'Favorite'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onEditRole(role);
                          setLongPressRole(null);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onDeleteRole(role.id);
                          setLongPressRole(null);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ScrollArea>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddRole}
              className="w-12 h-12 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Add Role</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
