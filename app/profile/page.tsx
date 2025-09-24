import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { AchievementsBadges } from "@/components/achievements-badges"
import { WorkoutHistory } from "@/components/workout-history"
import { ProfilePosts } from "@/components/profile-posts"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card shadow-lg min-h-screen relative">
        <ProfileHeader />
        <div className="pb-20 overflow-y-auto">
          <ProfileStats />
          <AchievementsBadges />
          <WorkoutHistory />
          <ProfilePosts />
        </div>
      </div>
    </div>
  )
}
