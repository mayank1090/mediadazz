export type MenuItem = { label: string; href?: string; slug?: string };
export type MenuSection = { heading: string; items: MenuItem[]; slug?: string };
export type TopLevel = { label: string; sections: MenuSection[]; slug?: string };