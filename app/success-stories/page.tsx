import { SuccessStoriesHeader } from "@/components/success-stories-header"
import { FeaturedStories } from "@/components/featured-stories"
import { StoriesCategories } from "@/components/stories-categories"
import { RecentTransformations } from "@/components/recent-transformations"

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card shadow-lg min-h-screen relative">
        <SuccessStoriesHeader />
        <div className="pb-20 overflow-y-auto">
          <FeaturedStories />
          <StoriesCategories />
          <RecentTransformations />
        </div>
      </div>
    </div>
  )
}
