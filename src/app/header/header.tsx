'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-slate-950 py-1.5 border-b border-gray-700">
      <div className="w-full mx-auto px-4 py-4 flex items-center justify-end space-x-10">
      
        <nav className="hidden md:flex  space-x-6 text-xl font-semibold">
          <Link href="/" className="text-white hover:text-gray-300 transition">Home</Link>
          <Link href="/courses" className="text-white hover:text-gray-300 transition">Courses</Link>
          <Link href="/dashboard" className="text-white hover:text-gray-300 transition">Dashboard</Link>
        </nav>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500">
          <Image
            src="/profile.jpg"
            alt="User"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  )
}
