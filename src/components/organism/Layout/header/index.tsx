import { PropsWithChildren } from "react";

import styles from "./header.module.scss";

import Image from "next/image";
import Link from "next/link";

import { Menu } from "../sidebar/menu";

export const Header = ({}: PropsWithChildren) => {
  return (
    <header className={styles.bg}>
      <div className={styles.wrapper}>
        <Menu />

        <Link href={"/"}>
          <Image width={42} height={42} src={"/logo/logo.webp"} alt="logo" />
        </Link>

        <div>Mypage</div>
      </div>
    </header>
  );
};
