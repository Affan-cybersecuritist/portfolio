"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { getLenis } from "@/lib/useLenis";

export default function CaseStudyOverlay({
  project,
  index,
  total,
  onClose,
}: {
  project: Project | null;
  index?: number;
  total?: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <div
      data-dark-cursor
      aria-hidden={!project}
      className="fixed inset-0 z-[700] overflow-y-auto text-[var(--bg)]"
      style={{
        background: "var(--black-panel)",
        transform: project ? "scale(1)" : "scale(0.95)",
        opacity: project ? 1 : 0,
        clipPath: project ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
        pointerEvents: project ? "auto" : "none",
        transition: "transform .7s cubic-bezier(.22,1,.36,1), opacity .5s ease, clip-path .7s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="fixed top-6 right-8 z-[710] font-mono text-[11px] tracking-[.06em] px-4 py-2.5 border transition-colors hover:border-[var(--red)]"
        style={{ color: "#B9B2AA", borderColor: "#3A3330", background: "var(--black-panel)" }}
      >
        ✕ CLOSE
      </button>
      {project && (
        <div
          className="wrap pt-[110px] pb-[140px]"
          style={{
            opacity: project ? 1 : 0,
            transform: project ? "translateY(0)" : "translateY(16px)",
            transition: "opacity .5s ease .15s, transform .5s cubic-bezier(.22,1,.36,1) .15s",
          }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
            <div className="font-mono text-[11px] tracking-[.08em]" style={{ color: "var(--red)" }}>
              {project.flagship ? "SYSTEM 01 — FLAGSHIP" : "CASE STUDY"} · {project.category}
            </div>
            {typeof index === "number" && total && (
              <div className="font-mono text-[11px] tracking-[.08em]" style={{ color: "#736C64" }}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            )}
          </div>
          <h2
            className="font-display font-extrabold uppercase leading-[.94] my-4"
            style={{ fontSize: "clamp(38px,6.4vw,90px)" }}
          >
            {project.title}
          </h2>
          <p className="font-display font-medium max-w-[660px] mb-4" style={{ fontSize: "clamp(18px,2.2vw,24px)", color: "#C9C2B9" }}>
            {project.value}
          </p>
          <div className="flex gap-2 flex-wrap mb-14">
            {project.tags.map((t) => (
              <span key={t} className="font-mono text-[10.5px] px-2.5 py-1.5 border" style={{ color: "#B9B2AA", borderColor: "#3A3330" }}>
                {t}
              </span>
            ))}
          </div>
          {project.metrics.length > 0 && (
            <div className="flex gap-12 flex-wrap mb-[70px] py-8 border-t border-b" style={{ borderColor: "#3A3330" }}>
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--red)" }}>
                    {m.num}
                  </div>
                  <div className="font-mono text-[10.5px] mt-2 tracking-[.05em]" style={{ color: "#9B948C" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {project.blocks.map((b) => (
            <div key={b.heading} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-10 mb-14 max-w-[920px]">
              <h4 className="font-mono text-[11px] tracking-[.07em]" style={{ color: "#736C64" }}>
                {b.heading.toUpperCase()}
              </h4>
              <div className="max-w-[64ch] text-base" style={{ color: "#C9C2B9" }}>
                {b.body}
              </div>
            </div>
          ))}
          <div className="flex gap-4 flex-wrap">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener"
                data-cursor="OPEN ↗"
                className="font-mono text-xs tracking-[.06em] px-7 py-4 border-2 hover:bg-[var(--red-dark)] transition-colors"
                style={{ borderColor: "var(--red)", color: "var(--bg)", background: "var(--red)" }}
              >
                Live Demo ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener"
                data-cursor="OPEN ↗"
                className="font-mono text-xs tracking-[.06em] px-7 py-4 border hover:text-[var(--bg)]"
                style={{ borderColor: "#3A3330", color: "#C9C2B9" }}
              >
                Source ↗
              </a>
            )}
            <a
              href="https://github.com/Affan-cybersecuritist"
              target="_blank"
              rel="noopener"
              data-cursor="OPEN ↗"
              className="font-mono text-xs tracking-[.06em] px-7 py-4 border hover:text-[var(--bg)]"
              style={{ borderColor: "#3A3330", color: "#C9C2B9" }}
            >
              Full Build Log ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
