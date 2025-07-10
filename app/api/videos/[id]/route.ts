import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await connectToDatabase()
  const { id } = await context.params // Await params as required by Next.js

  try {
    const deleted = await Video.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
