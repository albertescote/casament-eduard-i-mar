"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { ca } from "@/i18n/dictionaries/ca";
import type { es } from "@/i18n/dictionaries/es";
import { Countdown } from "@/app/_components/Countdown";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home({
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

  return (
    <div className="space-y-0">
      {/* Hero Section - Full Screen */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-3xl"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hands.jpeg"
            alt="Wedding"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-gray-900/10" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-block px-6 py-2 rounded-full bg-white/90 backdrop-blur-sm mb-6">
              <p className="text-sm font-medium text-gray-900">
                {t.home.datePlace}
              </p>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            {t.home.heroTitle}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-lg"
          >
            {t.home.heroLead}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${locale}/wedding`}
              className="group inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-8 py-4 text-base font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              {t.home.ctaSchedule}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href={`/${locale}/rsvp`}
              className="group inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-8 py-4 text-base font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              {t.home.ctaRsvp}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Countdown Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t.home.countdown.title}
            </h2>
            <p className="text-lg text-gray-600">{t.home.countdown.subtitle}</p>
          </motion.div>
          <Countdown
            targetDate={new Date("2026-07-12T17:00:00")}
            labels={t.home.countdown}
          />
        </div>
      </motion.section>

      {/* Image Gallery Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Large Image Card */}
          <motion.div
            variants={scaleIn}
            className="md:col-span-2 relative h-96 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/image-1.jpeg"
              alt="Wedding venue"
              fill
              sizes="(min-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-bold mb-2">La Celebració</h3>
              <p className="text-lg text-white/90">Un dia inoblidable</p>
            </div>
          </motion.div>

          {/* Medium Image Card */}
          <motion.div
            variants={scaleIn}
            className="relative h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/image-2.jpeg"
              alt="Wedding details"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Medium Image Card */}
          <motion.div
            variants={scaleIn}
            className="relative h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/image-3.jpeg"
              alt="Wedding invitation"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="/venue-2.jpg"
                alt="Save the date"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/80" />
            </div>
            <div className="relative z-10 py-20 px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                No et perdis cap detall
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Descobreix tota la informació sobre el gran dia
              </p>
              <Link
                href={`/${locale}/wedding`}
                className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-8 py-4 text-base font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Veure detalls
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
