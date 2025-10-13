"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale, isLocale } from "@/i18n/config";

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

export function LanguageSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={replaceLocaleInPath(pathname ?? "/", loc)}
          className="px-2 py-1 rounded-full hover:bg-black/5 text-black/80"
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}


