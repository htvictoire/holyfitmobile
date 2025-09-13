import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Flame } from "lucide-react"

const workouts = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    duration: "20 min",
    calories: "250 cal",
    difficulty: "Intermediate",
    thumbnail: "/hiit-workout.png",
    instructor: "Sarah Johnson",
    participants: 1247,
  },
  {
    id: 2,
    title: "Strength Training",
    duration: "45 min",
    calories: "180 cal",
    difficulty: "Advanced",
    thumbnail: "/strength-training-diverse-group.png",
    instructor: "Mike Chen",
    participants: 892,
  },
]

export function TrendingWorkouts() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Trending Workouts</h2>
        <span className="text-sm text-primary">See all</span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {workouts.map((workout) => (
          <Card key={workout.id} className="min-w-[280px] overflow-hidden">
            <div className="relative">
              <img
                src={workout.thumbnail || "/placeholder.svg"}
                alt={workout.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary ml-1" />
                </div>
              </div>
              <Badge className="absolute top-2 right-2 bg-primary/90">
                <Flame className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm mb-1">{workout.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">by {workout.instructor}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workout.duration}
                  </span>
                  <span>{workout.calories}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {workout.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
