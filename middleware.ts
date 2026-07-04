import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  const { pathname } = request.nextUrl;

  // Login page ko allow karo
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Agar token nahi hai to login page par bhejo
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Token hai to admin pages allow karo
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};