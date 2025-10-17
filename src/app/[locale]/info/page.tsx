"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function InfoPage() {
  type Item = {
    id: string;
    title: string;
    category: "logistics" | "gifts" | "practical";
    content: React.ReactNode;
  };

  const items: Item[] = useMemo(
    () => [
      {
        id: "schedule",
        title: "Horari del dia",
        category: "logistics",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <div className="grid gap-3">
              <TimelineItem
                time="17:00"
                event="Arribada i benvinguda"
                detail="Còctel de benvinguda al jardí"
              />
              <TimelineItem
                time="18:00"
                event="Cerimònia"
                detail="Durada aprox. 30 minuts"
              />
              <TimelineItem
                time="18:45"
                event="Sessió de fotos"
                detail="Aprofiteu per felicitar-nos!"
              />
              <TimelineItem
                time="19:30"
                event="Aperitiu"
                detail="Còctel i canapès"
              />
              <TimelineItem
                time="21:00"
                event="Sopar"
                detail="Amb música en directe"
              />
              <TimelineItem
                time="23:30"
                event="Pastís i ball"
                detail="Primera dansa i obertura de pista"
              />
              <TimelineItem
                time="00:00"
                event="Festa"
                detail="DJ fins a la matinada"
              />
            </div>
            <p className="text-xs text-black/60 pt-2 border-t border-black/10">
              *L'horari és orientatiu i pot variar lleugerament
            </p>
          </div>
        ),
      },
      {
        id: "location",
        title: "Com arribar i aparcar",
        category: "logistics",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <div>
              <h4 className="font-medium mb-2 text-black">📍 Ubicació</h4>
              <p className="mb-2">
                Masia Cal Bolet, Camí de la Font, s/n
                <br />
                08430 La Roca del Vallès, Barcelona
              </p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 underline underline-offset-2"
              >
                Veure al mapa
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-black">🚗 Parking</h4>
              <p>
                Hi ha parking gratuït a la mateixa masia amb capacitat per a
                tots els convidats. Seguiu les indicacions del personal a
                l'entrada.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-black">
                🚕 Transport públic i alternatives
              </h4>
              <p>
                Si veniu de Barcelona, la millor opció és cotxe compartit o
                taxi. Estem organitzant autobusos des de punts cèntrics —
                confirmeu-nos si us interessa a l'RSVP.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "dress-code",
        title: "Codi de vestimenta",
        category: "practical",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              El codi de vestimenta és{" "}
              <strong className="text-black">formal/elegant</strong>. Penseu en
              vestits llargs, abrics i conjunts festius. És un esdeveniment a
              l'aire lliure i interior.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-black/10 p-4 bg-gradient-to-br from-pink-50/30 to-white">
                <h4 className="font-medium mb-2 text-black">
                  💃 Recomanacions
                </h4>
                <ul className="space-y-1 text-xs text-black/70">
                  <li>• Sabates còmodes (hi haurà ball!)</li>
                  <li>• Jaqueta lleugera per la nit</li>
                  <li>• Colors benvinguts i animats</li>
                </ul>
              </div>

              <div className="border border-black/10 p-4 bg-gradient-to-br from-sky-50/30 to-white">
                <h4 className="font-medium mb-2 text-black">
                  🚫 Millor evitar
                </h4>
                <ul className="space-y-1 text-xs text-black/70">
                  <li>• Blanc (reservat per la núvia)</li>
                  <li>• Texans o roba esportiva</li>
                  <li>• Tacons molt alts (terreny irregular)</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-black/60 pt-2">
              En cas de dubte, qualsevol cosa que portaríeu a un casament
              elegant és perfecte!
            </p>
          </div>
        ),
      },
      {
        id: "accommodations",
        title: "Allotjament recomanat",
        category: "logistics",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              Si veniu de fora o preferiu quedar-vos, aquí teniu algunes opcions
              properes a la masia, amb preus i estils per a tots els gustos:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              <Hotel
                name="Hotel Masia Vallès"
                href="https://example.com"
                distance="A 3 km de la masia"
                price="€€€"
                contact="+34 935 555 111"
              />
              <Hotel
                name="B&B Can Carles"
                href="https://example.com"
                distance="A 5 km, entorn rural"
                price="€€"
                contact="info@cancarles.cat"
              />
              <Hotel
                name="Apartaments Roca"
                href="https://example.com"
                distance="Al centre del poble"
                price="€€"
                contact="www.apartamentsroca.com"
              />
              <Hotel
                name="Hotel Els Jardins"
                href="https://example.com"
                distance="A 7 km, amb spa"
                price="€€€€"
                contact="+34 935 555 222"
              />
            </ul>
            <p className="text-xs text-black/60 pt-2">
              💡 Si reserveu aviat, hi ha més disponibilitat. Podeu mencionar
              que veniu a la boda!
            </p>
          </div>
        ),
      },
      {
        id: "gifts",
        title: "Llista de casament",
        category: "gifts",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              El millor regal és compartir aquest dia amb nosaltres. Però si
              voleu tenir un detall, hem preparat diferents opcions perquè trieu
              la que més us faci sentit:
            </p>

            <div className="space-y-3">
              <GiftOption
                icon="🏖️"
                title="Contribució a la lluna de mel"
                description="Ens ajudarà a crear records meravellosos al nostre viatge"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-3">
                  <code className="select-all text-[11px] font-mono tracking-wide bg-black/5 px-2.5 py-1.5 border border-black/10">
                    ES91 2100 0418 4502 0005 1332
                  </code>
                  <CopyButton text="ES91 2100 0418 4502 0005 1332" />
                </div>
                <Link
                  href="/honeymoon"
                  className="inline-flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 underline underline-offset-2 mt-2"
                >
                  Més detalls del viatge →
                </Link>
              </GiftOption>

              <GiftOption
                icon="🎁"
                title="Llista a El Corte Inglés"
                description="Hem escollit algunes coses pràctiques per la llar"
              >
                <Link
                  href="https://example.com"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-sm text-black border border-black/10 px-3 py-2 mt-2 hover:bg-black/5"
                >
                  Veure llista
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </GiftOption>
            </div>

            <p className="text-xs text-black/60 pt-2 border-t border-black/10">
              No us sentiu obligats a res — només la vostra presència és
              suficient! ❤️
            </p>
          </div>
        ),
      },
      {
        id: "children",
        title: "Nens i famílies",
        category: "practical",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              Tots els nens són benvinguts! Sabem que per algunes famílies és
              més fàcil venir amb els petits, així que hem preparat algunes
              coses:
            </p>

            <div className="space-y-2 pl-4 border-l-2 border-pink-200">
              <p>
                🍕 <strong>Menú infantil:</strong> Confirmeu-nos l'edat dels
                nens a l'RSVP per adaptar el menú
              </p>
              <p>
                🎨 <strong>Zona de jocs:</strong> Taulets amb activitats i
                joguines al jardí
              </p>
              <p>
                👶 <strong>Espai per a nadons:</strong> Hi ha una sala
                tranquil·la per canviar bolquers o fer una becaina
              </p>
              <p>
                🍼 <strong>Escalfar biberons:</strong> Demaneu-ho al personal,
                us ajudaran encantats
              </p>
            </div>

            <p className="text-xs text-black/60 pt-2">
              Si teniu necessitats específiques o dubtes, escriviu-nos. Volem
              que tothom se senti còmode!
            </p>
          </div>
        ),
      },
      {
        id: "dietary",
        title: "Dietes i al·lèrgies",
        category: "practical",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              El menú inclou opcions per a diferents preferències i necessitats
              alimentàries. És molt important que ens informeu de qualsevol
              al·lèrgia, intoleància o dieta especial:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="border border-black/10 p-3 bg-green-50/30">
                <p className="text-xs font-medium text-black mb-1">
                  ✓ Opcions disponibles
                </p>
                <ul className="text-xs text-black/70 space-y-0.5">
                  <li>• Vegetarià</li>
                  <li>• Vegà</li>
                  <li>• Sense gluten (celíacs)</li>
                  <li>• Sense lactosa</li>
                </ul>
              </div>

              <div className="border border-black/10 p-3 bg-amber-50/30">
                <p className="text-xs font-medium text-black mb-1">
                  ⚠️ Molt important
                </p>
                <ul className="text-xs text-black/70 space-y-0.5">
                  <li>• Informeu-nos abans del 15 de juny</li>
                  <li>• Especifiqueu al·lèrgies greus</li>
                  <li>• Un menú per persona</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-black/60">
              Podeu indicar-ho al formulari RSVP o enviar-nos un missatge
              directament. El càtering està informat i preparat!
            </p>
          </div>
        ),
      },
      {
        id: "photos",
        title: "Fotos i xarxes socials",
        category: "practical",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              Tindrem fotògraf i videògraf professionals, però ens encantarà
              veure les vostres fotos! Compartiu els millors moments amb
              nosaltres:
            </p>

            <div className="flex flex-wrap items-center gap-3 p-4 border border-black/10 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs text-black/60 mb-1">
                  Etiqueteu-nos o useu el hashtag:
                </p>
                <div className="flex items-center gap-2">
                  <InstagramIcon className="h-5 w-5 text-pink-600" />
                  <Link
                    href="https://instagram.com/maria.ijoan2025"
                    target="_blank"
                    className="font-medium text-black hover:text-pink-600"
                  >
                    @maria.ijoan2025
                  </Link>
                </div>
                <p className="text-sm font-medium mt-2 font-mono text-pink-600">
                  #MariaiJoan2025
                </p>
              </div>
            </div>

            <div className="text-xs text-black/60 space-y-2 pt-2 border-t border-black/10">
              <p>
                📸 <strong>Cerimònia:</strong> Us demanem que guardeu els mòbils
                durant els 30 minuts de cerimònia. El fotògraf capturarà tot!
              </p>
              <p>
                📱 <strong>Resta del dia:</strong> Feu totes les fotos que
                vulgueu i compartiu-les. Crearem un àlbum compartit després.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "weather",
        title: "Temps i contingències",
        category: "logistics",
        content: (
          <div className="space-y-4 text-sm leading-relaxed text-black/80">
            <p>
              La celebració és principalment a l'exterior, però tenim plans B
              per si el temps no acompanya:
            </p>

            <div className="space-y-2 pl-4 border-l-2 border-sky-200">
              <p>
                ☀️ <strong>Si fa sol:</strong> Gaudiu del jardí! Hi haurà ombres
                i ventiladors
              </p>
              <p>
                🌧️ <strong>Si plou:</strong> Tenim carpes i espais coberts
                preparats
              </p>
              <p>
                ❄️ <strong>Si fa fred:</strong> Estufes d'exterior i mantes
                disponibles
              </p>
            </div>

            <p className="text-xs text-black/60 pt-2">
              El lloc està preparat per qualsevol meteorologia. La festa no
              s'atura! 🎉
            </p>
          </div>
        ),
      },
    ],
    [],
  );

  const [openIds, setOpenIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Header />

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid gap-4">
        {filteredItems.map((it, i) => {
          const isOpen = openIds.includes(it.id);
          return (
            <AccordionCard
              key={it.id}
              index={i + 1}
              title={it.title}
              isOpen={isOpen}
              onToggle={() => toggle(it.id)}
              regionId={`region-${it.id}`}
              buttonId={`button-${it.id}`}
            >
              {it.content}
            </AccordionCard>
          );
        })}
      </div>

      <QuickLinks />
      <FooterNote />
    </section>
  );
}

