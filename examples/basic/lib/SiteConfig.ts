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
