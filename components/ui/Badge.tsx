import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "gold" | "muted" | "success";
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: "bg-red-primary/10 text-red-primary border border-red-primary/30",
  gold: "bg-gold/10 text-gold border border-gold/30",
  muted: "bg-surface text-muted border border-white/10",
  success: "bg-green-900/30 text-green-400 border border-green-700/30",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
