"use client"

import { SocialFeedAdvanced } from "@/components/social-feed-advanced"
import { UnifiedHeader } from "@/components/unified-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StoriesCarousel } from "@/components/stories-carousel"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <UnifiedHeader />

        <div className="pb-24 space-y-6">
          <StoriesCarousel />
          <SocialFeedAdvanced />
        </div>

        <MobileNavigation />
      </div>
    </div>
  )
}