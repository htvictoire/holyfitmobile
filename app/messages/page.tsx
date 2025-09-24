"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Search, Phone, Video, MoreVertical, Send, Plus, Camera, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { formatDistanceToNow } from "date-fns"

const coachRequests = [
  {
    id: 1,
    coach: "Sarah Johnson",
    avatar: "/api/placeholder/40/40",
    specialty: "HIIT & Strength",
    rating: 4.9,
    message: "Hi! I'd love to help you reach your fitness goals. I have availability this week for a consultation.",
    timeAgo: "2h ago",
    price: "$45/session",
  },
  {
    id: 2,
    coach: "Mike Chen",
    avatar: "/api/placeholder/40/40",
    specialty: "Powerlifting",
    rating: 4.8,
    message: "Saw your profile and your goals align perfectly with my training style. Let's chat!",
    timeAgo: "5h ago",
    price: "$60/session",
  },
]

const chatData = [
  {
    id: 1,
    name: "Emma Davis",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Great workout today! Same time tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unread: 2,
    online: true,
    isCoach: true,
    type: "coach"
  },
  {
    id: 2,
    name: "Fitness Buddies",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Jake: Who's up for a morning run?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    unread: 0,
    online: false,
    isGroup: true,
    members: 5,
    type: "group"
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thanks for the workout tips! 💪",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: 0,
    online: true,
    isCoach: false,
    type: "user"
  },
  {
    id: 4,
    name: "Lisa Park",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Can we reschedule tomorrow's session?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 1,
    online: false,
    isCoach: true,
    type: "coach"
  },
  {
    id: 5,
    name: "Mike Chen",
    avatar: "/api/placeholder/40/40",
    lastMessage: "You: Thanks for the nutrition tips!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    unread: 0,
    online: false,
    isCoach: true,
    type: "coach"
  },
  {
    id: 6,
    name: "Gym Notifications",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Your membership expires in 30 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 1,
    online: false,
    isSystem: true,
    type: "system"
  },
  {
    id: 7,
    name: "HolyFit Support",
    avatar: "/api/placeholder/40/40",
    lastMessage: "How can we help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    unread: 0,
    online: false,
    isSystem: true,
    type: "system"
  }
]

const sampleMessages = {
  1: [
    { id: 1, text: "Hey! How did your workout go today?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    { id: 2, text: "It was incredible! I finally hit my deadlift PR 💪", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 8) },
    { id: 3, text: "That's amazing! What weight did you hit?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 7) },
    { id: 4, text: "185 lbs! I've been working towards this for months", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 6) },
    { id: 5, text: "Great workout today! How are you feeling?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 6, text: "I'm feeling great! Ready for tomorrow's session", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 3) }
  ],
  2: [
    { id: 1, text: "Hey everyone! Who's free for a morning run?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    { id: 2, text: "I'm in! What time?", sender: "other", timestamp: new Date(Date.now() - 1000 * 60 * 40) },
    { id: 3, text: "How about 7 AM at the park?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 35) },
    { id: 4, text: "Perfect! See you there 🏃‍♂️", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 32) },
    { id: 5, text: "Anyone up for a morning run tomorrow?", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 30) }
  ]
}

export default function MessagesPage() {
  const [view, setView] = useState<"list" | "chat">("list")
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chatData.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sendMessage = () => {
    if (messageText.trim()) {
      // Simulate sending message
      setMessageText("")
    }
  }

  const openChat = (chat: any) => {
    setSelectedChat(chat)
    setView("chat")
  }

  const backToList = () => {
    setView("list")
    setSelectedChat(null)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-sm mx-auto bg-gray-950 min-h-screen relative">
        {view === "list" ? (
          /* Chat List View */
          <>
            <Header />

            {/* Messages Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Messages</h1>
                  <p className="text-gray-400 text-sm">{filteredChats.length} conversations</p>
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Coach Requests */}
            <div className="px-4 py-3 border-b border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">Coach Requests</h2>
                <Badge className="bg-orange-500 text-white">2 new</Badge>
              </div>
              <div className="space-y-3">
                {coachRequests.map((request) => (
                  <Card key={request.id} className="border-orange-500/20 bg-gray-800/30">
                    <CardContent className="p-4">
                      <div className="flex gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar} alt={request.coach} />
                          <AvatarFallback className="bg-orange-500 text-white">
                            {request.coach.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm text-white">{request.coach}</h3>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {request.timeAgo}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs text-gray-400">{request.specialty}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-white">{request.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-orange-400">{request.price}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{request.message}</p>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800">
                          Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-800">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: MessageCircle, label: "New Chat", color: "bg-orange-500" },
                  { icon: Video, label: "Video Call", color: "bg-green-500" },
                  { icon: Phone, label: "Audio Call", color: "bg-blue-500" },
                  { icon: Plus, label: "Group", color: "bg-purple-500" }
                ].map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <button key={idx} className="flex flex-col items-center space-y-2 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-colors">
                      <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Recent Chats */}
            <div className="px-4 py-3">
              <h2 className="text-lg font-semibold mb-3 text-white">Recent Chats</h2>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto pb-24">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                  <MessageCircle className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No conversations found</h3>
                  <p className="text-gray-400">Try a different search term</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => openChat(chat)}
                      className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer active:bg-gray-800/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950"></div>
                          )}
                          {chat.isGroup && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-gray-950 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{chat.members}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-medium truncate">{chat.name}</h3>
                              {chat.type === "coach" && (
                                <Badge variant="secondary" className="text-xs px-2 py-0 bg-orange-500/20 text-orange-400 border-orange-500/30">
                                  Coach
                                </Badge>
                              )}
                            </div>
                            <span className="text-gray-400 text-xs whitespace-nowrap">
                              {formatDistanceToNow(chat.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-300 text-sm truncate mr-2">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {chat.unread}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Individual Chat View */
          <>
            {/* Chat Header */}
            <div className="sticky top-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 p-4 z-10">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={backToList} className="text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChat?.avatar} />
                    <AvatarFallback>{selectedChat?.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedChat?.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-950"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{selectedChat?.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedChat?.online ? "Active now" : "Last seen recently"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
              {(sampleMessages[selectedChat?.id as keyof typeof sampleMessages] || []).map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === "me"
                        ? "bg-orange-500 text-white rounded-br-md"
                        : message.sender === "other"
                        ? "bg-blue-500 text-white rounded-bl-md"
                        : "bg-gray-800 text-white rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "me" ? "text-orange-200" :
                      message.sender === "other" ? "text-blue-200" : "text-gray-400"
                    }`}>
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-gray-950/95 backdrop-blur-xl border-t border-gray-800 p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Plus className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800">
                  <Camera className="w-5 h-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 rounded-full pr-12"
                  />
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}