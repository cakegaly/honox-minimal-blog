import { authorConfig, siteConfig } from '@/lib/config';

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'blog';
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadata(metadata: Metadata = {}): Metadata {
  return {
    title: metadata.title
      ? `${metadata.title} | ${siteConfig.name}`
      : siteConfig.name,
    description: metadata.description || siteConfig.description,
    author: metadata.author || authorConfig.name,
    ogImage: metadata.ogImage || siteConfig.ogImage,
    ogType: metadata.ogType || 'website',
    twitterCard: metadata.twitterCard || 'summary_large_image',
    canonical: metadata.canonical || siteConfig.url,
    keywords: metadata.keywords || [],
    noindex: metadata.noindex || false,
    publishedTime: metadata.publishedTime,
    modifiedTime: metadata.modifiedTime,
  };
}
