import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Flame, Award, Zap, Heart } from "lucide-react"

const achievements = [
  { icon: Trophy, name: "First Workout", color: "text-yellow-500", earned: true },
  { icon: Flame, name: "7-Day Streak", color: "text-orange-500", earned: true },
  { icon: Target, name: "Goal Crusher", color: "text-green-500", earned: true },
  { icon: Zap, name: "HIIT Master", color: "text-blue-500", earned: true },
  { icon: Heart, name: "Cardio King", color: "text-red-500", earned: false },
  { icon: Award, name: "Marathon", color: "text-purple-500", earned: false },
]

export function AchievementsBadges() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <Badge variant="secondary">4/6 earned</Badge>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`${achievement.earned ? "" : "opacity-50"}`}>
            <CardContent className="p-3 text-center">
              <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
              <p className="text-xs font-medium">{achievement.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
