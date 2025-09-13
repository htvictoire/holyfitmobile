"use client"

import { useState } from "react"
import { MapPin, Star, Clock, Phone, Navigation, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const nearbyGyms = [
  {
    id: 1,
    name: "FitLife Gym",
    address: "123 Main St, Downtown",
    distance: "0.3 miles",
    rating: 4.8,
    reviews: 234,
    image: "/gym-interior-modern.jpg",
    amenities: ["Pool", "Sauna", "Classes"],
    hours: "5 AM - 11 PM",
    phone: "(555) 123-4567",
    priceRange: "$$",
    featured: true,
    liked: false,
  },
  {
    id: 2,
    name: "Iron Paradise",
    address: "456 Oak Ave, Midtown",
    distance: "0.7 miles",
    rating: 4.6,
    reviews: 189,
    image: "/gym-weights-equipment.jpg",
    amenities: ["Free Weights", "Cardio", "Personal Training"],
    hours: "24/7",
    phone: "(555) 987-6543",
    priceRange: "$$$",
    featured: false,
    liked: true,
  },
  {
    id: 3,
    name: "Zen Fitness Studio",
    address: "789 Pine St, Uptown",
    distance: "1.2 miles",
    rating: 4.9,
    reviews: 156,
    image: "/yoga-studio-peaceful.jpg",
    amenities: ["Yoga", "Pilates", "Meditation"],
    hours: "6 AM - 10 PM",
    phone: "(555) 456-7890",
    priceRange: "$$",
    featured: false,
    liked: false,
  },
]

export function NearbyGymsCarousel() {
  const [gyms, setGyms] = useState(nearbyGyms)
  const [currentIndex, setCurrentIndex] = useState(0)

  const toggleLike = (gymId: number) => {
    setGyms(gyms.map((gym) => (gym.id === gymId ? { ...gym, liked: !gym.liked } : gym)))
  }

  const nextGym = () => {
    setCurrentIndex((prev) => (prev + 1) % gyms.length)
  }

  const prevGym = () => {
    setCurrentIndex((prev) => (prev - 1 + gyms.length) % gyms.length)
  }

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Nearby Gyms</h2>
        </div>
        <button className="text-orange-400 text-sm font-medium">Map View</button>
      </div>

      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: "none" }}>
          {gyms.map((gym, index) => (
            <div key={gym.id} className="flex-shrink-0 w-80">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Gym Image */}
                <div className="relative h-48">
                  <img src={gym.image || "/placeholder.svg"} alt={gym.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Featured Badge */}
                  {gym.featured && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(gym.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${gym.liked ? "text-red-500 fill-current" : "text-white"}`} />
                  </button>

                  {/* Distance Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    {gym.distance}
                  </div>
                </div>

                {/* Gym Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">{gym.name}</h3>
                      <p className="text-gray-400 text-sm">{gym.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{gym.rating}</span>
                      </div>
                      <p className="text-gray-400 text-xs">({gym.reviews} reviews)</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {gym.amenities.map((amenity, idx) => (
                      <span key={idx} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Hours and Contact */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{gym.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{gym.phone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {gyms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">{gyms.length}</div>
            <div className="text-xs text-gray-400">Nearby</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">4.8</div>
            <div className="text-xs text-gray-400">Avg Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">0.7</div>
            <div className="text-xs text-gray-400">Avg Distance</div>
          </div>
        </div>
      </div>
    </div>
  )
}
