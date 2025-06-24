import type { JSX } from 'hono/jsx/jsx-runtime';

export type Frontmatter<T = {}> = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
} & T;

export type MDXData<T = {}> = {
  metadata: Frontmatter<T>;
  slug: string;
  Component: () => JSX.Element;
};

export type BlogPost = MDXData<{
  thumbnail?: string;
  tags?: string[];
}>;

const blogFiles = import.meta.glob<{
  frontmatter: Frontmatter;
  default: () => JSX.Element;
}>('../content/blog/*.mdx');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = await Promise.all(
    Object.entries(blogFiles).map(async ([pathStr, resolver]) => {
      const slug = pathStr
        .split('/')
        .pop()
        ?.replace(/\.mdx$/, '');
      if (!slug) throw new Error(`Invalid path: ${pathStr}`);

      const mod = await resolver();

      return {
        slug,
        metadata: mod.frontmatter,
        Component: mod.default,
      };
    })
  );

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const allPosts = await getAllBlogPosts();
  return allPosts.find((post) => post.slug === slug);
}
