"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"

const stories = [
  { id: 1, user: "You", avatar: "👤", hasStory: false, isAdd: true },
  { id: 2, user: "Sarah", avatar: "👩‍🦰", hasStory: true, viewed: false, type: "workout" },
  { id: 3, user: "Mike", avatar: "👨‍💪", hasStory: true, viewed: true, type: "transformation" },
  { id: 4, user: "Emma", avatar: "👩‍🏃", hasStory: true, viewed: false, type: "nutrition" },
  { id: 5, user: "Jake", avatar: "🏋️‍♂️", hasStory: true, viewed: false, type: "challenge" },
  { id: 6, user: "Lisa", avatar: "🧘‍♀️", hasStory: true, viewed: true, type: "yoga" },
  { id: 7, user: "Tom", avatar: "🏃‍♂️", hasStory: true, viewed: false, type: "running" },
]

export function SwipeableStories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < stories.length - 3) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        setCurrentIndex(0)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      const scrollAmount = index * 80
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="px-4 bg-transparent">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white bg-transparent">Stories</h2>
        <div className="flex space-x-1">
          <button
            onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
            className="p-1 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(stories.length - 3, currentIndex + 1))}
            className="p-1 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story, index) => (
          <div key={story.id} className="flex-shrink-0 text-center">
            <div className="relative">
              {story.isAdd ? (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center border-2 border-dashed border-gray-500 hover:border-orange-500 transition-colors cursor-pointer">
                  <Plus className="w-6 h-6 text-gray-300" />
                </div>
              ) : (
                <>
                  <div
                    className={`w-16 h-16 rounded-full p-0.5 ${
                      story.viewed ? "bg-gray-600" : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                      {story.avatar}
                    </div>
                  </div>
                  {story.type === "workout" && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                  {story.type === "challenge" && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs">🏆</span>
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="text-xs mt-2 text-white truncate w-16 bg-transparent">{story.user}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
