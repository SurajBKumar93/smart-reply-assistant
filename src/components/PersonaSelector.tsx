import { Persona } from '@/types';
import { cn } from '@/lib/utils';
import { User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface PersonaSelectorProps {
  personas: Persona[];
  selectedPersona?: Persona;
  onSelect: (persona: Persona) => void;
}

export function PersonaSelector({ personas, selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="warm" size="sm" className="gap-2">
          {selectedPersona ? (
            <>
              <span className="text-base">{selectedPersona.icon}</span>
              <span className="font-medium">{selectedPersona.name}</span>
            </>
          ) : (
            <>
              <User className="h-4 w-4" />
              <span>Select Persona</span>
            </>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-2">
        {personas.map((persona) => (
          <DropdownMenuItem
            key={persona.id}
            onClick={() => onSelect(persona)}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
              selectedPersona?.id === persona.id && 'bg-primary/10'
            )}
          >
            <span className="text-xl mt-0.5">{persona.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{persona.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {persona.description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
