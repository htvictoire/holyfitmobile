"use client"

import { useState } from "react"
import { Dumbbell, MapPin, Users, Calendar, Camera, Heart, Timer, TrendingUp } from "lucide-react"

const quickActions = [
  {
    id: 1,
    title: "Start Workout",
    icon: Dumbbell,
    color: "from-orange-500 to-red-500",
    badge: "Live",
    description: "Begin your session",
  },
  {
    id: 2,
    title: "Find Gyms",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    badge: "12 nearby",
    description: "Discover locations",
  },
  {
    id: 3,
    title: "Join Group",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    badge: "5 active",
    description: "Workout together",
  },
  {
    id: 4,
    title: "Schedule",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    badge: "Today",
    description: "Plan your week",
  },
  {
    id: 5,
    title: "Progress",
    icon: Camera,
    color: "from-yellow-500 to-orange-500",
    badge: "New",
    description: "Track changes",
  },
  {
    id: 6,
    title: "Health",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    badge: "142 BPM",
    description: "Monitor vitals",
  },
  {
    id: 7,
    title: "Timer",
    icon: Timer,
    color: "from-indigo-500 to-purple-500",
    badge: "Ready",
    description: "Set intervals",
  },
  {
    id: 8,
    title: "Analytics",
    icon: TrendingUp,
    color: "from-teal-500 to-blue-500",
    badge: "+12%",
    description: "View insights",
  },
]

export function QuickActionsGrid() {
  const [pressedAction, setPressedAction] = useState<number | null>(null)

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Quick Actions</h2>
        <button className="text-orange-400 text-sm font-medium">See All</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onMouseDown={() => setPressedAction(action.id)}
            onMouseUp={() => setPressedAction(null)}
            onMouseLeave={() => setPressedAction(null)}
            className={`relative bg-gradient-to-br ${action.color} rounded-2xl p-4 text-left transition-all duration-200 ${
              pressedAction === action.id ? "scale-95 shadow-lg" : "hover:scale-105 shadow-xl"
            }`}
          >
            <div className="absolute top-3 right-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                {action.badge}
              </span>
            </div>

            <div className="flex flex-col h-full">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <action.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-base mb-1">{action.title}</h3>
                <p className="text-white/80 text-xs">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
