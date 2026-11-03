import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Route handler for /as-csr
 * - Jika user sudah login (sovera_auth_token ada di cookie), /as-csr tidak berfungsi -> redirect ke /dashboard.
 * - Jika belum login, simpan session cookie viewAs=csr dan redirect ke landing page (/).
 */
export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('sovera_auth_token')?.value;

  if (authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('viewAs', 'csr', {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  });

  return response;
}
