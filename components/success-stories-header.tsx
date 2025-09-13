import { ArrowLeft, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SuccessStoriesHeader() {
  return (
    <div className="sticky top-0 z-50 bg-card border-b px-4 py-3">
      <div className="flex items-center gap-3 mb-3">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold flex-1">Success Stories</h1>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search transformations..." className="pl-10 bg-muted/50" />
      </div>
    </div>
  )
}
