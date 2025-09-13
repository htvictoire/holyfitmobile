"use client"

import { Home, Activity, Rss, Users, MapPin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function MobileNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)

  const navItems = [
    { icon: Home, href: "/", key: "home" },
    { icon: Activity, href: "/workout", key: "workouts" },
    { icon: Rss, href: "/feed", key: "feeds" },
    { icon: Users, href: "/coaches", key: "coaches" },
    { icon: MapPin, href: "/gyms", key: "gyms" },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-gray-900/98 backdrop-blur-xl border-t border-gray-700 z-50">
      {/* Navigation Items */}
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link key={item.key} href={item.href}>
              <button
                onClick={() => setActiveTab(item.href)}
                className={`relative flex items-center justify-center w-12 h-9 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            </Link>
          )
        })}
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-1">
        <div className="w-24 h-0.5 bg-gray-600 rounded-full" />
      </div>
    </div>
  )
}
