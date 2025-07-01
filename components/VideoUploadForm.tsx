import React, { useState } from "react"
import FileUpload from "./FileUpload"
import { apiClient } from "@/lib/api-client"

function VideoUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTitleError("")
    setDescriptionError("")
    setSuccessMsg("")
    setErrorMsg("")

    if (!title) setTitleError("Title is required")
    if (!description) setDescriptionError("Description is required")
    if (!selectedFile) {
      setErrorMsg("Please upload a video file.")
      return
    }
    if (!title || !description || !selectedFile) return

    setUploading(true)
    try {
      await apiClient.createVideo({
        title,
        description,
        videoUrl: selectedFile.url,
        thumbnailUrl: selectedFile.thumbnailUrl || "",
        controls: true,
        transformation: {
          width: selectedFile.width || 1080,
          height: selectedFile.height || 1920,
          quality: 75
        }
      })
      setSuccessMsg("Video uploaded and saved successfully!")
      setTitle("")
      setDescription("")
      setSelectedFile(null)
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save video info.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className=" bg-black text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload New Reel</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-400 text-lg font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setTitleError("")
              }}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500 transition duration-300"
              placeholder="Enter title"
            />
            {titleError && (
              <p className="text-red-500 text-sm mt-2">{titleError}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-400 text-lg font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setDescriptionError("")
              }}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500 resize-y transition duration-300"
              placeholder="Enter description"
            ></textarea>
            {descriptionError && (
              <p className="text-red-500 text-sm mt-2">{descriptionError}</p>
            )}
          </div>

          {/* Upload Video Input */}
          <FileUpload
            onSuccess={(res) => setSelectedFile(res)}
            onProgress={(progress: number) => {
              /* handle progress if needed */
            }}
            fileType="video"
          />

          {/* Success/Error Messages */}
          {successMsg && (
            <div className="text-green-400 text-center">{successMsg}</div>
          )}
          {errorMsg && (
            <div className="text-red-500 text-center">{errorMsg}</div>
          )}

          {/* Publish Video Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-700 text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
              disabled={uploading}
            >
              {uploading ? "Publishing..." : "Publish Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideoUploadForm
