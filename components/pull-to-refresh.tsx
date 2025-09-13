"use client"

import type React from "react"

import { useState, useRef } from "react"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  children: React.ReactNode
}

export function PullToRefresh({ children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === 0) return

    const currentY = e.touches[0].clientY
    const distance = Math.max(0, (currentY - startY) * 0.5)

    if (distance > 0 && containerRef.current?.scrollTop === 0) {
      setPullDistance(Math.min(distance, 80))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true)
      setTimeout(() => {
        setIsRefreshing(false)
        setPullDistance(0)
      }, 2000)
    } else {
      setPullDistance(0)
    }
    setStartY(0)
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overscroll-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateY(${pullDistance}px)` }}
    >
      {pullDistance > 0 && (
        <div className="flex items-center justify-center py-4">
          <RefreshCw
            className={`w-6 h-6 text-orange-500 ${isRefreshing ? "animate-spin" : ""}`}
            style={{ transform: `rotate(${pullDistance * 4}deg)` }}
          />
        </div>
      )}
      {children}
    </div>
  )
}
