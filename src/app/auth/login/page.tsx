"use client";

import { ROUTE } from "@/router";
import Link from "next/link";

import styles from "./login.module.scss";
import { clsx } from "clsx";
import InputField from "@/components/molecules/form/input-field";

import Button from "@/components/atoms/button";
import SignUpButton from "@/components/common/policy/privacy";
import { useFormAction } from "@/hooks/useFormAction";
import { signInActions } from "./actions";

const LoginPage = () => {
  const signinAction = useFormAction({ action: signInActions });

  console.log(signinAction);

  return (
    <main className={clsx("container", styles.main)}>
      <form action={signinAction.formAction} className={styles.form}>
        <InputField label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />

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
