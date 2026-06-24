import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    quote: "He didn't just build us a website — he gave us a way to grow. Six months in, we're booking more patients than ever.",
    name: "Dr. Pavana",
    role: "Akshaya Medical Centre",
  },
  {
    quote: "Our revenue moved from ₹1.9L to ₹3L in two months. The content strategy alone changed how the city sees us.",
    name: "Mrs. Pavithra",
    role: "Ayoham Dining",
  },
  {
    quote: "Strategic, sharp, and genuinely invested. Feels less like a vendor and more like a co-founder.",
    name: "Inversa Technosoft",
    role: "Leadership",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];

  return (
    <section className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--background), #F0F8F3)" }}>
      <div className="container-tight">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <div className="eyebrow mb-4">In their words</div>
            <h2 className="headline-lg">
              Founders, in <em className="italic text-muted-foreground">their own words.</em>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setI((i - 1 + items.length) % items.length)} className="w-10 h-10 rounded-full border border-line bg-card grid place-items-center hover:bg-mint/40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setI((i + 1) % items.length)} className="w-10 h-10 rounded-full border border-line bg-card grid place-items-center hover:bg-mint/40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass shadow-elev p-8 md:p-14 max-w-4xl"
        >
          <Quote className="w-10 h-10 text-accent/60" />
          <p className="font-display text-3xl md:text-4xl leading-tight mt-6 text-ink text-balance">
            "{t.quote}"
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint to-accent grid place-items-center font-display text-ink text-lg">
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="text-ink font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-2 mt-6">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-10 bg-ink" : "w-4 bg-line"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
