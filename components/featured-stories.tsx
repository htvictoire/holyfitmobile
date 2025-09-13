import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Trophy } from "lucide-react"

const featuredStories = [
  {
    id: 1,
    user: {
      name: "Jessica Martinez",
      avatar: "/fitness-woman.png",
      age: 28,
      location: "San Francisco, CA",
    },
    title: "From Couch to Marathon Runner",
    description: "Lost 45 lbs and completed my first marathon in 18 months with the help of my amazing coach Sarah!",
    beforeImage: "/placeholder.svg?key=before1",
    afterImage: "/placeholder.svg?key=after1",
    stats: {
      weightLoss: "45 lbs",
      timeframe: "18 months",
      workoutsCompleted: 312,
    },
    likes: 1247,
    comments: 89,
    featured: true,
  },
  {
    id: 2,
    user: {
      name: "David Kim",
      avatar: "/fitness-man.png",
      age: 35,
      location: "Los Angeles, CA",
    },
    title: "Strength Training Transformation",
    description:
      "Gained 25 lbs of muscle and increased my deadlift from 135 to 405 lbs in 2 years of consistent training.",
    beforeImage: "/placeholder.svg?key=before2",
    afterImage: "/placeholder.svg?key=after2",
    stats: {
      muscleGain: "25 lbs",
      timeframe: "24 months",
      strengthIncrease: "270 lbs",
    },
    likes: 892,
    comments: 156,
    featured: true,
  },
]

export function FeaturedStories() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-semibold">Featured Transformations</h2>
      </div>
      <div className="space-y-4">
        {featuredStories.map((story) => (
          <Card key={story.id} className="overflow-hidden border-primary/20">
            <div className="relative">
              <div className="flex">
                <div className="w-1/2 relative">
                  <img
                    src={story.beforeImage || "/placeholder.svg"}
                    alt="Before"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-black/70 text-white">Before</Badge>
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <img src={story.afterImage || "/placeholder.svg"} alt="After" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-primary">After</Badge>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 left-2 bg-yellow-500">
                <Trophy className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                  <AvatarFallback>
                    {story.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">{story.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {story.user.age} • {story.user.location}
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-base mb-2">{story.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{story.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {story.stats.weightLoss && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{story.stats.weightLoss}</p>
                    <p className="text-xs text-muted-foreground">Weight Loss</p>
                  </div>
                )}
                {story.stats.muscleGain && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{story.stats.muscleGain}</p>
                    <p className="text-xs text-muted-foreground">Muscle Gain</p>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{story.stats.timeframe}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">
                    {story.stats.workoutsCompleted || story.stats.strengthIncrease}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {story.stats.workoutsCompleted ? "Workouts" : "PR Increase"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="w-4 h-4 mr-1" />
                    {story.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {story.comments}
                  </Button>
                </div>
                <Button size="sm">Read Full Story</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
