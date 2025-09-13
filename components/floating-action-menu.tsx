"use client"

import { useState } from "react"
import { Plus, Camera, Dumbbell, Users, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Camera, label: "Photo", color: "bg-blue-500" },
  { icon: Dumbbell, label: "Workout", color: "bg-orange-500" },
  { icon: Users, label: "Group", color: "bg-purple-500" },
  { icon: MessageCircle, label: "Post", color: "bg-green-500" },
]

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className={`transform transition-all duration-300 ${
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap">
                  {item.label}
                </span>
                <Button
                  size="sm"
                  className={`w-12 h-12 rounded-full ${item.color} hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl transition-all duration-300 ${
          isOpen ? "rotate-45 scale-110" : "rotate-0 scale-100"
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
      </Button>
    </div>
  )
}
