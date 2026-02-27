"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Direction the element enters from */
  from?: "bottom" | "top" | "left" | "right" | "none";
}

const offsets = {
  bottom: { y: 28 },
  top: { y: -28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  from = "bottom",
}: AnimateInProps) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : { opacity: 0, ...offsets[from] }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0, x: 0 }}
      transition={shouldReduce ? {} : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
