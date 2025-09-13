import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Share, Edit } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
        <img src="/placeholder-qrcd3.png" alt="Cover" className="w-full h-full object-cover opacity-30" />
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-white">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        <div className="flex items-end gap-4 -mt-8 mb-4">
          <Avatar className="w-20 h-20 border-4 border-card">
            <AvatarImage src="/fitness-user-avatar.png" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">John Doe</h1>
            <Badge className="bg-primary/10 text-primary">Pro Member</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Fitness enthusiast | Marathon runner | Strength training addict 💪
          </p>
          <p className="text-xs text-muted-foreground">📍 San Francisco, CA • Joined March 2023</p>
        </div>
      </div>
    </div>
  )
}
