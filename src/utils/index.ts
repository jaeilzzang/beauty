export const createSidebarList = (list: string[], prefix: string) => {
  return list.map((title) => ({
    title,
    href: `/${prefix}/${title.toLocaleLowerCase()}`,
  }));
};
