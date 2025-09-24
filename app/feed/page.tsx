"use client"

import { SocialFeedAdvanced } from "@/components/social-feed-advanced"
import { Header } from "@/components/header"
import { StoriesCarousel } from "@/components/stories-carousel"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <Header />

        <div className="pb-24 space-y-6">
          <StoriesCarousel />
          <SocialFeedAdvanced />
        </div>

      </div>
    </div>
  )
}