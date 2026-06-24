export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="container-tight py-14 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-background font-display">g</span>
            <div className="font-display text-lg text-ink">Growth Studio</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            A one-person growth practice for businesses that want measurable
            outcomes, not deliverables.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-3">Contact</div>
          <a href="mailto:hari@growthstudio.com" className="block text-sm text-ink hover:text-accent">hari@growthstudio.com</a>
          <a href="tel:+919344260752" className="block text-sm text-ink mt-1.5 hover:text-accent">+91 9344260752</a>
        </div>
        <div>
          <div className="eyebrow mb-3">Location</div>
          <div className="text-sm text-ink">Bengaluru, India</div>
          <div className="text-sm text-muted-foreground">Working globally</div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-tight py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Growth Studio. All rights reserved.</div>
          <div className="italic font-display text-sm text-ink">Built with growth in mind.</div>
        </div>
      </div>
    </footer>
  );
}
