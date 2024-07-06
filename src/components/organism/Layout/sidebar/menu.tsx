"use client";

import { MenuIcon } from "@icons/menu";
import styles from "./menu.module.scss";
import { useState } from "react";
import { CancelIcon } from "@/components/icons/cancel";
import Portal from "@/components/template/modal";
import { cosmetic, location, surgical } from "@/constants";
import { Chip } from "@/components/atoms/chip";
import Link from "next/link";
import { createSidebarPath } from "@/utils";

type TSubMenuList = { title: string; href: string };
type TMenuList = {
  title: string;
  list: { title: string; href: string }[];
};

const menuList: TMenuList[] = [
  {
    title: "Surgical Procedure",
    list: createSidebarPath(surgical, "surgical"),
  },
  {
    title: "Cosmetic Procedure",
    list: createSidebarPath(cosmetic, "cosmetic"),
  },
  {
    title: "Location",
    list: createSidebarPath(location, "location"),
  },
];

const menu: TSubMenuList[] = [
  { title: "Favorite", href: "#" },
  { title: "Event", href: "#" },
  { title: "About Us", href: "#" },
];

export const Menu = ({}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const renderMenuList = ({ title, list }: TMenuList) => {
    return (
      <section key={title} className={styles.section}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.chip_wrapper}>
          {list.map(({ href, title }) => {
            const isHref = title === "Location" ? href : "#";

            return (
              <Link key={title} href={isHref} onClick={() => onToggle()}>
                <Chip>{title}</Chip>
              </Link>
            );
          })}
        </div>
      </section>
    );
  };

  const renderSubMenu = ({ title, href }: TSubMenuList) => {
    return (
      <div className={styles.subMenu} key={title}>
        <Link href={href} onClick={() => onToggle()}>
          <nav className={styles.title}>{title}</nav>
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.menu}>
      <MenuIcon onClick={onToggle} />

      {toggle && (
        <Portal>
          <div className={styles.overlay}>
            <div className={styles.open}>
              <div className={styles.cancel} onClick={onToggle}>
                <CancelIcon />
              </div>

              {/* list menu */}
              {menuList.map(renderMenuList)}

              {/* sub menu */}
              {menu.map(renderSubMenu)}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
