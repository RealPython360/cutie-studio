import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "../lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const prevPathRef = useRef(currentPath);

  // Close menu when route changes
  if (prevPathRef.current !== currentPath) {
    prevPathRef.current = currentPath;
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-sm shadow-xs border-b border-border"
          : "bg-card border-b border-border"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/home"
          className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors duration-200 tracking-tight"
          data-ocid="header.logo.link"
        >
          Cutie π
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                data-ocid={`header.nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="ml-3 px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-md transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(var(--primary)/0.3)]"
            data-ocid="header.cta.button"
          >
            Start Project
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          data-ocid="header.hamburger.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-card z-40 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col px-6 pt-8 pb-10 gap-2"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, i) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200 border ${
                  isActive
                    ? "text-primary bg-primary/8 border-primary/20"
                    : "text-foreground hover:text-primary hover:bg-muted/50 border-transparent"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                data-ocid={`header.mobile.nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="mt-4 px-4 py-3.5 text-base font-semibold text-center bg-primary text-primary-foreground rounded-lg transition-all duration-200 hover:bg-primary/90"
            data-ocid="header.mobile.cta.button"
          >
            Start Your Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
