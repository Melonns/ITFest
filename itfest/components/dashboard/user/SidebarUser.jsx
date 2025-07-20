'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LayoutDashboard, CreditCard, MessageSquare, LogOut } from 'lucide-react'

export default function SidebarUser() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path) => {
    if (path === '/dashboard/user') {
      return pathname === '/dashboard/user'
    }
    return pathname.startsWith(path)
  }

  const getMenuItemClass = (path) => {
    if (isActive(path)) {
      return "bg-green-100 text-green-700 rounded px-3 py-2 transition-colors flex items-center gap-2 font-medium"
    }
    return "hover:bg-gray-100 text-gray-600 rounded px-3 py-2 transition-colors flex items-center gap-2"
  }

  const getActiveStyle = (path) => {
    if (isActive(path)) {
      return { backgroundColor: '#E8F5E8', color: '#2E7D32' }
    }
    return {}
  }

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 text-gray-800 p-4 flex items-center justify-between z-50 shadow-sm">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">User Panel</h2>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Overlay for mobile - hanya menutupi area di belakang sidebar */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static
        top-0 left-0
        w-64 h-full lg:h-auto
        bg-white text-gray-800 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        z-40 lg:z-auto
        shadow-lg lg:shadow-none
        flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile sidebar header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">User Panel</h2>
          <button onClick={toggleSidebar} className="text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop sidebar header */}
        <div className="hidden lg:block p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">User Panel</h2>
        </div>

        {/* Navigation menu */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/user"
                className={getMenuItemClass('/dashboard/user')}
                onClick={() => setIsOpen(false)}
                style={getActiveStyle('/dashboard/user')}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/user/history"
                className={getMenuItemClass('/dashboard/user/history')}
                onClick={() => setIsOpen(false)}
                style={getActiveStyle('/dashboard/user/history')}
              >
                <CreditCard className="w-5 h-5" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/user/testimoni"
                className={getMenuItemClass('/dashboard/user/testimoni')}
                onClick={() => setIsOpen(false)}
                style={getActiveStyle('/dashboard/user/testimoni')}
              >
                <MessageSquare className="w-5 h-5" />
                Testimoni
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left hover:bg-red-50 hover:text-red-600 rounded px-3 py-2 text-gray-600 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
