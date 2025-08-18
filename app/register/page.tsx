"use client"

import useDebounce from "@/hooks/useDebouncedCallback"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function RegisterPage() {
  const { status } = useSession()
  const router = useRouter()

  // All hooks must be called before any return
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [debouncedEmail, setDebouncedEmail] = useState("")
  const [debouncedPassword, setDebouncedPassword] = useState("")
  const [debouncedConfirmPassword, setDebouncedConfirmPassword] = useState("")

  const debounceEmail = useDebounce(setDebouncedEmail, 400)
  const debouncePassword = useDebounce(setDebouncedPassword, 400)
  const debounceConfirmPassword = useDebounce(setDebouncedConfirmPassword, 400)

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    debounceEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    debouncePassword(e.target.value)
  }
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value)
    debounceConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Use debounced values for validation and submission
    if (debouncedPassword !== debouncedConfirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: debouncedEmail,
          password: debouncedPassword
        })
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }
      router.push("/login")
    } catch {
      alert("An error occurred during registration")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 bg-black rounded-lg shadow-lg p-8 flex flex-col gap-6"
    >
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        Register
      </h1>
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
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-white font-medium">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          className="px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer py-2 mt-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
      >
        Register
      </button>
      <p className="text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}

export default RegisterPage
