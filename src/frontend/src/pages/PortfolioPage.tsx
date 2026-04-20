import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { PortfolioCategory, PortfolioItem } from "@/lib/types";
import { Link } from "@tanstack/react-router";
import { ExternalLink, X } from "lucide-react";
import { useCallback, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORY_TABS: { id: PortfolioCategory; label: string }[] = [
  { id: "youtube-thumbnails", label: "YouTube Thumbnails" },
  { id: "instagram-posts", label: "Instagram Posts" },
  { id: "posters", label: "Posters" },
  { id: "banners", label: "Banners" },
  { id: "logos", label: "Logos" },
];

type CardStyle = {
  bg: string;
  label: string;
  aspect: "16/9" | "1/1";
};

const CARD_STYLES: Record<PortfolioCategory, CardStyle[]> = {
  "youtube-thumbnails": [
    { bg: "from-blue-600 to-blue-900", label: "Gaming & Tech", aspect: "16/9" },
    { bg: "from-slate-700 to-slate-900", label: "Tutorial", aspect: "16/9" },
    { bg: "from-violet-600 to-purple-900", label: "Lifestyle", aspect: "16/9" },
    { bg: "from-sky-500 to-blue-700", label: "Travel", aspect: "16/9" },
    { bg: "from-zinc-600 to-zinc-900", label: "Business", aspect: "16/9" },
    { bg: "from-indigo-600 to-indigo-900", label: "Education", aspect: "16/9" },
  ],
  "instagram-posts": [
    { bg: "from-rose-400 to-pink-700", label: "Fashion", aspect: "1/1" },
    {
      bg: "from-amber-400 to-orange-600",
      label: "Food & Lifestyle",
      aspect: "1/1",
    },
    { bg: "from-teal-500 to-cyan-700", label: "Wellness", aspect: "1/1" },
    { bg: "from-violet-500 to-purple-700", label: "Beauty", aspect: "1/1" },
    { bg: "from-slate-500 to-slate-700", label: "Minimal", aspect: "1/1" },
    { bg: "from-blue-500 to-indigo-700", label: "Corporate", aspect: "1/1" },
  ],
  posters: [
    { bg: "from-zinc-700 to-zinc-950", label: "Event Poster", aspect: "1/1" },
    { bg: "from-blue-700 to-blue-950", label: "Music Event", aspect: "1/1" },
    { bg: "from-amber-600 to-yellow-900", label: "Promotional", aspect: "1/1" },
    { bg: "from-emerald-600 to-green-900", label: "Campaign", aspect: "1/1" },
    { bg: "from-slate-600 to-slate-900", label: "Corporate", aspect: "1/1" },
    { bg: "from-violet-700 to-purple-950", label: "Concert", aspect: "1/1" },
  ],
  banners: [
    { bg: "from-blue-600 to-sky-400", label: "Web Banner", aspect: "16/9" },
    { bg: "from-slate-700 to-slate-500", label: "Display Ad", aspect: "16/9" },
    {
      bg: "from-violet-600 to-indigo-400",
      label: "Social Cover",
      aspect: "16/9",
    },
    { bg: "from-zinc-800 to-zinc-600", label: "Billboard", aspect: "16/9" },
    { bg: "from-teal-600 to-cyan-400", label: "Event Banner", aspect: "16/9" },
    {
      bg: "from-amber-700 to-orange-500",
      label: "Promotional",
      aspect: "16/9",
    },
  ],
  logos: [
    { bg: "from-slate-900 to-slate-700", label: "Tech Brand", aspect: "1/1" },
    { bg: "from-blue-900 to-blue-600", label: "Corporate", aspect: "1/1" },
    { bg: "from-zinc-800 to-zinc-600", label: "Minimalist", aspect: "1/1" },
    {
      bg: "from-violet-900 to-violet-600",
      label: "Creative Agency",
      aspect: "1/1",
    },
    {
      bg: "from-emerald-900 to-emerald-600",
      label: "Health & Wellness",
      aspect: "1/1",
    },
    {
      bg: "from-amber-900 to-amber-600",
      label: "Food & Beverage",
      aspect: "1/1",
    },
  ],
};

function buildItems(category: PortfolioCategory): PortfolioItem[] {
  const styles = CARD_STYLES[category];
  const labelMap: Record<PortfolioCategory, string> = {
    "youtube-thumbnails": "Thumbnail",
    "instagram-posts": "Instagram Post",
    posters: "Poster Design",
    banners: "Banner Design",
    logos: "Logo Design",
  };
  return styles.map((s, i) => ({
    id: `${category}-${i + 1}`,
    title: `${labelMap[category]} ${String(i + 1).padStart(2, "0")}`,
    category,
    imageUrl: "",
    description: s.label,
  }));
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardData extends PortfolioItem {
  bg: string;
  aspect: "16/9" | "1/1";
  styleMeta: string;
}

function buildCardData(category: PortfolioCategory): CardData[] {
  const items = buildItems(category);
  const styles = CARD_STYLES[category];
  return items.map((item, i) => ({
    ...item,
    bg: styles[i].bg,
    aspect: styles[i].aspect,
    styleMeta: styles[i].label,
  }));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface PortfolioCardProps {
  item: CardData;
  index: number;
  onOpen: (item: CardData) => void;
}

function PortfolioCard({ item, index, onOpen }: PortfolioCardProps) {
  return (
    <button
      type="button"
      data-ocid={`portfolio.item.${index + 1}`}
      onClick={() => onOpen(item)}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
      aria-label={`View ${item.title}`}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-smooth group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Image Area */}
        <div
          className={`bg-gradient-to-br ${item.bg} w-full relative overflow-hidden`}
          style={{ aspectRatio: item.aspect === "16/9" ? "16/9" : "1/1" }}
        >
          {/* Decorative geometry */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-24 h-24 rounded-full border-4 border-white/50" />
            <div className="absolute w-12 h-12 rounded-full border-2 border-white/70" />
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs font-semibold">
              {item.styleMeta}
            </Badge>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>
        {/* Card body */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-1">
            {item.styleMeta}
          </p>
          <h3 className="font-display font-semibold text-foreground text-base truncate">
            {item.title}
          </h3>
        </div>
      </div>
    </button>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  item: CardData | null;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  return (
    <dialog
      open
      data-ocid="portfolio.dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-transparent w-full h-full max-w-none max-h-none m-0"
      aria-label={item.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-hidden="true"
        role="presentation"
      />
      {/* Panel */}
      <div className="relative z-10 bg-card rounded-3xl border border-border shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          data-ocid="portfolio.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-muted transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close lightbox"
        >
          <X className="w-4 h-4" />
        </button>
        {/* Image */}
        <div
          className={`bg-gradient-to-br ${item.bg} w-full relative`}
          style={{ aspectRatio: item.aspect === "16/9" ? "16/9" : "1/1" }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <div className="w-40 h-40 rounded-full border-[6px] border-white/50" />
            <div className="absolute w-20 h-20 rounded-full border-4 border-white/70" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold">
              {item.styleMeta}
            </Badge>
          </div>
        </div>
        {/* Info */}
        <div className="p-6">
          <p className="text-label text-primary mb-2">{item.styleMeta}</p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {item.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            A premium design crafted with attention to detail, brand alignment,
            and visual impact. Optimised for maximum engagement and audience
            retention.
          </p>
        </div>
      </div>
    </dialog>
  );
}

// ─── Page Header ─────────────────────────────────────────────────────────────

function PageHeader() {
  const { ref, visible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
  });
  return (
    <div
      ref={ref}
      className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <p className="text-label text-primary mb-3">Creative Work</p>
      <h1 className="text-heading-lg text-foreground mb-4">Our Portfolio</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
        Explore our work across different creative categories.
      </p>
    </div>
  );
}

// ─── Category Tabs ───────────────────────────────────────────────────────────

interface TabsProps {
  active: PortfolioCategory;
  onChange: (cat: PortfolioCategory) => void;
}

function CategoryTabs({ active, onChange }: TabsProps) {
  return (
    <div
      data-ocid="portfolio.filter.tab"
      className="flex flex-wrap justify-center gap-2 mb-10"
      role="tablist"
      aria-label="Portfolio categories"
    >
      {CATEGORY_TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            data-ocid={`portfolio.tab.${tab.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

interface GridProps {
  category: PortfolioCategory;
  onOpen: (item: CardData) => void;
  animating: boolean;
}

function PortfolioGrid({ category, onOpen, animating }: GridProps) {
  const items = buildCardData(category);

  return (
    <div
      role="tabpanel"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
        animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {items.map((item, i) => (
        <PortfolioCard key={item.id} item={item} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function BottomCTA() {
  const { ref, visible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
  });
  return (
    <div
      ref={ref}
      className={`mt-20 rounded-3xl bg-primary/5 border border-primary/10 p-12 text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <p className="text-label text-primary mb-3">Get In Touch</p>
      <h2 className="text-heading-md text-foreground mb-4">
        Ready to start your project?
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base leading-relaxed">
        Let's create something extraordinary together. Reach out and we'll get
        started right away.
      </p>
      <Link to="/contact">
        <Button
          data-ocid="portfolio.cta.primary_button"
          size="lg"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-base transition-smooth hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
        >
          Start Your Project
        </Button>
      </Link>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("youtube-thumbnails");
  const [lightboxItem, setLightboxItem] = useState<CardData | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleCategoryChange = useCallback(
    (cat: PortfolioCategory) => {
      if (cat === activeCategory) return;
      setAnimating(true);
      setTimeout(() => {
        setActiveCategory(cat);
        setAnimating(false);
      }, 200);
    },
    [activeCategory],
  );

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  // Close lightbox on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    },
    [closeLightbox],
  );

  return (
    <div
      data-ocid="portfolio.page"
      className="bg-background min-h-screen"
      onKeyDown={handleKeyDown}
    >
      {/* Hero band */}
      <div className="bg-card border-b border-border py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <PageHeader />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

        <PortfolioGrid
          category={activeCategory}
          onOpen={setLightboxItem}
          animating={animating}
        />

        <BottomCTA />
      </div>

      {/* Lightbox */}
      <Lightbox item={lightboxItem} onClose={closeLightbox} />
    </div>
  );
}
