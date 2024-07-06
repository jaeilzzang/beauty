"use client";

import { useParams, usePathname } from "next/navigation";
import styles from "./page-name.module.scss";
import Logo from "../logo";

const PageName = () => {
  const pathname = usePathname();
  const params = useParams();

  const currentPathName = (): JSX.Element => {
    const subPage = params?.id;
    const path = pathname.split("/")[1];

    const curPage = subPage ? path + "-detail" : path;

    switch (curPage) {
      case "home":
        return <Logo />;
      case "hospital":
        return <div>병원명</div>;
      case "location":
        return <div>지역명</div>;
      case "recommend":
        return <div>Recommend</div>;
      case "event":
        return <div>All Event</div>;
      case "event-detail":
        return <div>Event</div>;
      case "favorite":
        return <div>Favorite</div>;

      default:
        return <></>;
    }
  };

  const Component = currentPathName();

  return <div className={styles.pageName}>{Component}</div>;
};

export default PageName;
