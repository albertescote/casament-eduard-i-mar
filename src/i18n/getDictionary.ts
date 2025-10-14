import type { Locale } from "./config";
import { ca } from "./dictionaries/ca";
import { es } from "./dictionaries/es";

export function getDictionary(locale: Locale) {
  switch (locale) {
    case "es":
      return es;
    default:
      return ca;
  }
}
