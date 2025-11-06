"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Sparkles, ChevronRight, FolderKanban, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"

const mockProject = {
  id: "1",
  name: "AI Research Project",
  description: "Exploring latest developments in artificial intelligence",
  videoCount: 12,
}

const mockMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Can you summarize the key points from the machine learning video?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "Based on the 'Introduction to Machine Learning Fundamentals' video, here are the key points:\n\n1. Machine learning is a subset of AI that enables systems to learn from data\n2. Three main types: supervised, unsupervised, and reinforcement learning\n3. Common algorithms include linear regression, decision trees, and neural networks\n4. Data preprocessing is crucial for model accuracy",
    timestamp: "10:30 AM",
  },
  {
    id: "3",
    role: "user" as const,
    content: "What are the differences between deep learning and traditional ML?",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "assistant" as const,
    content:
      "From the videos in your project, here are the main differences:\n\n**Traditional ML:**\n- Requires manual feature engineering\n- Works well with smaller datasets\n- More interpretable models\n\n**Deep Learning:**\n- Automatic feature extraction\n- Requires large datasets\n- Uses neural networks with multiple layers\n- Better for complex patterns like images and text",
    timestamp: "10:32 AM",
  },
]

export default function ChatPage() {
  const params = useParams()
  const [messages, setMessages] = useState(mockMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I'm analyzing the videos in your project to answer your question. This is a simulated response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col pb-20 md:pb-0">
      {/* Desktop Header */}
      <header className="hidden md:block border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors p-2 -m-2 rounded-md hover:bg-accent"
            >
              <FolderKanban className="w-5 h-5" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/projects/${params.id}`} className="hover:text-foreground transition-colors">
              {mockProject.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <MessageSquare className="w-5 h-5 text-foreground" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/projects/${params.id}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">{mockProject.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden border-b bg-card sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors p-2 -m-2 rounded-md active:bg-accent"
            >
              <FolderKanban className="w-5 h-5" />
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects/${params.id}`} className="hover:text-foreground transition-colors truncate">
              {mockProject.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <MessageSquare className="w-5 h-5 text-foreground" />
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/projects/${params.id}`}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base font-bold">AI Assistant</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex flex-col gap-1 ${message.role === "user" ? "items-end" : "items-start"} max-w-[75%] md:max-w-[60%]`}
            >
              <div
                className={`rounded-[18px] px-4 py-2.5 shadow-sm ${
                  message.role === "user" ? "bg-[#007AFF] text-white" : "bg-[#e5e5ea] dark:bg-[#3a3a3c] text-foreground"
                }`}
              >
                <p className="text-[15px] leading-[20px] whitespace-pre-wrap">{message.content}</p>
              </div>
              <span className="text-[11px] text-muted-foreground px-3">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#e5e5ea] dark:bg-[#3a3a3c] rounded-[18px] px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 p-3 md:p-4 bg-card/50 backdrop-blur-sm sticky bottom-16 md:bottom-0">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-background rounded-[20px] border border-border/50 px-4 py-2 shadow-sm">
              <Textarea
                placeholder="Message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[28px] max-h-32 resize-none border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent"
                rows={1}
              />
            </div>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="h-9 w-9 rounded-full bg-[#007AFF] hover:bg-[#0051D5] text-white shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
