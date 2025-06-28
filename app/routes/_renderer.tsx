import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';
import { Script } from 'honox/server';

import { siteConfig } from '@/lib/config';
import { canonicalURL } from '@/lib/utils';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

export default jsxRenderer(
  async ({ children, title, description, ogImagePath }) => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const siteDescription = description ?? `${siteConfig.name} is a tech blog`;
    const c = useRequestContext();
    const canonical = canonicalURL(c.req.url);

    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content={siteDescription} />
          <meta property="og:site_name" content={siteConfig.name} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={siteDescription} />
          <meta property="og:url" content={canonical} />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content={ogImagePath || `${siteConfig.url}/favicon.ico`}
          />
          <meta property="og:locale:alternate" content="ja_JP" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@cakegaly" />
          <meta
            name="twitter:image"
            content={ogImagePath || `${siteConfig.url}/favicon.ico`}
          />
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

          <link rel="canonical" href={canonical} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={siteConfig.name}
            href={`${siteConfig.url}/feed.xml`}
          />
          <title>{pageTitle}</title>
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
  }
);
