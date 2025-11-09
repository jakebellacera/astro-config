# astro-config

Creates an importable configuration for your Astro site or integration.

## Installation

```bash
pnpm add astro-config
```

## Usage

Add the integration to your `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import astroConfig from "astro-config";

export default defineConfig({
  integrations: [
    astroConfig({
      config: {
        apiKey: "your-api-key",
        apiUrl: "https://api.example.com",
      },
    }),
  ],
});
```

## Options

### `config`

Type: `Record<string, unknown>`

Custom configuration options that will be injected into your Astro site via `import.meta.env.ASTRO_CONFIG`.

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## License

MIT
