declare module 'virtual:config' {
  interface MenuItem {
    label: string;
    href: string;
  }

  export interface SiteConfig {
    siteTitle: string;
    menus: {
      main: MenuItem[];
    };
  }

  export const config: SiteConfig;
}
