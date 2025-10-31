# astro-config

Creates an importable configuration for your Astro site or integration.

## Project Structure

This is a pnpm workspace monorepo containing:

- **packages/astro-config**: The main Astro integration package
- **examples/basic**: A basic example Astro site using the integration

## Getting Started

### Installation

```bash
pnpm install
```

### Building

Build all packages:

```bash
pnpm build
```

### Testing

Run tests for all packages:

```bash
pnpm test
```

### Linting

Run ESLint:

```bash
pnpm lint
```

### Formatting

Format code with Prettier:

```bash
pnpm format
```

## Packages

### astro-config

The main Astro integration package. See [packages/astro-config/README.md](packages/astro-config/README.md) for more details.

## Examples

### basic

A basic example showing how to use the astro-config integration. See [examples/basic/README.md](examples/basic/README.md) for more details.

## Development

This project uses:

- **pnpm workspaces** for monorepo management
- **TypeScript** for type safety
- **ESLint** for linting
- **Prettier** for code formatting
- **Vitest** for testing

## License

MIT

