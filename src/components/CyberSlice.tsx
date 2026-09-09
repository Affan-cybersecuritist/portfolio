"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CyberSlice({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const slices = el.querySelectorAll(".slice");
    
    // Reset state initially
    gsap.set(slices[0], { x: "-20%", opacity: 0 });
    gsap.set(slices[1], { x: "20%", opacity: 0 });
    gsap.set(slices[2], { scale: 1.1, opacity: 0, filter: "blur(10px)" });
    gsap.set(el.querySelector(".scanline"), { scaleY: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });

    // Animate scanline in
    tl.to(el.querySelector(".scanline"), { scaleY: 1, duration: 0.3, ease: "power2.inOut" })
      // Slam slices together
      .to(slices[0], { x: "0%", opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.1")
      .to(slices[1], { x: "0%", opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, "<")
      .to(slices[2], { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, "-=0.3")
      // Fade out scanline
      .to(el.querySelector(".scanline"), { opacity: 0, duration: 0.2 }, "+=0.1");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Invisible spacer to hold the layout size */}
      <span className="invisible block">{children}</span>

      {/* Top Slice */}
      <span
        className="slice absolute inset-0 block text-[var(--red)] mix-blend-multiply"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Bottom Slice */}
      <span
        className="slice absolute inset-0 block text-[var(--red)] mix-blend-multiply"
        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Center Slice / Base */}
      <span
        className="slice absolute inset-0 block"
        style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 55%, 0 55%)" }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Animated Scanline across the middle */}
      <div 
        className="scanline absolute left-0 w-full z-10 pointer-events-none" 
        style={{ top: "49%", height: "2px", background: "var(--red)", transformOrigin: "center" }}
      />
    </div>
  );
}
