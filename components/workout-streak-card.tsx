"use client"

import { useState } from "react"
import { Flame, Target, Trophy, TrendingUp } from "lucide-react"

export function WorkoutStreakCard() {
  const [currentStreak] = useState(12)
  const [weeklyGoal] = useState(5)
  const [completed] = useState(3)

  const streakDays = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: false, today: true },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ]

  return (
    <div className="mx-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white bg-transparent">Workout Streak</h3>
              <p className="text-white text-sm bg-transparent">Keep it going!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-400 bg-transparent">{currentStreak}</div>
            <div className="text-xs text-gray-300 bg-transparent">days</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-300 bg-transparent">This Week</span>
            <span className="text-sm text-gray-300 bg-transparent">
              {completed}/{weeklyGoal} workouts
            </span>
          </div>
          <div className="flex justify-between space-x-2">
            {streakDays.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                    day.completed
                      ? "bg-green-500 text-white"
                      : day.today
                        ? "bg-orange-500 text-white animate-pulse"
                        : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {day.completed ? "✓" : day.today ? "!" : ""}
                </div>
                <div className="text-xs text-gray-300 bg-transparent">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <Target className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-sm font-medium text-white bg-transparent">Goal</div>
            <div className="text-xs text-gray-300 bg-transparent">60%</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <div className="text-sm font-medium text-white bg-transparent">Rank</div>
            <div className="text-xs text-gray-300 bg-transparent">#23</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-sm font-medium text-white bg-transparent">Trend</div>
            <div className="text-xs text-gray-300 bg-transparent">+15%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
