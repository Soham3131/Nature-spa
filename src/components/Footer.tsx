import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock, Star } from "lucide-react";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";
import { services } from "@/lib/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gold-lt/10 bg-ink-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,184,102,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <h3 className="display text-3xl text-cream">
              The Nature <span className="gold-text">Spa</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dim/80">
              {site.shortDesc}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="text-xs tracking-wide text-cream-dim/70">
                {site.rating.value} on Google
              </span>
            </div>

            <div className="mt-7 flex gap-3">
              <Social href={site.socials.instagram} label="Instagram">
                <Instagram size={16} strokeWidth={1.5} />
              </Social>
              <Social href={site.socials.facebook} label="Facebook">
                <Facebook size={16} strokeWidth={1.5} />
              </Social>
              <Social href={`mailto:${site.email}`} label="Email">
                <Mail size={16} strokeWidth={1.5} />
              </Social>
            </div>
          </div>

          <div>
            <h4 className="eyebrow">Therapies</h4>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/#services"
                    className="text-sm text-cream-dim/75 transition-colors hover:text-gold"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Explore</h4>
            <ul className="mt-5 space-y-2.5">
              {[
                { href: "/#experience", label: "The Experience" },
                { href: "/#gallery", label: "Our Spa" },
                { href: "/#reviews", label: "Guest Reviews" },
                { href: "/blog", label: "Wellness Journal" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#contact", label: "Book a Session" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-dim/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow">Visit us</h4>
            <ul className="mt-5 space-y-4 text-sm text-cream-dim/80">
              <li className="flex gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>{site.hours}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a href={`tel:+${site.phoneRaw}`} className="hover:text-gold">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>

            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gradient-to-br from-gold-lt to-gold px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-16 h-px hairline opacity-40" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[11px] tracking-[0.14em] text-cream-dim/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="uppercase">Gurugram · Haryana · India</p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-gold-lt/20 text-cream/80 transition-all duration-400 hover:-translate-y-1 hover:border-gold-lt/60 hover:text-gold"
    >
      {children}
    </a>
  );
}
