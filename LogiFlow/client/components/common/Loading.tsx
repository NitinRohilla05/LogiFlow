"use client";

import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "min-h-[200px]"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle
          size={32}
          className="animate-spin text-[var(--primary)]"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}