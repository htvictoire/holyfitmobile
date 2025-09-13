import { Heart, MessageCircle, Share, MoreHorizontal, Play, Trophy, Target, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mockPosts = [
  {
    id: 1,
    user: { name: "Sarah Johnson", avatar: "/fitness-woman.png", role: "Personal Trainer", verified: true },
    content:
      "Just completed an amazing HIIT session with my client! 💪 The transformation journey continues... Who's ready for tomorrow's group class?",
    image: "/hiit-workout.png",
    likes: 247,
    comments: 34,
    timeAgo: "2h",
    type: "workout",
    workout: { name: "HIIT Cardio Blast", duration: "30 min", calories: 280 },
  },
  {
    id: 2,
    user: { name: "Mike Chen", avatar: "/fitness-man.png", role: "Fitness Enthusiast", verified: false },
    content:
      "6 months transformation! Thanks to my amazing coach @sarah_pt for the guidance 🔥 Never thought I could deadlift 315lbs!",
    image: "/deadlift-gym-photo.jpg",
    likes: 892,
    comments: 156,
    timeAgo: "4h",
    type: "transformation",
    achievement: "Personal Record",
  },
  {
    id: 3,
    user: { name: "Emma Davis", avatar: "/fitness-woman.png", role: "Yoga Instructor", verified: true },
    content:
      "Beautiful sunrise yoga session at the beach this morning 🧘‍♀️ Nothing beats starting the day with mindfulness and movement!",
    image: "/placeholder.svg?key=yoga-beach",
    likes: 156,
    comments: 28,
    timeAgo: "6h",
    type: "lifestyle",
    location: "Ocean Beach, SF",
  },
  {
    id: 4,
    user: { name: "FitLife Gym", avatar: "/placeholder.svg?key=gym-logo", role: "Fitness Center", verified: true },
    content:
      "New equipment just arrived! Come check out our upgraded strength training area 🏋️‍♀️ Free trial sessions available this week!",
    image: "/modern-gym-interior.png",
    likes: 234,
    comments: 67,
    timeAgo: "8h",
    type: "announcement",
    promotion: "Free Trial Week",
  },
  {
    id: 5,
    user: { name: "Jake Martinez", avatar: "/fitness-man.png", role: "Marathon Runner", verified: false },
    content:
      "Just finished my 20-mile training run for the upcoming marathon! 🏃‍♂️ The grind never stops. Who else is training for a race?",
    image: "/golden-gate-park-running.jpg",
    likes: 178,
    comments: 45,
    timeAgo: "12h",
    type: "training",
    distance: "20 miles",
    pace: "7:30/mile",
  },
  {
    id: 6,
    user: { name: "Lisa Park", avatar: "/fitness-woman.png", role: "Nutritionist", verified: true },
    content:
      "Meal prep Sunday! 🥗 Here's my go-to post-workout recovery bowl: quinoa, grilled chicken, roasted veggies, and avocado. Fuel your body right!",
    image: "/placeholder.svg?key=meal-prep",
    likes: 312,
    comments: 89,
    timeAgo: "1d",
    type: "nutrition",
    recipe: "Post-Workout Recovery Bowl",
  },
]

export function SocialFeed() {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Your Feed</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          See all
        </Button>
      </div>

      {mockPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {post.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm text-foreground">{post.user.name}</p>
                    {post.user.verified && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.user.role} • {post.timeAgo}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} className="text-muted-foreground" />
              </Button>
            </div>

            <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>

            {post.type === "workout" && post.workout && (
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary">
                  <Play className="w-3 h-3 mr-1" />
                  {post.workout.name}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.workout.duration}</span>
                <span className="text-xs text-muted-foreground">{post.workout.calories} cal</span>
              </div>
            )}

            {post.type === "transformation" && post.achievement && (
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-yellow-500/10 text-yellow-600">
                  <Trophy className="w-3 h-3 mr-1" />
                  {post.achievement}
                </Badge>
              </div>
            )}

            {post.type === "training" && post.distance && (
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-500/10 text-blue-600">
                  <Target className="w-3 h-3 mr-1" />
                  {post.distance}
                </Badge>
                <span className="text-xs text-muted-foreground">Pace: {post.pace}</span>
              </div>
            )}

            {post.type === "announcement" && post.promotion && (
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-500/10 text-green-600">
                  <Flame className="w-3 h-3 mr-1" />
                  {post.promotion}
                </Badge>
              </div>
            )}
          </div>

          <div className="aspect-[4/3] bg-muted">
            <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-full object-cover" />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Heart size={18} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={18} />
                  <span className="text-sm font-medium">{post.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors">
                <Share size={18} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
