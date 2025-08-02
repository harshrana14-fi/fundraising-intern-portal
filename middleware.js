import { NextResponse } from 'next/server';
import { verifyToken } from './lib/utils';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth');
  const isPublic = ['/', '/about', '/contact'].includes(pathname) || isAuthPage;

  if (isPublic) {
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    const response = NextResponse.redirect(new URL('/auth', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
