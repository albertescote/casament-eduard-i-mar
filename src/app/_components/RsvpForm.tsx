"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";

type Dict = ReturnType<typeof getDictionary>;

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
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
        {t.rsvp.title}
      </h1>
      <p className="text-base text-black/70 max-w-2xl mx-auto text-center">
        {t.rsvp.lead}
      </p>

      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
          <p className="text-sm">{t.rsvp.success}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-lg mx-auto rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
        >
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700 text-sm">
              {error}
            </div>
          ) : null}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">
              {t.rsvp.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.rsvp.fullNamePlaceholder ?? ""}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">{t.rsvp.willAttend}</legend>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition
                ${attending === "yes" ? "border-pink-300 bg-pink-50" : "border-black/15 hover:bg-black/5"}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                  className="accent-pink-500"
                />
                {t.rsvp.yes}
              </label>
              <label
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition
                ${attending === "no" ? "border-pink-300 bg-pink-50" : "border-black/15 hover:bg-black/5"}`}
              >
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                  className="accent-pink-500"
                />
                {t.rsvp.no}
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">
              {t.rsvp.busQuestion}
            </legend>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition
                ${bus === "yes" ? "border-pink-300 bg-pink-50" : "border-black/15 hover:bg-black/5"}`}
              >
                <input
                  type="radio"
                  name="bus"
                  value="yes"
                  checked={bus === "yes"}
                  onChange={() => setBus("yes")}
                  className="accent-pink-500"
                />
                {t.rsvp.yes}
              </label>
              <label
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition
                ${bus === "no" ? "border-pink-300 bg-pink-50" : "border-black/15 hover:bg-black/5"}`}
              >
                <input
                  type="radio"
                  name="bus"
                  value="no"
                  checked={bus === "no"}
                  onChange={() => setBus("no")}
                  className="accent-pink-500"
                />
                {t.rsvp.no}
              </label>
            </div>
            <p className="text-xs text-black/60">{t.rsvp.busHelper}</p>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">{t.rsvp.dietLabel}</legend>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={vegetarian}
                  onChange={(e) => setVegetarian(e.target.checked)}
                  className="accent-pink-500"
                />
                {t.rsvp.vegetarian}
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={vegan}
                  onChange={(e) => setVegan(e.target.checked)}
                  className="accent-pink-500"
                />
                {t.rsvp.vegan}
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={celiac}
                  onChange={(e) => setCeliac(e.target.checked)}
                  className="accent-pink-500"
                />
                {t.rsvp.celiac}
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="allergies" className="block text-sm font-medium">
              {t.rsvp.allergiesLabel}
            </label>
            <textarea
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows={4}
              placeholder={t.rsvp.allergiesPlaceholder ?? ""}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
            />
            <p className="mt-1 text-xs text-black/60">
              {t.rsvp.allergiesHelper}
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-pink-500 text-white px-4 py-2 text-sm font-medium hover:bg-pink-600 disabled:opacity-60"
            disabled={disableSubmit}
          >
            {submitting ? (t.rsvp.submitting ?? "Enviant...") : t.rsvp.submit}
          </button>
        </form>
      )}
    </section>
  );
}
