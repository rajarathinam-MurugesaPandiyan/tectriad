export type CategoryType = 'all' | 'flutter' | 'web' | 'career' | 'products';

export type TriadBrandId = 'ethics-of-coding' | 'xpense-cloud' | 'streako';

export type OfferingKind = 'Service' | 'Product';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: CategoryType;
  categoryLabel: string;
  duration?: string;
  featured?: boolean;
  tags: string[];
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: 'lightning' | 'chart' | 'cloud' | 'shield' | 'currency' | 'lock' | 'flame' | 'calendar' | 'bell' | 'award' | 'layers' | 'code';
}

export interface ProductStat {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  brandId: TriadBrandId;
  kind: OfferingKind;
  name: string;
  category: string;
  badge: string;
  status: 'Live' | 'Free Service';
  platforms: string;
  tagline: string;
  description: string;
  websiteUrl?: string;
  websiteLabel?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  internalHref?: string;
  internalLabel?: string;
  externalActionUrl?: string;
  externalActionLabel?: string;
  highlights: string[];
  features: ProductFeature[];
  stats: ProductStat[];
}

export interface TriadMember {
  id: string;
  name: string;
  initial: string;
  role: string;
  accentId: TriadBrandId;
}

export interface OfferingSummary {
  id: TriadBrandId;
  kind: OfferingKind;
  name: string;
  domainLabel: string;
  roleLabel: string;
  summary: string;
  statusLabel: string;
  targetSection: string;
  externalUrl?: string;
}
