import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "flat" | "interactive";
}

const variantStyles = {
  default:
    "border border-slate-200 bg-white shadow-sm",
  flat:
    "border border-slate-200 bg-slate-50",
  interactive:
    "border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50",
};

export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl",
        "transition-all duration-300",
        variantStyles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}