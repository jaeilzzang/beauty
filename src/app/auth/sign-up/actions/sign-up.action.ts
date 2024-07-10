"use server";

import { createActionRedirectUrl } from "@/utils";
import { createClient } from "@/utils/supabase/server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  // validation
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/, {
      message: "Invalid Password",
    }),
  name: z.string().min(3),
  nickname: z.string().min(3, { message: "least 3 character" }),
  nationality: z.string(),
});

const signUpActions = async (prevState: any, formData: FormData) => {
  const referer = headers().get("referer") as string;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const nickname = formData.get("nickname") as string;
  const nationality = formData.get("nationality") as string;

  const validation = schema.safeParse({
    email,
    password,
    name,
    nickname,
    nationality,
  });

  if (!validation.success) {
    return {
      ...prevState,
      error: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(data, "data");
  redirect(createActionRedirectUrl(referer, error?.message));
};

export default signUpActions;
