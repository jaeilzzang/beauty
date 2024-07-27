"use client";

import InputField from "@/components/molecules/form/input-field";

import styles from "./email-verification.module.scss";

import { useRouter, useSearchParams } from "next/navigation";
import { ROUTE } from "@/router";

import useTimer from "@/hooks/useTimer";
import { useEffect, useState } from "react";

import VerifyButton from "./verifyButton";
import { useFormState } from "react-dom";
import verifyActions from "./actions/email-verification.actions";
import useModal from "@/hooks/useModal";
import ModalOverlay from "@/components/organism/layout/modal/overlay";
import Button from "@/components/atoms/button";

const EmailVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());
  const emptyParamsCheck = Object.entries(paramsObject).every(
    ([, value]) => value
  );

  if (searchParams.size !== 5 || !emptyParamsCheck) {
    router.replace(ROUTE.SIGN_UP);
  }

  const initNoticeModal = useModal();
  const timeoutModal = useModal();
  const formErrorModal = useModal();

  const [timeOver, setTimeOver] = useState<boolean>(false);

  const [state, verifyCode] = useFormState(verifyActions, { message: null });

  const { minute, second, setStartTimer, startTimer, handleStopTimer } =
    useTimer({
      time: 60,
      timeOver,
      setTimeOver,
    });

  const handleStartTimer = () => {
    setStartTimer(true);
    initNoticeModal.setOpen(false);
  };

  const handleTimeoutModal = () => {
    timeoutModal.setOpen(false);
    router.replace(ROUTE.SIGN_UP);
  };

  useEffect(() => {
    // 첫 로딩시 이메일 인증하라는 안내 모달
    if (!startTimer && !initNoticeModal.open && !state.message) {
      initNoticeModal.setOpen(true);
    }
  }, []);

  useEffect(() => {
    // 시간 초과 시 안내 모달
    if (startTimer) {
      timeoutModal.setOpen(true);
    }

    // formError modal

    if (state.message) {
      formErrorModal.setOpen(true);
    }
  }, [state]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Sign Up</h1>

      <form className={styles.form} action={verifyCode}>
        <div className={styles.code}>
          <InputField label="Code" name="code" minLength={6} maxLength={6} />

          <p className={styles.timer}>{`${minute}분 ${second}초`}</p>
        </div>

        <VerifyButton disabled={timeOver} />
      </form>

      {/* notice modal */}
      <>
        <ModalOverlay open={initNoticeModal.open} handleClick={() => {}}>
          <p className={styles.verify_notice}>
            Check your email! We have sent you a 6-digit code. Enter it below to
            verify your email address.
          </p>

          <Button color="blue" onClick={handleStartTimer}>
            Confirm
          </Button>
        </ModalOverlay>
      </>
      {/* timeout modal */}
      <>
        <ModalOverlay open={timeoutModal.open} handleClick={() => {}}>
          <p className={styles.verify_notice}>
            the verification code has expired. Please request a new code to
            proceed.
          </p>

          <Button color="blue" onClick={handleTimeoutModal}>
            Confirm
          </Button>
        </ModalOverlay>
      </>

      {/* form submit error modal */}
      <>
        <ModalOverlay
          open={formErrorModal.open}
          handleClick={() => router.refresh()}
        >
          <p className={styles.verify_notice}>{state.message}</p>

          <Button color="blue" onClick={() => router.refresh()}>
            Confirm
          </Button>
        </ModalOverlay>
      </>
    </main>
  );
};

export default EmailVerificationPage;
