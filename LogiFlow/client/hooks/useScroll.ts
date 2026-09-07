"use client";

import { useEffect, useState } from "react";

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrolled: boolean;
}

export default function useScroll(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  });

  useEffect(() => {
    function updateScroll() {
      const scrollY = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress =
        documentHeight > 0
          ? Math.min(Math.max(scrollY / documentHeight, 0), 1)
          : 0;

      setScrollState({
        scrollY,
        scrollProgress,
        isScrolled: scrollY > 20,
      });
    }

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return scrollState;
}