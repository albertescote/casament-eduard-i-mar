import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { ca } from "./dictionaries/ca";
import { es } from "./dictionaries/es";

export function getDictionary(locale: Locale) {
  switch (locale) {
    case "ca":
      return ca;
    case "es":
      return es;
    default:
      return en;
  }
}


