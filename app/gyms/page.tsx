"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Clock, Star, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VerificationBadge } from "@/components/verification-badge"

const gyms = [
  {
    id: 1,
    name: "FitZone Premium",
    type: "Full Service Gym",
    rating: 4.8,
    reviews: 324,
    distance: "0.2 mi",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    verified: "gym" as const,
    hours: "24/7",
    members: "2.1k",
    amenities: ["Pool", "Sauna", "Classes", "Personal Training"],
    price: "$89/month"
  },
  {
    id: 2,
    name: "Iron Paradise",
    type: "Strength & Powerlifting",
    rating: 4.9,
    reviews: 156,
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    verified: "gym" as const,
    hours: "5AM - 11PM",
    members: "850",
    amenities: ["Free Weights", "Power Racks", "Specialty Equipment"],
    price: "$65/month"
  },
  {
    id: 3,
    name: "Zen Fitness Studio",
    type: "Yoga & Wellness",
    rating: 4.7,
    reviews: 89,
    distance: "1.1 mi",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    verified: "gym" as const,
    hours: "6AM - 10PM",
    members: "420",
    amenities: ["Yoga Classes", "Meditation", "Massage", "Juice Bar"],
    price: "$75/month"
  },
  {
    id: 4,
    name: "CrossFit Downtown",
    type: "CrossFit Box",
    rating: 4.6,
    reviews: 201,
    distance: "1.9 mi",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    verified: "gym" as const,
    hours: "5AM - 10PM",
    members: "320",
    amenities: ["WODs", "Olympic Lifting", "Functional Training"],
    price: "$150/month"
  }
]

export default function GymsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  const gymTypes = ["All", "Full Service", "Strength", "Yoga", "CrossFit", "Boutique"]

  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gym.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" ||
                       gym.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <Header />

        {/* Search and Filters */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Nearby Gyms</h2>
            <Button variant="ghost" size="sm">
              <MapPin className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search gyms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

          {/* Type Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {gymTypes.map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedType === type
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Gyms List */}
        <div className="px-4 pt-4 pb-24 space-y-4">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="overflow-hidden bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardContent className="p-0">
                {/* Gym Image */}
                <div className="relative h-40">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500/20 border border-green-500/30 text-green-300">
                      Open Now
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                    <span className="text-white text-sm font-bold">{gym.price}</span>
                  </div>
                </div>

                {/* Gym Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg text-white">{gym.name}</h3>
                      <VerificationBadge level={gym.verified} size="md" />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">{gym.type}</p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white">{gym.rating}</span>
                      <span className="text-gray-400">({gym.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{gym.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{gym.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{gym.members}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {gym.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {amenity}
                      </Badge>
                    ))}
                    {gym.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{gym.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                      View Details
                    </Button>
                    <Button variant="outline" className="bg-transparent border-gray-600">
                      Check-in
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}