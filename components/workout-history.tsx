import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Flame } from "lucide-react"

const workouts = [
  {
    id: 1,
    name: "Upper Body Strength",
    date: "Today",
    duration: "45 min",
    calories: 320,
    type: "Strength",
  },
  {
    id: 2,
    name: "Morning Run",
    date: "Yesterday",
    duration: "30 min",
    calories: 280,
    type: "Cardio",
  },
  {
    id: 3,
    name: "HIIT Circuit",
    date: "2 days ago",
    duration: "25 min",
    calories: 350,
    type: "HIIT",
  },
]

export function WorkoutHistory() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recent Workouts</h2>
        <span className="text-sm text-primary">View all</span>
      </div>
      <div className="space-y-3">
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{workout.name}</h3>
                <Badge variant="secondary">{workout.type}</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{workout.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>{workout.calories} cal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
