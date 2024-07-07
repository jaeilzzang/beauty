"use client";

import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/form/input-field";
import { FormEventHandler, useEffect, useState } from "react";

import styles from "./email-verification.module.scss";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";
import useTimer from "@/hooks/useTImer";

const EmailVerificationPage = () => {
  const router = useRouter();

  const [sendCode, setSendCode] = useState<boolean>(false);
  const [timeOver, setTimeOver] = useState<boolean>(false);

  const { minute, second } = useTimer({
    setTimeOver,
    isStart: sendCode,
    timeOver: timeOver,
    time: 600,
  });

  // send code  before
  const renderSendCode = () => {
    const onSubmit: FormEventHandler = (e) => {
      e.preventDefault();

      setSendCode(true);
    };

    return (
      <form onSubmit={onSubmit}>
        <InputField label={"Email"} name={"email"} />

        <Button color="blue" fullWidth>
          Verification Code
        </Button>
      </form>
    );
  };

  const renderVerificationCode = () => {
    const onSubmit: FormEventHandler = (e) => {
      e.preventDefault();

      router.push(ROUTE.SIGN_UP);
    };

    return (
      <form onSubmit={onSubmit}>
        <InputField label={"Email"} name={"email"} />

        <div className={styles.code}>
          <InputField label={"Code"} name={"code"} />
          <div className={styles.timer}>{`${minute}분 ${second}초`}</div>
        </div>

        <Button
          disabled={process.env.NODE_ENV === "development" ? false : timeOver}
          color="blue"
          fullWidth
        >
          Next
        </Button>
      </form>
    );
  };

  return (
    <main className={clsx("container", styles.main)}>
      <h1 className={styles.title}>Email Verification</h1>

      {sendCode ? renderVerificationCode() : renderSendCode()}
    </main>
  );
};

export default EmailVerificationPage;
