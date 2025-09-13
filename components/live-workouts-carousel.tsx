"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Heart, Users, MessageCircle, Volume2, VolumeX, Maximize2, X, Target, TrendingUp, Dumbbell, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Live workout categories with different programs
const liveWorkouts = [
  {
    id: 1,
    category: "Weight Loss",
    title: "Fat Burn HIIT",
    instructor: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b512?w=100&h=100&fit=crop&crop=face",
    viewers: 347,
    duration: "30 min",
    colors: {
      gradient: "from-red-500/20 to-pink-500/20",
      border: "border-red-500/30",
      primary: "bg-red-500",
      secondary: "text-red-300"
    },
    icon: <Flame className="w-6 h-6" />,
    program: [
      { name: "Warm-up", duration: 180, type: "warmup", instruction: "Light cardio and dynamic stretches" },
      { name: "Jumping Jacks", duration: 45, type: "exercise", instruction: "High intensity, keep moving" },
      { name: "Rest", duration: 15, type: "rest", instruction: "Quick breath" },
      { name: "Burpees", duration: 45, type: "exercise", instruction: "Full body fat burner" },
      { name: "Rest", duration: 15, type: "rest", instruction: "Catch your breath" },
      { name: "Mountain Climbers", duration: 45, type: "exercise", instruction: "Fast pace cardio" },
      { name: "Rest", duration: 15, type: "rest", instruction: "Prepare for next" },
      { name: "High Knees", duration: 45, type: "exercise", instruction: "Keep knees high" },
      { name: "Cool Down", duration: 180, type: "cooldown", instruction: "Stretch and recover" }
    ]
  },
  {
    id: 2,
    category: "Muscle Gain",
    title: "Strength Builder",
    instructor: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    viewers: 189,
    duration: "45 min",
    colors: {
      gradient: "from-blue-500/20 to-purple-500/20",
      border: "border-blue-500/30",
      primary: "bg-blue-500",
      secondary: "text-blue-300"
    },
    icon: <Dumbbell className="w-6 h-6" />,
    program: [
      { name: "Warm-up", duration: 300, type: "warmup", instruction: "Joint mobility and activation" },
      { name: "Push-ups", duration: 60, type: "exercise", instruction: "Controlled reps, full range" },
      { name: "Rest", duration: 90, type: "rest", instruction: "Muscle recovery time" },
      { name: "Squats", duration: 60, type: "exercise", instruction: "Deep squats, slow tempo" },
      { name: "Rest", duration: 90, type: "rest", instruction: "Rest between sets" },
      { name: "Pull-ups", duration: 60, type: "exercise", instruction: "Assisted if needed" },
      { name: "Rest", duration: 90, type: "rest", instruction: "Prepare for next set" },
      { name: "Planks", duration: 45, type: "exercise", instruction: "Hold strong position" },
      { name: "Cool Down", duration: 240, type: "cooldown", instruction: "Muscle stretching" }
    ]
  },
  {
    id: 3,
    category: "Flexibility",
    title: "Yoga Flow",
    instructor: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    viewers: 156,
    duration: "25 min",
    colors: {
      gradient: "from-green-500/20 to-teal-500/20",
      border: "border-green-500/30",
      primary: "bg-green-500",
      secondary: "text-green-300"
    },
    icon: <Heart className="w-6 h-6" />,
    program: [
      { name: "Centering", duration: 120, type: "warmup", instruction: "Breathwork and awareness" },
      { name: "Sun Salutation A", duration: 180, type: "exercise", instruction: "Flow with breath" },
      { name: "Transition", duration: 30, type: "rest", instruction: "Mindful movement" },
      { name: "Warrior Sequence", duration: 240, type: "exercise", instruction: "Hold poses with strength" },
      { name: "Transition", duration: 30, type: "rest", instruction: "Return to center" },
      { name: "Balance Poses", duration: 180, type: "exercise", instruction: "Tree pose variations" },
      { name: "Transition", duration: 30, type: "rest", instruction: "Prepare for floor" },
      { name: "Hip Openers", duration: 240, type: "exercise", instruction: "Gentle hip mobility" },
      { name: "Savasana", duration: 300, type: "cooldown", instruction: "Complete relaxation" }
    ]
  },
  {
    id: 4,
    category: "Endurance",
    title: "Cardio Power",
    instructor: "Alex Carter",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
    viewers: 278,
    duration: "40 min",
    colors: {
      gradient: "from-orange-500/20 to-yellow-500/20",
      border: "border-orange-500/30",
      primary: "bg-orange-500",
      secondary: "text-orange-300"
    },
    icon: <TrendingUp className="w-6 h-6" />,
    program: [
      { name: "Warm-up", duration: 300, type: "warmup", instruction: "Gradual heart rate build" },
      { name: "Light Jog", duration: 300, type: "exercise", instruction: "Steady pace, find rhythm" },
      { name: "Active Rest", duration: 60, type: "rest", instruction: "Walk in place" },
      { name: "Sprint Intervals", duration: 120, type: "exercise", instruction: "30s on, 30s off" },
      { name: "Recovery", duration: 120, type: "rest", instruction: "Slow down gradually" },
      { name: "Step-ups", duration: 180, type: "exercise", instruction: "Steady cardio pace" },
      { name: "Active Rest", duration: 60, type: "rest", instruction: "Keep moving lightly" },
      { name: "Final Sprint", duration: 90, type: "exercise", instruction: "Give it your all" },
      { name: "Cool Down", duration: 300, type: "cooldown", instruction: "Walking cool down" }
    ]
  },
  {
    id: 5,
    category: "Core Focus",
    title: "Abs Blast",
    instructor: "Lisa Martinez",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
    viewers: 203,
    duration: "20 min",
    colors: {
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
      primary: "bg-purple-500",
      secondary: "text-purple-300"
    },
    icon: <Target className="w-6 h-6" />,
    program: [
      { name: "Core Activation", duration: 120, type: "warmup", instruction: "Gentle core engagement" },
      { name: "Crunches", duration: 45, type: "exercise", instruction: "Controlled movement" },
      { name: "Rest", duration: 15, type: "rest", instruction: "Brief recovery" },
      { name: "Bicycle Crunches", duration: 45, type: "exercise", instruction: "Alternating sides" },
      { name: "Rest", duration: 15, type: "rest", instruction: "Reset position" },
      { name: "Plank Hold", duration: 60, type: "exercise", instruction: "Strong core engagement" },
      { name: "Rest", duration: 20, type: "rest", instruction: "Shake it out" },
      { name: "Russian Twists", duration: 45, type: "exercise", instruction: "Rotate with control" },
      { name: "Stretch & Release", duration: 180, type: "cooldown", instruction: "Core stretches" }
    ]
  }
]

