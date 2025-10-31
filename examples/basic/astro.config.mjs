import { defineConfig } from 'astro/config';
import astroConfig from 'astro-config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroConfig({
      config: {
        appName: 'Basic Example',
        version: '1.0.0',
        features: {
          analytics: true,
          darkMode: true,
        },
      },
    }),
  ],
});
