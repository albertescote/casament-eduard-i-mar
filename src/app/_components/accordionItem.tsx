"use client";

import { useState } from "react";

export function AccordionItem({
  index,
  title,
  icon,
  children,
}: {
  index: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const regionId = `faq-region-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        id={buttonId}
        aria-controls={regionId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className={`p-3 rounded-xl transition-colors ${open ? "bg-[#D4A89F] text-white" : "bg-stone-100 text-stone-600"}`}
        >
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-stone-400 font-semibold">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-lg font-semibold text-stone-800">
              {title}
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all ${
            open
              ? "bg-gray-100 border-gray-300 text-gray-900 rotate-180"
              : "bg-white border-stone-300 text-stone-600"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        id={regionId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="px-6 pb-6 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
