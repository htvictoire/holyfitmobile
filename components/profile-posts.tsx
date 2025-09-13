import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"

const posts = [
  {
    id: 1,
    content: "Just crushed my personal best on deadlifts! 💪 315lbs x 5 reps. The grind never stops!",
    image: "/deadlift-gym-photo.jpg",
    likes: 47,
    comments: 12,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    content: "Beautiful morning run through Golden Gate Park. Nothing beats that endorphin rush! 🏃‍♂️",
    image: "/golden-gate-park-running.jpg",
    likes: 23,
    comments: 8,
    timeAgo: "1d ago",
  },
]

export function ProfilePosts() {
  return (
    <div className="px-4 py-3">
      <h2 className="text-lg font-semibold mb-3">My Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/fitness-user-avatar.png" alt="You" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">John Doe</p>
                    <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm mb-3">{post.content}</p>

              <img
                src={post.image || "/placeholder.svg"}
                alt="Post"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
