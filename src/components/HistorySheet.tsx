import { History, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SavedConversation } from '@/hooks/useConversationHistory';
import { formatDistanceToNow } from 'date-fns';

interface HistorySheetProps {
  history: SavedConversation[];
  onLoadConversation: (conversation: SavedConversation) => void;
  onDeleteConversation: (id: string) => void;
  onClearHistory: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistorySheet({
  history,
  onLoadConversation,
  onDeleteConversation,
  onClearHistory,
  open,
  onOpenChange,
}: HistorySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-8 md:h-9 px-2 md:px-3"
        >
          <History className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">History</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl md:h-full md:rounded-none md:max-w-sm">
        <SheetHeader className="pb-4 flex flex-row items-center justify-between">
          <SheetTitle>Conversation History</SheetTitle>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-destructive hover:text-destructive h-8 px-2 text-xs"
            >
              Clear All
            </Button>
          )}
        </SheetHeader>
        <ScrollArea className="h-[calc(70vh-80px)] md:h-[calc(100vh-120px)]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Your past chats will appear here</p>
            </div>
          ) : (
            <div className="space-y-2 p-1">
              {history.map((conv) => (
                <div
                  key={conv.id}
                  className="group flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer active:scale-[0.98]"
                  onClick={() => {
                    onLoadConversation(conv);
                    onOpenChange(false);
                  }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-sm">
                    {conv.roleIcon || '💬'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {conv.roleName && (
                        <span className="text-xs font-medium text-primary truncate">{conv.roleName}</span>
                      )}
                      {conv.goalLabel && (
                        <span className="text-xs text-muted-foreground truncate">• {conv.goalLabel}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{conv.preview}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })} · {conv.messages.length} messages
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
