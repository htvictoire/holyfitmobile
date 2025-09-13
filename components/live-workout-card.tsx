"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Heart, Zap, Users, MessageCircle, Camera, Volume2, VolumeX, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Live workout exercises with timings
const liveWorkoutProgram = [
  { name: "Warm-up", duration: 300, type: "warmup", instruction: "Light stretching and movement" },
  { name: "Jump Squats", duration: 45, type: "exercise", instruction: "Explosive jumps, land softly" },
  { name: "Rest", duration: 15, type: "rest", instruction: "Catch your breath" },
  { name: "Push-ups", duration: 45, type: "exercise", instruction: "Keep core tight, full range" },
  { name: "Rest", duration: 15, type: "rest", instruction: "Shake it out" },
  { name: "Mountain Climbers", duration: 45, type: "exercise", instruction: "Fast pace, stay in plank" },
  { name: "Rest", duration: 15, type: "rest", instruction: "Deep breaths" },
  { name: "Burpees", duration: 45, type: "exercise", instruction: "Full body movement" },
  { name: "Cool Down", duration: 180, type: "cooldown", instruction: "Stretch and relax" }
]

const liveComments = [
  { user: "Sarah M.", message: "Great session! 💪", time: 1 },
  { user: "Mike R.", message: "Those burpees are killer!", time: 3 },
  { user: "Emma D.", message: "Love the energy!", time: 5 },
  { user: "Jake T.", message: "First time joining, this is amazing!", time: 8 }
]

