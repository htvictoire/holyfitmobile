import { MapPin, Trophy, Users, Target, Calendar, Zap, Heart, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function QuickActions() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 relative overflow-hidden">
          <div className="absolute top-1 right-1">
            <Badge className="bg-primary text-primary-foreground text-xs px-1 py-0">124 nearby</Badge>
          </div>
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-2">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-foreground">Find Coaches</p>
              <p className="text-xs text-muted-foreground">Near you</p>
            </div>
          </Button>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20 relative overflow-hidden">
          <div className="absolute top-1 right-1">
            <Badge className="bg-yellow-600 text-white text-xs px-1 py-0">New</Badge>
          </div>
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-2">
            <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-foreground">Success Stories</p>
              <p className="text-xs text-muted-foreground">Get inspired</p>
            </div>
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-1 right-1">
            <Badge className="bg-blue-600 text-white text-xs px-1 py-0">45 online</Badge>
          </div>
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-2">
            <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-foreground">Community</p>
              <p className="text-xs text-muted-foreground">Connect & share</p>
            </div>
          </Button>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 relative overflow-hidden">
          <div className="absolute top-1 right-1">
            <Badge className="bg-green-600 text-white text-xs px-1 py-0">3/5</Badge>
          </div>
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-2">
            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-foreground">My Goals</p>
              <p className="text-xs text-muted-foreground">Track progress</p>
            </div>
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Card className="p-3 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-1">
            <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-foreground">Schedule</p>
          </Button>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-1">
            <div className="h-8 w-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-xs font-medium text-foreground">Workouts</p>
          </Button>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-1">
            <div className="h-8 w-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-xs font-medium text-foreground">Health</p>
          </Button>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-teal-500/10 to-teal-500/5 border-teal-500/20">
          <Button variant="ghost" className="w-full h-auto p-0 flex flex-col items-center gap-1">
            <div className="h-8 w-8 bg-teal-500/20 rounded-full flex items-center justify-center">
              <Camera className="h-4 w-4 text-teal-600" />
            </div>
            <p className="text-xs font-medium text-foreground">Progress</p>
          </Button>
        </Card>
      </div>
    </div>
  )
}
