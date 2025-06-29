import { ssgParams } from 'hono/ssg';
import { createRoute } from 'honox/factory';

import { tags } from '@/lib/blog';
import { getBlogPostsByTagSlug } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';

import { AboutCta } from '@/components/shared/about-cta';
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

    return c.render(
      <div className="flex flex-1 flex-col">
        <div className="container-wrapper">
          <div className="container py-6">
            <AboutCta />
          </div>
          {/* <div className="container pb-6">
            <CardTagTitle
              icon={tags[slug].icon}
              name={tags[slug].name}
              postCount={posts.length}
            />
          </div> */}
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
