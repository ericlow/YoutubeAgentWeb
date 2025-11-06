"use client"

import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { FolderOpen, MessageSquare, User } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const params = useParams()

  const isProjectsActive =
    pathname === "/projects" || (pathname?.startsWith("/projects/") && !pathname?.includes("/chat"))
  const isChatActive = pathname?.includes("/chat")
  const isAccountActive = pathname === "/account"

  const chatLink = params?.id ? `/projects/${params.id}/chat` : "/chat"

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/projects"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            isProjectsActive ? "text-[#007AFF]" : "text-muted-foreground"
          }`}
        >
          <FolderOpen className="w-6 h-6" />
          <span className="text-xs font-medium">Projects</span>
        </Link>

        <Link
          href={chatLink}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            isChatActive ? "text-[#007AFF]" : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs font-medium">Chat</span>
        </Link>

        <Link
          href="/account"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            isAccountActive ? "text-[#007AFF]" : "text-muted-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Account</span>
        </Link>
      </div>
    </nav>
  )
}
