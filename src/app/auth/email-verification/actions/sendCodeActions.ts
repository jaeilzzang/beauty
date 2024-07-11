"use server";

import { createActionRedirectUrl } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
});

export const sendCodeActions = async (prevState: any, formData: FormData) => {
  const referer = headers().get("referer") as string;

  const email = formData.get("email") as string;

  const validatedFields = schema.safeParse({ email });

  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log("first");
    return {
      ...prevState,
      message: "Invalid Email",
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  });

  // todo
  // 이미 가입한 유저 response data 로 에외처리
  console.log(data, error);

  if (error) {
    redirect(createActionRedirectUrl(referer, error?.message && error.message));
  } else {
    redirect(createActionRedirectUrl(referer));
  }
};
