export const locales = ["ca", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ca";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
