"use client";

import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/form/input-field";

import styles from "./email-verification.module.scss";
import { clsx } from "clsx";

import { sendCodeActions } from "./actions";

import { AlertModal } from "@/components/template/modal/alert";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";
import { ErrorMessage } from "@/components/atoms/message/error";

import useTimer from "@/hooks/useTimer";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { verifyCodeActions } from "./actions/verifyCodeActions";
import useModal from "@/hooks/useModal";

import { useFormAction } from "@/hooks/useFormAction";
import { emailRegExp } from "@/utils/regexp";
import { fetchUtils } from "@/utils/fetch";

export type State = {
  type: "send" | "verify" | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};

const EmailVerificationPage = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const verifyCode = useRef<HTMLInputElement>(null);

  const { open, handleOpenModal } = useModal();

  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [sendCode, setSendCode] = useState<boolean>(false);

  const initState: State = {
    type: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  };

  const [status, setStatus] = useState<State>(initState);

  const onResetState = () => {
    setStatus(initState);
  };

  const onSendCode = () => {
    setSendCode(true);
    setTimeOver(true);

    setStatus(initState);
  };

  const isSend = status.type === "send";
  const isVerify = status.type === "verify";

  const { minute, second } = useTimer({
    isStart: sendCode,
    time: 60,
    timeOver,
    setTimeOver,
  });

  console.log(status);

  const sendCodeSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!emailRef.current) return;

    const emailValue = emailRef.current.value;

    if (!emailRegExp.test(emailValue)) {
      setStatus((prev) => ({
        ...prev,
        type: "send",
        message: "Invalid Email",
        isError: true,
      }));
      return;
    }

    // fetching

    try {
      setStatus((prev) => ({
        ...prev,
        isLoading: true,
      }));

      const url = `http://localhost:3000/auth/email-verification/api/sendCode?email=${emailValue}`;
      const res = await fetchUtils({ url });

      setStatus((prev) => ({
        ...prev,
        isSuccess: true,
        isError: false,
        message: "success",
        type: "send",
      }));

      console.log(res);
    } catch (error) {
      if (error instanceof Error) {
        setStatus((prev) => ({
          ...prev,
          isSuccess: false,
          isError: true,
          isLoading: false,
          message: error.message,
        }));
      }
    } finally {
      setStatus((prev) => ({ ...prev, type: "send", isLoading: false }));
    }
  };
  const verifyCodeSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    handleOpenModal();
    setSendCode(true);
  };

  if (status.isLoading) return <div>...loading</div>;

  console.log(status);

  return (
    <main className={clsx("container", styles.main)}>
      <h1 className={styles.title}>Email Verification</h1>

      <form className={styles.sendCode_form} onSubmit={sendCodeSubmit}>
        <InputField ref={emailRef} label={"Email"} name={"email"} />

        <Button color="blue" fullWidth disabled={isSend && status.isSuccess}>
          Send Code
        </Button>
      </form>

      {sendCode && (
        <form onSubmit={verifyCodeSubmit}>
          <div className={styles.code}>
            <InputField label="Code" name="code" maxLength={6} />

            <p className={styles.timer}>{`${minute}분 ${second}초`}</p>
          </div>
          <Button type="submit" color="blue" fullWidth disabled={timeOver}>
            Verification Code
          </Button>
        </form>
      )}

      {/* send success modal & verification timer start */}
      <AlertModal open={isSend && status.isSuccess} onCancel={onSendCode}>
        <p>sent to link, please check your email</p>
      </AlertModal>

      {/* send error modal */}
      <AlertModal open={isSend && status.isError} onCancel={onResetState}>
        <p>{status.message}</p>
      </AlertModal>

      {/* verification fail modal */}
      {/* <AlertModal
        open={verifyCodeAction.isError === true}
        onCancel={() => router.replace(ROUTE.EMAIL_VERIFICATION)}
      >
        <p>{verifyCodeAction.errorMessage}</p>
      </AlertModal> */}
    </main>
  );
};

export default EmailVerificationPage;
