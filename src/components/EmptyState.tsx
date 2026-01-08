import { MessageSquare, User, Target, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl gradient-primary shadow-glow mb-4 md:mb-6">
          <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
        </div>
        
        <h2 className="font-display text-xl md:text-2xl font-semibold mb-2 md:mb-3">
          Write smarter replies
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 px-2">
          Paste a message you received, and get a thoughtful reply that fits your style and achieves your goal.
        </p>

        <div className="grid gap-3 md:gap-4 text-left">
          <Step
            icon={<User className="h-4 w-4" />}
            title="Choose your persona"
            description="Pick who you are in this conversation"
          />
          <Step
            icon={<Target className="h-4 w-4" />}
            title="Set your goal"
            description="What do you want to achieve?"
          />
          <Step
            icon={<Sparkles className="h-4 w-4" />}
            title="Get smart replies"
            description="Paste messages and generate replies"
          />
        </div>
      </div>
    </div>
  );
}

function Step({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
      <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
