import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Case = {
  name: string;
  tag: string;
  start: string;
  action: string;
  result: { k: string; v: string }[];
  next: string;
  accent?: string;
};

const cases: Case[] = [
  {
    name: "Akshaya Medical Centre",
    tag: "Healthcare · Local growth",
    start: "A trusted clinic with strong word-of-mouth but invisible online — no leads from search, weak GMB presence.",
    action: "Built a high-intent local SEO engine, redesigned the website around appointments, and produced patient-education content that ranked.",
    result: [
      { k: "Instagram views", v: "52K+" },
      { k: "Monthly reach", v: "122K" },
      { k: "Qualified leads", v: "89" },
      { k: "GMB views", v: "5.5K" },
      { k: "Direction requests", v: "47x" },
    ],
    next: "Launching a paid acquisition layer for specialty consultations.",
  },
  {
    name: "Ayoham Dining",
    tag: "F&B · Revenue scaling",
    start: "Beautiful restaurant, low monthly revenue, no consistent channel for bookings.",
    action: "Repositioned the brand, ran a content-first Meta strategy, and built a reservation funnel that actually converts.",
    result: [
      { k: "Monthly revenue", v: "₹1.9L → ₹3L" },
      { k: "Content views", v: "363K" },
      { k: "Lift", v: "+58%" },
    ],
    next: "Expanding to a second outlet with the same playbook.",
  },
  {
    name: "Gainz Cafe",
    tag: "F&B · Community-led growth",
    start: "Niche fitness cafe with a loyal but small audience. Sales had plateaued.",
    action: "Built a community-driven content engine and a loyalty-led offer system that turned regulars into evangelists.",
    result: [
      { k: "Sales growth", v: "+60%" },
      { k: "Repeat rate", v: "+34%" },
    ],
    next: "Productizing meal-plans as a subscription.",
  },
  {
    name: "Inversa Technosoft",
    tag: "B2B SaaS · Web transformation",
    start: "Outdated site that didn't reflect the team's technical depth. Low trust, low inbound.",
    action: "Complete brand & website rebuild with a story-driven structure and technical SEO foundation.",
    result: [
      { k: "Inbound demos", v: "+3.2×" },
      { k: "Bounce", v: "-41%" },
    ],
    next: "Launching content for enterprise buyer journey.",
  },
  {
    name: "Nandaki Ayur",
    tag: "Wellness · Brand + SEO",
    start: "Authentic Ayurveda practice with no digital identity to match its craft.",
    action: "Designed a brand system rooted in calm authority. Stood up SEO + content engine for treatment pages.",
    result: [
      { k: "Organic traffic", v: "4.6×" },
      { k: "Treatment enquiries", v: "+40%" },
    ],
    next: "Productizing wellness retreats with paid amplification.",
  },
];

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(value);

  // Animate only pure numeric portions
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([^\d]*)(\d[\d,]*)([\s\S]*)$/);
    if (!match) { setDisplay(value); return; }
    const [, pre, num, post] = match;
    const target = parseInt(num.replace(/,/g, ""), 10);
    if (Number.isNaN(target)) { setDisplay(value); return; }
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(target * eased).toLocaleString();
      setDisplay(`${pre}${cur}${post}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function CaseStudies() {
  return (
    <section id="work" className="section-pad relative bg-ink text-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, #7CC7A5 0%, transparent 40%), radial-gradient(circle at 80% 90%, #DFF4E8 0%, transparent 40%)",
        }} />

      <div className="container-tight relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="eyebrow !text-mint mb-4">Client transformations</div>
            <h2 className="headline-lg text-background max-w-2xl">
              Real businesses. <em className="italic text-mint/80">Real numbers.</em> Real stories.
            </h2>
          </div>
          <p className="text-background/60 max-w-sm">
            Five featured journeys — each measured, documented, and still
            compounding today.
          </p>
        </div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-6 md:p-10 backdrop-blur"
            >
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-mint/70">{c.tag}</div>
                  <h3 className="font-display text-3xl md:text-4xl mt-3 text-background">{c.name}</h3>
                  <div className="num text-xs text-background/40 mt-4">CASE · 0{i + 1}</div>
                </div>

                <div className="space-y-5">
                  <Row label="Start" text={c.start} />
                  <Row label="Action" text={c.action} />

                  <div>
                    <div className="eyebrow !text-mint/80 mb-3">Result</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {c.result.map((r) => (
                        <div key={r.k} className="rounded-xl border border-white/10 bg-black/30 p-4">
                          <div className="num text-2xl text-background">
                            <Counter value={r.v} />
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-background/50 mt-1">{r.k}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Row label="Next" text={c.next} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 text-mint/90 hover:text-mint border-b border-mint/40 pb-1">
            Want a story like these? Let's talk <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
      <div className="eyebrow !text-mint/80">{label}</div>
      <p className="text-background/80 leading-relaxed">{text}</p>
    </div>
  );
}
