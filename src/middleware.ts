import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for 301 Permanent Subdomain & Protocol Redirects:
 * - Intercepts any request with a 'www.' subdomain (e.g. www.csrmatics.com or x-forwarded-host: www.csrmatics.com)
 *   and issues an HTTP 301 Permanent Redirect to the non-www canonical domain (https://csrmatics.com).
 * - Enforces HTTPS in production environments via 301 redirect.
 */
export function middleware(request: NextRequest) {
  const rawHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const hostNoPort = rawHost.split(":")[0].toLowerCase();
  const proto = request.headers.get("x-forwarded-proto");

  // 1. WWW to Non-WWW 301 Subdomain Redirect
  if (hostNoPort.startsWith("www.")) {
    const canonicalHost = hostNoPort.replace(/^www\./, "");
    const targetUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${canonicalHost}`
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. HTTP to HTTPS 301 Protocol Redirect (Production)
  if (proto === "http" && process.env.NODE_ENV === "production") {
    const targetUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${hostNoPort}`
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static asset files (favicon, icons, images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|apple-touch-icon.png|opengraph-image|twitter-image).*)",
  ],
};
