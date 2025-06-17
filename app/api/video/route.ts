import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"

export async function GET() {
  try {
    await connectToDatabase()
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

    if(!videos || videos.length === 0) {
      return Response.json([], { status: 200 })
    }

    return Response.json(videos, { status: 200 })
  } catch (error) {
    console.error("Error in video route:", error)
    return Response.json(
      { error: "Failed to fetch videos " },
      { status: 500 }
    )
  }
}
