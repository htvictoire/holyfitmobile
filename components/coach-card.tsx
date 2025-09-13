"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle, Heart } from "lucide-react"
import { VerificationBadge, VerificationLevel } from "@/components/verification-badge"
import { useState } from "react"

interface Coach {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  distance: string
  price: string
  image: string
  verified: VerificationLevel
  available: boolean
  bio: string
  certifications: string[]
  gym: string
}

interface CoachCardProps {
  coach: Coach
}

export function CoachCard({ coach }: CoachCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="overflow-hidden bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
      <CardContent className="p-0">
        {/* Coach Image */}
        <div className="relative h-48">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
          {/* Availability indicator */}
          {coach.available && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-500 hover:bg-green-500">
                Available Now
              </Badge>
            </div>
          )}
          {/* Like button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>
        </div>

        {/* Coach Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg text-white">{coach.name}</h3>
              <VerificationBadge level={coach.verified} size="md" />
            </div>
            <span className="text-orange-400 font-bold">{coach.price}</span>
          </div>

          <p className="text-gray-300 text-sm mb-2">{coach.specialty}</p>
          <p className="text-gray-400 text-xs mb-3 line-clamp-2">{coach.bio}</p>

          {/* Stats */}
          <div className="flex items-center space-x-4 mb-3 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white">{coach.rating}</span>
              <span className="text-gray-400">({coach.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">{coach.distance}</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1 mb-4">
            {coach.certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {cert}
              </Badge>
            ))}
          </div>

          {/* Gym affiliation */}
          <p className="text-gray-400 text-xs mb-4">@ {coach.gym}</p>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Book Session
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent border-gray-600">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}