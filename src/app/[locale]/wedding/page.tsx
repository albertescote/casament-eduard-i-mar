"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import type { ca } from "@/i18n/dictionaries/ca";
import type { es } from "@/i18n/dictionaries/es";

const VENUE = {
  name: "Castell Tallat",
  address: "Castell Tallat, 43811, Tarragona, Catalunya",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.3420054314406!2d1.2970546761466448!3d41.388378495933516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a405007b32f28f%3A0x74127c3976ff4b97!2sCastell%20Tallat!5e0!3m2!1sca!2snl!4v1760699017192!5m2!1sca!2snl",
  mapsLink: "https://maps.app.goo.gl/K7YNUUc7YyM9GKZF8",
  imageSrc: "/venue.jpg",
  imageAlt: "Castell Tallat exterior",
  transportBusLink: "https://maps.app.goo.gl/9S8svSzJVLrXrnfx5",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function WeddingPage({
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
    <section className="relative min-h-screen bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 -left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 -right-20 w-[32rem] h-[32rem] bg-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-sky-200/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Invitation Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div
            className="relative w-full mx-auto max-w-3xl"
            style={{ aspectRatio: "1 / 1.4142" }}
          >
            <Image
              src="/invitation-1.png"
              alt={t.wedding.scheduleTitle}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </motion.div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
          {/* Venue Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            aria-labelledby="venue"
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 shadow-lg mb-4">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3
                id="venue"
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2"
              >
                {t.wedding.venueTitle}
              </h3>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-teal-100 bg-white">
                  <iframe
                    title={`${VENUE.name} map`}
                    src={VENUE.mapsEmbedUrl}
                    className="h-[400px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Google Maps venue location"
                  />
                </div>

                <div className="relative overflow-hidden rounded-3xl border-2 border-teal-100 bg-white p-8 shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl" />
                  <div className="relative">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">
                      {VENUE.name}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          <span className="font-semibold text-gray-800">
                            {t.wedding.addressLabel}:{" "}
                          </span>
                          {VENUE.address}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-8">
                        {t.wedding.venueDescription}
                      </p>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={VENUE.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition-all hover:shadow-xl hover:shadow-teal-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      {t.wedding.openInMaps}
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative h-[500px] lg:h-full min-h-[400px] overflow-hidden rounded-3xl shadow-xl border-2 border-teal-100"
              >
                <Image
                  src={VENUE.imageSrc}
                  alt={VENUE.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Transport Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            aria-labelledby="transport"
            className="mb-12"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 shadow-lg mb-4">
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3
                id="transport"
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
              >
                {t.wedding.transportTitle}
              </h3>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Bus Card */}
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-3xl border-2 border-teal-100 bg-white p-8 shadow-xl"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-teal-400 to-blue-400 rounded-2xl shadow-lg">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {t.wedding.transportBusTitle}
                    </h4>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {t.wedding.transportBusDescription}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-200 shadow-sm">
                      <span className="font-semibold text-gray-700">
                        {t.wedding.transportBusDeparture}:
                      </span>
                      <span className="text-teal-600 font-bold text-lg">16:30</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200 shadow-sm">
                      <span className="font-semibold text-gray-700">
                        {t.wedding.transportBusReturn}:
                      </span>
                      <span className="text-blue-600 font-bold text-lg">04:00</span>
                    </div>
                    <a
                      href={VENUE.transportBusLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-4 bg-blue-50 rounded-2xl border border-blue-200 hover:border-blue-300 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm text-blue-900 font-medium">
                        {t.wedding.transportBusLocation}
                      </span>
                    </a>
                  </div>

                  <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl">
                    <p className="text-sm text-amber-900 font-medium">
                      {t.wedding.transportBusConfirm}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Parking Card */}
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-3xl border-2 border-blue-100 bg-white p-8 shadow-xl"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-400 rounded-2xl shadow-lg">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {t.wedding.transportParkingTitle}
                    </h4>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {t.wedding.transportParkingDescription}
                  </p>

                  <ul className="space-y-3">
                    {[
                      t.wedding.parkingFeature1,
                      t.wedding.parkingFeature2,
                      t.wedding.parkingFeature3,
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 shadow-sm"
                      >
                        <svg
                          className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
}
