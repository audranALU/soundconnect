"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
  Image as ImageIcon,
  Video,
  Music,
  Lock,
} from "lucide-react"

// Sample posts for initial display (before API posts are loaded)
const samplePosts = [
  {
    id: "sample_1",
    author: {
      name: "Sarah Chen",
      username: "sarahguitar",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      instrument: "Guitar",
    },
    content:
      "Just learned my first barre chord! It took weeks of practice but I finally got it. Any tips for transitioning between barre chords smoothly? My fingers are still a bit slow.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: [
      {
        id: 1,
        author: {
          name: "Marcus Johnson",
          username: "marcusbass",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        },
        content: "Congrats! Practice the transitions slowly at first, speed comes with time!",
        timestamp: "1 hour ago",
      },
    ],
    isLiked: false,
  },
  {
    id: "sample_2",
    author: {
      name: "Alex Kim",
      username: "alexdrums",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      instrument: "Drums",
    },
    content:
      "Looking for a bass player and guitarist to start a cover band in the SF Bay Area! We play classic rock and blues. Beginners welcome - let&apos;s learn and grow together!",
    timestamp: "5 hours ago",
    likes: 45,
    comments: [],
    isLiked: true,
  },
  {
    id: "sample_3",
    author: {
      name: "Jordan Lee",
      username: "jordanpiano",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      instrument: "Piano",
    },
    content:
      "What&apos;s everyone&apos;s favorite practice routine? I&apos;ve been doing scales for 15 mins, then working on a piece for 30 mins, but wondering if there&apos;s a better approach for beginners.",
    timestamp: "8 hours ago",
    likes: 32,
    comments: [],
    isLiked: false,
  },
]

interface Comment {
  id: number
  author: {
    name: string
    username: string
    image: string
  }
  content: string
  timestamp: string
}

interface Post {
  id: string
  author: {
    name: string
    username: string
    image: string
    instrument: string
  }
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
}

export default function CommunityPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [newPost, setNewPost] = useState("")
  const [expandedComments, setExpandedComments] = useState<string[]>([])
  const [newComments, setNewComments] = useState<Record<string, string>>({})
  const [isPosting, setIsPosting] = useState(false)

  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        if (data.success && data.posts.length > 0) {
          // Convert API posts to display format and merge with sample posts
          const apiPosts: Post[] = data.posts.map((post: { id: string; username: string; content: string; timestamp: string; likes: number }) => ({
            id: post.id,
            author: {
              name: post.username,
              username: post.username.toLowerCase(),
              image: "",
              instrument: "Music",
            },
            content: post.content,
            timestamp: formatTimestamp(post.timestamp),
            likes: post.likes,
            comments: [],
            isLiked: false,
          }))
          setPosts([...apiPosts, ...samplePosts])
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      }
    }
    fetchPosts()
  }, [])

  const handleLike = (postId: string) => {
    if (!user) return
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    )
  }

  const handleAddComment = (postId: string) => {
    if (!user) return
    const commentText = newComments[postId]
    if (!commentText?.trim()) return

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: {
                    name: user.username,
                    username: user.username.toLowerCase(),
                    image: "",
                  },
                  content: commentText,
                  timestamp: "Just now",
                },
              ],
            }
          : post
      )
    )
    setNewComments((prev) => ({ ...prev, [postId]: "" }))
  }

  const handleNewPost = async () => {
    if (!user || !newPost.trim()) return

    setIsPosting(true)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, content: newPost }),
      })

      const data = await res.json()
      if (data.success) {
        const post: Post = {
          id: data.post.id,
          author: {
            name: user.username,
            username: user.username.toLowerCase(),
            image: "",
            instrument: "Music",
          },
          content: newPost,
          timestamp: "Just now",
          likes: 0,
          comments: [],
          isLiked: false,
        }

        setPosts([post, ...posts])
        setNewPost("")
      }
    } catch (error) {
      console.error("Failed to create post:", error)
    }
    setIsPosting(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Community</h1>
            <p className="mt-2 text-muted-foreground">
              Connect with fellow musicians, share updates, and ask questions.
            </p>
          </div>

          {/* New Post Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              {user ? (
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share something with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Music className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleNewPost} disabled={!newPost.trim() || isPosting}>
                        {isPosting ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Please login to interact</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Sign in to post, comment, and like content in the community.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <Link href={`/profile/${post.author.username}`}>
                        <Avatar>
                          {post.author.image ? (
                            <AvatarImage src={post.author.image} />
                          ) : null}
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {post.author.name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div>
                        <Link
                          href={`/profile/${post.author.username}`}
                          className="font-semibold text-foreground hover:underline"
                        >
                          {post.author.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          @{post.author.username} &middot; {post.author.instrument} &middot;{" "}
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pb-3">
                  <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                    {post.content}
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t border-border pt-3">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={post.isLiked ? "text-primary" : ""}
                        disabled={!user}
                      >
                        <Heart
                          className={`mr-1 h-4 w-4 ${post.isLiked ? "fill-primary" : ""}`}
                        />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {post.comments.length}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {(expandedComments.includes(post.id) || post.comments.length > 0) && (
                    <div className="w-full space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Link href={`/profile/${comment.author.username}`}>
                            <Avatar className="h-8 w-8">
                              {comment.author.image ? (
                                <AvatarImage src={comment.author.image} />
                              ) : null}
                              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                                {comment.author.name[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1 rounded-lg bg-muted px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/profile/${comment.author.username}`}
                                className="text-sm font-semibold text-foreground hover:underline"
                              >
                                {comment.author.name}
                              </Link>
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment */}
                      {user ? (
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                              {user.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-1 gap-2">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={newComments[post.id] || ""}
                              onChange={(e) =>
                                setNewComments((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddComment(post.id)
                              }}
                              className="flex-1 rounded-full bg-muted px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleAddComment(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-sm text-muted-foreground">
                          <Link href="/login" className="text-primary hover:underline">
                            Log in
                          </Link>{" "}
                          to add a comment
                        </p>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
