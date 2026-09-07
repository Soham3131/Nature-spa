const items = [
  "Balinese",
  "Deep Tissue",
  "Aroma Therapy",
  "Thai Dry",
  "Moroccan Hammam",
  "Reflexology",
  "Couple Suite",
  "Hot Stone",
  "Head & Shoulder",
];

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-leaf/10 bg-paper py-6">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ animation: "marquee 42s linear infinite" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-2xl text-forest/45 sm:text-3xl">{t}</span>
            <span className="text-bronze/60">✦</span>
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent"
      />
    </div>
  );
}
