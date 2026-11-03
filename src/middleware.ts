import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for 301 Permanent Subdomain/Protocol Redirects & HTTP Canonical Headers:
 * - Intercepts any request with a 'www.' subdomain (e.g. www.csrmatics.com or x-forwarded-host: www.csrmatics.com)
 *   and issues an HTTP 301 Permanent Redirect to the non-www canonical domain (https://csrmatics.com).
 * - Enforces HTTPS in production environments via 301 redirect.
 * - Injects 'Link: <https://csrmatics.com/...>; rel="canonical"' HTTP response headers across all routes.
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

  // 3. User already logged in -> /as-ngo & /as-csr do not function, redirect to /dashboard
  const authToken = request.cookies.get("sovera_auth_token")?.value;
  if (authToken && (request.nextUrl.pathname === "/as-ngo" || request.nextUrl.pathname === "/as-csr")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Cross-persona redirection for /untuk-ngo and /untuk-korporasi based on viewAs cookie
  const viewAs = request.cookies.get("viewAs")?.value;
  if (viewAs === "csr" && request.nextUrl.pathname.startsWith("/untuk-ngo")) {
    return NextResponse.redirect(new URL("/untuk-korporasi", request.url));
  }
  if (viewAs === "ngo" && request.nextUrl.pathname.startsWith("/untuk-korporasi")) {
    return NextResponse.redirect(new URL("/untuk-ngo", request.url));
  }

  const response = NextResponse.next();

  // 5. HTTP Response Canonical Header Injection: Link: <https://csrmatics.com/...>; rel="canonical"
  const canonicalUrl = `https://csrmatics.com${request.nextUrl.pathname}${request.nextUrl.search}`;
  response.headers.set("Link", `<${canonicalUrl}>; rel="canonical"`);

  return response;
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
