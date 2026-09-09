"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CAPABILITIES = [
  { name: "Governance, Risk & Compliance (GRC)", value: 95 },
  { name: "Vulnerability Assessment & Pen-Test", value: 90 },
  { name: "Zero-Trust Security Architecture", value: 88 },
  { name: "AI & Adversarial Systems", value: 85 },
  { name: "Secure Scripting (Python, C++)", value: 92 },
];

export default function CoreCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const bars = containerRef.current?.querySelectorAll(".cap-bar");
    
    if (bars) {
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div className="absolute inset-0 bg-white p-8 flex flex-col justify-center border-t-4 border-[var(--red)]">
      <div className="mb-8 border-b-2 border-[var(--ink)] pb-3">
        <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-[var(--ink)]">Core Capabilities</h3>
        <p className="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-widest mt-1">
          Validated Skill Matrix
        </p>
      </div>

      <div ref={containerRef} className="flex flex-col gap-5">
        {CAPABILITIES.map((cap, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-end font-mono text-[11px] font-bold text-[var(--ink)] uppercase">
              <span>{cap.name}</span>
              <span className="text-[var(--red)] tracking-widest">{cap.value}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#f1ece5] overflow-hidden">
              <div 
                className="cap-bar h-full bg-[var(--red)] origin-left"
                style={{ width: `${cap.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-6 flex items-center gap-3 opacity-60">
        <span className="w-2 h-2 bg-[var(--red)] animate-pulse" />
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] font-bold">Actively Seeking Opportunities</span>
      </div>
    </div>
  );
}
