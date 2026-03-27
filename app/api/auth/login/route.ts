import { NextRequest, NextResponse } from "next/server"
import { findUserByUsername } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      )
    }

    const user = await findUserByUsername(username)

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      )
    }

    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      )
    }

    // Return user data (without password)
    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    )
  }
}
