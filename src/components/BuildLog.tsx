"use client";

import { otherProjects, site } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function BuildLog() {
  return (
    <section id="buildlog" className="py-[100px] md:py-[150px] bg-[var(--bg)] text-[var(--ink)] border-none">
      <div className="wrap">
        <SectionHead
          num="06 / BUILD LOG"
          title={<>Still <em className="text-[var(--red)] not-italic">shipping.</em></>}
          sub="Public repositories & open source tools. No mockups."
        />
        
        {/* Massive Terminal Registry Table */}
        <Reveal className="mt-16 md:mt-24 border-t-2 border-[var(--ink)]">
          {otherProjects.map((p, i) => (
            <a 
              key={i}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-[rgba(20,17,16,0.1)] transition-all duration-500 overflow-hidden px-4 md:px-8 cursor-crosshair"
            >
              
              {/* Background Flash Effect (Slides up on hover) */}
              <div className="absolute inset-0 bg-[var(--red)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full">
                
                {/* Identifier */}
                <div className="font-mono text-[10px] text-[var(--ink-muted)] group-hover:text-white transition-colors duration-300 w-[120px] tracking-[.2em] uppercase shrink-0">
                  SYS // 0{i+1}
                  <br />
                  <span className="text-[var(--red)] group-hover:text-white opacity-80 mt-2 inline-block">[{p.tech}]</span>
                </div>

                {/* Massive Title */}
                <h3 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-[var(--ink)] group-hover:text-white transition-colors duration-300 flex-1 m-0">
                  {p.title}
                </h3>

                {/* Description */}
                <div className="font-mono text-[12px] text-[var(--ink)] group-hover:text-[#FAF8F5] transition-colors duration-300 max-w-[40ch] opacity-80 group-hover:opacity-100">
                  {p.desc}
                </div>

                {/* Action Arrow */}
                <div className="hidden md:flex shrink-0 w-[60px] h-[60px] border border-[var(--ink)] group-hover:border-white items-center justify-center rounded-full group-hover:bg-white text-[var(--ink)] group-hover:text-[var(--red)] transition-all duration-500 transform group-hover:rotate-45">
                  <span className="font-mono text-2xl leading-none -mt-1 ml-1">↗</span>
                </div>
              </div>
            </a>
          ))}
        </Reveal>

        {/* View All Button */}
        <Reveal className="mt-20 flex justify-center" delay={0.2}>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-[var(--ink)] text-[var(--bg)] font-mono text-[11px] tracking-[.2em] uppercase overflow-hidden inline-flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(215,38,61,0.3)] transition-shadow duration-500"
          >
            <span className="relative z-10">Access Full Registry // 19 Repos</span>
            <div className="absolute inset-0 bg-[var(--red)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
