'use client'
import { signIn } from 'next-auth/react'

export default function ProLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => signIn('google')}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Connexion Google Pro
      </button>
    </div>
  )
}