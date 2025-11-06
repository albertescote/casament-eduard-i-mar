import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Locale, locales } from "@/i18n/config";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
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
      <header className="w-full border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <Nav />
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer text={t.footer.text} followJourney={t.footer.followJourney} />
    </>
  );
}
