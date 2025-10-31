import type { AstroIntegration } from 'astro';

export interface AstroConfigOptions {
  /**
   * Custom configuration options for the integration
   */
  config?: Record<string, unknown>;
}

/**
 * Creates an Astro integration that provides importable configuration
 * @param options - Configuration options for the integration
 * @returns An Astro integration object
 */
export default function astroConfig(
  options: AstroConfigOptions = {}
): AstroIntegration {
  return {
    name: 'astro-config',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        // Log that the integration is being used
        console.log('astro-config integration loaded');

        // Apply custom configuration if provided
        if (options.config) {
          updateConfig({
            vite: {
              define: {
                'import.meta.env.ASTRO_CONFIG': JSON.stringify(options.config),
              },
            },
          });
        }
      },
      'astro:config:done': ({ config }) => {
        console.log(
          `astro-config: Configuration finalized for ${config.root.pathname}`
        );
      },
    },
  };
}

export { astroConfig };
