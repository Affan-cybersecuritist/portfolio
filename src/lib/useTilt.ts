"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-reactive 3D tilt for a card-like element. CSS-driven (no render loop,
 * no WebGL) — the same interaction language used on the hero photo and the
 * Systems constellation cards, so "premium" motion reads consistently across
 * the site rather than as one-off effects.
 */
export function useTilt<T extends HTMLElement>(intensity = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = matchMedia("(pointer:coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    el.style.transition = "transform .35s cubic-bezier(.22,1,.36,1)";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * intensity}deg) rotateX(${-py * intensity}deg) translateZ(4px)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return ref;
}
