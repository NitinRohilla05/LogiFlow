"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

interface UseTruckAnimationOptions {
  distance?: number;
  duration?: number;
  repeat?: number;
  yoyo?: boolean;
}

export default function useTruckAnimation(
  truckRef: RefObject<HTMLElement | null>,
  options: UseTruckAnimationOptions = {}
) {
  const {
    distance = 500,
    duration = 4,
    repeat = -1,
    yoyo = true,
  } = options;

  useEffect(() => {
    const truck = truckRef.current;

    if (!truck) {
      return;
    }

    const animation = gsap.to(truck, {
      x: distance,
      duration,
      repeat,
      yoyo,
      ease: "power1.inOut",
    });

    return () => {
      animation.kill();
    };
  }, [truckRef, distance, duration, repeat, yoyo]);
}