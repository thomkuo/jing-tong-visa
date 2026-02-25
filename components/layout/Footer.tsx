"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const quickLinks = [
    { href: `/${locale}`, label: nav("home") },
    { href: `/${locale}/services`, label: nav("services") },
    { href: `/${locale}/pricing`, label: nav("pricing") },
    { href: `/${locale}/checklist`, label: nav("checklist") },
    { href: `/${locale}/faq`, label: nav("faq") },
    { href: `/${locale}/news`, label: nav("news") },
  ];

  return (
    <footer className="bg-surface border-t border-red-primary/20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold text-red-primary">
                精通
              </span>
              <span className="font-display text-xl font-semibold text-foreground">
                Jing Tong Visa
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-5">
              {t("tagline")}
            </p>
            <Link
              href={otherLocalePath}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground border border-white/10 hover:border-white/20 rounded-md px-3 py-1.5 transition-colors"
            >
              {t("langToggle")}
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {t("contactUs")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="text-sm text-foreground">{t("address")}</p>
              </li>
              <li>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <a
                  href={`tel:${t("phone")}`}
                  className="text-sm text-foreground hover:text-red-primary transition-colors"
                >
                  {t("phone")}
                </a>
              </li>
              <li>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-sm text-foreground hover:text-red-primary transition-colors"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                  Hours
                </p>
                <p className="text-sm text-foreground">{t("hours")}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <span className="text-white/10">|</span>
            <p className="text-xs text-muted">
              Washington D.C.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
