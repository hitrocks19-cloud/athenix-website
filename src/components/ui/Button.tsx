import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flare-400 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-athenix-line-animated bg-[length:200%_200%] animate-gradientShift text-white shadow-glow hover:shadow-glowAmber hover:brightness-110 active:brightness-95",
  secondary:
    "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/35 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string; target?: string; rel?: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonLink({ href, variant = "primary", children, className = "", ...rest }: LinkButtonProps) {
  const isExternal = href.startsWith("http");
  if (href.startsWith("#") || href.startsWith("/")) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

export default function Button({ variant = "primary", children, className = "", ...rest }: NativeButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
