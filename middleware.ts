import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        // Public routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) return true;

        // Require auth for /upload
        if (pathname.startsWith("/upload")) {
          return !!token;
        }

        // Allow public access to home and videos
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        
        // Default: require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXT_AUTH_SECRET, // Ensure this is set
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};