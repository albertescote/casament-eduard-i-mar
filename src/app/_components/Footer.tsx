"use client";

import { motion } from "framer-motion";

interface FooterProps {
  text: string;
  followJourney: string;
}

export function Footer({ text, followJourney }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gray-50 mt-20"
    >
      {/* Gradient Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Brand Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 shadow-lg">
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.646 20.86a1 1 0 0 0 .708 0C16.7 19.095 21 15.93 21 11.25 21 8.35 18.9 6 16.25 6A5.3 5.3 0 0 0 12 8.12 5.3 5.3 0 0 0 7.75 6C5.1 6 3 8.35 3 11.25c0 4.68 4.3 7.845 8.646 9.61Z" />
            </svg>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-600 max-w-md">
            {text}
          </p>

          {/* Instagram Link */}
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-800 hover:scale-105"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
              <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
            <span>{followJourney}</span>
          </a>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-gray-200 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2025 Eduard & Mar</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span>Tornar a dalt</span>
              <svg
                className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
