"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/**
 * Illustrative, client-side scoring demo — a simplified stand-in for the reasoning
 * behind Network Guardian's Isolation Forest. It is explicitly labeled as such:
 * there is no live backend or trained model behind this page.
 */
export default function SecurityLab() {
  const [packetRate, setPacketRate] = useState(50);
  const [entropy, setEntropy] = useState(50);
  const [diversity, setDiversity] = useState(50);
  const sectionRef = useRef<HTMLElement>(null);

  const dev = (Math.abs(packetRate - 50) * 0.35 + Math.abs(entropy - 50) * 0.4 + Math.abs(diversity - 50) * 0.25) / 50;
  const score = Math.min(1, dev);
  const verdict = score < 0.3 ? "— NORMAL —" : score < 0.65 ? "— WATCHLISTED —" : "— ISOLATED —";
  const verdictColor = score < 0.3 ? "#8ac48f" : score < 0.65 ? "#e0b34d" : "var(--red)";

  let insight = "";
  if (score < 0.3) {
    insight = "Traffic is normal. The model is allowing standard network requests (like employees browsing or sending emails) through to the core server.";
  } else if (score < 0.65) {
    insight = "Suspicious payload pattern. The data is unusually scrambled or moving too fast. The model is watching the source IP but hasn't blocked it yet.";
  } else {
    insight = "This is what the trained model would flag as an active intrusion: the traffic pattern crosses the anomaly threshold, and the illustrated response is an immediate firewall rule isolating the source IP.";
  }

  // Every number below is a deterministic function of the three sliders above —
  // nothing here is randomized or ticks on its own. A version of this once faked
  // "live" server telemetry with setInterval(Math.random), styled as a real
  // dashboard — presenting invented data as real readings, which is exactly what
  // this project's "never fabricate stats" premise exists to argue against.
  const isAttack = score >= 0.65;
  const isWarn = score >= 0.3 && !isAttack;

  const dataIntegrity = isAttack ? "CORRUPTED" : isWarn ? "DEGRADED" : "VERIFIED";
  const firewallStatus = isAttack ? "ACTIVE BLOCK" : isWarn ? "SCANNING" : "STANDBY";
  const sysLoad = 12 + score * 86;
  const activeConns = Math.round(142 + score * 8260);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (reduced || !section) return;

    gsap.registerPlugin(ScrollTrigger);
    const readout = section.querySelector(".lab-readout");
    const visual = section.querySelector(".lab-visual");
    const targets = [readout, visual].filter(Boolean) as Element[];
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, filter: "brightness(2.2)" });
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 60%" } });
    tl.to(targets, { opacity: 1, duration: 0.06 })
      .to(targets, { opacity: 0.25, duration: 0.05 })
      .to(targets, { opacity: 1, duration: 0.08 })
      .to(targets, { opacity: 0.4, duration: 0.04 })
      .to(targets, { opacity: 1, filter: "brightness(1)", duration: 0.5, ease: "power2.out" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative py-[100px] md:py-[150px] border-none"
      style={{ background: "var(--black-panel)", color: "var(--bg)" }}
    >
      {/* DIAGONAL CYBER SLASH - TOP */}
      <div className="absolute top-0 left-0 w-full h-[60px] md:h-[120px] -translate-y-[99%] z-30 pointer-events-none">
        <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full block">
          <polygon points="0,100 100,0 100,100" fill="var(--black-panel)" />
          <polyline points="0,100 100,0" stroke="var(--red)" strokeWidth="0.8" fill="none" style={{ filter: "drop-shadow(0 0 10px var(--red))" }} />
        </svg>
      </div>

      {/* DIAGONAL CYBER SLASH - BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[120px] translate-y-[99%] z-30 pointer-events-none">
        <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full block">
          <polygon points="0,0 100,0 100,100" fill="var(--black-panel)" />
          <polyline points="0,0 100,100" stroke="var(--red)" strokeWidth="0.8" fill="none" style={{ filter: "drop-shadow(0 0 10px var(--red))" }} />
        </svg>
      </div>

      <div className="wrap relative z-20">
        <SectionHead
          num="03 / SECURITY LAB"
          title={<>See the <em className="text-[var(--red)] not-italic">detection logic</em> think.</>}
          sub="Adjust the traffic features. Watch the anomaly score move."
        />
        <Reveal className="grid md:grid-cols-[.9fr_1.1fr] gap-10 md:gap-[70px]" delay={0.1}>
          <div>
            <div className="font-mono text-[10px] tracking-[.1em] mb-4 text-[var(--red)] font-bold">
              PROJECT SIMULATION: NETWORK GUARDIAN
            </div>
            <p
              className="font-mono text-[12px] leading-relaxed max-w-[44ch] mb-8 pl-4 border-l-2"
              style={{ color: "#9B948C", borderColor: "var(--red)" }}
            >
              How does the <b>Network Guardian</b> AI catch a hacker without knowing their exact attack signature? It learns what "normal" looks like, and blocks the anomalies.
              <br/><br/>
              Play with the sliders below to simulate a network attack. Watch how the algorithm protects the core server in real-time.
            </p>
            <div className="flex flex-col gap-5">
              <Slider 
                title="TRAFFIC SPEED" 
                subtitle="(Technical: Packet Rate Deviation)" 
                value={packetRate} 
                onChange={setPacketRate} 
              />
              <Slider 
                title="DATA SCRAMBLING" 
                subtitle="(Technical: Payload Entropy)" 
                value={entropy} 
                onChange={setEntropy} 
              />
              <Slider 
                title="SYSTEMS TARGETED" 
                subtitle="(Technical: Destination Diversity)" 
                value={diversity} 
                onChange={setDiversity} 
              />
            </div>
            <div className="lab-readout mt-6 border p-6 flex flex-col gap-4" style={{ borderColor: "#3A3330", background: "#1E1715" }}>
              <div className="flex justify-between items-baseline">
                <span className="font-display font-extrabold text-[48px]" style={{ color: verdictColor, transition: "color 0.3s ease" }}>
                  {score.toFixed(2)}
                </span>
                <span className="font-mono text-xs tracking-[.05em] font-bold" style={{ color: verdictColor, transition: "color 0.3s ease" }}>
                  {verdict}
                </span>
              </div>
              <div className="h-2 relative overflow-hidden" style={{ background: "#2A2422" }}>
                <div className="absolute left-0 top-0 h-full transition-[width,background-color] duration-300" style={{ width: `${score * 100}%`, background: verdictColor }} />
              </div>
              
              {/* Plain English Insight */}
              <div className="font-mono text-[10.5px] leading-relaxed mt-2" style={{ color: "#B9B2AA" }}>
                <span style={{ color: verdictColor, fontWeight: "bold" }}>AI VERDICT: </span>
                {insight}
              </div>
            </div>
          </div>
          <div className="lab-visual min-h-[420px] flex flex-col p-6 md:p-8 rounded-lg border relative overflow-hidden group" style={{ background: "#050404", borderColor: isAttack ? "var(--red)" : "#2A2422", transition: "all 0.4s ease", boxShadow: isAttack ? "0 0 50px rgba(215,38,61,0.1) inset" : "0 0 30px rgba(0,0,0,0.5) inset" }}>
            
            {/* Moving Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] animate-pan-grid" style={{ backgroundImage: "linear-gradient(rgba(250,248,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            
            {/* CRT Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12] z-0 mix-blend-overlay" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 51%)", backgroundSize: "100% 4px" }} />

            {/* Sweeping Scanline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] z-0 opacity-40 animate-scanline pointer-events-none" style={{ background: isAttack ? "var(--red)" : "#8ac48f", boxShadow: isAttack ? "0 0 20px 2px var(--red)" : "0 0 20px 2px #8ac48f" }} />

            {/* Dashboard Header */}
            <div className="relative z-10 flex justify-between items-center mb-8 border-b pb-3" style={{ borderColor: isAttack ? "rgba(215,38,61,0.3)" : "#2A2422", transition: "border-color 0.4s ease" }}>
              <div className="flex gap-3 items-center">
                 <span className={`w-2.5 h-2.5 rounded-full ${isAttack ? 'bg-[var(--red)] animate-pulse' : 'bg-[#8ac48f]'}`} style={{ boxShadow: isAttack ? "0 0 10px var(--red)" : "0 0 10px #8ac48f" }} />
                 <span className="font-mono text-[10px] tracking-[.2em] uppercase font-bold" style={{ color: isAttack ? 'var(--red)' : '#8ac48f', transition: "color 0.4s ease" }}>
                   {isAttack ? "SYSTEM LOCKDOWN ENGAGED" : "NODE-01 SECURE"}
                 </span>
              </div>
              <div className="font-mono text-[9px] text-[#9B948C] tracking-widest opacity-60">
                 NET.GUARDIAN // v2.0.4
              </div>
            </div>

            {/* Premium Server Dashboard Grid */}
            <div className="relative z-10 w-full grid grid-cols-2 gap-4 md:gap-5 flex-1">
              
              <MetricCard 
                label="SYSTEM LOAD" 
                value={`${sysLoad.toFixed(1)}%`} 
                color={isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f"}
                glitch={isAttack}
              />
              
              <MetricCard 
                label="ACTIVE CONNS" 
                value={activeConns.toLocaleString()} 
                color={isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f"}
              />
              
              <MetricCard 
                label="PAYLOAD INTEGRITY" 
                value={dataIntegrity} 
                color={isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f"}
              />
              
              <div className="p-4 md:p-5 border relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center" 
                   style={{ borderColor: isAttack ? "var(--red)" : "#2A2422", background: isAttack ? `rgba(215,38,61,0.08)` : "rgba(20, 15, 15, 0.6)" }}>
                <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300" style={{ background: isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f" }} />
                
                <div className="font-mono text-[9px] tracking-[.15em] opacity-70 mb-2" style={{ color: "var(--bg)" }}>
                  FIREWALL STATUS
                </div>
                <div className={`font-display font-bold text-2xl tracking-wide ${isAttack ? 'animate-pulse' : ''}`} style={{ color: isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f", textShadow: isAttack ? "0 0 15px var(--red)" : "none" }}>
                  {firewallStatus}
                </div>
                {isAttack && (
                  <div className="font-mono text-[9px] mt-2 text-[var(--red)] uppercase tracking-[.1em] font-bold">
                    Zero-Trust Triggered
                  </div>
                )}
                
                <div className="absolute right-0 bottom-0 w-3 h-3 border-r border-b opacity-50" style={{ borderColor: isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f" }} />
                <div className="absolute right-0 top-0 w-3 h-3 border-r border-t opacity-50" style={{ borderColor: isAttack ? "var(--red)" : isWarn ? "#e0b34d" : "#8ac48f" }} />
              </div>

            </div>

            {/* Warning Overlay */}
            {isAttack && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-[rgba(215,38,61,0.05)] border-[2px] border-[var(--red)] animate-pulse mix-blend-overlay" />
            )}
            
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MetricCard({ label, value, color, glitch }: { label: string; value: string; color: string; glitch?: boolean }) {
  return (
    <div className="p-4 md:p-5 border relative overflow-hidden transition-all duration-300 flex flex-col justify-between" 
         style={{ borderColor: "#2A2422", background: "rgba(20, 15, 15, 0.6)" }}>
      {/* Neon Side Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
      
      <div className="font-mono text-[9px] tracking-[.15em] opacity-70 mb-4 ml-1" style={{ color: "var(--bg)" }}>
        {label}
      </div>
      <div 
        className={`font-display font-bold text-3xl md:text-4xl tracking-tight ml-1 ${glitch ? 'animate-pulse' : ''}`} 
        style={{ color, textShadow: glitch ? `0 0 15px ${color}` : "none", transition: "color 0.3s ease" }}
      >
        {value}
      </div>
      
      {/* Corner accents for premium feel */}
      <div className="absolute right-0 bottom-0 w-3 h-3 border-r border-b opacity-50" style={{ borderColor: color }} />
      <div className="absolute right-0 top-0 w-3 h-3 border-r border-t opacity-50" style={{ borderColor: color }} />
    </div>
  );
}

function Slider({ title, subtitle, value, onChange }: { title: string; subtitle: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex justify-between font-mono text-[11px] tracking-[.05em] mb-1" style={{ color: "var(--bg)" }}>
        {title} <b style={{ color: "var(--red)" }}>{value}%</b>
      </div>
      <div className="font-mono text-[9.5px] tracking-[.05em] mb-2.5 opacity-50" style={{ color: "#B9B2AA" }}>
        {subtitle}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--red)]"
      />
    </label>
  );
}
