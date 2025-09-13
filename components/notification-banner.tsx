"use client"

import { useState } from "react"
import { X, Trophy } from "lucide-react"

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 mx-4 mt-2 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Trophy className="w-5 h-5 text-white" />
        <div>
          <p className="text-white font-semibold text-sm">New Achievement!</p>
          <p className="text-orange-100 text-xs">You've completed 5 workouts this week</p>
        </div>
      </div>
      <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
