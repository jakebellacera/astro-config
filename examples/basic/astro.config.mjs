import { defineConfig } from 'astro/config';
import astroConfig from 'astro-config';

export default defineConfig({
  integrations: [
    astroConfig({
      name: 'config',
      config: {
        siteTitle: 'Basic Example',
        menus: {
          main: [
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'About us',
              href: '/about',
            },
          ],
        },
      },
    }),
  ],
});
