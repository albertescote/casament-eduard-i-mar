import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { RsvpForm } from "@/app/_components/RsvpForm";

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");

  return (
    <section className="min-h-[80dvh] grid place-items-center py-8">
      <div className="w-full max-w-xl">
        <RsvpForm t={t} />
      </div>
    </section>
  );
}
