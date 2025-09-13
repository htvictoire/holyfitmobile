"use client"

import { useState } from "react"
import { Menu, X, Bell, Search, MessageCircle, Settings, Activity, Target, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const menuItems = [
  { icon: Activity, label: "Feed", href: "/feed", badge: null },
  { icon: MessageCircle, label: "Messages", href: "/messages", badge: 3 },
  { icon: Target, label: "Workouts", href: "/workout", badge: null },
  { icon: BookOpen, label: "Success Stories", href: "/success-stories", badge: null },
  { icon: Calendar, label: "Schedule", href: "/schedule", badge: 1 },
  { icon: Settings, label: "Settings", href: "/settings", badge: null },
]

interface HeaderMenuProps {
  title?: string
}

export function HeaderMenu({ title = "HolyFit" }: HeaderMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="text-white hover:bg-gray-800"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold text-white">{title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-80 max-w-[80vw] bg-gray-900 shadow-2xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h2 className="font-bold text-white">HolyFit</h2>
                  <p className="text-sm text-gray-400">Your fitness journey</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge className="bg-orange-500 hover:bg-orange-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom section */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Upgrade to Premium</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Get unlimited access to all coaches and premium workouts
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}