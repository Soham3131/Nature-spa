import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@/lib/site";
import { reviews } from "@/lib/reviews";
import { galleryPhotos } from "@/lib/galleryPhotos";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ScrollProgress from "@/components/ScrollProgress";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/**
 * Social share image. Taken from the gallery, which resolves to our own
 * photographs in /public/images and only falls back to stock if one is missing
 * — so WhatsApp and Google show the real spa, not a stock room.
 */
const OG_IMAGE = galleryPhotos[0].resolved;
const OG_ABSOLUTE = OG_IMAGE.startsWith("http") ? OG_IMAGE : `${SITE_URL}${OG_IMAGE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.shortDesc,
  keywords: [
    "spa in Gurugram",
    "body massage Gurgaon",
    "Balinese massage Gurugram",
    "deep tissue massage Gurgaon",
    "couple spa Gurugram",
    "aroma therapy spa",
    "The Nature Spa",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDesc,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDesc,
    images: [OG_IMAGE],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07100d",
  colorScheme: "dark",
};

function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: site.name,
    description: site.shortDesc,
    url: SITE_URL,
    telephone: `+${site.phoneRaw}`,
    email: site.email,
    image: [OG_ABSOLUTE],
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "21:30",
      },
    ],
    sameAs: [site.socials.instagram, site.socials.facebook, site.socials.google],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-ivory text-forest">
        <StructuredData />
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
