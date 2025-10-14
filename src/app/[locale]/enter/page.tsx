import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { PasswordBlockerScreen } from "@/app/_components/PasswordBlockerScreen";

export default async function EnterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");

  return <PasswordBlockerScreen t={t} />;
}
