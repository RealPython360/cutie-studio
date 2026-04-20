import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function IntroPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Staggered entrance: phase 0 = hidden, 1 = brand visible, 2 = tagline visible, 3 = button visible
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleExplore = () => {
    navigate({ to: "/home" });
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Decorative geometric blobs — pure CSS, no images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Large top-right blob */}
        <div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.22 265) 0%, transparent 70%)",
          }}
        />
        {/* Medium bottom-left blob */}
        <div
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.09]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.18 220) 0%, transparent 70%)",
          }}
        />
        {/* Small center-left accent */}
        <div
          className="absolute top-1/2 left-[8%] -translate-y-1/2 w-[180px] h-[180px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.2 265) 0%, transparent 70%)",
          }}
        />
        {/* Geometric grid overlay — subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.18 0.015 230) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Thin accent line top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.55 0.2 265))",
          }}
        />
        {/* Thin accent line bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-20"
          style={{
            background:
              "linear-gradient(to top, transparent, oklch(0.55 0.2 265))",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Logo mark — fades in with brand (phase 1) */}
        <div
          className={`mb-5 transition-all duration-700 ease-out ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-ocid="intro.logo"
          aria-hidden="true"
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <title>Cutie Pi logo mark</title>
            {/* Outer soft circle */}
            <circle cx="36" cy="36" r="34" fill="oklch(0.55 0.2 265 / 0.10)" />
            {/* Inner circle ring */}
            <circle
              cx="36"
              cy="36"
              r="34"
              stroke="oklch(0.55 0.2 265)"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              fill="none"
            />
            {/* Stylised π glyph */}
            {/* Top horizontal bar */}
            <line
              x1="20"
              y1="24"
              x2="52"
              y2="24"
              stroke="oklch(0.55 0.2 265)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Left leg — straight down */}
            <line
              x1="27"
              y1="24"
              x2="27"
              y2="50"
              stroke="oklch(0.55 0.2 265)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Right leg — curves inward at bottom */}
            <path
              d="M45 24 L45 44 Q45 52 38 50"
              stroke="oklch(0.55 0.2 265)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Brand name */}
        <h1
          className={`font-display font-bold tracking-tight text-foreground leading-none transition-all duration-700 ease-out ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}
          data-ocid="intro.brand.heading"
        >
          Cutie <span className="text-primary">π</span>
        </h1>

        {/* Tagline */}
        <p
          className={`font-body font-medium text-muted-foreground mt-4 mb-10 tracking-wide transition-all duration-700 ease-out ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.5rem)" }}
          data-ocid="intro.tagline"
        >
          We Design.{" "}
          <span className="font-semibold text-primary">You Grow.</span>
        </p>

        {/* Explore button */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            type="button"
            onClick={handleExplore}
            className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-lg font-semibold text-base bg-primary text-primary-foreground shadow-[0_2px_16px_hsl(var(--primary)/0.25)] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_0_36px_hsl(var(--primary)/0.45),0_4px_24px_hsl(var(--primary)/0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
            data-ocid="intro.explore.button"
          >
            Explore
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Bottom scroll hint removed — page is non-scrollable (h-screen overflow-hidden) */}
    </div>
  );
}
