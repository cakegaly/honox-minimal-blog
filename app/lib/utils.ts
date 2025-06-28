import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { siteConfig } from '@/lib/config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

export function canonicalURL(url: string): string {
  const path = new URL(url).pathname;
  return `${siteConfig.url}${path}`;
}
