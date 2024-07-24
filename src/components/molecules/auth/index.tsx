import { ROUTE } from "@/router";

import Link from "next/link";

import styles from "./auth-header.module.scss";
import Button from "@/components/atoms/button";

import { getUserAPI } from "@/app/api/auth/getUser";

const Auth = async () => {
  const users = await getUserAPI();

  const href = users ? ROUTE.MY_PAGE : ROUTE.LOGIN;
  const text = users ? users.user.nickname : "LOGIN";

  return (
    <div className={styles.auth_header}>
      <Link href={href}>
        <Button color="blue">{text}</Button>
      </Link>
    </div>
  );
};

export default Auth;
