"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Heart,
  TrendingUp,
  Dumbbell,
  Activity,
  Medal,
  Gift,
  Rocket,
  Zap,
  Sparkles,
  Timer
} from "lucide-react"

// Sample Challenges Data
const challenges = [
  {
    id: 1,
    title: "100 Push-ups Challenge",
    description: "Work your way up to 100 consecutive push-ups in 30 days with progressive training",
    type: "Strength",
    duration: "30 Days",
    participants: 28934,
    reward: 500,
    progress: 45,
    currentLevel: 45,
    targetLevel: 100,
    isActive: true,
    difficulty: "Progressive",
    background: "from-red-500 to-orange-500",
    icon: <Target className="w-6 h-6" />,
    dailyGoal: "Complete today's push-up set",
    streak: 8,
    bestScore: 52,
    leaderboardRank: 147,
    rewards: ["Push-up Master Badge", "500 HolyCoins", "Strength Warrior Title"],
    creator: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    tags: ["Upper Body", "Bodyweight", "Daily"],
    completionRate: 73,
    featured: true
  },
  {
    id: 2,
    title: "Million Step March",
    description: "Walk or run 1 million steps over the next 100 days. Track your journey to better health!",
    type: "Cardio",
    duration: "100 Days",
    participants: 45678,
    reward: 1000,
    progress: 23,
    currentLevel: 230000,
    targetLevel: 1000000,
    isActive: true,
    difficulty: "Endurance",
    background: "from-blue-500 to-cyan-500",
    icon: <Activity className="w-6 h-6" />,
    dailyGoal: "Take 10,000 steps",
    streak: 15,
    bestScore: 18500,
    leaderboardRank: 523,
    rewards: ["Step Master", "1000 HolyCoins", "Endurance Legend"],
    creator: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b512?w=100&h=100&fit=crop&crop=face",
    tags: ["Walking", "Running", "Tracking"],
    completionRate: 85,
    featured: false
  },
  {
    id: 3,
    title: "Mindful Minutes",
    description: "Meditate for at least 10 minutes daily for 21 days straight. Find your inner peace.",
    type: "Mindfulness",
    duration: "21 Days",
    participants: 12456,
    reward: 300,
    progress: 71,
    currentLevel: 15,
    targetLevel: 21,
    isActive: true,
    difficulty: "Mental",
    background: "from-purple-500 to-indigo-500",
    icon: <Sparkles className="w-6 h-6" />,
    dailyGoal: "Complete 10 minutes of meditation",
    streak: 5,
    bestScore: 25,
    leaderboardRank: 89,
    rewards: ["Zen Master", "300 HolyCoins", "Inner Peace Badge"],
    creator: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    tags: ["Meditation", "Mental Health", "Daily"],
    completionRate: 67,
    featured: true
  },
  {
    id: 4,
    title: "Plank Power Month",
    description: "Hold a plank for progressively longer times, aiming for 5 minutes by month's end",
    type: "Core",
    duration: "30 Days",
    participants: 19834,
    reward: 750,
    progress: 0,
    currentLevel: 0,
    targetLevel: 300,
    isActive: false,
    difficulty: "Progressive",
    background: "from-yellow-500 to-orange-500",
    icon: <Timer className="w-6 h-6" />,
    dailyGoal: "Hold plank for target time",
    streak: 0,
    bestScore: 0,
    leaderboardRank: null,
    rewards: ["Core Commander", "750 HolyCoins", "Iron Will Badge"],
    creator: "Alex Carter",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
    tags: ["Core", "Progressive", "Strength"],
    completionRate: 58,
    featured: false
  },
  {
    id: 5,
    title: "Water Warrior Challenge",
    description: "Drink 8 glasses of water daily for 30 days. Stay hydrated, stay healthy!",
    type: "Wellness",
    duration: "30 Days",
    participants: 35672,
    reward: 400,
    progress: 90,
    currentLevel: 27,
    targetLevel: 30,
    isActive: true,
    difficulty: "Easy",
    background: "from-cyan-500 to-blue-500",
    icon: <Heart className="w-6 h-6" />,
    dailyGoal: "Drink 8 glasses of water",
    streak: 27,
    bestScore: 10,
    leaderboardRank: 23,
    rewards: ["Hydration Hero", "400 HolyCoins", "Wellness Champion"],
    creator: "Lisa Martinez",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
    tags: ["Hydration", "Wellness", "Daily"],
    completionRate: 91,
    featured: true
  },
  {
    id: 6,
    title: "Flexibility Quest",
    description: "Stretch for 15 minutes daily and unlock new levels of flexibility in 28 days",
    type: "Flexibility",
    duration: "28 Days",
    participants: 18945,
    reward: 600,
    progress: 0,
    currentLevel: 0,
    targetLevel: 28,
    isActive: false,
    difficulty: "Beginner",
    background: "from-green-500 to-teal-500",
    icon: <TrendingUp className="w-6 h-6" />,
    dailyGoal: "Complete 15-minute stretch routine",
    streak: 0,
    bestScore: 0,
    leaderboardRank: null,
    rewards: ["Flexibility Master", "600 HolyCoins", "Mobility Expert"],
    creator: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    tags: ["Stretching", "Mobility", "Recovery"],
    completionRate: 72,
    featured: false
  }
]

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("all") // all, active, completed

  const challengeTypes = ["All", "Strength", "Cardio", "Core", "Mindfulness", "Wellness", "Flexibility"]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "All" || challenge.type === filterType
    const matchesView = viewMode === "all" ||
                       (viewMode === "active" && challenge.isActive) ||
                       (viewMode === "completed" && challenge.progress === 100)
    return matchesSearch && matchesType && matchesView
  })

  const activeChallenges = challenges.filter(c => c.isActive)
  const completedChallenges = challenges.filter(c => c.progress === 100)
  const totalRewards = activeChallenges.reduce((sum, c) => sum + c.reward, 0)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <Header />

        {/* Hero Stats Section */}
        <div className="p-4 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Challenges</h1>
              <p className="text-gray-400 text-sm">{activeChallenges.length} Active • {completedChallenges.length} Completed</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-500 p-2 rounded-full">
                <Medal className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-lg">{totalRewards}</div>
                <div className="text-gray-400 text-xs">Potential Coins</div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-green-400 font-bold text-sm">{activeChallenges.length}</div>
              <div className="text-gray-400 text-xs">Active</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-blue-400 font-bold text-sm">{completedChallenges.length}</div>
              <div className="text-gray-400 text-xs">Complete</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-yellow-400 font-bold text-sm">27</div>
              <div className="text-gray-400 text-xs">Best Streak</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50">
              <div className="text-purple-400 font-bold text-sm">18</div>
              <div className="text-gray-400 text-xs">Badges</div>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 mb-3">
            <Button
              variant={viewMode === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("all")}
              className={viewMode === "all" ? "bg-orange-500" : "text-gray-400"}
            >
              All ({challenges.length})
            </Button>
            <Button
              variant={viewMode === "active" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("active")}
              className={viewMode === "active" ? "bg-green-500" : "text-gray-400"}
            >
              Active ({activeChallenges.length})
            </Button>
            <Button
              variant={viewMode === "completed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("completed")}
              className={viewMode === "completed" ? "bg-blue-500" : "text-gray-400"}
            >
              Completed ({completedChallenges.length})
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search challenges..."
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
              {challengeTypes.map((type) => (
                <Badge
                  key={type}
                  variant={filterType === type ? "default" : "secondary"}
                  className={`cursor-pointer whitespace-nowrap ${
                    filterType === type
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => setFilterType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Challenges List */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-4 space-y-4 mt-4">
            {filteredChallenges.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Medal className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No challenges found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// Challenge Card Component
function ChallengeCard({ challenge }: { challenge: typeof challenges[0] }) {
  return (
    <Card className="overflow-hidden bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
      <CardContent className="p-0">
        {/* Challenge Header */}
        <div className={`relative h-28 bg-gradient-to-br ${challenge.background} p-4 flex flex-col justify-between`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                {challenge.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{challenge.title}</h3>
                <p className="text-white/80 text-sm">{challenge.type} • {challenge.duration}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="text-right">
                <div className="text-white font-bold text-lg">{challenge.reward}</div>
                <div className="text-white/70 text-xs">HolyCoins</div>
              </div>
              {challenge.featured && (
                <Badge className="bg-yellow-500/20 text-yellow-300 text-xs border border-yellow-500/30">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {challenge.isActive && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        {/* Challenge Content */}
        <div className="p-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-8 h-8 ring-2 ring-orange-500/30">
              <AvatarImage src={challenge.avatar} />
              <AvatarFallback>{challenge.creator[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{challenge.creator}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>{challenge.difficulty}</span>
                <span>•</span>
                <span>{challenge.completionRate}% completion rate</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{challenge.participants.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{challenge.description}</p>

          {/* Progress Section */}
          {challenge.isActive ? (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Progress</span>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 font-bold text-sm">
                    {challenge.currentLevel.toLocaleString()}/{challenge.targetLevel.toLocaleString()}
                  </span>
                  {challenge.leaderboardRank && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      #{challenge.leaderboardRank}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-gray-400">{challenge.dailyGoal}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🔥 {challenge.streak} day streak</span>
                  {challenge.bestScore > 0 && (
                    <span className="text-blue-400">Best: {challenge.bestScore}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <div className="text-center">
                <Lock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Ready to start this challenge?</p>
                <p className="text-gray-500 text-xs mt-1">{challenge.completionRate}% of participants complete this challenge</p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {challenge.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Rewards */}
          <div className="mb-4">
            <div className="text-white font-medium text-sm mb-2 flex items-center">
              <Gift className="w-4 h-4 mr-1 text-yellow-500" />
              Rewards
            </div>
            <div className="flex flex-wrap gap-1">
              {challenge.rewards.map((reward) => (
                <Badge key={reward} className="bg-yellow-500/20 text-yellow-400 text-xs">
                  {reward}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            className={`w-full ${challenge.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
          >
            {challenge.isActive ? (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Continue Challenge
              </>
            ) : (
              <>
                <Medal className="w-4 h-4 mr-2" />
                Accept Challenge
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}