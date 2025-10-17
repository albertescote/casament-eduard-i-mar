"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";

export function CopyButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const t = getDictionary((locale as Locale) ?? "ca");

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      }}
      className={`inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
        copied
          ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-2 border-stone-300 hover:border-stone-400 bg-white text-stone-700 hover:bg-stone-50"
      }`}
      aria-live="polite"
    >
      {copied ? (
        <>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {t.faqs.iban.copied}
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {t.faqs.iban.copy}
        </>
      )}
    </button>
  );
}
