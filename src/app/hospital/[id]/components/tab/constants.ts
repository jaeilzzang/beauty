export const tab = "tab";

export type TTabKey = "info" | "event" | "review";

export type TabItem = {
  key: TTabKey;
  name: string;
  href: string;
};

const handleRouter = (href: string) => `?${tab}=${href}`;

export const tabList: TabItem[] = [
  {
    key: "info",
    name: "Info",
    href: handleRouter("info"),
  },
  {
    key: "event",
    name: "Event",
    href: handleRouter("event"),
  },
  {
    key: "review",
    name: "Review",
    href: handleRouter("review"),
  },
];
