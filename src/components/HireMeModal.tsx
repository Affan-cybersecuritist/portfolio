"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { site } from "@/data/projects";

export default function HireMeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener("open-hire-me", handleOpen);
    return () => document.removeEventListener("open-hire-me", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        "#hire-me-overlay",
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(15px)", duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        "#hire-me-modal",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.5)" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const close = () => {
    gsap.to("#hire-me-modal", { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" });
    gsap.to("#hire-me-overlay", { 
      opacity: 0, 
      backdropFilter: "blur(0px)", 
      duration: 0.4, 
      ease: "power2.in", 
      onComplete: () => setIsOpen(false) 
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="hire-me-overlay"
      className="fixed inset-0 z-[9999] flex flex-col bg-[#050404]"
    >
      <div className="h-20 border-b border-[#2a2220] flex items-center justify-between px-6 bg-[#0a0808]">
        <div className="flex items-center gap-6">
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tighter">MOHAMED AFFAN H</h2>
          <div className="hidden md:flex gap-6 font-mono text-xs">
            <a href={`mailto:${site.email}`} data-cursor="EMAIL" className="text-gray-400 hover:text-[var(--red)] transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--red)] rounded-full animate-pulse" /> EMAIL
            </a>
            <a href="tel:+919500464771" data-cursor="CALL" className="text-gray-400 hover:text-[var(--red)] transition-colors">PHONE</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" data-cursor="LINKEDIN" className="text-gray-400 hover:text-[var(--red)] transition-colors">LINKEDIN</a>
            <a href={site.github} target="_blank" rel="noreferrer" data-cursor="GITHUB" className="text-gray-400 hover:text-[var(--red)] transition-colors">GITHUB</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/Mohamed_Affan_H_Resume.pdf" download data-cursor="SAVE" className="hidden sm:block font-mono text-xs border border-[var(--red)] text-[var(--red)] px-4 py-2 hover:bg-[var(--red)] hover:text-white transition-all">
            DOWNLOAD FULL PDF
          </a>
          <button onClick={close} data-cursor="CLOSE" className="w-10 h-10 flex items-center justify-center bg-[#2a2220] text-white hover:bg-[var(--red)] transition-colors">
            ✕
          </button>
        </div>
      </div>

      {/* Main Content - Full PDF View */}
      <div 
        id="hire-me-modal"
        className="flex-1 w-full bg-[#1a1514] p-0 md:p-8 flex justify-center overflow-hidden"
      >
         <iframe 
           src="/Mohamed_Affan_H_Resume.pdf#view=FitH&toolbar=0&navpanes=0" 
           className="w-full max-w-5xl h-full border-none shadow-2xl bg-white"
           title="Mohamed Affan H Resume"
         />
      </div>
    </div>
  );
}
