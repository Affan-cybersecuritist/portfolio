import Reveal from "./Reveal";
import CyberSlice from "./CyberSlice";

export default function SectionHead({
  num,
  title,
  sub,
}: {
  num: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <Reveal className="flex justify-between items-end gap-6 flex-wrap mb-16">
      <div>
        <div className="font-mono text-[11px] tracking-[.08em] text-[var(--ink-faint)]">
          {num}
        </div>
        <h2
          className="font-display font-extrabold uppercase leading-[1.02] tracking-[-.01em] max-w-[700px] mt-2"
          style={{ fontSize: "clamp(34px,4.6vw,60px)" }}
        >
          <CyberSlice>{title}</CyberSlice>
        </h2>
      </div>
      {sub && (
        <p className="font-mono text-xs text-[var(--ink-muted)] max-w-[280px] text-right md:text-right sm:text-left leading-relaxed">
          {sub}
        </p>
      )}
    </Reveal>
  );
}
