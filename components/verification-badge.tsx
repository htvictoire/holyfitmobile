"use client"

import { Badge } from "@/components/ui/badge"
import { Verified, ShieldCheck, Star } from "lucide-react"

export type VerificationLevel = "coach" | "gym" | "gym-coach" | null

interface VerificationBadgeProps {
  level: VerificationLevel
  className?: string
  size?: "sm" | "md" | "lg"
}

export function VerificationBadge({ level, className = "", size = "sm" }: VerificationBadgeProps) {
  if (!level) return null

  const config = {
    coach: {
      color: "bg-blue-500",
      icon: ShieldCheck,
      label: "Verified Coach",
      description: "Certified fitness professional affiliated with verified gym",
    },
    gym: {
      color: "bg-yellow-500",
      icon: Star,
      label: "Verified Gym",
      description: "Official verified fitness facility",
    },
    "gym-coach": {
      color: "bg-white",
      icon: Verified,
      label: "Gym Coach",
      description: "Coach verified by a verified gym facility",
    },
  }

  const { color, icon: Icon, label } = config[level]

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  const iconSizeClasses = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5"
  }

  return (
    <div
      className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center ${className}`}
      title={label}
    >
      <Icon className={`${iconSizeClasses[size]} ${level === "gym-coach" ? "text-gray-800" : "text-white"}`} />
    </div>
  )
}