"use client"

import { ChevronDown, Home } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Logout from "./Logout"
import { useNotification } from "./Notification"

export default function Header() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()
  const [dropdownOpen, setDropdownOpen] = useState(false)
 const dropdownRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          <Link
            href="/"
            className="btn btn-ghost flex items-center text-xl gap-2 normal-case font-bold tracking-wide"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-5 h-5" />
            <span className="text-lg">Video Gallery</span>
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center cursor-pointer  gap-2 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200"
          >
        
            <span className="text-sm font-semibold text-black">
              {session?.user?.email || "Get Started"}
            </span>
            <ChevronDown className="w-5 h-5 text-black" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-gray-800 ring-1 py-1 pb-2 ring-black ring-opacity-5 z-50">
              <div className="py-1 text-sm text-white">
                {session ? (
                  <>
                    
                    <Link
                      href="/upload"
                      className="block px-4 py-2 mx-2 mt-2 text-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                      Video Upload
                    </Link>
                    <div className="mt-2 px-2 w-full">
                      <Logout />
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-800 transition"
                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
