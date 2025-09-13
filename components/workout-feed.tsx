"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Play, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WorkoutFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const posts = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "/fitness-woman.png", verified: true },
      time: "2h ago",
      location: "Gold's Gym Downtown",
      workout: "Upper Body Strength",
      duration: "45 min",
      calories: 320,
      image: "/gym-workout-woman-lifting-weights.jpg",
      likes: 124,
      comments: 18,
      description: "Crushed my PR today! 💪 New deadlift record at 185lbs. The grind never stops!",
      tags: ["#DeadliftPR", "#StrengthTraining", "#GymLife"],
    },
    {
      id: 2,
      user: { name: "Mike Rodriguez", avatar: "/fitness-man.png", verified: false },
      time: "4h ago",
      location: "Central Park",
      workout: "Morning Run",
      duration: "32 min",
      calories: 280,
      image: "/man-running-in-park-morning.jpg",
      likes: 89,
      comments: 12,
      description: "Perfect morning for a 5K run! The weather was amazing and I felt so energized.",
      tags: ["#MorningRun", "#5K", "#CentralPark"],
    },
    {
      id: 3,
      user: { name: "Alex Thompson", avatar: "/fitness-user-avatar.png", verified: true },
      time: "6h ago",
      location: "Home Gym",
      workout: "HIIT Circuit",
      duration: "25 min",
      calories: 195,
      image: "/home-gym-hiit-workout-burpees.jpg",
      likes: 156,
      comments: 24,
      description: "Quick but intense HIIT session before work. Burpees are still the devil but they work! 🔥",
      tags: ["#HIIT", "#HomeWorkout", "#MorningMotivation"],
    },
  ]

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Workout Feed</h2>
        <button className="text-white text-sm font-medium hover:text-orange-500 transition-colors">See All</button>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-orange-500/20">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">{post.user.name}</h3>
                  {post.user.verified && (
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{post.time}</span>
                  <span>•</span>
                  <MapPin className="w-3 h-3" />
                  <span>{post.location}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Workout Stats */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4 text-orange-500" />
                <span className="text-white font-medium">{post.workout}</span>
              </div>
              <div className="text-gray-400">{post.duration}</div>
              <div className="text-gray-400">{post.calories} cal</div>
            </div>
          </div>

          {/* Post Image */}
          <div className="relative">
            <img src={post.image || "/placeholder.svg"} alt="Workout" className="w-full h-64 object-cover" />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs font-medium">{post.calories} cal</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-white text-sm mb-3">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-orange-500 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2">
                  <Heart
                    className={`w-5 h-5 ${likedPosts.has(post.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                  />
                  <span className="text-gray-400 text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-sm">{post.comments}</span>
                </button>
                <button>
                  <Share className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-medium">
                Join Workout
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
