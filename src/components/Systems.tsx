"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects, flagshipProject, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import CaseStudyOverlay from "./CaseStudyOverlay";

export default function Systems() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = projects.findIndex((p) => p.id === openId);
  const openProject = openIndex >= 0 ? projects[openIndex] : null;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !gridRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".bento-card");
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Filter out flagship to render the rest
  const otherProjects = projects.filter((p) => p.id !== flagshipProject.id);

  return (
    <section id="systems" className="py-[100px] md:py-[150px] overflow-visible">
      <div className="wrap">
        <SectionHead
          num="02 / SYSTEMS"
          title={<>Five systems, <em className="text-[var(--red)] not-italic">one way of thinking.</em></>}
          sub="Every card below is a shipped project — code, category, and its headline result. Open one for the full case study."
        />

        {/* Desktop & Tablet Premium Grid Layout */}
        <div ref={gridRef} className="hidden md:grid grid-cols-2 gap-5 mt-10">
          {/* Flagship Project - Takes full width */}
          <div className="col-span-2">
            <BentoCard project={flagshipProject} onOpen={() => setOpenId(flagshipProject.id)} large />
          </div>

          {/* Other Projects - 2 Columns */}
          {otherProjects.map((p) => (
            <div key={p.id} className="col-span-1">
              <BentoCard project={p} onOpen={() => setOpenId(p.id)} />
            </div>
          ))}
        </div>

        {/* Mobile list */}
        <div className="md:hidden flex flex-col gap-px mt-5" style={{ background: "var(--line)" }}>
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="flex justify-between items-center gap-4 px-5 py-5 text-left active:bg-[var(--panel)] transition-colors"
              style={{ background: "var(--bg)" }}
            >
              <span className="font-mono text-xs text-[var(--ink-faint)] pt-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">
                <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                  {p.code} / {p.category}
                </span>
                <div className="font-display font-bold text-xl uppercase mt-1">{p.title}</div>
                {p.metrics[0] && (
                  <div className="font-mono text-[11px] mt-1.5" style={{ color: "var(--red)" }}>
                    <b>{p.metrics[0].num}</b> {p.metrics[0].label}
                  </div>
                )}
              </span>
              <span className="font-mono text-[var(--red)] self-start pt-1">→</span>
            </button>
          ))}
        </div>
      </div>

      <CaseStudyOverlay
        project={openProject}
        index={openIndex >= 0 ? openIndex : undefined}
        total={projects.length}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}

function BentoCard({ project: p, onOpen, large = false }: { project: Project; onOpen: () => void; large?: boolean }) {
  return (
    <div
      className={`bento-card group relative w-full text-left p-8 overflow-hidden transition-all duration-300 ${
        large ? "min-h-[300px] flex flex-col justify-between" : "min-h-[260px] flex flex-col justify-between"
      }`}
      style={{
        background: "var(--bg)",
        border: `1px solid ${p.flagship ? "var(--red)" : "var(--line)"}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
      }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: p.flagship 
            ? "radial-gradient(circle at right bottom, var(--red) 0%, transparent 70%)"
            : "radial-gradient(circle at right bottom, var(--ink) 0%, transparent 60%)"
        }}
      />
      
      {/* Cyberpunk grid overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />

      <div className="relative z-10 flex items-start justify-between w-full">
        <div>
          <div className="font-mono text-[10px] tracking-[.08em] mb-4 flex items-center gap-3">
            <span style={{ color: "var(--ink-faint)" }}>
              {p.code} / {p.category}
            </span>
            {p.flagship && (
              <span className="text-[var(--red)] bg-[rgba(215,38,61,0.1)] px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[var(--red)] rounded-full animate-pulse" />
                FLAGSHIP
              </span>
            )}
          </div>
          <h3 
            className={`font-display font-bold uppercase leading-[1.05] mb-3 ${large ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
          >
            {p.title}
          </h3>
          <p className="font-mono text-[11px] leading-relaxed max-w-[50ch] text-[var(--ink-muted)]">
            {p.value}
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* GitHub Link Button directly on the card */}
          {p.github && (
            <a 
              href={p.github} 
              target="_blank" 
              rel="noopener"
              aria-label={`GitHub repo for ${p.title}`}
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[var(--ink)] hover:border-[var(--ink)] hover:text-[var(--bg)] transition-colors duration-300 relative group/git z-20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span className="absolute -top-8 right-0 font-mono text-[9px] bg-[var(--ink)] text-[var(--bg)] px-2 py-1 rounded opacity-0 group-hover/git:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Source Code</span>
            </a>
          )}
          
          {/* View Study Button */}
          <button onClick={onOpen} aria-label={`Open ${p.title} case study`} className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[var(--red)] hover:border-[var(--red)] hover:text-white transition-colors duration-300 relative group/study z-20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/study:translate-x-0.5 group-hover/study:-translate-y-0.5 transition-transform">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="10 5 19 5 19 14"></polyline>
            </svg>
            <span className="absolute -bottom-8 right-0 font-mono text-[9px] bg-[var(--red)] text-[var(--bg)] px-2 py-1 rounded opacity-0 group-hover/study:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Read Study</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-8 pt-6 border-t border-[var(--line)] w-full flex items-end justify-between">
        <div className="flex gap-8">
          {p.metrics.slice(0, large ? 2 : 1).map((m, i) => (
            <div key={i}>
              <div className="font-display font-extrabold text-2xl md:text-3xl mb-1" style={{ color: p.flagship ? "var(--red)" : "var(--ink)" }}>
                {m.num}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[.08em] text-[var(--ink-faint)]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="hidden md:flex gap-2">
           {p.tags.slice(0, 3).map((tag, i) => (
             <span key={i} className="font-mono text-[9px] px-2 py-1 bg-[rgba(20,17,16,0.04)] text-[var(--ink-muted)]">
               {tag}
             </span>
           ))}
           {p.tags.length > 3 && (
             <span className="font-mono text-[9px] px-2 py-1 bg-[rgba(20,17,16,0.04)] text-[var(--ink-muted)]">
               +{p.tags.length - 3}
             </span>
           )}
        </div>
      </div>
    </div>
  );
}
