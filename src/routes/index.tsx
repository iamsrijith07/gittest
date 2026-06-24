import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Dashboard } from "@/components/site/Dashboard";
import { Compare } from "@/components/site/Compare";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Growth Studio — Web, SEO & Performance Marketing" },
      { name: "description", content: "I build growth journeys for businesses through websites, SEO, content, and performance marketing." },
      { property: "og:title", content: "Growth Studio — Web, SEO & Performance Marketing" },
      { property: "og:description", content: "Websites, SEO, content, and performance marketing that make businesses visible, trusted, and chosen." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Philosophy />
      <Services />
      <Process />
      <CaseStudies />
      <Dashboard />
      <Compare />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
