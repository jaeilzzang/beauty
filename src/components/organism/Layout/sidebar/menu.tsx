"use client";

import { MenuIcon } from "@icons/menu";
import styles from "./menu.module.scss";
import { useState } from "react";
import { CancelIcon } from "@/components/icons/cancel";
import Portal from "@/components/template/modal";
import { cosmetic, location, surgical } from "@/constants";
import { Chip } from "@/components/atoms/chip";
import Link from "next/link";

type TMenuList = { title: string; href: string; list: string[] };
type TSubMenuList = Omit<TMenuList, "list">;

const menuList: TMenuList[] = [
  { title: "Surgical Procedure", href: "#", list: surgical },
  { title: "Cosmetic Procedure", href: "#", list: cosmetic },
  { title: "Location", href: "#", list: location },
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

  const renderMenuList = ({ title, list, href }: TMenuList) => {
    return (
      <section key={title} className={styles.section}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.chip_wrapper}>
          {list.map((name) => (
            <Link key={name} href={href}>
              <Chip>{name}</Chip>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  const renderSubMenu = ({ title, href }: TSubMenuList) => {
    return (
      <div className={styles.subMenu} key={title}>
        <Link href={href}>
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
