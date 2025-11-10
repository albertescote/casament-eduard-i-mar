"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";

type Dict = ReturnType<typeof getDictionary>;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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

export function RsvpForm({ t }: { t: Dict }) {
  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [bus, setBus] = useState<"yes" | "no" | null>(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [celiac, setCeliac] = useState(false);
  const [allergies, setAllergies] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          attending,
          bus,
          dietary: {
            vegetarian,
            vegan,
            celiac,
          },
          allergies: allergies || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const disableSubmit =
    submitting || !fullName || attending === null || bus === null;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          {t.rsvp.title}
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          {t.rsvp.lead}
        </p>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6 mx-4 sm:mx-0"
      >
        <div className="flex items-start gap-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl shadow-md">
          <svg
            className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-amber-900 font-medium leading-relaxed">
            {t.rsvp.warningBanner}
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative overflow-hidden rounded-2xl border-2 border-emerald-100 bg-white p-8 shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 shadow-lg flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t.rsvp.submited}
                </h3>
                <p className="text-sm text-gray-700">{t.rsvp.success}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="relative space-y-6 max-w-2xl mx-auto rounded-3xl border-2 border-[#E8DED3] bg-white/90 p-8 shadow-xl"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/30 rounded-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border-2 border-red-100 bg-red-50/50 p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-gray-900 font-medium">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Name */}
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {t.rsvp.fullName}
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.rsvp.fullNamePlaceholder ?? ""}
                    className="w-full rounded-xl border-2 border-[#E8DED3] bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#D4A89F] focus:ring-4 focus:ring-[#E8D5D0]/30 hover:border-[#D4A89F]"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Attending */}
              <motion.fieldset variants={fadeInUp} className="space-y-3">
                <legend className="text-sm font-semibold text-gray-700">
                  {t.rsvp.willAttend}
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  {(["yes", "no"] as const).map((value) => (
                    <motion.label
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: "auto" }}
                      className={`relative flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-4 text-sm font-medium cursor-pointer transition-all ${
                        attending === value
                          ? "border-[#D4A89F] bg-[#E8D5D0]/40 shadow-md"
                          : "border-[#E8DED3] bg-white hover:border-[#D4A89F] hover:shadow-sm"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={value}
                        checked={attending === value}
                        onChange={() => setAttending(value)}
                        className="peer sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                          attending === value
                            ? "border-gray-900 bg-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {attending === value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </div>
                      <span
                        className={
                          attending === value
                            ? "text-gray-900"
                            : "text-gray-700"
                        }
                      >
                        {value === "yes" ? t.rsvp.yes : t.rsvp.no}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.fieldset>

              {/* Bus */}
              <motion.fieldset variants={fadeInUp} className="space-y-3">
                <legend className="text-sm font-semibold text-gray-700">
                  {t.rsvp.busQuestion}
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  {(["yes", "no"] as const).map((value) => (
                    <motion.label
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: "auto" }}
                      className={`relative flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-4 text-sm font-medium cursor-pointer transition-all ${
                        bus === value
                          ? "border-[#D4A89F] bg-[#E8D5D0]/40 shadow-md"
                          : "border-[#E8DED3] bg-white hover:border-[#D4A89F] hover:shadow-sm"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bus"
                        value={value}
                        checked={bus === value}
                        onChange={() => setBus(value)}
                        className="peer sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                          bus === value
                            ? "border-gray-900 bg-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {bus === value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </div>
                      <span
                        className={
                          bus === value ? "text-gray-900" : "text-gray-700"
                        }
                      >
                        {value === "yes" ? t.rsvp.yes : t.rsvp.no}
                      </span>
                    </motion.label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.rsvp.busHelper}
                </p>
              </motion.fieldset>

              {/* Dietary Preferences */}
              <motion.fieldset variants={fadeInUp} className="space-y-3">
                <legend className="text-sm font-semibold text-gray-700">
                  {t.rsvp.dietLabel}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      key: "vegetarian",
                      value: vegetarian,
                      setter: setVegetarian,
                      label: t.rsvp.vegetarian,
                    },
                    {
                      key: "vegan",
                      value: vegan,
                      setter: setVegan,
                      label: t.rsvp.vegan,
                    },
                    {
                      key: "celiac",
                      value: celiac,
                      setter: setCeliac,
                      label: t.rsvp.celiac,
                    },
                  ].map((item) => (
                    <motion.label
                      key={item.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: "auto" }}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-medium cursor-pointer transition-all ${
                        item.value
                          ? "border-[#D4A89F] bg-[#E8D5D0]/40 shadow-sm"
                          : "border-[#E8DED3] bg-white hover:border-[#D4A89F]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.value}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all ${
                          item.value
                            ? "border-gray-900 bg-gray-900"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {item.value && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </div>
                      <span
                        className={
                          item.value ? "text-gray-900" : "text-gray-700"
                        }
                      >
                        {item.label}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.fieldset>

              {/* Allergies */}
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {t.rsvp.allergiesLabel}
                </label>
                <textarea
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  rows={4}
                  placeholder={t.rsvp.allergiesPlaceholder ?? ""}
                  className="w-full rounded-xl border-2 border-[#E8DED3] bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#D4A89F] focus:ring-4 focus:ring-[#E8D5D0]/30 hover:border-[#D4A89F] resize-none"
                />
                <p className="mt-2 text-xs text-gray-500 flex items-start gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.rsvp.allergiesHelper}
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp}>
                <motion.button
                  type="submit"
                  disabled={disableSubmit}
                  whileHover={!disableSubmit ? { scale: 1.02 } : {}}
                  whileTap={!disableSubmit ? { scale: 0.98 } : {}}
                  style={{ willChange: "auto" }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A89F] text-white px-6 py-4 text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:bg-[#C59890] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>{t.rsvp.submitting ?? "Enviant..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.rsvp.submit}</span>
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
