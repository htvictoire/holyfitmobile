"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Bookmark, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerificationBadge, VerificationLevel } from "@/components/verification-badge"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
      verified: "coach" as VerificationLevel,
      role: "Personal Trainer",
    },
    content:
      "Just crushed a 45-minute HIIT session! 💪 The key is consistency, not perfection. Who's joining me tomorrow?",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    workout: {
      type: "HIIT Training",
      duration: "45 min",
      calories: 420,
      exercises: 12,
    },
    stats: {
      likes: 234,
      comments: 18,
      shares: 7,
    },
    timestamp: "2h ago",
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: null as VerificationLevel,
      role: "Fitness Enthusiast",
    },
    content: "6 months transformation! From couch to 5K runner. Never thought I'd love running this much! 🏃‍♂️",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=500&h=300&fit=crop",
    achievement: {
      title: "5K Runner",
      icon: "🏃‍♂️",
      progress: "6 months",
    },
    stats: {
      likes: 892,
      comments: 45,
      shares: 23,
    },
    timestamp: "4h ago",
    liked: true,
    bookmarked: true,
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
      verified: "gym-coach" as VerificationLevel,
      role: "Yoga Instructor",
    },
    content:
      "Morning flow to start the day right ✨ Remember: your body is your temple, treat it with love and respect.",
    video: true,
    workout: {
      type: "Yoga Flow",
      duration: "30 min",
      calories: 180,
      difficulty: "Beginner",
    },
    stats: {
      likes: 567,
      comments: 32,
      shares: 15,
    },
    timestamp: "6h ago",
    liked: false,
    bookmarked: false,
  },
]

export function SocialFeedAdvanced() {
  const [posts, setPosts] = useState(feedPosts)

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              stats: {
                ...post.stats,
                likes: post.liked ? post.stats.likes - 1 : post.stats.likes + 1,
              },
            }
          : post,
      ),
    )
  }

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Community Feed</h2>
        <button className="text-orange-400 text-sm font-medium">Filter</button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-lg">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{post.user.name}</span>
                      <VerificationBadge level={post.user.verified} size="sm" />
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{post.user.role}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-gray-200 text-sm leading-relaxed">{post.content}</p>
            </div>

            {/* Workout/Achievement Badge */}
            {post.workout && (
              <div className="mx-4 mb-3">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-orange-300 font-medium text-sm">{post.workout.type}</div>
                      <div className="text-gray-400 text-xs">
                        {post.workout.duration} • {post.workout.calories} cal
                      </div>
                    </div>
                    <div className="text-orange-400 text-2xl">💪</div>
                  </div>
                </div>
              </div>
            )}

            {post.achievement && (
              <div className="mx-4 mb-3">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-yellow-300 font-medium text-sm">{post.achievement.title}</div>
                      <div className="text-gray-400 text-xs">{post.achievement.progress}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Post Image/Video */}
            {post.image && (
              <div className="relative">
                <img src={post.image || "/placeholder.svg"} alt="Workout post" className="w-full h-64 object-cover" />
                {post.video && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`} />
                    <span className="text-sm font-medium">{post.stats.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.stats.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Share className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.stats.shares}</span>
                  </button>
                </div>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`transition-colors ${
                    post.bookmarked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${post.bookmarked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
