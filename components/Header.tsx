"use client"

import { Home, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Logout from "./Logout"
import { useNotification } from "./Notification"

export default function Header() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()



  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 py-6">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
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
        <div className="flex rounded-full py-2 items-center justify-end px-4 bg-amber-100">
          <User color="black" className="w-5 h-5" />
          <span className="text-sm font-semibold text-black">
            {session?.user?.email || "User Name"}
          </span>
        </div>
        <div className="px-4">
          {session ? (
            <div className="flex items-center gap-2">
            <Logout />
            <Link className="hover:underline hover:text-indigo-500" href={'/upload'}>Video Upload</Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 hover:underline font-semibold hover:bg-base-200 block w-full"
              onClick={() =>
                showNotification("Please sign in to continue", "info")
              }
            >
              <span className="text-lg">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
