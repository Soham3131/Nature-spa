import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { posts } from "@/lib/blog";

export default function JournalPreview() {
  const featured = posts.slice(0, 3);

  return (
    <section id="journal" className="relative overflow-hidden bg-ivory py-28 sm:py-36">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">The Journal</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] text-forest">
                Notes on rest, from
                <span className="accent-text italic"> people who do it daily</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <Link
              href="/blog"
              className="group flex items-center gap-2 rounded-full border border-leaf/25 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-forest transition-all duration-500 hover:border-leaf/60 hover:text-bronze"
            >
              All articles
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] glass transition-all duration-600 hover:-translate-y-2 hover:border-leaf/45">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-ivory/75 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-bronze backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] text-body/50">
                      {formatDate(post.date)} · {post.readingTime}
                    </span>

                    <h3 className="display mt-3 text-2xl leading-snug text-forest transition-colors duration-400 group-hover:text-leaf">
                      {post.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-body/72">
                      {post.excerpt}
                    </p>

                    <span className="mt-6 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-bronze">
                      Read
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
