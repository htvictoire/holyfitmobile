import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Heart, Dumbbell, Target, Users, Zap } from "lucide-react"

const categories = [
  { icon: TrendingUp, name: "Weight Loss", count: 234, color: "text-green-500", bgColor: "bg-green-500/10" },
  { icon: Dumbbell, name: "Muscle Gain", count: 156, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { icon: Heart, name: "Health Journey", count: 89, color: "text-red-500", bgColor: "bg-red-500/10" },
  { icon: Target, name: "Goal Achievement", count: 167, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Users, name: "Community Support", count: 78, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { icon: Zap, name: "Lifestyle Change", count: 123, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
]

export function StoriesCategories() {
  return (
    <div className="px-4 py-3">
      <h2 className="text-lg font-semibold mb-3">Browse by Category</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mb-3`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {category.count} stories
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
