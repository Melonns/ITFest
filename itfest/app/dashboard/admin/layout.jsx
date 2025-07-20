import SidebarAdmin from "@/components/dashboard/admin/SidebarAdmin"

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex lg:flex-row">
      <SidebarAdmin />

      {/* Main content area */}
      <main className="flex-1 bg-gray-50 p-4 pt-20 lg:pt-6 min-h-screen">{children}</main>
    </div>
  )
}
