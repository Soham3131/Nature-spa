import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";
import { posts, getPost } from "@/lib/blog";
import { formatDate } from "@/components/sections/JournalPreview";
import { site, whatsappLink, defaultWhatsAppMessage } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="relative bg-ivory pb-28 pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-70"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 0%, rgba(143,194,74,0.13), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-body/60 transition-colors hover:text-bronze"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-400 group-hover:-translate-x-1"
          />
          The Journal
        </Link>

        <span className="mt-9 flex flex-wrap items-center gap-3 text-[10.5px] uppercase tracking-[0.2em] text-body/55">
          <span className="rounded-full border border-leaf/25 px-3 py-1 text-bronze">
            {post.category}
          </span>
          {formatDate(post.date)} · {post.readingTime}
        </span>

        <h1 className="display mt-6 text-[clamp(2.3rem,5.5vw,4rem)] leading-[1.04] text-forest">
          {post.title}
        </h1>

        <p className="mt-6 text-[16px] leading-[1.8] text-body/80">{post.excerpt}</p>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl px-5 sm:px-8">
        <div className="relative aspect-16/9 overflow-hidden rounded-[1.8rem] border border-leaf/15 shadow-[0_34px_80px_-34px_rgba(31,74,34,0.30)]">
          <SmartImage
            src={post.image}
            alt={post.title}
            priority
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 64rem"
          />
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl px-5 sm:px-8">
        {post.body.map((block, i) => {
          if (block.type === "h2")
            return (
              <Reveal key={i}>
                <h2 className="display mt-14 mb-4 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-tight text-forest">
                  {block.text}
                </h2>
              </Reveal>
            );

          if (block.type === "quote")
            return (
              <Reveal key={i}>
                <blockquote className="my-11 border-l-2 border-leaf/60 pl-7">
                  <p className="display text-[clamp(1.3rem,2.6vw,1.8rem)] leading-snug text-leaf/90 italic">
                    {block.text}
                  </p>
                </blockquote>
              </Reveal>
            );

          if (block.type === "list")
            return (
              <Reveal key={i}>
                <ul className="my-7 space-y-3.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-4 text-[15.5px] leading-[1.8] text-body/85">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );

          return (
            <Reveal key={i}>
              <p className="mt-6 text-[15.5px] leading-[1.9] text-body/85">
                {block.text}
              </p>
            </Reveal>
          );
        })}

        {/* ---- cta ---- */}
        <div className="mt-16 overflow-hidden rounded-[1.8rem] glass p-9 text-center sm:p-11">
          <p className="eyebrow">Ready when you are</p>
          <h3 className="display mt-4 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight text-forest">
            Book your session at
            <span className="accent-text italic"> The Nature Spa</span>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-body/72">
            {site.hours} · {site.address.city}
          </p>
          <a
            href={whatsappLink(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-full bg-forest px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory transition-transform duration-400 hover:scale-[1.03]"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>

      {/* ---- more ---- */}
      <div className="relative mx-auto mt-24 max-w-[1400px] px-5 sm:px-8">
        <h2 className="display text-3xl text-forest">Keep reading</h2>
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] glass transition-all duration-600 hover:-translate-y-2 hover:border-leaf/45">
                <div className="relative aspect-16/10 overflow-hidden">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10.5px] uppercase tracking-[0.2em] text-body/50">
                    {p.category}
                  </span>
                  <h3 className="display mt-2.5 text-xl leading-snug text-forest transition-colors group-hover:text-leaf">
                    {p.title}
                  </h3>
                  <span className="mt-5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-bronze">
                    Read <ArrowUpRight size={13} strokeWidth={1.5} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
