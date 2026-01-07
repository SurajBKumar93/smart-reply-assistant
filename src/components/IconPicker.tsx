import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconCategories = {
  'Roles': ['💼', '📚', '💬', '👔', '🎨', '💻', '🏠', '👨‍💻', '👩‍🏫', '👨‍⚕️', '👩‍🍳', '👨‍🔧', '🧑‍💼', '👩‍🎨', '🧑‍🔬'],
  'Goals': ['🎯', '📅', '🤝', '📨', '🙏', '🕊️', '💡', '❤️', '✅', '🚀', '💰', '📞', '⭐', '🏆', '🔥'],
  'Objects': ['📱', '💻', '📧', '📝', '📊', '📈', '🔔', '⏰', '🎁', '🔑', '💳', '📦', '🛒', '✈️', '🏢'],
  'Emotions': ['😊', '😎', '🤔', '💪', '👍', '🙌', '🎉', '✨', '🌟', '💫', '🔮', '💎', '🌈', '🦋', '🌻'],
  'Nature': ['🌲', '🌊', '☀️', '🌙', '⛰️', '🌸', '🍀', '🌺', '🦅', '🐝', '🌵', '🍁', '❄️', '🔥', '💧'],
};

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-16 h-16 text-3xl p-0"
        >
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <ScrollArea className="h-64">
          <div className="p-3 space-y-4">
            {Object.entries(iconCategories).map(([category, icons]) => (
              <div key={category}>
                <p className="text-xs font-medium text-muted-foreground mb-2">{category}</p>
                <div className="grid grid-cols-8 gap-1">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => {
                        onChange(icon);
                        setOpen(false);
                      }}
                      className={cn(
                        'w-8 h-8 rounded-md text-lg flex items-center justify-center transition-colors hover:bg-muted',
                        value === icon && 'bg-primary/20 ring-2 ring-primary'
                      )}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