/* ---------------- UI Components ---------------- */

function Header() {
  return (
    <div className="relative overflow-hidden border border-black/10 bg-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-white to-sky-50/40 pointer-events-none" />
      <div className="relative z-10 p-8 sm:p-10">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-pink-600 mb-3">
          <span className="w-8 h-px bg-pink-300" />
          INFORMACIÓ PRÀCTICA
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-black mb-2">
          Tot el que necessiteu saber
        </h1>
        <p className="text-sm text-black/60 max-w-2xl leading-relaxed">
          Hem recopilat tota la informació important perquè pugueu gaudir del
          dia sense preocupacions. Si falta alguna cosa, no dubteu en
          preguntar-nos!
        </p>
      </div>
    </div>
  );
}

function FilterBar({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (f: string) => void;
}) {
  const filters = [
    { id: "all", label: "Tot", icon: "📋" },
    { id: "logistics", label: "Logística", icon: "🗺️" },
    { id: "practical", label: "Pràctic", icon: "✨" },
    { id: "gifts", label: "Regals", icon: "🎁" },
  ];

  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={[
            "px-4 py-2 text-sm font-medium transition-all",
            "border border-black/10",
            filter === f.id
              ? "bg-black text-white"
              : "bg-white text-black/70 hover:bg-black/5",
          ].join(" ")}
        >
          <span className="mr-1.5">{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="border border-black/10 p-6 bg-gradient-to-br from-amber-50/30 to-white">
      <h3 className="font-medium text-black mb-4">⚡ Enllaços ràpids</h3>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <Link
          href="/rsvp"
          className="flex items-center gap-2 text-black/70 hover:text-pink-600"
        >
          <span>→</span> Confirmar assistència (RSVP)
        </Link>
        <Link
          href="/honeymoon"
          className="flex items-center gap-2 text-black/70 hover:text-pink-600"
        >
          <span>→</span> Viatge de lluna de mel
        </Link>
        <Link
          href="/gallery"
          className="flex items-center gap-2 text-black/70 hover:text-pink-600"
        >
          <span>→</span> Galeria de fotos
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 text-black/70 hover:text-pink-600"
        >
          <span>→</span> Contactar-nos
        </Link>
      </div>
    </div>
  );
}

