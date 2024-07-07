"use client";

import { FormEventHandler } from "react";

import styles from "./sign-up.module.scss";

import InputField from "@/components/molecules/form/input-field";
import Button from "@/components/atoms/button";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";

import { SearchModal } from "@/components/template/modal";
import useModal from "@/hooks/useModal";

const SignUpPage = () => {
  const router = useRouter();

  const { handleOpen, open } = useModal();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    // signup action
  };

  const onReset = () => {
    router.replace(ROUTE.LOGIN);
  };

  return (
    <main className="container">
      <form onSubmit={onSubmit}>
        <InputField label={"Email"} name={"email"} />
        <InputField label={"Password"} name={"password"} />
        <InputField label={"Name"} name={"name"} />
        <InputField label={"Nickname"} name={"nickname"} />
        <InputField
          label={"Nationality"}
          name={"nationality"}
          onClick={handleOpen}
        />

        <p className={styles.rollback} onClick={onReset}>
          Already have an account? Log in
        </p>

        <Button fullWidth color="blue">
          SIGN UP
        </Button>
      </form>

      <SearchModal
        onCancel={handleOpen}
        onClick={() => console.log("click")}
        itemList={Array(100).fill("KOREA")}
        open={open}
      />
    </main>
  );
};

export default SignUpPage;
