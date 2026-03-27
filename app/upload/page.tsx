"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, Video, Link as LinkIcon, X, CheckCircle } from "lucide-react"

const instruments = ["Guitar", "Piano", "Drums", "Bass", "Vocals", "Violin", "Flute", "Other"]
const levels = ["Beginner", "Intermediate", "Advanced"]

function UploadContent() {
  const { user } = useAuth()
  const [uploadType, setUploadType] = useState<"file" | "link">("file")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    instrument: "",
    level: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate upload (mock submission as per requirements)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const resetForm = () => {
    setFile(null)
    setFormData({
      title: "",
      description: "",
      link: "",
      instrument: "",
      level: "",
    })
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />

        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <Card className="max-w-md text-center">
            <CardContent className="pt-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/20">
                <CheckCircle className="h-8 w-8 text-chart-2" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">Upload Successful!</h2>
              <p className="mt-2 text-muted-foreground">
                Your performance has been uploaded and is now being processed. It will appear on
                your profile shortly.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button onClick={resetForm}>Upload Another</Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Upload Performance</h1>
            <p className="mt-2 text-muted-foreground">
              Share your music with the community, {user?.username}. Upload a video or audio recording of your
              performance.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Performance Details</CardTitle>
                <CardDescription>
                  Fill in the details about your performance to help others discover it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Give your performance a title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about this performance..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Upload Type Toggle */}
                <div className="space-y-4">
                  <Label>Upload Method *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={uploadType === "file" ? "default" : "outline"}
                      onClick={() => setUploadType("file")}
                      className="flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                    <Button
                      type="button"
                      variant={uploadType === "link" ? "default" : "outline"}
                      onClick={() => setUploadType("link")}
                      className="flex-1"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Paste Link
                    </Button>
                  </div>
                </div>

                {/* File Upload */}
                {uploadType === "file" && (
                  <div className="space-y-2">
                    <Label>Video/Audio File *</Label>
                    <div
                      className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {file ? (
                        <div className="flex items-center justify-center gap-3">
                          <Video className="h-8 w-8 text-primary" />
                          <div className="text-left">
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setFile(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Drag and drop your file here, or{" "}
                            <label className="cursor-pointer text-primary hover:underline">
                              browse
                              <input
                                type="file"
                                className="hidden"
                                accept="video/*,audio/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            MP4, MOV, MP3, WAV up to 500MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Link Input */}
                {uploadType === "link" && (
                  <div className="space-y-2">
                    <Label htmlFor="link">Video/Audio Link *</Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports YouTube, Vimeo, SoundCloud, and direct file links
                    </p>
                  </div>
                )}

                {/* Instrument */}
                <div className="space-y-2">
                  <Label htmlFor="instrument">Instrument *</Label>
                  <Select
                    value={formData.instrument}
                    onValueChange={(value) => setFormData({ ...formData, instrument: value })}
                  >
                    <SelectTrigger id="instrument">
                      <SelectValue placeholder="Select instrument" />
                    </SelectTrigger>
                    <SelectContent>
                      {instruments.map((instrument) => (
                        <SelectItem key={instrument} value={instrument}>
                          {instrument}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div className="space-y-2">
                  <Label htmlFor="level">Skill Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload Performance"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadContent />
    </ProtectedRoute>
  )
}
