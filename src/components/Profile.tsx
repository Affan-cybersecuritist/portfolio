import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ThreatScanner from "./ThreatScanner";
import DecodeText from "./DecodeText";

export default function Profile() {
  return (
    <section
      id="profile"
      className="relative z-10 py-[100px] md:py-[150px] rounded-t-[28px] md:rounded-t-[40px]"
      style={{ background: "var(--bg)", boxShadow: "0 -40px 80px rgba(0,0,0,.25)" }}
    >
      <div className="wrap">
        <SectionHead num="01 / PROFILE" title={<>From theory to <em className="text-[var(--red)] not-italic">working systems.</em></>} />
        <div className="grid md:grid-cols-[1.15fr_.85fr] gap-12 md:gap-20 items-start">
          <Reveal>
            <p
              className="font-display font-extrabold uppercase leading-[1.06] mb-9"
              style={{ fontSize: "clamp(30px,4.4vw,52px)" }}
            >
              <DecodeText text="I don't just study security." />
              <br />
              <span className="text-[var(--ink-faint)]"><DecodeText text="I build. I break." /></span>
              <br /><DecodeText text="I analyze. I rebuild." />
            </p>
            <p className="max-w-[54ch] text-[var(--ink-muted)] text-base mb-9 font-medium">
              Cybersecurity undergraduate focused on <strong className="text-[var(--ink)] font-black">security
              engineering and GRC</strong> — anomaly detection, zero-trust architecture, compliance automation, and
              agentic red/blue-team pipelines. I take security ideas out of research papers and hackathon slide
              decks and turn them into things that actually run.
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 font-mono text-[12.5px]">
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">LOCATION</dt>
                <dd className="font-semibold">Chennai, India</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">FOCUS</dt>
                <dd className="font-semibold">Security Engineering × GRC</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">EDUCATION</dt>
                <dd className="font-semibold">B.E. Cybersecurity, Chennai Institute of Technology</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">STATUS</dt>
                <dd className="font-semibold">Open to Internships</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">MINOR</dt>
                <dd className="font-semibold">Innovation & Entrepreneurship</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)] font-bold tracking-[.05em] mb-1">OUTSIDE THE TERMINAL</dt>
                <dd className="font-semibold">Karate — Black Belt</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal
            as="div"
            className="relative aspect-[4/5] flex items-center justify-center overflow-hidden border border-[var(--ink)]"
            delay={0.1}
          >
            <div className="absolute inset-0" style={{ background: "var(--black-panel)" }} />
            <ThreatScanner />
            <span className="absolute w-3.5 h-3.5 border-t border-l opacity-80" style={{ top: 10, left: 10, borderColor: "var(--red)" }} />
            <span className="absolute w-3.5 h-3.5 border-b border-r opacity-80" style={{ bottom: 10, right: 10, borderColor: "var(--red)" }} />
            <div className="absolute bottom-3.5 left-3.5 font-mono text-[10px] tracking-[.08em] text-[var(--bg)] px-2.5 py-1.5 border border-[#333]" style={{ background: "rgba(0,0,0,.4)" }}>
              AFFAN_H — CIT, 2025–2029
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
