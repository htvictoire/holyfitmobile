import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Workouts", value: "247", change: "+12 this week" },
  { label: "Followers", value: "1.2K", change: "+45 this month" },
  { label: "Following", value: "892", change: "" },
  { label: "Streak", value: "28 days", change: "Personal best!" },
]

export function ProfileStats() {
  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              {stat.change && <div className="text-xs text-muted-foreground">{stat.change}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
