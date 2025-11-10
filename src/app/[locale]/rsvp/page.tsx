"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { ca } from "@/i18n/dictionaries/ca";
import type { es } from "@/i18n/dictionaries/es";
import { RsvpForm } from "@/app/_components/RsvpForm";

export default function RsvpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [t, setT] = useState<typeof ca | typeof es | null>(null);

  useEffect(() => {
    params.then(({ locale: l }) => {
      setT(getDictionary((l as Locale) ?? "ca"));
    });
  }, [params]);

  if (!t) {
    return null;
  }

  return (
    <section className="relative min-h-[80dvh] py-4 sm:py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ willChange: "transform" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ willChange: "transform" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Decorative Header Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C46B64] shadow-lg mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </motion.div>

          <RsvpForm t={t} />
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
        className="absolute top-32 right-20 w-12 h-12 rounded-full bg-white/10 hidden md:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ willChange: "transform" }}
        className="absolute bottom-40 left-16 w-16 h-16 rounded-full bg-white/10 hidden md:block"
      />
    </section>
  );
}
