import Image from "next/image";

export default function SchedulesPage() {
  const items = [
    {
      title: "Ceremony",
      time: "17:00 · Sant Pere Church",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&auto=format&fit=crop&w=1200&h=800",
    },
    {
      title: "Aperitif",
      time: "18:30 · Garden Terrace",
      image:
        "https://images.unsplash.com/photo-1519741497670-0f3f1dfa3ecd?q=80&auto=format&fit=crop&w=1200&h=800",
    },
    {
      title: "Dinner",
      time: "20:30 · Main Hall",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&auto=format&fit=crop&w=1200&h=800",
    },
    {
      title: "Party",
      time: "23:30 · Dance Floor",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&auto=format&fit=crop&w=1200&h=800",
    },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Schedules</h1>
      <p className="text-base text-black/70 max-w-2xl">
        Here is the detailed timetable for the wedding day.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="relative h-40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm mt-1 text-black/70">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


