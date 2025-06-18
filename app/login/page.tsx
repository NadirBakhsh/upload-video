"use client"

import useDebounce from "@/hooks/useDebouncedCallback"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [debouncedEmail, setDebouncedEmail] = useState("")
  const [debouncedPassword, setDebouncedPassword] = useState("")

  const debounceEmail = useDebounce(setDebouncedEmail, 400)
  const debouncePassword = useDebounce(setDebouncedPassword, 400)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    debounceEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    debouncePassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        email: debouncedEmail,
        password: debouncedPassword,
        redirect: false
      })

      if (result?.error) {
        console.log("Login error:", result.error)
        // Handle error appropriately, e.g., show a notification or alert
        throw new Error(result.error)
      } else {
        // Redirect to the home page or dashboard after successful login
        router.push("/")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Invalid email or password")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 bg-black rounded-lg shadow-lg p-8 flex flex-col gap-6"
    >
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Login</h1>
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
