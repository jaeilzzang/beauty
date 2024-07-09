export const handleRouter = (tab: string) => (href: string) =>
  `?${tab}=${href}`;

export const createSidebarPath = (list: string[], prefix: string) => {
  return list.map((menu) => ({
    menu,
    href: `/${prefix}/${menu.toLocaleLowerCase()}`,
  }));
};

export const createActionRedirectUrl = (path: string, errorMsg?: string) => {
  const status = typeof errorMsg !== "undefined" ? "error" : "success";

  if (status === "error") {
    return `${path}?status=${status}&errorMsg=${errorMsg}`;
  }

  return `${path}?status=${status}`;
};
