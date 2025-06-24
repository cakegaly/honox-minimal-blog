import type { JSX } from 'hono/jsx/jsx-runtime';

import { cn } from '@/lib/utils';

interface LinkBadgeProps {
  label: string;
  link: string;
  className?: string;
}

export function LinkBadge({ label, link, className }: LinkBadgeProps) {
  return (
    <Badge
      className={cn('rounded-full font-normal', className)}
      variant="outline"
      asChild
    >
      <a href={link}>{label}</a>
    </Badge>
  );
}

function Badge({
  class: className,
  Icon,
  clickable = false,
  children,
  ...props
}: JSX.IntrinsicElements['div'] & {
  Icon?: JSX.Element;
  clickable?: boolean;
}) {
  return (
    <div
      class={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        clickable ? 'hover:bg-accent cursor-pointer' : '',
        className
      )}
      {...props}
    >
      {Icon && <span class="inline-block size-3">{Icon}</span>}
      {children}
    </div>
  );
}
