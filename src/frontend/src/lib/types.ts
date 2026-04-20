export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
  submittedAt: bigint;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  description?: string;
}

export type PortfolioCategory =
  | "youtube-thumbnails"
  | "instagram-posts"
  | "posters"
  | "banners"
  | "logos";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: "active" | "coming-soon";
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
