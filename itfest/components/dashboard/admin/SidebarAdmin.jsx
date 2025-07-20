'use client'
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, LayoutDashboard, Users, Star, LogOut } from "lucide-react"

export default function SidebarAdmin() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Definisikan item navigasi dalam sebuah array agar lebih mudah dikelola
  const navItems = [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/testimonials", label: "Testimonials", icon: Star },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 text-gray-800 p-4 flex items-center justify-between z-50 shadow-sm">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Overlay for mobile */}
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
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              // Logika untuk menentukan apakah item aktif
              // Dashboard harus sama persis, halaman lain bisa diawali dengan path-nya
              const isActive = item.href === '/dashboard/admin' 
                                ? pathname === item.href 
                                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md
                      transition-colors font-medium
                      ${isActive
                        ? 'bg-orange-100 text-orange-700' // Gaya untuk link aktif
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Gaya untuk link non-aktif
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
