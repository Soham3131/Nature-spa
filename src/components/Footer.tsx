import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock, Star } from "lucide-react";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";
import { services } from "@/lib/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 12% 0%, rgba(143,194,74,0.22), transparent 68%), radial-gradient(40% 50% at 88% 100%, rgba(87,166,60,0.2), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/logo.png"
              alt={site.name}
              width={168}
              height={154}
              className="h-16 w-auto brightness-125"
            />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
              {site.shortDesc}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-butter text-butter" />
                ))}
              </div>
              <span className="text-xs tracking-wide text-ivory/65">
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
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-lime">Therapies</h4>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/#services"
                    className="text-sm text-ivory/70 transition-colors hover:text-lime"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-lime">Explore</h4>
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
                    className="text-sm text-ivory/70 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-lime">Visit us</h4>
            <ul className="mt-5 space-y-4 text-sm text-ivory/75">
              <li className="flex gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-lime" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-lime" />
                <span>{site.hours}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-lime" />
                <a href={`tel:+${site.phoneRaw}`} className="hover:text-lime">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-lime" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-lime">
                  {site.email}
                </a>
              </li>
            </ul>

            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-lime px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-forest transition-transform duration-300 hover:scale-[1.04]"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-16 h-px bg-ivory/15" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[11px] tracking-[0.14em] text-ivory/50 sm:flex-row">
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
      className="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-all duration-400 hover:-translate-y-1 hover:border-lime hover:text-lime"
    >
      {children}
    </a>
  );
}
