"use client"

import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { useNotification } from "./Notification"

export default function Logout() {
  const { showNotification } = useNotification()
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch {
      showNotification("Failed to sign out", "error")
    }
  }

  return (
    <button
      className="bg-amber-700 hover:bg-amber-800 cursor-pointer w-full px-4 text-sm font-semibold py-2 rounded-sm flex items-center gap-1"
      onClick={handleSignOut}
    >
      <LogOutIcon size={20} />
      <span>Logout</span>
    </button>
  )
}
