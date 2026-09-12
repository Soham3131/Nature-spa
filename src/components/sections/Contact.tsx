"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Send, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

type Form = {
  name: string;
  phone: string;
  service: string;
  when: string;
  guests: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  phone: "",
  service: services[0].name,
  when: "",
  guests: "1",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Form, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Enter a valid 10-digit mobile number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      `Hi ${site.name}! I'd like to book an appointment.`,
      "",
      `• Name: ${form.name.trim()}`,
      `• Mobile: ${form.phone.trim()}`,
      `• Therapy: ${form.service}`,
      `• Guests: ${form.guests}`,
      form.when.trim() ? `• Preferred date/time: ${form.when.trim()}` : null,
      form.message.trim() ? `• Note: ${form.message.trim()}` : null,
      "",
      "Sent from thenaturespa.com",
    ].filter(Boolean) as string[];

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
    setForm(EMPTY);
    setTimeout(() => setSent(false), 7000);
  };

  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden bg-ivory py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 15% 25%, rgba(87,166,60,0.13), transparent 65%), radial-gradient(45% 40% at 85% 70%, rgba(143,194,74,0.13), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* --- details --- */}
          <div>
            <Reveal>
              <p className="eyebrow">Book Your Session</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-5 text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.02] text-forest">
                Let&apos;s get you
                <span className="accent-text italic"> on the table</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-body/80">
                Fill this in and it opens WhatsApp with your details already typed out —
                just hit send. Or call us directly, we usually pick up on the first ring.
              </p>
            </Reveal>

            <div className="mt-11 space-y-5">
              <Detail icon={MapPin} label="Address">
                {site.address.line1}
                <br />
                {site.address.line2}
              </Detail>
              <Detail icon={Clock} label="Hours">
                {site.hours}
              </Detail>
              <Detail icon={Phone} label="Phone">
                <a href={`tel:+${site.phoneRaw}`} className="transition-colors hover:text-bronze">
                  {site.phoneDisplay}
                </a>
              </Detail>
              <Detail icon={Mail} label="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-bronze"
                >
                  {site.email}
                </a>
              </Detail>
            </div>

            <Reveal delay={220}>
              <div className="mt-10 flex gap-3">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-leaf/20 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-forest/85 transition-all duration-500 hover:-translate-y-0.5 hover:border-leaf/60 hover:text-bronze"
                >
                  <Instagram size={15} strokeWidth={1.5} /> Instagram
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-leaf/20 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-forest/85 transition-all duration-500 hover:-translate-y-0.5 hover:border-leaf/60 hover:text-bronze"
                >
                  <Facebook size={15} strokeWidth={1.5} /> Facebook
                </a>
              </div>
            </Reveal>
          </div>

          {/* --- form --- */}
          <Reveal delay={120}>
            <div className="scene-3d">
              <form
                onSubmit={onSubmit}
                noValidate
                className="relative overflow-hidden rounded-[1.9rem] glass p-7 sm:p-10"
              >
                <span
                  aria-hidden
                  className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-bronze/18 blur-3xl"
                />

                <div className="relative grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    id="name"
                    value={form.name}
                    onChange={set("name")}
                    error={errors.name}
                    placeholder="e.g. Ananya"
                    autoComplete="name"
                  />
                  <Field
                    label="Mobile number"
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                    placeholder="10-digit number"
                    autoComplete="tel"
                  />

                  <div className="sm:col-span-1">
                    <Label htmlFor="service">Therapy</Label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={set("service")}
                      className="mt-2 w-full rounded-xl border border-forest/18 bg-paper px-4 py-3.5 text-[14px] text-forest outline-none transition-all focus:border-leaf focus:ring-2 focus:ring-leaf/25"
                    >
                      {services.map((s) => (
                        <option key={s.slug} value={s.name} className="bg-paper">
                          {s.name}
                        </option>
                      ))}
                      <option value="Not sure — please advise" className="bg-paper">
                        Not sure — please advise
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <select
                      id="guests"
                      value={form.guests}
                      onChange={set("guests")}
                      className="mt-2 w-full rounded-xl border border-forest/18 bg-paper px-4 py-3.5 text-[14px] text-forest outline-none transition-all focus:border-leaf focus:ring-2 focus:ring-leaf/25"
                    >
                      {["1", "2", "3", "4+"].map((g) => (
                        <option key={g} value={g} className="bg-paper">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      label="Preferred date & time (optional)"
                      id="when"
                      value={form.when}
                      onChange={set("when")}
                      placeholder="e.g. Saturday evening, around 7 pm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="message">Anything we should know? (optional)</Label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Injuries, pregnancy, pressure preference, allergies…"
                      className="mt-2 w-full resize-none rounded-xl border border-forest/18 bg-paper px-4 py-3.5 text-[14px] text-forest placeholder:text-muted/60 outline-none transition-all focus:border-leaf focus:ring-2 focus:ring-leaf/25"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-forest px-8 py-4.5 text-[12px] uppercase tracking-[0.22em] text-ivory shadow-[0_16px_36px_-16px_rgba(31,74,34,0.6)] transition-transform duration-500 hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/35 blur-md transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
                  <Send size={15} strokeWidth={1.7} className="relative" />
                  <span className="relative">Send on WhatsApp</span>
                </button>

                <p className="relative mt-4 text-center text-[11.5px] leading-relaxed text-body/50">
                  This opens WhatsApp with your details pre-filled. No data is stored on
                  this website.
                </p>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="relative mt-5 flex items-center justify-center gap-2.5 rounded-xl border border-leaf/35 bg-leaf/12 px-5 py-3.5 text-[13px] text-forest"
                      role="status"
                    >
                      <Check size={15} strokeWidth={2} className="text-leaf" />
                      WhatsApp opened — press send and we&apos;ll reply shortly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- small pieces ---------------- */

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[10.5px] uppercase tracking-[0.2em] text-body/65"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  id,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; error?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        {...rest}
        aria-invalid={!!error}
        className={`mt-2 w-full rounded-xl border bg-paper px-4 py-3.5 text-[14px] text-forest placeholder:text-muted/60 outline-none transition-all focus:border-leaf focus:ring-2 focus:ring-leaf/25 ${
          error ? "border-clay" : "border-forest/18"
        }`}
      />
      {error && <p className="mt-1.5 text-[11.5px] text-clay">{error}</p>}
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-leaf/20 bg-leaf/5 text-bronze">
        <Icon size={16} strokeWidth={1.4} />
      </span>
      <span>
        <span className="block text-[10.5px] uppercase tracking-[0.2em] text-body/55">
          {label}
        </span>
        <span className="mt-1 block text-[14.5px] leading-relaxed text-forest/90">
          {children}
        </span>
      </span>
    </div>
  );
}
