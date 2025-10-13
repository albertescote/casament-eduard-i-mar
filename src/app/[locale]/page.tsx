import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "en");

  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl border border-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/80 via-rose-50/70 to-sky-100/80 pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4 relative z-10">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t.home.heroTitle}</h1>
            <p className="text-base sm:text-lg text-black/70 max-w-xl">{t.home.heroLead}</p>
            <div className="flex gap-3 pt-2">
              <Link href={`/${locale}/schedules`} className="inline-flex items-center justify-center rounded-md bg-pink-500 text-white px-4 py-2 text-sm font-medium hover:bg-pink-600">
                {t.home.ctaSchedule}
              </Link>
              <Link href={`/${locale}/rsvp`} className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">
                {t.home.ctaRsvp}
              </Link>
            </div>
            <p className="text-sm text-black/60">{t.home.datePlace}</p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&auto=format&fit=crop&w=1600&h=1200"
              alt="Wedding flowers"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 p-6 bg-white">
          <h2 className="font-medium">{t.home.infoTitle}</h2>
          <p className="text-sm mt-2 text-black/70">{t.home.infoText}</p>
        </div>
        <div className="rounded-xl border border-black/10 p-6 bg-white">
          <h2 className="font-medium">{t.home.scheduleTitle}</h2>
          <p className="text-sm mt-2 text-black/70">{t.home.scheduleText}</p>
        </div>
      </div>
    </section>
  );
}


