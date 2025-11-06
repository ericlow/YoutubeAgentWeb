"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Clock, Eye, ThumbsUp, Calendar, MessageSquare } from "lucide-react"

interface Video {
  id: string
  title: string
  channel: string
  thumbnail: string
  duration: string
  views: string
  uploadDate: string
  notes: number
  url: string
  description?: string
  likes?: string
}

interface VideoModalProps {
  video: Video | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockNotes = [
  {
    id: "1",
    timestamp: "2:15",
    content: "Key concept: Supervised learning requires labeled training data",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    timestamp: "5:42",
    content: "Important distinction between classification and regression problems",
    createdAt: "2 hours ago",
  },
  {
    id: "3",
    timestamp: "8:30",
    content: "Feature engineering is crucial for model performance",
    createdAt: "1 hour ago",
  },
  {
    id: "4",
    timestamp: "12:05",
    content: "Cross-validation helps prevent overfitting",
    createdAt: "1 hour ago",
  },
]

const mockTranscript = [
  {
    timestamp: "0:00",
    text: "Welcome to this introduction to machine learning fundamentals. In this video, we'll cover the basics of what machine learning is and how it works.",
  },
  {
    timestamp: "0:15",
    text: "Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.",
  },
  {
    timestamp: "0:30",
    text: "There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning.",
  },
  {
    timestamp: "0:45",
    text: "Supervised learning uses labeled data to train models. For example, if you want to predict house prices, you would train your model on historical data that includes both features and prices.",
  },
]

export function VideoModal({ video, open, onOpenChange }: VideoModalProps) {
  if (!video) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                <svg className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle className="text-xl text-balance leading-snug pr-8">{video.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span className="font-medium text-foreground">{video.channel}</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            </DialogHeader>

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="notes" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-6 mt-4 w-fit">
                <TabsTrigger value="notes" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Notes ({video.notes})
                </TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 px-6 py-4">
                <TabsContent value="notes" className="mt-0 space-y-4">
                  {mockNotes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {note.timestamp}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="transcript" className="mt-0 space-y-4">
                  {mockTranscript.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <Badge variant="outline" className="font-mono text-xs h-fit">
                        {item.timestamp}
                      </Badge>
                      <p className="text-sm leading-relaxed flex-1">{item.text}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="details" className="mt-0 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {video.description ||
                          "This video provides a comprehensive introduction to machine learning fundamentals, covering key concepts, algorithms, and practical applications. Perfect for beginners looking to understand the basics of ML."}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Duration</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Views</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{video.views}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Likes</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{video.likes || "45K"}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Published</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{video.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          Open in YouTube
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
