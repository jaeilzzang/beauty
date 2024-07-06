import { PropsWithChildren } from "react";

import styles from "./header.module.scss";

import { Menu } from "../sidebar/menu";
import Logo from "@/components/molecules/logo";
import PageName from "@/components/molecules/page-name";

export const Header = ({}: PropsWithChildren) => {
  return (
    <header className={styles.bg}>
      <div className={styles.wrapper}>
        <Menu />

        <PageName />

        <div>Mypage</div>
      </div>
    </header>
  );
};
