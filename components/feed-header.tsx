import { Bell, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FeedHeader() {
  return (
    <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/fitness-user-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold text-foreground">FitConnect</h1>
            <p className="text-xs text-muted-foreground">Your fitness journey</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <MessageCircle size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}
