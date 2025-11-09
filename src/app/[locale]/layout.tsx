import type { Metadata } from "next";
import "../globals.css";
import { locales } from "@/i18n/config";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { headers } from "next/headers";

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
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Get current pathname to check if we're on the enter page
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isEnterPage = pathname.endsWith("/enter");

  return (
    <>
      {!isEnterPage && (
        <header className="w-full border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
          <Nav />
        </header>
      )}

      <main
        className={
          isEnterPage ? "" : "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8"
        }
      >
        {children}
      </main>

      {!isEnterPage && <Footer />}
    </>
  );
}
