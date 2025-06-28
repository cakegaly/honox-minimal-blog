import { createRoute } from 'honox/factory';
import { Feed } from 'feed';

import { siteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/mdx';

export default createRoute(async (c) => {
  const feeds = await generateRssFeed();
  return c.text(feeds, 200, {
    'Content-Type': 'text/xml',
  });
});

export async function generateRssFeed() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'ja',
    copyright: siteConfig.copyRight,
    generator: siteConfig.url,
    favicon: `${siteConfig.url}/favicon.ico`,
    image: `${siteConfig.url}/static/avatars/cakegaly.webp`,
    author: {
      name: siteConfig.copyRight,
    },
  });

  const allPosts = await getAllBlogPosts();
  for (const post of allPosts) {
    feed.addItem({
      title: post.metadata.title,
      description: post.metadata.description,
      date: new Date(post.metadata.publishedAt),
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
    });
  }

  return feed.rss2();
}
