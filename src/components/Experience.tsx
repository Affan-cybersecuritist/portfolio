"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { timeline, certifications } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";
import Reveal from "./Reveal";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLElement>('.dossier-card');
    
    items.forEach((item) => {
      // Cinematic Focus Effect (Blur/Scale/Opacity)
      gsap.fromTo(item, 
        { opacity: 0.2, filter: "blur(8px)", scale: 0.95, y: 40 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Node & Box Ignition Effect (triggers closer to center)
      const box = item.querySelector('.dossier-box');
      const node = item.querySelector('.dossier-node');
      
      gsap.to(box, {
        boxShadow: "0 0 40px rgba(215,38,61,0.1)",
        borderColor: "var(--red)",
        duration: 0.4,
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        }
      });

      gsap.to(node, {
        backgroundColor: "var(--red)",
        boxShadow: "0 0 20px var(--red)",
        scale: 1.5,
        duration: 0.4,
        scrollTrigger: {
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    // Static Dark Background - Removed overflow-hidden so glitch blocks can bleed out
    <section id="experience" ref={sectionRef} className="relative py-[150px] md:py-[200px] bg-[#050404] text-[var(--bg)] z-10 border-none">
      
      {/* TOP GLITCH LEAK TRANSITION */}
      <div className="absolute top-0 left-0 w-full h-[60px] md:h-[120px] -translate-y-[99%] flex items-end z-30 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          const h = ((i * 37 + 13) % 80) + 20;
          const isRed = (i * 11 + 7) % 10 > 8; // ~10% chance
          return (
            <div 
              key={i} 
              className={`flex-1 ${isRed ? 'bg-[var(--red)] shadow-[0_0_20px_var(--red)] z-10' : 'bg-[#050404] border-t-2 border-[var(--red)] shadow-[0_-5px_15px_rgba(215,38,61,0.4)]'}`} 
              style={{ height: `${h}%` }} 
            />
          );
        })}
      </div>

      {/* BOTTOM GLITCH LEAK TRANSITION */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[120px] translate-y-[99%] flex items-start z-30 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          const h = ((i * 41 + 19) % 80) + 20;
          const isRed = (i * 13 + 5) % 10 > 8; // ~10% chance
          return (
            <div 
              key={i} 
              className={`flex-1 ${isRed ? 'bg-[var(--red)] shadow-[0_0_20px_var(--red)] z-10' : 'bg-[#050404] border-b-2 border-[var(--red)] shadow-[0_5px_15px_rgba(215,38,61,0.4)]'}`} 
              style={{ height: `${h}%` }} 
            />
          );
        })}
      </div>

      {/* Background Cyber Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--red) 0%, transparent 70%)", mixBlendMode: "screen" }} />

      <div className="wrap relative z-20">
        
        {/* Cinematic Section Header */}
        <Reveal as="div" className="mb-32 md:mb-40 text-center flex flex-col items-center">
           <h2 className="font-display font-black text-5xl md:text-[90px] leading-none uppercase tracking-tighter text-[var(--bg)]">
             The Journey
           </h2>
           <p className="font-mono text-[#9B948C] mt-8 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
             From foundational schooling to engineering education and hands-on cybersecurity internship.
           </p>
        </Reveal>

        {/* Cinematic Central Timeline */}
        <div className="flex flex-col gap-12 md:gap-0 relative pb-10">
          
          {/* Central Laser Line (Solid at bottom to connect to gate) */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-[120px] w-[2px] bg-gradient-to-b from-transparent via-[var(--red)] to-[var(--red)] opacity-50 z-0" />

          {timeline.map((t, i) => (
            <div key={i} className="dossier-card relative w-full flex flex-col md:flex-row items-start md:items-center justify-center min-h-[300px] pl-[60px] md:pl-0 z-10">
               
               {/* Left Context (Desktop Only) */}
               <div className={`hidden md:flex w-1/2 flex-col justify-center px-16 ${i % 2 === 0 ? 'items-end text-right' : 'order-last items-start text-left'}`}>
                  <div className="font-mono text-[var(--red)] text-lg mb-2 tracking-widest">{t.date.replace(/\?/g, '-')}</div>
               </div>

               {/* Central Ignition Node */}
               <div className="dossier-node absolute left-[19px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rotate-45 bg-[#0a0707] border border-[#3A3330] z-10" />

               {/* Right/Left Content Box */}
               <div className={`w-full md:w-1/2 flex flex-col justify-center ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="dossier-box p-8 md:p-10 border border-[#2A2422] bg-[#0A0707] relative overflow-hidden group">
                     
                     {/* Cyber Accent Line */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--red)] to-transparent opacity-50" />
                     
                     {t.badge && (
                        <div className={`inline-block font-mono text-[9px] px-2.5 py-1 uppercase tracking-widest mb-5 border ${
                          t.badge === 'INTERNSHIP'
                            ? 'bg-[var(--red)] text-white border-[var(--red)] shadow-[0_0_15px_rgba(215,38,61,0.5)] font-bold'
                            : t.highlight
                              ? 'bg-[rgba(215,38,61,0.15)] text-[var(--red)] border-[var(--red)]'
                              : 'bg-transparent text-[#9B948C] border-[#3A3330]'
                        }`}>
                          {t.badge}
                        </div>
                     )}
                     
                     {/* Mobile Date */}
                     <div className="md:hidden font-mono text-[var(--red)] text-[10px] mb-4 tracking-widest uppercase">
                       {t.date.replace(/\?/g, '-')}
                     </div>

                     <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-[#FAF8F5] mb-4 leading-[1.1]">
                       {t.title}
                     </h3>
                     <p className="font-mono text-[#9B948C] text-[12px] md:text-[13px] leading-relaxed max-w-[40ch]">
                       {t.body}
                     </p>

                     {/* Brackets */}
                     <div className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-[#3A3330] opacity-50 group-hover:border-[var(--red)] transition-colors" />
                  </div>
               </div>

            </div>
          ))}
            
            {/* CYBER GATE SEPARATOR (Perfectly Centered Column) */}
            <div className="relative w-full flex flex-col items-start md:items-center justify-start mt-16 pl-[10px] md:pl-0 z-10">
              <div className="relative z-10 px-8 py-6 border border-[#3A3330] bg-[#0A0707] flex flex-col items-center justify-center gap-4 group hover:border-[var(--red)] transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(215,38,61,0.2)] hover:scale-105">
                <div className="w-3 h-3 bg-[var(--red)] shadow-[0_0_15px_var(--red)] animate-pulse rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <span className="font-mono text-[10px] text-[#6A5A55] tracking-[.3em] uppercase group-hover:text-[var(--red)] transition-colors duration-500">
                  SECURITY_CHECK // PASSED
                </span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Deep-Space Certifications Display (Bento Grid) */}
        <div className="relative bg-[#050404] pb-[150px] flex flex-col items-center justify-center px-[5vw]">
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0707] via-transparent to-[#0A0707] z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-20 w-full max-w-[1000px]">
          <div className="flex w-full h-[500px] md:h-[600px] gap-2 md:gap-4 overflow-hidden">
            {certifications.map((c, i) => (
              <div 
                key={i} 
                className="group relative flex-[1] hover:flex-[6] md:hover:flex-[8] transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-[#2A2422] bg-[#0A0707] overflow-hidden"
              >
                
                {/* Base Grid Noise */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: "radial-gradient(#FAF8F5 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                
                {/* Un-hovered Vertical Title */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <h4 className="font-mono text-[#6A5A55] text-[10px] tracking-[.3em] uppercase -rotate-90 whitespace-nowrap">
                    CERT // 0{i+1}
                  </h4>
                </div>

                {/* Hovered Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150 pointer-events-none group-hover:pointer-events-auto min-w-[300px]">
                  
                  {/* Massive Background Index */}
                  <div className="absolute -bottom-8 -right-8 font-display font-black text-[180px] md:text-[250px] text-[#110c0c] leading-none pointer-events-none transition-transform duration-1000 group-hover:scale-105 group-hover:-translate-x-4">
                    0{i+1}
                  </div>

                  <div className="relative z-10 flex justify-between items-start w-full">
                    <div className="font-mono text-[#6A5A55] text-[10px] tracking-[.2em] border border-[#2A2422] px-3 py-1 uppercase">
                      VERIFIED // {c.year}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[var(--red)] shadow-[0_0_10px_var(--red)] animate-pulse" />
                  </div>

                  <div className="relative z-10 mt-auto flex flex-col items-start">
                    <h3 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-[#FAF8F5] mb-4 max-w-[12ch] leading-[1.1]">
                      {c.name}
                    </h3>
                    <p className="font-mono text-[#9B948C] text-[12px] tracking-[.1em] uppercase mb-8">
                      {c.issuer}
                    </p>
                    
                    {c.link && (
                      <a href={withBasePath(c.link)} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[var(--red)] border border-[var(--red)] px-6 py-3 uppercase tracking-widest hover:bg-[var(--red)] hover:text-[#050404] transition-colors cursor-pointer inline-flex items-center gap-3">
                        VIEW_CREDENTIAL 
                        <span className="text-lg leading-none">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Laser Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
