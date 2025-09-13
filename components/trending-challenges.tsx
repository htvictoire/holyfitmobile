"use client"

import { useState } from "react"
import { Trophy, Users, Calendar, ChevronRight, Flame, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const challenges = [
  {
    id: 1,
    title: "30-Day Plank Challenge",
    description: "Build core strength with daily plank progressions",
    participants: 2847,
    daysLeft: 12,
    difficulty: "Beginner",
    reward: "Core Crusher Badge",
    progress: 67,
    category: "Strength",
    color: "from-orange-500 to-red-500",
    icon: "💪",
    joined: true,
  },
  {
    id: 2,
    title: "10K Steps Daily",
    description: "Walk your way to better health every single day",
    participants: 5234,
    daysLeft: 8,
    difficulty: "Easy",
    reward: "Walker Badge",
    progress: 0,
    category: "Cardio",
    color: "from-blue-500 to-cyan-500",
    icon: "🚶‍♂️",
    joined: false,
  },
  {
    id: 3,
    title: "Yoga Flow Mastery",
    description: "Master 20 different yoga poses in 21 days",
    participants: 1892,
    daysLeft: 21,
    difficulty: "Intermediate",
    reward: "Zen Master Badge",
    progress: 0,
    category: "Flexibility",
    color: "from-purple-500 to-pink-500",
    icon: "🧘‍♀️",
    joined: false,
  },
  {
    id: 4,
    title: "HIIT Beast Mode",
    description: "Complete 15 high-intensity workouts this month",
    participants: 3456,
    daysLeft: 18,
    difficulty: "Advanced",
    reward: "HIIT Hero Badge",
    progress: 0,
    category: "HIIT",
    color: "from-red-500 to-orange-500",
    icon: "🔥",
    joined: false,
  },
]

export function TrendingChallenges() {
  const [challengeList, setChallengeList] = useState(challenges)

  const joinChallenge = (challengeId: number) => {
    setChallengeList(
      challengeList.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              joined: !challenge.joined,
              participants: challenge.joined ? challenge.participants - 1 : challenge.participants + 1,
            }
          : challenge,
      ),
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-500/20"
      case "Beginner":
        return "text-blue-400 bg-blue-500/20"
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/20"
      case "Advanced":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">Trending Challenges</h2>
        </div>
        <button className="text-orange-400 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {challengeList.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
          >
            <div className={`h-1 bg-gradient-to-r ${challenge.color}`}></div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${challenge.color} rounded-full flex items-center justify-center text-xl`}
                  >
                    {challenge.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-base">{challenge.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{challenge.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => joinChallenge(challenge.id)}
                  size="sm"
                  className={`${
                    challenge.joined
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  } transition-colors`}
                >
                  {challenge.joined ? "Joined" : "Join"}
                </Button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{challenge.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              {challenge.joined && challenge.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Your Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${challenge.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Reward: {challenge.reward}</span>
                </div>
                <button className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors">
                  <span className="text-sm">Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Create Your Challenge</h3>
            <p className="text-gray-400 text-sm">Start a custom challenge for your community</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Create</Button>
        </div>
      </div>
    </div>
  )
}
