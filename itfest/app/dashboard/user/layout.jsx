import SidebarUser from '@/components/dashboard/user/SidebarUser'

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <SidebarUser />
      <main className="flex-1 bg-gray-50 p-6 pt-20 lg:pt-6 min-h-screen">
        {children}
      </main>
    </div>
  )
}
