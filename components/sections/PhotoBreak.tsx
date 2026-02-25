"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PhotoBreakProps {
  /** Placeholder src — replace with licensed China photography before launch */
  src: string;
  alt: string;
  /** Optional quote overlaid on the image */
  quote?: string;
  height?: string;
}

export function PhotoBreak({
  src,
  alt,
  quote,
  height = "h-56 lg:h-72",
}: PhotoBreakProps) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-red-primary/10" />

      {/* Optional quote */}
      {quote && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.p
            className="font-display text-xl sm:text-2xl lg:text-3xl text-white/90 text-center max-w-3xl leading-relaxed italic"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
          >
            &ldquo;{quote}&rdquo;
          </motion.p>
        </div>
      )}

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
