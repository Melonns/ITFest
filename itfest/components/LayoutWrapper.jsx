'use client'

import { usePathname } from 'next/navigation'
import LayoutLanding from './LayoutLanding'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const isAuthPage =
    pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')

  const isDashboardPage = pathname.startsWith('/dashboard')

  // Halaman auth dan dashboard tidak pakai Navbar/Footer
  if (isAuthPage || isDashboardPage) {
    return children
  }

  return <LayoutLanding>{children}</LayoutLanding>
}
