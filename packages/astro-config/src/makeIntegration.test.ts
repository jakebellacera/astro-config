import type { AstroIntegration } from 'astro';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { makeIntegration } from './makeIntegration';
import { createServer } from 'vite';

import type { AstroVitePlugin } from './utils/makeVirtualImportVitePlugin';

type ConfigSetupHook = NonNullable<
  AstroIntegration['hooks']['astro:config:setup']
>;
type ConfigSetupParams = Parameters<ConfigSetupHook>[0];

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

      integration.hooks['astro:config:setup']?.({
        updateConfig,
      } as Partial<ConfigSetupParams> as ConfigSetupParams);

      expect(updateConfig).toHaveBeenCalledWith({
        vite: {
          plugins: [expect.any(Object)],
        },
      });
    });
  });

  describe('virtual import (integration)', () => {
    type ViteConfig = { plugins: AstroVitePlugin[] };
    let pluginInstance: AstroVitePlugin | null;
    let updateConfig: (config: { vite: ViteConfig }) => void;

    beforeEach(() => {
      pluginInstance = null;
      updateConfig = (config) => {
        const plugin = config.vite.plugins[0];
        pluginInstance = plugin ? plugin : null;
      };
    });

    it('should resolve and load the virtual import via Vite', async () => {
      integration.hooks['astro:config:setup']?.({
        updateConfig,
      } as Partial<ConfigSetupParams> as ConfigSetupParams);

      // Verify the plugin was registered
      expect(pluginInstance).not.toBeNull();

      // Create a Vite server with the plugin
      const server = await createServer({
        configFile: false,
        plugins: [pluginInstance!],
        logLevel: 'silent',
      });

      try {
        // Use Vite's module resolution to load the virtual import
        const importName = 'virtual:myConfig';
        const module = await server.ssrLoadModule(importName);

        // Verify the module has the expected export
        expect(module).toHaveProperty('config');
        expect(module.config).toEqual({
          hello: 'world',
        });
      } finally {
        await server.close();
      }
    });
  });
});
