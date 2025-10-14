import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Locale, locales } from "@/i18n/config";
import { Nav } from "../_components/Nav";
import { getDictionary } from "@/i18n/getDictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduard & Mar · Wedding",
  description:
    "All details, schedule, and RSVP for the wedding of Eduard & Mar.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");
  return (
    <>
      <header className="w-full border-b border-black/10 sticky top-0 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <Nav />
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <footer className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-sm text-black/70 flex items-center justify-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-rose-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.646 20.86a1 1 0 0 0 .708 0C16.7 19.095 21 15.93 21 11.25 21 8.35 18.9 6 16.25 6A5.3 5.3 0 0 0 12 8.12 5.3 5.3 0 0 0 7.75 6C5.1 6 3 8.35 3 11.25c0 4.68 4.3 7.845 8.646 9.61Z" />
            </svg>
          </span>
          {t.footer.text}
        </p>

        <div className="mt-4 flex justify-center">
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black/80 transition
                       hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
              <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
            <span className="font-medium">{t.footer.followJourney}</span>
          </a>
        </div>
      </footer>
    </>
  );
}
