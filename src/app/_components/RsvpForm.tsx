"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";

export function RsvpForm({ t }: { t: ReturnType<typeof getDictionary> }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
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
          email,
          attending: attending === "yes" ? "yes" : "no",
          notes: notes || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.rsvp.title}</h1>
      <p className="text-base text-black/70 max-w-2xl">{t.rsvp.lead}</p>

      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
          <p className="text-sm">{t.rsvp.success}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg rounded-xl border border-black/10 bg-white p-4">
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700 text-sm">{error}</div>
          ) : null}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">{t.rsvp.fullName}</label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">{t.rsvp.email}</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <span className="block text-sm font-medium">{t.rsvp.willAttend}</span>
            <div className="mt-1 flex gap-4">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                />
                {t.rsvp.yes}
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                {t.rsvp.no}
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium">{t.rsvp.notes}</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-pink-500 text-white px-4 py-2 text-sm font-medium hover:bg-pink-600 disabled:opacity-60"
            disabled={submitting || !fullName || !email || attending === null}
          >
            {submitting ? "Submitting..." : t.rsvp.submit}
          </button>
        </form>
      )}
    </section>
  );
}


