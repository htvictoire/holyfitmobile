import { DiscoverHeader } from "@/components/discover-header"
import { CoachesNearby } from "@/components/coaches-nearby"
import { FitnessCategories } from "@/components/fitness-categories"
import { FeaturedGyms } from "@/components/featured-gyms"
import { MapView } from "@/components/map-view"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card shadow-lg min-h-screen relative">
        <DiscoverHeader />
        <div className="pb-20 overflow-y-auto">
          <MapView />
          <FitnessCategories />
          <CoachesNearby />
          <FeaturedGyms />
        </div>
      </div>
    </div>
  )
}
