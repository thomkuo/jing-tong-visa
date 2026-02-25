import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-red-primary hover:bg-red-dark text-white shadow-sm",
  secondary:
    "border border-red-primary text-red-primary hover:bg-red-primary/10",
  ghost: "text-foreground hover:text-red-primary hover:bg-surface",
  white: "bg-white hover:bg-white/90 text-red-primary shadow-xl",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-lg",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
