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
import { country } from "@/constants/country";
import { useSuspenseQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/atoms/loading/spinner";

const SignUpPage = () => {
  const router = useRouter();

  const { handleOpenModal, open } = useModal();

  const [nationality, setNationality] = useState<string>("");

  const { errorMessage, formAction, formStatus, isError, state } =
    useFormAction({ action: signUpActions });

  const getUser = async () => {
    const { data } = await supabaseClient.auth.getSession();

    if (!data.session) {
      // redirect(ROUTE.LOGIN);
    }

    return data;
  };

  const isUserCheck = useSuspenseQuery({
    queryKey: ["email_check"],
    queryFn: getUser,
  });

  const onReset = () => router.replace(ROUTE.LOGIN);

  const inputFields = [
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
    { label: "Password Confirm", name: "password_confirm" },
    { label: "Name", name: "name" },
    { label: "Nickname", name: "nickname" },
    {
      label: "Nationality",
      name: "nationality",
      readOnly: true,
      value: nationality,
      onClick: handleOpenModal,
      onFocus: handleOpenModal,
    },
  ];

  if (isUserCheck.isLoading) return <LoadingSpinner backdrop />;

  return (
    <main className="container">
      <form action={formAction}>
        {inputFields.map(
          ({ label, name, onClick, onFocus, readOnly, value }) => (
            <div key={name} className={styles.input_field}>
              <InputField
                label={label}
                name={name}
                type={name.startsWith("password") ? "password" : "text"}
                {...(readOnly && { readOnly })}
                {...(value && { value })}
                onClick={onClick}
                onFocus={onFocus}
                isError={!!state.error[name]}
              />
              {<ErrorMessage message={state.error[name]} />}
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
        onCancel={handleOpenModal}
        onClick={(value) => setNationality(value)}
        itemList={country}
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
