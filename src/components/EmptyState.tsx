import { MessageSquare, User, Target, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center animate-fade-in">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow mb-6">
          <MessageSquare className="h-8 w-8 text-primary-foreground" />
        </div>
        
        <h2 className="font-display text-2xl font-semibold mb-3">
          Write smarter replies
        </h2>
        <p className="text-muted-foreground mb-8">
          Paste a message you received, and get a thoughtful reply that fits your style and achieves your goal.
        </p>

        <div className="grid gap-4 text-left">
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
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
