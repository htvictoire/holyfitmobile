"use client"

import { useState } from "react"
import { X, User, Trophy, BookOpen, Calendar, Settings, Zap, Heart, Share2, Moon, HelpCircle, LogOut, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { QuickWorkoutModal } from "@/components/quick-workout-modal"
import Link from "next/link"

const menuItems = [
  { icon: User, label: "Profile", href: "/profile", badge: null },
  { icon: Trophy, label: "My Programs", href: "/programs", badge: "2 Active" },
  { icon: Medal, label: "Challenges", href: "/challenges", badge: "3 Active" },
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

  return (
    <>
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-out ${
          isOpen
            ? 'bg-black/60 backdrop-blur-md opacity-100 pointer-events-auto'
            : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        {/* Menu slides in from right with elastic easing */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-700/50 overflow-y-auto transition-all duration-700 ease-out ${
            isOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header with slide-in animation */}
          <div className={`sticky top-0 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700/50 p-4 transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`} style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 ring-2 ring-orange-500/30 transition-all duration-300 hover:ring-orange-500/60">
                  <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-semibold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-white">John Doe</h2>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 text-xs border border-orange-500/30 animate-pulse">Premium</Badge>
                    <span className="text-gray-400 text-sm">Level 12</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Stats with staggered animation */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { value: "127", label: "Workouts", color: "text-orange-400", delay: "300ms" },
                { value: "45", label: "Streak", color: "text-green-400", delay: "400ms" },
                { value: "2.1k", label: "Calories", color: "text-blue-400", delay: "500ms" }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-gray-700/50 hover:bg-gray-800/70 hover:scale-105 transition-all duration-300 ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isOpen ? stat.delay : '0ms' }}
                >
                  <div className={`${stat.color} font-bold text-lg`}>{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions with fade-in animation */}
          <div className={`p-4 transition-all duration-500 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`} style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className={`flex flex-col items-center space-y-2 p-3 bg-gray-800/30 hover:bg-gray-800/60 hover:scale-105 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-${action.color.split('-')[1]}-500/20 group ${
                      isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: isOpen ? `${700 + index * 100}ms` : '0ms' }}
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-xs font-medium text-center group-hover:text-orange-300 transition-colors">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Menu Items with staggered slide-in */}
          <div className={`px-4 transition-all duration-500 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
          }`} style={{ transitionDelay: isOpen ? '1000ms' : '0ms' }}>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Menu</h3>
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center justify-between px-3 py-3 hover:bg-gray-800/50 hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-orange-500/10 rounded-xl transition-all duration-300 cursor-pointer group hover:translate-x-1 hover:shadow-md ${
                      isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: isOpen ? `${1100 + index * 100}ms` : '0ms' }}
                    onClick={onClose}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-300 group-hover:scale-110 transition-all duration-200" />
                      <span className="text-white font-medium group-hover:text-orange-100 transition-colors">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400 group-hover:border-orange-500/50 group-hover:text-orange-300 transition-all duration-200">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings Section with fade-up animation */}
          <div className={`px-4 py-4 mt-6 border-t border-gray-700/50 transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: isOpen ? '1600ms' : '0ms' }}>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Preferences</h3>
            <div className="space-y-3">
              <div className={`flex items-center justify-between px-3 py-2 hover:bg-gray-800/30 rounded-xl transition-all duration-300 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ transitionDelay: isOpen ? '1700ms' : '0ms' }}>
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-gray-400 transition-colors" />
                  <span className="text-white font-medium">Dark Mode</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
              <Link href="/help">
                <div className={`flex items-center space-x-3 px-3 py-3 hover:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-500/5 rounded-xl transition-all duration-300 cursor-pointer group hover:translate-x-1 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`} style={{ transitionDelay: isOpen ? '1800ms' : '0ms' }}>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-200" />
                  <span className="text-white font-medium group-hover:text-blue-100 transition-colors">Help & Support</span>
                </div>
              </Link>
              <button className={`flex items-center space-x-3 px-3 py-3 hover:bg-red-500/10 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 rounded-xl transition-all duration-300 cursor-pointer group w-full text-left hover:translate-x-1 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ transitionDelay: isOpen ? '1900ms' : '0ms' }}>
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all duration-200" />
                <span className="text-red-400 group-hover:text-red-300 font-medium transition-colors">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Premium Section with scale-up animation */}
          <div className={`p-4 mb-4 transition-all duration-500 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`} style={{ transitionDelay: isOpen ? '2000ms' : '0ms' }}>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 border border-orange-400/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Premium Active</h3>
                <Badge className="bg-white/20 text-white text-xs animate-pulse border border-white/30">Pro</Badge>
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