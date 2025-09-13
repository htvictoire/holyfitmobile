"use client"

import { useState, useEffect } from "react"
import { UnifiedHeader } from "@/components/unified-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Trophy,
  Crown,
  Flame,
  Target,
  Clock,
  Users,
  Star,
  Play,
  Lock,
  CheckCircle,
  Calendar,
  Award,
  Zap,
  Heart,
  TrendingUp,
  Dumbbell,
  Activity,
  Medal,
  Gift,
  Rocket,
  Lightning,
  Sparkles
} from "lucide-react"
import Link from "next/link"

// Sample Programs Data
const programs = [
  {
    id: 1,
    title: "30-Day Transform Challenge",
    subtitle: "Complete Body Transformation",
    description: "Comprehensive program combining strength, cardio, and nutrition for total body transformation",
    instructor: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b512?w=100&h=100&fit=crop&crop=face",
    duration: "30 Days",
    difficulty: "Intermediate",
    participants: 12847,
    rating: 4.9,
    price: "Premium",
    category: "Transformation",
    tags: ["Weight Loss", "Strength", "Cardio"],
    progress: 65,
    isActive: true,
    completedWorkouts: 19,
    totalWorkouts: 30,
    nextWorkout: "Upper Body Blast",
    streak: 7,
    background: "from-orange-500 to-red-500",
    icon: <Flame className="w-6 h-6" />,
    achievements: ["Week 1 Complete", "5 Day Streak", "Halfway Champion"],
    schedule: "Mon, Wed, Fri",
    estimatedCalories: 8500,
    equipment: ["Dumbbells", "Resistance Bands"],
    level: "🔥 Intermediate"
  },
  {
    id: 2,
    title: "Mindful Strength Journey",
    subtitle: "Build Mind-Muscle Connection",
    description: "Focus on form, breathing, and intentional movement for sustainable strength gains",
    instructor: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    duration: "21 Days",
    difficulty: "Beginner",
    participants: 8934,
    rating: 4.8,
    price: "Free",
    category: "Strength",
    tags: ["Mindfulness", "Strength", "Form"],
    progress: 0,
    isActive: false,
    completedWorkouts: 0,
    totalWorkouts: 21,
    nextWorkout: "Foundation Fundamentals",
    streak: 0,
    background: "from-blue-500 to-purple-500",
    icon: <Dumbbell className="w-6 h-6" />,
    achievements: [],
    schedule: "Daily",
    estimatedCalories: 4200,
    equipment: ["Bodyweight", "Dumbbells"],
    level: "🌱 Beginner"
  },
  {
    id: 3,
    title: "Elite Athlete Protocol",
    subtitle: "Train Like a Pro",
    description: "Advanced training methods used by professional athletes to maximize performance",
    instructor: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    duration: "45 Days",
    difficulty: "Advanced",
    participants: 3421,
    rating: 5.0,
    price: "Premium+",
    category: "Performance",
    tags: ["Advanced", "Athletic", "Performance"],
    progress: 20,
    isActive: true,
    completedWorkouts: 9,
    totalWorkouts: 45,
    nextWorkout: "Explosive Power Training",
    streak: 3,
    background: "from-purple-500 to-pink-500",
    icon: <Crown className="w-6 h-6" />,
    achievements: ["Elite Mindset"],
    schedule: "Mon-Sat",
    estimatedCalories: 15750,
    equipment: ["Full Gym Access", "Olympic Bars"],
    level: "👑 Advanced"
  },
  {
    id: 4,
    title: "Yoga Flow & Flexibility",
    subtitle: "Restore & Rejuvenate",
    description: "Gentle yet effective yoga sequences to improve flexibility and mental wellbeing",
    instructor: "Lisa Martinez",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
    duration: "28 Days",
    difficulty: "All Levels",
    participants: 15678,
    rating: 4.7,
    price: "Free",
    category: "Flexibility",
    tags: ["Yoga", "Flexibility", "Mindfulness"],
    progress: 85,
    isActive: true,
    completedWorkouts: 24,
    totalWorkouts: 28,
    nextWorkout: "Deep Stretch Flow",
    streak: 12,
    background: "from-green-500 to-teal-500",
    icon: <Heart className="w-6 h-6" />,
    achievements: ["Flexibility Master", "Zen Mode", "Consistency King"],
    schedule: "Daily",
    estimatedCalories: 3920,
    equipment: ["Yoga Mat"],
    level: "🧘 All Levels"
  }
]


