"use server";

import { createActionRedirectUrl } from "@/utils";
import { createClient } from "@/utils/supabase/server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    // validation
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/, {
        message: "Invalid Password",
      }),
    passwordConfirm: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/, {
        message: "Invalid Password",
      }),
    name: z.string().min(1, { message: "Name cannot be empty" }),
    nickname: z.string().min(1, { message: "Nickname cannot be empty" }),
    nationality: z.string().min(1, { message: "Nationality cannot be empty" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "password don't matching",
    path: ["password_confirm"],
  });

const signUpActions = async (prevState: any, formData: FormData) => {
  // validation

  const referer = headers().get("referer") as string;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password_confirm") as string;
  const name = formData.get("name") as string;
  const nickname = formData.get("nickname") as string;
  const nationality = formData.get("nationality") as string;

  const validation = schema.safeParse({
    email,
    password,
    name,
    nickname,
    nationality,
    passwordConfirm,
  });

  if (!validation.success) {
    return {
      ...prevState,
      error: validation.error.flatten().fieldErrors,
    };
  }

  // signup logic

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {
      // user email 이 없다는 건 이메일 인증을 안했다는 뜻
      throw Error("Email Not Verification");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw Error(error.code || error.message);
    }

    console.log(error, "error");
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error?.message;
      redirect(createActionRedirectUrl(referer, errorMessage));
    }
  }
};

export default signUpActions;
