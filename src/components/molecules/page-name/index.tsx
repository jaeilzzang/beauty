"use client";

import { useParams, usePathname } from "next/navigation";
import styles from "./page-name.module.scss";
import Logo from "../logo";
import { location } from "@/constants";

type Location = (typeof location)[number];

const PageName = () => {
  const pathname = usePathname();
  const params = useParams();

  const currentPathName = () => {
    const subPage = params?.id;
    const path = pathname.split("/")[1];

    const curPage = subPage ? path + "-detail" : path;

    const authPath: Record<string, string> = {
      "/auth/login": "Login",
      "/auth/sign-up": "Sign Up",
      "/auth/forget-password": "Forget Password",
      "/auth/email-verification": "Email Verification",
    };

    const createRouterPath = (prefix: string, list: readonly Location[]) => {
      const pathObj: Record<string, string> = {};

      list.forEach((path) => {
        const curPath = `/${prefix}/${path}`;
        pathObj[curPath] = path;
      });

      return pathObj;
    };

    const locationPath = createRouterPath("location", location);

    switch (curPage) {
      case "home":
        return <Logo />;
      case "hospital":
        return "병원명";
      case "location-detail":
        return locationPath[pathname];
      case "recommend-detail":
        return "Recommend";
      case "event":
        return "All Event";
      case "event-detail":
        return "Event";
      case "favorite":
        return "Favorite";
      case "auth":
        return authPath[pathname];

      default:
        return <></>;
    }
  };

  const Component = currentPathName();

  return <div className={styles.pageName}>{Component}</div>;
};

export default PageName;
