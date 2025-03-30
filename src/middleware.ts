import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    // Get the JWT token from the request
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup");

    // Redirect authenticated users away from auth pages
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    // Check for protected routes
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Handle role-based access
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Only admin and manager can access /admin
      if (token.role !== "ADMIN" && token.role !== "MANAGER") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Only admin can access /admin/settings
      if (
        req.nextUrl.pathname.startsWith("/admin/settings") &&
        token.role !== "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    // Check for token expiration
    const tokenCreatedAt = token.createdAt as number;
    const tokenMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    if (tokenCreatedAt && Date.now() > tokenCreatedAt + tokenMaxAge) {
      // Token has expired, redirect to sign in
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware on protected routes
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
    "/signin",
    "/signup",
  ],
};
