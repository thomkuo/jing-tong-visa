"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/pricing`, label: t("pricing") },
    { href: `/${locale}/checklist`, label: t("checklist") },
    { href: `/${locale}/faq`, label: t("faq") },
    { href: `/${locale}/news`, label: t("news") },
  ];

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        scrolled || mobileOpen
          ? "bg-bg/95 backdrop-blur-md border-b border-red-primary/20 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <span className="font-display text-lg font-bold text-red-primary group-hover:text-red-dark transition-colors">
              精通
            </span>
            <span className="font-display text-lg font-semibold text-foreground group-hover:text-white transition-colors hidden sm:block">
              Jing Tong Visa
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  pathname === link.href
                    ? "text-red-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={otherLocalePath}
              className="text-sm text-muted hover:text-foreground transition-colors px-2 py-1 border border-white/10 rounded-md hover:border-white/20"
            >
              {t("langToggle")}
            </Link>
            <Button href={`/${locale}/contact`} size="sm">
              {t("cta")}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
            aria-label={t("mobileMenuToggle")}
          >
            <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all duration-200" />
            <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all duration-200" />
            <span className="block w-5 h-0.5 bg-current transition-all duration-200" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg/98 backdrop-blur-md border-t border-red-primary/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-red-primary bg-red-primary/10"
                    : "text-foreground hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
              <Link
                href={otherLocalePath}
                className="flex-1 text-center py-2.5 text-sm font-medium text-muted border border-white/10 rounded-lg hover:border-white/20 hover:text-foreground transition-colors"
              >
                {t("langToggle")}
              </Link>
              <Button href={`/${locale}/contact`} size="sm" className="flex-1">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
