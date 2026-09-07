"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-slate-50 text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />
          <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Contact LogiFlow
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Let&apos;s move
              <br />
              <span className="text-blue-400">things forward.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Need help with a shipment, have a business enquiry, or want to
              learn more about LogiFlow? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Contact Information */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Get in touch
              </span>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                We&apos;re here when you need us.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">
                Reach out to our team and we&apos;ll help you find the right
                logistics solution for your needs.
              </p>

              <div className="mt-9 space-y-4">
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      support@logiflow.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      +91 1800 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Headquarters
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      New Delhi, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
                <p className="text-sm font-semibold">
                  Need immediate shipment help?
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Use our tracking system to check your shipment status
                  instantly.
                </p>

                <Link
                  href="/tracking"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  Track a shipment
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-950">
                    Message received
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Thanks for reaching out. Our team will review your
                    message and get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-dark)]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                      Send us a message
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      How can we help?
                    </h2>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Full Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What do you need help with?"
                        required
                        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        placeholder="Tell us how we can help..."
                        required
                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-dark)]"
                    >
                      Send Message
                      <ArrowRight size={17} />
                    </button>

                    <p className="text-center text-xs leading-5 text-slate-400">
                      By submitting this form, you agree to be contacted
                      regarding your enquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}