function FooterNote() {
  return (
    <div className="text-center text-xs text-black/50 pt-4 space-y-1">
      <p>Tens algun dubte que no hem respost aquí?</p>
      <p>
        <Link href="/contact" className="underline hover:text-black/70">
          Envia'ns un missatge
        </Link>{" "}
        i t'ajudarem encantats ✨
      </p>
    </div>
  );
}

function AccordionCard(props: {
  index: number;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  regionId: string;
  buttonId: string;
  children: React.ReactNode;
}) {
  const { index, title, isOpen, onToggle, regionId, buttonId, children } =
    props;

  return (
    <div className="bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow">
      <button
        id={buttonId}
        aria-controls={regionId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className={[
          "group w-full text-left px-5 sm:px-6 py-5",
          "flex items-center gap-4",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2",
          "transition-colors",
          isOpen ? "bg-pink-50/30" : "hover:bg-black/[0.02]",
        ].join(" ")}
      >
        <span
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center",
            "font-mono text-xs border transition-all",
            isOpen
              ? "border-pink-400 bg-pink-100 text-pink-700"
              : "border-black/10 bg-white text-black/60",
          ].join(" ")}
        >
          {String(index).padStart(2, "0")}
        </span>

        <span className="flex-1 font-medium text-black">{title}</span>

        <span
          className={[
            "flex h-9 w-9 items-center justify-center border transition-all",
            isOpen
              ? "border-pink-400 bg-pink-100 text-pink-700 rotate-180"
              : "border-black/10 bg-white text-black/40 rotate-0",
          ].join(" ")}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        id={regionId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="px-5 sm:px-6 pb-6 pt-2">{children}</div>
        </div>
      </div>

      {isOpen && (
        <div className="h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400" />
      )}
    </div>
  );
}

