import Image from "next/image";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const VENUE = {
  name: "Castell Tallat",
  address: "Castell Tallat, 43811, Tarragona, Catalunya",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.3420054314406!2d1.2970546761466448!3d41.388378495933516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a405007b32f28f%3A0x74127c3976ff4b97!2sCastell%20Tallat!5e0!3m2!1sca!2snl!4v1760699017192!5m2!1sca!2snl",
  mapsLink: "https://maps.app.goo.gl/K7YNUUc7YyM9GKZF8",
  imageSrc: "/venue.jpg",
  imageAlt: "Castell Tallat exterior",
  transportBusLink: "https://maps.app.goo.gl/9S8svSzJVLrXrnfx5",
};

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary((locale as Locale) ?? "ca");

  return (
    <section className="min-h-screen bg-white">
      <div className="w-full">
        <div
          className="relative w-full mx-auto max-w-3xl"
          style={{ aspectRatio: "1 / 1.4142" }}
        >
          <Image
            src="/invitation-1.png"
            alt={t.wedding.scheduleTitle}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <section aria-labelledby="venue" className="mb-20">
          <h3
            id="venue"
            className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-8 text-center"
          >
            {t.wedding.venueTitle}
          </h3>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-white">
                <iframe
                  title={`${VENUE.name} map`}
                  src={VENUE.mapsEmbedUrl}
                  className="h-[400px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Maps venue location"
                />
              </div>

              <div className="rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-lg">
                <h4 className="text-2xl font-semibold text-stone-800 mb-4">
                  {VENUE.name}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      <span className="font-semibold text-stone-800">
                        {t.wedding.addressLabel}:{" "}
                      </span>
                      {VENUE.address}
                    </p>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed pl-8">
                    {t.wedding.venueDescription}
                  </p>
                </div>
                <a
                  href={VENUE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-800 px-6 py-3.5 text-sm font-semibold text-white hover:bg-stone-700 transition-colors shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  {t.wedding.openInMaps}
                </a>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-full min-h-[400px] overflow-hidden rounded-3xl shadow-xl border-2 border-stone-200">
              <Image
                src={VENUE.imageSrc}
                alt={VENUE.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="transport" className="mb-12">
          <h3
            id="transport"
            className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-8 text-center"
          >
            {t.wedding.transportTitle}
          </h3>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-stone-800">
                  {t.wedding.transportBusTitle}
                </h4>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {t.wedding.transportBusDescription}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200">
                  <span className="font-semibold text-stone-700">
                    {t.wedding.transportBusDeparture}:
                  </span>
                  <span className="text-stone-900 font-bold">16:30</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200">
                  <span className="font-semibold text-stone-700">
                    {t.wedding.transportBusReturn}:
                  </span>
                  <span className="text-stone-900 font-bold">04:00</span>
                </div>
                <a
                  href={VENUE.transportBusLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-4 bg-blue-50 rounded-2xl border border-blue-200"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-blue-900 font-medium">
                    {t.wedding.transportBusLocation}
                  </span>
                </a>
              </div>

              <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl">
                <p className="text-sm text-amber-900 font-medium">
                  {t.wedding.transportBusConfirm}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <svg
                    className="w-7 h-7 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-stone-800">
                  {t.wedding.transportParkingTitle}
                </h4>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                {t.wedding.transportParkingDescription}
              </p>

              <ul className="space-y-3">
                {[
                  t.wedding.parkingFeature1,
                  t.wedding.parkingFeature2,
                  t.wedding.parkingFeature3,
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-stone-200"
                  >
                    <svg
                      className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-stone-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
