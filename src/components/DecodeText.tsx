"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\\\/[]{}—=+*^?#";

export default function DecodeText({ text, className, as: Component = "span" }: { text: string, className?: string, as?: any }) {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const original = useRef(text);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let obj = { progress: 0 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
    
    tl.to(obj, {
      progress: 1,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        const p = obj.progress;
        let newText = "";
        for (let i = 0; i < original.current.length; i++) {
          const char = original.current[i];
          if (char === " ") {
            newText += " ";
            continue;
          }
          if (i / original.current.length < p) {
            newText += char;
          } else {
            newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setOutput(newText);
      },
      onComplete: () => {
        setOutput(original.current);
      }
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Component ref={ref} className={className}>
      {output}
    </Component>
  );
}
