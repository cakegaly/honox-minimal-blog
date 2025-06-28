import { createRoute } from 'honox/factory';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';

export default createRoute(async (c) => {
  const rss = await generateRssFeed();
  return c.text(rss, 200, {
    'Content-Type': 'application/rss+xml; charset=utf-8',
  });
});

export async function generateRssFeed(): Promise<string> {
  const posts = await getAllBlogPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.metadata.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.metadata.description}]]></description>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>ja</language>
    <copyright>${siteConfig.copyRight}</copyright>
    ${items}
  </channel>
</rss>`;

  return rss.trim();
}
