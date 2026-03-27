import { NextRequest, NextResponse } from "next/server"
import { getPosts, createPost } from "@/lib/data"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, content } = await request.json()

    if (!username) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to post" },
        { status: 401 }
      )
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: "Post content is required" },
        { status: 400 }
      )
    }

    const newPost = await createPost(username, content.trim())

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    )
  }
}
