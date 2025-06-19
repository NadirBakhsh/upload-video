"use client"

import useDebounce from "@/hooks/useDebouncedCallback"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

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
    } catch (error) {
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
        className="w-full py-2 mt-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
      >
        Login
      </button>
      <p className="text-gray-400 text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          Register
        </Link>
      </p>
    </form>
  )
}

export default LoginPage
