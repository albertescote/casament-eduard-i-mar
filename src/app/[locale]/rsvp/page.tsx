import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { RsvpForm } from "@/app/_components/RsvpForm";

export default async function RsvpPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return <RsvpForm t={t} />;
}


