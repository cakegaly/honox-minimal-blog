import { siteConfig } from '@/lib/config';

import { BrandIcons } from '@/components/icons/brand-icons';
import { LucideIcons } from '@/components/icons/lucide-icons';
import { buttonVariants } from '@/components/shared/button';

export function SiteFooter() {
  return (
    <footer class="container-wrapper">
      <div class="container flex flex-col items-center justify-between gap-4 border-t py-10 md:h-24 md:flex-row md:py-0">
        <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p class="text-center font-mono text-xs leading-loose md:text-left">
            &copy; {`${new Date().getFullYear()} ${siteConfig.copyRight}`}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {siteConfig.links.twitter && (
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              aria-label="X(Twitter)"
              title="X(Twitter, @cakegaly)"
            >
              <BrandIcons.x className="size-4" />
            </a>
          )}
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              title="Email (next-minimal-blog -at- example -dot- com)"
            >
              <LucideIcons.mail className="size-4" />
            </a>
          )}
          {siteConfig.links.github && (
            <a
              href={siteConfig.links.github}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub (next-minimal-blog github repository)"
            >
              <BrandIcons.gitHub className="size-4" />
            </a>
          )}
          <a
            href="/rss.xml"
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
            aria-label="RSS"
            title="RSS Feed (cakegaly -dot- com)"
          >
            <LucideIcons.rss className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
