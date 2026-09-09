import { projects, flagshipProject } from "@/data/projects";

/**
 * The hero's background graphic is not decoration — it's the same node
 * layout that becomes the real Systems constellation lower on the page, just
 * quieter and out of focus. It plants a shape the eye later recognizes, rather
 * than filling space with a generic "tech" visual unrelated to the content.
 * Pure SVG + CSS (no WebGL, no render loop): cheap, and animates correctly
 * even when the tab is backgrounded.
 */
export default function HeroSignal() {
  const scale = (v: number) => v * 3.6;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 360"
      className="absolute -right-[8%] -top-[6%] w-[62%] max-w-[560px] opacity-[0.55] pointer-events-none select-none"
    >
      {projects
        .filter((p) => p.id !== flagshipProject.id)
        .map((p) => (
          <line
            key={p.id}
            x1={scale(flagshipProject.pos.x)}
            y1={scale(flagshipProject.pos.y)}
            x2={scale(p.pos.x)}
            y2={scale(p.pos.y)}
            stroke="rgba(250,248,245,.4)"
            strokeWidth={1}
            strokeDasharray="1 7"
            className="signal-line"
          />
        ))}
      {projects.map((p) => (
        <g key={p.id}>
          {p.flagship && (
            <circle
              cx={scale(p.pos.x)}
              cy={scale(p.pos.y)}
              r={5}
              fill="none"
              stroke="var(--ink)"
              strokeWidth={1}
              className="signal-ring"
            />
          )}
          <circle
            cx={scale(p.pos.x)}
            cy={scale(p.pos.y)}
            r={p.flagship ? 4.5 : 2.5}
            fill={p.flagship ? "var(--ink)" : "rgba(250,248,245,.7)"}
          />
        </g>
      ))}
      <style>{`
        .signal-line { animation: signal-dash 5s linear infinite; }
        .signal-ring { animation: signal-ring 2.8s cubic-bezier(.22,1,.36,1) infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes signal-dash { to { stroke-dashoffset: -32; } }
        @keyframes signal-ring {
          0% { r: 5; opacity: .9; }
          100% { r: 26; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
