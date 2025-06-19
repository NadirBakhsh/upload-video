import { IVideo } from "./../models/Video"

export type VideoFormData = Omit<IVideo, "_id">

type FetchOptions = {
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
  body?: unknown
  headers?: Record<string, string>
}

class ApiClient {
  private async fetch<T>(endpoint: string, options: FetchOptions): Promise<T> {
    const { method, body, headers = {} } = options

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers
    }

    const response = await fetch(`/api/${endpoint}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: defaultHeaders
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  }

  async getVideos() {
    return await this.fetch("/videos", { method: "GET" })
  }

  async createVideo(videoData: VideoFormData) {
    return await this.fetch("/videos", { method: "POST", body: videoData })
  }
}

export const apiClient = new ApiClient()
