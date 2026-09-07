import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-900",
          "placeholder:text-slate-400",
          "transition-all duration-200",
          "focus:outline-none focus:ring-4",
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
            : "border-slate-200 focus:border-blue-400 focus:ring-blue-500/10",
          className,
        ].join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}