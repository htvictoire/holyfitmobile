import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Heart, Zap, Target, Users, Bike } from "lucide-react"

const categories = [
  { icon: Dumbbell, name: "Strength", color: "text-orange-500", count: "124 coaches" },
  { icon: Heart, name: "Cardio", color: "text-red-500", count: "89 coaches" },
  { icon: Zap, name: "HIIT", color: "text-yellow-500", count: "67 coaches" },
  { icon: Target, name: "Yoga", color: "text-green-500", count: "156 coaches" },
  { icon: Users, name: "Group", color: "text-blue-500", count: "78 classes" },
  { icon: Bike, name: "Cycling", color: "text-purple-500", count: "45 coaches" },
]

export function FitnessCategories() {
  return (
    <div className="px-4 py-3">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
              <h3 className="font-medium text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
