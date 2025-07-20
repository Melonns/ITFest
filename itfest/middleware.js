import { NextResponse } from 'next/server'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Redirect ke login jika tidak ada token
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // Decode simple base64 token
    const payload = JSON.parse(atob(token))

    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const userRole = payload.role

    // Proteksi admin: hanya admin yang boleh masuk ke /dashboard/admin/*
    if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url))
    }

    // Proteksi user: hanya user yang boleh masuk ke /dashboard/user/*
    if (pathname.startsWith('/dashboard/user') && userRole !== 'user') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url))
    }

    // Jika semua aman, teruskan
    const response = NextResponse.next()
    response.headers.set('x-user-role', userRole)
    return response
  } catch (err) {
    // Token tidak valid atau expired
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// Tentukan path mana saja yang akan dijalankan oleh middleware ini
export const config = {
  matcher: ['/dashboard/:path*'],
}
