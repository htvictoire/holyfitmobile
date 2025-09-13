"use client"

import { useState } from "react"
import { Plus, Camera, MapPin, Users, Dumbbell } from "lucide-react"

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    { icon: Camera, label: "Photo", color: "bg-blue-500" },
    { icon: MapPin, label: "Check-in", color: "bg-green-500" },
    { icon: Users, label: "Find Buddy", color: "bg-purple-500" },
    { icon: Dumbbell, label: "Log Workout", color: "bg-red-500" },
  ]

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                {action.label}
              </span>
              <button className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center shadow-lg`}>
                <action.icon className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transition-transform ${
          isExpanded ? "rotate-45" : ""
        }`}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
