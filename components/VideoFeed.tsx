import { IVideo } from "@/models/Video"
import VideoComponent from "./VideoComponent"
import { apiClient } from "@/lib/api-client"
import { useState } from "react"
import { LoaderIcon, Trash2 } from "lucide-react"

interface VideoFeedProps {
  videos: IVideo[]
  onDelete?: (id: string) => void
}

export default function VideoFeed({ videos, onDelete }: VideoFeedProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return
    setDeletingId(id)
    try {
      await apiClient.deleteVideo(id)
      if (onDelete) onDelete(id)
    } catch (err) {
      alert("Failed to delete video")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div key={video._id?.toString()} className="relative">
          <VideoComponent video={video} />
          <button
            onClick={() => handleDelete(video._id?.toString() || "")}
            disabled={deletingId === video._id?.toString()}
            className="absolute bottom-14 right-6 bg-red-500 cursor-pointer hover:bg-red-700 text-white rounded px-2 py-1 text-xs font-semibold shadow transition"
          >
            {deletingId === video._id?.toString() ? <LoaderIcon className="w-4 h-4 inline animate-spin" /> : <Trash2 className="w-4 h-4 inline" />}
          </button>
        </div>
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  )
}
