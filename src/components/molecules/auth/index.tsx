"use client";

import { ROUTE } from "@/router";
import Link from "next/link";

const Auth = () => {
  const isLogin = false;

  const href = isLogin ? ROUTE.MY_PAGE : ROUTE.LOGIN;
  const text = isLogin ? "mypage" : "login";

  return <Link href={href}>{text}</Link>;
};

export default Auth;
