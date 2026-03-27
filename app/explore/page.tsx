"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Music, UserPlus } from "lucide-react"

const musicians = [
  {
    id: 1,
    name: "Alex Kim",
    username: "alexdrums",
    instrument: "Drums",
    level: "Intermediate",
    bio: "Self-taught drummer with a passion for rock and jazz fusion. Always looking to jam!",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    followers: 234,
  },
  {
    id: 2,
    name: "Jordan Lee",
    username: "jordanpiano",
    instrument: "Piano",
    level: "Beginner",
    bio: "Classical piano student exploring contemporary styles. Love Chopin and Einaudi.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    followers: 156,
  },
  {
    id: 3,
    name: "Taylor Martinez",
    username: "taylorsings",
    instrument: "Guitar",
    level: "Intermediate",
    bio: "Acoustic guitarist and singer-songwriter. Writing my first EP about life experiences.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    followers: 412,
  },
  {
    id: 4,
    name: "Chris Morgan",
    username: "chrisvocals",
    instrument: "Vocals",
    level: "Beginner",
    bio: "New to singing but passionate about R&B and soul music. Learning breath control.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    followers: 89,
  },
  {
    id: 5,
    name: "Sarah Chen",
    username: "sarahguitar",
    instrument: "Guitar",
    level: "Intermediate",
    bio: "Electric guitar enthusiast. Loves blues and classic rock. Looking for bandmates!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    followers: 567,
  },
  {
    id: 6,
    name: "Marcus Johnson",
    username: "marcusbass",
    instrument: "Bass",
    level: "Beginner",
    bio: "Picked up bass last year. Into funk, jazz, and anything with a good groove.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    followers: 143,
  },
  {
    id: 7,
    name: "Emily Rodriguez",
    username: "emilyviolin",
    instrument: "Violin",
    level: "Intermediate",
    bio: "Classical violinist branching into modern and cinematic music. Love collaborations!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    followers: 298,
  },
  {
    id: 8,
    name: "David Park",
    username: "davidkeys",
    instrument: "Piano",
    level: "Intermediate",
    bio: "Jazz piano player. Currently learning improvisation and chord voicings.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    followers: 321,
  },
  {
    id: 9,
    name: "Lisa Thompson",
    username: "lisadrums",
    instrument: "Drums",
    level: "Beginner",
    bio: "Just started drumming 6 months ago. Excited to learn and connect with other beginners!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    followers: 67,
  },
  {
    id: 10,
    name: "Ryan Cooper",
    username: "ryanvocals",
    instrument: "Vocals",
    level: "Intermediate",
    bio: "Baritone singer focusing on musical theatre and pop. Open to duets and collaborations!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    followers: 445,
  },
  {
    id: 11,
    name: "Nina Patel",
    username: "ninaflute",
    instrument: "Flute",
    level: "Beginner",
    bio: "Learning flute for orchestra. Interested in both classical and modern pieces.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    followers: 112,
  },
  {
    id: 12,
    name: "Jake Wilson",
    username: "jakebass",
    instrument: "Bass",
    level: "Intermediate",
    bio: "Slap bass enthusiast. Big fan of Flea and Victor Wooten. Let's jam!",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    followers: 387,
  },
]

const instruments = ["All", "Guitar", "Piano", "Drums", "Bass", "Vocals", "Violin", "Flute"]
const levels = ["All", "Beginner", "Intermediate"]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInstrument, setSelectedInstrument] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const filteredMusicians = useMemo(() => {
    return musicians.filter((musician) => {
      const matchesSearch =
        musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        musician.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        musician.bio.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesInstrument =
        selectedInstrument === "All" || musician.instrument === selectedInstrument

      const matchesLevel = selectedLevel === "All" || musician.level === selectedLevel

      return matchesSearch && matchesInstrument && matchesLevel
    })
  }, [searchQuery, selectedInstrument, selectedLevel])

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Explore Musicians</h1>
            <p className="mt-2 text-muted-foreground">
              Discover talented musicians in our community and find your next collaborator.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, username, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Instrument" />
              </SelectTrigger>
              <SelectContent>
                {instruments.map((instrument) => (
                  <SelectItem key={instrument} value={instrument}>
                    {instrument === "All" ? "All Instruments" : instrument}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Skill Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "All" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredMusicians.length} musician
            {filteredMusicians.length !== 1 ? "s" : ""}
          </p>

          {/* Musicians Grid */}
          {filteredMusicians.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMusicians.map((musician) => (
                <Link key={musician.id} href={`/profile/${musician.username}`}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={musician.image}
                        alt={musician.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-foreground">
                            {musician.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">@{musician.username}</p>
                        </div>
                        <div className="ml-2 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          <Music className="h-3 w-3" />
                          {musician.instrument}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            musician.level === "Beginner"
                              ? "bg-chart-2/20 text-chart-2"
                              : "bg-chart-1/20 text-chart-1"
                          }`}
                        >
                          {musician.level}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <UserPlus className="h-3 w-3" />
                          {musician.followers} followers
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {musician.bio}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <Music className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No musicians found</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Try adjusting your search or filters to find musicians.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedInstrument("All")
                  setSelectedLevel("All")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
