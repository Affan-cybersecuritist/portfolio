"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThreatScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const isTouch = matchMedia("(pointer:coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const onMove = (e: MouseEvent) => {
      if (!containerRef.current || !innerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // calculate distance from center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // limit the parallax distance
      const nx = x / rect.width;
      const ny = y / rect.height;

      gsap.to(innerRef.current, {
        x: nx * 30,
        y: ny * 30,
        rotationY: nx * 15,
        rotationX: -ny * 15,
        ease: "power2.out",
        duration: 0.6
      });
    };

    const onLeave = () => {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 1
      });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    
    // Rotate radar sweep
    if (radarRef.current) {
      gsap.to(radarRef.current, {
        rotation: 360,
        duration: 4,
        ease: "none",
        repeat: -1
      });
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: "linear-gradient(rgba(250,248,245,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} 
      />

      {/* Sweeping radar */}
      <div 
        ref={radarRef}
        className="absolute w-[180%] h-[180%] pointer-events-none origin-center opacity-70"
        style={{
          background: "conic-gradient(from 0deg, transparent 70%, rgba(215, 38, 61, 0.1) 95%, rgba(215, 38, 61, 0.6) 100%)",
          borderRadius: "50%",
        }}
      />
      
      {/* Random scanning blips (CSS animated) */}
      <div className="blip absolute w-2 h-2 rounded-full bg-[var(--red)] opacity-0 top-[30%] left-[60%]" style={{ animation: "blip 4s infinite 1s" }} />
      <div className="blip absolute w-1.5 h-1.5 rounded-full bg-[var(--red)] opacity-0 top-[65%] left-[25%]" style={{ animation: "blip 4s infinite 2.5s" }} />

      {/* The A Logo inside Parallax SVG */}
      <svg ref={innerRef} viewBox="0 0 200 200" fill="none" className="relative z-[1] will-change-transform" style={{ width: "62%" }}>
        {/* Outer rings */}
        <circle cx="100" cy="100" r="92" stroke="#3A3330" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="76" stroke="#2A2422" strokeWidth="1" />
        {/* Target rings */}
        <circle cx="100" cy="100" r="60" stroke="#D7263D" strokeWidth="1.4" />
        
        {/* Crosshairs */}
        <line x1="100" y1="20" x2="100" y2="35" stroke="#D7263D" strokeWidth="1.5" />
        <line x1="100" y1="180" x2="100" y2="165" stroke="#D7263D" strokeWidth="1.5" />
        <line x1="20" y1="100" x2="35" y2="100" stroke="#D7263D" strokeWidth="1.5" />
        <line x1="180" y1="100" x2="165" y2="100" stroke="#D7263D" strokeWidth="1.5" />

        {/* The 'A' */}
        <path d="M60 130 L100 55 L140 130 M76 100 H124" stroke="#FAF8F5" strokeWidth="4" strokeLinecap="square" style={{ filter: "drop-shadow(0 0 8px rgba(250,248,245,0.4))" }} />
      </svg>
      
      <style jsx>{`
        @keyframes blip {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.5); box-shadow: 0 0 10px var(--red); }
        }
      `}</style>
    </div>
  );
}
