"use client";

import Button from "@/components/atoms/button";
import { useFormStatus } from "react-dom";

interface SignUpButtonProps {
  disabled: boolean;
}

const SignUpButton = ({ disabled }: SignUpButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth disabled={pending || !disabled} color="blue">
      {pending ? "Loading..." : "SIGN UP"}
    </Button>
  );
};

export default SignUpButton;
