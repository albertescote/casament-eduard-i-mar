import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function SchedulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");

  return (
    <section className="relative min-h-[100vh]">
      <div className="-z-10 relative">
        <div className="mx-auto w-full max-w-4xl px-4 py-8 flex flex-col items-center gap-6">
          <div
            className="relative w-full"
            style={{ aspectRatio: "1 / 1.4142" }}
          >
            <Image
              src="/invitation-1.png"
              alt="Wedding timetable page 1"
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div
            className="relative w-full"
            style={{ aspectRatio: "1 / 1.4142" }}
          >
            <Image
              src="/invitation-2.png"
              alt="Wedding timetable page 2"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
