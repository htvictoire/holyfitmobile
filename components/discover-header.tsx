import { Search, Filter, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DiscoverHeader() {
  return (
    <div className="sticky top-0 z-50 bg-card border-b px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>San Francisco, CA</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search coaches, gyms, classes..." className="pl-10 bg-muted/50" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
