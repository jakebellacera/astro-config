# astro-config

Creates an importable configuration for your [Astro](https://astro.build) site or integration.

## Installation

```
npm install astro-config
```

## Usage

Import the integration into your Astro config:

```js
import { defineConfig } from 'astro/config';
import astroConfig from 'astro-config';

export default defineConfig({
  integrations: [
    astroConfig({
      name: 'config',
      config: {
        // anything can go in here
        siteTitle: 'My awesome site',
      },
    }),
  ],
});
```

Then import the virtual module in your Astro files!

```astro
---
import { config } from "virtual:config";
---

<h1>Welcome to {config.siteTitle}!</h1>
```

### TypeScript

If you're using TypeScript, you'll want to also declare the types for the module. You can accomplish this by creating a `virtual.d.ts` file in the root of your Astro project, then add the type declarations:

```ts
declare module 'virtual:config' {
  export interface SiteConfig {
    siteTitle: string;
  }

  export const config: SiteConfig;
}
```

## Options

The `astroConfig` module has two options:

- **name:** The name of the virtual module to import. The name will be prefixed with `virtual:*` (e.g. `config` will be `virtual:config`).
- **config:** The object that will be exported as `config` (e.g. `{ hello: 'world' }` will export as `{ config: { hello: 'world' }}`).

  > [!NOTE]
  > The object's properties must be able to serialize into JSON.

## Contributing

Contributors welcome! Please submit an issue or pull request.

## License

See the [LICENSE](LICENSE) for license rights and limitations (MIT).
