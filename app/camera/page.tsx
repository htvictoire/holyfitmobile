"use client"

import { useState } from "react"
import { ArrowLeft, Camera, RotateCcw, Slash as Flash, Grid3X3, X } from "lucide-react"
import Link from "next/link"

export default function CameraPage() {
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off")
  const [gridVisible, setGridVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const flashModes = [
    { mode: "off" as const, label: "Off" },
    { mode: "on" as const, label: "On" },
    { mode: "auto" as const, label: "Auto" },
  ]

  const handleCapture = () => {
    // Simulate image capture
    setCapturedImage("/placeholder.svg?key=camera-capture")
  }

  if (capturedImage) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-sm mx-auto bg-black min-h-screen relative">
          {/* Preview Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
            <button onClick={() => setCapturedImage(null)}>
              <X className="w-6 h-6 text-white" />
            </button>
            <h1 className="font-semibold text-white">Preview</h1>
            <div />
          </div>

          {/* Captured Image */}
          <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-cover" />

          {/* Action Buttons */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
            <button
              onClick={() => setCapturedImage(null)}
              className="px-6 py-3 bg-gray-800 rounded-full text-white font-medium"
            >
              Retake
            </button>
            <button className="px-8 py-3 bg-orange-500 rounded-full text-white font-medium">Share Workout</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-sm mx-auto bg-black min-h-screen relative">
        {/* Camera Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="font-semibold text-white">Camera</h1>
          <div />
        </div>

        {/* Camera Viewfinder */}
        <div className="relative w-full h-full bg-gray-900">
          {/* Grid Overlay */}
          {gridVisible && (
            <div className="absolute inset-0 z-5">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
          )}

          {/* Camera Controls */}
          <div className="absolute top-16 left-4 right-4 z-10 flex items-center justify-between">
            <button
              onClick={() => {
                const currentIndex = flashModes.findIndex((f) => f.mode === flashMode)
                const nextIndex = (currentIndex + 1) % flashModes.length
                setFlashMode(flashModes[nextIndex].mode)
              }}
              className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2"
            >
              <Flash className={`w-4 h-4 ${flashMode === "on" ? "text-yellow-400" : "text-white"}`} />
              <span className="text-white text-sm capitalize">{flashMode}</span>
            </button>

            <button
              onClick={() => setGridVisible(!gridVisible)}
              className={`p-2 rounded-full ${gridVisible ? "bg-orange-500" : "bg-black/50 backdrop-blur-sm"}`}
            >
              <Grid3X3 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Camera Preview Area */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Camera className="w-16 h-16 mx-auto mb-4" />
              <p>Camera Preview</p>
              <p className="text-sm">Capture your workout moment</p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-8">
            {/* Gallery Thumbnail */}
            <div className="w-12 h-12 bg-gray-700 rounded-xl overflow-hidden">
              <img src="/placeholder.svg?key=gallery-thumb" alt="Gallery" className="w-full h-full object-cover" />
            </div>

            {/* Capture Button */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 bg-white rounded-full" />
            </button>

            {/* Flip Camera */}
            <button className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
