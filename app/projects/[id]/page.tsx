"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MoreVertical,
  ArrowLeft,
  Play,
  Clock,
  Eye,
  MessageSquare,
  Trash2,
  ExternalLink,
  Send,
  Sparkles,
  X,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { VideoModal } from "@/components/video-modal"
import { AddVideoDialog } from "@/components/add-video-dialog"

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "Introduction to Machine Learning Fundamentals",
    channel: "Tech Academy",
    thumbnail: "/machine-learning-tutorial.png",
    duration: "15:42",
    views: "1.2M",
    uploadDate: "2 weeks ago",
    notes: 5,
    url: "https://youtube.com/watch?v=example1",
  },
  {
    id: "2",
    title: "Deep Learning Neural Networks Explained",
    channel: "AI Insights",
    thumbnail: "/neural-networks-visualization.jpg",
    duration: "22:15",
    views: "856K",
    uploadDate: "1 month ago",
    notes: 12,
    url: "https://youtube.com/watch?v=example2",
  },
  {
    id: "3",
    title: "Natural Language Processing with Transformers",
    channel: "Data Science Pro",
    thumbnail: "/nlp-transformers-diagram.jpg",
    duration: "18:30",
    views: "645K",
    uploadDate: "3 weeks ago",
    notes: 8,
    url: "https://youtube.com/watch?v=example3",
  },
  {
    id: "4",
    title: "Computer Vision and Image Recognition",
    channel: "Tech Academy",
    thumbnail: "/computer-vision-ai.jpg",
    duration: "20:05",
    views: "923K",
    uploadDate: "1 week ago",
    notes: 3,
    url: "https://youtube.com/watch?v=example4",
  },
]

const mockProject = {
  id: "1",
  name: "AI Research Project",
  description: "Exploring latest developments in artificial intelligence",
  videoCount: 12,
  messageCount: 45,
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

export default function ProjectDetailPage() {
  const params = useParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [videos] = useState(mockVideos)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [messages, setMessages] = useState(mockMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId)
    setIsVideoModalOpen(true)
  }

  const selectedVideoData = videos.find((v) => v.id === selectedVideo)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/projects">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold">{mockProject.name}</h1>
                  <p className="text-sm text-muted-foreground">{mockProject.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsChatOpen(!isChatOpen)}>
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  AI Assistant
                </Button>
                <Button
                  className="gap-2 bg-[#007AFF] hover:bg-[#0051D5] text-white"
                  onClick={() => setIsAddVideoOpen(true)}
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center rotate-0 hover:rotate-90 transition-transform duration-300">
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  </div>
                  Add Video
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Videos Grid */}
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No videos found</h3>
                <p className="text-muted-foreground mb-4">Add videos to start researching</p>
                <Button onClick={() => setIsAddVideoOpen(true)} className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-blue-300 dark:hover:border-blue-700 bg-blue-50 dark:bg-blue-950/20 hover:scale-105 transform"
                    onClick={() => handleVideoClick(video.id)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform">
                          <Play className="w-7 h-7 text-white ml-0.5" />
                        </div>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">
                        {video.duration}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-balance leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">{video.channel}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-blue-500" />
                            <span>{video.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-500" />
                            <span>{video.uploadDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-purple-500" />
                            <span>{video.notes}</span>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open in YouTube
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Chat Sidebar */}
      <aside
        className={`${isChatOpen ? "w-full xl:w-96" : "w-0"} transition-all duration-300 ease-in-out border-l bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col overflow-hidden`}
      >
        {isChatOpen && (
          <>
            <div className="border-b border-border/50 p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setIsChatOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex flex-col gap-1 ${message.role === "user" ? "items-end" : "items-start"} max-w-[75%]`}
                  >
                    <div
                      className={`rounded-[18px] px-4 py-2.5 shadow-sm ${
                        message.role === "user"
                          ? "bg-[#007AFF] text-white"
                          : "bg-[#e5e5ea] dark:bg-[#3a3a3c] text-foreground"
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

            <div className="border-t border-border/50 p-3 bg-card/50 backdrop-blur-sm">
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
          </>
        )}
      </aside>

      {/* Video Modal */}
      <VideoModal video={selectedVideoData || null} open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen} />

      {/* Add Video Dialog */}
      <AddVideoDialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen} />
    </div>
  )
}
