import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const videos = await Video.find().sort({ createdAt: -1 })
    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
