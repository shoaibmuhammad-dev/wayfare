import type { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-colors disabled:opacity-60 cursor-pointer";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  accent: "bg-accent text-ink hover:bg-accent/80",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  outline: "border border-line text-ink hover:border-ink",
};

export type ButtonVariant = keyof typeof variants;

export const buttonStyles = (variant: ButtonVariant = "primary", extra = "") =>
  `${base} ${variants[variant]} ${extra}`.trim();

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonStyles(variant, className)} {...props} />;
}
