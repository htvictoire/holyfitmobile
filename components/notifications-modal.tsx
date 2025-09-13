"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Heart, MessageCircle, UserPlus, Calendar, Trophy, Zap, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

const notificationData = [
  {
    id: 1,
    type: "like",
    title: "Sarah Johnson liked your workout",
    message: "Great form on those deadlifts! 💪",
    avatar: "/api/placeholder/40/40",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    actionable: true
  },
  {
    id: 2,
    type: "comment",
    title: "New comment on your post",
    message: "Mike Chen: 'What's your protein intake looking like?'",
    avatar: "/api/placeholder/40/40",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    read: false,
    actionable: true
  },
  {
    id: 3,
    type: "follow",
    title: "Emma Davis started following you",
    message: "Check out her yoga routines!",
    avatar: "/api/placeholder/40/40",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    actionable: true
  },
  {
    id: 4,
    type: "workout_reminder",
    title: "Workout Reminder",
    message: "Your HIIT session with Sarah starts in 30 minutes",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    actionable: true
  },
  {
    id: 5,
    type: "achievement",
    title: "Achievement Unlocked! 🏆",
    message: "7-day workout streak! Keep it up!",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionable: false
  },
  {
    id: 6,
    type: "challenge",
    title: "30-Day Challenge Update",
    message: "You're 70% complete! Only 9 days left!",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    actionable: true
  },
  {
    id: 7,
    type: "system",
    title: "App Update Available",
    message: "Version 2.1.0 includes new workout tracking features",
    avatar: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
    actionable: true
  }
]

const notificationIcons = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  workout_reminder: Calendar,
  achievement: Trophy,
  challenge: Zap,
  system: Bell
}

const notificationColors = {
  like: "bg-red-500/20 text-red-400",
  comment: "bg-blue-500/20 text-blue-400",
  follow: "bg-green-500/20 text-green-400",
  workout_reminder: "bg-orange-500/20 text-orange-400",
  achievement: "bg-yellow-500/20 text-yellow-400",
  challenge: "bg-purple-500/20 text-purple-400",
  system: "bg-gray-500/20 text-gray-400"
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState(notificationData)
  const [filter, setFilter] = useState<"all" | "unread" | "mentions">("all")

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read
    if (filter === "mentions") return notif.type === "comment" || notif.type === "like"
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] bg-gray-950">
      <div className="max-w-sm mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-gray-400 text-sm">{unreadCount} unread</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-orange-400 hover:text-orange-300">
                <Settings className="w-5 h-5" />
              </Button>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-orange-400 hover:text-orange-300 text-sm"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: "Unread" },
              { id: "mentions", label: "Mentions" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab.label}
                {tab.id === "unread" && unreadCount > 0 && (
                  <Badge className="ml-2 bg-red-500 text-xs px-1.5 py-0.5">
                    {unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <Bell className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {filter === "all" ? "No notifications yet" : `No ${filter} notifications`}
              </h3>
              <p className="text-gray-400">
                {filter === "all"
                  ? "We'll notify you when something happens"
                  : `You don't have any ${filter} notifications`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type as keyof typeof notificationIcons]
                const iconColor = notificationColors[notification.type as keyof typeof notificationColors]

                return (
                  <div
                    key={notification.id}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-800/30 transition-colors cursor-pointer ${
                      !notification.read ? "bg-gray-800/20" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon or Avatar */}
                      <div className="relative">
                        {notification.avatar ? (
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        )}
                        {!notification.read && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-white font-medium text-sm leading-tight">
                            {notification.title}
                          </h4>
                          <span className="text-gray-400 text-xs whitespace-nowrap ml-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-snug mb-2">
                          {notification.message}
                        </p>

                        {/* Action Buttons */}
                        {notification.actionable && (
                          <div className="flex space-x-2 mt-3">
                            {notification.type === "like" && (
                              <>
                                <Button size="sm" variant="outline" className="h-8 bg-transparent border-gray-600 text-xs">
                                  View Post
                                </Button>
                                <Button size="sm" className="h-8 bg-orange-500 hover:bg-orange-600 text-xs">
                                  Reply
                                </Button>
                              </>
                            )}
                            {notification.type === "comment" && (
                              <>
                                <Button size="sm" variant="outline" className="h-8 bg-transparent border-gray-600 text-xs">
                                  View
                                </Button>
                                <Button size="sm" className="h-8 bg-orange-500 hover:bg-orange-600 text-xs">
                                  Reply
                                </Button>
                              </>
                            )}
                            {notification.type === "follow" && (
                              <Button size="sm" className="h-8 bg-orange-500 hover:bg-orange-600 text-xs">
                                Follow Back
                              </Button>
                            )}
                            {notification.type === "workout_reminder" && (
                              <>
                                <Button size="sm" variant="outline" className="h-8 bg-transparent border-gray-600 text-xs">
                                  Reschedule
                                </Button>
                                <Button size="sm" className="h-8 bg-green-500 hover:bg-green-600 text-xs">
                                  I'm Ready!
                                </Button>
                              </>
                            )}
                            {notification.type === "challenge" && (
                              <Button size="sm" className="h-8 bg-orange-500 hover:bg-orange-600 text-xs">
                                View Progress
                              </Button>
                            )}
                            {notification.type === "system" && (
                              <Button size="sm" className="h-8 bg-blue-500 hover:bg-blue-600 text-xs">
                                Update Now
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}