import { MobileNavigation } from "@/components/mobile-navigation"
import { MessagesHeader } from "@/components/messages-header"
import { CoachRequests } from "@/components/coach-requests"
import { ActiveChats } from "@/components/active-chats"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card shadow-lg min-h-screen relative">
        <MessagesHeader />
        <div className="pb-20 overflow-y-auto">
          <CoachRequests />
          <ActiveChats />
        </div>
        <MobileNavigation />
      </div>
    </div>
  )
}
