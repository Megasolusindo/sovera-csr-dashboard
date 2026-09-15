import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for 301 Permanent Redirects:
 * - Redirects www subdomain (www.csrmatics.com) to non-www canonical domain (csrmatics.com) with 301 Permanent Redirect status.
 * - Redirects HTTP requests to HTTPS in production environments.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto");
  const url = request.nextUrl.clone();

  let shouldRedirect = false;

  // 1. Subdomain 301 Redirect: www.csrmatics.com -> csrmatics.com
  if (host.startsWith("www.csrmatics.com")) {
    url.hostname = "csrmatics.com";
    shouldRedirect = true;
  }

  // 2. Protocol 301 Redirect: HTTP -> HTTPS in production
  if (proto === "http" && process.env.NODE_ENV === "production") {
    url.protocol = "https:";
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static asset files (favicon, icons, images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|apple-touch-icon.png|opengraph-image|twitter-image).*)",
  ],
};
