import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Testimonial } from "@/lib/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Brush, Code2, Star, Video } from "lucide-react";

// ─── Local types ─────────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon";
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: ServiceCard[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Brand identities, print materials, and digital assets crafted with precision. We turn ideas into visuals that communicate powerfully.",
    icon: <Brush className="w-6 h-6" />,
    status: "active",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Cinematic edits, reels, and motion content that keep audiences hooked. High-quality post-production for every platform.",
    icon: <Video className="w-6 h-6" />,
    status: "coming-soon",
  },
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Modern, performant websites that convert visitors into clients. Clean code, beautiful interfaces, and seamless user experience.",
    icon: <Code2 className="w-6 h-6" />,
    status: "coming-soon",
  },
];

const portfolioItems = [
  {
    id: "1",
    label: "YouTube Thumbnail",
    bg: "bg-primary/10",
    accent: "text-primary",
  },
  {
    id: "2",
    label: "Brand Identity",
    bg: "bg-accent/10",
    accent: "text-accent",
  },
  {
    id: "3",
    label: "Instagram Post",
    bg: "bg-primary/20",
    accent: "text-primary",
  },
  {
    id: "4",
    label: "Event Poster",
    bg: "bg-secondary",
    accent: "text-secondary-foreground",
  },
  {
    id: "5",
    label: "Banner Design",
    bg: "bg-primary/15",
    accent: "text-primary",
  },
  { id: "6", label: "Logo Design", bg: "bg-accent/15", accent: "text-accent" },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "Elevate Brands",
    content:
      "Cutie π transformed our entire brand identity. The attention to detail and creative vision exceeded everything we asked for. Our engagement has tripled since the rebrand.",
  },
  {
    id: "2",
    name: "James Okafor",
    role: "Founder & CEO",
    company: "NovaSpark",
    content:
      "Working with this studio was seamless from start to finish. They understood our vision immediately and delivered visuals that genuinely set us apart in a crowded market.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Content Creator",
    company: "Studio Priya",
    content:
      "My YouTube thumbnails now get click-through rates I never imagined. The team is responsive, professional, and consistently delivers work that makes my content stand out.",
  },
];

// ─── Section wrapper with scroll animation ───────────────────────────────────

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
  });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

// ─── Section label ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-label text-primary tracking-widest mb-3 block">
      {children}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div data-ocid="home.page" className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[92vh] flex items-center bg-background overflow-hidden"
      >
        {/* Decorative accent blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07] bg-primary"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.05] bg-primary"
        />

        <div className="container mx-auto px-6 md:px-12 py-24 max-w-6xl relative z-10">
          <AnimatedSection>
            <SectionLabel>Creative Design Studio</SectionLabel>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <h1 className="text-heading-lg text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground max-w-4xl leading-[1.1] mb-6">
              A modern creative studio helping{" "}
              <span className="text-primary">brands grow</span> through powerful
              visuals.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={160}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed font-body">
              We design identities, craft stories, and build visual experiences
              that move people — and move businesses forward.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={240}>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/portfolio" data-ocid="home.hero.view_portfolio_button">
                <Button
                  size="lg"
                  className="group transition-smooth hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Link to="/contact" data-ocid="home.hero.start_project_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5"
                >
                  Start Your Project
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── About Preview ───────────────────────────────────────────────── */}
      <section data-ocid="home.about.section" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <SectionLabel>Who We Are</SectionLabel>
                <h2 className="text-heading-md text-foreground mb-6">
                  About Us
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8 font-body">
                  We are a creative team delivering high-quality visuals for
                  brands and creators worldwide. We craft identities that make
                  an impact — combining strategic thinking with precise
                  execution to help you stand out in a crowded market.
                </p>
                <Link
                  to="/about"
                  data-ocid="home.about.learn_more_link"
                  className="inline-flex items-center gap-2 text-primary font-semibold transition-smooth hover:gap-3"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Projects Delivered", value: "120+" },
                  { label: "Happy Clients", value: "80+" },
                  { label: "Years of Craft", value: "5+" },
                  { label: "Brand Identities", value: "50+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card rounded-2xl p-6 border border-border text-center transition-smooth hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="text-3xl font-display font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-body">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────────── */}
      <section
        data-ocid="home.services.section"
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <SectionLabel>Our Expertise</SectionLabel>
              <h2 className="text-heading-md text-foreground">What We Do</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <AnimatedSection key={service.id} delay={idx * 100}>
                <Card
                  data-ocid={`home.services.card.${idx + 1}`}
                  className={`relative p-8 border border-border rounded-2xl flex flex-col h-full transition-smooth ${
                    service.status === "active"
                      ? "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
                      : "opacity-70"
                  }`}
                >
                  {service.status === "coming-soon" && (
                    <Badge
                      variant="secondary"
                      className="absolute top-4 right-4 text-xs"
                    >
                      Coming Soon
                    </Badge>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 font-body">
                    {service.description}
                  </p>
                  {service.status === "active" ? (
                    <Link
                      to="/services"
                      data-ocid={`home.services.learn_more_link.${idx + 1}`}
                      className="inline-flex items-center gap-2 text-primary text-sm font-semibold transition-smooth hover:gap-3"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-muted-foreground text-sm font-semibold">
                      Available Soon
                    </span>
                  )}
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Preview ────────────────────────────────────────────── */}
      <section data-ocid="home.portfolio.section" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <SectionLabel>Selected Works</SectionLabel>
              <h2 className="text-heading-md text-foreground">Our Work</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {portfolioItems.map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 70}>
                <div
                  data-ocid={`home.portfolio.item.${idx + 1}`}
                  className={`${item.bg} rounded-2xl aspect-square flex items-end p-5 group transition-smooth hover:scale-[1.02] hover:shadow-lg cursor-pointer overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-smooth" />
                  <span
                    className={`${item.accent} text-label relative z-10 bg-card/80 backdrop-blur-sm rounded-md px-3 py-1.5`}
                  >
                    {item.label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center">
              <Link to="/portfolio" data-ocid="home.portfolio.view_all_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5"
                >
                  View All Work
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.testimonials.section"
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <SectionLabel>Client Love</SectionLabel>
              <h2 className="text-heading-md text-foreground">
                What Clients Say
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <AnimatedSection key={t.id} delay={idx * 100}>
                <Card
                  data-ocid={`home.testimonials.card.${idx + 1}`}
                  className="p-8 border border-border rounded-2xl flex flex-col gap-5 transition-smooth hover:border-primary/30 hover:shadow-md h-full"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
                      <Star
                        key={k}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground text-sm leading-relaxed font-body flex-1">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground font-display">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section data-ocid="home.cta.section" className="py-24 bg-primary">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <AnimatedSection>
            <p className="text-label opacity-70 mb-4 text-primary-foreground">
              Let's build something great
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight text-primary-foreground">
              Ready to start your project?
            </h2>
            <p className="text-lg mb-10 opacity-80 font-body max-w-lg mx-auto text-primary-foreground">
              Tell us what you need. We'll handle the rest — from concept to
              delivery, we're with you every step.
            </p>
            <Link to="/contact" data-ocid="home.cta.start_project_button">
              <Button
                size="lg"
                className="bg-card text-foreground hover:bg-card/90 transition-smooth hover:shadow-xl hover:-translate-y-1 font-semibold"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
