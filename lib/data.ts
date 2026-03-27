import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

export interface StoredUser {
  username: string
  password: string
  createdAt: string
}

export interface StoredPost {
  id: string
  username: string
  content: string
  timestamp: string
  likes: number
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  
  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    // File doesn't exist or is invalid, return default
    return defaultValue
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// Users
export async function getUsers(): Promise<StoredUser[]> {
  return readJsonFile<StoredUser[]>("users.json", [])
}

export async function saveUsers(users: StoredUser[]): Promise<void> {
  return writeJsonFile("users.json", users)
}

export async function findUserByUsername(username: string): Promise<StoredUser | undefined> {
  const users = await getUsers()
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase())
}

export async function createUser(username: string, password: string): Promise<StoredUser> {
  const users = await getUsers()
  const newUser: StoredUser = {
    username,
    password,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  await saveUsers(users)
  return newUser
}

// Posts
export async function getPosts(): Promise<StoredPost[]> {
  return readJsonFile<StoredPost[]>("posts.json", [])
}

export async function savePosts(posts: StoredPost[]): Promise<void> {
  return writeJsonFile("posts.json", posts)
}

export async function createPost(username: string, content: string): Promise<StoredPost> {
  const posts = await getPosts()
  const newPost: StoredPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    username,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
  }
  posts.unshift(newPost) // Add to beginning
  await savePosts(posts)
  return newPost
}

export async function getPostsByUsername(username: string): Promise<StoredPost[]> {
  const posts = await getPosts()
  return posts.filter((p) => p.username.toLowerCase() === username.toLowerCase())
}
