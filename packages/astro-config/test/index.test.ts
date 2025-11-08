import { describe, it, expect, vi } from 'vitest';
import astroConfig from '../src/index';
import type { AstroConfig, AstroIntegrationLogger } from 'astro';

type MockConfig = Pick<AstroConfig, 'root'>;

interface HookParameters {
  config: MockConfig;
  updateConfig: (newConfig: Record<string, unknown>) => void;
  logger?: AstroIntegrationLogger;
}

describe.skip('astro-config', () => {
  it('should return an integration object with the correct name', () => {
    const integration = astroConfig();

    expect(integration).toBeDefined();
    expect(integration.name).toBe('astro-config');
  });

  it('should have the required hooks', () => {
    const integration = astroConfig();

    expect(integration.hooks).toBeDefined();
    expect(integration.hooks['astro:config:setup']).toBeDefined();
    expect(integration.hooks['astro:config:done']).toBeDefined();
  });

  it('should accept options', () => {
    const options = {
      config: {
        apiKey: 'test-key',
        apiUrl: 'https://api.example.com',
      },
    };

    const integration = astroConfig(options);

    expect(integration).toBeDefined();
    expect(integration.name).toBe('astro-config');
  });

  it('should call astro:config:setup hook with updateConfig', () => {
    const options = {
      config: {
        apiKey: 'test-key',
      },
    };

    const integration = astroConfig(options);
    const mockUpdateConfig = vi.fn();
    const mockConfig: MockConfig = {
      root: new URL('file:///project/'),
    };

    // Call the setup hook
    if (integration.hooks['astro:config:setup']) {
      integration.hooks['astro:config:setup']({
        config: mockConfig,
        updateConfig: mockUpdateConfig,
      } as HookParameters);
    }

    // Verify updateConfig was called with the correct vite config
    expect(mockUpdateConfig).toHaveBeenCalledWith({
      vite: {
        define: {
          'import.meta.env.ASTRO_CONFIG': JSON.stringify(options.config),
        },
      },
    });
  });

  it('should not call updateConfig when no config is provided', () => {
    const integration = astroConfig();
    const mockUpdateConfig = vi.fn();
    const mockConfig: MockConfig = {
      root: new URL('file:///project/'),
    };

    // Call the setup hook
    if (integration.hooks['astro:config:setup']) {
      integration.hooks['astro:config:setup']({
        config: mockConfig,
        updateConfig: mockUpdateConfig,
      } as HookParameters);
    }

    // Verify updateConfig was not called
    expect(mockUpdateConfig).not.toHaveBeenCalled();
  });

  it('should call astro:config:done hook', () => {
    const integration = astroConfig();
    const mockConfig: MockConfig = {
      root: new URL('file:///project/'),
    };

    // This should not throw
    expect(() => {
      if (integration.hooks['astro:config:done']) {
        integration.hooks['astro:config:done']({
          config: mockConfig,
        } as { config: MockConfig });
      }
    }).not.toThrow();
  });
});
