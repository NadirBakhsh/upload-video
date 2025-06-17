// File: app/api/upload-auth/route.ts
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import Video, { IVideo } from "@/models/Video"
import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY as string
    })

    return NextResponse.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY
    })
  } catch (error) {
    console.error("Error generating upload auth params:", error)
    return NextResponse.json(
      { error: "Failed to generate upload auth params" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const body: IVideo = await request.json()
    if (
      !body ||
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }
    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        width: body.transformation?.width ?? 1080,
        height: body.transformation?.height ?? 1920,
        quality: body.transformation?.quality ?? 75
      }
    }

    const newVideo = await Video.create(videoData)
    return NextResponse.json(newVideo, { status: 201 })
  } catch (error) {
    console.error("Error generating upload auth params:", error)
    return NextResponse.json(
      { error: "Failed to generate upload video" },
      { status: 500 }
    )
  }
}