export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Transformation", "Strength", "Performance", "Flexibility", "Cardio", "Mindfulness"]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = filterCategory === "All" || program.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const activePrograms = programs.filter(p => p.isActive)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <UnifiedHeader />

        {/* Hero Stats Section */}
        <div className="p-4 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">My Programs</h1>
              <p className="text-gray-400 text-sm">{activePrograms.length} Active Programs</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-full">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-bold text-lg">2,847</div>
                <div className="text-gray-400 text-xs">HolyCoins</div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-green-400 font-bold text-sm">4</div>
              <div className="text-gray-400 text-xs">Active</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-blue-400 font-bold text-sm">127</div>
              <div className="text-gray-400 text-xs">Completed</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-yellow-400 font-bold text-sm">15</div>
              <div className="text-gray-400 text-xs">Streak</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-purple-400 font-bold text-sm">12</div>
              <div className="text-gray-400 text-xs">Badges</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filterCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer whitespace-nowrap ${
                    filterCategory === category
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Programs List */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-4 space-y-4 mt-4">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>

        <MobileNavigation />
      </div>
    </div>
  )
}

// Program Card Component
function ProgramCard({ program }: { program: typeof programs[0] }) {
  return (
    <Card className="overflow-hidden bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
      <CardContent className="p-0">
        {/* Program Header with Gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${program.background} p-4 flex flex-col justify-between`}>
          <div className="flex items-start justify-between">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
              {program.icon}
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={`${program.price === 'Free' ? 'bg-green-500' : program.price === 'Premium+' ? 'bg-purple-500' : 'bg-orange-500'} text-white text-xs`}>
                {program.price}
              </Badge>
              {program.isActive && (
                <Badge className="bg-white/20 text-white text-xs animate-pulse">
                  Active
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg">{program.title}</h3>
            <p className="text-white/80 text-sm">{program.subtitle}</p>
          </div>

          {program.isActive && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Program Content */}
        <div className="p-4">
          {/* Instructor Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-8 h-8 ring-2 ring-orange-500/30">
              <AvatarImage src={program.avatar} />
              <AvatarFallback>{program.instructor[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{program.instructor}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>{program.level}</span>
                <span>•</span>
                <span>{program.duration}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{program.rating}</span>
            </div>
          </div>

          {/* Progress Section */}
          {program.isActive ? (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Progress</span>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 font-bold text-sm">{program.completedWorkouts}/{program.totalWorkouts}</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                    {program.streak} day streak 🔥
                  </Badge>
                </div>
              </div>
              <Progress value={program.progress} className="h-2 bg-gray-700" />
              <div className="mt-2 text-xs text-gray-400">
                Next: {program.nextWorkout}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-300 text-sm leading-relaxed">{program.description}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-center text-xs">
            <div>
              <div className="text-blue-400 font-semibold">{program.participants.toLocaleString()}</div>
              <div className="text-gray-400">Participants</div>
            </div>
            <div>
              <div className="text-green-400 font-semibold">{program.estimatedCalories}</div>
              <div className="text-gray-400">Est. Calories</div>
            </div>
            <div>
              <div className="text-purple-400 font-semibold">{program.schedule}</div>
              <div className="text-gray-400">Schedule</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {program.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Achievements */}
          {program.achievements.length > 0 && (
            <div className="mb-4">
              <div className="text-white font-medium text-sm mb-2 flex items-center">
                <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                Achievements
              </div>
              <div className="flex flex-wrap gap-1">
                {program.achievements.map((achievement) => (
                  <Badge key={achievement} className="bg-yellow-500/20 text-yellow-400 text-xs">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              className={`flex-1 ${program.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
            >
              {program.isActive ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Program
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

