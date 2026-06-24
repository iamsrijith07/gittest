import { motion } from "framer-motion";

const before = [
  "Digitally absent",
  "No impressions or leads",
  "Inconsistent growth"
];

const after = [
  "Overall visibility",
  "Consistent leads",
  "Scalable / exponential growth"
];

export function Philosophy() {
  return (
    <section id="philosophy" className="section-pad relative">
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <div className="eyebrow mb-5">The philosophy</div>
            <h2 className="headline-lg text-balance">
              Your business already has potential. <em className="italic text-muted-foreground">I build the road</em> to reach it.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              Growth isn't a tactic — it's a sequence. Every brand I work with
              moves from invisible to chosen through a deliberate set of moves
              across web, search, and story.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" />

            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              <Column label="Before" tone="muted" items={before} />
              <Column label="After" tone="accent" items={after} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Column({ label, items, tone }: { label: string; items: string[]; tone: "muted" | "accent" }) {
  return (
    <div>
      <div className={`eyebrow mb-6 ${tone === "accent" ? "text-ink" : ""}`}>{label}</div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <motion.div
            key={it}
            initial={{ opacity: 0, x: tone === "accent" ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`p-5 rounded-2xl border ${
              tone === "accent"
                ? "bg-gradient-to-br from-mint/70 to-white shadow-soft border-accent/20"
                : "bg-muted/40 border-line text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full ${tone === "accent" ? "bg-accent" : "bg-muted-foreground/50"}`} />
              <span className={tone === "accent" ? "text-ink font-medium" : ""}>{it}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
