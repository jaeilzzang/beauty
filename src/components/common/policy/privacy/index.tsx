"use client";

import { useState } from "react";

import styles from "./policy.module.scss";
import ModalOverlay from "@/components/organism/modal/overlay";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/router";
import Button from "@/components/atoms/button";

const SignUpButton = () => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(!open);
  };

  const handleConfirm = () => {
    router.push(ROUTE.EMAIL_VERIFICATION);
  };

  return (
    <>
      <Button variant="outline" color="blue" onClick={handleCancel}>
        SIGN UP
      </Button>

      <ModalOverlay
        open={open}
        title="title"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        내용
      </ModalOverlay>
    </>
  );
};

export default SignUpButton;
