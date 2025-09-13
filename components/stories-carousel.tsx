"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { VerificationBadge, VerificationLevel } from "@/components/verification-badge"

const stories = [
  {
    id: 1,
    user: "Your Story",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    isAddStory: true,
    verified: null as VerificationLevel,
  },
  {
    id: 2,
    user: "Sarah J.",
    avatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
    verified: "coach" as VerificationLevel,
    hasStory: true,
    isViewed: false,
  },
  {
    id: 3,
    user: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
    verified: "gym-coach" as VerificationLevel,
    hasStory: true,
    isViewed: true,
  },
  {
    id: 4,
    user: "FitZone",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=face",
    verified: "gym" as VerificationLevel,
    hasStory: true,
    isViewed: false,
  },
  {
    id: 5,
    user: "Emma D.",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    verified: "coach" as VerificationLevel,
    hasStory: true,
    isViewed: true,
  },
  {
    id: 6,
    user: "Iron Paradise",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
    verified: "gym" as VerificationLevel,
    hasStory: true,
    isViewed: false,
  }
]

export function StoriesCarousel() {
  const [activeStory, setActiveStory] = useState<number | null>(null)

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-white mb-3">Stories</h2>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => !story.isAddStory && setActiveStory(story.id)}
          >
            <div className="relative">
              {story.isAddStory ? (
                <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-dashed border-gray-500 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
              ) : (
                <div
                  className={`w-16 h-16 rounded-full p-0.5 ${
                    story.isViewed
                      ? "bg-gray-600"
                      : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-gray-950 p-0.5">
                    <img
                      src={story.avatar}
                      alt={story.user}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Verification badge */}
              {story.verified && (
                <div className="absolute -bottom-1 -right-1">
                  <VerificationBadge level={story.verified} size="sm" />
                </div>
              )}
            </div>
            <span className="text-xs text-white font-medium truncate w-16 text-center">
              {story.user}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}