import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  // pre-generated deterministic particles to avoid SSR mismatch
  const particles = Array.from({ length: 48 }, (_, i) => ({
    x: ((i * 37) % 100),
    y: ((i * 53) % 100),
    s: ((i * 13) % 4) + 1,
    d: ((i * 7) % 6) + 4,
    delay: (i % 10) * 0.3,
  }));

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-ink text-background">
      <div className="absolute inset-0">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #7CC7A5 0%, transparent 60%)" }} />
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: [-20, -120] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            className="absolute rounded-full bg-mint"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          />
        ))}
      </div>

      <div className="container-tight relative text-center">
        <div className="chip mx-auto !bg-white/10 !text-mint !border-white/10">Open for new partnerships</div>
        <h2 className="headline-xl mt-8 text-background text-balance">
          Your growth story <em className="italic text-mint">could be next.</em>
        </h2>
        <p className="mt-6 text-background/70 max-w-xl mx-auto text-lg">
          Every business starts somewhere. The brands above were once exactly
          where you are. Let's map the road from here.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <a href="mailto:hariharan.growthpartner@gmail.com" className="btn-primary !bg-mint !text-ink hover:!bg-white">
            Start your journey <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#work" className="btn-ghost !bg-white/5 !border-white/15 !text-background hover:!bg-white/10">
            View case studies
          </a>
        </div>
      </div>
    </section>
  );
}
