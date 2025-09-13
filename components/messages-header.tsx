import { Search, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MessagesHeader() {
  return (
    <div className="sticky top-0 z-50 bg-card border-b px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold">Messages</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search conversations..." className="pl-10 bg-muted/50" />
      </div>
    </div>
  )
}
