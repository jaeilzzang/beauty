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
import { AlertModal } from "@/components/template/modal/alert";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const signinAction = useFormAction({ action: signInActions });

  return (
    <main className={clsx("container", styles.main)}>
      <form action={signinAction.formAction} className={styles.form}>
        <InputField label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />

        <div className={styles.btn_group}>
          <Button color="blue">LOGIN</Button>

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

      <AlertModal
        open={!!signinAction.errorMessage}
        onCancel={() => router.replace(ROUTE.LOGIN)}
      >
        <p>{signinAction.errorMessage}</p>
      </AlertModal>
    </main>
  );
};

export default LoginPage;
