"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import type { ca } from "@/i18n/dictionaries/ca";
import type { es } from "@/i18n/dictionaries/es";
import { CopyButton } from "@/app/_components/copyButton";
import { AccordionItem } from "@/app/_components/accordionItem";
import { Hotel } from "@/app/_components/hotel";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Faqs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<string>("ca");
  const [t, setT] = useState<typeof ca | typeof es | null>(null);

  useEffect(() => {
    params.then(({ locale: l }) => {
      setLocale(l);
      setT(getDictionary((l as Locale) ?? "ca"));
    });
  }, [params]);

  if (!t) {
    return null;
  }

  const faqs = [
    {
      id: "iban",
      title: t.faqs.iban.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {t.faqs.iban.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <code className="select-all text-xs font-mono tracking-wide bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm">
              ES00 0000 0000 0000 0000 0000
            </code>
            <CopyButton text="ES00 0000 0000 0000 0000 0000" locale={locale} />
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#ECE9DC]/30 rounded-xl border border-[#898651]">
            <svg
              className="w-5 h-5 text-gray-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-900 font-medium">
              {t.faqs.iban.thanks}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "instagram",
      title: t.faqs.instagram.title,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {t.faqs.instagram.description}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="https://instagram.com/maria.ijoan2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-md group"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                @maria.ijoan2025
              </span>
              <svg
                className="w-4 h-4 text-gray-400 ml-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{t.faqs.instagram.hashtag}</span>
              <code className="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                #MariaiJoan2025
              </code>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "hotels",
      title: t.faqs.hotels.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            {t.faqs.hotels.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Hotel
              name="Hotel Fèlix"
              href="https://felixhotel.net/"
              imageSrc="/felix-hotel.jpg"
              viewAvailabilityText={t.faqs.hotels.viewAvailability}
            />
            <Hotel
              name="B&B HOTEL Tarragona Valls"
              href="https://www.hotel-bb.com/es/hotel/tarragona-valls"
              imageSrc="/bb-hotel.jpg"
              viewAvailabilityText={t.faqs.hotels.viewAvailability}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen py-4 sm:py-16">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
          className="absolute top-32 left-0 w-80 h-80 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ willChange: "transform" }}
          className="absolute bottom-32 right-0 w-96 h-96 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ willChange: "transform" }}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-gray-200/10 rounded-full blur-3xl hidden md:block"
        />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#898651] shadow-lg mb-4">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            {t.faqs.title}
          </h1>
          <div className="w-24 h-1 bg-[#898651] mx-auto rounded-full shadow-sm"></div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid gap-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              index={index + 1}
              title={faq.title}
              icon={faq.icon}
            >
              {faq.content}
            </AccordionItem>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
