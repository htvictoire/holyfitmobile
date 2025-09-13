"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Clock, TrendingUp, User, Dumbbell, MapPin, BookOpen, Settings, Users, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const sampleData = {
  recentSearches: [
    "HIIT workouts",
    "Sarah Johnson",
    "Iron Paradise Gym",
    "protein recipes"
  ],
  trendingSearches: [
    "30-day challenge",
    "yoga for beginners",
    "meal prep",
    "home workouts",
    "strength training"
  ],
  workouts: [
    { id: 1, name: "HIIT Cardio Blast", instructor: "Mike Chen", duration: "20 min", difficulty: "Hard" },
    { id: 2, name: "Morning Yoga Flow", instructor: "Emma Davis", duration: "30 min", difficulty: "Easy" },
    { id: 3, name: "Upper Body Strength", instructor: "Sarah Johnson", duration: "45 min", difficulty: "Medium" }
  ],
  coaches: [
    { id: 1, name: "Sarah Johnson", specialty: "HIIT & Strength", rating: 4.9, image: "/api/placeholder/40/40" },
    { id: 2, name: "Mike Chen", specialty: "Powerlifting", rating: 4.8, image: "/api/placeholder/40/40" },
    { id: 3, name: "Emma Davis", specialty: "Yoga & Wellness", rating: 5.0, image: "/api/placeholder/40/40" }
  ],
  gyms: [
    { id: 1, name: "FitZone Premium", type: "Full Service", distance: "0.2 mi", rating: 4.8 },
    { id: 2, name: "Iron Paradise", type: "Strength", distance: "0.8 mi", rating: 4.9 },
    { id: 3, name: "Zen Fitness Studio", type: "Yoga", distance: "1.1 mi", rating: 4.7 }
  ],
  content: [
    { id: 1, type: "article", title: "10 Best Pre-Workout Foods", category: "Nutrition", readTime: "5 min" },
    { id: 2, type: "video", title: "Perfect Squat Form", category: "Technique", duration: "3 min" },
    { id: 3, type: "story", title: "Lost 50 lbs in 6 months", category: "Success Story", author: "John D." }
  ],
  settings: [
    { id: 1, name: "Notification Settings", icon: "bell" },
    { id: 2, name: "Privacy Settings", icon: "shield" },
    { id: 3, name: "Account Settings", icon: "user" },
    { id: 4, name: "App Preferences", icon: "settings" }
  ]
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<any>({})
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All", icon: Search },
    { id: "workouts", name: "Workouts", icon: Activity },
    { id: "coaches", name: "Coaches", icon: Users },
    { id: "gyms", name: "Gyms", icon: MapPin },
    { id: "content", name: "Content", icon: BookOpen },
    { id: "settings", name: "Settings", icon: Settings }
  ]

  useEffect(() => {
    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase()
      const results = {
        workouts: sampleData.workouts.filter(w =>
          w.name.toLowerCase().includes(query) ||
          w.instructor.toLowerCase().includes(query) ||
          w.difficulty.toLowerCase().includes(query)
        ),
        coaches: sampleData.coaches.filter(c =>
          c.name.toLowerCase().includes(query) ||
          c.specialty.toLowerCase().includes(query)
        ),
        gyms: sampleData.gyms.filter(g =>
          g.name.toLowerCase().includes(query) ||
          g.type.toLowerCase().includes(query)
        ),
        content: sampleData.content.filter(c =>
          c.title.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
        ),
        settings: sampleData.settings.filter(s =>
          s.name.toLowerCase().includes(query)
        )
      }
      setFilteredResults(results)
    } else {
      setFilteredResults({})
    }
  }, [searchQuery])

  if (!isOpen) return null

  const hasResults = searchQuery.length > 0 && Object.keys(filteredResults).length > 0

  return (
    <div className="fixed inset-0 z-[200] bg-gray-950">
      <div className="max-w-sm mx-auto h-full flex flex-col">
        {/* Search Header */}
        <div className="sticky top-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search workouts, coaches, gyms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Category Filters */}
          {hasResults && (
            <div className="flex space-x-2 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon
                const count = filteredResults[category.id]?.length || 0
                if (category.id !== "all" && count === 0) return null

                return (
                  <Badge
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "secondary"}
                    className={`cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                      activeCategory === category.id
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{category.name}</span>
                    {category.id !== "all" && count > 0 && (
                      <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">{count}</span>
                    )}
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        {/* Search Content */}
        <div className="flex-1 overflow-y-auto">
          {!searchQuery ? (
            /* Recent & Trending */
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {sampleData.recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(search)}
                      className="flex items-center w-full p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors text-left"
                    >
                      <Search className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-white">{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sampleData.trendingSearches.map((search, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="p-4 space-y-6">
              {(activeCategory === "all" || activeCategory === "workouts") && filteredResults.workouts?.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Workouts ({filteredResults.workouts.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredResults.workouts.map((workout: any) => (
                      <div key={workout.id} className="flex items-center p-3 bg-gray-800/30 rounded-xl">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-3">
                          <Activity className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{workout.name}</h4>
                          <p className="text-gray-400 text-sm">{workout.instructor} • {workout.duration} • {workout.difficulty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeCategory === "all" || activeCategory === "coaches") && filteredResults.coaches?.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Coaches ({filteredResults.coaches.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredResults.coaches.map((coach: any) => (
                      <div key={coach.id} className="flex items-center p-3 bg-gray-800/30 rounded-xl">
                        <Avatar className="w-12 h-12 mr-3">
                          <AvatarImage src={coach.image} />
                          <AvatarFallback>{coach.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{coach.name}</h4>
                          <p className="text-gray-400 text-sm">{coach.specialty} • ⭐ {coach.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeCategory === "all" || activeCategory === "gyms") && filteredResults.gyms?.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Gyms ({filteredResults.gyms.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredResults.gyms.map((gym: any) => (
                      <div key={gym.id} className="flex items-center p-3 bg-gray-800/30 rounded-xl">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-3">
                          <MapPin className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{gym.name}</h4>
                          <p className="text-gray-400 text-sm">{gym.type} • {gym.distance} • ⭐ {gym.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeCategory === "all" || activeCategory === "content") && filteredResults.content?.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Content ({filteredResults.content.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredResults.content.map((item: any) => (
                      <div key={item.id} className="flex items-center p-3 bg-gray-800/30 rounded-xl">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-3">
                          <BookOpen className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">
                            {item.category} • {item.readTime || item.duration} {item.author && `• by ${item.author}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeCategory === "all" || activeCategory === "settings") && filteredResults.settings?.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings ({filteredResults.settings.length})
                  </h3>
                  <div className="space-y-2">
                    {filteredResults.settings.map((setting: any) => (
                      <div key={setting.id} className="flex items-center p-3 bg-gray-800/30 rounded-xl">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                          <Settings className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{setting.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasResults && Object.values(filteredResults).every((arr: any) => arr.length === 0) && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">No results found</h3>
                  <p className="text-gray-400">Try searching for something else</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}