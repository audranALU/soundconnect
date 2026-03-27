import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Users,
  Mic2,
  TrendingUp,
  Video,
  MessageCircle,
  Star,
  ArrowRight,
  Play,
} from "lucide-react"

const features = [
  {
    icon: Mic2,
    title: "Showcase Your Talent",
    description:
      "Upload your performances and let the world hear your music. Build a portfolio that grows with you.",
  },
  {
    icon: Users,
    title: "Connect with Musicians",
    description:
      "Find and connect with other beginner musicians. Collaborate, learn, and grow together.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "See your growth over time with detailed analytics. Celebrate milestones and set new goals.",
  },
  {
    icon: Video,
    title: "Learn from Others",
    description:
      "Watch performances from musicians at all levels. Get inspired and pick up new techniques.",
  },
  {
    icon: MessageCircle,
    title: "Community Support",
    description:
      "Join discussions, ask questions, and get feedback from a supportive community of musicians.",
  },
  {
    icon: Star,
    title: "Get Discovered",
    description:
      "Stand out with your unique style. Get noticed by other musicians, bands, and opportunities.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    instrument: "Guitar",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote:
      "SoundConnect helped me find my first bandmates. The community here is so supportive and encouraging!",
  },
  {
    name: "Marcus Johnson",
    instrument: "Bass",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote:
      "I was shy about sharing my music, but the positive feedback I got here boosted my confidence tremendously.",
  },
  {
    name: "Emily Rodriguez",
    instrument: "Vocals",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote:
      "The upload feature is so simple, and I love seeing my progress tracked over time. Highly recommend!",
  },
]

const featuredMusicians = [
  {
    name: "Alex Kim",
    instrument: "Drums",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Jordan Lee",
    instrument: "Piano",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Taylor Swift",
    instrument: "Guitar",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Chris Morgan",
    instrument: "Vocals",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering Beginner Musicians to Be{" "}
              <span className="text-primary">Seen and Heard</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Showcase your skills, connect with fellow musicians, and take your first steps
              toward getting discovered. Your musical journey starts here.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">
                  <Play className="mr-2 h-4 w-4" />
                  Explore Musicians
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Musicians Preview */}
        <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Featured Musicians</h2>
                <p className="mt-1 text-muted-foreground">
                  Discover talented musicians in our community
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/explore">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {featuredMusicians.map((musician) => (
                <Link
                  key={musician.name}
                  href={`/profile/${musician.name.toLowerCase().replace(" ", "-")}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={musician.image}
                        alt={musician.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground">{musician.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {musician.instrument} &middot; {musician.level}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Button variant="ghost" asChild>
                <Link href="/explore">
                  View all musicians
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything You Need to Grow
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                SoundConnect provides all the tools beginner musicians need to develop their
                skills and build their presence.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border bg-card transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Loved by Musicians
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Hear from musicians who have found their community on SoundConnect.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.instrument}</p>
                      </div>
                    </div>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join thousands of beginner musicians who are growing their skills and building
              connections on SoundConnect.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
