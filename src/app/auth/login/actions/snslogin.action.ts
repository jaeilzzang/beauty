"use server";

import { createActionRedirectUrl } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type TSnsType = Extract<Provider, "facebook" | "google" | "apple">;

export const snsLoginActions = async (prevState: any, snsType: TSnsType) => {
  const referer = headers().get("referer") as string;

  const supabase = createClient();

  const redirectTo: Record<TSnsType, string> = {
    facebook: "",
    google: "https://tqyarvckzieoraneohvv.supabase.co/auth/v1/callback",
    apple: "",
  };

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: snsType,
    options: {
      redirectTo: redirectTo[snsType],
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    redirect(createActionRedirectUrl(referer, error?.message));
  }
};
