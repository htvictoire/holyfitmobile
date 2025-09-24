"use client"

import { useState } from "react"
import { MoreVertical, MessageCircle, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SlideOutMenu } from "@/components/slide-out-menu"
import { SearchModal } from "@/components/search-modal"
import { NotificationsModal } from "@/components/notifications-modal"
import Link from "next/link"

interface HeaderProps {
  messageCount?: number
  notificationCount?: number
}

export function Header({ messageCount = 3, notificationCount = 5 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
              <AvatarFallback className="bg-orange-500 text-white font-semibold">U</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold text-white">HolyFit</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationsOpen(true)}
              className="relative text-white hover:bg-gray-800"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs p-0 flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            <Link href="/messages">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-gray-800"
              >
                <MessageCircle className="w-5 h-5" />
                {messageCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs p-0 flex items-center justify-center">
                    {messageCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="text-white hover:bg-gray-800"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  )
}