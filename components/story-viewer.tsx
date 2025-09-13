"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share, MoreHorizontal, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VerificationBadge, VerificationLevel } from "@/components/verification-badge"

interface Story {
  id: number
  user: string
  avatar: string
  verified: VerificationLevel
  hasStory: boolean
  isViewed: boolean
  content: {
    type: "image" | "video"
    url: string
    duration?: number
  }[]
  timestamp: string
}

const storyContent = {
  2: {
    user: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b512?w=100&h=100&fit=crop&crop=face",
    verified: "coach" as VerificationLevel,
    timestamp: "2h ago",
    content: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop",
        duration: 5000
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&h=700&fit=crop",
        duration: 5000
      }
    ]
  },
  3: {
    user: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verified: "coach" as VerificationLevel,
    timestamp: "4h ago",
    content: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1583500178690-f7ed6a5ba3df?w=400&h=700&fit=crop",
        duration: 5000
      }
    ]
  },
  4: {
    user: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    verified: "coach" as VerificationLevel,
    timestamp: "6h ago",
    content: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=700&fit=crop",
        duration: 5000
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1506629905607-b5f450db9c2d?w=400&h=700&fit=crop",
        duration: 5000
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop",
        duration: 5000
      }
    ]
  }
}

interface StoryViewerProps {
  isOpen: boolean
  onClose: () => void
  initialStoryId: number
  stories: any[]
}

export function StoryViewer({ isOpen, onClose, initialStoryId, stories }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [messageText, setMessageText] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Filter out "Add Story" item and find initial index
  const viewableStories = stories.filter(story => !story.isAddStory)

  useEffect(() => {
    if (isOpen) {
      const initialIndex = viewableStories.findIndex(story => story.id === initialStoryId)
      setCurrentStoryIndex(initialIndex >= 0 ? initialIndex : 0)
      setCurrentSegmentIndex(0)
      setProgress(0)
      setIsPlaying(true)
    }
  }, [isOpen, initialStoryId, viewableStories])

  const currentStory = viewableStories[currentStoryIndex]
  const currentStoryData = storyContent[currentStory?.id as keyof typeof storyContent]
  const currentSegment = currentStoryData?.content[currentSegmentIndex]

  useEffect(() => {
    if (!isOpen || !isPlaying || isPaused || !currentSegment) return

    const duration = currentSegment.duration || 5000
    const interval = 50 // Update every 50ms for smooth progress

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (interval / duration) * 100
        if (newProgress >= 100) {
          handleNextSegment()
          return 0
        }
        return newProgress
      })
    }, interval)

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isOpen, isPlaying, isPaused, currentSegmentIndex, currentStoryIndex])

  const handleNextSegment = () => {
    if (!currentStoryData) return

    if (currentSegmentIndex < currentStoryData.content.length - 1) {
      setCurrentSegmentIndex(prev => prev + 1)
      setProgress(0)
    } else {
      handleNextStory()
    }
  }

  const handlePreviousSegment = () => {
    if (currentSegmentIndex > 0) {
      setCurrentSegmentIndex(prev => prev - 1)
      setProgress(0)
    } else {
      handlePreviousStory()
    }
  }

  const handleNextStory = () => {
    if (currentStoryIndex < viewableStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setCurrentSegmentIndex(0)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setCurrentSegmentIndex(0)
      setProgress(0)
    }
  }

  const handleTouchStart = (e: React.TouchEvent, side: 'left' | 'right') => {
    longPressTimer.current = setTimeout(() => {
      setIsPaused(true)
    }, 200)
  }

  const handleTouchEnd = (e: React.TouchEvent, side: 'left' | 'right') => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    setIsPaused(false)

    // Only trigger navigation if it wasn't a long press
    setTimeout(() => {
      if (side === 'left') {
        handlePreviousSegment()
      } else {
        handleNextSegment()
      }
    }, 0)
  }

  const sendMessage = () => {
    if (messageText.trim()) {
      // Simulate sending message
      setMessageText("")
      setShowMessage(false)
    }
  }

  if (!isOpen || !currentStory || !currentStoryData) return null

  return (
    <div className="fixed inset-0 z-[300] bg-black">
      <div className="relative w-full h-full">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex space-x-1 p-2">
          {currentStoryData.content.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-50"
                style={{
                  width: index < currentSegmentIndex ? '100%' :
                         index === currentSegmentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-0 right-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 ring-2 ring-white">
              <AvatarImage src={currentStoryData.avatar} />
              <AvatarFallback>{currentStoryData.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-sm">{currentStoryData.user}</span>
              <VerificationBadge level={currentStoryData.verified} size="sm" />
            </div>
            <span className="text-white/70 text-sm">{currentStoryData.timestamp}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full">
          {currentSegment && (
            <img
              src={currentSegment.url}
              alt="Story content"
              className="w-full h-full object-cover"
              draggable={false}
            />
          )}

          {/* Touch areas for navigation */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full"
            onTouchStart={(e) => handleTouchStart(e, 'left')}
            onTouchEnd={(e) => handleTouchEnd(e, 'left')}
            onClick={handlePreviousSegment}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full"
            onTouchStart={(e) => handleTouchStart(e, 'right')}
            onTouchEnd={(e) => handleTouchEnd(e, 'right')}
            onClick={handleNextSegment}
          />

          {/* Navigation arrows (desktop) */}
          {currentStoryIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousStory}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          {currentStoryIndex < viewableStories.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextStory}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Heart className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMessage(!showMessage)}
              className="text-white hover:bg-white/20"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Share className="w-6 h-6" />
            </Button>
          </div>

          {/* Message input */}
          {showMessage && (
            <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full p-2">
              <Input
                placeholder={`Reply to ${currentStoryData.user}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent border-none text-white placeholder-white/70 focus-visible:ring-0"
              />
              <Button
                onClick={sendMessage}
                size="sm"
                className="rounded-full bg-orange-500 hover:bg-orange-600 p-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Story indicators */}
          <div className="flex justify-center space-x-2 mt-2">
            {viewableStories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStoryIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Pause overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-white text-6xl">⏸️</div>
          </div>
        )}
      </div>
    </div>
  )
}