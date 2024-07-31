"use server";

import { ROUTE } from "@/router";
import { createClient } from "@/utils/supabase/server";

const resetPasswordActions = async (
  prev: { message: string },
  formData: FormData
) => {
  const supabase = createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_API_ROUTE}${ROUTE.UPDATE_PASSWORD}`,
  });

  if (error) {
    return {
      ...prev,
      message: error.code || error.message,
    };
  }

  return {
    ...prev,
    message: "send success",
  };
};

export default resetPasswordActions;
