"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Self-contained on purpose: this used to also reach into the hero
 * (.eyebrow-mono, .role-line, .hero-statement, .cta-row, .hero-photo) and run
 * its own fromTo() on those elements — a second GSAP timeline racing Hero's
 * own entrance animation for control of the same DOM, which left the hero
 * text stuck invisible. Boot now only ever touches its own markup below and
 * then gets out of the way; Hero animates itself in underneath, independently,
 * so by the time the curtains open there's nothing left for Boot to drive.
 */
export default function Boot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const affanRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      });

      tl.to({}, { duration: 0.3 });

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, scale: 1.1, filter: "blur(20px)", letterSpacing: "-0.1em" },
        { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.02em", duration: 1.2, ease: "power3.out" }
      );

      tl.fromTo(
        line2Ref.current,
        { opacity: 0, scale: 1.1, filter: "blur(20px)", letterSpacing: "-0.1em" },
        { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.02em", duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      tl.to({}, { duration: 0.4 });

      tl.to([line1Ref.current, line2Ref.current], {
        opacity: 0,
        scale: 1.1,
        filter: "blur(15px)",
        y: -20,
        duration: 0.4,
        stagger: 0.05,
        ease: "power4.in",
      });

      tl.to(flashRef.current, { opacity: 1, duration: 0.05, ease: "power4.out" }, "-=0.1").to(
        flashRef.current,
        { opacity: 0, duration: 0.8, ease: "power4.in" },
        "+=0.1"
      );

      tl.fromTo(
        affanRef.current,
        { scale: 0.6, opacity: 0, filter: "blur(40px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
        "-=0.8"
      );

      // Curtains open & name zooms away — revealing the hero, which has been
      // animating itself in underneath this whole time, on its own timeline.
      tl.to(topCurtainRef.current, { yPercent: -100, duration: 1.6, ease: "expo.inOut" }, "+=0.3");
      tl.to(bottomCurtainRef.current, { yPercent: 100, duration: 1.6, ease: "expo.inOut" }, "<");
      tl.to(affanRef.current, { scale: 5, opacity: 0, duration: 1.6, ease: "expo.inOut" }, "<");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="boot"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div ref={topCurtainRef} className="absolute top-0 left-0 w-full h-[50vh] bg-[#050404]" />
      <div ref={bottomCurtainRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#050404]" />
      <div ref={flashRef} className="absolute inset-0 bg-[var(--red)] opacity-0 mix-blend-screen z-30" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 md:gap-8 w-full px-4">
        <div
          ref={line1Ref}
          className="font-display font-black text-4xl md:text-[6vw] leading-none text-[#FAF8F5] uppercase opacity-0 text-center"
        >
          ANTICIPATE THE BREACH
        </div>
        <div
          ref={line2Ref}
          className="font-display font-black text-4xl md:text-[6vw] leading-none text-[var(--red)] uppercase opacity-0 text-center"
        >
          ENGINEER THE DEFENSE
        </div>
      </div>

      <div
        ref={affanRef}
        className="absolute z-20 font-display font-black text-[9vw] tracking-tighter text-[#FAF8F5] opacity-0 text-center whitespace-nowrap"
        style={{ filter: "blur(20px)" }}
      >
        MOHAMED AFFAN H
      </div>
    </div>
  );
}
