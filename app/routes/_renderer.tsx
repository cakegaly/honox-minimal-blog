import { jsxRenderer } from 'hono/jsx-renderer';
import { Script } from 'honox/server';

import { siteConfig } from '@/lib/config';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export default jsxRenderer(async ({ children, metadata }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        {metadata?.keywords && metadata?.keywords.length > 0 && (
          <meta name="keywords" content={metadata.keywords.join(', ')} />
        )}
        <meta name="author" content={metadata?.author} />

        <link rel="canonical" href={metadata?.canonical} />
        {metadata?.noindex && (
          <meta name="robots" content="noindex, nofollow" />
        )}

        <meta property="og:type" content={metadata?.ogType} />
        <meta property="og:title" content={metadata?.title} />
        <meta property="og:description" content={metadata?.description} />
        <meta property="og:image" content={metadata?.ogImage} />
        <meta property="og:url" content={metadata?.canonical} />

        <meta name="twitter:card" content={metadata?.twitterCard} />
        <meta name="twitter:title" content={metadata?.title} />
        <meta name="twitter:description" content={metadata?.description} />
        <meta name="twitter:image" content={metadata?.ogImage} />

        <link rel="icon" href="/static/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/site.webmanifest" />

        {import.meta.env.PROD ? (
          <script src="/static/theme.js" />
        ) : (
          <script src="/app/theme.ts" />
        )}
        <Script src="/app/client.ts" async />
        {import.meta.env.PROD ? (
          <link href="/static/assets/index.css" rel="stylesheet" />
        ) : (
          <link href="/app/styles/index.css" rel="stylesheet" />
        )}

        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.name}
          href={`${siteConfig.url}/feed.xml`}
        />
      </head>
      <body class="text-foreground overscroll-none font-sans antialiased">
        <div class="bg-background relative z-10 flex min-h-svh flex-col">
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
});
