import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const videos = await Video.find().sort({ createdAt: -1 })
    return NextResponse.json(videos)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: "Failed to fetch videos", errors: errorMessage }, { status: 500 })
  }
}
