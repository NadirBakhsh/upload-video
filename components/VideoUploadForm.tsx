import React, { useState } from "react"
import FileUpload from "./FileUpload"

function VideoUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted:", { title, description, selectedFile })
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
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500 transition duration-300"
              placeholder="Enter title"
            />
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
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500 resize-y transition duration-300"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Upload Video Input */}
          <FileUpload
            onSuccess={(res) => setSelectedFile(res)}
            onProgress={(progress: number) => {
              /* handle progress if needed */
            }}
            fileType="video"
          />

          {/* Publish Video Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-700 text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
            >
              Publish Video
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideoUploadForm
