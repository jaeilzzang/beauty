import styles from "./header.module.scss";

import { Menu } from "../sidebar/menu";

import PageName from "@/components/molecules/page-name";
import Auth from "@/components/molecules/auth";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.bg}>
      <div className={styles.wrapper}>
        <Menu />

        <Link href={"/"}>home</Link>

        <PageName />

        <Auth />
      </div>
    </header>
  );
};
