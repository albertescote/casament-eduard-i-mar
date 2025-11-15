"use client";

import Link from "next/link";
import Image from "next/image";

export function Hotel({
  name,
  href,
  imageSrc,
  viewAvailabilityText,
}: {
  name: string;
  href: string;
  imageSrc: string;
  viewAvailabilityText: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border-2 border-stone-200 bg-white hover:border-[#898651] hover:shadow-lg transition-all duration-300"
    >
      {/* Hotel Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Hotel Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-lg text-stone-800 group-hover:text-[#898651] transition-colors">
            {name}
          </h3>
          <svg
            className="w-5 h-5 text-stone-400 group-hover:text-[#898651] flex-shrink-0 transition-colors"
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
        </div>
        <p className="text-sm text-stone-600 mt-2 group-hover:text-stone-700 transition-colors">
          {viewAvailabilityText}
        </p>
      </div>
    </Link>
  );
}
