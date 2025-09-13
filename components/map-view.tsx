import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function MapView() {
  return (
    <div className="px-4 py-3">
      <Card className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder-mj80v.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Interactive Map</p>
            <p className="text-xs text-muted-foreground">Find coaches & gyms nearby</p>
          </div>
        </div>

        {/* Sample pins */}
        <div className="absolute top-4 left-8 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-12 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-16 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
      </Card>
    </div>
  )
}
