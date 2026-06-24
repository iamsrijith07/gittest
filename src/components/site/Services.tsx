import { motion } from "framer-motion";
import { Globe, Search, Target, Megaphone, Compass } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "Conversion-focused websites that load fast, rank, and sell.", metric: "+62%", label: "avg. conv. lift" },
  { icon: Search, title: "SEO", desc: "Technical, content, and local SEO engineered for sustained organic growth.", metric: "3.4×", label: "organic traffic" },
  { icon: Target, title: "Google & Meta Ads", desc: "Performance campaigns tuned to ROAS, not vanity impressions.", metric: "↓38%", label: "cost per lead" },
  { icon: Megaphone, title: "Social Media Growth", desc: "Content systems that build authority and a loyal audience.", metric: "122K", label: "monthly reach" },
  { icon: Compass, title: "Brand Strategy", desc: "Positioning, narrative, and identity that make you the obvious choice.", metric: "1", label: "category of one" },
];

export function Services() {
  return (
    <section id="services" className="section-pad bg-background relative">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-8 mb-14 flex-wrap">
          <div>
            <div className="eyebrow mb-4">What I do</div>
            <h2 className="headline-lg max-w-2xl">
              Five disciplines. <em className="italic text-muted-foreground">One growth system.</em>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Each service compounds the next. Run them in sequence and growth
            stops being a guess.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-card p-7 hover:shadow-elev transition-shadow"
            >
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-mint/0 group-hover:bg-mint/60 transition-colors duration-500 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-mint/70 grid place-items-center group-hover:rotate-6 transition-transform duration-500">
                  <s.icon className="w-5 h-5 text-ink" />
                </div>
                <div className="text-right">
                  <div className="num text-xl text-ink">{s.metric}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              </div>

              <h3 className="font-display text-2xl mt-6 text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

              <div className="mt-6 h-px bg-gradient-to-r from-line via-line to-transparent" />
              <div className="mt-4 text-xs text-ink-soft flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore capability <span aria-hidden>→</span>
              </div>
            </motion.article>
          ))}

          <div className="rounded-3xl border border-dashed border-line p-7 grid place-items-center text-center bg-gradient-to-br from-mint/40 to-transparent">
            <div>
              <div className="font-display text-2xl text-ink">Need all of it?</div>
              <p className="text-sm text-muted-foreground mt-2 max-w-[14rem]">Run as a managed growth partnership.</p>
              <a href="#contact" className="btn-primary mt-5 !py-2.5 !px-5 text-sm">Talk to me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
