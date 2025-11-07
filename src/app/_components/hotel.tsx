"use client";

import Link from "next/link";

export function Hotel({
  name,
  href,
  notes,
}: {
  name: string;
  href: string;
  notes: string;
}) {
  return (
    <div className="group border-2 border-stone-200 rounded-xl p-5 bg-white hover:border-stone-300 hover:shadow-md transition-all">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start justify-between gap-2 mb-2"
      >
        <span className="font-semibold text-stone-800 group-hover:text-gray-900 transition-colors">
          {name}
        </span>
        <svg
          className="w-4 h-4 text-stone-400 group-hover:text-gray-900 flex-shrink-0 mt-0.5 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
      <p className="text-sm text-stone-600">{notes}</p>
    </div>
  );
}
