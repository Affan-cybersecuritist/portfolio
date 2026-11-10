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
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        isVisible = true;
        rx = mx;
        ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const onLeaveWindow = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnterWindow = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMouseDown = () => {
      ring.classList.add("active");
    };

    const onMouseUp = () => {
      ring.classList.remove("active");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const ticker = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    };
    gsap.ticker.add(ticker);

    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      ring.classList.add("hover");
      const isDark = !!el.closest("[data-dark-cursor]") || !!el.closest("#hero") || !!el.closest("#experience");
      ring.classList.toggle("dark", isDark);
    };

    const leave = () => {
      ring.classList.remove("hover");
      ring.classList.remove("dark");
    };

    const attach = () => {
      document.querySelectorAll<HTMLElement>("a, button, [data-cursor], .node-hit, input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
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
        className="fixed top-0 left-0 z-[100000] pointer-events-none rounded-full will-change-transform hidden md:block opacity-0"
        style={{
          width: 5,
          height: 5,
          background: "var(--red)",
          boxShadow: "0 0 6px rgba(215, 38, 61, 0.8)",
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100000] pointer-events-none rounded-full will-change-transform hidden md:flex items-center justify-center opacity-0"
        style={{
          width: 24,
          height: 24,
          border: "1px solid rgba(215, 38, 61, 0.45)",
          transition:
            "width 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
        }}
      />
      <style jsx global>{`
        #cursor-ring.hover {
          width: 38px;
          height: 38px;
          border: 1.5px solid var(--red);
          background-color: rgba(215, 38, 61, 0.08);
          box-shadow: 0 0 15px rgba(215, 38, 61, 0.2);
        }
        #cursor-ring.active {
          transform: translate(-50%, -50%) scale(0.85);
        }
        #cursor-ring.dark {
          border-color: rgba(250, 248, 245, 0.7);
        }
        #cursor-ring.dark.hover {
          border-color: var(--red);
          background-color: rgba(215, 38, 61, 0.16);
        }
        body.touch #cursor-dot,
        body.touch #cursor-ring {
          display: none !important;
        }
      `}</style>
    </>
  );
}
