"use client";

import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/form/input-field";

import styles from "./email-verification.module.scss";
import { clsx } from "clsx";

import { AlertModal } from "@/components/template/modal/alert";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";

import useTimer from "@/hooks/useTimer";
import { FormEventHandler, useRef, useState } from "react";

import { emailRegExp } from "@/utils/regexp";

import { useMutation } from "@tanstack/react-query";
import { sendCodeMutationFn } from "../../api/auth/sendCode";
import { VerifyCodeMutationFn } from "../../api/auth/verifyCode";
import LoadingSpinner from "@/components/atoms/loading/spinner";

type State = {
  open: boolean;
  content: JSX.Element;
  onClick: () => void;
};

const EmailVerificationPage = () => {
  const router = useRouter();

  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<State>({
    open: false,
    content: <></>,
    onClick: () => {},
  });

  const handleModalClose = () => {
    setModalContent((prev) => ({
      ...prev,
      content: <></>,
      onClick: () => {},
      open: false,
    }));
  };

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
    onSuccess: () => {
      setModalContent((prev) => ({
        ...prev,
        open: true,
        content: <p>Code sent to your email. Please check your email.</p>,
        onClick: () => setStartTimer(true),
      }));
    },
    onError(error) {
      setModalContent((prev) => ({
        ...prev,
        open: true,
        content: <p>{error.message}</p>,
        onClick: () => sendCodeMutation.reset(),
      }));
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: VerifyCodeMutationFn,
    onSuccess: () => {
      setModalContent((prev) => ({
        ...prev,
        open: true,
        content: <p>Verification successful</p>,
        onClick: () => router.replace(ROUTE.SIGN_UP),
      }));
    },
    onError(error) {
      setModalContent((prev) => ({
        ...prev,
        open: true,
        content: <p>{error.message}</p>,
        onClick: () => {
          // 에러 발생 시 에러 모달 show
          // Timer 정지
          // 입력했던 코드 초기화 && 입력창으로 focus
          verifyCodeMutation.reset();
          setStartTimer(true);

          if (error && verifyCodeRef.current) {
            verifyCodeRef.current.value = "";
            verifyCodeRef.current.focus();
          }
        },
      }));
    },
  });

  const sendCodeSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!emailRef.current) return;

    const emailValue = emailRef.current.value;

    if (!emailRegExp.test(emailValue)) {
      setModalContent((prev) => ({
        ...prev,
        open: true,
        content: <p>Invalid Email</p>,
        onClick: handleModalClose,
      }));
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

    handleStopTimer();
  };

  const isLoading = sendCodeMutation.isPending || verifyCodeMutation.isPending;

  const sendCodeDisabled = startTimer || sendCodeMutation.isPending;

  return (
    <main className={clsx("container", styles.main)}>
      {isLoading && <LoadingSpinner backdrop />}
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

      <>
        <AlertModal
          open={modalContent.open}
          onCancel={() => {
            modalContent.onClick();
            handleModalClose();
          }}
        >
          {modalContent.content}
        </AlertModal>
      </>
    </main>
  );
};

export default EmailVerificationPage;
