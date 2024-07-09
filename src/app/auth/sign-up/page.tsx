"use client";

import { useState } from "react";

import styles from "./sign-up.module.scss";

import InputField from "@/components/molecules/form/input-field";
import Button from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";

import { SearchModal } from "@/components/template/modal";
import useModal from "@/hooks/useModal";
import signUpActions from "./actions/sign-up.action";
import { AlertModal } from "@/components/template/modal/alert";
import { ErrorMessage } from "@/components/atoms/message/error";
import { useFormAction } from "@/hooks/useFormAction";
import { supabaseClient } from "@/utils/supabase/client";

const SignUpPage = () => {
  const router = useRouter();

  const { errorMessage, formAction, formStatus, isError, state } =
    useFormAction({ action: signUpActions });

  const { handleOpen, open } = useModal();

  const [nationality, setNationality] = useState<string>("");

  console.log(state);

  const onReset = () => router.replace(ROUTE.LOGIN);

  const inputFields = [
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
    { label: "Name", name: "name" },
    { label: "Nickname", name: "nickname" },
    {
      label: "Nationality",
      name: "nationality",
      readOnly: true,
      value: nationality,
      onClick: handleOpen,
      onFocus: handleOpen,
    },
  ];

  const getUser = async () => {
    const { data } = await supabaseClient.auth.getSession();

    console.log(data);
  };

  return (
    <main className="container">
      <div onClick={getUser}> getUser</div>
      <form action={formAction}>
        {inputFields.map(
          ({ label, name, onClick, onFocus, readOnly, value }) => (
            <div key={name}>
              <InputField
                label={label}
                name={name}
                type={name === "password" ? "password" : "text"}
                {...(readOnly && { readOnly })}
                {...(value && { value })}
                onClick={onClick}
                onFocus={onFocus}
              />
              <ErrorMessage message={state?.error?.[name]} />
            </div>
          )
        )}

        <p className={styles.rollback} onClick={onReset}>
          Already have an account? Log in
        </p>

        <Button fullWidth disabled={formStatus.pending} color="blue">
          SIGN UP
        </Button>
      </form>

      <SearchModal
        onCancel={handleOpen}
        onClick={(value) => setNationality(value)}
        itemList={Array(100).fill("KOREA")}
        open={open}
      />

      <AlertModal
        open={!!isError}
        onCancel={() => router.replace(ROUTE.SIGN_UP)}
      >
        <p>{errorMessage}</p>
      </AlertModal>
    </main>
  );
};

export default SignUpPage;
