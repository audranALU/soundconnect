"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  UserPlus,
  Users,
  Play,
  Calendar,
  MapPin,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react"

// Mock data - in a real app this would come from an API
const getMusicianData = (username: string) => {
  const musicians: Record<string, {
    name: string
    username: string
    instrument: string
    instruments: string[]
    level: string
    bio: string
    image: string
    coverImage: string
    followers: number
    following: number
    location: string
    joinedDate: string
    website: string
    performances: {
      id: number
      title: string
      description: string
      thumbnail: string
      duration: string
      views: number
      likes: number
      date: string
    }[]
  }> = {
    sarahguitar: {
      name: "Sarah Chen",
      username: "sarahguitar",
      instrument: "Guitar",
      instruments: ["Electric Guitar", "Acoustic Guitar"],
      level: "Intermediate",
      bio: "Electric guitar enthusiast with a love for blues and classic rock. Been playing for 3 years and always looking for bandmates to jam with! Currently working on my fingerpicking technique and learning some jazz standards. Music is my escape and my passion.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop",
      followers: 567,
      following: 234,
      location: "San Francisco, CA",
      joinedDate: "March 2024",
      website: "sarahchen.music",
      performances: [
        {
          id: 1,
          title: "Blues Improvisation Session",
          description: "A quick jam session working on my blues scales and improvisation",
          thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=225&fit=crop",
          duration: "4:32",
          views: 1234,
          likes: 89,
          date: "2 days ago",
        },
        {
          id: 2,
          title: "Acoustic Cover - Hotel California",
          description: "My take on the classic Eagles song. Still working on the solo!",
          thumbnail: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=225&fit=crop",
          duration: "6:15",
          views: 2567,
          likes: 156,
          date: "1 week ago",
        },
        {
          id: 3,
          title: "Learning Jazz Chord Voicings",
          description: "Practice session focusing on major 7th and minor 9th chords",
          thumbnail: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=400&h=225&fit=crop",
          duration: "3:45",
          views: 876,
          likes: 67,
          date: "2 weeks ago",
        },
      ],
    },
  }

  return musicians[username] || {
    name: "Unknown Musician",
    username: username,
    instrument: "Various",
    instruments: ["Unknown"],
    level: "Beginner",
    bio: "This musician profile is not available.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop",
    followers: 0,
    following: 0,
    location: "Unknown",
    joinedDate: "Unknown",
    website: "",
    performances: [],
  }
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const musician = getMusicianData(username)
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 lg:h-80">
          <img
            src={musician.coverImage}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="relative -mt-16 sm:-mt-24">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
              <img
                src={musician.image}
                alt={musician.name}
                className="h-32 w-32 rounded-2xl border-4 border-background object-cover shadow-lg sm:h-40 sm:w-40"
              />
              <div className="flex-1 pb-2">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{musician.name}</h1>
                <p className="text-muted-foreground">@{musician.username}</p>
              </div>
              <div className="flex gap-3 pb-2">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats and Info */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  <strong className="text-foreground">{musician.followers}</strong> followers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  <strong className="text-foreground">{musician.following}</strong> following
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{musician.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {musician.joinedDate}</span>
              </div>
              {musician.website && (
                <a
                  href={`https://${musician.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{musician.website}</span>
                </a>
              )}
            </div>

            {/* Bio */}
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{musician.bio}</p>

            {/* Instruments and Level */}
            <div className="mt-4 flex flex-wrap gap-2">
              {musician.instruments.map((instrument) => (
                <span
                  key={instrument}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  <Music className="h-3 w-3" />
                  {instrument}
                </span>
              ))}
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  musician.level === "Beginner"
                    ? "bg-chart-2/20 text-chart-2"
                    : "bg-chart-1/20 text-chart-1"
                }`}
              >
                {musician.level}
              </span>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="performances" className="mt-8 pb-16">
            <TabsList>
              <TabsTrigger value="performances">Performances</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="performances" className="mt-6">
              {musician.performances.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {musician.performances.map((performance) => (
                    <Card key={performance.id} className="overflow-hidden">
                      <div className="group relative aspect-video overflow-hidden">
                        <img
                          src={performance.thumbnail}
                          alt={performance.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Play className="h-6 w-6" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                          {performance.duration}
                        </span>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground">{performance.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {performance.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{performance.views.toLocaleString()} views</span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {performance.likes}
                          </span>
                          <span>{performance.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
                  <Play className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">No performances yet</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    This musician hasn&apos;t uploaded any performances.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {musician.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">Bio</h4>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{musician.bio}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Instruments</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {musician.instruments.map((instrument) => (
                        <span
                          key={instrument}
                          className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                        >
                          {instrument}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Skill Level</h4>
                    <p className="mt-1 text-muted-foreground">{musician.level}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <p className="mt-1 text-muted-foreground">{musician.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Member Since</h4>
                    <p className="mt-1 text-muted-foreground">{musician.joinedDate}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
