export const handleRouter = (tab: string) => (href: string) =>
  `?${tab}=${href}`;

export const createSidebarPath = (list: string[], prefix: string) => {
  return list.map((title) => ({
    title,
    href: `/${prefix}/${title.toLocaleLowerCase()}`,
  }));
};
