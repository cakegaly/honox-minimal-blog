import path from 'node:path';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import adapter from '@hono/vite-dev-server/cloudflare';
import ssg from '@hono/vite-ssg';
import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

import { siteConfig } from './app/lib/config';

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  // other optional settings:
  // defaultLang: 'plaintext',
  // bypassInlineCode: true,
};

// @ts-expect-error
export default defineConfig(({ mode }) => {
  const alias = { '@': path.resolve(__dirname, './app') };

  const mdxPlugin = mdx({
    jsxImportSource: 'hono/jsx',
    providerImportSource: './app/components/content/mdx-components.tsx',
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug],
  });

  if (mode === 'client') {
    return {
      plugins: [client()],
      resolve: {
        alias,
      },
      build: {
        rollupOptions: {
          input: [
            './app/client.ts',
            './app/theme.ts',
            './app/styles/index.css',
          ],
          output: {
            entryFileNames: 'static/[name].js',
            chunkFileNames: 'static/chunks/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
          onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
            warn(warning);
          },
        },
      },
    };
  }

  return {
    build: { emptyOutDir: false },
    plugins: [
      honox({
        client: { input: ['./app/styles/index.css'] },
        devServer: { adapter },
      }),
      ssg({ entry: './app/server.ts' }),
      mdxPlugin,
      Sitemap({
        hostname: siteConfig.url,
        generateRobotsTxt: true,
      }),
    ],
    ssr: {
      external: ['feed'],
    },
    resolve: {
      alias,
    },
  };
});
