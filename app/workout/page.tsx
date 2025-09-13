"use client"

import { useState } from "react"
import { ArrowLeft, Play, Pause, Heart, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function WorkoutPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const workout = {
    title: "Upper Body Strength Training",
    instructor: "Sarah Chen",
    avatar: "/fitness-woman.png",
    duration: "45 min",
    difficulty: "Intermediate",
    calories: "320-450 cal",
    equipment: "Dumbbells, Bench",
    likes: 1247,
    description:
      "Build serious upper body strength with this comprehensive workout targeting chest, shoulders, back, and arms.",
  }

  const exercises = [
    { name: "Push-ups", sets: "3x12", rest: "60s", current: true },
    { name: "Dumbbell Press", sets: "3x10", rest: "90s", current: false },
    { name: "Pull-ups", sets: "3x8", rest: "90s", current: false },
    { name: "Shoulder Press", sets: "3x12", rest: "60s", current: false },
    { name: "Bent-over Rows", sets: "3x10", rest: "90s", current: false },
    { name: "Tricep Dips", sets: "3x15", rest: "60s", current: false },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-sm">
          <Link href="/">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="font-semibold text-white">Workout</h1>
          <Share2 className="w-6 h-6 text-white" />
        </div>

        {/* Video Player Area */}
        <div className="relative bg-gradient-to-br from-orange-500 to-red-600 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white text-sm mb-2">
              <span>12:34</span>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-1/3" />
              </div>
              <span>45:00</span>
            </div>
          </div>
        </div>

        {/* Workout Info */}
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">{workout.title}</h2>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={workout.avatar || "/placeholder.svg"} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="text-gray-300 text-sm">{workout.instructor}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full ${isLiked ? "text-red-500" : "text-gray-400"}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full ${isSaved ? "text-orange-500" : "text-gray-400"}`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? "fill-orange-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Duration", value: workout.duration },
              { label: "Level", value: workout.difficulty },
              { label: "Calories", value: workout.calories.split("-")[0] },
              { label: "Likes", value: `${workout.likes}` },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white font-semibold">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{workout.description}</p>
        </div>

        {/* Exercise List */}
        <div className="px-4 pb-24">
          <h3 className="text-lg font-semibold text-white mb-4">Exercises</h3>
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl ${
                  exercise.current ? "bg-orange-500/20 border border-orange-500/30" : "bg-gray-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      exercise.current ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{exercise.name}</p>
                    <p className="text-gray-400 text-sm">
                      {exercise.sets} • Rest {exercise.rest}
                    </p>
                  </div>
                </div>
                {exercise.current && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
