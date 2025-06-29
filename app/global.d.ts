import type {} from 'hono';

import type { Metadata } from '@/lib/metadata';

type Head = {
  title?: string;
  description?: string;
  ogImagePath?: string;
  metadata: Metadata;
};

declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head
    ): Response | Promise<Response>;
  }
}
