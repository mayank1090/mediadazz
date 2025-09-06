export type MenuItem = { label: string; href: string };
export type MenuSection = { heading: string; items: MenuItem[] };
export type TopLevel = { label: string; sections: MenuSection[] };