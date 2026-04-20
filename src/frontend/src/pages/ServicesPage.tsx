import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Palette, Video } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  active: boolean;
  index: number;
}

function ServiceCard({
  icon,
  name,
  description,
  active,
  index,
}: ServiceCardProps) {
  const { ref, visible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      data-ocid={`services.card.${index + 1}`}
      className={[
        "relative rounded-2xl border p-8 flex flex-col gap-5 transition-smooth",
        "opacity-0 translate-y-6",
        visible ? "opacity-100 translate-y-0" : "",
        active
          ? "bg-card border-border shadow-sm hover:-translate-y-1 hover:shadow-md cursor-pointer group"
          : "bg-muted/40 border-border/50 opacity-60",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Status badge — Coming Soon */}
      {!active && (
        <span
          data-ocid={`services.coming_soon_badge.${index + 1}`}
          className="absolute top-4 right-4"
        >
          <Badge
            variant="secondary"
            className="text-label text-[10px] tracking-widest bg-secondary text-muted-foreground"
          >
            Coming Soon
          </Badge>
        </span>
      )}

      {/* Active indicator dot */}
      {active && (
        <span className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-label text-[10px] text-primary tracking-widest">
            Active
          </span>
        </span>
      )}

      {/* Icon */}
      <div
        className={[
          "w-12 h-12 rounded-xl flex items-center justify-center",
          active
            ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className={[
            "font-display text-xl font-semibold",
            active ? "text-foreground" : "text-muted-foreground",
          ].join(" ")}
        >
          {name}
        </h3>
        <p
          className={[
            "text-sm leading-relaxed",
            active ? "text-muted-foreground" : "text-muted-foreground/70",
          ].join(" ")}
        >
          {description}
        </p>
      </div>

      {/* Action */}
      {active ? (
        <Link
          to="/portfolio"
          data-ocid={`services.view_portfolio_button.${index + 1}`}
        >
          <Button
            variant="default"
            className="w-full group/btn gap-2 font-semibold transition-smooth"
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      ) : (
        <Button
          variant="secondary"
          disabled
          className="w-full cursor-not-allowed opacity-50 font-semibold"
          data-ocid={`services.disabled_button.${index + 1}`}
        >
          Coming Soon
        </Button>
      )}
    </div>
  );
}

const services = [
  {
    icon: <Palette className="w-5 h-5" />,
    name: "Graphic Design",
    description:
      "From brand identities to marketing materials, we craft visuals that resonate and convert.",
    active: true,
  },
  {
    icon: <Video className="w-5 h-5" />,
    name: "Video Editing",
    description:
      "Dynamic video content and motion graphics that bring your brand story to life.",
    active: false,
  },
  {
    icon: <Globe className="w-5 h-5" />,
    name: "Website Development",
    description:
      "Modern, responsive websites built for performance and designed for conversion.",
    active: false,
  },
];

export default function ServicesPage() {
  const { ref: headingRef, visible: headingVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.2,
    });

  return (
    <section
      className="min-h-screen bg-background py-20 px-4"
      data-ocid="services.page"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className={[
            "text-center mb-16 transition-smooth duration-700",
            "opacity-0 translate-y-4",
            headingVisible ? "opacity-100 translate-y-0" : "",
          ].join(" ")}
        >
          <p className="text-label text-primary mb-3 text-xs tracking-widest uppercase font-semibold">
            What We Do
          </p>
          <h1 className="text-heading-lg text-foreground mb-4">Our Services</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We deliver excellence in every creative discipline.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="services.cards_list"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              icon={service.icon}
              name={service.name}
              description={service.description}
              active={service.active}
              index={index}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={[
            "text-center mt-14 transition-smooth duration-700 delay-500",
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-sm text-muted-foreground">
            More services launching soon.{" "}
            <Link
              to="/contact"
              className="text-primary font-medium hover:underline underline-offset-4 transition-smooth"
              data-ocid="services.contact_link"
            >
              Get notified
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
