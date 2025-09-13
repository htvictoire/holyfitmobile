"use client"

import { useState } from "react"
import { Search, Filter, MapPin } from "lucide-react"
import { HeaderMenu } from "@/components/header-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CoachCard } from "@/components/coach-card"

const coaches = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "HIIT & Strength Training",
    rating: 4.9,
    reviews: 127,
    distance: "0.3 mi",
    price: "$45/session",
    image: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=400&h=400&fit=crop&crop=face",
    verified: "coach" as const,
    available: true,
    bio: "Certified personal trainer with 8+ years experience. Specializing in strength training and HIIT workouts.",
    certifications: ["NASM-CPT", "HIIT Specialist"],
    gym: "FitZone Premium"
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "Powerlifting & Bodybuilding",
    rating: 4.8,
    reviews: 89,
    distance: "0.7 mi",
    price: "$60/session",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
    verified: "gym-coach" as const,
    available: false,
    bio: "Competition powerlifter and certified trainer. Helping clients build strength and muscle mass.",
    certifications: ["CSCS", "Powerlifting Coach"],
    gym: "Iron Paradise Gym"
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "Yoga & Mindfulness",
    rating: 5.0,
    reviews: 203,
    distance: "1.2 mi",
    price: "$40/session",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&crop=face",
    verified: "coach" as const,
    available: true,
    bio: "200hr RYT certified yoga instructor. Combining traditional yoga with modern mindfulness practices.",
    certifications: ["RYT-200", "Mindfulness Coach"],
    gym: "Zen Fitness Studio"
  },
  {
    id: 4,
    name: "James Rodriguez",
    specialty: "CrossFit & Functional",
    rating: 4.7,
    reviews: 156,
    distance: "2.1 mi",
    price: "$55/session",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&h=400&fit=crop&crop=face",
    verified: "gym-coach" as const,
    available: true,
    bio: "Level 2 CrossFit trainer with focus on functional movement and Olympic lifting.",
    certifications: ["CF-L2", "Olympic Lifting"],
    gym: "CrossFit Downtown"
  }
]

export default function CoachesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")

  const specialties = ["All", "HIIT", "Strength", "Yoga", "CrossFit", "Powerlifting"]

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coach.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All" ||
                            coach.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <HeaderMenu title="Find Coaches" />

        {/* Search and Filters */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Nearby Coaches</h2>
            <Button variant="ghost" size="sm">
              <MapPin className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search coaches or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Specialty Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <Badge
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedSpecialty === specialty
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Coaches List */}
        <div className="px-4 pt-4 pb-24 space-y-4">
          {filteredCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}

          {filteredCoaches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">No coaches found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}