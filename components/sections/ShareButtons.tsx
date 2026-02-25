"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const t = useTranslations("newsPage");
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const xHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select + copy via execCommand
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-muted">{t("shareTitle")}</span>

      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted border border-white/10 hover:border-white/25 hover:text-foreground rounded-lg px-3 py-1.5 transition-colors"
        aria-label="Share on X"
      >
        <XIcon />
        <span>X</span>
      </a>

      <a
        href={fbHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted border border-white/10 hover:border-white/25 hover:text-foreground rounded-lg px-3 py-1.5 transition-colors"
        aria-label="Share on Facebook"
      >
        <FacebookIcon />
        <span>Facebook</span>
      </a>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 text-sm text-muted border border-white/10 hover:border-white/25 hover:text-foreground rounded-lg px-3 py-1.5 transition-colors"
        aria-label="Copy link"
      >
        <LinkIcon />
        <span>{copied ? t("copied") : t("copyLink")}</span>
      </button>
    </div>
  );
}
