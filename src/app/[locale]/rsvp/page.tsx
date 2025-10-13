import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { RsvpForm } from "@/app/_components/RsvpForm";

export default async function RsvpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "en");
  return <RsvpForm t={t} />;
}


