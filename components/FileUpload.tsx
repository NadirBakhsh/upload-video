"use client" // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload
} from "@imagekit/next"
import React, { useRef, useState } from "react"

interface FileUploadProps {
  onSuccess: (res: any) => void
  onProgress: (progress: number) => void
  fileType: "image" | "video"
}
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file.")
        return false
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video file size should be less than 100MB.")
        return false
      }
      return true
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file || !validateFile(file)) return

    setUploading(true)
    setError(null)

    try {
      const authRes = await fetch("/api/imagekit-auth")
      const auth = await authRes.json()

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100
            onProgress(Math.round(percent))
          }
        }
      })
      onSuccess(res)
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <input
        type="file"
        accept={fileType === "image" ? "image/*" : "video/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading...</span>}
      <br />
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  )
}

export default FileUpload
