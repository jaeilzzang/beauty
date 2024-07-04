"use client";

import { useSearchParams } from "next/navigation";

import styles from "../styles/tab.module.scss";

import InfoTab from "./info";
import EventTab from "./event";
import ReviewTab from "./review";

import Link from "next/link";
import { clsx } from "clsx";
import { tab, tabList } from "./constants";

const Tab = () => {
  const searchParams = useSearchParams();

  const currentTab = searchParams.get(tab) || "info";

  /**
   * query string 과 컴포넌트를 연결 시키는 오브젝트
   *
   */
  const TabComponent: Record<string, () => JSX.Element> = {
    info: InfoTab,
    event: EventTab,
    review: ReviewTab,
  };

  const Component = TabComponent[currentTab];

  return (
    <>
      <section>
        <ul className={styles.menu}>
          {tabList.map(({ key, name, href }) => (
            <Link key={key} href={href}>
              <li
                className={clsx(styles.li, {
                  [styles.active]: currentTab === key,
                })}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <Component />
      </section>
    </>
  );
};

export default Tab;
