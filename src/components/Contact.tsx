"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { site } from "@/data/projects";
import Reveal from "./Reveal";

export default function Contact() {
  const goodRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = goodRef.current;
    if (reduced || !el) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(el, { scale: 2.2, opacity: 0, transformOrigin: "left center" });
    const tween = gsap.to(el, {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="contact" className="pt-[100px] md:pt-[150px] pb-[100px] border-none bg-[var(--bg)] text-[var(--ink)]">
      <div className="wrap">
        
        <Reveal className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 bg-[var(--red)] rounded-full animate-pulse shadow-[0_0_15px_var(--red)]" />
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-[var(--red)] font-bold">
            07 // SECURE CHANNEL OPEN
          </div>
        </Reveal>

        <Reveal as="h2" className="font-display font-extrabold uppercase leading-[.94] max-w-[1000px]" delay={0.05}>
          <span style={{ fontSize: "clamp(48px,8vw,110px)" }}>
            HAVE A SECURITY
            <br />
            PROBLEM? <em ref={goodRef} className="inline-block text-[var(--red)] not-italic relative z-10 drop-shadow-[0_0_30px_rgba(215,38,61,0.3)]">GOOD.</em>
          </span>
        </Reveal>
        
        <Reveal
          as="p"
          className="font-mono text-[var(--ink-muted)] mt-10 mb-20 tracking-widest uppercase border-l-2 border-[var(--red)] pl-6"
          delay={0.1}
        >
          <span style={{ fontSize: "clamp(14px,1.5vw,18px)" }}>Let's build something worth attacking.</span>
        </Reveal>

        {/* Massive Interactive Contact Bars */}
        <Reveal className="w-full flex flex-col border-t-4 border-[var(--ink)]" delay={0.15}>
          <ContactBar href={`mailto:${site.email}`} label="EMAIL" value={site.email} />
          <ContactBar href={site.linkedin} label="LINKEDIN" value="/in/mohamed-affan-h" />
          <ContactBar href={site.github} label="GITHUB" value="Affan-cybersecuritist" />
        </Reveal>
        
      </div>
    </section>
  );
}

function ContactBar({ href, label, value }: { href: string; label: string; value: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 border-b border-[var(--ink)] overflow-hidden cursor-pointer"
    >
      {/* Background slide effect */}
      <div className="absolute inset-0 bg-[var(--ink)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full">
        {/* Massive Label */}
        <div className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter text-[var(--ink)] group-hover:text-[var(--bg)] transition-colors duration-300">
          {label}
        </div>
        
        {/* Connection Trace Line */}
        <div className="hidden md:block flex-1 h-[2px] mx-12 bg-transparent border-t-2 border-dashed border-[var(--ink)] opacity-20 group-hover:opacity-100 group-hover:border-[var(--red)] transition-all duration-500" />
        
        {/* Decrypting Value */}
        <div className="mt-6 md:mt-0 font-mono text-sm md:text-xl tracking-widest text-[var(--ink)] group-hover:text-[var(--bg)] transition-colors duration-300 flex items-center gap-6">
          <ScrambleText text={value} isHovered={isHovered} />
          <span className="text-3xl text-[var(--red)] group-hover:-rotate-45 transition-transform duration-500">→</span>
        </div>
      </div>
    </a>
  );
}

function ScrambleText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&%";
  
  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }
    
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((c, i) => {
        if (i < iter) return text[i];
        if (c === " ") return " ";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iter >= text.length) clearInterval(interval);
      iter += 1/2; // Speed of decryption
    }, 30);
    
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{display}</span>;
}
