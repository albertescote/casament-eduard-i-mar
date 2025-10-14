"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [session, setSession] = useState<"unknown" | "ok" | "no">("unknown");
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);

  async function login() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!res.ok) throw new Error("Invalid key");
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
      <section className="space-y-4 max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-black/70">
          Enter the master key to view RSVPs.
        </p>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Master key"
          className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={login}
          disabled={loading || !key}
          className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">RSVPs</h1>
          <p className="text-xs text-black/60 mt-1">
            Total: <span className="font-medium">{totals.total}</span> ·
            Assisteixen:{" "}
            <span className="font-medium">{totals.attendingYes}</span> · No
            venen: <span className="font-medium">{totals.attendingNo}</span> ·
            Bus: <span className="font-medium">{totals.busYes}</span>
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="rounded-md bg-pink-500 text-white px-3 py-2 text-sm font-medium hover:bg-pink-600"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-black/10">
        <table className="min-w-full text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="p-2">Created</th>
              <th className="p-2">Full name</th>
              <th className="p-2">Attending</th>
              <th className="p-2">Bus</th>
              <th className="p-2">Dietary</th>
              <th className="p-2">Allergies</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={r.id} className="border-t border-black/10 align-top">
                <td className="p-2 whitespace-nowrap">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="p-2 whitespace-nowrap">{r.fullName}</td>
                <td className="p-2 whitespace-nowrap">
                  {r.attending ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-red-800">
                      No
                    </span>
                  )}
                </td>
                <td className="p-2 whitespace-nowrap">
                  {r.bus ? "Yes" : "No"}
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-1">
                    {r.vegetarian && (
                      <span className="rounded-full bg-black/10 px-2 py-0.5">
                        Vegetarian
                      </span>
                    )}
                    {r.vegan && (
                      <span className="rounded-full bg-black/10 px-2 py-0.5">
                        Vegan
                      </span>
                    )}
                    {r.celiac && (
                      <span className="rounded-full bg-black/10 px-2 py-0.5">
                        Celiac
                      </span>
                    )}
                    {!r.vegetarian && !r.vegan && !r.celiac && (
                      <span className="text-black/50">—</span>
                    )}
                  </div>
                </td>
                <td className="p-2 min-w-[240px]">
                  {r.allergies?.trim() || (
                    <span className="text-black/40">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
