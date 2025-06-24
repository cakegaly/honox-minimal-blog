import { JSX } from 'hono/jsx/jsx-runtime';

import { cn } from '@/lib/utils';

import { getIconForLanguageExtension } from '@/components/icons/brand-icons';
import { Callout } from '@/components/shared/callout';

export const mdxComponents = {
  h1: ({ className, ...props }: JSX.IntrinsicElements['h1']) => (
    <h1
      className={cn(
        'font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: JSX.IntrinsicElements['h2']) => {
    return (
      <h2
        id={props.children
          ?.toString()
          .replace(/ /g, '-')
          .replace(/'/g, '')
          .replace(/\?/g, '')
          .toLowerCase()}
        className={cn(
          'font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4',
          className
        )}
        {...props}
      />
    );
  },
  h3: ({ className, ...props }: JSX.IntrinsicElements['h3']) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-28 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: JSX.IntrinsicElements['h4']) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-28 text-lg font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: JSX.IntrinsicElements['h5']) => (
    <h5
      className={cn(
        'mt-8 scroll-m-28 text-lg font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: JSX.IntrinsicElements['h6']) => (
    <h6
      className={cn(
        'mt-8 scroll-m-28 text-base font-medium tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: JSX.IntrinsicElements['a']) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: JSX.IntrinsicElements['p']) => (
    <p
      className={cn('leading-relaxed [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: JSX.IntrinsicElements['strong']) => (
    <strong className={cn('font-medium', className)} {...props} />
  ),
  ul: ({ className, ...props }: JSX.IntrinsicElements['ul']) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: JSX.IntrinsicElements['ol']) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: JSX.IntrinsicElements['li']) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: JSX.IntrinsicElements['blockquote']) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: JSX.IntrinsicElements['img']) => (
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: JSX.IntrinsicElements['hr']) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: JSX.IntrinsicElements['table']) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          'relative w-full overflow-hidden border-none text-sm',
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: JSX.IntrinsicElements['tr']) => (
    <tr
      className={cn('last:border-b-none m-0 border-b', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: JSX.IntrinsicElements['th']) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: JSX.IntrinsicElements['td']) => (
    <td
      className={cn(
        'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: JSX.IntrinsicElements['pre']) => {
    return (
      <pre
        className={cn(
          'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  figure: ({ className, ...props }: JSX.IntrinsicElements['figure']) => {
    return <figure className={cn(className)} {...props} />;
  },
  figcaption: ({
    className,
    children,
    ...props
  }: JSX.IntrinsicElements['figcaption']) => {
    const iconExtension =
      'data-language' in props && typeof props['data-language'] === 'string'
        ? getIconForLanguageExtension(props['data-language'])
        : null;

    return (
      <figcaption
        className={cn(
          'text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70',
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  code: ({
    className,
    __raw__,
    __src__,
    ...props
  }: JSX.IntrinsicElements['code'] & {
    __raw__?: string;
    __src__?: string;
  }) => {
    // inline code style
    if (typeof props.children === 'string') {
      return (
        <code
          className={cn(
            'bg-muted relative rounded-md px-[0.3rem] py-[0.1rem] font-mono outline-none',
            className
          )}
          {...props}
        />
      );
    }

    // default codeblock style
    return (
      <>
        {/* TODO: Add copy button */}
        {/* {__raw__ && <CopyButton value={__raw__} src={__src__} />} */}
        <code {...props} />
      </>
    );
  },
  Callout,
};

export function useMDXComponents() {
  return mdxComponents;
}
