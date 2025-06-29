import { ssgParams } from 'hono/ssg';
import { createRoute } from 'honox/factory';

import { tags } from '@/lib/blog';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';

import { BrandIcons } from '@/components/icons/brand-icons';
import { AboutCta } from '@/components/shared/about-cta';
import { Badge } from '@/components/shared/link-badge';
import { LinkCard } from '@/components/shared/link-card';

export default createRoute(
  ssgParams(async () => {
    return Object.keys(tags).map((slug) => ({
      slug,
    }));
  }),

  async (c) => {
    const slug = c.req.param('slug');

    const tag = tags[slug];
    if (!tag) return c.redirect('/404');

    const metadata = generateMetadata({
      title: `posts with "${tag.name}" tag`,
      description: `post list with "${tag.name}" tag`,
    });

    const posts = await getBlogPostsByTagSlug(slug);
    const TagIcon = BrandIcons[tag.icon];

    return c.render(
      <div className="flex flex-1 flex-col">
        <div className="container-wrapper">
          <div className="container py-6">
            <AboutCta />
          </div>
          <div className="container pb-6">
            <div className="pb-8">
              <div className="from-primary/5 via-primary/3 ring-primary/10 relative overflow-hidden rounded-2xl bg-gradient-to-br to-transparent p-6 ring-1">
                <div className="bg-primary/5 absolute -top-4 -right-4 h-24 w-24 rounded-full"></div>
                <div className="relative flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl">
                    <TagIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        TAG
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        • {posts.length} posts
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {tag.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Explore all posts tagged with {tag.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-wrapper">
          <section className="container border-b py-6">
            <div className="flex flex-col gap-1 pb-6">
              <h2 className="text-2xl font-medium tracking-tight">Grid View</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <LinkCard
                  key={post.slug}
                  title={post.metadata.title}
                  imageUrl={post.metadata.thumbnail || '/static/og.png'}
                  link={`/blog/${post.slug}`}
                  badgeText={post.metadata.publishedAt}
                  description={post.metadata.description}
                  priority={true}
                />
              ))}
            </div>
          </section>
        </div>
      </div>,
      { metadata }
    );
  }
);
