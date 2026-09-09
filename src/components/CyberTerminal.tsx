"use client";

import { useEffect, useRef, useState } from "react";

const LOG_MESSAGES = [
  "[*] INITIATING SCAN...",
  "[+] KERNEL MODULE LOADED",
  "[!] WARNING: UNAUTHORIZED ACCESS ATTEMPT DETECTED",
  "[*] RE-ROUTING TRAFFIC...",
  "[+] PACKET INJECTION SUCCESSFUL",
  "[!] FIREWALL BREACHED",
  "[*] EXTRACTING PAYLOAD...",
  "[+] DECRYPTION COMPLETE",
  "[*] ESTABLISHING SECURE CONNECTION...",
  "[+] CONNECTION ESTABLISHED: 192.168.1.100",
  "[*] MONITORING NETWORK TRAFFIC...",
  "[!] ANOMALY DETECTED IN NODE_04",
  "[+] DEPLOYING COUNTERMEASURE...",
  "[*] EXECUTING SHELLCODE...",
  "[+] PRIVILEGE ESCALATION SUCCESSFUL",
  "[*] MAPPING NETWORK TOPOLOGY...",
  "[!] SUSPICIOUS PROCESS DETECTED: PID 1337",
  "[*] ANALYZING THREAT SIGNATURE...",
  "[+] THREAT NEUTRALIZED",
];

export default function CyberTerminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const addLog = () => {
      setLogs((prev) => {
        const newLogs = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
        if (newLogs.length > 15) return newLogs.slice(newLogs.length - 15);
        return newLogs;
      });
      
      // Random delay between 100ms and 800ms
      const delay = Math.random() * 700 + 100;
      timeout = setTimeout(addLog, delay);
    };

    addLog();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="absolute inset-0 bg-[#050404] font-mono text-[11px] md:text-[13px] leading-relaxed p-6 md:p-8 flex flex-col">
      {/* Terminal Header */}
      <div className="flex justify-between items-center border-b border-[#2a2220] pb-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[var(--red)] animate-pulse rounded-full" />
          <span className="text-[var(--red)] tracking-widest font-bold">ROOT_ACCESS // TERMINAL</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 border border-[#2a2220] rounded-full" />
          <span className="w-2.5 h-2.5 border border-[#2a2220] rounded-full" />
          <span className="w-2.5 h-2.5 border border-[#2a2220] rounded-full" />
        </div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden flex flex-col justify-end"
      >
        <div className="flex flex-col gap-1.5">
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`${
                log.includes("[!]") ? "text-[var(--red)] font-bold" :
                log.includes("[+]") ? "text-[#8ac48f]" :
                "text-[#FAF8F5] opacity-70"
              }`}
            >
              {log}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[var(--red)]">root@hma:~#</span>
            <span className="w-2 h-4 bg-[#FAF8F5] animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(250,248,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,245,1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-0 mix-blend-overlay" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 51%)", backgroundSize: "100% 4px" }} />
    </div>
  );
}
