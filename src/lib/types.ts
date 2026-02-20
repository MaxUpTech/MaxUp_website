import { Timestamp } from 'firebase/firestore';

export type LocalizedString = {
  ar: string;
  en: string;
  he: string;
};

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  bullets: { ar: string[]; en: string[]; he: string[] };
  deliverables: Array<{ icon: string; title: LocalizedString; description: LocalizedString }>;
  processSteps: Array<{ number: string; title: LocalizedString; description: LocalizedString }>;
  seo: { metaTitle: LocalizedString; metaDescription: LocalizedString };
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: LocalizedString;
  category: string;
  client: string;
  industry: string;
  servicesProvided: string[];
  timeline: string;
  heroImage: string;
  galleryImages: string[];
  challenge: LocalizedString;
  solution: LocalizedString;
  outcome: LocalizedString;
  metrics: Array<{ value: string; label: LocalizedString }>;
  testimonial?: { quote: LocalizedString; clientName: string; company: string };
  seo: { metaTitle: LocalizedString; metaDescription: LocalizedString };
  isFeatured: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  featuredImage: string;
  category: string;
  tags: string[];
  author: { name: string; avatar: string };
  status: 'draft' | 'published';
  publishDate: Timestamp;
  readTime: number;
  seo: { metaTitle: LocalizedString; metaDescription: LocalizedString };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Testimonial {
  id: string;
  quote: LocalizedString;
  clientName: string;
  company: string;
  rating: number;
  clientPhoto: string;
  isActive: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  photo: string;
  socialLinks: { linkedin?: string; twitter?: string };
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: LocalizedString;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: LocalizedString;
  socialLinks: { instagram: string; linkedin: string; twitter: string; facebook: string };
  seoDefaults: { metaTitleTemplate: string; metaDescription: LocalizedString; ogImage: string };
  analyticsId: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  dimensions?: { width: number; height: number };
  usedIn: string[];
  uploadedAt: Timestamp;
}
