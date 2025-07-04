import { createRoute } from 'honox/factory';

import { getAllBlogPosts } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';

import { AboutCta } from '@/components/shared/about-cta';
import { LinkCard } from '@/components/shared/link-card';

export default createRoute(async (c) => {
  const allPosts = await getAllBlogPosts();
  const metadata = generateMetadata({ title: 'Home' });

  return c.render(
    <div class="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <AboutCta />
        </div>
      </div>
      <div className="container-wrapper">
        <section className="container border-b py-6">
          <div className="flex flex-col gap-1 pb-6">
            <h2 className="text-2xl font-medium tracking-tight">Grid View</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
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
});
