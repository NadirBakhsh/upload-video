import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase()
  const id = params.id
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
