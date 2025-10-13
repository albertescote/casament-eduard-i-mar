"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";

export function RsvpForm({ t }: { t: ReturnType<typeof getDictionary> }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
            className="inline-flex items-center justify-center rounded-md bg-pink-500 text-white px-4 py-2 text-sm font-medium hover:bg-pink-600"
            disabled={!fullName || !email || attending === null}
          >
            {t.rsvp.submit}
          </button>
        </form>
      )}
    </section>
  );
}


