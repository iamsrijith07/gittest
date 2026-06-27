import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [6, 16]);
  const bg = useTransform(scrollY, [0, 120], ["rgba(247,250,248,0.4)", "rgba(247,250,248,0.85)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined, background: bg }}
      className="fixed top-0 inset-x-0 z-50 border-b border-line/60"
    >
      <div className="container-tight flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center w-9 h-9 rounded-full bg-ink text-background">
            <span className="font-display text-lg leading-none">k</span>
            <span className="absolute inset-0 rounded-full pulse-ring border border-accent/60" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-base text-ink">Kaizen</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">est. 2022</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-1.5 text-sm text-ink-soft rounded-full hover:bg-mint/60 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary hidden md:inline-flex !py-2.5 !px-5 text-sm">
          Book a call <span aria-hidden>→</span>
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-background/95">
          <div className="container-tight py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3 text-ink-soft border-b border-line/60">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 text-sm">Book a call</a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
