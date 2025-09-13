"use client"

import Image from "next/image"

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
      src: "/badges/blue-verified.svg",
      alt: "Verified Coach",
      label: "Verified Coach",
      description: "Instagram-style verified coach",
    },
    gym: {
      src: "/badges/gold-verified.svg",
      alt: "Verified Business",
      label: "Verified Business",
      description: "Twitter-style gold verified business",
    },
    "gym-coach": {
      src: "/badges/twitter-verified.svg",
      alt: "Verified Professional",
      label: "Verified Professional",
      description: "Twitter-style verified professional coach",
    },
  }

  const { src, alt, label } = config[level]

  const sizeClasses = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const size_px = sizeClasses[size]

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      title={label}
    >
      <Image
        src={src}
        alt={alt}
        width={size_px}
        height={size_px}
        className="drop-shadow-sm"
      />
    </div>
  )
}