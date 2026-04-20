import { Link } from "@tanstack/react-router";
import { Linkedin, Mail } from "lucide-react";
import { SiBehance, SiInstagram, SiX } from "react-icons/si";
import type { NavLink } from "../lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
};

const SOCIAL_LINKS: SocialLink[] = [
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: SiX, label: "X", href: "https://x.com" },
  { icon: SiBehance, label: "Behance", href: "https://behance.net" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link
              to="/home"
              className="font-display text-2xl font-bold text-foreground tracking-tight block mb-3"
            >
              Cutie π
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A premium creative studio helping brands grow through powerful
              visuals and strategic design.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="text-label text-muted-foreground mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    data-ocid={`footer.nav.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="text-label text-muted-foreground mb-4">Connect</h3>
            <a
              href="mailto:hello@cutiepi.studio"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-5"
              data-ocid="footer.email.link"
            >
              <Mail size={14} />
              hello@cutiepi.studio
            </a>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted/60 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  data-ocid={`footer.social.${label.toLowerCase()}.link`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Cutie π. All rights reserved.</span>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
