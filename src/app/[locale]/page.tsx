"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import type { ca } from "@/i18n/dictionaries/ca";
import type { es } from "@/i18n/dictionaries/es";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
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

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
          className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }}
          className="absolute top-40 right-32 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
        />

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6"
          >
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
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
              src="/venue.jpg"
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
              src="/invitation-1.png"
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
              src="/invitation-2.png"
              alt="Wedding invitation"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* Info Cards Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4"
      >
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 p-8 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full blur-3xl group-hover:bg-gray-200/50 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{t.home.infoTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{t.home.infoText}</p>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 p-8 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full blur-3xl group-hover:bg-gray-200/50 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{t.home.scheduleTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{t.home.scheduleText}</p>
            </div>
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
                src="/save-the-date.jpeg"
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
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
