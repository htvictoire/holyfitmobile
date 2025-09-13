import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Clock } from "lucide-react"

const recentStories = [
  {
    id: 1,
    user: { name: "Maria Rodriguez", avatar: "/fitness-woman.png" },
    title: "30-Day Yoga Challenge Complete!",
    preview: "Improved flexibility and found inner peace through daily practice...",
    image: "/placeholder.svg?key=yoga-transformation",
    timeframe: "30 days",
    category: "Flexibility",
    likes: 67,
    comments: 23,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    user: { name: "Chris Johnson", avatar: "/fitness-man.png" },
    title: "First Pull-up Achievement",
    preview: "After 6 months of training, I finally did my first unassisted pull-up!",
    image: "/placeholder.svg?key=pullup-achievement",
    timeframe: "6 months",
    category: "Strength",
    likes: 234,
    comments: 45,
    timeAgo: "5h ago",
  },
  {
    id: 3,
    user: { name: "Amanda Chen", avatar: "/fitness-woman.png" },
    title: "Postpartum Fitness Journey",
    preview: "Getting back in shape after pregnancy with the support of amazing coaches...",
    image: "/placeholder.svg?key=postpartum-fitness",
    timeframe: "8 months",
    category: "Recovery",
    likes: 189,
    comments: 67,
    timeAgo: "1d ago",
  },
]

export function RecentTransformations() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recent Stories</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View all
        </Button>
      </div>
      <div className="space-y-3">
        {recentStories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <div className="flex">
              <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-20 h-20 object-cover" />
              <CardContent className="flex-1 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                    <AvatarFallback className="text-xs">
                      {story.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{story.user.name}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock className="w-3 h-3" />
                    {story.timeAgo}
                  </div>
                </div>

                <h3 className="font-semibold text-sm mb-1">{story.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{story.preview}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {story.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{story.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {story.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {story.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
