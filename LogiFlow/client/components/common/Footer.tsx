import Link from "next/link";
import { ArrowUpRight, Truck } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  Logistics: [
    { label: "Track Shipment", href: "/tracking" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Get Started", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#4a3729] bg-[#19120e] text-[#fff8ef]">
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 2xl:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.65fr_1fr_1fr_1.2fr] lg:gap-16 xl:gap-24">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f97316] text-[#24150a] shadow-[0_0_22px_rgba(249,115,22,0.2)] transition-transform duration-200 group-hover:scale-105">
                <Truck size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#fff8ef]">
                Logi<span className="text-[#f4b56a]">Flow</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#c1b0a0]">
              Smart logistics infrastructure that keeps every shipment moving,
              visible, and connected from pickup to delivery.
            </p>

            <Link
              href="/tracking"
              className="site-button site-button-secondary mt-8"
            >
              Track a Shipment
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#c8a88a]">
                {title}
              </h3>
              <div className="mt-6 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-sm text-[#c1b0a0] transition-colors hover:text-[#f4b56a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#c8a88a]">
              Get in Touch
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-6 text-[#c1b0a0]">
              <p>support@logiflow.com</p>
              <p>+91 1800 123 4567</p>
              <p className="text-[#8d7c6d]">New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-7 border-t border-[#4a3729] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-5 text-[#8d7c6d]">
            (c) {new Date().getFullYear()} LogiFlow Operations Network. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {["Facebook", "Twitter", "LinkedIn"].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-xl border border-[#5a4636] text-[#c1b0a0] transition-all hover:border-[#c27b43] hover:text-[#f4b56a]"
              >
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
