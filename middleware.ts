import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If user is admin and trying to access non-admin pages (except API routes)
    if (token?.role === "admin") {
      // Allow admin to access admin routes and API routes
      if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
        return NextResponse.next();
      }
      // Redirect admin to admin dashboard for all other routes
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Check for admin routes - non-admin users get redirected to home
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Admin routes require admin token
        if (pathname.startsWith("/admin")) {
          return !!token && token.role === "admin";
        }

        // Public routes - always allow
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname.startsWith("/shop") ||
          pathname.startsWith("/product") ||
          pathname.startsWith("/search") ||
          pathname.startsWith("/api")
        ) {
          return true;
        }

        // Protected routes require any valid token
        if (
          pathname.startsWith("/cart") ||
          pathname.startsWith("/checkout") ||
          pathname.startsWith("/wishlist") ||
          pathname.startsWith("/notifications")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp).*)",
  ]
};
