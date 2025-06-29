import type {} from 'hono';

import type { Metadata } from '@/lib/metadata';

declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: { metadata: Metadata }
    ): Response | Promise<Response>;
  }
}
