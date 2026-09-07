"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Navbar from "@/components/common/Navbar";
import { register, saveAuthData } from "@/services/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      saveAuthData(response.token, response.user);
      window.location.assign("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5eee5] text-[#241b15]">
      <Navbar />

      <div className="grid min-h-screen pt-[92px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden lg:block">
          <Image
            src="/images/delivery/delivery-truck.png"
            alt="LogiFlow truck at a distribution hub"
            fill
            priority
            className="object-cover"
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-[#21150d]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b120c] via-[#1b120c]/45 to-[#1b120c]/15" />

          <div className="absolute inset-x-12 bottom-14 max-w-xl xl:inset-x-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f4b56a]">
              A simpler way to ship
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-[#fff8ef] xl:text-6xl">
              Move every delivery
              <br />
              with confidence.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#ead8c5]">
              One workspace for shipments, live tracking, and every customer
              update along the way.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-[#f8e8d7] backdrop-blur-sm">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f97316] text-[#24150a]">
                <ShieldCheck size={17} />
              </span>
              Secure account setup in a few minutes
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-92px)] items-center bg-[#f5eee5] px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c24d13]">
                  Create your account
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#241b15]">
                  Start shipping smarter.
                </h2>
              </div>

              <Link
                href="/login"
                className="shrink-0 text-sm font-semibold text-[#8a5736] transition-colors hover:text-[#c24d13]"
              >
                Sign in
              </Link>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#79695c]">
              Create an account to manage shipments and access your logistics
              dashboard.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-[#45362c]">
                  Full name
                </label>
                <div className="relative mt-2">
                  <UserRound
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c8979]"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfd1c0] bg-[#fffdfa] pl-11 pr-4 text-sm font-medium text-[#241b15] placeholder:text-[#a69484] transition-all focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold text-[#45362c]">
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c8979]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfd1c0] bg-[#fffdfa] pl-11 pr-4 text-sm font-medium text-[#241b15] placeholder:text-[#a69484] transition-all focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-semibold text-[#45362c]">
                  Password
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c8979]"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfd1c0] bg-[#fffdfa] pl-11 pr-12 text-sm font-medium text-[#241b15] placeholder:text-[#a69484] transition-all focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#9c8979] transition-colors hover:bg-[#f4e6d7] hover:text-[#4a3526]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-[#8d7c6d]">Use at least 8 characters.</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-[#45362c]">
                  Confirm password
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c8979]"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfd1c0] bg-[#fffdfa] pl-11 pr-12 text-sm font-medium text-[#241b15] placeholder:text-[#a69484] transition-all focus:border-[#f97316] focus:ring-4 focus:ring-orange-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((previous) => !previous)}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#9c8979] transition-colors hover:bg-[#f4e6d7] hover:text-[#4a3526]"
                    aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-6 text-sm font-bold text-[#24150a] shadow-[0_10px_26px_rgba(249,115,22,0.24)] transition-colors hover:bg-[#fb923c] disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#24150a]/35 border-t-[#24150a]" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#8d7c6d]">
              <ShieldCheck size={14} className="text-[#c24d13]" />
              Secure account creation
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
