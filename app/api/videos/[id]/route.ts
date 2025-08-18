import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Video from "@/models/Video"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // <- Promise here
) {
  await connectToDatabase()
  const { id } = await params                             // <- await here

  try {
    const deleted = await Video.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete video", errorData: String(error) },
      { status: 500 }
    )
  }
}
