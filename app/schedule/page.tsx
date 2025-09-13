"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, User, Plus } from "lucide-react"
import { HeaderMenu } from "@/components/header-menu"
import { StatusBar } from "@/components/status-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VerificationBadge } from "@/components/verification-badge"

const upcomingWorkouts = [
  {
    id: 1,
    title: "HIIT Training Session",
    coach: "Sarah Johnson",
    coachAvatar: "https://images.unsplash.com/photo-1594736797933-d0ec46ba8efd?w=100&h=100&fit=crop&crop=face",
    coachVerified: "coach" as const,
    time: "2:00 PM - 3:00 PM",
    date: "Today",
    location: "FitZone Premium",
    type: "Personal Training",
    status: "confirmed"
  },
  {
    id: 2,
    title: "Yoga Flow Class",
    coach: "Emma Wilson",
    coachAvatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&h=100&fit=crop&crop=face",
    coachVerified: "gym-coach" as const,
    time: "7:00 AM - 8:00 AM",
    date: "Tomorrow",
    location: "Zen Fitness Studio",
    type: "Group Class",
    status: "pending"
  },
  {
    id: 3,
    title: "Strength Training",
    coach: "Mike Chen",
    coachAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    coachVerified: "gym-coach" as const,
    time: "6:00 PM - 7:00 PM",
    date: "Friday",
    location: "Iron Paradise",
    type: "Personal Training",
    status: "confirmed"
  }
]

const statusColors = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  cancelled: "bg-red-500"
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        <StatusBar />
        <HeaderMenu title="Schedule" />

        <div className="px-4 pt-4 pb-24 space-y-6">
          {/* Quick Date Selector */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Today', 'Tomorrow', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <Button
                key={day}
                variant={day === 'Today' ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  day === 'Today'
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-transparent border-gray-600 hover:bg-gray-800'
                }`}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Add New Session Button */}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Schedule New Session</span>
          </Button>

          {/* Upcoming Workouts */}
          <div>
            <h2 className="text-lg font-bold mb-4">Upcoming Sessions</h2>
            <div className="space-y-3">
              {upcomingWorkouts.map((workout) => (
                <Card key={workout.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {/* Coach Avatar */}
                      <div className="relative">
                        <img
                          src={workout.coachAvatar}
                          alt={workout.coach}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1">
                          <VerificationBadge level={workout.coachVerified} size="sm" />
                        </div>
                      </div>

                      {/* Workout Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{workout.title}</h3>
                            <p className="text-sm text-gray-400">with {workout.coach}</p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${statusColors[workout.status as keyof typeof statusColors]}`}></div>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{workout.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{workout.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{workout.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {workout.type}
                          </Badge>
                          <div className="flex space-x-2">
                            {workout.status === 'pending' && (
                              <>
                                <Button variant="outline" size="sm" className="h-7 px-3 bg-transparent border-gray-600">
                                  Decline
                                </Button>
                                <Button size="sm" className="h-7 px-3 bg-green-500 hover:bg-green-600">
                                  Confirm
                                </Button>
                              </>
                            )}
                            {workout.status === 'confirmed' && (
                              <Button variant="outline" size="sm" className="h-7 px-3 bg-transparent border-gray-600">
                                Reschedule
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {upcomingWorkouts.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions scheduled</h3>
              <p className="text-gray-400 mb-4">Book your first training session to get started</p>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Find a Coach
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}