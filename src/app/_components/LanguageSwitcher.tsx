"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale, locales } from "@/i18n/config";

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  // ensure leading slash remains
  if (segments.length > 1) {
    if (isLocale(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
  }
  return segments.join("/") || "/";
}

function getCurrentLocale(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0];
  return maybe && isLocale(maybe) ? (maybe as Locale) : null;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname ?? "/");

  return (
    <div className="relative flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5">
      {locales.map((loc) => {
        const isActive = currentLocale === loc;
        return (
          <Link
            key={loc}
            href={replaceLocaleInPath(pathname ?? "/", loc)}
            className={
              "relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 " +
              (isActive
                ? "bg-[#C46B64] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50")
            }
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
