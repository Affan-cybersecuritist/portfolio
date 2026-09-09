"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { site, projects, flagshipProject } from "@/data/projects";
import { getLenis } from "@/lib/useLenis";
import { withBasePath } from "@/lib/basePath";
import HeroSignal from "./HeroSignal";
import MatrixRain from "./MatrixRain";

const STATS = [
  { num: String(projects.length).padStart(2, "0"), label: "Systems shipped" },
  { num: flagshipProject.metrics[0]?.num ?? "", label: flagshipProject.metrics[0]?.label ?? "Flagship system" },
  { num: "15+", label: "Hackathons entered" },
];

import MagneticButton from "@/components/MagneticButton";

function ScrambleHoverText({ text, children, className }: { text: string; children?: React.ReactNode; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
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
      iter += 1/2; 
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {display}{children}
    </span>
  );
}

export default function Hero() {
  const [photoOk, setPhotoOk] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(
        [".eyebrow-mono", "h1.name", ".role-line", ".hero-statement", ".cta-row", ".stat-strip", ".scroll-cue", ".hero-photo", ".hero-photo img", ".scan-bar"],
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)" }
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // gsap.context() scopes and auto-reverts every tween/ScrollTrigger created inside —
    // React 18 dev mode runs this effect twice on mount (StrictMode), and without this,
    // the second run's entrance timeline collided with the first run's un-killed one,
    // leaving the text stuck at its pre-animation hidden state (opacity: 0) permanently.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-photo",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "cubic-bezier(.65,0,.35,1)" }
      )
        .fromTo(".hero-photo img", { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "power2.out" }, "<")
        .fromTo(".scan-bar", { top: "-8%", opacity: 1 }, { top: "108%", opacity: 1, duration: 1.0, ease: "power1.inOut" }, "<+0.15")
        .set(".scan-bar", { opacity: 0 })
        .from(".eyebrow-mono", { opacity: 0, y: 10, duration: 0.5 }, "-=1.1")
        .from("h1.name .line", { opacity: 0, y: "100%", duration: 0.7, stagger: 0.08 }, "-=.35")
        .from(".role-line", { opacity: 0, y: 10, duration: 0.5 }, "-=.35")
        .from(".hero-statement", { opacity: 0, y: 10, duration: 0.5 }, "-=.3")
        .from(".cta-row", { opacity: 0, y: 10, duration: 0.5 }, "-=.3")
        .from(".stat-strip .stat-item", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=.25")
        .from(".scroll-cue", { opacity: 0, duration: 0.5 }, "-=.2");

      // The hero is pinned (sticky) for one full viewport of scrolling before Profile
      // covers it — without scroll-linked motion, that entire scroll feels frozen.
      // This scrubs a slow photo zoom + text lift as the user scrolls through it.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        })
        .to(".hero-photo img", { scale: 1.12, ease: "none" }, 0)
        .to(".hero-text-block", { y: -60, opacity: 0.25, ease: "none" }, 0)
        .to(".hero-signal", { opacity: 0.15, ease: "none" }, 0);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const isTouch = matchMedia("(pointer:coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) scale3d(1.015,1.015,1.015)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    // This wrapper's height equals the hero's own height, which scopes the sticky
    // containing block to exactly one viewport — without it, the sticky section's
    // containing block is <main> (the whole page), so it would stay pinned and paint
    // over every later section instead of unsticking once Profile covers it.
    <div className="relative" ref={wrapperRef}>
      <section
        id="hero"
        className="sticky top-0 z-0 h-screen flex items-center overflow-hidden text-[var(--bg)]"
        style={{ background: "var(--red-dark)" }}
      >
        <div className="hero-signal">
          <HeroSignal />
        </div>
        
        <MatrixRain opacity={0.1} />

        {/* Full-bleed photo panel — the person, not a stock decoration, is the hero's dominant visual */}
        <div
          ref={photoRef}
          className="hero-photo absolute inset-y-0 right-0 w-full lg:w-[52%] will-change-transform"
          style={{ clipPath: "inset(0 0 0% 0)", transition: "transform .35s cubic-bezier(.22,1,.36,1)", transformStyle: "preserve-3d" }}
        >
          {photoOk ? (
            <img
              src={withBasePath("/affan.jpg")}
              alt="Mohamed Affan H."
              className="w-full h-full object-cover"
              style={{ objectPosition: "78% 22%", filter: "grayscale(1) contrast(1.15) brightness(.9)" }}
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--red-dark)" }}>
              <svg viewBox="0 0 200 200" fill="none" style={{ width: "30%", opacity: 0.5 }}>
                <circle cx="100" cy="100" r="92" stroke="var(--bg)" strokeWidth="1" />
                <path d="M60 130 L100 55 L140 130 M76 100 H124" stroke="var(--bg)" strokeWidth="4" strokeLinecap="square" />
              </svg>
            </div>
          )}
          {/* one-time "scan" sweep on load — an analysis pass over the photo, not a gimmick loop */}
          <div
            className="scan-bar absolute left-0 w-full pointer-events-none"
            style={{ height: "14%", top: "-8%", background: "linear-gradient(180deg, transparent, rgba(255,255,255,.5) 45%, rgba(255,255,255,.9) 50%, rgba(255,255,255,.5) 55%, transparent)", mixBlendMode: "overlay" }}
          />
          {/* duotone: mutes the photo into the red/black palette instead of sitting as a plain color photo */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--red)", mixBlendMode: "color", opacity: 0.85 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(0deg, var(--red-dark) 0%, transparent 45%)" }} />
          <div
            className="absolute inset-y-0 left-0 w-[45%] pointer-events-none hidden lg:block"
            style={{ background: "linear-gradient(90deg, var(--red-dark) 0%, transparent 100%)" }}
          />
          {/* below lg the photo is full-bleed behind the text instead of a side panel,
              so it needs its own scrim — without it the name sits directly on his face */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{ background: "linear-gradient(195deg, var(--red-dark) 10%, rgba(74,13,22,.55) 45%, transparent 75%)" }}
          />
        </div>

        <div className="wrap relative z-[2] w-full">
          <div className="hero-text-block max-w-[640px]">
            <div className="eyebrow-mono font-mono text-[11px] tracking-[.08em] flex items-center gap-[10px]" style={{ color: "rgba(250,248,245,.75)" }}>
              <span className="w-8 h-px" style={{ background: "rgba(250,248,245,.4)" }} /> CYBERSECURITY ENGINEER — CHENNAI, INDIA
            </div>
            <h1
              className="name font-display font-extrabold uppercase leading-[.92] mt-5 mb-2 tracking-[-.02em] cursor-crosshair"
              style={{ fontSize: "clamp(46px, 7.4vw, 118px)" }}
            >
              <span className="line block overflow-hidden">
                <ScrambleHoverText text="MOHAMED" className="inline-block" />
              </span>
              <span className="line block overflow-hidden flex items-baseline">
                <ScrambleHoverText text="AFFAN" className="inline-block mr-4 md:mr-6" />
                <ScrambleHoverText text="H" className="inline-block text-[var(--ink)]" />
              </span>
            </h1>
            <div className="role-line font-mono tracking-[.04em] mb-7" style={{ fontSize: "clamp(13px,1.6vw,16px)", color: "rgba(250,248,245,.85)" }}>
              CYBERSECURITY <span style={{ color: "var(--ink)" }} className="mx-1.5">—</span> GOVERNANCE, RISK & COMPLIANCE{" "}
              <span style={{ color: "var(--ink)" }} className="mx-1.5">—</span> AI SYSTEMS
            </div>
            <p
              className="hero-statement font-display font-medium max-w-[480px] mb-9 leading-[1.3]"
              style={{ fontSize: "clamp(19px,2.4vw,26px)" }}
            >
              I build systems that find <b style={{ color: "var(--ink)", fontWeight: 800 }}>what breaks</b> before
              attackers do.
            </p>
            <div className="cta-row flex gap-5 items-center flex-wrap mb-10">
              <MagneticButton strength={20}>
                <a
                  href="#systems"
                  onClick={(e) => {
                    e.preventDefault();
                    const lenis = getLenis();
                    if (lenis) {
                      lenis.scrollTo("#systems", { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
                    } else {
                      document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  data-cursor="EXPLORE ↗"
                  data-dark-cursor
                  className="btn-glitch font-mono text-xs tracking-[.06em] px-7 py-4 border-2 inline-flex items-center gap-2 transition-colors"
                  style={{ borderColor: "var(--bg)", background: "var(--bg)", color: "var(--red-dark)" }}
                >
                  Explore Work
                </a>
              </MagneticButton>
              <MagneticButton strength={20}>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener"
                  data-cursor="OPEN ↗"
                  data-dark-cursor
                  className="btn-glitch font-mono text-xs tracking-[.06em] px-7 py-4 border-2 inline-flex items-center gap-2 transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(250,248,245,.4)", color: "var(--bg)" }}
                >
                  GitHub ↗
                </a>
              </MagneticButton>
            </div>
            <div className="stat-strip flex gap-8 flex-wrap pt-6" style={{ borderTop: "1px solid rgba(250,248,245,.2)" }}>
              {STATS.map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>
                    {s.num}
                  </div>
                  <div className="font-mono text-[10px] tracking-[.05em] mt-1.5" style={{ color: "rgba(250,248,245,.6)" }}>
                    {s.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-cue hidden md:flex absolute bottom-9 left-11 font-mono text-[10px] tracking-[.08em] items-center gap-2 z-[2]" style={{ color: "rgba(250,248,245,.6)" }}>
          <span className="relative w-px h-[34px] overflow-hidden block" style={{ background: "linear-gradient(rgba(250,248,245,.5), transparent)" }}>
            <span
              className="absolute -top-[34px] left-0 w-full h-[34px] block"
              style={{ background: "var(--ink)", animation: "scrollcue 1.8s infinite var(--ease)" }}
            />
          </span>
          SCROLL
        </div>
      </section>
    </div>
  );
}
