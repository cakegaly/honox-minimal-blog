import { siteConfig } from '@/lib/config';

import { SiteLogo } from '@/components/icons/site-logo';
import { ModeSwitcher } from '@/components/layout/_mode-switcher.island';
import { Button } from '@/components/shared/button';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper px-6">
        <div className="container flex h-12 items-center gap-2 border-b **:data-[slot=separator]:!h-4 md:h-16">
          <Button asChild variant="ghost" size="icon" className="flex size-10">
            <a href="/">
              <SiteLogo className="size-8" />
              <span className="sr-only">{siteConfig.name}</span>
            </a>
          </Button>
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
