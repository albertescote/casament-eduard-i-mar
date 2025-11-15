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
      {/* Hero Section - Card Style with Side-by-Side Layout */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="py-12 sm:py-6 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Hero Content */}
            <motion.div
              variants={staggerContainer}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <div className="inline-block px-5 py-2 rounded-full bg-[#898651]/10 border border-[#898651]/20 mb-4">
                  <p className="text-sm sm:text-base font-medium text-[#898651]">
                    {t.home.datePlace}
                  </p>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                {t.home.heroTitle}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-xl lg:max-w-none mx-auto lg:mx-0"
              >
                {t.home.heroLead}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href={`/${locale}/wedding`}
                  className="group inline-flex items-center justify-center rounded-full bg-[#898651] text-white px-8 py-4 text-base font-semibold hover:bg-[#B2AE8B] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
                  className="group inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-8 py-4 text-base font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#D1CDB6]"
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

            {/* Right side - Invitation Card */}
            <motion.div
              variants={scaleIn}
              className="order-1 lg:order-2 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Decorative shadow/backdrop cards */}
                <div className="absolute inset-0 bg-white rounded-xl transform rotate-2 scale-105 opacity-30 group-hover:rotate-3 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white rounded-xl transform -rotate-1 scale-105 opacity-40 group-hover:-rotate-2 transition-transform duration-300" />

                {/* Main invitation card */}
                <div className="relative bg-white rounded-xl shadow-2xl p-5 sm:p-7 transform group-hover:-translate-y-2 transition-all duration-300 max-w-sm sm:max-w-md md:max-w-lg">
                  <Image
                    src="/designs/invitation.png"
                    alt="Wedding Invitation"
                    width={500}
                    height={750}
                    sizes="(min-width: 768px) 500px, 400px"
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Countdown Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-12 px-4"
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
            targetDate={new Date("2026-06-12T17:00:00")}
            labels={t.home.countdown}
          />
        </div>
      </motion.section>

      {/* Our Story Timeline */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 px-4"
      >
        <div className="max-w-5xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#898651] via-[#898651] to-[#898651] transform -translate-x-1/2 hidden md:block" />
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#898651] via-[#898651] to-[#898651] md:hidden" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 2018 - First Meet */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div className="md:text-right md:pr-12 ml-16 md:ml-0">
                  <div className="inline-block md:float-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                      2018
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.home.timeline?.y2018?.title ?? "First Meet"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t.home.timeline?.y2018?.description ??
                        "Where it all began..."}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Right side - Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group ml-16 md:ml-0">
                  <Image
                    src="/couple/couple-1.jpeg"
                    alt="2018"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2019 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Content - First on mobile */}
                <div className="order-1 md:order-2 md:pl-12 ml-16 md:ml-0">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                    2019
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.home.timeline?.y2019?.title ?? "Growing Together"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.home.timeline?.y2019?.description ??
                      "Building our story..."}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Image - Second on mobile */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group order-2 md:order-1 ml-16 md:ml-0 md:mr-12">
                  <Image
                    src="/couple/couple-3.jpeg"
                    alt="2019"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2020 - Milestone */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div className="md:text-right md:pr-12 ml-16 md:ml-0">
                  <div className="inline-block md:float-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                      2020
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.home.timeline?.y2020?.title ?? "Special Moment"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t.home.timeline?.y2020?.description ??
                        "A memorable year together..."}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Right side - Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group ml-16 md:ml-0">
                  <Image
                    src="/couple/couple-5.jpeg"
                    alt="2020"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2021 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Content - First on mobile */}
                <div className="order-1 md:order-2 md:pl-12 ml-16 md:ml-0">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                    2021
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.home.timeline?.y2021?.title ?? "Memorable Moments"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.home.timeline?.y2021?.description ??
                      "Creating memories together..."}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Image - Second on mobile */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group order-2 md:order-1 ml-16 md:ml-0 md:mr-12">
                  <Image
                    src="/couple/couple-7.jpeg"
                    alt="2021"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2022 - Adventure */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div className="md:text-right md:pr-12 ml-16 md:ml-0">
                  <div className="inline-block md:float-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                      2022
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.home.timeline?.y2022?.title ?? "New Adventure"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t.home.timeline?.y2022?.description ??
                        "Exploring new horizons together..."}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Right side - Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group ml-16 md:ml-0">
                  <Image
                    src="/couple/couple-10.jpeg"
                    alt="2022"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2023 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Content - First on mobile */}
                <div className="order-1 md:order-2 md:pl-12 ml-16 md:ml-0">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                    2023
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.home.timeline?.y2023?.title ?? "Together Forever"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.home.timeline?.y2023?.description ??
                      "Strengthening our bond..."}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Image - Second on mobile */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group order-2 md:order-1 ml-16 md:ml-0 md:mr-12">
                  <Image
                    src="/couple/couple-12.jpeg"
                    alt="2023"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2024 - Engagement */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div className="md:text-right md:pr-12 ml-16 md:ml-0">
                  <div className="inline-block md:float-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                      2024
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.home.timeline?.y2024?.title ?? "The Proposal"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t.home.timeline?.y2024?.description ??
                        "The beginning of forever..."}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Right side - Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group ml-16 md:ml-0">
                  <Image
                    src="/couple/couple-14.jpeg"
                    alt="2024"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2025 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Content - First on mobile */}
                <div className="order-1 md:order-2 md:pl-12 ml-16 md:ml-0">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                    2025
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.home.timeline?.y2025?.title ?? "Planning Our Future"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.home.timeline?.y2025?.description ??
                      "Preparing for the big day..."}
                  </p>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 bg-[#898651] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 -translate-x-2" />

                {/* Image - Second on mobile */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group order-2 md:order-1 ml-16 md:ml-0 md:mr-12">
                  <Image
                    src="/couple/couple-18.jpeg"
                    alt="2025"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* 2026 - Wedding */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Left side - Content */}
                <div className="md:text-right md:pr-12 ml-16 md:ml-0">
                  <div className="inline-block md:float-right">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#898651] text-white text-sm font-semibold mb-3">
                      2026
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.home.timeline?.y2026?.title ?? "Our Wedding Day"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t.home.timeline?.y2026?.description ??
                        "Celebrating our love with family and friends..."}
                    </p>
                  </div>
                </div>

                {/* Center dot - Special for wedding */}
                <div className="absolute left-8 md:left-1/2 top-0 w-6 h-6 bg-gradient-to-br from-[#898651] to-[#F5F4EE] rounded-full border-4 border-white shadow-xl transform md:-translate-x-1/2 -translate-x-3 animate-pulse">
                  <div className="absolute inset-0 rounded-full bg-[#898651] animate-ping opacity-75" />
                </div>

                {/* Right side - Image */}
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group ml-16 md:ml-0">
                  <Image
                    src="/couple/couple-15.jpeg"
                    alt="2026 - Wedding"
                    fill
                    sizes="(min-width: 768px) 40vw, 80vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Image Gallery Grid - Collage of Couple */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-12 px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Row 1: Large photo + 2 regular */}
          <motion.div
            variants={scaleIn}
            className="col-span-2 relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-4.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-7.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-14.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 2: 4 regular photos */}
          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-3.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-21.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-11.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-9.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 3: 2 regular + Large photo */}
          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-96 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-5.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-96 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-20.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="col-span-2 relative h-64 md:h-96 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-1.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 4: Full width photo */}
          <motion.div
            variants={scaleIn}
            className="col-span-2 md:col-span-4 relative h-72 md:h-96 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-22.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 5: 4 regular photos */}
          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-8.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-18.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-2.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-19.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 6: Large photo + 2 regular */}
          <motion.div
            variants={scaleIn}
            className="col-span-2 relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-6.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-13.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 md:h-80 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-10.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Row 7: 4 regular photos */}
          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-16.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-15.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-17.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="relative h-64 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/couple/couple-12.jpeg"
              alt="Eduard & Mar"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
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
        className="py-12 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="/castelltallat/venue-2.jpg"
                alt="Save the date"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/80" />
            </div>
            <div className="relative z-10 py-12 px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {t.home.ctaTitle}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t.home.ctaDescription}
              </p>
              <Link
                href={`/${locale}/wedding`}
                className="inline-flex items-center justify-center rounded-full bg-[#898651] text-white px-8 py-4 text-base font-semibold hover:bg-[#B2AE8B] transition-all duration-300 hover:scale-105 shadow-xl"
              >
                {t.home.ctaButton}
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
