"use client";

import { ROUTE } from "@/router";
import Link from "next/link";

import styles from "./login.module.scss";
import { clsx } from "clsx";
import InputField from "@/components/molecules/form/input-field";
import { useRef } from "react";

import Button from "@/components/atoms/button";
import SignUpButton from "@/components/common/policy/privacy";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <main className={clsx("container", styles.main)}>
      <form action="#" className={styles.form} onSubmit={onSubmit}>
        <InputField ref={emailRef} label="Email" name="email" />
        <InputField ref={passwordRef} label="Password" name="password" />

        <div className={styles.btn_group}>
          <Button color="blue" onClick={() => console.log("first")}>
            LOGIN
          </Button>

          <SignUpButton />
        </div>
      </form>

      <div className={clsx(styles.center)}>
        <Link href={ROUTE.FORGET_PASSWORD}>Forget your password?</Link>
      </div>

      <div className={clsx(styles.center)}>Or</div>

      <div className={clsx(styles.center)}>
        <div>sns</div>
      </div>
    </main>
  );
};

export default LoginPage;
