"use client";

import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/form/input-field";

import styles from "./email-verification.module.scss";
import { clsx } from "clsx";

import { AlertModal } from "@/components/template/modal/alert";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";

import useTimer from "@/hooks/useTimer";
import { FormEventHandler, useEffect, useRef, useState } from "react";

import { emailRegExp } from "@/utils/regexp";

import { useMutation } from "@tanstack/react-query";
import { sendCodeMutationFn } from "../../api/auth/sendCode";
import { VerifyCodeMutationFn } from "../../api/auth/verifyCode";
import LoadingSpinner from "@/components/atoms/loading/spinner";
import useModal from "@/hooks/useModal";

const EmailVerificationPage = () => {
  const router = useRouter();
  const { open, handleOpenModal } = useModal();

  const emailRef = useRef<HTMLInputElement>(null);
  const verifyCodeRef = useRef<HTMLInputElement>(null);

  const [timeOver, setTimeOver] = useState<boolean>(false);

  const { minute, second, setStartTimer, startTimer, handleStopTimer } =
    useTimer({
      time: 60,
      timeOver,
      setTimeOver,
    });

  const sendCodeMutation = useMutation({
    mutationFn: sendCodeMutationFn,
  });
  const verifyCodeMutation = useMutation({
    mutationFn: VerifyCodeMutationFn,
    onError(error) {
      if (error && verifyCodeRef.current) {
        verifyCodeRef.current.value = "";
      }
    },
  });

  // console.log(sendCodeMutation, "send");
  // console.log(verifyCodeMutation, "veri");

  const handleSendCodeStart = () => {
    setStartTimer(true);
  };

  const sendCodeSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!emailRef.current) return;

    const emailValue = emailRef.current.value;

    if (!emailRegExp.test(emailValue)) {
      handleOpenModal();
      return;
    }

    // fetching
    sendCodeMutation.mutate({ email: emailValue });
  };
  const verifyCodeSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!emailRef.current || !verifyCodeRef.current) {
      return;
    }

    const email = emailRef.current.value;
    const token = verifyCodeRef.current.value;

    verifyCodeMutation.mutate({ email, token });
  };

  const isLoading = sendCodeMutation.isPending || verifyCodeMutation.isPending;

  const sendCodeDisabled = startTimer || sendCodeMutation.isPending;

  useEffect(() => {
    if (open) {
      handleStopTimer();
    }
  }, [open]);

  return (
    <main className={clsx("container", styles.main)}>
      {isLoading && <LoadingSpinner />}
      <h1 className={styles.title}>Email Verification</h1>

      <form className={styles.sendCode_form} onSubmit={sendCodeSubmit}>
        <InputField ref={emailRef} label={"Email"} name={"email"} />

        <Button color="blue" fullWidth disabled={sendCodeDisabled}>
          Send
        </Button>
      </form>

      {sendCodeMutation.isSuccess && (
        <form onSubmit={verifyCodeSubmit}>
          <div className={styles.code}>
            <InputField
              ref={verifyCodeRef}
              label="Code"
              name="code"
              maxLength={6}
            />

            <p className={styles.timer}>{`${minute}분 ${second}초`}</p>
          </div>
          <Button
            type="submit"
            color="blue"
            fullWidth
            disabled={timeOver || sendCodeMutation.isPending}
          >
            Verification Code
          </Button>
        </form>
      )}

      {open && (
        <>
          {/* validation error modal */}
          <AlertModal open onCancel={handleOpenModal}>
            <p>Invalid Email</p>
          </AlertModal>
        </>
      )}

      <>
        {/* send success modal & verification timer start */}
        <AlertModal
          open={sendCodeMutation.isSuccess}
          onCancel={handleSendCodeStart}
        >
          <p>Code sent to your email. Please check your email.</p>
        </AlertModal>

        {/* send error modal */}
        <AlertModal
          open={sendCodeMutation.isError}
          onCancel={() => sendCodeMutation.reset()}
        >
          <p>{sendCodeMutation.error?.message}</p>
        </AlertModal>
      </>

      <>
        {/* verification success modal */}
        <AlertModal
          open={verifyCodeMutation.isSuccess}
          onCancel={() => router.push(ROUTE.SIGN_UP)}
        >
          <p>Verification successful</p>
        </AlertModal>
        {/* verification error modal */}
        <AlertModal
          open={verifyCodeMutation.isError}
          onCancel={() => verifyCodeMutation.reset()}
        >
          <p>{verifyCodeMutation.error?.message}</p>
        </AlertModal>
      </>
    </main>
  );
};

export default EmailVerificationPage;
