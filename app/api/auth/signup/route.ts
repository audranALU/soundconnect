import { NextRequest, NextResponse } from "next/server"
import { findUserByUsername, createUser } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      )
    }

    // Validate username
    if (username.length < 3) {
      return NextResponse.json(
        { success: false, error: "Username must be at least 3 characters" },
        { status: 400 }
      )
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        { success: false, error: "Username can only contain letters, numbers, and underscores" },
        { status: 400 }
      )
    }

    // Validate password
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Username already exists" },
        { status: 409 }
      )
    }

    // Create new user (in production, hash password with bcrypt)
    const newUser = await createUser(username, password)

    return NextResponse.json({
      success: true,
      user: {
        username: newUser.username,
        createdAt: newUser.createdAt,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    )
  }
}
