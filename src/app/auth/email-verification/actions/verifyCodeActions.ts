"use server";

import { ROUTE } from "@/router";
import { createActionRedirectUrl } from "@/utils";
import { supabaseServer } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  // validation message
  email: z.string().email(),
  code: z.string().length(6, { message: "code is 6" }),
});

export const verifyCodeActions = async (prevState: any, formData: FormData) => {
  const referer = headers().get("referer") as string;

  const token = formData.get("code") as string;
  const email = formData.get("email") as string;

  const validatedFields = schema.safeParse({ token });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, error } = await supabaseServer.auth.verifyOtp({
    type: "signup",
    email,
    token,
    options: {
      redirectTo: ROUTE.SIGN_UP,
    },
  });

  console.log(data);

  redirect(createActionRedirectUrl(referer, error?.message && error.message));
};
