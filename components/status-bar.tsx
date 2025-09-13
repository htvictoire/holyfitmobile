import { Battery, Signal, Wifi } from "lucide-react"

export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-gray-950 text-white text-sm font-medium">
      <div className="flex items-center gap-1">
        <span>{currentTime}</span>
      </div>
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span className="text-xs">100%</span>
      </div>
    </div>
  )
}
