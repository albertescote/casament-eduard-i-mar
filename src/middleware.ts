import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./i18n/config";

const COOKIE_NAME = "wedding_auth_d60eeb9b-f82b-4c8a-8d1b-878621647408";
const COOKIE_OK = "ok";

function isPublicPath(pathname: string, locale?: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/assets")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest"
  )
    return true;
  if (/\.[^/]+$/.test(pathname)) return true;

  if (pathname === "/api/auth") return true;

  if (pathname === "/enter") return true;
  if (locale && pathname === `/${locale}/enter`) return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    const authCookie = request.cookies.get(COOKIE_NAME)?.value;
    if (pathname !== "/api/auth" && authCookie !== COOKIE_OK) {
      const url = request.nextUrl.clone();
      url.pathname = "/enter";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (isPublicPath(pathname, isLocale(maybeLocale) ? maybeLocale : undefined)) {
    return NextResponse.next();
  }

  if (!maybeLocale || !isLocale(maybeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  const locale = maybeLocale;

  const authCookie = request.cookies.get(COOKIE_NAME)?.value;
  if (authCookie !== COOKIE_OK) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/enter`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
