"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, Truck, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Live Tracking", href: "/tracking" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="site-nav-shell" aria-label="Main navigation">
        <Link href="/" className="site-logo" onClick={closeMenu}>
          <span className="site-logo-mark">
            <Truck size={20} strokeWidth={2.5} />
          </span>
          <span className="site-logo-text">
            Logi<span>Flow</span>
          </span>
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-nav-link"
              onClick={closeMenu}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-nav-actions">
          {!isLoginPage && (
            <Link href="/login" className="site-nav-login">
              {isRegisterPage ? "Sign in" : "Login"}
            </Link>
          )}
          {!isRegisterPage && (
            <Link href="/register" className="site-button site-button-primary site-nav-cta">
              {isLoginPage ? "Create account" : "Get Started"}
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        <button
          type="button"
          className="site-nav-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="site-nav-mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-nav-link"
              onClick={closeMenu}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <div className={`site-nav-mobile-actions ${isLoginPage || isRegisterPage ? "site-nav-mobile-actions-single" : ""}`}>
            {!isLoginPage && (
              <Link href="/login" className="site-button site-button-secondary" onClick={closeMenu}>
                {isRegisterPage ? "Sign in" : "Login"}
              </Link>
            )}
            {!isRegisterPage && (
              <Link href="/register" className="site-button site-button-primary" onClick={closeMenu}>
                {isLoginPage ? "Create account" : "Get Started"}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
