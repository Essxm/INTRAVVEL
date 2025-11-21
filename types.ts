export interface ServiceItem {
  id: string;
  title: { ar: string; en: string };
  price: string | number;
  originalPrice?: string | number;
  flagCode?: string; // e.g., 'EU', 'US', 'IN'
  icon?: any;
  description: { ar: string; en: string };
  details: {
    duration: { ar: string; en: string };
    processingTime: { ar: string; en: string };
    requirements: { ar: string[]; en: string[] };
  };
}

export interface Testimonial {
  id: string;
  name: { ar: string; en: string };
  rating: number;
  comment: { ar: string; en: string };
  avatar: string;
}

export type Language = 'ar' | 'en';

export interface ContentText {
  ar: string;
  en: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  price: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  description: string;
  image: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
}