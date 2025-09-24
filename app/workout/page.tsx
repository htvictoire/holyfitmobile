"use client"

import { useState } from "react"
import { Search, Filter, Play, Clock, Zap, Heart, Bookmark, Users, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const workoutCategories = ["All", "HIIT", "Strength", "Cardio", "Yoga", "Pilates", "CrossFit"]

const workouts = [
  {
    id: 1,
    title: "Upper Body Strength Training",
    instructor: "Sarah Chen",
    avatar: "/api/placeholder/40/40",
    duration: "45 min",
    difficulty: "Intermediate",
    calories: "320-450 cal",
    category: "Strength",
    likes: 1247,
    views: 8432,
    thumbnail: "from-orange-500 to-red-600",
    description: "Build serious upper body strength with this comprehensive workout targeting chest, shoulders, back, and arms.",
    equipment: "Dumbbells, Bench",
    rating: 4.8,
    isBookmarked: false,
    isPopular: true
  },
  {
    id: 2,
    title: "Full Body HIIT Blast",
    instructor: "Mike Rodriguez",
    avatar: "/api/placeholder/40/40",
    duration: "30 min",
    difficulty: "Hard",
    calories: "400-550 cal",
    category: "HIIT",
    likes: 2156,
    views: 12890,
    thumbnail: "from-red-500 to-pink-600",
    description: "High-intensity interval training to burn calories and boost metabolism. Perfect for busy schedules.",
    equipment: "Bodyweight",
    rating: 4.9,
    isBookmarked: true,
    isNew: true
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    instructor: "Emma Davis",
    avatar: "/api/placeholder/40/40",
    duration: "20 min",
    difficulty: "Easy",
    calories: "80-120 cal",
    category: "Yoga",
    likes: 956,
    views: 5643,
    thumbnail: "from-green-500 to-teal-600",
    description: "Start your day with this gentle yoga flow designed to energize and center your mind.",
    equipment: "Yoga Mat",
    rating: 4.7,
    isBookmarked: false,
    isTrending: true
  },
  {
    id: 4,
    title: "Cardio Dance Party",
    instructor: "Lisa Martinez",
    avatar: "/api/placeholder/40/40",
    duration: "35 min",
    difficulty: "Easy",
    calories: "250-350 cal",
    category: "Cardio",
    likes: 1834,
    views: 9876,
    thumbnail: "from-purple-500 to-indigo-600",
    description: "Fun and energetic dance workout that doesn't feel like exercise. Great music and easy moves!",
    equipment: "None",
    rating: 4.6,
    isBookmarked: false,
    isPopular: false
  },
  {
    id: 5,
    title: "Core Crusher Challenge",
    instructor: "Jake Thompson",
    avatar: "/api/placeholder/40/40",
    duration: "15 min",
    difficulty: "Hard",
    calories: "150-200 cal",
    category: "Strength",
    likes: 1432,
    views: 7234,
    thumbnail: "from-yellow-500 to-orange-600",
    description: "Intense core workout to build strength and definition. Short but incredibly effective.",
    equipment: "Mat",
    rating: 4.8,
    isBookmarked: true,
    isNew: false
  },
  {
    id: 6,
    title: "CrossFit Fundamentals",
    instructor: "Alex Carter",
    avatar: "/api/placeholder/40/40",
    duration: "50 min",
    difficulty: "Hard",
    calories: "500-650 cal",
    category: "CrossFit",
    likes: 987,
    views: 4321,
    thumbnail: "from-gray-600 to-gray-800",
    description: "Learn the basics of CrossFit with proper form and technique. Build a strong foundation.",
    equipment: "Barbell, Dumbbells",
    rating: 4.9,
    isBookmarked: false,
    isNew: true
  }
]

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [bookmarkedWorkouts, setBookmarkedWorkouts] = useState(new Set([2, 5]))

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || workout.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleBookmark = (workoutId: number) => {
    const newBookmarked = new Set(bookmarkedWorkouts)
    if (newBookmarked.has(workoutId)) {
      newBookmarked.delete(workoutId)
    } else {
      newBookmarked.add(workoutId)
    }
    setBookmarkedWorkouts(newBookmarked)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500"
      case "Intermediate": return "bg-yellow-500"
      case "Hard": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <Header />

        {/* Header Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Workouts</h1>
              <p className="text-gray-400 text-sm">{filteredWorkouts.length} available</p>
            </div>
            <Button variant="ghost" size="sm" className="text-white">
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {workoutCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Workouts List */}
        <div className="flex-1 overflow-y-auto pb-24">
          {filteredWorkouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <Search className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No workouts found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-colors">
                  <CardContent className="p-0">
                    {/* Workout Thumbnail */}
                    <Link href={`/workout/${workout.id}`}>
                      <div className={`relative h-48 bg-gradient-to-br ${workout.thumbnail} cursor-pointer`}>
                        <div className="absolute inset-0 bg-black/20"></div>

                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 flex flex-col space-y-2">
                          {workout.isNew && (
                            <Badge className="bg-green-500 text-white text-xs">New</Badge>
                          )}
                          {workout.isPopular && (
                            <Badge className="bg-red-500 text-white text-xs">Popular</Badge>
                          )}
                          {workout.isTrending && (
                            <Badge className="bg-blue-500 text-white text-xs">Trending</Badge>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <Badge className={`${getDifficultyColor(workout.difficulty)} text-white font-semibold`}>
                            {workout.difficulty}
                          </Badge>
                        </div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                          <span className="text-white text-sm font-bold">{workout.duration}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Workout Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 mr-2">
                          <Link href={`/workout/${workout.id}`}>
                            <h3 className="font-bold text-lg text-white hover:text-orange-400 cursor-pointer transition-colors">
                              {workout.title}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2 mt-1 mb-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={workout.avatar} />
                              <AvatarFallback>{workout.instructor[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-300 text-sm">{workout.instructor}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(workout.id)}
                          className="text-gray-400 hover:text-orange-400"
                        >
                          <Bookmark className={`w-5 h-5 ${bookmarkedWorkouts.has(workout.id) ? "fill-orange-400 text-orange-400" : ""}`} />
                        </Button>
                      </div>

                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{workout.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-3 mb-3 text-center">
                        <div>
                          <div className="text-orange-400 font-bold text-sm">{workout.calories}</div>
                          <div className="text-gray-400 text-xs">Calories</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-bold text-sm">{workout.equipment}</div>
                          <div className="text-gray-400 text-xs">Equipment</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center text-yellow-400 font-bold text-sm">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {workout.rating}
                          </div>
                          <div className="text-gray-400 text-xs">Rating</div>
                        </div>
                        <div>
                          <div className="text-green-400 font-bold text-sm">{workout.views.toLocaleString()}</div>
                          <div className="text-gray-400 text-xs">Views</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{workout.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{workout.views.toLocaleString()}</span>
                          </div>
                        </div>
                        <Link href={`/workout/${workout.id}`}>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            Start Workout
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}