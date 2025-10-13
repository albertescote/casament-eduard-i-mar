import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "./_components/Nav";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "All details, schedule, and RSVP for the wedding of Eduard & Mar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black`}>
        <header className="w-full border-b border-black/10 sticky top-0 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <Nav />
        </header>
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 text-xs text-black/60">
          <p>© {new Date().getFullYear()} Eduard & Mar</p>
        </footer>
      </body>
    </html>
  );
}
