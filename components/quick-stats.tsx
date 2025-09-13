"use client"

import { TrendingUp, Flame, Target, Clock } from "lucide-react"

export function QuickStats() {
  const stats = [
    { icon: Flame, value: "1,247", label: "Calories", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: Target, value: "8/10", label: "Goals", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Clock, value: "45m", label: "Active", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: TrendingUp, value: "+12%", label: "Progress", color: "text-orange-500", bg: "bg-orange-500/10" },
  ]

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-white mb-4">Today's Progress</h2>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
