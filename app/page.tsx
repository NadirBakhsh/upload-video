'use client';
import VideoFeed from "@/components/VideoFeed";
import { IVideo } from "@/models/Video";
import { useState } from "react";
export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([])

  return <div>
    <VideoFeed videos={videos} />
   
  </div>
}
