"use client" // This component must be a client component

import { upload } from "@imagekit/next"
import React, { useState } from "react"

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
        signature: auth.authenticationParameters.signature,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100
            onProgress(Math.round(percent))
            setProgress(Math.round(percent))
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
      <div>
        <label className="block text-gray-400 text-lg font-medium mb-2">
          Upload Video
        </label>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="w-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-500 resize-y transition duration-300"
          >
            CHOOSE FILE
            <input
              id="file-upload"
              type="file"
              accept={fileType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <span className="text-gray-400 text-lg">{"fileName"}</span>
        </div>
        <div className="relative">
          {!!progress && (
            <progress
              className="mt-2 w-full"
              value={progress}
              max={100}
            ></progress>
          )}
          {!!progress && progress < 100 && (
            <span className="text-gray-100 text-sm absolute -top-3 right-0">
              Loading...
            </span>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </>
  )
}

export default FileUpload
