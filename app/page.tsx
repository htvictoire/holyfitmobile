"use client"

import { useState, useEffect } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StatusBar } from "@/components/status-bar"
import { UnifiedHeader } from "@/components/unified-header"
import { LiveWorkoutCard } from "@/components/live-workout-card"
import { StoriesCarousel } from "@/components/stories-carousel"
import { QuickActionsGrid } from "@/components/quick-actions-grid"
import { WorkoutStreakCard } from "@/components/workout-streak-card"
import { FloatingActionMenu } from "@/components/floating-action-menu"

export default function HomePage() {
  const [refreshing, setRefreshing] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Native mobile container with dark theme enforced */}
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative shadow-2xl">

        <UnifiedHeader messageCount={3} notificationCount={5} />

        {/* Pull to refresh with haptic feedback simulation */}
        <div
          className={`transition-transform duration-300 bg-gray-950 ${refreshing ? "transform translate-y-16" : ""}`}
        >
          {refreshing && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                Refreshing feed...
              </div>
            </div>
          )}

          <div className="pb-24 pt-2 space-y-6 bg-gray-950">
            <StoriesCarousel />

            <LiveWorkoutCard />

            <WorkoutStreakCard />

            <QuickActionsGrid />
          </div>
        </div>

        <FloatingActionMenu />

        <MobileNavigation />
      </div>
    </div>
  )
}
