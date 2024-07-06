export const handleRouter = (tab: string) => (href: string) =>
  `?${tab}=${href}`;

export const createSidebarPath = (list: string[], prefix: string) => {
  return list.map((menu) => ({
    menu,
    href: `/${prefix}/${menu.toLocaleLowerCase()}`,
  }));
};
