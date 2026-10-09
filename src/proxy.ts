import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PATH = /^\/(admin|api\/admin)(\/|$)/;

function basicCredentials(request: NextRequest): { user: string; pwd: string } | null {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return null;
  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(':');
    if (sep === -1) return null;
    return { user: decoded.slice(0, sep), pwd: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

function isAdmin(creds: { user: string; pwd: string } | null) {
  const pwd = process.env.ADMIN_PASSWORD;
  return Boolean(pwd && creds && creds.user === (process.env.ADMIN_USER ?? 'admin') && creds.pwd === pwd);
}

function challenge(realm: string) {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${realm}"` },
  });
}

export function proxy(request: NextRequest) {
  const creds = basicCredentials(request);

  // Admin stays protected regardless of SITE_LOCKED, and fails closed when
  // ADMIN_PASSWORD isn't configured.
  if (ADMIN_PATH.test(request.nextUrl.pathname)) {
    return isAdmin(creds) ? NextResponse.next() : challenge('RedTail Admin');
  }

  if (process.env.SITE_LOCKED !== 'true') {
    return NextResponse.next();
  }

  // Admin credentials also open the locked site, so browsing between /admin
  // and the storefront doesn't bounce between two password prompts.
  const siteOk =
    creds && creds.user === process.env.SITE_AUTH_USER && creds.pwd === process.env.SITE_AUTH_PASSWORD;
  if (siteOk || isAdmin(creds)) {
    return NextResponse.next();
  }

  return challenge('RedTail');
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
};
