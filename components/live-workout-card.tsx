"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LiveWorkoutCard() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [heartRate] = useState(142)
  const [calories] = useState(89)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="mx-4">
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white bg-transparent">Live Workout</h3>
            <p className="text-orange-200 text-sm bg-transparent">HIIT Training Session</p>
          </div>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white bg-transparent">{formatTime(time)}</div>
            <div className="text-xs text-gray-300 bg-transparent">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-300 flex items-center justify-center bg-transparent">
              <Heart className="w-5 h-5 mr-1 animate-pulse" />
              {heartRate}
            </div>
            <div className="text-xs text-gray-300 bg-transparent">BPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300 bg-transparent">{calories}</div>
            <div className="text-xs text-gray-300 bg-transparent">Calories</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2 bg-transparent">
            <span>Progress</span>
            <span>3/8 exercises</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "37.5%" }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTime(0)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setIsActive(!isActive)}
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
                Start
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
