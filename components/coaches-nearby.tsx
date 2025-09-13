import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle } from "lucide-react"

const coaches = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "HIIT & Strength",
    rating: 4.9,
    reviews: 127,
    distance: "0.3 mi",
    price: "$45/session",
    avatar: "/fitness-woman.png",
    verified: true,
    available: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "Powerlifting",
    rating: 4.8,
    reviews: 89,
    distance: "0.7 mi",
    price: "$60/session",
    avatar: "/fitness-man.png",
    verified: true,
    available: false,
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "Yoga & Pilates",
    rating: 5.0,
    reviews: 203,
    distance: "1.2 mi",
    price: "$40/session",
    avatar: "/fitness-woman.png",
    verified: true,
    available: true,
  },
]

export function CoachesNearby() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Coaches Nearby</h2>
        <span className="text-sm text-primary">View all</span>
      </div>
      <div className="space-y-3">
        {coaches.map((coach) => (
          <Card key={coach.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                    <AvatarFallback>
                      {coach.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {coach.available && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-sm">{coach.name}</h3>
                        {coach.verified && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{coach.specialty}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{coach.price}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{coach.rating}</span>
                      <span>({coach.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{coach.distance}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 h-8">
                      Book Session
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3 bg-transparent">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
