import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { CopyButton } from "@/app/_components/copyButton";
import { AccordionItem } from "@/app/_components/accordionItem";
import { Hotel } from "@/app/_components/hotel";

export default async function Faqs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");

  const faqs = [
    {
      id: "iban",
      title: t.faqs.iban.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 leading-relaxed">
            {t.faqs.iban.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <code className="select-all text-xs font-mono tracking-wide bg-stone-100 px-4 py-3 rounded-xl border border-stone-200 shadow-sm">
              ES00 0000 0000 0000 0000 0000
            </code>
            <CopyButton text="ES00 0000 0000 0000 0000 0000" locale={locale} />
          </div>
          <div className="flex items-center gap-2 p-3 bg-rose-50 rounded-xl border border-rose-200">
            <svg
              className="w-5 h-5 text-rose-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-rose-900 font-medium">
              {t.faqs.iban.thanks}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "instagram",
      title: t.faqs.instagram.title,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-stone-700 leading-relaxed">
            {t.faqs.instagram.description}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="https://instagram.com/maria.ijoan2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200 hover:border-pink-300 transition-colors group"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-5 h-5 text-pink-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
                  <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                </svg>
              </div>
              <span className="font-semibold text-stone-800 group-hover:text-pink-600 transition-colors">
                @maria.ijoan2025
              </span>
              <svg
                className="w-4 h-4 text-stone-400 ml-auto"
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
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <span>{t.faqs.instagram.hashtag}</span>
              <code className="font-mono text-pink-600 bg-pink-50 px-2 py-1 rounded">
                #MariaiJoan2025
              </code>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "hotels",
      title: t.faqs.hotels.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <Hotel
            name={t.faqs.hotels.hotel1.name}
            href="https://example.com"
            notes={t.faqs.hotels.hotel1.notes}
          />
          <Hotel
            name={t.faqs.hotels.hotel2.name}
            href="https://example.com"
            notes={t.faqs.hotels.hotel2.notes}
          />
          <Hotel
            name={t.faqs.hotels.hotel3.name}
            href="https://example.com"
            notes={t.faqs.hotels.hotel3.notes}
          />
          <Hotel
            name={t.faqs.hotels.hotel4.name}
            href="https://example.com"
            notes={t.faqs.hotels.hotel4.notes}
          />
        </div>
      ),
    },
    {
      id: "gallery",
      title: t.faqs.gallery.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p className="text-stone-700 leading-relaxed">
            {t.faqs.gallery.description}
          </p>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-900">{t.faqs.gallery.note}</p>
          </div>
        </div>
      ),
    },
    {
      id: "dresscode",
      title: t.faqs.dresscode.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p className="text-stone-700 leading-relaxed">
            {t.faqs.dresscode.description}
          </p>
          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <svg
              className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm text-purple-900">{t.faqs.dresscode.note}</p>
          </div>
        </div>
      ),
    },
    {
      id: "gifts",
      title: t.faqs.gifts.title,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p className="text-stone-700 leading-relaxed">
            {t.faqs.gifts.description}
          </p>
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <svg
              className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-amber-900">{t.faqs.gifts.note}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-stone-800 mb-3">
            {t.faqs.title}
          </h1>
          <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              index={index + 1}
              title={faq.title}
              icon={faq.icon}
            >
              {faq.content}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
