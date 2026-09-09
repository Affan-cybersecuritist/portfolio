"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = matchMedia("(pointer:coarse)").matches;
    if (isTouch) {
      document.body.classList.add("touch");
      return;
    }
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove);

    const ticker = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    };
    gsap.ticker.add(ticker);

    const attach = () => {
      document.querySelectorAll<HTMLElement>("[data-cursor], a, button, .node-hit").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      ring.classList.add("hover");
      ring.classList.toggle("dark", !!el.closest("[data-dark-cursor]"));
      ring.dataset.label = el.getAttribute("data-cursor") || (el.classList.contains("node-hit") ? "VIEW" : "");
    };
    const leave = () => {
      ring.classList.remove("hover");
      ring.dataset.label = "";
    };

    attach();
    // Re-attach periodically since content mounts client-side (case overlay, etc.)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cursor-dot"
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100000] pointer-events-none rounded-full will-change-transform hidden md:block"
        style={{ width: 7, height: 7, background: "var(--red)" }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100000] pointer-events-none rounded-full will-change-transform hidden md:flex items-center justify-center"
        style={{
          width: 34,
          height: 34,
          border: "1px solid rgba(20,17,16,.35)",
          transition: "width .25s var(--ease), height .25s var(--ease), border-color .25s var(--ease), background .25s var(--ease)",
        }}
      />
      <style jsx global>{`
        #cursor-ring.hover {
          width: 70px;
          height: 70px;
          border-color: var(--red);
          background: rgba(215, 38, 61, 0.08);
        }
        #cursor-ring.hover::after {
          content: attr(data-label);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          color: var(--red);
          white-space: nowrap;
        }
        #cursor-ring.dark::after {
          color: var(--bg);
        }
        #cursor-ring.dark {
          border-color: rgba(250, 248, 245, 0.5);
        }
        body.touch #cursor-dot,
        body.touch #cursor-ring {
          display: none !important;
        }
      `}</style>
    </>
  );
}
