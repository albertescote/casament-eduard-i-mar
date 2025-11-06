"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
    {
      href: `/${locale}`,
      label: t.nav.home,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: `/${locale}/wedding`,
      label: t.nav.wedding,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      href: `/${locale}/rsvp`,
      label: t.nav.rsvp,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      href: `/${locale}/info`,
      label: t.nav.info,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div className="flex h-16 items-center justify-between">
        {/* Logo/Brand */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.646 20.86a1 1 0 0 0 .708 0C16.7 19.095 21 15.93 21 11.25 21 8.35 18.9 6 16.25 6A5.3 5.3 0 0 0 12 8.12 5.3 5.3 0 0 0 7.75 6C5.1 6 3 8.35 3 11.25c0 4.68 4.3 7.845 8.646 9.61Z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            {t.nav.brand}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 " +
                  (active
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md shadow-teal-200"
                    : "hover:bg-teal-50 text-gray-700 hover:text-teal-600")
                }
              >
                <span className={active ? "text-white" : "text-teal-500 group-hover:text-teal-600"}>
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}

          <div className="ml-3 pl-3 border-l border-gray-200">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation - Simplified */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    "p-2 rounded-full transition-all duration-300 " +
                    (active
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-teal-50 hover:text-teal-600")
                  }
                  title={link.label}
                >
                  {link.icon}
                </Link>
              );
            })}
          </div>
          <div className="ml-2 pl-2 border-l border-gray-200">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
