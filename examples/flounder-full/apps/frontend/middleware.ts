import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) && !request.nextUrl.pathname.includes('/api/');

  if (shouldHandleLocale) {
    const response = NextResponse.next();
    response.cookies.set('lang', request.nextUrl.locale);
    return response;
  }
}
