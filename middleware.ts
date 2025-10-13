import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "./src/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (!locale || !isLocale(locale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};


