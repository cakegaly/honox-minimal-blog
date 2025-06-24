import type { JSX } from 'hono/jsx/jsx-runtime';

import { cn } from '@/lib/utils';

interface AspectRatioProps {
  ratio?: number;
  className?: string;
  children: JSX.Element;
}

export function AspectRatio({
  ratio = 16 / 9,
  className,
  children,
}: AspectRatioProps) {
  return (
    <div
      class={cn('relative w-full', className)}
      style={{
        aspectRatio: `${ratio}`,
      }}
    >
      <div class="absolute inset-0">{children}</div>
    </div>
  );
}
