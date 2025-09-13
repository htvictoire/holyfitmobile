"use client"

import { Home, MessageCircle, User, Compass, Plus, Users, Dumbbell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function MobileNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  const navItems = [
    { icon: Home, label: "Home", href: "/", key: "home", badge: null },
    { icon: Users, label: "Coaches", href: "/coaches", key: "coaches", badge: null },
    { icon: Plus, label: "Create", href: "#", key: "create", isSpecial: true },
    { icon: Dumbbell, label: "Gyms", href: "/gyms", key: "gyms", badge: null },
    { icon: User, label: "Profile", href: "/profile", key: "profile", badge: null },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 z-50">
      {/* Navigation Items */}
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          if (item.isSpecial) {
            return (
              <button
                key={item.key}
                className="relative flex flex-col items-center justify-center w-12 h-12 bg-orange-500 rounded-2xl shadow-lg transform transition-transform active:scale-95"
              >
                <item.icon className="w-6 h-6 text-white" />
              </button>
            )
          }

          return (
            <Link key={item.key} href={item.href}>
              <button
                onClick={() => setActiveTab(item.href)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                  isActive ? "text-white bg-orange-500" : "text-gray-300 hover:text-white"
                }`}
              >
                <div className="relative">
                  <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-300"}`} />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{item.badge}</span>
                    </div>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </div>

                <span className={`text-xs mt-1 font-medium ${isActive ? "text-white" : "text-white"}`}>
                  {item.label}
                </span>
              </button>
            </Link>
          )
        })}
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-600 rounded-full" />
      </div>
    </div>
  )
}
