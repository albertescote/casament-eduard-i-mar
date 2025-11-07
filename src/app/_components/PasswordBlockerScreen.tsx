"use client";

import { getDictionary } from "@/i18n/getDictionary";
import { useState } from "react";
import { motion } from "framer-motion";

export function PasswordBlockerScreen({
  t,
}: {
  t: ReturnType<typeof getDictionary>;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else if (res.status === 401) {
        setError(t.enter.invalidPassword);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "Error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-12">
      {/* Background Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-72 h-72 bg-gray-200/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-gray-200/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-auto px-4"
      >
        <form
          onSubmit={onSubmit}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-10 space-y-6"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gray-900 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.646 20.86a1 1 0 0 0 .708 0C16.7 19.095 21 15.93 21 11.25 21 8.35 18.9 6 16.25 6A5.3 5.3 0 0 0 12 8.12 5.3 5.3 0 0 0 7.75 6C5.1 6 3 8.35 3 11.25c0 4.68 4.3 7.845 8.646 9.61Z" />
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {t.enter.enterPassword}
            </h1>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.enter.passwordPlaceholder}
                autoFocus
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all duration-300 focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-6 py-3 text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.enter.submit}...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {t.enter.submit}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
