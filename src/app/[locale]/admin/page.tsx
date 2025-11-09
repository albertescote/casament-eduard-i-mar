"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/getDictionary";
import { type Locale } from "@/i18n/config";

type Rsvp = {
  id: string;
  createdAt: string;
  fullName: string;
  attending: boolean;
  bus: boolean;
  vegetarian: boolean;
  vegan: boolean;
  celiac: boolean;
  allergies: string | null;
};

export default function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>("ca");
  const [session, setSession] = useState<"unknown" | "ok" | "no">("unknown");
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);

  const t = getDictionary(locale);

  useEffect(() => {
    params.then((p) => setLocale((p.locale as Locale) ?? "ca"));
  }, [params]);

  async function login() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!res.ok) throw new Error(t.admin.invalidKey);
      setSession("ok");
      await fetchRsvps();
    } catch (e) {
      setError((e as Error).message || "Error");
      setSession("no");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRsvps() {
    const res = await fetch("/api/admin/rsvps");
    if (!res.ok) throw new Error("Unauthorized");
    const data = await res.json();
    setRsvps(data.data as Rsvp[]);
  }

  function exportCsv() {
    const headers = [
      "id",
      "createdAt",
      "fullName",
      "attending",
      "bus",
      "vegetarian",
      "vegan",
      "celiac",
      "allergies",
    ];
    const rows = rsvps.map((r) => [
      r.id,
      r.createdAt,
      r.fullName,
      r.attending ? "yes" : "no",
      r.bus ? "yes" : "no",
      r.vegetarian ? "yes" : "no",
      r.vegan ? "yes" : "no",
      r.celiac ? "yes" : "no",
      r.allergies ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((line) =>
        line.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    // Si ja tens cookie de sessió vàlida, es carregarà directament
    fetchRsvps()
      .then(() => setSession("ok"))
      .catch(() => setSession("no"));
  }, []);

  const totals = useMemo(() => {
    const attendingYes = rsvps.filter((r) => r.attending).length;
    const attendingNo = rsvps.length - attendingYes;
    const busYes = rsvps.filter((r) => r.bus).length;
    return { attendingYes, attendingNo, busYes, total: rsvps.length };
  }, [rsvps]);

  if (session !== "ok") {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
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

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#E8DED3] p-8 sm:p-10 space-y-6">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-[#D4A89F] shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {t.admin.title}
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                {t.admin.loginDescription}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && key && login()}
                  placeholder={t.admin.masterKeyPlaceholder}
                  className="w-full rounded-xl border-2 border-[#E8DED3] bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[#D4A89F] focus:ring-4 focus:ring-[#E8D5D0]/30 hover:border-[#D4A89F]"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={login}
                disabled={loading || !key}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A89F] text-white px-6 py-3 text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#C59890] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.admin.signingIn}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    {t.admin.signIn}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-72 h-72 bg-gray-200/10 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200/10 rounded-full blur-3xl -z-10"
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-[#E8DED3] p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D4A89F] shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t.admin.rsvpsTitle}
                </h1>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-600">{t.admin.statsTotal}:</span>
                  <span className="text-sm font-bold text-gray-900">{totals.total}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <span className="text-xs text-gray-600">{t.admin.statsAttending}:</span>
                  <span className="text-sm font-bold text-green-700">{totals.attendingYes}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
                  <span className="text-xs text-gray-600">{t.admin.statsNotAttending}:</span>
                  <span className="text-sm font-bold text-red-700">{totals.attendingNo}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-600">{t.admin.statsBus}:</span>
                  <span className="text-sm font-bold text-gray-900">{totals.busYes}</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D4A89F] text-white px-4 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#C59890]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.admin.exportCsv}
            </motion.button>
          </div>
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-[#E8DED3] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableCreated}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableFullName}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableAttending}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableBus}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableDietary}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{t.admin.tableAllergies}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rsvps.map((r, idx) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="align-top hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 text-xs">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{r.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.attending ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 border border-green-200 px-2.5 py-1 text-xs font-medium text-green-800">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {t.admin.yes}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 border border-red-200 px-2.5 py-1 text-xs font-medium text-red-800">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {t.admin.no}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.bus ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {t.admin.yes}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">{t.admin.no}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {r.vegetarian && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                            🥗 {t.admin.vegetarian}
                          </span>
                        )}
                        {r.vegan && (
                          <span className="inline-flex items-center rounded-full bg-green-100 border border-green-200 px-2 py-0.5 text-xs font-medium text-green-700">
                            🌱 {t.admin.vegan}
                          </span>
                        )}
                        {r.celiac && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700">
                            🌾 {t.admin.celiac}
                          </span>
                        )}
                        {!r.vegetarian && !r.vegan && !r.celiac && (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 min-w-[240px] text-sm text-gray-700">
                      {r.allergies?.trim() || (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