const liveComments = [
  { user: "Sarah M.", message: "Amazing energy today! 🔥", time: 1 },
  { user: "Mike R.", message: "This is exactly what I needed!", time: 3 },
  { user: "Emma D.", message: "Love the variety!", time: 5 },
  { user: "Jake T.", message: "First time, loving it already!", time: 8 }
]

// Individual workout card component
function LiveWorkoutCard({ workout }: { workout: typeof liveWorkouts[0] }) {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseTime, setExerciseTime] = useState(0)
  const [heartRate, setHeartRate] = useState(142)
  const [calories, setCalories] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments] = useState(liveComments)

  const currentExercise = workout.program[currentExerciseIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          setExerciseTime(prev => prev + 1)

          // Simulate heart rate variation
          if (currentExercise?.type === 'exercise') {
            setHeartRate(prev => Math.min(180, prev + Math.random() * 4 - 2))
          } else {
            setHeartRate(prev => Math.max(110, prev - 1))
          }

          // Calculate calories based on workout type
          const calorieMultiplier = workout.category === 'Weight Loss' ? 0.2 :
                                   workout.category === 'Endurance' ? 0.18 :
                                   workout.category === 'Muscle Gain' ? 0.12 :
                                   workout.category === 'Core Focus' ? 0.15 : 0.1

          setCalories(prev => prev + (currentExercise?.type === 'exercise' ? calorieMultiplier : 0.03))

          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, currentExercise, workout])

  // Auto-advance exercises
  useEffect(() => {
    if (isActive && currentExercise && exerciseTime >= currentExercise.duration) {
      if (currentExerciseIndex < workout.program.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
        setExerciseTime(0)
      } else {
        setIsActive(false)
      }
    }
  }, [exerciseTime, isActive, currentExerciseIndex, workout])

  const totalDuration = workout.program.reduce((sum, ex) => sum + ex.duration, 0)
  const completedDuration = workout.program.slice(0, currentExerciseIndex).reduce((sum, ex) => sum + ex.duration, 0) + exerciseTime
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

  const resetWorkout = () => {
    setTime(0)
    setExerciseTime(0)
    setCurrentExerciseIndex(0)
    setIsActive(false)
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
              <Avatar className={`w-10 h-10 ring-2 ring-orange-500`}>
                <AvatarImage src={workout.avatar} />
                <AvatarFallback>{workout.instructor[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white font-semibold">{workout.instructor}</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-sm font-medium">LIVE</span>
                  <div className="flex items-center text-white/70 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {workout.viewers}
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
              <Badge className={`mb-4 px-4 py-2 text-lg font-bold ${workout.colors.primary} text-white`}>
                {workout.category}
              </Badge>
              <Badge className={`mb-4 ml-2 px-4 py-2 text-lg font-bold ${
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
                <div className="text-2xl font-bold text-green-400">{currentExerciseIndex + 1}/{workout.program.length}</div>
                <div className="text-sm opacity-70">Exercise</div>
              </div>
            </div>
          </div>

          {/* Live comments sidebar */}
          {showComments && (
            <div className="absolute right-4 top-20 bottom-20 w-80 bg-black/60 backdrop-blur-sm rounded-xl p-4 overflow-y-auto">
              <h3 className="text-white font-semibold mb-4">Live Chat ({workout.viewers} viewers)</h3>
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
    <div className={`bg-gradient-to-r ${workout.colors.gradient} backdrop-blur-sm border ${workout.colors.border} rounded-2xl p-4 flex-shrink-0 w-80`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-white">{workout.title}</h3>
            <Badge className="bg-red-500 text-white text-xs animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge className={`${workout.colors.primary} text-white text-xs`}>
              {workout.category}
            </Badge>
            <span className="text-white/80 text-sm">with {workout.instructor}</span>
          </div>
          <div className="flex items-center text-gray-300 text-xs mt-1">
            <Users className="w-3 h-3 mr-1" />
            {workout.viewers} viewers • {workout.duration}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className={`w-10 h-10 ${workout.colors.primary} rounded-full flex items-center justify-center animate-pulse`}>
            {workout.icon}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(true)}
            className="text-gray-300 hover:text-white p-1"
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Current Exercise Display */}
      {currentExercise && (
        <div className="mb-3 p-3 bg-black/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${
              currentExercise.type === 'exercise' ? 'bg-red-500' :
              currentExercise.type === 'rest' ? 'bg-green-500' :
              currentExercise.type === 'warmup' ? 'bg-yellow-500' : 'bg-purple-500'
            } text-white font-semibold text-xs`}>
              {currentExercise.type.toUpperCase()}
            </Badge>
            <span className="text-white font-bold text-sm">
              {formatTime((currentExercise.duration || 0) - exerciseTime)}
            </span>
          </div>
          <h4 className="text-white font-bold text-sm">{currentExercise.name}</h4>
          <p className="text-gray-300 text-xs">{currentExercise.instruction}</p>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div
              className={`bg-gradient-to-r ${workout.colors.primary.replace('bg-', 'from-')} to-orange-500 h-1.5 rounded-full transition-all duration-1000`}
              style={{ width: `${(exerciseTime / (currentExercise.duration || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{formatTime(time)}</div>
          <div className="text-xs text-gray-300">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-300 flex items-center justify-center">
            <Heart className="w-3 h-3 mr-1 animate-pulse" />
            {Math.round(heartRate)}
          </div>
          <div className="text-xs text-gray-300">BPM</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${workout.colors.secondary}`}>{Math.round(calories)}</div>
          <div className="text-xs text-gray-300">Calories</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-300 mb-2">
          <span>Progress</span>
          <span>{currentExerciseIndex + 1}/{workout.program.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`bg-gradient-to-r ${workout.colors.primary.replace('bg-', 'from-')} to-orange-500 h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetWorkout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white p-2"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white p-2">
            <Heart className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white p-2"
          >
            <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
        <Button
          onClick={() => isActive ? setIsActive(false) : startWorkout()}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            isActive ? "bg-red-500 hover:bg-red-600 text-white" : `${workout.colors.primary} hover:opacity-90 text-white`
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-3 h-3 mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-3 h-3 mr-1" />
              {time > 0 ? 'Resume' : 'Join'}
            </>
          )}
        </Button>
      </div>

      {/* Live Comments Preview */}
      {showComments && (
        <div className="mt-3 bg-black/20 rounded-xl p-3">
          <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
            <MessageCircle className="w-3 h-3 mr-1" />
            Live Chat
          </h4>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {comments.slice(-2).map((comment, index) => (
              <div key={index} className="text-xs">
                <span className={`${workout.colors.secondary} font-medium`}>{comment.user}:</span>
                <span className="text-gray-300 ml-1">{comment.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function LiveWorkoutsCarousel() {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-3 px-4">Live Workouts</h2>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide pl-4">
        {liveWorkouts.map((workout, index) => (
          <div key={workout.id} className={index === liveWorkouts.length - 1 ? 'pr-4' : ''}>
            <LiveWorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  )
}