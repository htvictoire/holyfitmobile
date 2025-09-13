"use client"

import { useState } from "react"
import { Bell, Search, Settings, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdvancedHeaderProps {
  scrollY: number
}

export function AdvancedHeader({ scrollY }: AdvancedHeaderProps) {
  const [notifications] = useState(3)

  const headerOpacity = Math.min(scrollY / 100, 0.95)

  return (
    <div
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: `rgba(17, 24, 39, ${headerOpacity})`,
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
      }}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Good morning, Alex!</h1>
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="w-3 h-3 mr-1" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Search className="w-5 h-5 text-gray-300" />
            </Button>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-300" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-5 h-5 text-gray-300" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-400">
              <span className="text-2xl mr-1">☀️</span>
              <span>72°F</span>
            </div>
            <div className="text-gray-400">Perfect for outdoor workout</div>
          </div>
          <div className="text-orange-400 font-medium">12:34 PM</div>
        </div>
      </div>
    </div>
  )
}
