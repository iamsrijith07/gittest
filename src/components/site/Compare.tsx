import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { k: "Strategy", a: "Tactical, channel-by-channel", b: "End-to-end growth roadmap" },
  { k: "Support", a: "Slow, ticket-based", b: "Direct line, same-day replies" },
  { k: "Reports", a: "Vanity metrics", b: "Pipeline, CAC, LTV, ROAS" },
  { k: "Optimization", a: "Set and forget", b: "Weekly review & iterate" },
  { k: "Execution", a: "Hand-off, you figure it out", b: "Owned end-to-end, shipped fast" },
];

export function Compare() {
  return (
    <section className="section-pad bg-background">
      <div className="container-tight">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">Why clients choose us</div>
          <h2 className="headline-lg">
            Not a freelancer. <em className="italic text-muted-foreground">A growth partner.</em>
          </h2>
        </div>

        <div className="rounded-3xl border border-line overflow-hidden bg-card shadow-soft">
          <div className="grid grid-cols-[1fr_1fr_1.2fr] text-xs uppercase tracking-widest text-muted-foreground bg-muted/40 border-b border-line">
            <div className="p-5"></div>
            <div className="p-5 border-l border-line">Typical freelancer</div>
            <div className="p-5 border-l border-line bg-gradient-to-r from-mint/40 to-mint/60 text-ink">Growth partner</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="grid grid-cols-[1fr_1fr_1.2fr] border-b border-line last:border-0 items-stretch"
            >
              <div className="p-5 font-display text-xl text-ink">{r.k}</div>
              <div className="p-5 border-l border-line text-sm text-muted-foreground flex items-start gap-2">
                <X className="w-4 h-4 mt-0.5 shrink-0 opacity-50" /> {r.a}
              </div>
              <div className="p-5 border-l border-line text-sm text-ink flex items-start gap-2 bg-mint/10">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent" /> {r.b}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
