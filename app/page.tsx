'use client';
import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([])

  const fetchVideos = async () => {
    try {

      const fetchedVideos = await apiClient.getVideos();
      setVideos(fetchedVideos as IVideo[])
      console.log("Fetched videos:", fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [])

  return <div>
    <VideoFeed videos={[]} />
  </div>
}
