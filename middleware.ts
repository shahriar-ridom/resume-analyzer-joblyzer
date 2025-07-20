import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Since Puter.js handles authentication client-side,
// we'll keep middleware minimal for now
export function middleware(request: NextRequest) {
  // Just allow all requests to pass through
  // Authentication will be handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
