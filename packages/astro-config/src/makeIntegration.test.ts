import type { AstroIntegration } from 'astro';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { makeIntegration } from './makeIntegration';

describe('makeIntegration()', () => {
  let integration: AstroIntegration;

  beforeEach(() => {
    integration = makeIntegration({
      name: 'myConfig',
      config: {
        hello: 'world',
      },
    });
  });

  it('should return an Astro integration', () => {
    expect(integration).toEqual({
      name: 'astro-config',
      hooks: {
        'astro:config:setup': expect.any(Function),
      },
    });
  });

  describe('config:setup hook', () => {
    it('should update the config with the virtual import plugin', () => {
      const updateConfig = vi.fn();

      // @ts-expect-error -- todo need to fix
      integration.hooks['astro:config:setup']?.({ updateConfig });

      expect(updateConfig).toHaveBeenCalledWith({
        vite: {
          plugins: [expect.any(Object)],
        },
      });
    });
  });
});
