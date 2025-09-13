import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"

const requests = [
  {
    id: 1,
    coach: "Sarah Johnson",
    avatar: "/fitness-woman.png",
    specialty: "HIIT & Strength",
    rating: 4.9,
    message: "Hi! I'd love to help you reach your fitness goals. I have availability this week for a consultation.",
    timeAgo: "2h ago",
    price: "$45/session",
  },
  {
    id: 2,
    coach: "Mike Chen",
    avatar: "/fitness-man.png",
    specialty: "Powerlifting",
    rating: 4.8,
    message: "Saw your profile and your goals align perfectly with my training style. Let's chat!",
    timeAgo: "5h ago",
    price: "$60/session",
  },
]

export function CoachRequests() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Coach Requests</h2>
        <Badge variant="secondary">2 new</Badge>
      </div>
      <div className="space-y-3">
        {requests.map((request) => (
          <Card key={request.id} className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.coach} />
                  <AvatarFallback>
                    {request.coach
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm">{request.coach}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {request.timeAgo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-muted-foreground">{request.specialty}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{request.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-primary">{request.price}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{request.message}</p>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Accept
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Decline
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
