"use client"

import { useState } from "react"
import { X, User, Trophy, BookOpen, Calendar, Settings, Zap, Heart, Share2, Moon, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { QuickWorkoutModal } from "@/components/quick-workout-modal"
import Link from "next/link"

const menuItems = [
  { icon: User, label: "Profile", href: "/profile", badge: null },
  { icon: Trophy, label: "My Programs & Challenges", href: "/programs", badge: "2 Active" },
  { icon: BookOpen, label: "Success Stories", href: "/success-stories", badge: null },
  { icon: Calendar, label: "Schedule", href: "/schedule", badge: "3 Today" },
  { icon: Settings, label: "Settings", href: "/settings", badge: null },
]

const quickActions = [
  { icon: Zap, label: "Quick Workout", action: "workout", color: "bg-orange-500" },
  { icon: Heart, label: "Health Stats", action: "stats", color: "bg-red-500" },
  { icon: Share2, label: "Share Progress", action: "share", color: "bg-blue-500" },
]

interface SlideOutMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SlideOutMenu({ isOpen, onClose }: SlideOutMenuProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isQuickWorkoutOpen, setIsQuickWorkoutOpen] = useState(false)

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "workout":
        setIsQuickWorkoutOpen(true)
        break
      case "stats":
        // Handle health stats
        break
      case "share":
        // Handle share progress
        break
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
        {/* Menu slides in from right */}
        <div className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-gray-900 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
          {/* Menu Header */}
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
                  <AvatarFallback className="bg-orange-500 text-white font-semibold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-white">John Doe</h2>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-orange-500/20 text-orange-400 text-xs">Premium</Badge>
                    <span className="text-gray-400 text-sm">Level 12</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <div className="text-orange-400 font-bold text-lg">127</div>
                <div className="text-gray-400 text-xs">Workouts</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <div className="text-green-400 font-bold text-lg">45</div>
                <div className="text-gray-400 text-xs">Streak</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                <div className="text-blue-400 font-bold text-lg">2.1k</div>
                <div className="text-gray-400 text-xs">Calories</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex flex-col items-center space-y-2 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-colors"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-xs font-medium text-center">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-4">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Menu</h3>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="flex items-center justify-between px-3 py-3 hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer group"
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="px-4 py-4 mt-6 border-t border-gray-700">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">Dark Mode</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
              <Link href="/help">
                <div className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer group">
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-white font-medium">Help & Support</span>
                </div>
              </Link>
              <button className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer group w-full text-left">
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                <span className="text-red-400 group-hover:text-red-300 font-medium transition-colors">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Premium Section */}
          <div className="p-4 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Premium Active</h3>
                <Badge className="bg-white/20 text-white text-xs">Pro</Badge>
              </div>
              <p className="text-white/80 text-sm mb-3">
                Unlimited workouts, premium coaches, and advanced analytics
              </p>
              <div className="text-xs text-white/60">
                Renews on Dec 15, 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickWorkoutModal isOpen={isQuickWorkoutOpen} onClose={() => setIsQuickWorkoutOpen(false)} />
    </>
  )
}