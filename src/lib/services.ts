export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  duration: string;
  benefits: string[];
  accent: string;
  /** card photograph */
  image: string;
};

export const services: Service[] = [
  {
    slug: "signature-nature-ritual",
    name: "Signature Nature Ritual",
    short: "Our house therapy — 90 minutes of pure restoration.",
    description:
      "A full-body ceremony that opens with a warm herbal compress, flows into deep aromatic strokes along the spine and shoulders, and closes with a scalp and foot release. Designed for guests carrying weeks of desk tension.",
    duration: "90 min",
    benefits: ["Full-body tension release", "Warm herbal compress", "Scalp & foot ritual"],
    accent: "#2e7d32",
    image:
      "https://images.unsplash.com/photo-1775133263714-848c8fe09e73?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "balinese-massage",
    name: "Balinese Massage",
    short: "Long, flowing strokes with warm aromatic oil.",
    description:
      "Traditional Indonesian bodywork combining acupressure, gentle stretching and skin rolling. Deeply relaxing yet firm enough to reach knotted muscle — the most requested therapy at our Gurugram spa.",
    duration: "60 / 90 min",
    benefits: ["Improves circulation", "Relieves muscle knots", "Calms the nervous system"],
    accent: "#6fbb42",
    image:
      "https://images.unsplash.com/photo-1709755491926-f7aa83748967?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "deep-tissue",
    name: "Deep Tissue Therapy",
    short: "Focused pressure for stubborn, long-held knots.",
    description:
      "Slow, firm strokes that work through the deeper layers of muscle and fascia. Ideal for gym-goers, long commuters and anyone living with chronic neck, back or shoulder stiffness.",
    duration: "60 / 90 min",
    benefits: ["Chronic pain relief", "Better mobility", "Post-workout recovery"],
    accent: "#a9704a",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "aroma-therapy",
    name: "Aroma Therapy",
    short: "Essential oils chosen for your mood that day.",
    description:
      "Choose your blend — lavender to sleep, lemongrass to lift, sandalwood to ground. Light, rhythmic strokes carry the oils into the skin while the aroma settles the mind.",
    duration: "60 min",
    benefits: ["Stress & anxiety relief", "Better sleep", "Mood lift"],
    accent: "#9c86c0",
    image:
      "https://images.unsplash.com/photo-1671492246169-cdd6305870a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "thai-dry-massage",
    name: "Thai Dry Massage",
    short: "Assisted stretching, no oil, fully clothed.",
    description:
      "A rhythmic sequence of compressions and guided yoga-like stretches performed on a mat. Leaves you feeling longer, looser and unusually light on your feet.",
    duration: "60 / 90 min",
    benefits: ["Increases flexibility", "Releases hips & hamstrings", "Energising"],
    accent: "#4e9a8f",
    image:
      "https://images.unsplash.com/photo-1775133262667-316bd4d9e5b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "hammam-scrub",
    name: "Moroccan Hammam & Scrub",
    short: "Steam, black soap, kessa glove, glow.",
    description:
      "A traditional bathing ritual — steam to soften, black soap to cleanse, and a kessa mitt exfoliation that lifts away dull skin. Finished with a hydrating body wrap.",
    duration: "75 min",
    benefits: ["Full-body exfoliation", "Visible glow", "Detoxifying"],
    accent: "#c98f5a",
    image:
      "https://images.unsplash.com/photo-1781736363509-a2327b675a03?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "foot-reflexology",
    name: "Foot Reflexology",
    short: "Pressure-point work from ankle to toe.",
    description:
      "Targeted thumb pressure across the reflex map of the foot, finishing with a warm soak and cooling balm. A perfect 45-minute reset between meetings.",
    duration: "45 min",
    benefits: ["Relieves tired legs", "Improves sleep", "Quick reset"],
    accent: "#8fc24a",
    image:
      "https://images.unsplash.com/photo-1633526543913-d30e3c230d1f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "couple-spa",
    name: "Couple Spa Suite",
    short: "Two therapists, one private candlelit room.",
    description:
      "Our private suite set for two — synchronized massages, warm towels, and a quiet hour away from the city. Popular for anniversaries and birthdays.",
    duration: "90 min",
    benefits: ["Private suite", "Two therapists", "Celebration-ready"],
    accent: "#c77e8a",
    image:
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80",
  },
];
