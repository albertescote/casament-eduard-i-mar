import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function SchedulesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const items = t.schedules.items;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.schedules.title}</h1>
      <p className="text-base text-black/70 max-w-2xl">{t.schedules.intro}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&auto=format&fit=crop&w=1200&h=800"
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm mt-1 text-black/70">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


