import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const chats = [
  {
    id: 1,
    name: "Emma Davis",
    avatar: "/fitness-woman.png",
    lastMessage: "Great workout today! Same time tomorrow?",
    timeAgo: "5m ago",
    unread: 2,
    online: true,
    type: "coach",
  },
  {
    id: 2,
    name: "Fitness Buddies",
    avatar: "/group-chat-icon.png",
    lastMessage: "Jake: Who's up for a morning run?",
    timeAgo: "1h ago",
    unread: 0,
    online: false,
    type: "group",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    avatar: "/fitness-man.png",
    lastMessage: "Thanks for the workout tips! 💪",
    timeAgo: "3h ago",
    unread: 0,
    online: true,
    type: "user",
  },
  {
    id: 4,
    name: "Lisa Park",
    avatar: "/fitness-woman.png",
    lastMessage: "Can we reschedule tomorrow's session?",
    timeAgo: "1d ago",
    unread: 1,
    online: false,
    type: "coach",
  },
]

export function ActiveChats() {
  return (
    <div className="px-4 py-3">
      <h2 className="text-lg font-semibold mb-3">Recent Chats</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <Card key={chat.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                    <AvatarFallback>
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                      {chat.type === "coach" && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          Coach
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{chat.timeAgo}</span>
                      {chat.unread > 0 && (
                        <Badge className="w-5 h-5 text-xs flex items-center justify-center p-0">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
