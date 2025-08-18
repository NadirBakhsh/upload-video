"use client"
import VideoFeed from "@/components/VideoFeed"
import { IVideo } from "@/models/Video"
import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await apiClient.getVideos() as IVideo[]
        setVideos(data)
      } catch {
        setError("Failed to load videos")
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v._id?.toString() !== id))
  }

  return (
    <div className="container mx-auto">
      {loading && <div className="text-center py-8 text-gray-400">Loading videos...</div>}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      {!loading && <VideoFeed videos={videos} onDelete={handleDelete} />}
    </div>
  )
}
