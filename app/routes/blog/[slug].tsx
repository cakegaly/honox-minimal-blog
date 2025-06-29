import { ssgParams } from 'hono/ssg';
import { createRoute } from 'honox/factory';

import { authorConfig } from '@/lib/config';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/utils';

import { ArticleShareButtons } from '@/components/content/_article-share-buttons.island';
import { Author } from '@/components/content/author';
import { BlurredHeroImage } from '@/components/shared/blurred-hero-image';
import { LinkBadge } from '@/components/shared/link-badge';

export default createRoute(
  ssgParams(async () => {
    const allPosts = await getAllBlogPosts();
    return allPosts.map((post) => ({
      slug: post.slug,
    }));
  }),

  async (c) => {
    const slug = c.req.param('slug');

    const post = await getBlogPostBySlug(slug);
    if (!post) return c.redirect('/404');

    const thumbnailUrl = post.metadata.thumbnail;
    const metadata = generateMetadata({
      title: post.metadata.title,
      description: post.metadata.description,
      ogType: 'article',
    });

    return c.render(
      <div className="flex flex-1 flex-col">
        <div className="container-wrapper">
          <div className="pt-4">
            {thumbnailUrl && (
              <BlurredHeroImage
                imageUrl={thumbnailUrl}
                alt={`${post.metadata.title} thumbnail image`}
              />
            )}
          </div>
        </div>
        <div className="container-wrapper py-8">
          <div className="container flex max-w-screen-md flex-col gap-8">
            <section className="flex-1">
              <article className="relative">
                <header className="mb-10 space-y-2 md:space-y-6">
                  <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-[11px] md:text-xs">
                    {post.metadata.publishedAt && (
                      <div className="inline-flex items-center gap-1">
                        <time dateTime={post.metadata.publishedAt}>
                          {post.metadata.publishedAt}
                        </time>
                      </div>
                    )}
                    <div className="hidden md:flex md:gap-2">
                      {post.metadata.tags?.map((tag) => (
                        <LinkBadge link={`/tag/${tag}`} label={tag} />
                      ))}
                    </div>
                  </div>
                  <h1 className="text-lg leading-normal font-bold tracking-tight md:text-2xl md:leading-tight md:font-normal">
                    {post.metadata.title}
                  </h1>
                  <div className="py-4">
                    <Author
                      name={authorConfig.name}
                      twitterId={authorConfig.twitter}
                      imageUrl={authorConfig.image}
                    />
                  </div>
                </header>

                <div className="mb-10">{post.Component()}</div>

                <div className="py-4">
                  <ArticleShareButtons
                    url={absoluteUrl(`/blog/${slug}`)}
                    title={post.metadata.title}
                    description={post.metadata.description}
                    image={thumbnailUrl}
                  />
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>,
      { metadata }
    );
  }
);
