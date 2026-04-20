import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Lightbulb, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// --- Value card data ---
interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Quality First",
    description:
      "Every pixel matters. We hold ourselves to the highest standards, ensuring each deliverable reflects excellence — not just adequacy.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Creative Excellence",
    description:
      "We don't follow trends — we set them. Our team constantly pushes creative boundaries to produce visuals that stand out in a crowded world.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Client-Centered",
    description:
      "Your goals drive our process. We listen first, design second — collaborating closely to ensure every project exceeds expectations.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Always Evolving",
    description:
      "The design landscape never stands still, and neither do we. We invest continuously in new skills, tools, and perspectives to stay ahead.",
  },
];

// --- Animated section wrapper ---
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- Value card ---
function ValueCard({ value, index }: { value: Value; index: number }) {
  const { ref, visible } = useScrollAnimation({ threshold: 0.12 });
  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-smooth group
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transition:
          "opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease",
      }}
      data-ocid={`about.value.item.${index + 1}`}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
        {value.icon}
      </div>
      <h3 className="text-lg font-display font-semibold text-foreground">
        {value.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}

export function AboutPage() {
  return (
    <main className="bg-background" data-ocid="about.page">
      {/* ── Hero ── */}
      <section className="relative bg-card border-b border-border py-24 md:py-32 overflow-hidden">
        {/* Decorative blob */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeSection>
            <span className="text-label text-primary tracking-widest mb-4 inline-block">
              Our Story
            </span>
            <h1 className="text-heading-lg text-foreground mb-5">
              About Cutie&nbsp;π
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              We are a creative studio built on passion, precision, and purpose.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <span className="text-label text-primary mb-3 inline-block">
                Our Vision
              </span>
              <h2 className="text-heading-md text-foreground mb-6">
                Design that drives growth
              </h2>
            </FadeSection>
            <FadeSection delay={100}>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  We believe great design is the foundation of a strong brand.
                  Our mission is to help businesses of all sizes look
                  exceptional and communicate powerfully through stunning
                  visuals. We don't just make things beautiful — we make them
                  purposeful.
                </p>
                <p>
                  From the very first conversation to the final deliverable, we
                  approach every project with the same commitment: understand
                  deeply, design boldly, and deliver consistently. We partner
                  with brands that want to grow — and we grow with them.
                </p>
                <p>
                  Quality and creativity are never compromises at Cutie&nbsp;π.
                  Every piece of work we put out into the world carries our name
                  and our reputation — so we make sure it earns both.
                </p>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── Mission / Team ── */}
      <section className="bg-muted/40 border-y border-border py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeSection>
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-label tracking-widest">Who We Are</span>
            </div>
            <h2 className="text-heading-md text-foreground mb-6">
              A team built for brands
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Our team of designers, editors, and developers work together to
              deliver cohesive visual experiences that resonate with audiences
              and stand the test of time. We are not a one-person show — we are
              a collective of creatives united by a shared belief that
              exceptional work changes the trajectory of a brand.
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              We've worked with startups, creators, and established businesses
              across industries — and no matter the scale, our approach remains
              the same: listen carefully, think strategically, and execute
              flawlessly. Together, we transform ideas into identities.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <FadeSection>
            <div className="text-center mb-14">
              <span className="text-label text-primary mb-3 inline-block">
                Our Approach
              </span>
              <h2 className="text-heading-md text-foreground">
                What we stand for
              </h2>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-card border-t border-border py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeSection>
            <span className="text-label text-primary mb-3 inline-block">
              Ready to collaborate?
            </span>
            <h2 className="text-heading-md text-foreground mb-4">
              Let's work together
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We'd love to learn about your brand and explore how we can help it
              grow through powerful, purposeful design.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="px-10 py-6 text-base font-semibold rounded-full shadow-md hover:shadow-lg transition-smooth glow-accent"
                data-ocid="about.cta_button"
              >
                Start Your Project
              </Button>
            </Link>
          </FadeSection>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
