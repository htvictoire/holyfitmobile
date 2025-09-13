"use client"

import { useState } from "react"
import { X, Play, Clock, Zap, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const quickWorkouts = [
  {
    id: 1,
    name: "5-Minute Morning Boost",
    duration: 300, // 5 minutes in seconds
    difficulty: "Easy",
    calories: "25-35",
    exercises: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 2,
    name: "HIIT Power Burst",
    duration: 900, // 15 minutes in seconds
    difficulty: "Hard",
    calories: "120-150",
    exercises: ["Burpees", "Mountain Climbers", "High Knees", "Jump Squats"],
    color: "from-red-500 to-pink-600"
  },
  {
    id: 3,
    name: "Desk Break Stretch",
    duration: 180, // 3 minutes in seconds
    difficulty: "Easy",
    calories: "10-15",
    exercises: ["Neck Rolls", "Shoulder Shrugs", "Wrist Circles", "Back Stretch"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 4,
    name: "Core Crusher",
    duration: 600, // 10 minutes in seconds
    difficulty: "Medium",
    calories: "60-80",
    exercises: ["Crunches", "Russian Twists", "Leg Raises", "Dead Bug"],
    color: "from-purple-500 to-violet-600"
  }
]

interface QuickWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuickWorkoutModal({ isOpen, onClose }: QuickWorkoutModalProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startWorkout = (workout: any) => {
    setSelectedWorkout(workout)
    setTimeLeft(workout.duration)
    setCurrentExercise(0)
    setIsActive(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500"
      case "Medium": return "bg-yellow-500"
      case "Hard": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm">
      <div className="max-w-sm mx-auto h-full flex flex-col">
        {!selectedWorkout ? (
          /* Workout Selection */
          <>
            <div className="sticky top-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white">Quick Workouts</h1>
                  <p className="text-gray-400 text-sm">Start exercising right now!</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {quickWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${workout.color} p-6 text-white`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{workout.name}</h3>
                        <div className="flex items-center space-x-4 text-sm mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(workout.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4" />
                            <span>{workout.calories} cal</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getDifficultyColor(workout.difficulty)} text-white font-semibold`}>
                        {workout.difficulty}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {workout.exercises.map((exercise, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-0">
                          {exercise}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => startWorkout(workout)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 font-semibold backdrop-blur-sm"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Workout
                    </Button>
                  </div>

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Active Workout */
          <div className={`h-full bg-gradient-to-br ${selectedWorkout.color} relative overflow-hidden`}>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6">
              <div className="flex items-center justify-between text-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedWorkout(null)
                    setIsActive(false)
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="text-center">
                  <h2 className="font-bold">{selectedWorkout.name}</h2>
                  <p className="text-sm text-white/80">
                    Exercise {currentExercise + 1} of {selectedWorkout.exercises.length}
                  </p>
                </div>
                <div className="w-10"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center h-full text-white px-6">
              {/* Timer Circle */}
              <div className="relative w-64 h-64 mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - (selectedWorkout.duration - timeLeft) / selectedWorkout.duration)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-white/80">remaining</div>
                  </div>
                </div>
              </div>

              {/* Current Exercise */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{selectedWorkout.exercises[currentExercise]}</h3>
                <p className="text-white/80">Keep going! You're doing great!</p>
              </div>

              {/* Progress */}
              <div className="w-full mb-8">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${(currentExercise + 1) * 100 / selectedWorkout.exercises.length}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-white/80 mt-2">
                  <span>Progress</span>
                  <span>{Math.round((currentExercise + 1) * 100 / selectedWorkout.exercises.length)}%</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/20 border-2 border-white/30 rounded-full w-16 h-16"
                >
                  <Heart className="w-6 h-6" />
                </Button>
                <Button
                  onClick={() => setIsActive(!isActive)}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-20 h-20"
                >
                  {isActive ? (
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    if (currentExercise < selectedWorkout.exercises.length - 1) {
                      setCurrentExercise(currentExercise + 1)
                    }
                  }}
                  className="text-white hover:bg-white/20 border-2 border-white/30 rounded-full w-16 h-16"
                >
                  <Target className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
          </div>
        )}
      </div>
    </div>
  )
}