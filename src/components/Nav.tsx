"use client";

import { useState } from "react";
import { getLenis } from "@/lib/useLenis";
import { site } from "@/data/projects";
import MagneticButton from "@/components/MagneticButton";

const LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#systems", label: "Systems" },
  { href: "#lab", label: "Lab" },
  { href: "#arsenal", label: "Arsenal" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -60 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // A frosted bar, not a transparent one: the nav floats over red, black, and
    // paper sections as the page scrolls, and no single flat text color holds
    // contrast against all three ?" so the bar carries its own consistent chrome.
    <header
      data-dark-cursor
      className="fixed top-0 left-0 right-0 z-[500] py-[14px]"
      style={{ background: "rgba(20,17,16,.32)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
    >
      <div className="wrap flex items-center justify-between">
        <div className="font-display font-bold text-[19px] tracking-tight transition-colors duration-300 hover:text-[var(--red)] cursor-pointer text-[var(--bg)]">
          HMA
        </div>
        <nav aria-label="Primary" className="hidden md:flex gap-[30px] items-center">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="glitch-text-hover font-mono text-[11px] tracking-[.06em] transition-colors relative pb-[2px] group"
              style={{ color: "rgba(250,248,245,.75)" }}
            >
              {l.label}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center">
          <MagneticButton strength={15}>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("open-hire-me"))}
              className="font-mono text-[11px] font-bold tracking-[.1em] px-5 py-2 transition-all duration-300 relative overflow-hidden group"
              style={{ backgroundColor: "var(--red)", color: "var(--bg)" }}
            >
              <span className="relative z-10">HIRE ME</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </MagneticButton>
        </div>
        <button
          className="md:hidden font-mono text-[11px] tracking-[.06em] border px-3 py-1.5"
          style={{ color: "var(--bg)", borderColor: "rgba(250,248,245,.4)" }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden flex flex-col gap-4 fixed top-16 right-6 bg-[var(--bg)] border border-[var(--line)] p-5 z-[600] shadow-[0_16px_40px_rgba(0,0,0,.25)]"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="font-mono text-[12px] tracking-[.06em] text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
