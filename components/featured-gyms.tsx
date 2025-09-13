import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"

const gyms = [
  {
    id: 1,
    name: "FitLife Gym",
    rating: 4.7,
    distance: "0.5 mi",
    image: "/modern-gym-interior.png",
    amenities: ["Pool", "Sauna", "Classes"],
    openUntil: "11 PM",
    memberPrice: "$89/month",
  },
  {
    id: 2,
    name: "Iron Paradise",
    rating: 4.9,
    distance: "1.1 mi",
    image: "/placeholder-zprc7.png",
    amenities: ["24/7", "Free Weights", "Personal Training"],
    openUntil: "24/7",
    memberPrice: "$129/month",
  },
]

export function FeaturedGyms() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Featured Gyms</h2>
        <span className="text-sm text-primary">View all</span>
      </div>
      <div className="space-y-3">
        {gyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden">
            <div className="flex">
              <img src={gym.image || "/placeholder.svg"} alt={gym.name} className="w-24 h-24 object-cover" />
              <CardContent className="flex-1 p-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm">{gym.name}</h3>
                  <span className="text-sm font-semibold text-primary">{gym.memberPrice}</span>
                </div>

                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{gym.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{gym.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Open until {gym.openUntil}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {gym.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
