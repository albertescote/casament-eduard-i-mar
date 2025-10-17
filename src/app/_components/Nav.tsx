"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

function getCurrentLocale(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0];
  return maybe && isLocale(maybe) ? (maybe as Locale) : null;
}

export function Nav() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname ?? "/") ?? "ca";
  const t = getDictionary(locale);
  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/wedding`, label: t.nav.wedding },
    { href: `/${locale}/rsvp`, label: t.nav.rsvp },
    { href: `/${locale}/info`, label: t.nav.info },
  ];

  return (
    <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-14 items-center justify-between">
        <Link href={`/${locale}`} className="font-semibold tracking-tight">
          {t.nav.brand}
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "px-3 py-1.5 rounded-full transition-colors " +
                  (active
                    ? "bg-pink-100 text-pink-900 ring-1 ring-pink-200"
                    : "hover:bg-black/5 text-black/80 hover:text-black")
                }
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-2 pl-2 border-l border-black/10">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
