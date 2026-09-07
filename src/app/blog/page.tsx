import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { posts } from "@/lib/blog";
import { formatDate } from "@/components/sections/JournalPreview";
import { whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Journal — Wellness Notes",
  description:
    "Guides on massage, aromatherapy, recovery and rest from the therapists at The Nature Spa, Gurugram.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const [lead, ...rest] = posts;

  return (
    <div className="relative bg-ink pb-28 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] opacity-70"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(217,184,102,0.14), transparent 70%), radial-gradient(40% 45% at 12% 25%, rgba(127,174,149,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">The Journal</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6.5vw,5rem)] leading-[1.0] text-cream">
            Everything we wish
            <span className="gold-text italic"> guests knew sooner</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-cream-dim/78">
            Practical writing from our therapists — how to pick a therapy, what
            actually happens in the room, and how to make the effects last past the
            drive home.
          </p>
        </Reveal>

        {/* ---- lead article ---- */}
        <Reveal delay={200}>
          <Link href={`/blog/${lead.slug}`} className="group mt-16 block">
            <article className="scene-3d grid overflow-hidden rounded-[2rem] glass transition-all duration-600 hover:border-gold-lt/45 lg:grid-cols-2">
              <div className="relative aspect-16/11 overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
                <SmartImage
                  src={lead.image}
                  alt={lead.title}
                  priority
                  className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="flex items-center gap-3 text-[10.5px] uppercase tracking-[0.2em] text-cream-dim/55">
                  <span className="rounded-full border border-gold-lt/25 px-3 py-1 text-gold">
                    {lead.category}
                  </span>
                  {formatDate(lead.date)} · {lead.readingTime}
                </span>

                <h2 className="display mt-6 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight text-cream transition-colors duration-400 group-hover:text-gold-lt">
                  {lead.title}
                </h2>

                <p className="mt-5 text-[14.5px] leading-[1.8] text-cream-dim/78">
                  {lead.excerpt}
                </p>

                <span className="mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
                  Read the article
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </article>
          </Link>
        </Reveal>

        {/* ---- grid ---- */}
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] glass transition-all duration-600 hover:-translate-y-2 hover:border-gold-lt/45">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-ink/75 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] text-cream-dim/50">
                      {formatDate(post.date)} · {post.readingTime}
                    </span>
                    <h2 className="display mt-3 text-2xl leading-snug text-cream transition-colors duration-400 group-hover:text-gold-lt">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-cream-dim/72">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ---- cta ---- */}
        <Reveal>
          <div className="mt-20 overflow-hidden rounded-[2rem] glass p-10 text-center sm:p-14">
            <h2 className="display text-[clamp(1.9rem,4vw,3rem)] leading-tight text-cream">
              Reading about rest is nice.
              <span className="gold-text italic"> Booking it is better.</span>
            </h2>
            <a
              href={whatsappLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-gradient-to-br from-gold-lt to-gold px-9 py-4 text-[12px] uppercase tracking-[0.22em] text-ink transition-transform duration-400 hover:scale-[1.03]"
            >
              Book on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