function TimelineItem({
  time,
  event,
  detail,
}: {
  time: string;
  event: string;
  detail: string;
}) {
  return (
    <div className="flex gap-4 pb-3 border-b border-black/5 last:border-0">
      <time className="font-mono text-xs font-medium text-pink-600 w-14 shrink-0 pt-0.5">
        {time}
      </time>
      <div className="flex-1">
        <p className="font-medium text-black">{event}</p>
        <p className="text-xs text-black/60 mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

function Hotel({
  name,
  href,
  distance,
  price,
  contact,
}: {
  name: string;
  href: string;
  distance: string;
  price: string;
  contact: string;
}) {
  return (
    <li className="border border-black/10 p-4 hover:border-pink-300 transition-colors bg-white">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link
          href={href}
          target="_blank"
          className="font-medium text-black hover:text-pink-600 flex items-center gap-1"
        >
          {name}
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
        <span className="text-xs text-black/50">{price}</span>
      </div>
      <div className="text-xs text-black/60">{distance}</div>
      <div className="text-xs text-black/70 mt-1">{contact}</div>
    </li>
  );
}

function GiftOption({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/10 p-4 bg-white">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h4 className="font-medium text-black">{title}</h4>
          <p className="text-xs text-black/60 mt-1">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // ignore
        }
      }}
      className={[
        "inline-flex items-center gap-2 text-xs px-3 py-1.5",
        "border transition-all",
        copied
          ? "border-green-500 bg-green-50 text-green-700"
          : "border-black/10 hover:bg-black/5 text-black/70",
      ].join(" ")}
      aria-live="polite"
    >
      {copied ? (
        <>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Copiat!
        </>
      ) : (
        <>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="11" height="11" rx="1.5" />
            <rect x="4" y="4" width="11" height="11" rx="1.5" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </svg>
  );
}
