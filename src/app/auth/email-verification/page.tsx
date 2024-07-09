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

const EmailVerificationPage = () => {
  const router = useRouter();

  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [sendCode, setSendCode] = useState<boolean>(false);

  const sendCodeRes = useFormAction({ action: sendCodeActions });
  const verifyCodeRes = useFormAction({ action: verifyCodeActions });

  const { minute, second } = useTimer({
    isStart: sendCode,
    time: 60,
    timeOver,
    setTimeOver,
  });

  useEffect(() => {
    setSendCode(!!sendCodeRes.isSuccess);
  }, [sendCodeRes.isFetching, sendCodeRes.isSuccess]);

  console.log(sendCodeRes, verifyCodeRes, sendCode);

  return (
    <main className={clsx("container", styles.main)}>
      <h1 className={styles.title}>Email Verification</h1>

      <form
        action={!sendCode ? sendCodeRes.formAction : verifyCodeRes.formAction}
      >
        <InputField label={"Email"} name={"email"} />
        <ErrorMessage message={sendCodeRes.state.error.email} />

        {sendCode && (
          <>
            <div className={styles.code}>
              <InputField label="Code" name="code" maxLength={6} />

              <p className={styles.timer}>{`${minute}분 ${second}초`}</p>
            </div>
            <Button color="blue" fullWidth disabled={timeOver}>
              Verification Code
            </Button>
          </>
        )}

        <Button
          color="blue"
          fullWidth
          disabled={sendCodeRes.isError || sendCodeRes.formStatus.pending}
        >
          Send Code
        </Button>
      </form>

      <AlertModal
        open={sendCodeRes.isFetching}
        onCancel={() => router.replace(ROUTE.EMAIL_VERIFICATION)}
      >
        <p>
          {sendCodeRes.isSuccess
            ? "sent to link, please check your email"
            : sendCodeRes.errorMessage}
        </p>
      </AlertModal>
    </main>
  );
};

export default EmailVerificationPage;
