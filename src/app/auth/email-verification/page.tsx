"use client";

import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/form/input-field";
import { FormEventHandler, useEffect, useState } from "react";

import styles from "./email-verification.module.scss";
import { clsx } from "clsx";

let time = 10;

const EmailVerificationPage = () => {
  const [sendCode, setSendCode] = useState<boolean>(false);

  const [timer, setTimer] = useState({
    minute: Math.floor(time / 60),
    second: time % 60,
  });

  const [timeOver, setTimeOver] = useState<boolean>(false);

  useEffect(() => {
    if (!sendCode || timeOver) return;

    // server action after run
    const intervalTime = setInterval(() => {
      let minute = Math.floor(time / 60);
      let second = time % 60;

      setTimer({ minute, second });
      time--;

      if (time < 0) {
        clearInterval(intervalTime);
        setTimeOver(true);
      }
    }, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, [sendCode, timer]);

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
    };

    return (
      <form onSubmit={onSubmit}>
        <InputField label={"Email"} name={"email"} />

        <div className={styles.code}>
          <InputField label={"Code"} name={"code"} />
          <div
            className={styles.timer}
          >{`${timer.minute}분 ${timer.second}초`}</div>
        </div>

        <Button disabled={timeOver} color="blue" fullWidth>
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
