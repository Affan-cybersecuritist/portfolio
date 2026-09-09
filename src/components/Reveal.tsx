"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={`reveal ${className}`}>
      {children}
    </Comp>
  );
}
