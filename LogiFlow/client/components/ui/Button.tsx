import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantStyles = {
  primary:
    "bg-[var(--primary)] text-white shadow-lg shadow-blue-500/20 hover:bg-[var(--primary-dark)]",
  secondary:
    "bg-blue-50 text-[var(--primary)] hover:bg-blue-100",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",
};

const sizeStyles = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-200",
        "hover:-translate-y-0.5",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}