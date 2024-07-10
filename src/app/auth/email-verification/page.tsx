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
import { useFormAction } from "@/hooks/useFormAction";
import useTimer from "@/hooks/useTimer";
import { useEffect, useState } from "react";
import { verifyCodeActions } from "./actions/verifyCodeActions";
import useModal from "@/hooks/useModal";

const EmailVerificationPage = () => {
  const router = useRouter();

  const { setOpen, open } = useModal();

  const sendCodeRes = useFormAction({ action: sendCodeActions });
  const verifyCodeRes = useFormAction({ action: verifyCodeActions });

  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [sendCode, setSendCode] = useState<boolean>(false);

  const { minute, second } = useTimer({
    isStart: sendCode,
    time: 60,
    timeOver,
    setTimeOver,
  });

  useEffect(() => {
    if (sendCodeRes.isSuccess) {
      setOpen(true);
    }
  }, [sendCodeRes.isSuccess, open]);

  const handleTimerStart = () => {
    setOpen(false);
    setSendCode(true);
  };

  return (
    <main className={clsx("container", styles.main)}>
      <h1 className={styles.title}>Email Verification</h1>

      <form>
        <InputField label={"Email"} name={"email"} />
        {sendCodeRes.state.error && (
          <ErrorMessage message={sendCodeRes.state.error?.email} />
        )}

        {sendCode && (
          <>
            <div className={styles.code}>
              <InputField label="Code" name="code" maxLength={6} />

              <p className={styles.timer}>{`${minute}분 ${second}초`}</p>
            </div>
            <Button
              formAction={verifyCodeRes.formAction}
              color="blue"
              fullWidth
              disabled={timeOver}
            >
              Verification Code
            </Button>
          </>
        )}

        <Button
          color="blue"
          fullWidth
          formAction={sendCodeRes.formAction}
          disabled={sendCodeRes.isError || sendCodeRes.formStatus.pending}
        >
          Send Code
        </Button>
      </form>

      {/* send success modal & verification timer start */}
      <AlertModal open={open} onCancel={handleTimerStart}>
        <p>sent to link, please check your email</p>
      </AlertModal>

      {/* send error modal */}
      <AlertModal
        open={!!sendCodeRes.isError}
        onCancel={() => router.replace(ROUTE.EMAIL_VERIFICATION)}
      >
        <p>{sendCodeRes.errorMessage}</p>
      </AlertModal>

      {/* verification fail modal */}
      <AlertModal
        open={!!verifyCodeRes.isError}
        onCancel={() => router.replace(ROUTE.EMAIL_VERIFICATION)}
      >
        <p>{verifyCodeRes.errorMessage}</p>
      </AlertModal>
    </main>
  );
};

export default EmailVerificationPage;
