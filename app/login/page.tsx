"use client"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
    // If unauthenticated, do nothing (show form)
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <span className="text-white text-lg">Loading...</span>
      </div>
    )
  }

  if (status === "authenticated") {
    return null
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid email or password")
        return
      } else {
        router.push("/")
      }
    } catch {
      setError("An unexpected error occurred")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 bg-black rounded-lg shadow-lg p-8 flex flex-col gap-6"
    >
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Login</h1>
      {error && (
        <div className="bg-red-700 text-white rounded px-4 py-2 text-center">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
      >
        Login
      </button>
      <p className="text-gray-400 text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}

export default LoginPage
