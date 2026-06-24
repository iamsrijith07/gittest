import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp, BarChart3, Search, Sparkles } from "lucide-react";

function FloatingCard({
  className = "",
  delay = 0,
  children,
  parallax = 20,
  mx,
  my,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  parallax?: number;
  mx: any;
  my: any;
}) {
  const tx = useTransform(mx, (v: number) => v * parallax);
  const ty = useTransform(my, (v: number) => v * parallax);
  return (
    <motion.div
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute glass rounded-2xl shadow-elev p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32 pb-16"
      style={{ background: "var(--gradient-hero)" }}>

      {/* Soft orb */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-60"
           style={{ background: "radial-gradient(circle at 30% 30%, #B7E6CE 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
           style={{ background: "radial-gradient(circle at 70% 70%, #DFF4E8 0%, transparent 60%)" }} />

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Available for Q3 — 2 spots left
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div>
            <h1 className="headline-xl text-balance text-ink">
              Not Just <em className="italic font-light text-muted-foreground">Marketing.</em>
              <br />
              I Build{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Growth Journeys.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 right-0 bottom-1 h-3 bg-mint origin-left -z-0 rounded"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed"
            >
              Helping businesses become <span className="text-ink">visible</span>,{" "}
              <span className="text-ink">trusted</span>, and <span className="text-ink">chosen</span> through
              websites, SEO, content, and performance marketing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href="#work" className="btn-primary">
                See growth stories <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-ghost">Book a call</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-16 grid grid-cols-3 max-w-md gap-6"
            >
              {[
                { n: "3.5+", l: "Years building" },
                { n: "15+", l: "Brands scaled" },
                { n: "99%", l: "Client retention" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="num text-2xl md:text-3xl font-medium text-ink">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D-ish ecosystem */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Orbiting ring */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative w-[420px] h-[420px] rounded-full border border-line">
                <div className="absolute inset-6 rounded-full border border-line/70" />
                <div className="absolute inset-16 rounded-full border border-line/40" />
                <div className="absolute inset-0 orbit">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-glow" />
                </div>
                <div className="absolute inset-6 orbit" style={{ animationDirection: "reverse", animationDuration: "22s" }}>
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink" />
                </div>
              </div>
            </div>

            <FloatingCard mx={smx} my={smy} delay={0.6} parallax={-30}
              className="top-2 left-0 w-56">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Search className="w-3.5 h-3.5" /> Organic search
              </div>
              <div className="num text-2xl text-ink">35x</div>
              <div className="mt-3 flex items-end gap-1 h-10">
                {[20, 28, 22, 40, 36, 58, 72, 92].map((h, i) => (
                  <div key={i} className="w-2 rounded-sm bg-gradient-to-t from-mint to-accent" style={{ height: `${h}%` }} />
                ))}
              </div>
            </FloatingCard>

            <FloatingCard mx={smx} my={smy} delay={0.8} parallax={25}
              className="top-12 right-0 w-60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Conversions</span>
                <span className="chip !py-0.5 !px-2 text-[10px]">Live</span>
              </div>
              <div className="num text-2xl text-ink">2,841</div>
              <svg viewBox="0 0 200 60" className="w-full mt-2">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7CC7A5" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7CC7A5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,50 L20,42 L40,46 L60,30 L80,34 L100,22 L120,26 L140,14 L160,18 L180,8 L200,4 L200,60 L0,60 Z" fill="url(#g1)" />
                <path d="M0,50 L20,42 L40,46 L60,30 L80,34 L100,22 L120,26 L140,14 L160,18 L180,8 L200,4" fill="none" stroke="#0E1412" strokeWidth="1.4" />
              </svg>
            </FloatingCard>

            <FloatingCard mx={smx} my={smy} delay={1.0} parallax={-20}
              className="bottom-12 left-6 w-52">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BarChart3 className="w-3.5 h-3.5" /> Monthly leads
              </div>
              <div className="num text-2xl text-ink mt-1">+60%</div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ delay: 1.4, duration: 1.2 }}
                  className="h-full bg-ink rounded-full" />
              </div>
            </FloatingCard>

            

            <FloatingCard mx={smx} my={smy} delay={1.4} parallax={-15}
              className="top-44 left-1/2 -translate-x-1/2 w-40">
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                <span className="text-ink-soft">CAC ↓ 38%</span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-20 border-y border-line/70 py-5 overflow-hidden">
        <div className="marquee-track flex gap-16 whitespace-nowrap text-sm text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              {["Akshaya Medical Centre ", "Ayoham Dining", "Gainz Cafe", "Inversa Technosoft", "Nandaki Ayur", "Akshaya Medical Centre", "Ayoham Dining"].map((b, j) => (
                <span key={j} className="font-display text-xl text-ink/70 tracking-tight">{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
