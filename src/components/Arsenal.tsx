"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { arsenal } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Arsenal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<{name: string, used: string, group: string} | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (reduced || !container) return;

    gsap.registerPlugin(ScrollTrigger);
    const chips = container.querySelectorAll<HTMLElement>(".chip-item");
    gsap.set(chips, { opacity: 0, y: 14 });

    const batch = ScrollTrigger.batch(chips, {
      start: "top 92%",
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.02, clearProps: "transform" }),
    });
    return () => {
      batch.forEach((b) => b.kill());
    };
  }, []);

  return (
    <section id="arsenal" className="py-[100px] md:py-[150px]">
      <div className="wrap">
        <SectionHead
          num="04 / ARSENAL"
          title={<>Tools, grouped by <em className="text-[var(--red)] not-italic">where they earned their place.</em></>}
          sub="Every entry here has shipped in one of the five systems above."
        />
        <Reveal as="div" delay={0.05}>
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 md:gap-16 items-start mt-8">
            
            {/* Left: Chips Grid */}
            <div ref={containerRef} className="flex flex-col gap-6 md:gap-10">
              {arsenal.map((g) => (
                <div key={g.group} className="border-b border-[var(--line)] pb-8 last:border-0">
                  <h3 className="font-mono text-[11px] text-[var(--red)] tracking-[.2em] mb-5 font-bold uppercase">{g.group}</h3>
                  <div className="flex flex-wrap gap-2.5 md:gap-3">
                    {g.items.map((item) => (
                      <button
                        key={item.name}
                        onMouseEnter={() => setActiveItem({ ...item, group: g.group })}
                        onMouseLeave={() => setActiveItem(null)}
                        onFocus={() => setActiveItem({ ...item, group: g.group })}
                        onBlur={() => setActiveItem(null)}
                        className={`chip-item group relative font-mono text-[12px] px-5 py-2.5 border transition-all duration-300 text-left overflow-hidden ${
                          activeItem?.name === item.name 
                            ? 'border-[var(--red)] bg-[var(--red)] text-white shadow-lg -translate-y-1' 
                            : 'border-[var(--ink)] text-[var(--ink)] hover:border-[var(--red)] hover:text-[var(--red)] hover:-translate-y-0.5'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Sticky Inspector */}
            <div className="sticky top-32 border-2 border-[var(--ink)] p-8 min-h-[280px] hidden lg:flex flex-col bg-white transition-all duration-400" 
                 style={{ 
                   borderColor: activeItem ? "var(--red)" : "var(--ink)", 
                   boxShadow: activeItem ? "0 10px 40px -10px rgba(215,38,61,0.2)" : "4px 4px 0px 0px rgba(20,17,16,1)" 
                 }}>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-center border-b-2 border-[var(--ink)] pb-4 mb-6" style={{ borderColor: activeItem ? "var(--red)" : "var(--ink)" }}>
                  <span className="font-mono text-xs tracking-[.2em] font-black uppercase text-[var(--ink)]">
                    MODULE DETAILS
                  </span>
                  <span className={`w-2 h-2 rounded-full ${activeItem ? 'bg-[var(--red)] animate-pulse' : 'bg-[var(--ink)]'}`} />
                </div>

                {activeItem ? (
                  <div className="animate-fade-in flex flex-col gap-6 flex-1">
                    <div>
                      <div className="font-mono text-[10px] text-[var(--ink)] tracking-[.15em] mb-1.5 uppercase font-bold opacity-60">Module Name</div>
                      <div className="font-display text-2xl text-[var(--ink)] font-black uppercase tracking-tight">
                        {activeItem.name}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[var(--ink)] tracking-[.15em] mb-1.5 uppercase font-bold opacity-60">Category</div>
                      <div className="font-mono text-xs text-[var(--ink)] uppercase font-bold tracking-wider">
                        {activeItem.group}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="font-mono text-[10px] text-[var(--ink)] tracking-[.15em] mb-2 uppercase font-bold opacity-60">Deployment Origin</div>
                      <div className="font-mono text-xs text-[var(--red)] uppercase flex items-center gap-2 font-bold tracking-wider border border-[var(--red)] p-3 bg-red-50">
                         <span className="w-1.5 h-1.5 bg-[var(--red)] inline-block animate-pulse" /> {activeItem.used}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-sm text-[var(--ink)] mt-10 tracking-widest font-bold opacity-50 flex items-center gap-3">
                    <span className="w-2 h-px bg-[var(--ink)] block" />
                    HOVER TO INSPECT
                  </div>
                )}
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
