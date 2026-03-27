"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Video,
  Eye,
  Heart,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Play,
  Upload,
  MessageSquare,
} from "lucide-react"

const recentPerformances = [
  {
    id: 1,
    title: "Blues Improvisation Session",
    views: 1234,
    likes: 89,
    date: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=112&fit=crop",
  },
  {
    id: 2,
    title: "Acoustic Cover - Hotel California",
    views: 2567,
    likes: 156,
    date: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=200&h=112&fit=crop",
  },
  {
    id: 3,
    title: "Learning Jazz Chord Voicings",
    views: 876,
    likes: 67,
    date: "2 weeks ago",
    thumbnail: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=200&h=112&fit=crop",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "follow",
    user: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "like",
    user: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    performance: "Blues Improvisation Session",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "comment",
    user: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    performance: "Acoustic Cover - Hotel California",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "follow",
    user: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "2 days ago",
  },
]

interface StoredPost {
  id: string
  username: string
  content: string
  timestamp: string
  likes: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [postCount, setPostCount] = useState(0)

  useEffect(() => {
    async function fetchUserPosts() {
      if (!user) return
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        if (data.success) {
          const userPosts = data.posts.filter(
            (post: StoredPost) => post.username.toLowerCase() === user.username.toLowerCase()
          )
          setPostCount(userPosts.length)
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      }
    }
    fetchUserPosts()
  }, [user])

  const stats = [
    {
      label: "Total Followers",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Total Views",
      value: "45.2K",
      change: "+23%",
      trend: "up",
      icon: Eye,
    },
    {
      label: "Total Likes",
      value: "8,567",
      change: "+18%",
      trend: "up",
      icon: Heart,
    },
    {
      label: "Community Posts",
      value: postCount.toString(),
      change: postCount > 0 ? `+${postCount}` : "0",
      trend: "up",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary text-xl text-primary-foreground">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Welcome, {user?.username || "User"}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s what&apos;s happening with your music.
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Performance
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-chart-2">
                  <TrendingUp className="h-4 w-4" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Performances */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Performances</CardTitle>
              <CardDescription>Your latest uploads and their performance</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/performances">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPerformances.map((performance) => (
                <div
                  key={performance.id}
                  className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
                >
                  <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={performance.thumbnail}
                      alt={performance.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium text-foreground">{performance.title}</h4>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {performance.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {performance.likes}
                      </span>
                      <span>{performance.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest interactions on your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.type === "follow" && "started following you"}
                      {activity.type === "like" && (
                        <>
                          liked your performance{" "}
                          <span className="font-medium">{activity.performance}</span>
                        </>
                      )}
                      {activity.type === "comment" && (
                        <>
                          commented on{" "}
                          <span className="font-medium">{activity.performance}</span>
                        </>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/upload">
                <Upload className="h-5 w-5" />
                <span>Upload Performance</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/explore">
                <Users className="h-5 w-5" />
                <span>Find Musicians</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/community">
                <Video className="h-5 w-5" />
                <span>Join Community</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/settings">
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
