'use client'

import Link from 'next/link'
import { LayoutDashboard, Ticket, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold">Zendesk Clone</h1>
        </div>
        <nav className="mt-6">
          <Link 
            href="/protected/dashboard"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            href="/protected/tickets"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Ticket className="w-5 h-5 mr-3" />
            Tickets
          </Link>
          <Link 
            href="/protected/settings"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
          <button 
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
} 