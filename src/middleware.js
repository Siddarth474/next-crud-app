import { NextResponse } from "next/server";

export const middleware = async (request) => {
    const token = await request.cookies.get('token')?.value;
    const url = request.nextUrl;

    if(token && (
        url.pathname.startsWith('/login') ||
        url.pathname.startsWith('/signup')
    )
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (!token && (url.pathname.startsWith('/dashboard') || url.pathname === '/') ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*'
  ]
}