export function LiveWorkoutCard() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseTime, setExerciseTime] = useState(0)
  const [heartRate, setHeartRate] = useState(142)
  const [calories, setCalories] = useState(89)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [liveViewers] = useState(247)
  const [showComments, setShowComments] = useState(false)
  const [comments] = useState(liveComments)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          setExerciseTime(prev => prev + 1)

          // Simulate heart rate variation during workout
          if (currentExercise?.type === 'exercise') {
            setHeartRate(prev => Math.min(180, prev + Math.random() * 4 - 2))
          } else {
            setHeartRate(prev => Math.max(110, prev - 1))
          }

          // Calculate calories (rough estimate)
          setCalories(prev => prev + (currentExercise?.type === 'exercise' ? 0.15 : 0.05))

          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  // Auto-advance exercises based on duration
  useEffect(() => {
    if (isActive && currentExercise && exerciseTime >= currentExercise.duration) {
      if (currentExerciseIndex < liveWorkoutProgram.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
        setExerciseTime(0)
      } else {
        // Workout complete
        setIsActive(false)
      }
    }
  }, [exerciseTime, isActive, currentExerciseIndex])

  const currentExercise = liveWorkoutProgram[currentExerciseIndex]
  const totalDuration = liveWorkoutProgram.reduce((sum, ex) => sum + ex.duration, 0)
  const completedDuration = liveWorkoutProgram.slice(0, currentExerciseIndex).reduce((sum, ex) => sum + ex.duration, 0) + exerciseTime
  const overallProgress = (completedDuration / totalDuration) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getExerciseColor = (type: string) => {
    switch (type) {
      case 'exercise': return 'from-red-500 to-orange-500'
      case 'rest': return 'from-green-500 to-blue-500'
      case 'warmup': return 'from-yellow-500 to-orange-500'
      case 'cooldown': return 'from-purple-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const startWorkout = () => {
    setIsActive(true)
    setTime(0)
    setExerciseTime(0)
    setCurrentExerciseIndex(0)
    setCalories(0)
    setHeartRate(120)
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[400] bg-gray-950">
        <div className="relative w-full h-full">
          {/* Fullscreen header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-orange-500">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white font-semibold">Sarah Chen</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-sm font-medium">LIVE</span>
                  <div className="flex items-center text-white/70 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {liveViewers}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(false)} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Main workout area */}
          <div className={`relative w-full h-full bg-gradient-to-br ${getExerciseColor(currentExercise?.type || 'exercise')} flex flex-col items-center justify-center`}>
            <div className="text-center">
              <Badge className={`mb-4 px-4 py-2 text-lg font-bold ${
                currentExercise?.type === 'exercise' ? 'bg-red-500' :
                currentExercise?.type === 'rest' ? 'bg-green-500' :
                currentExercise?.type === 'warmup' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}>
                {currentExercise?.type.toUpperCase()}
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-4">{currentExercise?.name}</h1>
              <p className="text-xl text-white/80 mb-8">{currentExercise?.instruction}</p>
              <div className="text-6xl font-bold text-white mb-4">
                {formatTime((currentExercise?.duration || 0) - exerciseTime)}
              </div>
              <div className="w-64 h-2 bg-white/30 rounded-full mx-auto">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{ width: `${(exerciseTime / (currentExercise?.duration || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="grid grid-cols-4 gap-4 text-center text-white">
              <div>
                <div className="text-2xl font-bold">{formatTime(time)}</div>
                <div className="text-sm opacity-70">Total Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{Math.round(heartRate)}</div>
                <div className="text-sm opacity-70">BPM</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{Math.round(calories)}</div>
                <div className="text-sm opacity-70">Calories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{currentExerciseIndex + 1}/{liveWorkoutProgram.length}</div>
                <div className="text-sm opacity-70">Exercise</div>
              </div>
            </div>
          </div>

          {/* Live comments sidebar */}
          {showComments && (
            <div className="absolute right-4 top-20 bottom-20 w-80 bg-black/60 backdrop-blur-sm rounded-xl p-4 overflow-y-auto">
              <h3 className="text-white font-semibold mb-4">Live Chat ({liveViewers} viewers)</h3>
              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <div className="text-orange-400 font-medium text-sm">{comment.user}</div>
                    <div className="text-white text-sm">{comment.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4">
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white bg-transparent">Live Workout</h3>
              <Badge className="bg-red-500 text-white text-xs animate-pulse">LIVE</Badge>
            </div>
            <p className="text-orange-200 text-sm bg-transparent">HIIT Training with Sarah Chen</p>
            <div className="flex items-center text-gray-300 text-xs mt-1">
              <Users className="w-3 h-3 mr-1" />
              {liveViewers} viewers
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="text-gray-300 hover:text-white p-1"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Current Exercise Display */}
        {currentExercise && (
          <div className="mb-4 p-4 bg-black/20 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Badge className={`${
                currentExercise.type === 'exercise' ? 'bg-red-500' :
                currentExercise.type === 'rest' ? 'bg-green-500' :
                currentExercise.type === 'warmup' ? 'bg-yellow-500' : 'bg-purple-500'
              } text-white font-semibold`}>
                {currentExercise.type.toUpperCase()}
              </Badge>
              <span className="text-white font-bold">
                {formatTime((currentExercise.duration || 0) - exerciseTime)}
              </span>
            </div>
            <h4 className="text-white font-bold text-lg">{currentExercise.name}</h4>
            <p className="text-gray-300 text-sm">{currentExercise.instruction}</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(exerciseTime / (currentExercise.duration || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white bg-transparent">{formatTime(time)}</div>
            <div className="text-xs text-gray-300 bg-transparent">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-300 flex items-center justify-center bg-transparent">
              <Heart className="w-5 h-5 mr-1 animate-pulse" />
              {Math.round(heartRate)}
            </div>
            <div className="text-xs text-gray-300 bg-transparent">BPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300 bg-transparent">{Math.round(calories)}</div>
            <div className="text-xs text-gray-300 bg-transparent">Calories</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2 bg-transparent">
            <span>Overall Progress</span>
            <span>{currentExerciseIndex + 1}/{liveWorkoutProgram.length} exercises</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTime(0)
                setExerciseTime(0)
                setCurrentExerciseIndex(0)
                setIsActive(false)
                setCalories(0)
                setHeartRate(120)
              }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => isActive ? setIsActive(false) : startWorkout()}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              isActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                {time > 0 ? 'Resume' : 'Join Live'}
              </>
            )}
          </Button>
        </div>

        {/* Live Comments Preview */}
        {showComments && (
          <div className="mt-4 bg-black/20 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {comments.slice(-3).map((comment, index) => (
                <div key={index} className="text-sm">
                  <span className="text-orange-400 font-medium">{comment.user}:</span>
                  <span className="text-gray-300 ml-2">{comment.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}